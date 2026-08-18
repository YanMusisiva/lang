"use client";

import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { useLang } from "@/context/LangContext";

const VIDEOS = [
  {
    src: "https://www.youtube.com/embed/k827TUGQcs8?si=8alfAPvQM1GoVvw5",
    titleFr: "Introduction à la méthode",
    titleEn: "Introduction to the method",
    descFr: "Découvrez comment fonctionne notre méthode",
    descEn: "Discover how our method works.",
  },
  {
    src: "https://www.youtube.com/embed/PqoI50fDx3k?si=zVVNfZK8R0iRHW42",
    titleFr: "3 erreurs que les adultes font en apprenant l'anglais",
    titleEn: "3 mistakes adults make when learning English",
    descFr: "Comprenez les erreurs qui ralentissent l'apprentissage.",
    descEn: "Understand the mistakes that slow down learning.",
  },
  {
    src: "https://youtube.com/embed/skTAwHHvoUc?si=-bM2HivcliO8cGsj",
    titleFr: "Comment pratiquer chaque jour",
    titleEn: "How to practice every day",
    descFr: "Une routine simple pour progresser rapidement.",
    descEn: "A simple routine to progress quickly.",
  },
  {
    src: "https://www.youtube.com/embed/gK0ILtlqhP4?si=oGI0H9ct6BrHPTSF",
    titleFr: "Ameliorez votre anglais en 7 semaines",
    titleEn: "Improve your English in 7 weeks",
    descFr: "le programme complet pour parler anglais avec confiance.",
    descEn: "The complete program to speak English with confidence.",
  },
];

export default function VideoSection() {
  const { t } = useLang();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <section id="video" className="bg-[#0a0a0a] py-24 relative overflow-hidden">
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
              "Découvrez comment l'écoute, la répétition et l'interaction vous préparent aux situations réelles de votre travail.",
              "See how listening, repetition, and interaction prepare you for real situations at work.",
            )}
          </p>
        </div>

        {/* horizontal scroll */}

        <div className="flex gap-8 overflow-x-auto custom-scrollbar pb-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {VIDEOS.map((video, i) => (
            <div key={i} className="min-w-105 max-w-105 shrink-0">
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
