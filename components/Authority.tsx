"use client";

import { useLang } from "@/context/LangContext";
import RevealWrapper from "./RevealWrapper";
import Image from "next/image";

const TAGS = [
  { fr: "✦ Formateurs certifiés", en: "✦ Certified trainers" },
  { fr: "✦ Méthode basée sur la science", en: "✦ Science-based method" },
  { fr: "✦ Résultats en 7 semaines", en: "✦ Results in 7 weeks" },
  { fr: "✦ Suivi personnalisé", en: "✦ Personalized follow-up" },
];

export default function Authority() {
  const { t } = useLang();

  return (
    <section id="presentation" className="py-24 bg-[#fafaf8] px-8">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-16">
        {/* Visual block */}
        <RevealWrapper className="shrink-0">
          <div className="w-72 h-80 md:w-80 md:h-[340px] rounded-lg bg-gradient-to-br from-[#0a0a0a] to-[#1c1c1c] border border-[#c9a84c]/20 relative overflow-hidden flex items-center justify-center">
            {/* <span
              className="text-[#c9a84c] opacity-20"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "8rem",
              }}
            >
              ✦
            </span> */}
            <Image src="/image.jpeg" alt="Authority" width={320} height={340} />
            {/* <div className="absolute bottom-4 right-4 bg-[#c9a84c] text-black px-4 py-1.5 rounded text-xs font-bold tracking-widest uppercase">
              {t("Depuis 2024", "Since 2024")}
            </div> */}
          </div>
        </RevealWrapper>

        {/* Content */}
        <RevealWrapper className="flex-1 min-w-[280px]">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#c9a84c] mb-4">
            {t("Notre autorité", "Our authority")}
          </p>
          <h2
            className="text-black leading-tight mb-5"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 600,
            }}
          >
            {t(
              "Une méthode utilisée depuis 2 ans, qui a aidé plus d'une centaine d'étudiants",
              "A method used for 2 years, that has helped over 100 students",
            )}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {t(
              "LangListening n'est pas une application. C'est une approche humaine, fondée sur la recherche en linguistique : écoute intensive + répétition guidée + conversation réelle. Comme un enfant qui apprend à parler — mais en accéléré. Nous avons cinq niveaux et chaque niveau prend juste 1 mois",
              "LangListening is not an app. It's a human approach, grounded in linguistic research: intensive listening + guided repetition + real conversation. Like a child learning to speak — but accelerated. We have five levels and every level take just 1 month",
            )}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TAGS.map((tag, i) => (
              <span
                key={i}
                className="border border-[#c9a84c]/40 text-[#9a7a2e] bg-[#c9a84c]/6 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
              >
                {t(tag.fr, tag.en)}
              </span>
            ))}
          </div>

          <a
            href="#pricing"
            className="inline-block bg-[#c9a84c] text-black font-semibold px-8 py-3.5 rounded text-sm tracking-wide hover:bg-[#e8c96a] hover:-translate-y-0.5 transition-all duration-200"
          >
            {t("Commencer ma transformation", "Start my transformation")}
          </a>
        </RevealWrapper>
      </div>
    </section>
  );
}
