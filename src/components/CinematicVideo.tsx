"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CinematicVideoProps {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  priority?: boolean; // If true, preloads immediately; else lazy loads
  scaleOnScroll?: boolean;
  overlayGradient?: boolean;
  vignette?: boolean;
  opacity?: number;
  brightness?: number;
  contrast?: number;
  saturate?: number;
}

export default function CinematicVideo({
  src,
  poster,
  className = "",
  videoClassName = "",
  priority = false,
  scaleOnScroll = true,
  overlayGradient = true,
  vignette = true,
  opacity = 1,
  brightness = 1.0,
  contrast = 1.05,
  saturate = 0.9,
}: CinematicVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [inView, setInView] = useState(priority);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Viewport intersection observer to lazy-load & pause/play intelligently
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          const video = videoRef.current;
          if (video && video.paused) {
            video.play().catch(() => {});
          }
        } else {
          // Pause when completely out of viewport to free GPU decoding threads
          const video = videoRef.current;
          if (video && !video.paused) {
            video.pause();
          }
        }
      },
      {
        rootMargin: "250px 0px 250px 0px", // Pre-warm slightly before coming into view
        threshold: 0.05,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Optional subtle scroll-driven breathing scale
  useEffect(() => {
    if (!scaleOnScroll) return;
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        video,
        { scale: 1.0 },
        {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [scaleOnScroll]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        poster={poster}
        src={inView ? src : undefined}
        onLoadedData={() => setIsReady(true)}
        style={{
          filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`,
          opacity: isReady ? opacity : 0,
          transition: "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className={`absolute inset-0 h-full w-full object-cover will-change-transform ${videoClassName}`}
      />

      {/* Atmospheric Vignette & Luxury Gradients */}
      {overlayGradient && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a141d]/40 via-transparent to-[#04090e]/60 pointer-events-none" />
      )}
      {vignette && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(6,12,18,0.5)_100%)] pointer-events-none" />
      )}
    </div>
  );
}
