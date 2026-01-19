"use client";
import { useState, useRef } from "react";

export default function VideoPlayer({ src, className = "" }) {
  const [isPaused, setIsPaused] = useState(true);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        onClick={togglePlayPause}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        className={`cursor-pointer ${className}`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {isPaused && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          onClick={togglePlayPause}
        >
          <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
            <svg
              className="w-8 h-8 text-gray-800 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
