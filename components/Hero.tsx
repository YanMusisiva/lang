"use client";

import { useLang } from "@/context/LangContext";

const STATS = [
  { val: "100+", fr: "Étudiants formés", en: "Students trained" },
  { val: "90", fr: "Jours pour parler", en: "Days to fluency" },
  { val: "90%", fr: "Satisfaction", en: "Satisfaction rate" },
  { val: "2+", fr: "Années d'expérience", en: "Years of experience" },
];

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center relative overflow-hidden pt-16">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(201,168,76,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Animated vertical lines */}
      {[20, 40, 60, 80].map((left, i) => (
        <div
          key={left}
          className="absolute w-px pointer-events-none"
          style={{
            left: `${left}%`,
            top: `${10 + i * 5}%`,
            height: `${50 + i * 10}%`,
            background:
              "linear-gradient(to bottom, transparent, rgba(201,168,76,0.15), transparent)",
            animation: `lineFade 3s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-20 text-center w-full">
        {/* Badge */}
        <div
          className="inline-block border border-[#c9a84c]/50 text-[#e8c96a] px-5 py-1.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-8"
          style={{ animation: "fadeUp 0.6s ease both" }}
        >
          {t("✦ Méthode éprouvée par la science", "✦ Science Proven method")}
        </div>

        {/* Headline */}
        <h1
          className="text-white leading-tight mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            fontWeight: 600,
            animation: "fadeUp 0.7s 0.1s ease both",
            animationFillMode: "both",
          }}
        >
          {t(
            "Apprenez à parler anglais couramment en 90 jours, même si vous êtes débutant",
            "Learn to speak English fluently in 90 days, even as a complete beginner",
          ).split("couramment").length > 1 ? (
            <>
              Apprenez à parler anglais{" "}
              <em className="italic bg-gradient-to-r from-[#e8c96a] to-[#c9a84c] bg-clip-text text-transparent">
                couramment
              </em>{" "}
              en 90 jours, même si vous êtes débutant
            </>
          ) : (
            <>
              Learn to speak English{" "}
              <em className="italic bg-gradient-to-r from-[#e8c96a] to-[#c9a84c] bg-clip-text text-transparent">
                fluently
              </em>{" "}
              in 90 days, even as a complete beginner
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p
          className="text-white/65 text-lg font-light leading-relaxed max-w-xl mx-auto mb-12"
          style={{
            animation: "fadeUp 0.7s 0.2s ease both",
            animationFillMode: "both",
          }}
        >
          {t(
            "Notre méthode d'écoute active et de conversation avec de vrais formateurs vous aide à développer votre grammaire, vocabulaire et prononciation — naturellement, sans stress. Nous avons cinq niveaux et chaque niveau prend juste 1 mois",
            "Our active listening and real conversation method helps you build grammar, vocabulary and pronunciation — naturally, stress-free. We have five levels and every level takes just 1 month",
          )}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 justify-center mb-20"
          style={{
            animation: "fadeUp 0.7s 0.3s ease both",
            animationFillMode: "both",
          }}
        >
          <a
            href="https://wa.me/256787531919"
            className="bg-[#c9a84c] text-black font-semibold px-9 py-4 rounded text-base tracking-wide hover:bg-[#e8c96a] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] transition-all duration-200"
          >
            {t("Discuter avec un formateur", "Talk to a trainer")}
          </a>
          <a
            href="#presentation"
            className="border border-white/25 text-white font-light px-9 py-4 rounded text-base hover:border-[#e8c96a] hover:text-[#e8c96a] transition-all duration-200"
          >
            {t("Découvrir la méthode", "Discover the method")}
          </a>
        </div>

        {/* Stats */}
        <div
          className="flex justify-center flex-wrap gap-12"
          style={{
            animation: "fadeUp 0.7s 0.4s ease both",
            animationFillMode: "both",
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-[#e8c96a] text-4xl font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {stat.val}
              </div>
              <div className="text-white/50 text-xs mt-1 tracking-wide">
                {t(stat.fr, stat.en)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes lineFade {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
