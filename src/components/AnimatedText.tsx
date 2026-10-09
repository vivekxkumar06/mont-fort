"use client";

import { useEffect, useRef, ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  type?: "words" | "lines";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

export default function AnimatedText({
  text,
  as: Component = "h2",
  type,
  className = "",
  delay = 0,
  duration = 1.2,
  stagger,
  start = "top 82%",
  once = false,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isLines = type === "lines" || (type !== "words" && text.includes("\n"));
  const computedStagger = stagger ?? (isLines ? 0.08 : 0.035);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".animated-text-item");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          y: "105%",
          opacity: 0,
          scale: 0.985,
        },
        {
          y: "0%",
          opacity: 1,
          scale: 1,
          duration,
          delay,
          stagger: computedStagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, isLines, delay, duration, computedStagger, start, once]);

  if (isLines) {
    const lines = text.split("\n");
    return (
      <Component ref={containerRef} className={`${className} block`}>
        {lines.map((line, idx) => (
          <span key={idx} className="block overflow-hidden py-[0.05em]">
            <span className="animated-text-item block will-change-transform">
              {line}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  // Word-by-word reveal
  const words = text.split(" ");

  return (
    <Component ref={containerRef} className={`${className} block`}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden align-top mr-[0.24em] pb-[0.06em]"
        >
          <span className="animated-text-item inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
