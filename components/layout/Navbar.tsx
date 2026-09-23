"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CircleUserRound, Menu, X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { createClient } from "@/lib/supabase/client";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

const NAV_LINKS = [
  { href: "/", fr: "Accueil", en: "Home" },
  { href: "/#story", fr: "Notre histoire", en: "Our story" },
  { href: "/programme", fr: "Programme", en: "Program" },
  { href: "/practice", fr: "Pratiquer", en: "Practice" },
  { href: "/testimony", fr: "Témoignages", en: "Testimonials" },
  { href: "/blog", fr: "Blog", en: "Blog" },
  { href: "/contact", fr: "Contact", en: "Contact" },
];

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }: { data: { user: unknown } }) => setSignedIn(Boolean(data.user)));
    const { data } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 35);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (!menuOpen || !element) return;
    element.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1100px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  const accountLabel = signedIn ? t("Mon espace", "Dashboard") : t("Se connecter", "Sign in");
  return (
    <>
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-container nav-inner">
          <Link href="/" className="nav-brand" aria-label="LangListening — accueil"><Image src="/image.jpeg" width={38} height={38} alt="" /><span>Lang<span>Listening</span></span></Link>
          <nav className="desktop-nav" aria-label={t("Navigation principale", "Main navigation")}>
            {NAV_LINKS.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="nav-link"><span className="nav-dot" />{t(link.fr, link.en)}</Link>)}
          </nav>
          <div className="nav-actions">
            <Link href={signedIn ? "/dashboard" : "/auth"} className="circle-button nav-account" aria-label={accountLabel} title={accountLabel}><CircleUserRound size={20} /></Link>
            <button className="language-button" onClick={toggleLang} aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}>{lang === "fr" ? "EN" : "FR"}</button>
            <Link href="/test" className="pill-button pill-gold nav-cta">{t("Passer un test", "Start a test")}<ArrowUpRight size={16} /></Link>
            <button className="circle-button menu-toggle" onClick={() => setMenuOpen(true)} aria-label={t("Ouvrir le menu", "Open menu")} aria-expanded={menuOpen} aria-controls="mobile-menu"><Menu size={22} /></button>
          </div>
        </div>
        <span className="nav-progress" ref={progress} aria-hidden="true" />
      </header>
      <dialog id="mobile-menu" ref={dialog} className="mobile-menu" aria-label={t("Navigation principale", "Main navigation")} onCancel={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)}>
        <div className="mobile-menu-top"><span className="eyebrow">LangListening</span><button className="circle-button" onClick={() => setMenuOpen(false)} aria-label={t("Fermer le menu", "Close menu")}><X size={24} /></button></div>
        <nav>{NAV_LINKS.map((link, index) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ animationDelay: `${index * 60}ms` }}><span>0{index + 1}</span>{t(link.fr, link.en)}<ArrowUpRight /></Link>)}</nav>
        <div className="mobile-menu-bottom"><Link href={signedIn ? "/dashboard" : "/auth"} onClick={() => setMenuOpen(false)} className="pill-button pill-outline"><CircleUserRound size={19} />{accountLabel}</Link><Link href="/test" className="pill-button pill-gold" onClick={() => setMenuOpen(false)}>{t("Passer un test", "Start a test")}<ArrowUpRight size={18} /></Link></div>
      </dialog>
    </>
  );
}
