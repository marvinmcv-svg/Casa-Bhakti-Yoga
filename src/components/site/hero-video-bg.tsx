"use client";

import { useRef, useState, useEffect } from "react";

interface HeroVideoBgProps {
  src: string;
  poster?: string;
}

// Mobile-only video hero background.
// Auto-plays muted, looped, inline (iOS compliant). Falls back to poster.
export function HeroVideoBg({ src, poster }: HeroVideoBgProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Attempt to play (some browsers need a nudge)
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* autoplay blocked — poster will show */
        });
      }
    };
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("loadeddata", tryPlay, { once: true });
    return () => v.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-espresso">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onLoadedData={() => setLoaded(true)}
        // Disable picture-in-picture and download prompts for a clean look
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Subtle fade-in once video is ready to avoid flash of poster */}
      <div
        className={`pointer-events-none absolute inset-0 bg-espresso transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
