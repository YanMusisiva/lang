"use client";

import { useLang } from "@/context/LangContext";
import { PLANS } from "@/app/data";
import RevealWrapper from "./RevealWrapper";

export default function Pricing() {
  const { t } = useLang();

  return (
    <section id="pricing" className="py-24 bg-white px-8">
      <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#c9a84c] text-center mb-4">
        {t("Nos offres", "Our plans")}
      </p>
      <h2
        className="text-center text-black mb-16 leading-tight"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 600,
        }}
      >
        {t("Choisissez votre parcours", "Choose your path")}
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {PLANS.map((plan, i) => (
          <RevealWrapper key={i} delay={i * 100}>
            <div
              className={`relative rounded-lg p-10 text-center transition-all duration-300 ${
                plan.featured
                  ? "bg-[#0a0a0a] border border-[#c9a84c] scale-[1.04] shadow-2xl"
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
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t(plan.name.fr, plan.name.en)}
              </h3>

              {/* Price */}
              <div
                className={`leading-none mb-3 ${
                  plan.featured ? "text-white" : "text-black"
                }`}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                }}
              >
                <span className="text-xl font-normal">$</span>
                {t(plan.price.fr, plan.price.en)}
              </div>

              {/* Desc */}
              <p
                className={`text-sm mb-6 leading-relaxed ${
                  plan.featured ? "text-white/60" : "text-gray-500"
                }`}
              >
                {t(plan.desc.fr, plan.desc.en)}
              </p>

              {/* Features */}
              <ul className="text-left mb-8 space-y-0">
                {plan.features.map((f, j) => (
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
              {plan.featured ? (
                <a
                  href="https://wa.me/256787531919"
                  className="block w-full bg-[#c9a84c] text-black font-semibold py-3.5 rounded text-sm tracking-wide hover:bg-[#e8c96a] transition-colors"
                  target="_blank"
                >
                  {t(`Choisir ${plan.name.fr}`, `Choose ${plan.name.en}`)}
                </a>
              ) : (
                <a
                  href="#contact"
                  className="block w-full border border-black/15 text-black font-semibold py-3.5 rounded text-sm hover:border-[#c9a84c] hover:text-[#9a7a2e] transition-all"
                >
                  {t(`Choisir ${plan.name.fr}`, `Choose ${plan.name.en}`)}
                </a>
              )}
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
