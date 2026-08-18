import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const schema = z.object({
  exerciseId: z.string().max(100).optional(),
  mode: z.enum(["written", "spoken"]),
  prompt: z.string().min(3).max(1000),
  answer: z.string().min(1).max(3000),
  referenceAnswer: z.string().max(3000).optional(),
});

const feedbackSchema = z.object({
  correct: z.boolean(),
  score: z.number().min(0).max(100),
  correctedAnswer: z.string(),
  naturalAnswer: z.string(),
  errors: z.array(z.object({ original: z.string(), correction: z.string(), explanationFr: z.string() })),
  explanationFr: z.string(),
  confidence: z.number().min(0).max(1),
});

type Feedback = z.infer<typeof feedbackSchema>;
const calls = new Map<string, number[]>();

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9' ]/g, "").replace(/\s+/g, " ").trim();
}

function localFeedback(answer: string, reference = ""): Feedback {
  const answerWords = new Set(normalize(answer).split(" ").filter(Boolean));
  const referenceWords = normalize(reference).split(" ").filter(Boolean);
  const overlap = referenceWords.length
    ? referenceWords.filter((word) => answerWords.has(word)).length / referenceWords.length
    : Math.min(1, answerWords.size / 12);
  const score = Math.round(overlap * 100);
  return {
    correct: score >= 70,
    score,
    correctedAnswer: answer.trim(),
    naturalAnswer: reference || answer.trim(),
    errors: [],
    explanationFr: reference
      ? "Correction locale provisoire : le score mesure surtout la proximité avec l'exemple. Configurez Gemini pour obtenir une véritable analyse grammaticale."
      : "Votre réponse a été enregistrée. Configurez Gemini pour recevoir une analyse grammaticale détaillée.",
    confidence: reference ? 0.45 : 0.2,
  };
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase non configuré" }, { status: 503 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const [{ data: enrollment }, { data: profile }] = await Promise.all([
    supabase.from("enrollments").select("status, ends_at").eq("user_id", user.id).maybeSingle(),
    supabase.from("profiles").select("role").eq("id", user.id).maybeSingle(),
  ]);
  const active = enrollment?.status === "active" && (!enrollment.ends_at || new Date(enrollment.ends_at) > new Date());
  if (!active && !["coach", "admin"].includes(profile?.role || "")) {
    return NextResponse.json({ error: "Accès premium requis" }, { status: 403 });
  }

  const recent = (calls.get(user.id) || []).filter((time) => Date.now() - time < 60_000);
  if (recent.length >= 8) return NextResponse.json({ error: "Limite temporaire atteinte" }, { status: 429 });
  recent.push(Date.now());
  calls.set(user.id, recent);

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Requête invalide" }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Réponse invalide" }, { status: 400 });
  const input = parsed.data;

  let feedback = localFeedback(input.answer, input.referenceAnswer);
  let provider = "local";
  let aiWarning = process.env.GEMINI_API_KEY ? "" : "Gemini n'est pas configuré sur le serveur. Correction locale utilisée.";
  if (process.env.GEMINI_API_KEY) {
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are an English teacher for French-speaking professionals. Evaluate the student's ${input.mode} answer. Accept grammatically correct alternatives even if they differ from the reference. Never invent errors. Explain briefly in French.\nQuestion: ${input.prompt}\nStudent answer: ${input.answer}\nReference example: ${input.referenceAnswer || "None"}` }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseJsonSchema: {
              type: "object",
              required: ["correct", "score", "correctedAnswer", "naturalAnswer", "errors", "explanationFr", "confidence"],
              properties: {
                correct: { type: "boolean" }, score: { type: "number" }, correctedAnswer: { type: "string" },
                naturalAnswer: { type: "string" }, explanationFr: { type: "string" }, confidence: { type: "number" },
                errors: { type: "array", items: { type: "object", required: ["original", "correction", "explanationFr"], properties: { original: { type: "string" }, correction: { type: "string" }, explanationFr: { type: "string" } } } },
              },
            },
          },
        }),
      });
      if (aiResponse.ok) {
        const result = await aiResponse.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        const checked = feedbackSchema.safeParse(JSON.parse(text || "null"));
        if (checked.success) { feedback = checked.data; provider = `gemini:${model}`; aiWarning = ""; }
        else aiWarning = "Gemini a renvoyé une correction invalide. Correction locale utilisée.";
      } else {
        aiWarning = `Gemini est indisponible (${aiResponse.status}). Correction locale utilisée.`;
      }
    } catch {
      aiWarning = "Gemini n'a pas répondu à temps. Correction locale utilisée.";
    } finally { clearTimeout(timeout); }
  }

  await supabase.from("exercise_attempts").insert({
    user_id: user.id,
    exercise_id: null,
    exercise_type: input.mode === "spoken" ? "spoken_answer" : "written_answer",
    answer_text: input.mode === "written" ? input.answer : null,
    transcript: input.mode === "spoken" ? input.answer : null,
    score: feedback.score,
    feedback,
    provider,
  });
  return NextResponse.json({ feedback, provider, aiWarning: aiWarning || undefined });
}
