"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      const cards = gsap.utils.toArray<HTMLElement>(".metric-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 45, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.16,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[90vh] flex flex-col items-center justify-center px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 z-10 relative py-32 select-none"
    >
      {/* Editorial Section Header */}
      <div
        ref={headerRef}
        className="text-center max-w-3xl mb-16 sm:mb-20 will-change-transform opacity-0"
      >
        <span className="text-[clamp(11px,0.9vw,14px)] tracking-[0.32em] uppercase font-light text-white/75 mb-4 block">
          PERFORMANCE & GOVERNANCE
        </span>
        <h2 className="font-heading text-[clamp(26px,3.2vw,44px)] font-normal md:font-medium tracking-[-0.015em] text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] uppercase">
          GLOBAL REACH & OPERATIONAL DISCIPLINE
        </h2>
      </div>

      {/* 
        3 METRICS COLUMNS
        Numbers (64-92px clamp) -> Labels (12-14px clamp)
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-16 lg:gap-20 max-w-6xl w-full text-center">
        <div className="metric-card flex flex-col gap-3.5 will-change-transform">
          <span className="font-heading text-[clamp(52px,6.2vw,92px)] font-extralight text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)] tracking-tight leading-none">
            30+
          </span>
          <span className="text-[clamp(11px,0.85vw,13px)] uppercase tracking-[0.26em] text-white/85 font-light">
            Global Ports & Locations
          </span>
        </div>

        <div className="metric-card flex flex-col gap-3.5 will-change-transform">
          <span className="font-heading text-[clamp(52px,6.2vw,92px)] font-extralight text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)] tracking-tight leading-none">
            100%
          </span>
          <span className="text-[clamp(11px,0.85vw,13px)] uppercase tracking-[0.26em] text-white/85 font-light">
            Governance & Compliance
          </span>
        </div>

        <div className="metric-card flex flex-col gap-3.5 will-change-transform">
          <span className="font-heading text-[clamp(52px,6.2vw,92px)] font-extralight text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)] tracking-tight leading-none">
            24/7
          </span>
          <span className="text-[clamp(11px,0.85vw,13px)] uppercase tracking-[0.26em] text-white/85 font-light">
            Active Execution Desk
          </span>
        </div>
      </div>
    </section>
  );
}
