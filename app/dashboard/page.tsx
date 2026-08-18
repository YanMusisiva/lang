import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, Crown, MessageCircle, Mic, TrendingUp } from "lucide-react";
import SignOutButton from "@/components/SignOutButton";
import NotificationCenter, { type NotificationItem } from "@/components/NotificationCenter";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) redirect("/auth");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth?next=/dashboard");

  const { data: profile } = await supabase.from("profiles").select("display_name, role").eq("id", user.id).single();
  const { data: progress } = await supabase.from("progress").select("storage_key, payload, updated_at").order("updated_at", { ascending: false });
  const completed = (progress || []).filter((item) => Boolean((item.payload as { finished?: boolean })?.finished)).length;
  const { data: notifications } = await supabase.from("notifications").select("id, title, body, href, read_at, created_at").order("created_at", { ascending: false }).limit(20);
  const isStaff = ["coach", "admin"].includes(profile?.role || "");
  const { data: coachConversations } = isStaff
    ? await supabase.from("conversations").select("id, student_id, updated_at").order("updated_at", { ascending: false }).limit(20)
    : { data: null };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link href="/" className="font-serif text-2xl text-[#c9a84c]">LangListening</Link>
          <SignOutButton />
        </header>
        <section className="py-12">
          <p className="text-sm uppercase tracking-widest text-[#c9a84c]">Espace personnel</p>
          <h1 className="mt-3 font-serif text-5xl">Bonjour {profile?.display_name || user.email}</h1>
          <p className="mt-3 text-white/55">Votre apprentissage est maintenant synchronisé avec votre compte.</p>
        </section>
        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-lg border border-white/10 p-6"><TrendingUp className="text-[#c9a84c]" /><p className="mt-5 text-3xl font-semibold">{completed}</p><p className="text-sm text-white/50">modules terminés</p></div>
          <Link href="/practice" className="rounded-lg border border-white/10 p-6 hover:border-[#c9a84c]/60"><Mic className="text-[#c9a84c]" /><h2 className="mt-5 text-xl">Continuer la pratique</h2><p className="text-sm text-white/50">Exercices oraux et écrits</p></Link>
          <Link href="/practicepremium" className="rounded-lg border border-[#c9a84c]/35 p-6 hover:border-[#c9a84c]"><Crown className="text-[#c9a84c]" /><h2 className="mt-5 text-xl">Espace premium</h2><p className="text-sm text-white/50">Leçons, IA et accompagnement</p></Link>
          <Link href="/blog" className="rounded-lg border border-white/10 p-6 hover:border-[#c9a84c]/60"><BookOpen className="text-[#c9a84c]" /><h2 className="mt-5 text-xl">Ressources</h2><p className="text-sm text-white/50">Conseils et méthodes</p></Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/chat" className="inline-flex items-center gap-2 rounded border border-white/10 px-4 py-2.5 text-sm hover:border-[#c9a84c]/60"><MessageCircle size={17} />Ouvrir ma conversation</Link>
        </div>
        <NotificationCenter userId={user.id} initialNotifications={(notifications || []) as NotificationItem[]} />
        {isStaff && <section className="mt-10 border-t border-white/10 pt-8"><h2 className="font-serif text-3xl">Questions des élèves</h2><div className="mt-5 space-y-3">{coachConversations?.length ? coachConversations.map((conversation) => <Link key={conversation.id} href={`/chat?conversation=${conversation.id}`} className="flex items-center justify-between rounded border border-white/10 p-4 hover:border-[#c9a84c]/60"><span>Élève {conversation.student_id.slice(0, 8)}</span><span className="text-xs text-white/40">{new Date(conversation.updated_at).toLocaleString("fr-FR")}</span></Link>) : <p className="text-white/40">Aucune conversation pour le moment.</p>}</div></section>}
        {profile?.role === "admin" && <Link href="/admin" className="mt-8 inline-block text-[#c9a84c]">Ouvrir l'administration →</Link>}
      </div>
    </main>
  );
}
