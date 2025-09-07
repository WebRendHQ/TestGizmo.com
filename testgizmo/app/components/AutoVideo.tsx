"use client";

import { useEffect, useRef } from "react";

type AutoVideoProps = {
  src: string;
  className?: string;
};

export default function AutoVideo({ src, className }: AutoVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (_) {
        // Some browsers block autoplay; trigger on first user interaction
      }
    };

    tryPlay();

    const onInteract = () => tryPlay();
    window.addEventListener("click", onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, { once: true });
    return () => {
      window.removeEventListener("click", onInteract as any);
      window.removeEventListener("touchstart", onInteract as any);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}


