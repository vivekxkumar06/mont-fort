"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  scale?: number;
  opacity?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  className?: string;
  triggerHook?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = "up",
  distance = 30,
  duration = 1.0,
  delay = 0,
  stagger = 0,
  scale = 1,
  opacity = 0,
  ease = "power3.out",
  start = "top 82%",
  end = "bottom 20%",
  scrub = false,
  className = "",
  once = false,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = elementRef.current;
    if (!el) return;

    // Respect user's motion preferences
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    let x = 0;
    let y = 0;

    if (direction === "up") y = distance;
    else if (direction === "down") y = -distance;
    else if (direction === "left") x = distance;
    else if (direction === "right") x = -distance;

    const ctx = gsap.context(() => {
      // Determine if there are child items for staggering or just the container
      const targets =
        stagger > 0 && el.children.length > 1
          ? Array.from(el.children)
          : el;

      gsap.fromTo(
        targets,
        {
          opacity,
          x,
          y,
          scale: scale !== 1 ? scale : 1,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : undefined,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [
    direction,
    distance,
    duration,
    delay,
    stagger,
    scale,
    opacity,
    ease,
    start,
    end,
    scrub,
    once,
  ]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
