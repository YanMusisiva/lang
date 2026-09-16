"use client";

import { ShieldCheck } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function OfferGuarantee({ months, dark = false }: { months: 1 | 3; dark?: boolean }) {
  const { t } = useLang();
  return <div className={`my-4 rounded-xl border p-3 text-left ${dark ? "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-white/80" : "border-[#c9a84c]/40 bg-[#fdf6e3] text-gray-700"}`}>
    <p className={`mb-1 flex items-center gap-2 text-xs font-semibold ${dark ? "text-[#e8c96a]" : "text-[#7a5d1d]"}`}><ShieldCheck size={17} className="shrink-0" aria-hidden="true" />{t("Votre objectif garanti", "Our commitment to your goal")}</p>
    <p className="text-xs leading-relaxed">{t(
      `Niveau convenu non atteint après ${months} mois ? Suivi gratuit jusqu’à l’atteindre.`,
      `Agreed level not reached after ${months} month${months === 1 ? "" : "s"}? Free support until you reach it.`,
    )}</p>
    <a href="#garantie" className={`mt-2 inline-block text-xs underline underline-offset-4 ${dark ? "text-[#e8c96a]" : "text-[#7a5d1d]"}`}>{t("Nos garanties · remboursement sous 5 jours", "Our guarantees · 5-day refund")}</a>
  </div>;
}
