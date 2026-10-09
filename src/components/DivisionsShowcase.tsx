"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

interface DivisionCardData {
  step: string;
  category: string;
  title: string;
  description: string;
  actionText: string;
  href: string;
}

const divisionCards: DivisionCardData[] = [
  {
    step: "01",
    category: "Montfort Trading",
    title: "OPERATING EFFICIENTLY\nBY LEADING WITH\nINNOVATION.",
    description:
      "We trade crude oil, refined petroleum products, and dry bulk commodities with disciplined capital, robust risk management, and physical logistics agility.",
    actionText: "MONTFORT TRADING",
    href: "#trading",
  },
  {
    step: "02",
    category: "Montfort Capital",
    title: "IDENTIFY AND SEIZE\nOPPORTUNITIES THAT\nMAXIMISE VALUE.",
    description:
      "We deploy strategic capital into high-conviction energy infrastructure, physical storage assets, and supply-chain investment opportunities globally.",
    actionText: "MONTFORT CAPITAL",
    href: "#capital",
  },
  {
    step: "03",
    category: "Montfort Maritime",
    title: "POWERING PROGRESS,\nDELIVERING ENERGY.",
    description:
      "We operate and charter an agile physical fleet, securing global maritime transit, bunkering reliability, and uncompromising safety standards.",
    actionText: "MONTFORT MARITIME",
    href: "#maritime",
  },
  {
    step: "04",
    category: "Fort Energy",
    title: "ADVANCING INNOVATION\nIN ENERGY INVESTMENTS.",
    description:
      "We pioneer forward-looking energy investments, lower-carbon technologies, and transitional power initiatives to generate resilient value.",
    actionText: "FORT ENERGY",
    href: "#energy",
  },
];

export default function DivisionsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const badge = card.querySelector(".step-indicator");
        const title = card.querySelector(".card-title");
        const desc = card.querySelector(".card-desc");
        const btn = card.querySelector(".card-btn");
        const contentBox = card.querySelector(".card-content-box");

        // Staggered luxury reveal on enter
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 72%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
        });

        tl.fromTo(
          badge,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        )
          .fromTo(
            title,
            { opacity: 0, y: 36, scale: 0.985 },
            { opacity: 1, y: 0, scale: 1, duration: 1.05, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            desc,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(
            btn,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.4"
          );

        // Subtle parallax movement during scroll
        if (contentBox) {
          gsap.to(contentBox, {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="divisions-zone"
      ref={containerRef}
      className="relative w-full flex flex-col m-0 p-0 select-none"
    >
      {divisionCards.map((item, index) => (
        <section
          key={item.step}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="relative w-full min-h-screen flex items-center justify-start px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 z-20 m-0 py-24"
        >
          {/* 
            EXACT REQUESTED EDITORIAL HIERARCHY:
            Small Eyebrow Label -> Large Cinematic Heading -> Supporting Paragraph -> CTA Link
          */}
          <div className="card-content-box max-w-4xl lg:max-w-5xl flex flex-col items-start will-change-transform">
            {/* 1. Small Eyebrow Label (12-15px clamp) */}
            <div className="step-indicator flex items-center gap-4 mb-5 will-change-transform opacity-0">
              <span className="text-[clamp(11px,0.9vw,14px)] font-mono tracking-[0.25em] text-white/70">
                {item.step}
              </span>
              <span className="w-8 h-[1px] bg-white/40" />
              <span className="text-[clamp(11px,0.9vw,14px)] font-light tracking-[0.28em] text-white/85 uppercase">
                {item.category}
              </span>
            </div>

            {/* 2. Large Cinematic Heading (48-72px clamp) */}
            <h2 className="font-heading card-title text-[clamp(34px,4.5vw,70px)] font-normal md:font-medium text-white leading-[1.0] sm:leading-[1.03] lg:leading-[1.05] tracking-[-0.015em] max-w-4xl drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)] mb-8 will-change-transform uppercase whitespace-pre-line opacity-0">
              {item.title}
            </h2>

            {/* 3. Supporting Paragraph (16-20px clamp) */}
            <p className="card-desc text-[clamp(15px,1.2vw,19px)] font-light leading-[1.75] text-white/85 tracking-[0.01em] max-w-2xl mb-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] will-change-transform opacity-0">
              {item.description}
            </p>

            {/* 4. Editorial Action Link */}
            <a
              href={item.href}
              className="card-btn group inline-flex flex-col gap-3 cursor-pointer will-change-transform opacity-0"
            >
              <div className="flex items-center gap-5">
                <span className="text-[clamp(11px,0.85vw,13px)] uppercase tracking-[0.28em] text-white font-medium group-hover:text-white/80 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {item.actionText}
                </span>
                <span className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white group-hover:border-white group-hover:translate-x-2 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 stroke-[1.8]" />
                </span>
              </div>
              <div className="w-full h-[1px] bg-white/35 group-hover:bg-white transition-colors" />
            </a>
          </div>
        </section>
      ))}
    </div>
  );
}
