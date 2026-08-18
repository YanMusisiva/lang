import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({ conversationId: z.uuid(), userId: z.uuid() });

export async function GET(request: Request) {
  const conversationId = new URL(request.url).searchParams.get("conversationId");
  if (!conversationId) return NextResponse.json({ error: "Conversation requise" }, { status: 400 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const { data, error } = await supabase.from("conversation_participants").select("user_id, joined_at").eq("conversation_id", conversationId);
  if (error) return NextResponse.json({ error: error.message }, { status: 403 });
  return NextResponse.json({ participants: data });
}

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const { count } = await supabase.from("conversation_participants").select("*", { count: "exact", head: true }).eq("conversation_id", parsed.data.conversationId);
  if ((count || 0) >= 3) return NextResponse.json({ error: "Trois participants maximum" }, { status: 409 });
  const { error } = await supabase.from("conversation_participants").insert({ conversation_id: parsed.data.conversationId, user_id: parsed.data.userId, added_by: user.id });
  if (error) return NextResponse.json({ error: error.message }, { status: 403 });
  return NextResponse.json({ added: true }, { status: 201 });
}

export async function DELETE(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const { data: conversation } = await supabase.from("conversations").select("student_id").eq("id", parsed.data.conversationId).single();
  if (conversation?.student_id === parsed.data.userId) return NextResponse.json({ error: "L'élève principal ne peut pas être retiré" }, { status: 400 });
  const { error } = await supabase.from("conversation_participants").delete().eq("conversation_id", parsed.data.conversationId).eq("user_id", parsed.data.userId);
  if (error) return NextResponse.json({ error: error.message }, { status: 403 });
  return NextResponse.json({ removed: true });
}
