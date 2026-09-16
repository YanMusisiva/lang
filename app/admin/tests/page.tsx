import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/server";

type TestStats = { total: number; average: number | null; last30: number; level1: number; level2: number; level3: number; level4: number };

export default async function TestStatistics() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("level_test_stats");
  const stats = data as TestStats | null;
  return <main className="interior-page min-h-screen bg-[#0a0a0a] text-white">
    <Navbar />
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-36">
      <Link href="/admin" className="text-link text-white/60">← Administration</Link>
      <p className="eyebrow mt-10 mb-4 text-[#e8c96a]">Test de niveau</p>
      <h1 className="section-title">L’anglais de vos visiteurs.</h1>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">Scores anonymes des tests terminés. Une reprise du même test ne crée pas de doublon ; un nouveau test compte comme une nouvelle tentative.</p>
      {error || !stats ? <div className="mt-10 rounded-2xl border border-[#c9a84c]/30 p-7">
        <h2 className="text-xl">Statistiques indisponibles</h2>
        <p className="mt-3 text-sm leading-7 text-white/60">Vérifiez la connexion à Supabase et l’application de la migration <code className="break-all">004_level_test.sql</code>. Les visiteurs peuvent toujours passer le test et conserver leur progression sur leur appareil.</p>
      </div> : <>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[["Tests terminés", stats.total], ["Score moyen / 100", stats.average === null ? "—" : new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 }).format(stats.average)], ["Ces 30 derniers jours", stats.last30]].map(([label, value]) => <div className="rounded-2xl border border-white/10 bg-white/[.03] p-7" key={label}><p className="text-xs text-white/60">{label}</p><p className="mt-4 text-5xl tracking-tight text-[#e8c96a]">{value}</p></div>)}
        </div>
        <section className="mt-8 rounded-2xl border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl">Répartition des niveaux</h2>
          {stats.total === 0 ? <p className="mt-6 text-sm text-white/60">Les premiers résultats apparaîtront ici dès qu’un visiteur terminera son test.</p> : <div className="mt-7 space-y-7">
            {([stats.level1, stats.level2, stats.level3, stats.level4]).map((count, index) => <div key={index}>
              <div className="mb-3 flex justify-between gap-4 text-sm"><span>{index + 1} · {["Débutant", "Débutant +", "Intermédiaire", "Avancé"][index]}</span><span className="text-white/60">{count} ({Math.round(count / stats.total * 100)} %)</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#c9a84c]" style={{ width: `${count / stats.total * 100}%` }} /></div>
            </div>)}
          </div>}
        </section>
        <p className="mt-6 text-xs leading-6 text-white/40">Toutes périodes · Test de niveau v1 · La moyenne porte sur les tentatives, pas sur un nombre de personnes uniques. Aucun nom, e-mail ou compte utilisateur n’est associé aux scores.</p>
      </>}
    </div>
  </main>;
}
