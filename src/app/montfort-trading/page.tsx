"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowUp } from "lucide-react";
import SmoothScrollProvider, { useLenis } from "../../components/SmoothScrollProvider";
import SingleScrubVideo from "../../components/SingleScrubVideo";

// Screenshot ke exact texts aur alignment
const sections = [
  {
    id: "hero",
    type: "hero",
    title: "MONTFORT TRADING",
    subtitle: "SCROLL DOWN TO DISCOVER",
    video: "/videos/trading-mountain.mp4",
  },
  {
    id: "intro",
    type: "dual-intro",
    headline: "OPERATING EFFICIENTLY,\nLEADING WITH INNOVATION.",
    body: "Montfort Trading manages a diverse portfolio of products and services, safely and responsibly, all over the world. With extensive expertise and knowledge in various fields, we ensure top-quality service and delivery in every market we serve. Our responsive decision-making approach,...",
    video: "/videos/trading-mountain.mp4",
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
    video: "/videos/trading-mountain.mp4",
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
    video: "/videos/trading-mountain.mp4",
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
    video: "/videos/trading-mountain.mp4",
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
    video: "/videos/trading-mountain.mp4",
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
    video: "/videos/trading-mountain.mp4",
  },
];

export default function MontfortTradingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SmoothScrollProvider>
      <MontfortTradingContent containerRef={containerRef} />
    </SmoothScrollProvider>
  );
}

function MontfortTradingContent({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollTo } = useLenis();

  const scrollToTop = () => {
    if (scrollTo) {
      scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const sections = container.querySelectorAll("section");
      sections.forEach((sec) => {
        const title = sec.querySelector("h1, h2");
        const subHeadings = sec.querySelectorAll("h3");
        const paragraphs = sec.querySelectorAll("p");
        const tag = sec.querySelector("p.text-sm, span.text-sm");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top 76%",
            end: "bottom 24%",
            toggleActions: "play reverse play reverse",
          },
        });

        if (tag) {
          tl.fromTo(
            tag,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );
        }

        if (title) {
          tl.fromTo(
            title,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 1.05, ease: "power3.out" },
            tag ? "-=0.5" : 0
          );
        }

        if (subHeadings.length > 0) {
          tl.fromTo(
            subHeadings,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power2.out" },
            "-=0.6"
          );
        }

        if (paragraphs.length > 0) {
          tl.fromTo(
            paragraphs,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power2.out" },
            "-=0.6"
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#030712] text-white selection:bg-[#2f5f8a] selection:text-white"
    >
      {/* Bidirectional Frame-Accurate Scrubbing Video */}
      <SingleScrubVideo
        videoSrc="/videos/trading-mountain.mp4"
        containerRef={containerRef}
        fallbackDuration={14}
        brightness={0.88}
        contrast={1.12}
        saturate={0.92}
        overlayGradient="from-[#030712]/45 via-transparent to-[#030712]/80"
      />

      {/* Floating Controls (Bottom-Right Floating Buttons) */}
      <div className="fixed bottom-10 right-8 z-40 flex flex-col items-center gap-3">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/20 bg-black/40 text-cyan-400 backdrop-blur-md transition-all hover:scale-105 hover:border-cyan-400 cursor-pointer"
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
        <section
          key={sections[0].id}
          className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
          <div className="cinematic-reveal flex items-center gap-6">
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
        </section>

        {/* Section 2: Operating Efficiently */}
        <section
          key={sections[1].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="cinematic-reveal max-w-[1500px] mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase leading-tight mb-28 text-white max-w-3xl whitespace-pre-line">
              {sections[1].headline}
            </h2>
            <div className="flex justify-end">
              <p className="max-w-xl text-base md:text-lg font-light leading-relaxed text-white/80">
                {sections[1].body}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: OIL (Primary) */}
        <section
          key={sections[2].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="cinematic-reveal max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 relative">
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
        </section>

        {/* Section 4: Gasoline & LPG */}
        <section
          key={sections[3].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="cinematic-reveal max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
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
        </section>

        {/* Section 5: Gas & Power, Fuel Oil */}
        <section
          key={sections[4].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="cinematic-reveal max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
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
        </section>

        {/* Section 6: Metals Division Intro & Ferro Alloys */}
        <section
          key={sections[5].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="cinematic-reveal max-w-[1500px] mx-auto w-full flex flex-col justify-between py-12 gap-20">
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
        </section>

        {/* Section 7: Dry Bulk & Base Metals */}
        <section
          key={sections[6].id}
          className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center"
        >
          <div className="cinematic-reveal max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
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
        </section>
      </div>
    </div>
  );
}
