"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "./AnimatedText";

interface StatementSectionProps {
  eyebrow?: string;
  heading: string;
  subtext: string;
  alignment?: "left" | "center" | "right";
}

export default function StatementSection({
  eyebrow,
  heading,
  subtext,
  alignment = "left",
}: StatementSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const content = contentRef.current;
    const eye = eyebrowRef.current;
    const sub = subtextRef.current;
    if (!container || !content) return;

    const ctx = gsap.context(() => {
      // 1. Eyebrow reveal
      if (eye) {
        gsap.fromTo(
          eye,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 2. Parallax drift across the visual scene
      gsap.to(content, {
        y: -45,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 3. Supporting paragraph gentle fade & upward glide
      if (sub) {
        gsap.fromTo(
          sub,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 72%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Consistent left alignment with controlled max width
  const alignClass =
    alignment === "center"
      ? "mx-auto text-left items-start"
      : alignment === "right"
      ? "ml-auto text-left items-start"
      : "mr-auto text-left items-start";

  return (
    <section
      ref={containerRef}
      className="min-h-[110vh] flex items-center px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 z-10 relative select-none"
    >
      {/* 
        NO CONTAINER / NO CARD / NO GLASSMORPHISM
        Clear Editorial Hierarchy:
        Small Eyebrow Label -> Large Cinematic Heading -> Supporting Paragraph
      */}
      <div
        ref={contentRef}
        className={`max-w-4xl lg:max-w-5xl flex flex-col will-change-transform ${alignClass}`}
      >
        {/* Eyebrow Label */}
        {eyebrow && (
          <span
            ref={eyebrowRef}
            className="text-[clamp(11px,0.9vw,14px)] tracking-[0.32em] uppercase font-light text-[#2d6187]/90 mb-5 md:mb-6 pl-[0.1em] will-change-transform opacity-0"
          >
            {eyebrow}
          </span>
        )}

        {/* Cinematic Heading (48-72px clamp) */}
        <AnimatedText
          text={heading}
          as="h2"
          className="font-heading text-[clamp(34px,4.5vw,70px)] font-normal md:font-medium leading-[1.0] sm:leading-[1.03] lg:leading-[1.05] tracking-[-0.015em] text-[#0f2e4a] drop-shadow-[0_2px_16px_rgba(255,255,255,0.8)] uppercase"
          start="top 78%"
        />

        {/* Supporting Paragraph (16-20px clamp) */}
        <p
          ref={subtextRef}
          className="text-[clamp(15px,1.2vw,19px)] font-light leading-[1.75] text-[#244969] tracking-[0.01em] max-w-2xl mt-8 sm:mt-10 md:mt-12 drop-shadow-[0_1px_10px_rgba(255,255,255,0.85)] will-change-transform"
        >
          {subtext}
        </p>
      </div>
    </section>
  );
}
