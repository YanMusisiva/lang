import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, Mic, TrendingUp } from "lucide-react";
import SignOutButton from "@/components/SignOutButton";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) redirect("/auth");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth?next=/dashboard");

  const { data: profile } = await supabase.from("profiles").select("display_name, role").eq("id", user.id).single();
  const { data: progress } = await supabase.from("progress").select("storage_key, payload, updated_at").order("updated_at", { ascending: false });
  const completed = (progress || []).filter((item) => Boolean((item.payload as { finished?: boolean })?.finished)).length;

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
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 p-6"><TrendingUp className="text-[#c9a84c]" /><p className="mt-5 text-3xl font-semibold">{completed}</p><p className="text-sm text-white/50">modules terminés</p></div>
          <Link href="/practice" className="rounded-lg border border-white/10 p-6 hover:border-[#c9a84c]/60"><Mic className="text-[#c9a84c]" /><h2 className="mt-5 text-xl">Continuer la pratique</h2><p className="text-sm text-white/50">Exercices oraux et écrits</p></Link>
          <Link href="/blog" className="rounded-lg border border-white/10 p-6 hover:border-[#c9a84c]/60"><BookOpen className="text-[#c9a84c]" /><h2 className="mt-5 text-xl">Ressources</h2><p className="text-sm text-white/50">Conseils et méthodes</p></Link>
        </div>
        {profile?.role === "admin" && <Link href="/admin" className="mt-8 inline-block text-[#c9a84c]">Ouvrir l'administration →</Link>}
      </div>
    </main>
  );
}
