"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
}

export default function ParallaxSection({
  children,
  className = "",
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // negative moves slower (background), positive moves faster (foreground)
  scaleEffect?: boolean;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = -0.15,
  scaleEffect = false,
  className = "",
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = layerRef.current;
    if (!el) return;

    const parent = el.closest(".relative") || el.parentElement;
    if (!parent) return;

    const yMove = speed * 120; // gentle, luxury parallax travel

    const ctx = gsap.context(() => {
      const vars: gsap.TweenVars = {
        y: yMove,
        ease: "none",
        scrollTrigger: {
          trigger: parent,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      };

      if (scaleEffect) {
        vars.scale = 1.05;
      }

      gsap.to(el, vars);
    }, layerRef);

    return () => ctx.revert();
  }, [speed, scaleEffect]);

  return (
    <div
      ref={layerRef}
      className={`will-change-transform ${className}`}
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      {children}
    </div>
  );
}
