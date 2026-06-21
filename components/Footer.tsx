"use client";

import { useLang } from "@/context/LangContext";
import { Youtube, Facebook, Instagram } from "lucide-react";

import { FaTiktok } from "react-icons/fa";

const NAV_LINKS = [
  { href: "#presentation", fr: "Présentation", en: "About" },
  { href: "#value", fr: "Avantages", en: "Benefits" },
  { href: "#proof", fr: "Témoignages", en: "Testimonials" },
  { href: "#pricing", fr: "Tarifs", en: "Pricing" },
  // { href: "#contact", fr: "Contact", en: "Contact" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#c9a84c]/20 pt-14 pb-8 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <div
            className="text-[#e8c96a] text-2xl font-bold mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            LangListening
          </div>
          <p className="text-white/45 text-sm leading-relaxed">
            {t(
              "La méthode humaine pour parler anglais couramment. Écoute, répétition, conversation réelle.",
              "The human method to speak English fluently. Listening, repetition, real conversation.",
            )}
          </p>
          {/* Social Networks */}
          <div
            className="flex justify-center items-center gap-4 sm:gap-5 mt-10"
            style={{
              animation: "fadeUp 0.7s 0.5s ease both",
              animationFillMode: "both",
            }}
          >
            <a
              href="https://youtube.com/@langlistening?si=M8NS-3TvnEc5MrAd"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-14 h-14 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-[#e8c96a] hover:border-[#e8c96a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(232,201,106,0.25)]"
            >
              <Youtube
                className="text-white group-hover:text-black transition-colors duration-300"
                size={24}
              />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61583766185133"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-14 h-14 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-[#e8c96a] hover:border-[#e8c96a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(232,201,106,0.25)]"
            >
              <Facebook
                className="text-white group-hover:text-black transition-colors duration-300"
                size={22}
              />
            </a>

            <a
              href="https://www.tiktok.com/@langlistening?_r=1&_t=ZS-96lAFZ7vvbo"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-14 h-14 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-[#e8c96a] hover:border-[#e8c96a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(232,201,106,0.25)]"
            >
              <FaTiktok
                size={18}
                className="text-white group-hover:text-black transition-colors duration-300"
              />
            </a>

            <a
              href="https://www.instagram.com/langlistening?igsh=MXEzeDZ3MjJ5YW1hMQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="group w-14 h-14 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-[#e8c96a] hover:border-[#e8c96a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(232,201,106,0.25)]"
            >
              <Instagram
                className="text-white group-hover:text-black transition-colors duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-[#c9a84c] text-xs font-bold tracking-[0.12em] uppercase mb-4">
            {t("Navigation", "Navigation")}
          </h4>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white/50 text-sm hover:text-[#e8c96a] transition-colors"
                >
                  {t(link.fr, link.en)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#c9a84c] text-xs font-bold tracking-[0.12em] uppercase mb-4">
            Contact
          </h4>
          <ul className="space-y-2.5">
            <li>
              <a
                href="mailto:hello@langlistening.online"
                className="text-white/50 text-sm hover:text-[#e8c96a] transition-colors"
              >
                hello@langlistening.online
              </a>
            </li>
            {/* <li>
              <a
                href="#contact"
                className="text-white/50 text-sm hover:text-[#e8c96a] transition-colors"
              >
                {t("Formulaire de contact", "Contact form")}
              </a>
            </li> */}
            <li>
              <a
                href="#garantie"
                className="text-white/50 text-sm hover:text-[#e8c96a] transition-colors"
              >
                {t("Garantie remboursement", "Money-back guarantee")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto border-t border-white/6 pt-6 flex flex-wrap justify-between items-center gap-3">
        <p className="text-white/30 text-xs">
          © 2025 LangListening.{" "}
          {t("Tous droits réservés.", "All rights reserved.")}
        </p>
        <p className="text-white/20 text-xs">
          {t("Conçu par ASIKIRE & CO.", "Designed by ASIKIRE & CO.")}
        </p>
      </div>
    </footer>
  );
}
