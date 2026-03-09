"use client";

import { useLang } from "@/context/LangContext";
import { TESTIMONIALS } from "@/app/data";
import RevealWrapper from "./RevealWrapper";

const PROOF_NUMBERS = [
  { val: "100+", fr: "Étudiants formés", en: "Students trained" },
  { val: "2 ans", fr: "D'expérience", en: "Of experience" },
  { val: "90%", fr: "Taux de satisfaction", en: "Satisfaction rate" },
  { val: "12+", fr: "Formateurs qualifiés", en: "Qualified trainers" },
];

export default function SocialProof() {
  const { t } = useLang();

  return (
    <section
      id="proof"
      className="py-24 bg-[#0a0a0a] px-8 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#e8c96a] text-center mb-4">
          {t("Ce qu'ils disent", "What they say")}
        </p>
        <h2
          className="text-white text-center mb-16 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600,
          }}
        >
          {t(
            "Plus de 100 étudiants ont transformé leur anglais",
            "Over 100 students transformed their English",
          )}
        </h2>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((testi, i) => (
            <RevealWrapper key={i} delay={i * 100}>
              <div className="bg-white/5 border border-[#c9a84c]/20 rounded-lg p-8 hover:border-[#c9a84c]/50 transition-colors duration-300 h-full flex flex-col">
                <div className="text-[#c9a84c] text-lg tracking-widest mb-4">
                  ★★★★★
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic flex-1 mb-6">
                  &ldquo;{t(testi.quote.fr, testi.quote.en)}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9a7a2e] to-[#c9a84c] flex items-center justify-center text-black font-bold text-xs">
                    {testi.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {testi.name}
                    </p>
                    <p className="text-white/45 text-xs">
                      {t(testi.role.fr, testi.role.en)}
                    </p>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        {/* Proof numbers */}
        <RevealWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[#c9a84c]/15 rounded-lg overflow-hidden divide-x divide-[#c9a84c]/15">
            {PROOF_NUMBERS.map((item, i) => (
              <div key={i} className="bg-white/[0.03] py-10 px-8 text-center">
                <div
                  className="text-[#e8c96a] text-3xl font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.val}
                </div>
                <div className="text-white/50 text-xs mt-2">
                  {t(item.fr, item.en)}
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
