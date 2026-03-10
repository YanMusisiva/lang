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
      <video
        ref={videoRef}
        src={src}
        onClick={handleVideoClick}
        onContextMenu={(e) => e.preventDefault()}
        className="w-full max-h-[70vh] object-contain bg-black"
        playsInline
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
        {showOverlay && !isPlaying && (
          <div className="mb-3 text-center">
            {title && <h3 className="text-white font-bold text-lg">{title}</h3>}
            {description && (
              <p className="text-gray-300 text-sm">{description}</p>
            )}
          </div>
        )}

        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${isFinite(progress) ? progress : 0}%` }}
          />
        </div>

        <div className="flex justify-end text-white text-xs mb-2">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {showOverlay && (
          <div className="w-full flex justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
              className="pointer-events-auto bg-white/20 hover:bg-white/30 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
// filepath: c:\web
