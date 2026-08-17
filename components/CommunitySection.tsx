"use client";

import { useLang } from "@/context/LangContext";

const COMMUNITY_IMAGES = [
  {
    image: "/community/group1.jpg",
    badge: "+120",
    fr: "Professionnels actifs",
    en: "Active professionals",
  },
  // {
  //   image: "/community/group2.jpg",
  //   badge: "+85",
  //   fr: "Participants aux sessions live",
  //   en: "Live session attendees",
  // },
  {
    image: "/community/group2.jpg",
    badge: "+80",
    fr: "Apprenants accompagnés",
    en: "Learners coached",
  },
  {
    image: "/community/group4.jpg",
    badge: "+200",
    fr: "Dans nos groupes",
    en: "In our communities",
  },
];

export default function CommunitySection() {
  const { t } = useLang();

  return (
    <section className="py-24 bg-[#0a0a0a] px-8 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />
      ```
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#e8c96a] text-center mb-4">
          {t("Notre communauté", "Our community")}
        </p>

        <h2
          className="text-white text-center mb-4 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600,
          }}
        >
          {t(
            "Pratiquez avec des professionnels qui ont les mêmes défis",
            "Practice with professionals facing the same challenges",
          )}
        </h2>

        <p className="text-white/60 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          {t(
            "Développeurs, entrepreneurs et employés s'entraînent ensemble à parler de projets, de clients, de réunions et d'opportunités professionnelles.",
            "Developers, entrepreneurs, and employees train together to discuss projects, clients, meetings, and professional opportunities.",
          )}
        </p>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {COMMUNITY_IMAGES.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-[#c9a84c]/15 bg-white/2"
            >
              <img
                src={item.image}
                alt={t(item.fr, item.en)}
                className="w-full h-60 md:h-85 object-contain transition-transform duration-700 group-hover:scale-110"
              />

              <div className=" inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

              {/* Badge */}
              <div className=" absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="backdrop-blur-md bg-black/70 border border-[#c9a84c]/20 rounded-xl px-4 py-3">
                  <p
                    className="text-[#e8c96a] leading-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "2rem",
                      fontWeight: 700,
                    }}
                  >
                    {item.badge}
                  </p>

                  <p className="text-white/70 text-xs md:text-sm mt-1">
                    {t(item.fr, item.en)}
                  </p>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#c9a84c]/5" />
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-10">
          <p className="text-white/40 text-sm">
            {t(
              "Ne pratiquez plus un anglais abstrait : utilisez celui de votre vie professionnelle.",
              "Stop practicing abstract English: use the English of your professional life.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
