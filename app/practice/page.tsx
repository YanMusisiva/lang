"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RevealWrapper from "@/components/motion/RevealWrapper";
import Navbar from "@/components/layout/Navbar";
import PlacementTestModal from "@/components/practice/PlacementTestModal";
import { persistProgress } from "@/lib/progress-client";
import { useLang } from "@/context/LangContext";

type Audience = "general" | "professional" | "entrepreneur" | "developer";

const LEVELS = [
  { slug: "level1", title: "Foundation", requiresTest: false, audiences: ["general"] },
  { slug: "level2", title: "Beginner", requiresTest: true, audiences: ["general"] },
  { slug: "level3", title: "Intermediate", requiresTest: true, audiences: ["general"] },
  { slug: "level4", title: "Advanced", requiresTest: true, audiences: ["general"] },
  { slug: "level5", title: "Fluent", requiresTest: true, audiences: ["general"] },
  { slug: "business1", title: "Business English 1", requiresTest: false, audiences: ["professional", "entrepreneur", "developer"] },
  { slug: "business2", title: "Business English 2", requiresTest: true, audiences: ["professional", "entrepreneur", "developer"] },
];

const AUDIENCES: { value: Audience; fr: string; en: string }[] = [
  { value: "general", fr: "Anglais général", en: "General English" },
  { value: "professional", fr: "Professionnels", en: "Professionals" },
  { value: "entrepreneur", fr: "Entrepreneurs", en: "Entrepreneurs" },
  { value: "developer", fr: "Développeurs", en: "Developers" },
];

export default function PracticePage() {
  const { t } = useLang();
  const [unlockedLevels, setUnlockedLevels] = useState<Record<string, boolean>>(
    {},
  );
  const [activeTestLevel, setActiveTestLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [audience, setAudience] = useState<Audience>("general");
  const [page, setPage] = useState(1);
  const filteredLevels = LEVELS.filter((level) => level.audiences.includes(audience));
  const pageCount = Math.max(1, Math.ceil(filteredLevels.length / 3));
  const visibleLevels = filteredLevels.slice((page - 1) * 3, page * 3);

  useEffect(() => {
    const status: Record<string, boolean> = {};
    LEVELS.forEach((lvl) => {
      if (!lvl.requiresTest) {
        status[lvl.slug] = true;
      } else {
        // Vérifie si le test a été réussi dans le localStorage
        const testPassed = localStorage.getItem(
          `placement-test-passed-${lvl.slug}`,
        );
        status[lvl.slug] = testPassed === "true";
      }
    });
    setUnlockedLevels(status);
    setLoading(false);
  }, []);

  const handleLevelClick = (
    e: React.MouseEvent,
    slug: string,
    requiresTest: boolean,
  ) => {
    if (requiresTest && !unlockedLevels[slug]) {
      e.preventDefault(); // Bloque la navigation spontanée vers la page de sous-module
      setActiveTestLevel(slug); // Ouvre le modal de test de niveau
    }
  };

  const handleTestSuccess = (slug: string) => {
    persistProgress(`placement-test-passed-${slug}`, "true");
    setUnlockedLevels((prev) => ({ ...prev, [slug]: true }));
    setActiveTestLevel(null);
  };

  if (loading)
    return (
      <div className="text-white text-center p-10">
        Loading premium experience...
      </div>
    );

  return (
    <main className="interior-page min-h-screen bg-[#0a0a0a] text-white p-8 relative overflow-hidden">
      <Navbar />

      {/* Lignes dorées fines décoratives d'arrière-plan */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-linear-to-b from-[#c9a84c]/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[1px] h-full bg-linear-to-b from-transparent via-[#c9a84c]/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto pt-24 relative z-10">
        <div className="page-heading text-center mb-16">
          <h1
            className="text-5xl md:text-6xl text-[#c9a84c] mb-4 tracking-wide font-light"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {t("Espace Practice", "Practice Suite")}
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-md mx-auto uppercase tracking-widest font-light">
            {t("Choisissez votre parcours et votre niveau", "Choose your path and level")}
          </p>
          <div className="w-16 h-[1px] bg-[#c9a84c]/40 mx-auto mt-4" />
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {AUDIENCES.map((item) => (
            <button key={item.value} type="button" onClick={() => { setAudience(item.value); setPage(1); }} className={`rounded-full border px-4 py-2 text-sm transition ${audience === item.value ? "border-[#c9a84c] bg-[#c9a84c] font-semibold text-black" : "border-white/15 text-white/60 hover:border-[#c9a84c]"}`}>{t(item.fr, item.en)}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleLevels.map((level) => {
            const isUnlocked = unlockedLevels[level.slug];

            return (
              <RevealWrapper key={level.slug}><Link
                href={`/practice/${level.slug}`}
                onClick={(e) =>
                  handleLevelClick(e, level.slug, level.requiresTest)
                }
              >
                <div
                  className={`
                    learning-card relative rounded-2xl border bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8
                    hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between h-56
                    ${
                      isUnlocked
                        ? "border-white/10 hover:border-[#c9a84c]/50 shadow-lg shadow-black"
                        : "border-[#c9a84c]/20 bg-[#c9a84c]/[0.02]"
                    }
                  `}
                >
                  {/* Badge de statut du niveau */}
                  {level.requiresTest && (
                    <div
                      className={`absolute top-4 right-4 text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1 rounded border ${
                        isUnlocked
                          ? "border-green-500/30 text-green-400 bg-green-500/5"
                          : "border-[#c9a84c]/40 text-[#e8c96a] bg-[#c9a84c]/10 animate-pulse"
                      }`}
                    >
                      {isUnlocked ? t("✓ Débloqué", "✓ Unlocked") : t("🔒 Test requis", "🔒 Test required")}
                    </div>
                  )}

                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-widest mb-1 font-mono">
                      LEVEL
                    </div>
                    <h2
                      className="text-3xl font-normal tracking-wide text-white"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {level.title}
                    </h2>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                    <span className="text-white/40 uppercase tracking-wider font-mono">
                      {level.slug.startsWith("business")
                        ? "Professional"
                        : "General"}
                    </span>
                    <span className="text-[#c9a84c] font-semibold tracking-wider uppercase">
                      {isUnlocked ? t("Accéder →", "Open →") : t("Passer le test ➔", "Take the test ➔")}
                    </span>
                  </div>
                </div>
              </Link></RevealWrapper>
            );
          })}
        </div>
        {pageCount > 1 && <nav className="mt-10 flex items-center justify-center gap-2" aria-label={t("Pagination des niveaux", "Level pagination")}>
          <button type="button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-full border border-white/15 px-4 py-2 text-sm disabled:opacity-30">{t("Précédent", "Previous")}</button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} type="button" onClick={() => setPage(number)} className={`h-10 w-10 rounded-full border text-sm ${page === number ? "border-[#c9a84c] bg-[#c9a84c] text-black" : "border-white/15"}`}>{number}</button>)}
          <button type="button" disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="rounded-full border border-white/15 px-4 py-2 text-sm disabled:opacity-30">{t("Suivant", "Next")}</button>
        </nav>}
      </div>

      {/* Modal interactif de test de niveau */}
      {activeTestLevel && (
        <PlacementTestModal
          levelSlug={activeTestLevel}
          levelTitle={
            LEVELS.find((l) => l.slug === activeTestLevel)?.title || ""
          }
          onClose={() => setActiveTestLevel(null)}
          onSuccess={() => handleTestSuccess(activeTestLevel)}
        />
      )}
    </main>
  );
}
