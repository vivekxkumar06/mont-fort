"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "./AnimatedText";

const tradeHubPins = [
  { name: "DENMARK", top: "18%", left: "41%" },
  { name: "SWITZERLAND", top: "31%", left: "32%" },
  { name: "ISTANBUL", top: "41%", left: "42%" },
  { name: "UNITED ARAB EMIRATES", top: "75%", left: "73%" },
  { name: "KARACHI", top: "74%", left: "85%" },
  { name: "MUMBAI", top: "88%", left: "93%" },
];

export default function GlobalNetworkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);
  const pinsContainerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const part1 = part1Ref.current;
    const part2 = part2Ref.current;
    const pinsContainer = pinsContainerRef.current;
    const eye = eyebrowRef.current;
    const desc = descRef.current;

    if (!container || !part1 || !part2) return;

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
              trigger: part1,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Supporting paragraph reveal
      if (desc) {
        gsap.fromTo(
          desc,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: part1,
              start: "top 72%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Trade Hub Pins Reveal & Float
      const pins = gsap.utils.toArray<HTMLElement>(".globe-pin");
      if (pins.length) {
        gsap.fromTo(
          pins,
          { opacity: 0, scale: 0, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: part1,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        if (pinsContainer) {
          gsap.to(pinsContainer, {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: part1,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      }

      // 2. Part 2: Sustainability text transition
      gsap.fromTo(
        ".sustainability-text-block",
        { opacity: 0, y: 35, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: part2,
            start: "top 75%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="globe-zone"
      ref={containerRef}
      className="relative w-full flex flex-col m-0 p-0 text-white select-none"
    >
      {/* ========================================================
          PART 1: MAJOR TRADE HUBS & PINS (WHOLE SCREEN STAGE)
          ======================================================== */}
      <section
        ref={part1Ref}
        className="relative w-full min-h-[130vh] flex items-center justify-start px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 z-20 py-24"
      >
        {/* Coordinate Map Pins over 3D Globe */}
        <div
          ref={pinsContainerRef}
          className="absolute inset-0 pointer-events-none z-10 hidden md:block will-change-transform"
        >
          {tradeHubPins.map((pin) => (
            <div
              key={pin.name}
              className="globe-pin absolute flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto will-change-transform"
              style={{ top: pin.top, left: pin.left }}
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.95)]" />
                <span className="absolute w-5 h-5 rounded-full border border-white/60 animate-ping opacity-60" />
              </div>
              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.24em] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {pin.name}
              </span>
            </div>
          ))}
        </div>

        {/* 
          EDITORIAL HIERARCHY:
          Eyebrow -> Large Cinematic Heading -> Supporting Paragraph
        */}
        <div className="relative z-20 max-w-4xl lg:max-w-5xl text-left flex flex-col items-start">
          <span
            ref={eyebrowRef}
            className="text-[clamp(11px,0.9vw,14px)] tracking-[0.32em] uppercase font-light text-white/80 mb-6 pl-[0.1em] will-change-transform opacity-0"
          >
            GLOBAL PRESENCE
          </span>

          <AnimatedText
            text={"ESTABLISHED IN THE WORLD’S\nMAJOR TRADE HUBS AND FINANCIAL\nMARKETS WITH OVER 15 GLOBAL OFFICES,\nWE CONNECT AND SERVE BOTH EMERGING\nAND MATURE MARKETS WORLDWIDE."}
            as="h2"
            className="font-heading text-[clamp(32px,4.3vw,66px)] font-normal md:font-medium text-white leading-[1.0] sm:leading-[1.03] lg:leading-[1.05] tracking-[-0.015em] drop-shadow-[0_4px_28px_rgba(0,0,0,0.7)] uppercase mb-8"
            start="top 75%"
          />

          <p
            ref={descRef}
            className="text-[clamp(15px,1.2vw,19px)] font-light leading-[1.75] text-white/85 tracking-[0.01em] max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] will-change-transform opacity-0"
          >
            Connecting critical energy flows, physical infrastructure, and market expertise across key global commodity corridors.
          </p>
        </div>
      </section>

      {/* ========================================================
          PART 2: SUSTAINABILITY & DARK PLANET CURVE
          ======================================================== */}
      <section
        ref={part2Ref}
        className="relative w-full min-h-[110vh] flex items-end justify-start px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 pb-32 z-20"
      >
        <div className="sustainability-text-block max-w-2xl text-left flex flex-col items-start will-change-transform">
          <span className="text-[clamp(11px,0.9vw,14px)] tracking-[0.32em] uppercase font-light text-white/75 mb-5 pl-[0.1em]">
            OUR RESPONSIBILITY
          </span>

          <p className="text-[clamp(16px,1.4vw,22px)] font-light leading-[1.7] text-white/95 tracking-[0.01em] drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
            We are committed to integrating our sustainability strategy with our
            pursuit of value — powering lives and respecting nature. We
            recognize the profound and lasting impact our decisions have on
            people, communities, and the environment.
          </p>
        </div>
      </section>
    </div>
  );
}
