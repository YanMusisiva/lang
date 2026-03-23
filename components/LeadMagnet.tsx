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
      id="leadmagnet"
      className="bg-[#fdf6e3] border-y border-[#c9a84c]/30 py-16 px-8"
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-12 justify-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-[#0a0a0a] rounded-2xl flex items-center justify-center text-4xl shrink-0">
          🎁
        </div>

        {/* Text */}
        <div className="flex-1 min-w-[260px]">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#9a7a2e] mb-2">
            {t("Cadeau gratuit", "Free gift")}
          </p>
          <h2
            className="text-[#0a0a0a] text-2xl font-semibold leading-tight mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t(
              "Apprenez un programme complet d'Anglais GRATUITEMENT dans 1 semaine dans un groupe whatsapp",
              "Learn a full program of English for FREE in 1 week in a whatsapp group ",
            )}
          </h2>
          <p className="text-gray-500 text-sm">
            {t(
              "Cours audios à écouter et parler anglais avec confiance : Envoyer dans une semaine dans un groupe whatsapp et vous pouvez les utiliser pour pratiquer votre anglais tous les jours.",
              "Audio lessons to listen and speak English with confidence: Sent in one week in a whatsapp group and you can use them to practice your English every day.",
            )}
          </p>
        </div>

        {/* Form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-3 items-center shrink-0"
          >
            {/* <input
              type="email"
              required
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border-[1.5px] border-[#c9a84c]/50 rounded focus:outline-none focus:border-[#c9a84c] bg-white text-black text-sm min-w-[220px] font-[DM_Sans]"
            /> */}
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
