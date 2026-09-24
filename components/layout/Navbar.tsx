"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, LayoutDashboard, LogOut, Menu, UserRoundCheck, X } from "lucide-react";
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
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [account, setAccount] = useState<{ email: string; name: string; role: string } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const accountMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    const loadAccount = async (sessionUser?: { id: string; email?: string } | null) => {
      const user = sessionUser || (await supabase.auth.getUser()).data.user;
      setSignedIn(Boolean(user));
      if (!user) { setAccount(null); return; }
      const { data: profile } = await supabase.from("profiles").select("display_name,role").eq("id", user.id).maybeSingle();
      setAccount({ email: user.email || "", name: profile?.display_name || t("Mon compte", "My account"), role: profile?.role || "learner" });
    };
    void loadAccount();
    const { data } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => { void loadAccount(session?.user || null); });
    return () => data.subscription.unsubscribe();
  }, [t]);

  useEffect(() => {
    if (!accountOpen) return;
    const close = (event: MouseEvent) => { if (!accountMenu.current?.contains(event.target as Node)) setAccountOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [accountOpen]);

  async function signOut() {
    await createClient()?.auth.signOut();
    setAccountOpen(false);
    setMenuOpen(false);
    router.replace("/");
    router.refresh();
  }

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

  const accountLabel = signedIn ? t("Mon compte", "My account") : t("Se connecter", "Sign in");
  return (
    <>
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-container nav-inner">
          <Link href="/" className="nav-brand" aria-label="LangListening — accueil"><Image src="/image.jpeg" width={38} height={38} alt="" /><span>Lang<span>Listening</span></span></Link>
          <nav className="desktop-nav" aria-label={t("Navigation principale", "Main navigation")}>
            {NAV_LINKS.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="nav-link"><span className="nav-dot" />{t(link.fr, link.en)}</Link>)}
          </nav>
          <div className="nav-actions">
            {signedIn ? <div className="relative" ref={accountMenu}>
              <button type="button" onClick={() => setAccountOpen((value) => !value)} className="circle-button nav-account" aria-label={accountLabel} title={accountLabel} aria-expanded={accountOpen}><UserRoundCheck size={20} /></button>
              {accountOpen && <div className="absolute right-0 top-[calc(100%+12px)] z-[90] w-64 overflow-hidden rounded-xl border border-white/10 bg-[#10110f] p-2 text-white shadow-2xl">
                <div className="border-b border-white/10 px-3 py-3"><p className="truncate text-sm font-semibold">{account?.name}</p><p className="mt-1 truncate text-xs text-white/40">{account?.email}</p></div>
                {account?.role === "admin" ? <Link href="/admin" onClick={() => setAccountOpen(false)} className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-[#e8c96a]"><LayoutDashboard size={17} />{t("Espace administrateur", "Admin area")}</Link> : <Link href="/practice" onClick={() => setAccountOpen(false)} className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-[#e8c96a]"><BookOpen size={17} />{t("Mes exercices", "My exercises")}</Link>}
                <button type="button" onClick={signOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-300/80 hover:bg-red-400/10 hover:text-red-300"><LogOut size={17} />{t("Déconnexion", "Sign out")}</button>
              </div>}
            </div> : <Link href="/auth?next=/practice" className="pill-button pill-outline nav-account">{t("Se connecter", "Sign in")}</Link>}
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
        <div className="mobile-menu-bottom">{signedIn ? <><div className="mb-2 px-1"><p className="truncate text-sm font-semibold text-white">{account?.name}</p><p className="truncate text-xs text-white/40">{account?.email}</p></div><Link href={account?.role === "admin" ? "/admin" : "/practice"} onClick={() => setMenuOpen(false)} className="pill-button pill-outline"><UserRoundCheck size={19} />{account?.role === "admin" ? t("Espace administrateur", "Admin area") : t("Mes exercices", "My exercises")}</Link><button type="button" onClick={signOut} className="pill-button pill-outline text-red-300"><LogOut size={18} />{t("Déconnexion", "Sign out")}</button></> : <Link href="/auth?next=/practice" onClick={() => setMenuOpen(false)} className="pill-button pill-outline">{accountLabel}</Link>}<Link href="/test" className="pill-button pill-gold" onClick={() => setMenuOpen(false)}>{t("Passer un test", "Start a test")}<ArrowUpRight size={18} /></Link></div>
      </dialog>
    </>
  );
}
