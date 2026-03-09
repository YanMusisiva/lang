"use client";

import { useLang } from "@/context/LangContext";
import RevealWrapper from "./RevealWrapper";

const PILLS = [
  { fr: "Remboursement 14 jours", en: "14-day refund" },
  { fr: "Aucun engagement", en: "No commitment" },
  { fr: "Zéro spam", en: "Zero spam" },
  { fr: "Annulation facile", en: "Easy cancellation" },
];

export default function Guarantee() {
  const { t } = useLang();

  return (
    <section
      id="garantie"
      className="py-20 bg-[#fdf6e3] border-y border-[#c9a84c]/30 px-8"
    >
      <RevealWrapper>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">🛡️</div>
          <h2
            className="text-black leading-tight mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              fontWeight: 600,
            }}
          >
            {t(
              "Satisfaction garantie ou remboursé",
              "Satisfaction guaranteed or money back"
            )}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            {t(
              "Si après 14 jours vous ne constatez aucun progrès, nous vous remboursons intégralement. Sans question, sans délai.",
              "If after 14 days you see no progress, we will fully refund you. No questions, no delays."
            )}
          </p>
          <p className="text-gray-500 text-sm mb-8">
            {t(
              "Votre confiance est notre priorité. Nous n'envoyons jamais de spam.",
              "Your trust is our priority. We never send spam."
            )}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {PILLS.map((pill, i) => (
              <div
                key={i}
                className="bg-white border border-[#c9a84c]/40 text-black px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2"
              >
                <span className="text-[#c9a84c]">✓</span>
                {t(pill.fr, pill.en)}
              </div>
            ))}
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
