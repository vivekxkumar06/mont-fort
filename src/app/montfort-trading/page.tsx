"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowUp } from "lucide-react";

// Screenshot ke exact texts aur alignment
const sections = [
  {
    id: "hero",
    type: "hero",
    title: "MONTFORT TRADING",
    subtitle: "SCROLL DOWN TO DISCOVER",
    video: "/videos/trading-mountain.mp4", // Mountain / Hero Video
  },
  {
    id: "intro",
    type: "dual-intro",
    headline: "OPERATING EFFICIENTLY,\nLEADING WITH INNOVATION.",
    body: "Montfort Trading manages a diverse portfolio of products and services, safely and responsibly, all over the world. With extensive expertise and knowledge in various fields, we ensure top-quality service and delivery in every market we serve. Our responsive decision-making approach,...",
    video: "/videos/trading-grid.mp4", // Digital Wireframe/Grid Video
  },
  {
    id: "oil-primary",
    type: "two-column",
    tag: "Explore Our Products:",
    mainHeading: "OIL",
    colRight: {
      title: "Crude oil",
      desc: "Montfort is committed to ensuring the seamless and efficient movement of crude oil from producing countries to various...",
    },
    colBottomLeft: {
      title: "Marine Fuels",
      desc: "Montfort's bunkering operations are designed...",
    },
    video: "/videos/trading-barrels.mp4", // 3D Barrels Wireframe Video
  },
  {
    id: "oil-secondary",
    type: "two-column",
    colRight: {
      title: "Gasoline",
      desc: "Montfort trades a comprehensive range of gasoline and associated components, supported by our substantial storage faciliti...",
    },
    colBottomLeft: {
      title: "LPG (Liquefied Petroleum Gas)",
      desc: "We play a key role in global LPG trade, transporting large volumes via Very Large Gas Carriers (VLGCs) from the US and...",
    },
    video: "/videos/trading-barrels.mp4",
  },
  {
    id: "oil-tertiary",
    type: "two-column",
    colRight: {
      title: "Gas & Power",
      desc: "We maintain power and gas trading licenses in Turkey, enabling us to actively participate in the country's dynamic energy markets....",
    },
    colBottomLeft: {
      title: "Fuel oil",
      desc: "We specialize in blending fuel oil to cater to a wide range of market requirements. Our sophisticated blending operations provide...",
    },
    video: "/videos/trading-barrels.mp4",
  },
  {
    id: "metals-intro",
    type: "single-block",
    topText:
      "Our metals, minerals, and dry bulk division operates on a global scale, managing the transportation, storage, and supply of a broad portfolio of products from source to end consumers. With extensive industry experience, we handle a wide array of non-ferrous metals, including aluminum, copper, lead, nickel, tin, and zinc, alongside key dry bulk raw materials such as bauxite and pet coke.",
    bottomBlock: {
      title: "Ferro Alloys",
      desc: "Ferroalloys are vital in steelmaking, enhancing properties like strength and corrosion resistance. At Montfort, we trade ...",
    },
    video: "/videos/trading-beams.mp4", // 3D Metal Beams/Structure Video
  },
  {
    id: "metals-details",
    type: "two-column-alt",
    colLeft: {
      title: "Dry bulk",
      desc: "Dry bulk commodities, including materials such as pet coke and bauxite, form the backbone of global trade and industrial...",
    },
    colRight: {
      title: "Base metals",
      desc: "Base metals, such as copper, aluminum, zinc, and nickel, are essential for a wide range of industries, from construction and...",
    },
    video: "/videos/trading-beams.mp4",
  },
];

