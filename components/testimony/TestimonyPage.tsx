"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, AudioLines, Play, Quote } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { TESTIMONIALS, TESTIMONIAL_PHOTOS, TESTIMONIAL_VIDEOS, type StoryVideo } from "@/data/testimonials";
import { METHOD_VIDEOS } from "@/data/videos";
import RevealWrapper from "@/components/motion/RevealWrapper";
import ScrollAccent from "@/components/motion/ScrollAccent";
import StudentPortrait from "./StudentPortrait";
import VideoCollection from "./VideoCollection";
import PhotoGallery from "./PhotoGallery";
import { getYouTubeId } from "@/lib/youtube";

const methodVideos: StoryVideo[] = METHOD_VIDEOS.map((video, index) => ({
  id: `method-${index}`,
  youtubeUrl: video.src,
  title: { fr: video.titleFr, en: video.titleEn },
  description: { fr: video.descFr, en: video.descEn },
}));

export default function TestimonyPage() {
  const { t } = useLang();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const featured = TESTIMONIALS.find(story => story.id === "francis") || TESTIMONIALS[0];
  const studentVideos = TESTIMONIAL_VIDEOS.filter(video => getYouTubeId(video.youtubeUrl));
  const hasPhotos = TESTIMONIAL_PHOTOS.length > 0;

  return (
    <main className="testimony-page">
      <section className="testimony-intro" aria-labelledby="testimony-title">
        <div className="site-container testimony-intro-grid">
          <div className="testimony-intro-copy hero-enter">
            <p className="eyebrow"><span className="status-dot" />{t("La communauté LangListening", "The LangListening community")}</p>
            <h1 id="testimony-title">{t("Leurs mots.", "Their words.")}<span>{t("Votre prochain chapitre.", "Your next chapter.")}</span></h1>
            <p className="testimony-intro-description">{t("Derrière chaque voix, une envie d'avancer. Découvrez ce que nos apprenants racontent de leur expérience, puis faites le premier pas vers la vôtre.", "Behind every voice is a desire to move forward. Discover what our learners say about their experience, then take the first step towards your own.")}</p>
            <div className="testimony-intro-actions">
              <a href="#voices" className="pill-button pill-gold">{t("Découvrir leurs témoignages", "Read their stories")}<ArrowDown size={17} /></a>
              <a href="#films" className="testimony-watch"><span className="circle-button"><Play size={15} fill="currentColor" /></span>{t("Le moment vidéo", "Time to watch")}</a>
            </div>
            {TESTIMONIALS.length > 0 && <div className="testimony-people"><div>{TESTIMONIALS.slice(0, 4).map(story => <a href={`#story-${story.id}`} key={story.id} aria-label={`${t("Lire le témoignage de", "Read the story of")} ${story.name}`}><StudentPortrait story={story} /></a>)}</div><p>{t("Des expériences différentes.", "Different experiences.")}<strong>{t("Une envie commune : progresser.", "One shared goal: progress.")}</strong></p></div>}
          </div>
          {featured && <div className="testimony-feature hero-enter" style={{ animationDelay: "150ms" }}>
            <div className="testimony-feature-orbit" aria-hidden="true"><span /></div>
            <span className="testimony-feature-note"><AudioLines size={18} />{t("La parole aux apprenants", "In our learners’ words")}</span>
            <figure className="testimony-feature-card">
              <div className="testimony-feature-top"><StudentPortrait story={featured} priority /><Quote size={40} strokeWidth={1} aria-hidden="true" /></div>
              <blockquote>“{t(featured.quote.fr, featured.quote.en)}”</blockquote>
              <figcaption><strong>{featured.name}</strong><span>{t(featured.role.fr, featured.role.en)}</span><a href="#voices" className="circle-button" aria-label={t("Découvrir tous les témoignages", "Explore all stories")}><ArrowDown size={19} /></a></figcaption>
            </figure>
            <span className="testimony-feature-foot">LEARN. LISTEN. SPEAK. INTERACT.</span>
          </div>}
        </div>
        <nav className="site-container testimony-index" aria-label={t("Explorer les témoignages", "Explore the stories")}>
          <a href="#voices"><span>01</span>{t("Leurs témoignages", "Their stories")}<ArrowDown size={16} /></a>
          {hasPhotos && <a href="#moments"><span>02</span>{t("En images", "In pictures")}<ArrowDown size={16} /></a>}
          <a href="#films"><span>{hasPhotos ? "03" : "02"}</span>{t("En vidéo", "On video")}<ArrowDown size={16} /></a>
        </nav>
      </section>

      <section id="voices" className="testimony-voices section-space" aria-labelledby="voices-title">
        <div className="site-container testimony-voices-layout">
          <div className="testimony-section-intro">
            <p className="eyebrow"><span className="section-number">01</span>{t("Leurs expériences", "Their experiences")}</p>
            <h2 id="voices-title" className="section-title">{t("L'anglais prend une autre place dans leur vie.", "English is finding a new place in their lives.")}</h2>
            <p>{t("Écouter, pratiquer, prendre confiance. Ils vous en parlent avec leurs propres mots.", "Listening, practising, growing in confidence. Here is how they describe it, in their own words.")}</p>
            <span className="testimony-decorative-quote" aria-hidden="true">“</span>
          </div>
          <div className="testimony-quote-list">
            <ScrollAccent />
            {TESTIMONIALS.map((story, index) => <RevealWrapper key={story.id} delay={index % 3 * 70}>
              <figure id={`story-${story.id}`} className="testimony-quote-card">
                <div className="testimony-quote-top"><StudentPortrait story={story} /><span>{String(index + 1).padStart(2, "0")}<span aria-hidden="true"> / </span>{String(TESTIMONIALS.length).padStart(2, "0")}</span></div>
                <blockquote>“{t(story.quote.fr, story.quote.en)}”</blockquote>
                <figcaption><span className="status-dot" /><div><strong>{story.name}</strong><span>{t(story.role.fr, story.role.en)}</span></div><Quote size={26} strokeWidth={1} aria-hidden="true" /></figcaption>
              </figure>
            </RevealWrapper>)}
          </div>
        </div>
      </section>

      {hasPhotos && <section id="moments" className="testimony-moments section-space" aria-labelledby="moments-title"><div className="site-container">
        <RevealWrapper className="testimony-section-heading"><div><p className="eyebrow"><span className="section-number">02</span>{t("Les moments partagés", "Shared moments")}</p><h2 id="moments-title" className="section-title">{t("Des visages. Des rencontres. Des souvenirs.", "Faces. Connections. Memories.")}</h2></div><p>{t("Une communauté qui apprend ensemble. Explorez les photos, un moment à la fois.", "A community learning together. Explore the photos, one moment at a time.")}</p></RevealWrapper>
        <PhotoGallery photos={TESTIMONIAL_PHOTOS} />
      </div></section>}

      <section id="films" className="testimony-cinema section-space" aria-labelledby="films-title"><div className="site-container">
        <RevealWrapper className="testimony-section-heading"><div><p className="eyebrow"><span className="section-number">{hasPhotos ? "03" : "02"}</span>{t("Prenez un moment", "Take a moment")}</p><h2 id="films-title" className="section-title">{t("L'expérience continue.", "The experience continues.")}<span>{t("Appuyez sur play.", "Press play.")}</span></h2></div><p>{t("Installez-vous et découvrez notre univers en vidéo. Choisissez ce qui vous inspire et regardez à votre rythme.", "Settle in and discover our world on video. Choose what inspires you and watch at your own pace.")}</p></RevealWrapper>
        {studentVideos.length > 0 && <div className="testimony-film-group"><h3 className="testimony-group-title">{t("Les témoignages en vidéo", "Learner video stories")}</h3><VideoCollection videos={studentVideos} label={t("Témoignage d'apprenant", "Learner story")} activeVideo={activeVideo} onActiveVideoChange={setActiveVideo} /></div>}
        <div className="testimony-film-group"><h3 className="testimony-group-title">{t("Découvrez notre méthode en vidéo", "Explore our method on video")}</h3><VideoCollection videos={methodVideos} label={t("La méthode LangListening", "The LangListening method")} activeVideo={activeVideo} onActiveVideoChange={setActiveVideo} /></div>
      </div></section>

      <section className="testimony-invitation section-space"><RevealWrapper className="site-container">
        <p className="eyebrow"><span className="status-dot" />{t("À votre tour", "Your turn")}</p>
        <h2 className="section-title">{t("Et si la prochaine histoire", "What if the next story")}<span>{t("était la vôtre ?", "was yours?")}</span></h2>
        <p>{t("Pas besoin de tout savoir pour commencer. Juste de faire le premier pas.", "You do not need to know everything to begin. Just take the first step.")}</p>
        <div><Link href="/practice" className="pill-button pill-gold">{t("Commencer gratuitement", "Start for free")}<ArrowUpRight size={18} /></Link><Link href="/contact" className="text-link">{t("Parlons de votre anglais", "Let's talk about your English")}<ArrowUpRight size={16} /></Link></div>
      </RevealWrapper></section>
    </main>
  );
}
