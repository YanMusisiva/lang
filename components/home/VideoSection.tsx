"use client";

import { useEffect, useRef, useState } from "react";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RevealWrapper from "@/components/motion/RevealWrapper";
import { useLang } from "@/context/LangContext";

import { METHOD_VIDEOS as VIDEOS } from "@/data/videos";


export default function VideoSection() {
  const { t } = useLang();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft < 5, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 5 });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); el.removeEventListener("scroll", update); };
  }, []);
  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    const slide = el.firstElementChild?.getBoundingClientRect().width || el.clientWidth;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (slide + gap), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return (
    <section id="video" className="video-section section-space">
      <div className="site-container">
        <RevealWrapper className="video-heading">
          <div>
            <p className="eyebrow"><span className="section-number">02</span>{t("La méthode en action", "The method in action")}</p>
            <h2 className="section-title">{t("Découvrez comment fonctionne notre méthode", "Discover how our method works")}</h2>
            <p>{t("Découvrez comment l'écoute, la répétition et l'interaction vous préparent aux situations réelles de votre travail.", "See how listening, repetition, and interaction prepare you for real situations at work.")}</p>
          </div>
          <div className="carousel-controls">
            <button className="circle-button" disabled={edges.start} onClick={() => move(-1)} aria-label={t("Vidéos précédentes", "Previous videos")} aria-controls="method-videos"><ArrowLeft size={19} /></button>
            <button className="circle-button" disabled={edges.end} onClick={() => move(1)} aria-label={t("Vidéos suivantes", "Next videos")} aria-controls="method-videos"><ArrowRight size={19} /></button>
          </div>
        </RevealWrapper>
        <div ref={track} id="method-videos" className="video-track custom-scrollbar" tabIndex={0} role="region" aria-label={t("Vidéos de la méthode", "Method videos")}>
          {VIDEOS.map((video, i) => <div className="video-slide" key={video.src}><VideoPlayer src={video.src} title={t(video.titleFr, video.titleEn)} description={t(video.descFr, video.descEn)} isPlaying={playingIndex === i} onPlay={() => setPlayingIndex(i)} onPause={() => setPlayingIndex(null)} /></div>)}
        </div>
      </div>
    </section>
  );
}
