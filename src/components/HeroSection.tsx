"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { MontfortLogoMark } from "./MontfortLogo";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const brandLockupRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!heroRef.current || !brandLockupRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Cinematic entrance reveal timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        iconRef.current,
        { opacity: 0, scale: 0.94, x: -16 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, delay: 0.15 }
      )
        .fromTo(
          separatorRef.current,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.9, transformOrigin: "center" },
          "-=0.85"
        )
        .fromTo(
          wordmarkRef.current,
          { opacity: 0, x: -20, filter: "blur(6px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.3 },
          "-=0.8"
        );

      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.6"
        );
      }

      // 2. Smooth bidirectional scroll fade-out & mist lift
      gsap.to(brandLockupRef.current, {
        opacity: 0,
        y: -70,
        filter: "blur(10px)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "55% top",
          scrub: true,
        },
      });

      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: -25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "25% top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 z-10 select-none"
    >
      {/* 
        HERO BRAND LOCKUP ON THE LEFT:
        [ICON] | M O N T F O R T
        Clean, minimalist, vertically aligned, no card/box/border, mountain video visible behind.
      */}
      <div
        ref={brandLockupRef}
        className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 will-change-transform"
      >
        {/* Exact Montfort dot-matrix crest icon */}
        <div
          ref={iconRef}
          className="shrink-0 flex items-center justify-center will-change-transform"
        >
          <MontfortLogoMark
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[86px] lg:h-[86px]"
            fill="#1b4965"
          />
        </div>

        {/* Thin vertical blue separator */}
        <div
          ref={separatorRef}
          aria-hidden="true"
          className="w-[1px] md:w-[1.5px] h-11 sm:h-16 md:h-20 lg:h-24 bg-[#1b4965]/40 shrink-0 will-change-transform"
        />

        {/* Elegant uppercase wordmark with generous tracking */}
        <h1
          ref={wordmarkRef}
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-extralight tracking-[0.24em] sm:tracking-[0.28em] md:tracking-[0.32em] text-[#1b4965] uppercase leading-none pl-[0.06em] will-change-transform"
        >
          MONTFORT
        </h1>
      </div>

      {/* Subtle left-aligned scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-8 sm:left-14 md:left-20 lg:left-28 xl:left-36 flex items-center gap-3 select-none pointer-events-none"
      >
        <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-[#1b4965]/70 font-light">
          Scroll Down to Discover
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-[#1b4965]/70 animate-bounce" />
      </div>
    </section>
  );
}
