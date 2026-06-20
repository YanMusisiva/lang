"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import Link from "next/link";

export default function LeadMagnet() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      id="gratuit"
      className="bg-[#fdf6e3] border-y border-[#c9a84c]/30 py-16 px-8"
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-12 justify-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-[#0a0a0a] rounded-2xl flex items-center justify-center text-4xl shrink-0">
          🎁
        </div>

        <div className="flex-1 min-w-65">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#9a7a2e] mb-2">
            {t("Programme gratuit", "Free Program")}
          </p>

          <h2
            className="text-[#0a0a0a] text-3xl font-semibold leading-tight mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t(
              "Parlez plus anglais en 7 jours que durant vos dernières années d'apprentissage",
              "Speak more English in 7 days than in your last years of studying",
            )}
          </h2>

          <p className="text-gray-700 text-base leading-relaxed">
            {t(
              "Rejoignez gratuitement notre groupe WhatsApp et recevez pendant 7 jours un programme complet basé sur l'écoute. Chaque jour, vous recevrez des leçons audio simples à suivre pour commencer à comprendre, penser et parler anglais plus naturellement.",
              "Join our free WhatsApp group and receive a complete 7-day listening-based program. Every day, you'll get simple audio lessons designed to help you understand, think and speak English more naturally.",
            )}
          </p>

          <div className="mt-5 space-y-2 text-sm">
            <p>✓ {t("Méthode basée sur l'écoute", "Listening-first method")}</p>
            <p>✓ {t("Aucun niveau requis", "No prior level required")}</p>
            <p>✓ {t("100% gratuit", "100% free")}</p>
          </div>
        </div>

        {/* Form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-3 items-center shrink-0"
          >
            <Link
              href="https://chat.whatsapp.com/E5yLg2zxcBWLayZ1wnBLt9?mode=gi_t"
              className="bg-[#c9a84c] text-black font-semibold px-6 py-3 rounded text-sm hover:bg-[#e8c96a] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
            >
              {t("Integrer le groupe", "Join the group")}
            </Link>
          </form>
        ) : (
          <div className="bg-white border border-[#c9a84c]/50 rounded-lg px-6 py-4 text-center">
            <p className="text-[#9a7a2e] font-semibold text-sm">
              {t(
                "✓ Guide envoyé ! Vérifiez votre boîte mail.",
                "✓ Guide sent! Check your inbox.",
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
