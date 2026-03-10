"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";

const NAV_LINKS = [
  { href: "/", fr: "Accueil", en: "Home" },

  { href: "#presentation", fr: "Présentation", en: "About" },
  { href: "#value", fr: "Avantages", en: "Benefits" },
  { href: "#proof", fr: "Témoignages", en: "Testimonials" },
  { href: "#pricing", fr: "Tarifs", en: "Pricing" },
  { href: "#contact", fr: "Contact", en: "Contact" },
  { href: "/blog", fr: "Blog", en: "Blog" },
];

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/97 border-b border-[#c9a84c]/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 h-16">
          {/* Logo */}
          <a
            href="/"
            className="font-serif text-2xl font-bold text-[#e8c96a] tracking-wider"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            LangListening
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white/70 text-sm tracking-wide hover:text-[#e8c96a] transition-colors duration-200"
                >
                  {t(link.fr, link.en)}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="border border-[#c9a84c]/50 text-[#e8c96a] px-3 py-1.5 rounded text-xs font-bold tracking-widest hover:bg-[#c9a84c] hover:text-black hover:border-[#c9a84c] transition-all duration-200"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            {/* <a
              href="/"
              className="border border-white/20 text-white/80 px-4 py-1.5 rounded text-sm font-medium tracking-wide hover:bg-white/10 transition-colors duration-200"
            >
              {t("Accueil", "Home")}
            </a> */}
            <a
              href="/test"
              className="bg-[#c9a84c] text-black font-semibold px-5 py-2 rounded text-sm tracking-wide hover:bg-[#e8c96a] transition-colors duration-200"
            >
              {t("Passer un Test", "Start a Test")}
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
          >
            <span className="block w-6 h-0.5 bg-[#e8c96a]" />
            <span className="block w-6 h-0.5 bg-[#e8c96a]" />
            <span className="block w-6 h-0.5 bg-[#e8c96a]" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#0a0a0a]/97 backdrop-blur-md flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-5 right-6 text-white text-3xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl font-semibold hover:text-[#e8c96a] transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t(link.fr, link.en)}
            </a>
          ))}
          <div className="flex gap-4 mt-4 items-center">
            <button
              onClick={() => {
                toggleLang();
                setMenuOpen(false);
              }}
              className="border border-[#c9a84c]/50 text-[#e8c96a] px-4 py-2 rounded text-sm font-bold tracking-widest hover:bg-[#c9a84c] hover:text-black transition-all"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <a
              href="/test"
              onClick={() => setMenuOpen(false)}
              className="bg-[#c9a84c] text-black font-semibold px-6 py-2.5 rounded text-sm hover:bg-[#e8c96a] transition-colors"
            >
              {t("Passer un test", "Start a Test")}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
