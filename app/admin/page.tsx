import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Inbox, MessageSquareText, UserRoundPlus, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const admin = createAdminClient();
  const usersResult = admin ? await admin.auth.admin.listUsers({ page: 1, perPage: 1000 }) : null;
  const [registrations, contacts, chats, articles, tests, recentRegistrations, recentContacts] = await Promise.all([
    supabase.from("programme_registrations").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("messages").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("level_test_results").select("attempt_id", { count: "exact", head: true }),
    supabase.from("programme_registrations").select("id,name,email,motivation,created_at").order("created_at", { ascending: false }).limit(4),
    supabase.from("contact_submissions").select("id,name,email,message,created_at").order("created_at", { ascending: false }).limit(4),
  ]);
  const recent = [
    ...(recentRegistrations.data || []).map((item) => ({ id: item.id, name: item.name, email: item.email, created_at: item.created_at, kind: "Inscription", preview: item.motivation })),
    ...(recentContacts.data || []).map((item) => ({ id: item.id, name: item.name, email: item.email, created_at: item.created_at, kind: "Contact", preview: item.message })),
  ].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at)).slice(0, 6);
  const cards = [
    { label: "Messages reçus", value: (registrations.count || 0) + (contacts.count || 0) + (chats.count || 0), icon: Inbox, href: "/admin/messages" },
    { label: "Inscriptions", value: registrations.count || 0, icon: UserRoundPlus, href: "/admin/messages" },
    { label: "Demandes de contact", value: contacts.count || 0, icon: MessageSquareText, href: "/admin/messages" },
    { label: "Articles", value: articles.count || 0, icon: FileText, href: "/admin/articles" },
    { label: "Tests terminés", value: tests.count || 0, icon: BookOpen, href: "/admin/tests" },
    { label: "Utilisateurs", value: usersResult?.data.users.length || 0, icon: Users, href: "/admin/users" },
  ];

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-8 md:px-9 md:py-10">
      <div className="mb-9">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#9b7921]">Vue générale</p>
        <h1 className="font-serif text-3xl leading-tight md:text-5xl">Tableau de bord administrateur</h1>
        <p className="mt-3 max-w-2xl text-sm text-black/50">Suivez les demandes, les inscriptions et le contenu LangListening depuis un seul espace.</p>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="group rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_8px_30px_rgba(20,20,10,0.04)] transition hover:-translate-y-0.5 hover:border-[#c9a84c]/55">
            <div className="mb-7 flex items-center justify-between"><span className="text-sm text-black/50">{label}</span><span className="rounded-xl bg-[#f4edd7] p-2.5 text-[#967316]"><Icon size={19} /></span></div>
            <div className="flex items-end justify-between"><strong className="font-serif text-4xl font-normal">{value}</strong><ArrowRight size={18} className="text-black/20 transition group-hover:translate-x-1 group-hover:text-[#967316]" /></div>
          </Link>
        ))}
      </section>
      <div className="mt-7 grid gap-7 xl:grid-cols-[1.7fr_1fr]">
        <section className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center justify-between"><div><h2 className="font-serif text-2xl">Demandes récentes</h2><p className="mt-1 text-sm text-black/45">Les derniers formulaires reçus sur le site.</p></div><Link href="/admin/messages" className="text-sm font-semibold text-[#8a6c18] hover:underline">Tout voir</Link></div>
          {recent.length ? <div className="divide-y divide-black/[0.07]">{recent.map((item) => (
            <Link href="/admin/messages" key={`${item.kind}-${item.id}`} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#11120f] text-[#d4b85e]"><MessageSquareText size={16} /></span>
              <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center justify-between gap-2"><strong className="text-sm">{item.name}</strong><span className="text-xs text-black/35">{new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(item.created_at))}</span></span><span className="mt-0.5 block text-xs text-[#94721b]">{item.kind} · {item.email}</span><span className="mt-1 block truncate text-sm text-black/45">{item.preview}</span></span>
            </Link>
          ))}</div> : <p className="rounded-xl bg-[#f7f5ee] p-8 text-center text-sm text-black/45">Aucune demande pour le moment.</p>}
        </section>
        <section className="rounded-2xl bg-[#11120f] p-6 text-white shadow-xl md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4b85e]">Accès rapides</p><h2 className="mt-3 font-serif text-2xl">Gérer LangListening</h2>
          <div className="mt-6 space-y-2">{[["Lire les messages", "/admin/messages"], ["Créer un article", "/admin/articles"], ["Ajouter une leçon", "/admin/learning"], ["Analyser les tests", "/admin/tests"]].map(([label, href]) => <Link key={href} href={href} className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-white/75 transition hover:border-[#d4b85e]/50 hover:bg-white/5 hover:text-white">{label}<ArrowRight size={16} className="text-[#d4b85e]" /></Link>)}</div>
        </section>
      </div>
    </main>
  );
}