export default function MontfortTradingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#030712] text-white selection:bg-[#2f5f8a] selection:text-white"
    >
      {/* Background Sticky Video Container */}
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60 filter brightness-90"
          src="/videos/trading-mountain.mp4"
        />
        {/* Subtle radial dark overlay to match the high-end aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-transparent to-[#030712]/80" />
      </div>

      {/* Floating Controls (Bottom-Right Floating Buttons from screenshots) */}
      <div className="fixed bottom-10 right-8 z-40 flex flex-col items-center gap-3">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/20 bg-black/40 text-cyan-400 backdrop-blur-md transition-all hover:scale-105 hover:border-cyan-400"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/20 bg-black/40 text-cyan-400 backdrop-blur-md">
          <ChevronDown className="h-4 w-4 animate-pulse" />
        </div>
      </div>

      {/* Scroll Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <ScrollItem
          key={sections[0].id}
          className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
          <div className="flex items-center gap-6">
            <svg
              className="h-10 w-10 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="7" cy="8" r="1.5" />
              <circle cx="17" cy="8" r="1.5" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="7" cy="16" r="1.5" />
              <circle cx="17" cy="16" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
            <div className="h-8 w-[1px] bg-white/40" />
            <h1 className="text-3xl font-light tracking-[0.28em] sm:text-5xl md:text-6xl text-white">
              MONTFORT TRADING
            </h1>
          </div>
          <div className="absolute bottom-12 flex flex-col items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/60">
              SCROLL DOWN TO DISCOVER
            </span>
            <div className="h-4 w-[1px] bg-white/40 animate-bounce" />
          </div>
        </ScrollItem>

        {/* Section 2: Operating Efficiently */}
        <ScrollItem
          key={sections[1].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="max-w-[1500px] mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase leading-tight mb-28 text-white max-w-3xl whitespace-pre-line">
              {sections[1].headline}
            </h2>
            <div className="flex justify-end">
              <p className="max-w-xl text-base md:text-lg font-light leading-relaxed text-white/80">
                {sections[1].body}
              </p>
            </div>
          </div>
        </ScrollItem>

        {/* Section 3: OIL (Primary) */}
        <ScrollItem
          key={sections[2].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 relative">
            <div>
              <p className="text-sm md:text-base font-light tracking-wider text-white/70 mb-2">
                {sections[2].tag}
              </p>
              <h2 className="text-5xl md:text-7xl font-extralight tracking-wider text-white mb-24">
                {sections[2].mainHeading}
              </h2>
              {/* Marine Fuels */}
              <div className="max-w-md pt-8">
                <h3 className="text-2xl font-light text-white mb-3">
                  {sections[2].colBottomLeft?.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                  {sections[2].colBottomLeft?.desc}
                </p>
              </div>
            </div>

            {/* Crude Oil */}
            <div className="flex flex-col justify-center md:items-end">
              <div className="max-w-md">
                <h3 className="text-2xl font-light text-white mb-3">
                  {sections[2].colRight?.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                  {sections[2].colRight?.desc}
                </p>
              </div>
            </div>
          </div>
        </ScrollItem>

        {/* Section 4: Gasoline & LPG */}
        <ScrollItem
          key={sections[3].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="flex flex-col justify-end">
              <div className="max-w-md">
                <h3 className="text-2xl font-light text-white mb-3">
                  {sections[3].colBottomLeft?.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                  {sections[3].colBottomLeft?.desc}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start md:items-end">
              <div className="max-w-md">
                <h3 className="text-2xl font-light text-white mb-3">
                  {sections[3].colRight?.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                  {sections[3].colRight?.desc}
                </p>
              </div>
            </div>
          </div>
        </ScrollItem>

        {/* Section 5: Gas & Power, Fuel Oil */}
        <ScrollItem
          key={sections[4].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="flex flex-col justify-end">
              <div className="max-w-md">
                <h3 className="text-2xl font-light text-white mb-3">
                  {sections[4].colBottomLeft?.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                  {sections[4].colBottomLeft?.desc}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start md:items-end">
              <div className="max-w-md">
                <h3 className="text-2xl font-light text-white mb-3">
                  {sections[4].colRight?.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                  {sections[4].colRight?.desc}
                </p>
              </div>
            </div>
          </div>
        </ScrollItem>

        {/* Section 6: Metals Division Intro & Ferro Alloys */}
        <ScrollItem
          key={sections[5].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="max-w-[1500px] mx-auto w-full flex flex-col justify-between py-12 gap-20">
            <div className="flex justify-end">
              <p className="max-w-3xl text-base md:text-lg text-white/80 leading-relaxed font-light">
                {sections[5].topText}
              </p>
            </div>
            <div className="flex justify-center md:justify-end md:pr-48">
              <div className="max-w-md">
                <h3 className="text-2xl font-light text-white mb-3">
                  {sections[5].bottomBlock?.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                  {sections[5].bottomBlock?.desc}
                </p>
              </div>
            </div>
          </div>
        </ScrollItem>

        {/* Section 7: Dry Bulk & Base Metals */}
        <ScrollItem
          key={sections[6].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <div className="max-w-md">
                <h3 className="text-2xl font-light text-white mb-3">
                  {sections[6].colLeft?.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                  {sections[6].colLeft?.desc}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-end md:items-end">
              <div className="max-w-md">
                <h3 className="text-2xl font-light text-white mb-3">
                  {sections[6].colRight?.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                  {sections[6].colRight?.desc}
                </p>
              </div>
            </div>
          </div>
        </ScrollItem>
      </div>
    </div>
  );
}

// Scroll Reveal Wrapper Component
function ScrollItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Smooth cinematic fade-in aur subtle slide-up
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.8], [60, 0]);

  return (
    <section ref={ref} className={className}>
      <motion.div style={{ opacity, y }} className="w-full">
        {children}
      </motion.div>
    </section>
  );
}
