import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const bilingual = z.object({ fr: z.string().trim().min(2).max(1000), en: z.string().trim().min(2).max(1000) });
const schema = z.object({
  lessonId: z.uuid(),
  type: z.enum(["written_answer", "spoken_answer", "shadowing"]),
  prompt: bilingual,
  referenceAnswer: z.string().trim().max(3000).optional(),
  transcript: z.string().trim().max(3000).optional(),
  audioUrl: z.union([z.url(), z.literal("")]).optional(),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Exercice invalide", details: parsed.error.flatten() }, { status: 400 });
  const exercise = parsed.data;
  if (exercise.type === "shadowing" && (!exercise.transcript || !exercise.audioUrl)) return NextResponse.json({ error: "Le shadowing exige un audio et sa transcription" }, { status: 400 });
  const { data, error } = await supabase.from("premium_exercises").insert({ lesson_id: exercise.lessonId, type: exercise.type, prompt: exercise.prompt, reference_answer: exercise.referenceAnswer || null, transcript: exercise.transcript || null, audio_url: exercise.audioUrl || null, published: true }).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 403 });
  return NextResponse.json({ id: data.id }, { status: 201 });
}
