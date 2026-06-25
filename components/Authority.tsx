"use client";

import { useLang } from "@/context/LangContext";
import RevealWrapper from "./RevealWrapper";
import Image from "next/image";
import Link from "next/link";
import StartFreeButton from "@/components/ui/StartFreeButton"; // Ajustez le chemin d'import selon votre projet

const STATS = [
  {
    value: "2 Ans",
    fr: "de R&D en ingénierie pédagogique",
    en: "of pedagogical R&D",
  },
  {
    value: "100%",
    fr: "axé Carrière & Business réel",
    en: "focused on Career & Real Business",
  },
  {
    value: "Immense",
    fr: "communauté active de débat",
    en: "huge active debating community",
  },
];

export default function Authority() {
  const { t } = useLang();

  return (
    <section
      id="story"
      className="py-24 bg-[#fafaf8] px-8 relative overflow-hidden"
    >
      {/* Ligne dorée subtile pour marquer l'autorité */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-[#c9a84c]/40" />

      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-16">
        {/* Bloc Visuel : L'image de marque */}
        <RevealWrapper className="shrink-0 mx-auto lg:mx-0">
          <div className="w-72 h-80 md:w-80 md:h-85 rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#1c1c1c] border border-[#c9a84c]/20 relative overflow-hidden flex items-center justify-center shadow-2xl">
            <Image
              src="/image.jpeg"
              alt="LangListening Authority"
              width={320}
              height={340}
              className="object-cover w-full h-full opacity-90"
            />
          </div>
        </RevealWrapper>

        {/* Bloc de Contenu : La Preuve par l'Action */}
        <RevealWrapper className="flex-1 min-w-[280px]">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#c9a84c] mb-4 font-mono">
            {t(
              "Les faits derrière notre méthode",
              "The facts behind our method",
            )}
          </p>

          <h2
            className="text-black leading-tight mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
              fontWeight: 600,
            }}
          >
            {t(
              "2 années de recherche pour concevoir l'écosystème d'apprentissage des leaders",
              "2 years of research to design the ultimate learning ecosystem for leaders",
            )}
          </h2>

          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {t(
              "Nous avons passé les deux dernières années à modéliser, tester et perfectionner un système linguistique pensé exclusivement pour le monde professionnel et les affaires. L'anglais académique théorique ne fonctionne pas sous pression ; notre écosystème, oui.",
              "We spent the last two years modeling, testing, and perfecting a linguistic system designed exclusively for the corporate and business world. Theoretical academic English fails under pressure; our ecosystem thrives.",
            )}
          </p>

          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {t(
              "Pour briser définitivement la barrière de la parole, nous combinons une technologie de pointe et la puissance du collectif : d'un côté, notre plateforme interactive d'exercices gratuits pour entraîner votre cerveau en solo au quotidien ; de l'autre, une immense communauté internationale pour vous immerger instantanément dans des débats complexes et des situations réelles de business.",
              "To permanently break the speech barrier, we combine cutting-edge technology with collective power: on one hand, our interactive platform with free exercises to train your brain solo daily; on the other, a massive international community to instantly immerse you in complex debates and real-world business scenarios.",
            )}
          </p>

          {/* Grille de statistiques pour asseoir l'autorité */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-200/80 py-6 mb-10 text-center sm:text-left">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-serif text-[#9a7a2e] font-bold">
                  {stat.value}
                </span>
                <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mt-1 leading-snug">
                  {t(stat.fr, stat.en)}
                </span>
              </div>
            ))}
          </div>

          {/* Groupe de Boutons d'Action (Pratique + Groupe de Débat) */}
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full sm:w-auto justify-start">
            {/* Votre bouton StartFree réutilisable */}
            <StartFreeButton className="w-full sm:w-auto text-center shadow-lg" />

            {/* Bouton secondaire WhatsApp pour rejoindre cette immense communauté */}
            <Link
              href="https://chat.whatsapp.com/E5yLg2zxcBWLayZ1wnBLt9?mode=gi_t"
              className="w-full sm:w-auto text-center bg-[#0a0a0a] text-[#e8c96a] border border-[#c9a84c]/40 font-semibold px-8 py-4 rounded-xl text-sm uppercase tracking-wider hover:bg-[#c9a84c] hover:text-black hover:-translate-y-0.5 transition-all duration-300 shadow-md whitespace-nowrap"
            >
              {t("Rejoindre la communauté", "Join the community")}
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
