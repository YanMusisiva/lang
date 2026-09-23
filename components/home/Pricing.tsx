"use client";

import { useLang } from "@/context/LangContext";
import { PLANS } from "@/data/home";
import RevealWrapper from "@/components/motion/RevealWrapper";
import Link from "next/link";
import OfferGuarantee from "@/components/ui/OfferGuarantee";
import ProgramMethod from "@/components/home/ProgramMethod";

export default function Pricing() {
  const { t } = useLang();

  return (
    <section id="pricing" className="py-24 bg-white px-8">
      <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#c9a84c] text-center mb-4">
        {t("Nos programmes mensuels", "Our monthly programs")}
      </p>
      <h2
        className="text-center text-black mb-8 leading-tight"
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "clamp(2rem, 4vw, 3.7rem)",
          fontWeight: 700,
        }}
      >
        {t("En groupe ou avec votre coach personnel.", "In a group or with your personal coach.")}
      </h2>

      <ProgramMethod />
      <div className="pricing-grid max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {PLANS.map((plan, i) => (
          <RevealWrapper key={i} delay={i * 100}>
            <div
              className={`pricing-card relative rounded-lg p-10 text-center transition-all duration-300 ${
                plan.featured
                  ? "bg-[#0a0a0a] border border-[#c9a84c]  shadow-2xl"
                  : "bg-[#fafaf8] border border-black/10 hover:border-[#c9a84c]/40 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              {plan.tag && (
                <span className="absolute top-4 right-4 bg-[#c9a84c] text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                  {t(plan.tag.fr, plan.tag.en)}
                </span>
              )}

              {/* Plan name */}
              <h3
                className={`text-xl font-semibold mb-4 ${
                  plan.featured ? "text-[#e8c96a]" : "text-black"
                }`}
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {t(plan.name.fr, plan.name.en)}
              </h3>

              {/* Price */}
              <div
                className={`leading-none mb-3 ${
                  plan.featured ? "text-white" : "text-black"
                }`}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                }}
              >
                <span className="text-xl font-normal">$</span>
                {t(plan.price.fr, plan.price.en)}
                <span className="ml-2 text-sm font-normal">{t("/ mois", "/ month")}</span>
              </div>

              {/* Desc */}
              <p
                className={`text-sm mb-3 leading-relaxed ${
                  plan.featured ? "text-white/60" : "text-gray-500"
                }`}
              >
                {t(plan.desc.fr, plan.desc.en)}
              </p>

              {/* Features */}
              <ul className="text-left mb-2 space-y-0">
                {plan.features.slice(0, 3).map((f, j) => (
                  <li
                    key={j}
                    className={`text-sm py-2 border-b flex items-start gap-2 ${
                      plan.featured
                        ? "text-white/80 border-white/10"
                        : "text-gray-600 border-black/5"
                    }`}
                  >
                    <span className="text-[#c9a84c] text-xs mt-0.5">✦</span>
                    {t(f.fr, f.en)}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <OfferGuarantee months={1} dark={plan.featured} />
              {plan.featured ? (
                <Link
                  href={`/programme?offre=${i === 0 ? "group" : "coaching"}`}
                  className="block w-full bg-[#c9a84c] text-black font-semibold py-3.5 rounded text-sm tracking-wide hover:bg-[#e8c96a] transition-colors"
                >
                  {t(`Choisir ${plan.name.fr}`, `Choose ${plan.name.en}`)}
                </Link>
              ) : (
                <Link
                  href={`/programme?offre=${i === 0 ? "group" : "coaching"}`}
                  className="block w-full border border-black/15 text-black font-semibold py-3.5 rounded text-sm hover:border-[#c9a84c] hover:text-[#9a7a2e] transition-all"
                >
                  {t(`Choisir ${plan.name.fr}`, `Choose ${plan.name.en}`)}
                </Link>
              )}
            </div>
          </RevealWrapper>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-14 text-center border-t border-black/10 pt-10">
        <p className="text-gray-600 mb-5">
          {t(
            "Envie de progresser sur trois mois ? Découvrez nos programmes en groupe, Anglais Business et coaching individuel.",
            "Ready for three months of progress? Explore our group, Business English and one-to-one coaching programs.",
          )}
        </p>
        <Link
          href="/offres-speciales"
          className="inline-flex items-center justify-center rounded border border-[#c9a84c] px-8 py-3.5 font-semibold text-[#7a5d1d] transition hover:bg-[#c9a84c] hover:text-black"
        >
          {t("Découvrir les offres spéciales", "View special offers")}
        </Link>
      </div>
    </section>
  );
}
