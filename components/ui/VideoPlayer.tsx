"use client";

import { Play, X } from "lucide-react";
import { useLang } from "@/context/LangContext";

type VideoPlayerProps = { src: string; title?: string; description?: string; isPlaying: boolean; onPlay: () => void; onPause: () => void };

export default function VideoPlayer({ src, title, description, isPlaying, onPlay, onPause }: VideoPlayerProps) {
  const { t } = useLang();
  const label = title || t("Vidéo", "Video");
  return (
    <article className="method-video">
      <div className="method-video-frame">
        {isPlaying ? <>
          <iframe src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1`} title={label} className="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          <button onClick={onPause} className="video-close circle-button" aria-label={t("Fermer la vidéo", "Close video")}><X size={18} /></button>
        </> : <button onClick={onPlay} className="video-cover" aria-label={`${t("Lire", "Play")} : ${label}`}>
          <span className="video-rings" aria-hidden="true"><span /><span /><span /></span>
          <span className="video-play"><Play size={24} fill="currentColor" /></span>
          <span className="video-cover-label">LANGLISTENING <span>•</span> {t("LA MÉTHODE", "THE METHOD")}</span>
        </button>}
      </div>
      <h3>{label}</h3>
      <p>{description}</p>
    </article>
  );
}
