import { redirect } from "next/navigation";
import ChatClient from "@/components/chat/ChatClient";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function ChatPage({ searchParams }: { searchParams: Promise<{ conversation?: string }> }) {
  if (!isSupabaseConfigured()) redirect("/auth?next=/chat");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth?next=/chat");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  const query = await searchParams;
  return <ChatClient userId={user.id} initialConversationId={query.conversation || null} canManageParticipants={["coach", "admin"].includes(profile?.role || "")} />;
}
