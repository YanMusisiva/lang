import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const bilingual = z.object({ fr: z.string().trim().min(2).max(5000), en: z.string().trim().min(2).max(5000) });
const schema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  title: bilingual,
  summary: bilingual,
  content: bilingual,
  videoUrl: z.union([z.url(), z.literal("")]).optional(),
  track: z.enum(["developer", "business", "professional"]),
  level: z.string().trim().min(2).max(30),
});

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const { data, error } = await supabase.from("premium_lessons").select("id, slug, title, summary, content, video_url, track, level, premium_exercises(id, type, prompt, reference_answer, accepted_answers, audio_url, transcript, position)").eq("published", true).order("position");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lessons: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Leçon invalide", details: parsed.error.flatten() }, { status: 400 });
  const lesson = parsed.data;
  const { data, error } = await supabase.from("premium_lessons").insert({ slug: lesson.slug, title: lesson.title, summary: lesson.summary, content: lesson.content, video_url: lesson.videoUrl || null, track: lesson.track, level: lesson.level, published: true, created_by: user.id }).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 403 });
  return NextResponse.json({ id: data.id }, { status: 201 });
}
