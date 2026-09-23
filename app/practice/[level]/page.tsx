"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { PRACTICE } from "@/data/practice";
import { useParams } from "next/navigation";
import { useLang } from "@/context/LangContext";

const MODULES_PER_PAGE = 3;

export default function LevelPage() {
  const { t } = useLang();
  const params = useParams();
  const [moduleStatuses, setModuleStatuses] = useState<
    Record<
      string,
      { unlocked: boolean; finished: boolean; scorePercent: number }
    >
  >({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  let levelInput = (params.level as string).trim().toLowerCase();
  if (/^(level|business)\d+$/.test(levelInput)) {
    levelInput = levelInput.replace(/^([a-z]+)(\d+)$/, "$1-$2");
  }

  const levelKey = levelInput as keyof typeof PRACTICE;
  const levelData = PRACTICE[levelKey];
  const moduleEntries = levelData
    ? Object.entries(levelData.modules) as [string, { title: string; type: "speaking" | "writing"; dataset: string; estimatedMinutes: number }][]
    : [];
  const pageCount = Math.max(1, Math.ceil(moduleEntries.length / MODULES_PER_PAGE));
  const visibleModules = moduleEntries.slice((page - 1) * MODULES_PER_PAGE, page * MODULES_PER_PAGE);

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
        <div className="text-white text-center p-10">{t("Niveau introuvable", "Level not found")}</div>
        <Link
          href="/practice"
          className="text-sm text-white/50 hover:text-[#c9a84c] transition"
        >
          ← {t("Retour aux niveaux", "Back to levels")}
        </Link>
      </div>
    );
  if (loading)
    return <div className="text-white text-center p-10">{t("Chargement...", "Loading...")}</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-10">
        <div className="mb-8">
          <Link
            href="/practice"
            className="text-sm text-white/50 hover:text-[#c9a84c] transition"
          >
            ← {t("Retour aux niveaux", "Back to levels")}
          </Link>
          <h1
            className="text-4xl font-bold mt-2 text-[#c9a84c]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {levelData.title}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {visibleModules.map(([slug, module]) => {
            const index = moduleEntries.findIndex(([moduleSlug]) => moduleSlug === slug);
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
                      {t("Complété", "Completed")} ({status.scorePercent}%)
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-semibold text-white pr-20">
                      {module.title}
                    </h3>
                    <p className="mt-2 text-white/80 text-sm">
                      {module.type === "speaking"
                        ? `🎤 ${t("Pratique orale", "Speaking practice")}`
                        : `✍️ ${t("Pratique écrite", "Writing practice")}`}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-sm text-white/50">
                    <span>⏱ {module.estimatedMinutes} min</span>
                    <span className="text-[#c9a84c] text-xs font-medium uppercase tracking-wider">
                      {status.finished ? t("Refaire l'exercice →", "Try again →") : t("Commencer →", "Start →")}
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
                    {t("Verrouillé. Terminez le module précédent avec au moins 50% de réussite pour débloquer cet exercice.", "Locked. Complete the previous module with a score of at least 50% to unlock this exercise.")}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-red-400/70 font-medium uppercase tracking-wider">
                  {t("Bloqué", "Locked")}
                </div>
              </div>
            );
          })}
        </div>
        {pageCount > 1 && (
          <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label={t("Pagination des modules", "Module pagination")}>
            <button type="button" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/65 hover:border-[#c9a84c] disabled:cursor-not-allowed disabled:opacity-30">{t("Précédent", "Previous")}</button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
              <button key={number} type="button" onClick={() => setPage(number)} aria-current={page === number ? "page" : undefined} className={`h-10 w-10 rounded-full border text-sm ${page === number ? "border-[#c9a84c] bg-[#c9a84c] font-semibold text-black" : "border-white/15 text-white/65 hover:border-[#c9a84c]"}`}>{number}</button>
            ))}
            <button type="button" disabled={page === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/65 hover:border-[#c9a84c] disabled:cursor-not-allowed disabled:opacity-30">{t("Suivant", "Next")}</button>
          </nav>
        )}
      </div>
    </div>
  );
}
