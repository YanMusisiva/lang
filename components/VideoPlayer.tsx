import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

type VideoPlayerProps = {
  src: string;
  title?: string;
  description?: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
};

const formatTime = (seconds = 0) => {
  if (!isFinite(seconds) || seconds <= 0) return "00:00";
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const VideoPlayer = ({
  src,
  title,
  description,
  isPlaying,
  onPlay,
  onPause,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play();
      setShowOverlay(false);
    } else {
      video.pause();
      setShowOverlay(true);
    }

    const onLoaded = () => setDuration(video.duration || 0);
    const onTime = () => {
      setCurrentTime(video.currentTime);
      const dur = video.duration || 1;
      setProgress((video.currentTime / dur) * 100);
    };
    const onEnd = () => {
      setShowOverlay(true);
      setProgress(100);
      setCurrentTime(video.duration || 0);
      onPause();
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnd);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnd);
    };
  }, [isPlaying, onPause]);

  const handlePlayPause = async () => {
    if (!isPlaying) {
      onPlay();
    } else {
      onPause();
    }
  };

  const handleVideoClick = () => {
    if (!isPlaying) {
      onPlay();
    } else {
      setShowOverlay((s) => !s);
    }
  };

  return (
    <div className="bg-black rounded-2xl shadow-xl overflow-hidden relative">
      <iframe
        src={src}
        title="Video player"
        className="w-full h-[70vh] rounded-xl bg-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
// filepath: c:\web
