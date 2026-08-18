"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LoaderCircle, Send, UserPlus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Message = { id: string; sender_id: string; body: string; lesson_id: string | null; created_at: string };

export default function ChatClient({ userId, initialConversationId, canManageParticipants }: { userId: string; initialConversationId: string | null; canManageParticipants: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantId, setParticipantId] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = initialConversationId ? `?conversationId=${encodeURIComponent(initialConversationId)}` : "";
    void fetch(`/api/chat${query}`)
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (!response.ok) setError(data.error || "Impossible de charger la conversation.");
        else {
          setMessages(data.messages || []);
          setConversationId(data.conversation?.id || null);
        }
      })
      .catch(() => setError("Impossible de joindre le service de discussion."))
      .finally(() => setLoading(false));
  }, [initialConversationId]);

  useEffect(() => {
    if (!conversationId || !canManageParticipants) return;
    void fetch(`/api/chat/participants?conversationId=${encodeURIComponent(conversationId)}`).then((response) => response.json()).then((data) => setParticipants((data.participants || []).map((item: { user_id: string }) => item.user_id)));
  }, [conversationId, canManageParticipants]);

  useEffect(() => {
    if (!conversationId) return;
    const supabase = createClient();
    if (!supabase) return;
    const channel = supabase.channel(`chat:${conversationId}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` }, (payload: { new: Record<string, unknown> }) => {
      const message = payload.new as Message;
      setMessages((current) => current.some((item) => item.id === message.id) ? current : [...current, message]);
    }).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (!body.trim()) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body, conversationId: conversationId || undefined }) });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Impossible d'envoyer le message.");
        return;
      }
      setBody("");
      setConversationId((current) => current || data.conversationId || null);
      setMessages((current) => current.some((item) => item.id === data.message.id) ? current : [...current, data.message]);
    } catch {
      setError("Impossible de joindre le service de discussion.");
    } finally {
      setSending(false);
    }
  }

  async function addParticipant() {
    if (!conversationId || !participantId.trim()) return;
    const response = await fetch("/api/chat/participants", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ conversationId, userId: participantId.trim() }) });
    if (response.ok) { setParticipants((current) => [...current, participantId.trim()]); setParticipantId(""); }
  }

  async function removeParticipant(targetUserId: string) {
    if (!conversationId) return;
    const response = await fetch("/api/chat/participants", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ conversationId, userId: targetUserId }) });
    if (response.ok) setParticipants((current) => current.filter((id) => id !== targetUserId));
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-8 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
        <header className="border-b border-white/10 px-5 py-4"><div className="flex items-center justify-between"><div><p className="font-semibold">Votre conversation avec le coach</p><p className="text-xs text-white/40">Une conversation unique, disponible après chaque leçon</p></div><Link href="/practicepremium" className="text-sm text-[#e8c96a]">Retour au parcours</Link></div>
          {canManageParticipants && conversationId && <div className="mt-4 border-t border-white/10 pt-4"><div className="flex gap-2"><input value={participantId} onChange={(event) => setParticipantId(event.target.value)} placeholder="UUID du troisième participant" className="min-w-0 flex-1 rounded border border-white/15 bg-black/30 px-3 py-2 text-xs" /><button onClick={addParticipant} disabled={participants.length >= 3} aria-label="Ajouter le participant" className="rounded border border-[#c9a84c]/40 px-3 text-[#e8c96a] disabled:opacity-30"><UserPlus size={16} /></button></div><div className="mt-2 flex flex-wrap gap-2">{participants.map((id) => <span key={id} className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-[10px] text-white/50">{id.slice(0, 8)}{id !== userId && <button onClick={() => removeParticipant(id)} aria-label="Retirer"><X size={11} /></button>}</span>)}</div></div>}
        </header>
        <section className="flex-1 space-y-4 overflow-y-auto p-5">
          {loading && <LoaderCircle className="mx-auto animate-spin text-[#c9a84c]" />}
          {!loading && messages.length === 0 && <div className="py-20 text-center text-white/45"><p>Posez votre première question.</p><p className="mt-2 text-sm">Votre coach la verra dans son tableau de bord.</p></div>}
          {messages.map((message) => <div key={message.id} className={`flex ${message.sender_id === userId ? "justify-end" : "justify-start"}`}><div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${message.sender_id === userId ? "bg-[#c9a84c] text-black" : "bg-white/10 text-white"}`}><p>{message.body}</p><p className="mt-1 text-[10px] opacity-50">{new Date(message.created_at).toLocaleString()}</p></div></div>)}
          <div ref={bottomRef} />
        </section>
        {error && <p role="alert" className="border-t border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}
        <form onSubmit={send} className="flex gap-3 border-t border-white/10 p-4"><textarea value={body} onChange={(event) => setBody(event.target.value)} maxLength={2000} rows={2} placeholder="Écrivez votre question..." className="flex-1 resize-none rounded border border-white/15 bg-black/30 p-3 outline-none focus:border-[#c9a84c]" /><button disabled={sending || !body.trim()} aria-label="Envoyer" className="grid w-12 place-items-center rounded bg-[#c9a84c] text-black disabled:opacity-40">{sending ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />}</button></form>
      </div>
    </main>
  );
}
