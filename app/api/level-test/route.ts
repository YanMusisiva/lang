import { NextResponse } from "next/server";
import { z } from "zod";
import { TEST_VERSION } from "@/data/level-test";
import { validAnswers } from "@/lib/level-test";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const submission = z.object({
  id: z.uuid(), version: z.literal(TEST_VERSION),
  answers: z.array(z.number().int().min(0).max(3)).length(20),
}).strict();

export async function POST(request: Request) {
  // Small, fixed payload; never accept a client-supplied score or identity.
  const body = await request.text();
  if (body.length > 2048) return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  let value: unknown;
  try { value = JSON.parse(body); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const parsed = submission.safeParse(value);
  if (!parsed.success || !validAnswers(parsed.data.answers)) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }
  if (!isSupabaseConfigured()) return NextResponse.json({ saved: false }, { status: 503 });
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("submit_level_test", {
      p_attempt_id: parsed.data.id, p_version: parsed.data.version, p_answers: parsed.data.answers,
    });
    if (error) return NextResponse.json({ saved: false }, { status: 503 });
    return NextResponse.json({ saved: true });
  } catch {
    return NextResponse.json({ saved: false }, { status: 503 });
  }
}
