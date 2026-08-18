"use client";

import Link from "next/link";
import { Check, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LangContext";

const OFFERS = [
  {
    name: { fr: "Group", en: "Group" },
    price: "49",
    period: { fr: "/ mois", en: "/ month" },
    description: {
      fr: "Apprenez et pratiquez avec un groupe de 10 participants minimum.",
      en: "Learn and practice with a group of at least 10 participants.",
    },
    note: {
      fr: "Idéal pour progresser régulièrement avec l'énergie d'une communauté.",
      en: "Ideal for steady progress with the energy of a community.",
    },
    features: [
      { fr: "Cours d'anglais professionnel", en: "Professional English lessons" },
      { fr: "Séances de pratique en groupe", en: "Group practice sessions" },
      { fr: "Speaking, listening et shadowing", en: "Speaking, listening, and shadowing" },
      { fr: "Vocabulaire adapté au monde professionnel", en: "Workplace-focused vocabulary" },
      { fr: "Simulations de situations réelles", en: "Real-world simulations" },
      { fr: "Plateforme, accompagnement et feedback", en: "Platform access, support, and feedback" },
    ],
    message: "Bonjour LangListening, je suis intéressé(e) par l'offre Group à 49 $ par mois.",
  },
  {
    name: { fr: "Petit groupe intensif", en: "Small Group Intensive" },
    price: "250",
    period: { fr: "/ 3 mois", en: "/ 3 months" },
    description: {
      fr: "Un groupe limité à 5 participants pour parler davantage et recevoir plus de feedback.",
      en: "A group limited to 5 participants for more speaking time and feedback.",
    },
    note: {
      fr: "Environ 83 $ par mois pour un suivi plus personnalisé.",
      en: "About $83 per month for more personalized support.",
    },
    features: [
      { fr: "Groupe limité à 5 personnes", en: "Limited to 5 participants" },
      { fr: "Davantage de temps de parole", en: "More speaking time" },
      { fr: "Corrections et suivi personnalisés", en: "Personalized feedback and support" },
      { fr: "Exercices adaptés aux besoins du groupe", en: "Exercises tailored to group needs" },
      { fr: "Simulations professionnelles intensives", en: "Intensive professional simulations" },
      { fr: "Accès aux ressources numériques", en: "Access to digital resources" },
    ],
    message: "Bonjour LangListening, je suis intéressé(e) par l'offre Petit groupe intensif à 250 $ pour 3 mois.",
  },
];

export default function SpecialOffersPage() {
  const { t } = useLang();

  return (
    <main className="min-h-screen bg-[#fafaf8] text-black">
      <Navbar />
      <section className="bg-[#0a0a0a] px-6 pb-20 pt-32 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8c96a]">
          {t("Offres spéciales", "Special offers")}
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight md:text-6xl">
          {t("Progressez en groupe, avec un budget plus accessible", "Make progress in a group with a more accessible budget")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-white/65">
          {t(
            "Le même anglais orienté métier, avec des exercices concrets, de la pratique orale et l'accompagnement d'un formateur.",
            "The same career-focused English, with practical exercises, speaking practice, and guidance from a trainer.",
          )}
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-2">
          {OFFERS.map((offer, index) => (
            <article key={offer.name.fr} className={`rounded-lg border p-8 ${index === 1 ? "border-[#c9a84c] bg-white shadow-xl" : "border-black/10 bg-white"}`}>
              <Users className="text-[#9a7a2e]" size={28} />
              <h2 className="mt-5 font-serif text-3xl font-semibold">{t(offer.name.fr, offer.name.en)}</h2>
              <div className="mt-5 flex items-end gap-2">
                <span className="font-serif text-5xl font-bold">${offer.price}</span>
                <span className="pb-1 text-gray-500">{t(offer.period.fr, offer.period.en)}</span>
              </div>
              <p className="mt-5 text-gray-600">{t(offer.description.fr, offer.description.en)}</p>
              <ul className="my-7 space-y-3 border-y border-black/10 py-6">
                {offer.features.map((feature) => (
                  <li key={feature.fr} className="flex gap-3 text-sm text-gray-700">
                    <Check className="mt-0.5 shrink-0 text-[#9a7a2e]" size={17} />
                    {t(feature.fr, feature.en)}
                  </li>
                ))}
              </ul>
              <p className="mb-6 text-sm font-medium text-[#7a5d1d]">{t(offer.note.fr, offer.note.en)}</p>
              <a
                href={`https://wa.me/256787531919?text=${encodeURIComponent(offer.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded bg-[#c9a84c] px-6 py-3.5 text-center font-semibold text-black transition hover:bg-[#e8c96a]"
              >
                {t("Choisir cette offre", "Choose this offer")}
              </a>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-gray-600">{t("Vous souhaitez finalement un accompagnement individuel ?", "Would you prefer one-to-one coaching after all?")}</p>
          <Link href="/#pricing" className="mt-4 inline-block font-semibold text-[#7a5d1d] hover:underline">
            {t("Voir les offres de coaching personnel", "View personal coaching plans")}
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
