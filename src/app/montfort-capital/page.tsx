"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowUp } from "lucide-react";
import SmoothScrollProvider, { useLenis } from "../../components/SmoothScrollProvider";
import SingleScrubVideo from "../../components/SingleScrubVideo";

export default function MontfortCapitalPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SmoothScrollProvider>
      <MontfortCapitalContent containerRef={containerRef} />
    </SmoothScrollProvider>
  );
}

function MontfortCapitalContent({
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
        const title = sec.querySelector("h1, h2, h3");
        const paragraphs = sec.querySelectorAll("p");
        const elements = sec.querySelectorAll(".cinematic-reveal");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top 78%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        });

        if (title) {
          tl.fromTo(
            title,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 1.05, ease: "power3.out" }
          );
        }

        if (paragraphs.length > 0) {
          tl.fromTo(
            paragraphs,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power2.out" },
            "-=0.7"
          );
        }

        if (elements.length > 0) {
          tl.fromTo(
            elements,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
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
      className="relative w-full bg-[#0a150c] text-white selection:bg-[#4a7c59] selection:text-white"
    >
      {/* Bidirectional Frame-Accurate Scrubbing Video */}
      <SingleScrubVideo
        videoSrc="/videos/capital-grass.mp4"
        containerRef={containerRef}
        fallbackDuration={14}
        brightness={0.92}
        contrast={1.06}
        saturate={0.92}
        overlayGradient="from-black/35 via-transparent to-black/60"
      />

      {/* Floating Action Buttons (Right Bottom) */}
      <div className="fixed bottom-10 right-8 z-40 flex flex-col items-center gap-3">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md transition-all hover:scale-105 hover:border-white/50 cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md">
          <ChevronDown className="h-4 w-4 animate-pulse" />
        </div>
      </div>

      {/* Scroll Sections Container */}
      <div className="relative z-10">
        {/* Section 1: Hero (Perfect Center Layout) */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="cinematic-reveal flex flex-col items-center">
            {/* Logo, Line, and Title Centered */}
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
              {/* Shield Icon */}
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                <svg
                  className="h-7 w-7 text-white stroke-[1.2] drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="11" r="1.5" fill="currentColor" />
                </svg>
              </div>

              {/* Vertical Divider Line */}
              <div className="h-10 sm:h-12 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent" />

              {/* Main Heading */}
              <h1 className="text-2xl font-extralight tracking-[0.32em] sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                MONTFORT CAPITAL
              </h1>
            </div>

            {/* Subline */}
            <p className="mt-5 text-[11px] sm:text-xs font-light uppercase tracking-[0.45em] text-white/75 drop-shadow">
              Asset &bull; Wealth &bull; Investment
            </p>
          </div>

          {/* Bottom Discover Prompt */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2.5 pointer-events-none">
            <span className="text-[10px] sm:text-[11px] font-light uppercase tracking-[0.3em] text-white/80 drop-shadow">
              SCROLL DOWN TO DISCOVER
            </span>
            <div className="h-6 w-[1px] bg-gradient-to-b from-white/70 to-transparent animate-pulse" />
          </div>
        </section>

        {/* Section 2: Big Headline (Fund Management Company) */}
        <section className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="cinematic-reveal max-w-[1400px] mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase leading-snug text-white max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              MONTFORT CAPITAL IS A NEWLY FOUNDED FUND MANAGEMENT COMPANY, BUILT
              ON THE EXPERTISE OF A GLOBAL LEADER IN COMMODITY TRADING.
            </h2>
          </div>
        </section>

        {/* Section 3: Right Aligned Trader's Perspective */}
        <section className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="cinematic-reveal max-w-[1400px] mx-auto w-full flex justify-end">
            <p className="max-w-xl text-lg md:text-xl font-light leading-relaxed text-white/90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              With strong foundations in the trading world, we offer a distinct
              approach to investments in the energy and shipping sectors,
              applying a trader&apos;s perspective to identify and seize
              opportunities that maximize value for our investors.
            </p>
          </div>
        </section>

        {/* Section 4: Dual Columns (Sharp Insights & Advantage) */}
        <section className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="cinematic-reveal max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-28">
            {/* Left Block */}
            <div className="flex flex-col justify-center">
              <p className="max-w-md text-base md:text-lg font-light leading-relaxed text-white/90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                We combine the sharp insights of seasoned traders with
                disciplined investment strategies. Our approach leverages
                real-time market insights and trading expertise to identify and
                seize high-potential investments. We adapt dynamically to market
                changes, ensuring our strategies are always in tune with current
                trends and opportunities. Focusing on the energy and shipping
                industries, we utilize...
              </p>
            </div>

            {/* Right Block */}
            <div className="flex flex-col justify-center">
              <p className="max-w-md text-base md:text-lg font-light leading-relaxed text-white/90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                Choosing Montfort Capital offers investors a unique advantage.
                Our trading background gives us a distinct edge in identifying
                opportunities and managing risks in volatile markets. We blend
                the agility of a trading firm with the strategic focus of a fund
                management company, keeping us ahead of the curve. Committed to
                responsible investing, we...
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
