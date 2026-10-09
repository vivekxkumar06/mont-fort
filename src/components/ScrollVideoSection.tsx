"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollVideoSectionProps {
  videoSrc: string;
  poster?: string;
  children?: ReactNode;
  pinDuration?: string; // e.g. "250%"
  className?: string;
  overlayOpacity?: number;
}

export default function ScrollVideoSection({
  videoSrc,
  poster,
  children,
  pinDuration = "250%",
  className = "",
  overlayOpacity = 0.45,
}: ScrollVideoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const pinEl = pinRef.current;
    const video = videoRef.current;
    if (!container || !pinEl || !video) return;

    let targetTime = 0;
    let animFrameId: number | null = null;
    let isTouch = false;

    if (typeof window !== "undefined") {
      isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }

    const ctx = gsap.context(() => {
      // Create pinned ScrollTrigger for the container
      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${pinDuration}`,
        pin: pinEl,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          if (video.duration) {
            targetTime = self.progress * video.duration;
          }
        },
      });

      // Smooth rAF loop to interpolate video playback without decoding jank
      if (!isTouch) {
        const smoothScrubLoop = () => {
          if (video.duration && !video.paused) {
            // Lerp towards targetTime
            const diff = targetTime - video.currentTime;
            if (Math.abs(diff) > 0.04) {
              video.currentTime += diff * 0.16;
            }
          }
          animFrameId = requestAnimationFrame(smoothScrubLoop);
        };
        animFrameId = requestAnimationFrame(smoothScrubLoop);
      } else {
        // Mobile fallback: gentle continuous playback with scroll parallax
        video.play().catch(() => {});
      }

      return () => {
        trigger.kill();
        if (animFrameId) cancelAnimationFrame(animFrameId);
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [pinDuration]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ minHeight: "100vh" }}
    >
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden select-none"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={poster}
          src={videoSrc}
          onLoadedMetadata={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Cinematic Vignette */}
        <div
          className="absolute inset-0 bg-[#061019] pointer-events-none transition-opacity"
          style={{ opacity: overlayOpacity }}
        />

        {/* Narrative Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
