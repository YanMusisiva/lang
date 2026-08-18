"use client";

import { useLang } from "@/context/LangContext";
import RevealWrapper from "./RevealWrapper";
import Image from "next/image";
import Link from "next/link";
import StartFreeButton from "@/components/ui/StartFreeButton"; // Ajustez le chemin d'import selon votre projet

const STATS = [
  {
    value: "2 Ans",
    fr: "de développement de la méthode",
    en: "developing the method",
  },
  {
    value: "100%",
    fr: "axé Tech, Business & Bureau",
    en: "focused on Tech, Business & Office work",
  },
  {
    value: "4 étapes",
    fr: "Learn, Listen, Speak, Interact",
    en: "Learn, Listen, Speak, Interact",
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
              "Une méthode pensée pour votre travail",
              "A method designed for your work",
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
              "Apprenez à communiquer dans les situations qui comptent pour votre carrière",
              "Learn to communicate in the situations that matter to your career",
            )}
          </h2>

          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {t(
              "Vous n'avez pas besoin d'anglais uniquement pour réussir des exercices de grammaire. Vous devez pouvoir expliquer une application, pitcher une idée, répondre à un appel, rédiger un message, contribuer à une réunion ou passer un entretien.",
              "You do not need English only to pass grammar exercises. You need to explain an application, pitch an idea, answer a call, write a message, contribute to a meeting, or succeed in an interview.",
            )}
          </p>

          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {t(
              "Notre méthode suit quatre étapes : apprendre le vocabulaire utile, écouter l'anglais parlé, répéter et produire vos propres phrases, puis interagir avec un groupe et un coach. L'objectif n'est plus seulement de comprendre, mais de pouvoir agir en anglais.",
              "Our method follows four steps: learn useful vocabulary, listen to spoken English, repeat and produce your own sentences, then interact with a group and a coach. The goal is not only to understand, but to act in English.",
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
