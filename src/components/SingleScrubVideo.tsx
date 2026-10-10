"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SingleScrubVideoProps {
  videoSrc: string;
  fallbackDuration?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  overlayGradient?: string;
  brightness?: number;
  contrast?: number;
  saturate?: number;
  scaleFrom?: number;
  scaleTo?: number;
  yFrom?: string;
  yTo?: string;
}

/**
 * Ultra-smooth, single-RAF video scrub controller adapted from SeamlessBackgroundManager.
 * Employs hardware-friendly frame-accurate seek scheduling, decoder seek throttle prevention,
 * and seamless bidirectional hold-on-stop response.
 */
class VideoScrubController {
  private video: HTMLVideoElement;
  private fallbackDuration: number;
  private targetProgress = 0;
  private currentProgress = 0;
  private isActive = true;
  private rafId: number | null = null;
  private lastSeekTimestamp = 0;
  private pendingSeek = false;
  private hasFastSeek: boolean;

  constructor(video: HTMLVideoElement, fallbackDuration: number) {
    this.video = video;
    this.fallbackDuration = fallbackDuration;
    this.hasFastSeek = typeof (video as unknown as { fastSeek?: (time: number) => void }).fastSeek === "function";

    try {
      video.pause();
    } catch {}

    this.onSeeked = this.onSeeked.bind(this);
    this.video.addEventListener("seeked", this.onSeeked);

    this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
    this.video.addEventListener("loadedmetadata", this.onLoadedMetadata);

    this.scheduleFrame();
  }

  private getDuration(): number {
    if (isFinite(this.video.duration) && this.video.duration > 0) {
      return this.video.duration;
    }
    return this.fallbackDuration;
  }

  public setTargetProgress(progress: number, immediate = false): void {
    this.targetProgress = Math.min(Math.max(0, progress), 1);
    if (immediate) {
      this.currentProgress = this.targetProgress;
      this.applySeek();
    } else {
      this.scheduleFrame();
    }
  }

  public setActive(active: boolean): void {
    if (this.isActive === active) return;
    this.isActive = active;
    if (active) {
      this.scheduleFrame();
    } else if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private scheduleFrame(): void {
    if (!this.isActive) return;
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.step();
    });
  }

  private step(): void {
    if (!this.isActive || !this.video) return;

    // Smooth lerp towards targetProgress for buttery bidirectional response
    const diff = this.targetProgress - this.currentProgress;
    if (Math.abs(diff) > 0.0005) {
      this.currentProgress += diff * 0.28;
    } else {
      this.currentProgress = this.targetProgress;
    }

    this.applySeek();

    // If still interpolating towards targetProgress, continue next frame
    if (Math.abs(this.targetProgress - this.currentProgress) > 0.0005) {
      this.scheduleFrame();
    }
  }

  private applySeek(): void {
    if (!this.isActive || !this.video) return;

    const now = performance.now();
    // Safety check: allow seek when not already seeking or when decoder seek takes > 45ms
    if (this.video.seeking && now - this.lastSeekTimestamp < 45) {
      return;
    }

    const dur = this.getDuration();
    const targetTime = Math.min(
      Math.max(0, this.currentProgress * dur),
      Math.max(0, dur - 0.04)
    );
    const timeDiff = Math.abs(this.video.currentTime - targetTime);

    // Frame threshold (~16ms)
    if (timeDiff > 0.016) {
      this.pendingSeek = true;
      this.lastSeekTimestamp = now;
      try {
        if (this.hasFastSeek && timeDiff > 0.5) {
          (this.video as unknown as { fastSeek: (time: number) => void }).fastSeek(targetTime);
        } else {
          this.video.currentTime = targetTime;
        }
      } catch {
        this.pendingSeek = false;
      }
    }
  }

  private onSeeked(): void {
    this.pendingSeek = false;
    const dur = this.getDuration();
    const targetTime = Math.min(
      Math.max(0, this.currentProgress * dur),
      Math.max(0, dur - 0.04)
    );
    if (Math.abs(this.video.currentTime - targetTime) > 0.016 || Math.abs(this.targetProgress - this.currentProgress) > 0.0005) {
      this.scheduleFrame();
    }
  }

  private onLoadedMetadata(): void {
    try {
      this.video.pause();
    } catch {}
    this.scheduleFrame();
  }

  public destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.video.removeEventListener("seeked", this.onSeeked);
    this.video.removeEventListener("loadedmetadata", this.onLoadedMetadata);
  }
}

export default function SingleScrubVideo({
  videoSrc,
  fallbackDuration = 10,
  containerRef,
  className = "",
  overlayGradient = "from-[#020912]/50 via-transparent to-[#020912]/80",
  brightness = 0.95,
  contrast = 1.05,
  saturate = 0.95,
  scaleFrom = 1.0,
  scaleTo = 1.08,
  yFrom = "-2%",
  yTo = "3%",
}: SingleScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    try {
      video.pause();
    } catch {}

    const primeFirstFrame = () => {
      setIsReady(true);
      if (video && video.currentTime === 0) {
        try {
          video.currentTime = 0.001;
        } catch {}
      }
    };

    // If metadata already loaded (e.g. from cache or SSR hydration)
    if (video.readyState >= 1) {
      primeFirstFrame();
    }

    video.addEventListener("loadedmetadata", primeFirstFrame);
    video.addEventListener("loadeddata", primeFirstFrame);
    video.addEventListener("canplay", primeFirstFrame);

    const scrubber = new VideoScrubController(video, fallbackDuration);

    const ctx = gsap.context(() => {
      // 1. Synchronized bidirectional video scrubber
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => scrubber.setActive(true),
        onEnterBack: () => scrubber.setActive(true),
        onLeave: () => {
          scrubber.setTargetProgress(1, true);
        },
        onLeaveBack: () => {
          scrubber.setTargetProgress(0, true);
        },
        onUpdate: (self) => {
          scrubber.setActive(true);
          scrubber.setTargetProgress(self.progress);
        },
      });

      // 2. Subtle cinematic camera drift/scale matching landing page
      gsap.fromTo(
        video,
        { scale: scaleFrom, y: yFrom },
        {
          scale: scaleTo,
          y: yTo,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, container);

    ScrollTrigger.refresh();

    return () => {
      video.removeEventListener("loadedmetadata", primeFirstFrame);
      video.removeEventListener("loadeddata", primeFirstFrame);
      video.removeEventListener("canplay", primeFirstFrame);
      ctx.revert();
      scrubber.destroy();
    };
  }, [containerRef, fallbackDuration, scaleFrom, scaleTo, yFrom, yTo]);

  return (
    <div className={`fixed inset-0 z-0 h-screen w-screen overflow-hidden pointer-events-none select-none ${className}`}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => setIsReady(true)}
        onLoadedData={() => setIsReady(true)}
        onCanPlay={() => {
          setIsReady(true);
          if (videoRef.current && videoRef.current.currentTime === 0) {
            try {
              videoRef.current.currentTime = 0.001;
            } catch {}
          }
        }}
        onError={(e) => {
          console.warn("[SingleScrubVideo] Video load warning/error:", videoSrc, e);
          setIsReady(true); // Don't keep screen hidden if browser restricts pre-decoding
        }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{
          opacity: isReady ? 1 : 0.85,
          transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`,
        }}
        src={videoSrc}
      />

      {/* Atmospheric Vignette Overlay */}
      {overlayGradient && (
        <div className={`absolute inset-0 bg-gradient-to-b ${overlayGradient} pointer-events-none`} />
      )}
    </div>
  );
}
