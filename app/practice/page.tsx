"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PlacementTestModal from "@/components/PlacementTestModal";
import { persistProgress } from "@/lib/progress-client";

const LEVELS = [
  { slug: "level1", title: "Foundation", requiresTest: false },
  { slug: "level2", title: "Beginner", requiresTest: true },
  { slug: "level3", title: "Intermediate", requiresTest: true },
  { slug: "level4", title: "Advanced", requiresTest: true },
  { slug: "level5", title: "Fluent", requiresTest: true },
  { slug: "business1", title: "Business English 1", requiresTest: false },
  { slug: "business2", title: "Business English 2", requiresTest: true },
];

export default function PracticePage() {
  const [unlockedLevels, setUnlockedLevels] = useState<Record<string, boolean>>(
    {},
  );
  const [activeTestLevel, setActiveTestLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 relative overflow-hidden">
      <Navbar />

      {/* Lignes dorées fines décoratives d'arrière-plan */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-linear-to-b from-[#c9a84c]/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[1px] h-full bg-linear-to-b from-transparent via-[#c9a84c]/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto pt-16 relative z-10">
        <div className="text-center mb-16">
          <h1
            className="text-5xl md:text-6xl text-[#c9a84c] mb-4 tracking-wide font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Practice Suite
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-md mx-auto uppercase tracking-widest font-light">
            Sélectionnez votre niveau d'excellence
          </p>
          <div className="w-16 h-[1px] bg-[#c9a84c]/40 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEVELS.map((level) => {
            const isUnlocked = unlockedLevels[level.slug];

            return (
              <Link
                key={level.slug}
                href={`/practice/${level.slug}`}
                onClick={(e) =>
                  handleLevelClick(e, level.slug, level.requiresTest)
                }
              >
                <div
                  className={`
                    relative rounded-2xl border bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8
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
                      {isUnlocked ? "✓ Débloqué" : "🔒 Test Requis"}
                    </div>
                  )}

                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-widest mb-1 font-mono">
                      LEVEL
                    </div>
                    <h2
                      className="text-3xl font-normal tracking-wide text-white"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
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
                      {isUnlocked ? "Accéder →" : "Passer le test ➔"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
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
