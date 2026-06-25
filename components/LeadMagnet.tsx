"use client";

import { useLang } from "@/context/LangContext";
import Link from "next/link";
import StartFreeButton from "@/components/ui/StartFreeButton"; // Ajuste le chemin d'import selon ton projet

export default function LeadMagnet() {
  const { t } = useLang();

  return (
    <section
      id="gratuit"
      className="bg-[#fdf6e3] border-y border-[#c9a84c]/30 py-16 px-8 relative overflow-hidden"
    >
      {/* Conteneur principal en colonne (flex-col) pour forcer le bouton en dessous partout */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        {/* Icone Premium centrée */}
        <div className="w-20 h-20 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded-2xl flex items-center justify-center text-3xl shadow-xl">
          🎙️
        </div>

        {/* Section Textuelle */}
        <div className="w-full">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#9a7a2e] mb-3 font-mono">
            {t(
              "Pratique interactive & Communauté",
              "Interactive Practice & Community",
            )}
          </p>

          <h2
            className="text-[#0a0a0a] text-3xl md:text-4xl font-normal leading-tight mb-4 max-w-2xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t(
              "Pratiquez chaque jour en solo, débattez en groupe en conditions réelles",
              "Practice daily on your own, debate in groups under real conditions",
            )}
          </h2>

          <p className="text-gray-700 text-base leading-relaxed max-w-3xl mx-auto">
            {t(
              "Propulsez votre anglais grâce à une double routine unique : affinez vos compétences quotidiennement et gratuitement sur notre plateforme interactive, puis rejoignez notre communauté WhatsApp exclusive pour participer à des débats passionnants avec d'autres membres autour de sujets et de situations de la vie réelle.",
              "Boost your English with a unique double routine: sharpen your skills daily and for free on our interactive platform, then join our exclusive WhatsApp community to take part in exciting debates with other members around real-life topics and situations.",
            )}
          </p>

          {/* Points forts centrés horizontalement */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-800 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-[#9a7a2e]">✓</span>
              <span>
                {t(
                  "Exercices oraux et écrits 100% gratuits",
                  "100% free speaking and writing exercises",
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#9a7a2e]">✓</span>
              <span>
                {t(
                  "Débats hebdomadaires sur des sujets concrets",
                  "Weekly debates on real-world topics",
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#9a7a2e]">✓</span>
              <span>
                {t(
                  "Immersion collective stimulante",
                  "Stimulating community immersion",
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Bloc d'actions positionné en dessous */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mt-4">
          {/* Utilisation de ton bouton réutilisable avec une largeur adaptative */}
          <StartFreeButton className="w-full sm:w-auto text-center" />

          {/* Bouton Secondaire : WhatsApp */}
          <Link
            href="https://chat.whatsapp.com/E5yLg2zxcBWLayZ1wnBLt9?mode=gi_t"
            className="w-full sm:w-auto text-center bg-[#0a0a0a] text-[#e8c96a] border border-[#c9a84c]/50 font-semibold px-8 py-4 rounded-xl text-sm uppercase tracking-wider hover:bg-[#c9a84c] hover:text-black hover:-translate-y-0.5 transition-all duration-300 shadow-xl whitespace-nowrap"
          >
            {t("Club de débat", "Debate club")}
          </Link>
        </div>
      </div>
    </section>
  );
}
