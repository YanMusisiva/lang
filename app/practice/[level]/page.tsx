"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { PRACTICE } from "@/data/practice";
import { useParams } from "next/navigation";

export default function LevelPage() {
  const params = useParams();
  const [moduleStatuses, setModuleStatuses] = useState<
    Record<
      string,
      { unlocked: boolean; finished: boolean; scorePercent: number }
    >
  >({});
  const [loading, setLoading] = useState(true);

  let levelInput = (params.level as string).trim().toLowerCase();
  if (/^(level|business)\d+$/.test(levelInput)) {
    levelInput = levelInput.replace(/^([a-z]+)(\d+)$/, "$1-$2");
  }

  const levelKey = levelInput as keyof typeof PRACTICE;
  const levelData = PRACTICE[levelKey];

  useEffect(() => {
    if (!levelData) return;

    const modules = Object.keys(levelData.modules);
    const statuses: Record<
      string,
      { unlocked: boolean; finished: boolean; scorePercent: number }
    > = {};

    modules.forEach((modKey, index) => {
      // Récupération des données locales
      const speakingProgress = localStorage.getItem(
        `speaking-progress-${levelInput}-${modKey}`,
      );
      const writingProgress = localStorage.getItem(
        `translation-progress-${levelInput}-${modKey}`,
      );

      let isFinished = false;
      let scorePercent = 0;

      // On extrait le score et la validation du module actuel s'ils existent
      if (speakingProgress) {
        const data = JSON.parse(speakingProgress);
        isFinished = data.isFinished === true;
        // Calcul du pourcentage (ex: (4/5) * 100 = 80%)
        if (data.totalQuestions)
          scorePercent = Math.round((data.score / data.totalQuestions) * 100);
      } else if (writingProgress) {
        const data = JSON.parse(writingProgress);
        isFinished = data.isFinished === true;
        if (data.totalQuestions)
          scorePercent = Math.round((data.score / data.totalQuestions) * 100);
      }

      // Règle de déblocage
      if (index === 0) {
        // Le premier module est toujours accessible
        statuses[modKey] = {
          unlocked: true,
          finished: isFinished,
          scorePercent,
        };
      } else {
        // Pour les suivants, on regarde le statut du PRÉCÉDENT module
        const prevModKey = modules[index - 1];
        const prevStatus = statuses[prevModKey];

        // Débloqué SI le précédent est fini ET a obtenu au moins 50%
        const isPreviousPassed =
          prevStatus.finished && prevStatus.scorePercent >= 50;

        statuses[modKey] = {
          unlocked: isPreviousPassed,
          finished: isFinished,
          scorePercent,
        };
      }
    });

    setModuleStatuses(statuses);
    setLoading(false);
  }, [levelData, levelInput]);

  if (!levelData)
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <div className="text-white text-center p-10">Niveau introuvable</div>
        <Link
          href="/practice"
          className="text-sm text-white/50 hover:text-[#c9a84c] transition"
        >
          ← Retour aux niveaux
        </Link>
      </div>
    );
  if (loading)
    return <div className="text-white text-center p-10">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-10">
        <div className="mb-8">
          <Link
            href="/practice"
            className="text-sm text-white/50 hover:text-[#c9a84c] transition"
          >
            ← Retour aux niveaux
          </Link>
          <h1
            className="text-4xl font-bold mt-2 text-[#c9a84c]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {levelData.title}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(levelData.modules).map(([slug, module], index) => {
            const status = moduleStatuses[slug] || {
              unlocked: index === 0,
              finished: false,
              scorePercent: 0,
            };

            return status.unlocked ? (
              <Link key={slug} href={`/practice/${levelInput}/${slug}`}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#c9a84c] hover:bg-white/[0.07] transition duration-200 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden">
                  {/* Badge de complétion */}
                  {status.finished && (
                    <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-lg">
                      Complété ({status.scorePercent}%)
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-semibold text-white pr-20">
                      {module.title}
                    </h3>
                    <p className="mt-2 text-white/80 text-sm">
                      {module.type === "speaking"
                        ? "🎤 Practice Oral"
                        : "✍️ Practice Écrit"}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-sm text-white/50">
                    <span>⏱ {module.estimatedMinutes} min</span>
                    <span className="text-[#c9a84c] text-xs font-medium uppercase tracking-wider">
                      {status.finished ? "Refaire l'exercice →" : "Commencer →"}
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={slug}
                className="bg-white/[0.02] border border-white/5 rounded-xl p-6 opacity-40 cursor-not-allowed flex flex-col justify-between h-full"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white/70 flex items-center gap-2">
                    🔒 {module.title}
                  </h3>
                  <p className="mt-2 text-white/40 text-xs leading-relaxed">
                    Verrouillé. Terminez le module précédent avec **au moins 50%
                    de réussite** pour débloquer cet exercice.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-red-400/70 font-medium uppercase tracking-wider">
                  Bloqué
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
