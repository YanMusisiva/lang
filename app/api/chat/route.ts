import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const messageSchema = z.object({
  body: z.string().trim().min(1).max(2000),
  lessonId: z.string().max(100).optional(),
  conversationId: z.uuid().optional(),
});

async function getConversation(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data: owned } = await supabase.from("conversations").select("id").eq("student_id", userId).maybeSingle();
  if (owned) return owned;
  const { data: membership } = await supabase.from("conversation_participants").select("conversation_id").eq("user_id", userId).limit(1).maybeSingle();
  return membership ? { id: membership.conversation_id } : null;
}

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase non configuré" }, { status: 503 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const requestedId = new URL(request.url).searchParams.get("conversationId");
  let conversation = requestedId ? { id: requestedId } : await getConversation(supabase, user.id);
  if (requestedId) {
    const { data: allowed } = await supabase.from("conversations").select("id").eq("id", requestedId).maybeSingle();
    if (!allowed) conversation = null;
  }
  if (!conversation) return NextResponse.json({ conversation: null, messages: [] });
  const { data: messages, error } = await supabase.from("messages").select("id, sender_id, body, lesson_id, created_at").eq("conversation_id", conversation.id).order("created_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ conversation, messages, userId: user.id });
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase non configuré" }, { status: 503 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const parsed = messageSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Message invalide" }, { status: 400 });

  let conversation = parsed.data.conversationId ? { id: parsed.data.conversationId } : await getConversation(supabase, user.id);
  if (!conversation) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "student") return NextResponse.json({ error: "Aucune conversation assignée" }, { status: 404 });
    const { data, error } = await supabase.from("conversations").insert({ student_id: user.id }).select("id").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    conversation = data;
  }
  const { data: message, error } = await supabase.from("messages").insert({ conversation_id: conversation.id, sender_id: user.id, body: parsed.data.body, lesson_id: null }).select("id, sender_id, body, lesson_id, created_at").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 403 });
  return NextResponse.json({ message, conversationId: conversation.id }, { status: 201 });
}
