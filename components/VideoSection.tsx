"use client";

import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { useLang } from "@/context/LangContext";

const VIDEOS = [
  {
    src: "/videos/video2.mp4",
    titleFr: "Introduction à la méthode",
    titleEn: "Introduction to the method",
    descFr: "Découvrez comment fonctionne notre méthode d'écoute.",
    descEn: "Discover how our listening method works.",
  },
  {
    src: "/videos/video1.mp4",
    titleFr: "Pourquoi l'écoute est essentielle",
    titleEn: "Why listening is essential",
    descFr: "Comprenez pourquoi l'écoute accélère l'apprentissage.",
    descEn: "Understand why listening accelerates learning.",
  },
  {
    src: "/videos/video3.mp4",
    titleFr: "Comment pratiquer chaque jour",
    titleEn: "How to practice every day",
    descFr: "Une routine simple pour progresser rapidement.",
    descEn: "A simple routine to progress quickly.",
  },
  //   {
  //     src: "/videos/lesson4.mp4",
  //     titleFr: "Résultats des étudiants",
  //     titleEn: "Student results",
  //     descFr: "Voyez les progrès obtenus avec la méthode.",
  //     descEn: "See the progress achieved with the method.",
  //   },
];

export default function VideoSection() {
  const { t } = useLang();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0a0a0a] py-24 relative overflow-hidden">
      {/* glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,168,76,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* title */}

        <div className="text-center mb-16">
          <h2
            className="text-white text-4xl mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t(
              "Découvrez comment fonctionne notre méthode",
              "Discover how our method works",
            )}
          </h2>

          <p className="text-white/60 max-w-xl mx-auto">
            {t(
              "Quelques vidéos pour comprendre pourquoi notre méthode d'écoute permet de parler plus vite.",
              "A few videos to understand why our listening method helps you speak faster.",
            )}
          </p>
        </div>

        {/* horizontal scroll */}

        <div className="flex gap-8 overflow-x-auto custom-scrollbar pb-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {VIDEOS.map((video, i) => (
            <div key={i} className="min-w-[420px] max-w-[420px] flex-shrink-0">
              <VideoPlayer
                src={video.src}
                title={t(video.titleFr, video.titleEn)}
                description={t(video.descFr, video.descEn)}
                isPlaying={playingIndex === i}
                onPlay={() => setPlayingIndex(i)}
                onPause={() => setPlayingIndex(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
