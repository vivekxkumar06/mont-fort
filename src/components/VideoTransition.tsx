"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface VideoTransitionProps {
  children: ReactNode;
  type?: "clip-path" | "crossfade" | "scale-blur";
  start?: string;
  end?: string;
  className?: string;
}

export default function VideoTransition({
  children,
  type = "clip-path",
  start = "top 90%",
  end = "top 25%",
  className = "",
}: VideoTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (type === "clip-path") {
        gsap.fromTo(
          el,
          {
            clipPath: "inset(12% 0% 0% 0%)",
            opacity: 0.6,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: 1,
            },
          }
        );
      } else if (type === "scale-blur") {
        gsap.fromTo(
          el,
          {
            scale: 1.08,
            filter: "blur(8px)",
            opacity: 0.3,
          },
          {
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: 1,
            },
          }
        );
      } else {
        // Crossfade
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [type, start, end]);

  return (
    <div
      ref={containerRef}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
