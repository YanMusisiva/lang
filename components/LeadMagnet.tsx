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
              "Commencez gratuitement",
              "Start for free",
            )}
          </p>

          <h2
            className="text-[#0a0a0a] text-3xl md:text-4xl font-normal leading-tight mb-4 max-w-2xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t(
              "Entraînez l'anglais dont vous avez besoin au travail",
              "Practice the English you need at work",
            )}
          </h2>

          <p className="text-gray-700 text-base leading-relaxed max-w-3xl mx-auto">
            {t(
              "Utilisez nos exercices gratuits pour travailler votre écoute, votre expression orale et vos réponses écrites. Rejoignez ensuite la communauté pour pratiquer des réunions, entretiens, présentations et échanges professionnels avec d'autres apprenants.",
              "Use our free exercises to improve listening, speaking, and written responses. Then join the community to practice meetings, interviews, presentations, and workplace conversations with other learners.",
            )}
          </p>

          {/* Points forts centrés horizontalement */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-800 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-[#9a7a2e]">✓</span>
              <span>
                {t(
                  "Speaking et writing gratuits",
                  "Free speaking and writing practice",
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#9a7a2e]">✓</span>
              <span>
                {t(
                  "Simulations de situations professionnelles",
                  "Workplace simulations",
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#9a7a2e]">✓</span>
              <span>
                {t(
                  "Pratique avec d'autres professionnels",
                  "Practice with other professionals",
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
            {t("Rejoindre la communauté", "Join the community")}
          </Link>
        </div>
      </div>
    </section>
  );
}
