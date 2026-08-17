import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const progressSchema = z.object({
  storageKey: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/i),
  payload: z.unknown(),
});

export async function GET() {
  if (!isSupabaseConfigured()) return NextResponse.json({ progress: [] });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const { data, error } = await supabase.from("progress").select("storage_key, payload, updated_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ progress: data });
}

export async function PUT(request: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ saved: false });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const parsed = progressSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  const { error } = await supabase.from("progress").upsert({
    user_id: user.id,
    storage_key: parsed.data.storageKey,
    payload: parsed.data.payload,
    updated_at: new Date().toISOString(),
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ saved: true });
}
