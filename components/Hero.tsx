"use client";

import { useLang } from "@/context/LangContext";
import { FaTiktok, FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa";

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

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-12 text-center w-full">
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
            "Parlez anglais pour développer votre carrière et votre business dans 90 jours",
            "Speak English to grow your career and your business in 90 days",
          ).split("votre carrière et votre business").length > 1 ? (
            <>
              Parlez anglais pour développer{" "}
              <em className="italic bg-linear-to-r from-[#e8c96a] to-[#c9a84c] bg-clip-text text-transparent">
                votre carrière et votre business
              </em>{" "}
              dans 90 jours.
            </>
          ) : (
            <>
              Speak english to grow{" "}
              <em className="italic bg-linear-to-r from-[#e8c96a] to-[#c9a84c] bg-clip-text text-transparent">
                your career and your business
              </em>{" "}
              in 90 days.
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
            "Développez votre confiance pour communiquer avec des clients, employeurs et partenaires internationaux sans dépendre constamment d'un traducteur.-PS: Vous pourrez aussi lire vos emails, messages et documents en anglais sans effort.",
            "Build your confidence to communicate with clients, employers, and international partners without constantly relying on a translator. PS: You will also be able to read your emails, messages, and documents in English without effort.",
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
            href="/test"
            className="bg-[#c9a84c] text-black font-semibold px-9 py-4 rounded text-base tracking-wide hover:bg-[#e8c96a] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] transition-all duration-200"
          >
            {t("Passer un test", "Start a test")}
          </a>
          <a
            href="/practice"
            className="bg-[#c9a84c] text-black font-semibold px-9 py-4 rounded text-base tracking-wide hover:bg-[#e8c96a] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] transition-all duration-200"
          >
            {t("Commencer gratuitement", "Start for free")}
          </a>

          <a
            href="/contact"
            className="border border-white/25 text-white font-light px-9 py-4 rounded text-base hover:border-[#e8c96a] hover:text-[#e8c96a] transition-all duration-200"
          >
            {t("Contactez-nous", "Contact us")}
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
            <FaYoutube
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
            <FaFacebookF
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
            <FaInstagram
              className="text-white group-hover:text-black transition-colors duration-300"
              size={22}
            />
          </a>
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
