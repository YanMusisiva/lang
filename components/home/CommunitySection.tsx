"use client";

import Image from "next/image";
import RevealWrapper from "@/components/motion/RevealWrapper";
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
    <section id="community" className="community-section section-space">
      <div className="site-container">
        <RevealWrapper className="community-heading">
          <div><p className="eyebrow"><span className="section-number">03</span>{t("Notre communauté", "Our community")}</p>
          <h2 className="section-title">{t("Pratiquez avec des professionnels qui ont les mêmes défis", "Practice with professionals facing the same challenges")}</h2></div>
          <p>{t("Développeurs, entrepreneurs et employés s'entraînent ensemble à parler de projets, de clients, de réunions et d'opportunités professionnelles.", "Developers, entrepreneurs, and employees train together to discuss projects, clients, meetings, and professional opportunities.")}</p>
        </RevealWrapper>
        <div className="community-gallery">
          {COMMUNITY_IMAGES.map((item, index) => <RevealWrapper key={item.image} delay={index * 100}><figure className="community-card">
            <div className="community-photo"><Image src={item.image} alt={t(item.fr, item.en)} fill sizes="(max-width: 767px) 340px, 30vw" /></div>
            <figcaption><strong>{item.badge}</strong><span>{t(item.fr, item.en)}</span></figcaption>
          </figure></RevealWrapper>)}
        </div>
        <p className="community-note">{t("Ne pratiquez plus un anglais abstrait : utilisez celui de votre vie professionnelle.", "Stop practicing abstract English: use the English of your professional life.")}</p>
      </div>
    </section>
  );
}
