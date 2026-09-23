"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, AudioLines } from "lucide-react";
import { FaTiktok, FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa";
import { useLang } from "@/context/LangContext";

const STATS = [
  { val: "100+", fr: "Professionnels accompagnés", en: "Professionals coached" },
  { val: "3", fr: "Parcours métiers", en: "Professional tracks" },
  { val: "90%", fr: "Satisfaction", en: "Satisfaction rate" },
  { val: "2+", fr: "Années d'expérience", en: "Years of experience" },
];
const SOCIALS = [
  { name: "YouTube", icon: FaYoutube, href: "https://youtube.com/@langlistening?si=M8NS-3TvnEc5MrAd" },
  { name: "Facebook", icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61583766185133" },
  { name: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@langlistening?_r=1&_t=ZS-96lAFZ7vvbo" },
  { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/langlistening?igsh=MXEzeDZ3MjJ5YW1hMQ==" },
];

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid site-container">
        <div className="hero-copy">
          <p className="eyebrow hero-enter"><span className="status-dot" />{t("Anglais professionnel orienté pratique", "Practical professional English")}</p>
          <h1 id="hero-title" className="hero-title hero-enter" style={{ animationDelay: "100ms" }}>
            {t("Excellent dans votre métier.", "Great at what you do.")}
            <span>{t("Donnez vie à votre expertise en anglais.", "Bring your expertise to life in English.")}</span>
          </h1>
          <p className="hero-description hero-enter" style={{ animationDelay: "200ms" }}>
            {t("Développeur, entrepreneur ou professionnel de bureau : apprenez à présenter votre travail, participer à une réunion, parler à un client, défendre une idée et réussir un entretien en anglais.", "Developer, entrepreneur, or office professional: learn to present your work, join meetings, speak with clients, defend an idea, and succeed in English interviews.")}
          </p>
          <div className="hero-actions hero-enter" style={{ animationDelay: "300ms" }}>
            <Link href="/auth?next=/practice" className="pill-button pill-gold">{t("Se connecter", "Sign in")}<ArrowUpRight size={19} /></Link>
            <Link href="/test" className="pill-button pill-outline">{t("Passer un test", "Start a test")}<span className="small-circle"><ArrowUpRight size={16} /></span></Link>
          </div>
          <div className="hero-socials hero-enter" style={{ animationDelay: "400ms" }}>
            {SOCIALS.map(({ name, href, icon: Icon }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="circle-button"><Icon size={16} /></a>)}
            <Link href="/contact" className="text-link">{t("Contactez-nous", "Contact us")} <ArrowUpRight size={15} /></Link>
          </div>
        </div>
        <div className="hero-art hero-enter" style={{ animationDelay: "250ms" }}>
          <div className="hero-orbit orbit-outer" aria-hidden="true"><span /></div>
          <div className="hero-orbit orbit-inner" aria-hidden="true"><span /></div>
          <div className="hero-logo-circle"><Image src="/image.jpeg" alt="LangListening" fill priority sizes="(max-width: 700px) 65vw, 360px" className="object-cover" /></div>
          <div className="hero-art-label"><AudioLines size={22} /><span>Learn. Listen.<br /><strong>Speak. Interact.</strong></span></div>
          <span className="hero-art-note">LANG<span>LISTENING</span></span>
          <span className="hero-art-caption">{t("Votre métier. Votre voix.", "Your profession. Your voice.")}</span>
        </div>
      </div>
      <div className="hero-bottom site-container">
        <div className="hero-stats">{STATS.map(stat => <div key={stat.val}><strong>{stat.val}</strong><span>{t(stat.fr, stat.en)}</span></div>)}</div>
        <a href="#value" className="hero-scroll"><span>{t("Découvrir", "Explore")}</span><span className="circle-button"><ArrowDown size={19} /></span></a>
      </div>
    </section>
  );
}
