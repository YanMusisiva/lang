"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { BULLETS } from "@/data/home";
import RevealWrapper from "@/components/motion/RevealWrapper";
import ScrollAccent from "@/components/motion/ScrollAccent";

export default function ValueSection() {
  const { t } = useLang();
  return (
    <section id="value" className="value-section section-space">
      <div className="site-container value-layout">
        <div className="value-heading">
          <p className="eyebrow"><span className="section-number">01</span>{t("Un anglais utile au travail", "English you can use at work")}</p>
          <h2 className="section-title">{t("Passez de « je comprends » à « je peux l'utiliser »", "Move from “I understand” to “I can use it”")}</h2>
          <Link href="/practice" className="pill-button pill-dark">{t("Commencer gratuitement", "Start for free")}<ArrowUpRight size={18} /></Link>
          <div className="value-circles" aria-hidden="true"><span /><span /><span /></div>
        </div>
        <div className="value-cards">
          <ScrollAccent />
          {BULLETS.map((bullet, i) => <RevealWrapper key={bullet.num} delay={i % 2 * 90} className="value-card-wrap"><article className="value-card"><span className="value-number">{bullet.num}</span><h3>{t(bullet.title.fr, bullet.title.en)}</h3><p>{t(bullet.desc.fr, bullet.desc.en)}</p></article></RevealWrapper>)}
        </div>
      </div>
    </section>
  );
}
