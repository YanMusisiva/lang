import Link from "next/link";
import { redirect } from "next/navigation";
import PremiumPractice from "@/components/premium/PremiumPractice";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function PremiumPracticePage() {
  if (!isSupabaseConfigured()) redirect("/auth?next=/practicepremium");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth?next=/practicepremium");

  const [{ data: enrollment }, { data: profile }] = await Promise.all([
    supabase.from("enrollments").select("status, ends_at, track").eq("user_id", user.id).maybeSingle(),
    supabase.from("profiles").select("role").eq("id", user.id).maybeSingle(),
  ]);
  const active = enrollment?.status === "active" && (!enrollment.ends_at || new Date(enrollment.ends_at) > new Date());
  const staff = ["coach", "admin"].includes(profile?.role || "");

  if (!active && !staff) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] px-6 py-24 text-white">
        <section className="mx-auto max-w-xl rounded-lg border border-[#c9a84c]/30 bg-white/[0.03] p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#c9a84c]">Espace premium</p>
          <h1 className="mt-4 font-serif text-4xl">Un programme actif est nécessaire</h1>
          <p className="mt-4 text-white/60">Votre compte fonctionne, mais aucun accès premium actif ne lui est encore associé.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/#pricing" className="rounded bg-[#c9a84c] px-6 py-3 font-semibold text-black">Voir les coachings</Link>
            <Link href="/offres-speciales" className="rounded border border-white/20 px-6 py-3">Offres de groupe</Link>
          </div>
        </section>
      </main>
    );
  }

  return <PremiumPractice track={enrollment?.track || "professional"} />;
}
