"use client";

import { useLang } from "@/context/LangContext";

const NAV_LINKS = [
  { href: "#presentation", fr: "Présentation", en: "About" },
  { href: "#value", fr: "Avantages", en: "Benefits" },
  { href: "#proof", fr: "Témoignages", en: "Testimonials" },
  { href: "#pricing", fr: "Tarifs", en: "Pricing" },
  { href: "#contact", fr: "Contact", en: "Contact" },
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
            <li>
              <a
                href="#contact"
                className="text-white/50 text-sm hover:text-[#e8c96a] transition-colors"
              >
                {t("Formulaire de contact", "Contact form")}
              </a>
            </li>
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
          {t(
            "Aucun spam. Désabonnement en 1 clic.",
            "No spam. Unsubscribe in 1 click.",
          )}
        </p>
      </div>
    </footer>
  );
}
