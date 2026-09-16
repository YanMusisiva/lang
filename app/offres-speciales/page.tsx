"use client";

import Link from "next/link";
import { Check, Users, BriefcaseBusiness, UserRound } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/context/LangContext";
import { SPECIAL_OFFERS } from "@/data/offers";
import OfferGuarantee from "@/components/ui/OfferGuarantee";
import Guarantee from "@/components/home/Guarantee";
import RevealWrapper from "@/components/motion/RevealWrapper";
import ProgramMethod from "@/components/home/ProgramMethod";

const OFFER_ICONS = [Users, BriefcaseBusiness, UserRound];

export default function SpecialOffersPage() {
  const { t } = useLang();

  return (
    <main className="interior-page min-h-screen bg-[#fafaf8] text-black">
      <Navbar />
      <section className="bg-[#0a0a0a] px-6 pb-20 pt-32 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8c96a]">
          {t("Offres spéciales", "Special offers")}
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight md:text-6xl">
          {t("Trois mois pour faire avancer votre anglais.", "Three months to move your English forward.")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-white/65">
          {t(
            "En groupe, en anglais business ou avec votre coach personnel : choisissez votre parcours. Un vrai formateur vous accompagne jusqu’au niveau défini ensemble.",
            "In a group, in Business English or with your personal coach: choose your path. A real teacher supports you until you reach the level agreed together.",
          )}
        </p>
      </section>

      <section className="px-6 py-20">
        <ProgramMethod />
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-3">
          {SPECIAL_OFFERS.map((offer, index) => {
            const Icon = OFFER_ICONS[index];
            return <RevealWrapper key={offer.name.fr} delay={index * 100} className="h-full">
            <article className={`flex h-full flex-col rounded-[28px] border p-6 sm:p-8 ${index === 1 ? "border-[#c9a84c] bg-white shadow-xl" : "border-black/10 bg-white"}`}>
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a84c]/40 bg-[#fdf6e3]"><Icon className="text-[#9a7a2e]" size={20} aria-hidden="true" /></span>
              <h2 className="text-xl font-semibold">{t(offer.name.fr, offer.name.en)}</h2></div>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-serif text-5xl font-bold">${offer.price}</span>
                <span className="pb-1 text-gray-500">{t("/ 3 mois", "/ 3 months")}</span>
              </div>
              <p className="mt-3 text-sm text-gray-600">{t(offer.description.fr, offer.description.en)}</p>
              <ul className="my-4 space-y-2 border-y border-black/10 py-3">
                {offer.features.slice(0, 3).map((feature) => (
                  <li key={feature.fr} className="flex gap-3 text-sm text-gray-700">
                    <Check className="mt-0.5 shrink-0 text-[#9a7a2e]" size={17} />
                    {t(feature.fr, feature.en)}
                  </li>
                ))}
              </ul>
              <div className="mt-auto"><OfferGuarantee months={3} /></div>
              <a
                href={`https://wa.me/256787531919?text=${encodeURIComponent(t(`Bonjour LangListening, je suis intéressé(e) par ${offer.name.fr} à ${offer.price} $ pour 3 mois${index === 1 ? ", en paiement unique" : ""}.`, `Hello LangListening, I am interested in ${offer.name.en} at $${offer.price} for 3 months${index === 1 ? ", as a one-time payment" : ""}.`))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button pill-gold w-full"
              >
                {t("Choisir cette offre", "Choose this offer")}
              </a>
            </article>
            </RevealWrapper>;
          })}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-gray-600">{t("Vous préférez commencer par un mois ?", "Would you rather start with one month?")}</p>
          <Link href="/#pricing" className="mt-4 inline-block font-semibold text-[#7a5d1d] hover:underline">
            {t("Voir les programmes mensuels", "View monthly programs")}
          </Link>
        </div>
      </section>
      <Guarantee />
      <Footer />
    </main>
  );
}
