"use client";

import { useLang } from "@/context/LangContext";
import { BULLETS } from "@/app/data";
import RevealWrapper from "./RevealWrapper";

export default function ValueSection() {
  const { t } = useLang();

  return (
    <section id="value" className="py-24 bg-white px-8">
      <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#c9a84c] text-center mb-4">
        {t("Ce que vous allez apprendre", "What you will learn")}
      </p>
      <h2
        className="text-center text-black mb-16 leading-tight"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 600,
        }}
      >
        {t(
          "6 raisons pour lesquelles LangListening fonctionne",
          "6 reasons why LangListening works",
        )}
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BULLETS.map((bullet, i) => (
          <RevealWrapper key={bullet.num} delay={i * 80}>
            <div className="group relative border border-black/8 rounded-lg p-8 bg-[#fafaf8] hover:border-[#c9a84c]/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-all duration-300 overflow-hidden">
              {/* Gold left bar on hover */}
              <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#c9a84c] group-hover:h-full transition-all duration-300" />

              <div
                className="text-5xl font-bold text-[#c9a84c]/20 leading-none mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {bullet.num}
              </div>
              <h3 className="text-black font-semibold text-base mb-2">
                {t(bullet.title.fr, bullet.title.en)}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t(bullet.desc.fr, bullet.desc.en)}
              </p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
