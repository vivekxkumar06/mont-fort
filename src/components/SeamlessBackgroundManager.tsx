"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SeamlessBackgroundManagerProps {
  mountainVideoSrc?: string;
  shipVideoSrc?: string;
  globeVideoSrc?: string;
  forestVideoSrc?: string;
}

/**
 * High-performance, single-RAF video scrub controller.
 * Prevents multiple conflicting animation loops, cancels unneeded updates,
 * and maintains frame-accurate forward and backward seeking with zero stutter.
 */
class VideoScrubController {
  private video: HTMLVideoElement;
  private fallbackDuration: number;
  private targetProgress = 0;
  private isActive = false;
  private rafId: number | null = null;
  private lastSeekTimestamp = 0;
  private pendingSeek = false;

  constructor(video: HTMLVideoElement, fallbackDuration: number, initialActive = false) {
    this.video = video;
    this.fallbackDuration = fallbackDuration;
    this.isActive = initialActive;

    try {
      video.pause();
    } catch {}

    this.onSeeked = this.onSeeked.bind(this);
    this.video.addEventListener("seeked", this.onSeeked);

    this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
    this.video.addEventListener("loadedmetadata", this.onLoadedMetadata);

    if (initialActive) {
      this.scheduleFrame();
    }
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
    } else {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    }
  }

  private scheduleFrame(): void {
    if (!this.isActive || this.pendingSeek) return;
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.applySeek();
    });
  }

  private applySeek(): void {
    if (!this.isActive || !this.video) return;

    const now = performance.now();
    // Safety check: if decoder has been seeking for > 70ms, allow next seek
    if (this.video.seeking && now - this.lastSeekTimestamp < 70) {
      return;
    }

    const dur = this.getDuration();
    const targetTime = Math.min(
      Math.max(0, this.targetProgress * dur),
      Math.max(0, dur - 0.04)
    );
    const diff = Math.abs(this.video.currentTime - targetTime);

    // Only perform seek when frame difference is noticeable (> ~16ms)
    if (diff > 0.015) {
      this.pendingSeek = true;
      this.lastSeekTimestamp = now;
      try {
        this.video.currentTime = targetTime;
      } catch {
        this.pendingSeek = false;
      }
    }
  }

  private onSeeked(): void {
    this.pendingSeek = false;
    const dur = this.getDuration();
    const targetTime = Math.min(
      Math.max(0, this.targetProgress * dur),
      Math.max(0, dur - 0.04)
    );
    if (Math.abs(this.video.currentTime - targetTime) > 0.015) {
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

export default function SeamlessBackgroundManager({
  mountainVideoSrc = "/videos/mountain-sky.mp4",
  shipVideoSrc = "/videos/ship-ocean.mp4",
  globeVideoSrc = "/videos/earth-globe.mp4",
  forestVideoSrc = "/videos/forest-nature.mp4",
}: SeamlessBackgroundManagerProps) {
  const mVidRef = useRef<HTMLVideoElement>(null);
  const sVidRef = useRef<HTMLVideoElement>(null);
  const gVidRef = useRef<HTMLVideoElement>(null);
  const fVidRef = useRef<HTMLVideoElement>(null);

  const [mReady, setMReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const m = mVidRef.current;
    const s = sVidRef.current;
    const g = gVidRef.current;
    const f = fVidRef.current;
    if (!m || !s || !g || !f) return;

    // Ensure all videos start strictly paused
    [m, s, g, f].forEach((v) => {
      try {
        v.pause();
      } catch {}
    });

    const isMobile =
      typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

    // Dedicated high-performance scrubbers for each video
    const mScrubber = new VideoScrubController(m, 9.77, true);
    const sScrubber = new VideoScrubController(s, 11.23, false);
    const gScrubber = new VideoScrubController(g, 30.04, false);
    const fScrubber = new VideoScrubController(f, 24.64, false);

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. MOUNTAIN ZONE: CONSOLIDATED PARALLAX & BIDIRECTIONAL SCRUB
      // -------------------------------------------------------------
      gsap.to(m, {
        scale: 1.08,
        y: "4%",
        ease: "none",
        scrollTrigger: {
          trigger: "#mountain-zone",
          start: "top top",
          end: "bottom top",
          scrub: true,
          onEnter: () => mScrubber.setActive(true),
          onEnterBack: () => mScrubber.setActive(true),
          onLeave: () => {
            mScrubber.setTargetProgress(1);
            mScrubber.setActive(false);
          },
          onLeaveBack: () => {
            mScrubber.setActive(true);
            mScrubber.setTargetProgress(0);
          },
          onUpdate: (self) => {
            mScrubber.setActive(true);
            mScrubber.setTargetProgress(self.progress);
          },
        },
      });

      // -------------------------------------------------------------
      // 2. MOUNTAIN -> SHIP CROSSFADE TRANSITION & CONSOLIDATED SHIP SCRUB
      // -------------------------------------------------------------
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#divisions-zone",
          start: "top 85%",
          end: "top 15%",
          scrub: true,
        },
      });

      tl1
        .to(
          m,
          {
            opacity: 0,
            scale: 1.12,
            filter: isMobile ? "none" : "blur(6px)",
            ease: "none",
          },
          0
        )
        .to(s, { opacity: 1, filter: "blur(0px)", ease: "none" }, 0);

      // Ship gentle parallax + unified bidirectional video scrub across the 4 division cards
      gsap.fromTo(
        s,
        { scale: 1.05, y: "-2.5%" },
        {
          scale: 1.12,
          y: "2.5%",
          ease: "none",
          scrollTrigger: {
            trigger: "#divisions-zone",
            start: "top 85%",
            end: "bottom top",
            scrub: true,
            onEnter: () => sScrubber.setActive(true),
            onEnterBack: () => sScrubber.setActive(true),
            onLeave: () => {
              sScrubber.setTargetProgress(1, true);
              sScrubber.setActive(false);
            },
            onLeaveBack: () => {
              sScrubber.setTargetProgress(0, true);
              sScrubber.setActive(false);
            },
            onUpdate: (self) => {
              sScrubber.setActive(true);
              sScrubber.setTargetProgress(self.progress);
            },
          },
        }
      );

      // -------------------------------------------------------------
      // 3. SHIP -> GLOBE CROSSFADE TRANSITION & CONSOLIDATED GLOBE SCRUB
      // -------------------------------------------------------------
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#globe-zone",
          start: "top 85%",
          end: "top 15%",
          scrub: true,
        },
      });

      tl2
        .to(s, { opacity: 0, ease: "none" }, 0)
        .to(g, { opacity: 1, scale: 1.0, ease: "none" }, 0);

      // Globe slow rotation depth + unified bidirectional scrub
      gsap.fromTo(
        g,
        { scale: 1.0 },
        {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: "#globe-zone",
            start: "top 85%",
            end: "bottom top",
            scrub: true,
            onEnter: () => gScrubber.setActive(true),
            onEnterBack: () => gScrubber.setActive(true),
            onLeave: () => {
              gScrubber.setTargetProgress(1);
              gScrubber.setActive(false);
            },
            onLeaveBack: () => {
              gScrubber.setTargetProgress(0);
              gScrubber.setActive(false);
            },
            onUpdate: (self) => {
              gScrubber.setActive(true);
              gScrubber.setTargetProgress(self.progress);
            },
          },
        }
      );

      // -------------------------------------------------------------
      // 4. GLOBE -> FOREST NATURE CROSSFADE TRANSITION & FOREST SCRUB
      // -------------------------------------------------------------
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: "#sustainability-zone",
          start: "top 85%",
          end: "top 15%",
          scrub: true,
        },
      });

      tl3
        .to(g, { opacity: 0, scale: 1.12, ease: "none" }, 0)
        .to(f, { opacity: 1, scale: 1.0, ease: "none" }, 0);

      // Forest deep atmosphere parallax + unified bidirectional scrub spanning Sustainability, Metrics, and Footer
      gsap.fromTo(
        f,
        { scale: 1.02, y: "-2%" },
        {
          scale: 1.09,
          y: "3%",
          ease: "none",
          scrollTrigger: {
            trigger: "#sustainability-zone",
            endTrigger: "footer",
            start: "top 85%",
            end: "bottom bottom",
            scrub: true,
            onEnter: () => fScrubber.setActive(true),
            onEnterBack: () => fScrubber.setActive(true),
            onLeave: () => {
              fScrubber.setTargetProgress(1);
              fScrubber.setActive(false);
            },
            onLeaveBack: () => {
              fScrubber.setTargetProgress(0);
              fScrubber.setActive(false);
            },
            onUpdate: (self) => {
              fScrubber.setActive(true);
              fScrubber.setTargetProgress(self.progress);
            },
          },
        }
      );
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      mScrubber.destroy();
      sScrubber.destroy();
      gScrubber.destroy();
      fScrubber.destroy();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden pointer-events-none select-none">
      {/* Video 1: Mountain Sky (Hero) */}
      <video
        ref={mVidRef}
        muted
        playsInline
        preload="auto"
        onCanPlay={() => {
          setMReady(true);
          if (mVidRef.current && mVidRef.current.currentTime === 0) {
            try {
              mVidRef.current.currentTime = 0.001;
            } catch {}
          }
        }}
        className="absolute inset-0 h-full w-full object-cover brightness-[1.04] contrast-[1.05] saturate-[0.88] will-change-transform"
        style={{
          opacity: mReady ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        src={mountainVideoSrc}
      />

      {/* Video 2: Tanker Ship */}
      <video
        ref={sVidRef}
        muted
        playsInline
        preload="auto"
        onCanPlay={() => {
          if (sVidRef.current && sVidRef.current.currentTime === 0) {
            try {
              sVidRef.current.currentTime = 0.001;
            } catch {}
          }
        }}
        className="absolute inset-0 h-full w-full object-cover brightness-[0.90] contrast-[1.12] saturate-[0.82] opacity-0 will-change-transform"
        src={shipVideoSrc}
      />

      {/* Video 3: Earth Globe */}
      <video
        ref={gVidRef}
        muted
        playsInline
        preload="auto"
        onCanPlay={() => {
          if (gVidRef.current && gVidRef.current.currentTime === 0) {
            try {
              gVidRef.current.currentTime = 0.001;
            } catch {}
          }
        }}
        className="absolute inset-0 h-full w-full object-cover brightness-[0.95] contrast-[1.15] saturate-[0.92] opacity-0 will-change-transform"
        src={globeVideoSrc}
      />

      {/* Video 4: Forest Nature */}
      <video
        ref={fVidRef}
        muted
        playsInline
        preload="auto"
        onCanPlay={() => {
          if (fVidRef.current && fVidRef.current.currentTime === 0) {
            try {
              fVidRef.current.currentTime = 0.001;
            } catch {}
          }
        }}
        className="absolute inset-0 h-full w-full object-cover brightness-[0.84] contrast-[1.12] saturate-[0.95] opacity-0 will-change-transform"
        src={forestVideoSrc}
      />

      {/* Subtle Atmospheric Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25 pointer-events-none" />
    </div>
  );
}
