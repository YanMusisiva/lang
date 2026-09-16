"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, Play, X } from "lucide-react";
import type { StoryVideo } from "@/data/testimonials";
import { getYouTubeId } from "@/lib/youtube";
import { useLang } from "@/context/LangContext";

function Thumbnail({ videoId, sizes }: { videoId: string; sizes: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="film-thumbnail-fallback" aria-hidden="true"><Play /></span>;
  return <Image src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" fill unoptimized sizes={sizes} onError={() => setFailed(true)} className="film-thumbnail" />;
}

type Props = {
  videos: StoryVideo[];
  label: string;
  activeVideo: string | null;
  onActiveVideoChange: (id: string | null) => void;
};

export default function VideoCollection({ videos, label, activeVideo, onActiveVideoChange }: Props) {
  const { t } = useLang();
  const playable = videos.flatMap(video => {
    const youtubeId = getYouTubeId(video.youtubeUrl);
    return youtubeId ? [{ ...video, youtubeId }] : [];
  });
  const [selectedId, setSelectedId] = useState(playable[0]?.id);
  const screen = useRef<HTMLDivElement>(null);
  const selected = playable.find(video => video.id === selectedId) || playable[0];
  if (!selected) return null;
  const playing = activeVideo === selected.id;

  return (
    <div className="story-films" role="region" aria-label={label}>
      <div className="story-film-feature">
        <div ref={screen} className="story-film-screen">
          {playing ? (
            <>
              <iframe
                key={selected.id}
                src={`https://www.youtube-nocookie.com/embed/${selected.youtubeId}?autoplay=1&rel=0`}
                title={t(selected.title.fr, selected.title.en)}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <button className="circle-button story-film-stop" onClick={() => onActiveVideoChange(null)} aria-label={t("Arrêter la vidéo", "Stop video")}><X size={18} /></button>
            </>
          ) : (
            <button className="story-film-cover" onClick={() => onActiveVideoChange(selected.id)} aria-label={`${t("Regarder", "Watch")} : ${t(selected.title.fr, selected.title.en)}`}>
              <Thumbnail key={selected.youtubeId} videoId={selected.youtubeId} sizes="(max-width: 1023px) 90vw, 65vw" />
              <span className="story-film-shade" />
              <span className="story-film-play"><Play size={30} fill="currentColor" /></span>
              <span className="story-film-label">{t("Installez-vous. Appuyez sur play.", "Settle in. Press play.")}</span>
            </button>
          )}
        </div>
        <div className="story-film-caption">
          <div><p className="eyebrow">{label}</p><h3>{t(selected.title.fr, selected.title.en)}</h3><p>{t(selected.description.fr, selected.description.en)}</p></div>
          <a href={`https://www.youtube.com/watch?v=${selected.youtubeId}`} target="_blank" rel="noopener noreferrer" className="text-link">YouTube <ArrowUpRight size={16} /><span className="sr-only">{t("(nouvel onglet)", "(new tab)")}</span></a>
        </div>
      </div>
      <div className="story-film-list">
        <p className="eyebrow">{t("À découvrir", "Explore")} <span>{String(playable.length).padStart(2, "0")}</span></p>
        {playable.map((video, index) => (
          <button
            key={video.id}
            className={`story-film-item ${selected.id === video.id ? "is-selected" : ""}`}
            aria-pressed={selected.id === video.id}
            onClick={() => {
              setSelectedId(video.id);
              onActiveVideoChange(video.id);
              const bounds = screen.current?.getBoundingClientRect();
              if (bounds && (bounds.top < 80 || bounds.bottom > window.innerHeight)) {
                screen.current?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
              }
            }}
          >
            <span className="story-film-miniature"><Thumbnail videoId={video.youtubeId} sizes="120px" /><span><Play size={15} fill="currentColor" /></span></span>
            <span className="story-film-item-copy"><small>{String(index + 1).padStart(2, "0")}</small><strong>{t(video.title.fr, video.title.en)}</strong></span>
          </button>
        ))}
      </div>
    </div>
  );
}
