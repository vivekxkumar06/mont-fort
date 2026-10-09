"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowUp } from "lucide-react";

export default function MontfortMaritimePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#03111e] text-white selection:bg-[#204a6e] selection:text-white"
    >
      {/* Background Single Video Layer (Only 1 Video) */}
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover filter brightness-90"
          src="/videos/maritime-ocean.mp4"
        />

        {/* Soft Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03111e]/40 via-transparent to-[#03111e]/70" />
      </div>

      {/* Floating Action Controls (Right Bottom) */}
      <div className="fixed bottom-10 right-8 z-40 flex flex-col items-center gap-3">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/20 bg-[#03111e]/60 text-sky-300 backdrop-blur-md transition-all hover:scale-105 hover:border-sky-300 cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/20 bg-[#03111e]/60 text-sky-300 backdrop-blur-md">
          <ChevronDown className="h-4 w-4 animate-pulse" />
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-10">
        {/* Section 1: Hero (Center Aligned Logo & Title) */}
        <ScrollSection className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="flex items-center gap-5 sm:gap-7">
            {/* Montfort Maritime Emblem */}
            <svg
              className="h-10 w-10 sm:h-12 sm:w-12 text-white fill-none stroke-current stroke-[1.4]"
              viewBox="0 0 24 24"
            >
              <path d="M4 6c4 2 12 2 16 0" />
              <path d="M5 10c3.5 2 10.5 2 14 0" />
              <path d="M6 14c3 1.8 9 1.8 12 0" />
              <circle cx="12" cy="19" r="1.5" fill="currentColor" />
            </svg>

            <div className="h-10 sm:h-12 w-[1px] bg-white/40" />

            <h1 className="text-2xl font-light tracking-[0.3em] sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              MONTFORT MARITIME
            </h1>
          </div>

          <div className="absolute bottom-12 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-[10px] sm:text-[11px] font-light uppercase tracking-[0.25em] text-white/80 drop-shadow">
              SCROLL DOWN TO DISCOVER
            </span>
            <div className="h-5 w-[1px] bg-white/50 animate-bounce" />
          </div>
        </ScrollSection>

        {/* Section 2: Powering Progress */}
        <ScrollSection className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="max-w-[1500px] mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase leading-tight mb-24 max-w-2xl text-white drop-shadow">
              POWERING PROGRESS, DELIVERING ENERGY.
            </h2>
            <div className="flex justify-end">
              <p className="max-w-xl text-base md:text-lg font-light leading-relaxed text-white/85 drop-shadow">
                Montfort Maritime, a wholly owned subsidiary of Montfort Group,
                diversifies investments across the maritime sector, from dry to
                wet shipping, benefiting from the Group&apos;s trading
                expertise, to uncover...
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Section 3: Diversified Strategy & Infrastructure Investments */}
        <ScrollSection className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="max-w-[1500px] mx-auto w-full flex flex-col justify-between py-12 gap-20">
            {/* Top Text */}
            <div className="flex justify-start">
              <p className="max-w-xl text-base md:text-lg font-light leading-relaxed text-white/85 drop-shadow">
                Our diversified strategy aims to secure attractive yields
                through advanced instruments and risk management tools, such as
                forward freight agreements (FFAs) and varied contract coverage.
              </p>
            </div>

            {/* Bottom Right Block with Diamond Badge [1] */}
            <div className="flex justify-end">
              <div className="max-w-md">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center border border-sky-400/40 rotate-45 bg-[#03111e]/40 backdrop-blur-sm">
                  <span className="-rotate-45 font-mono text-xs text-sky-300">
                    1
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 drop-shadow">
                  Infrastructure Investments
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-light drop-shadow">
                  Montfort Maritime strategically invests in a diverse range of
                  maritime assets, focusing on operational efficiency, niche
                  market capabilities, and compliance with environmental
                  regulations. Thes...
                </p>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Section 4: Shipping Services & Investment Opportunities */}
        <ScrollSection className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Column 2 with Diamond Badge [2] */}
            <div className="flex flex-col justify-center">
              <div className="max-w-md">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center border border-sky-400/40 rotate-45 bg-[#03111e]/40 backdrop-blur-sm">
                  <span className="-rotate-45 font-mono text-xs text-sky-300">
                    2
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 drop-shadow">
                  Shipping Services
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-light drop-shadow">
                  Offering third-parties the ability to tap into the Montfort
                  commodity and freight trading business, our commercial
                  management arm - Montfort Maritime Services (MMS) - manages
                  vessels of...
                </p>
              </div>
            </div>

            {/* Column 3 with Diamond Badge [3] */}
            <div className="flex flex-col justify-center md:items-end">
              <div className="max-w-md">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center border border-sky-400/40 rotate-45 bg-[#03111e]/40 backdrop-blur-sm">
                  <span className="-rotate-45 font-mono text-xs text-sky-300">
                    3
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 drop-shadow">
                  Investment Opportunities
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-light drop-shadow">
                  We offer our investors the opportunity to gain managed
                  exposure to the global freight markets by participating in our
                  time charter freight trading portfolios, with the flexibility
                  to tailor bespoke...
                </p>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Section 5: Sustainability Statement */}
        <ScrollSection className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto w-full">
            <span className="text-xs uppercase tracking-[0.25em] text-sky-300 mb-6 block font-medium">
              SUSTAINABILITY IN MONTFORT MARITIME
            </span>
            <div className="h-[1px] w-28 bg-sky-400/40 mb-10" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide uppercase leading-tight text-white max-w-5xl drop-shadow">
              SHIPPING ACCOUNTS FOR THREE PERCENT OF GLOBAL CARBON EMISSIONS AND
              INDUSTRY PLAYERS MUST REFINE THEIR EXISTING TECHNOLOGIES WHILE
              PIONEERING NEW INNOVATIONS TO ENHANCE EFFICIENCY AND PROMOTE MORE
              SUSTAINABLE FUTURES.
            </h2>
          </div>
        </ScrollSection>

        {/* Section 6: ESG & Decarbonization */}
        <ScrollSection className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto w-full flex justify-end">
            <p className="max-w-2xl text-base md:text-lg font-light leading-relaxed text-white/85 drop-shadow">
              Operating at the heart of global trade, Montfort Maritime is
              guided by a strategic approach that integrates environmental,
              social, and governance initiatives to aid clients in their pursuit
              of supply chain decarbonization. In addition, Montfort
              Maritime&apos;s commitment to transition to a more sustainable
              future is in its ongoing monitoring of CO2 emissions and adoption
              of greener vessels.
            </p>
          </div>
        </ScrollSection>

        {/* Section 7: HSSE – Vetting Procedure & Policies */}
        <ScrollSection className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-light text-white leading-snug drop-shadow">
                HSSE – Vetting Procedure &amp; Policies
              </h2>
            </div>
            <div>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-light drop-shadow">
                Montfort prioritizes safety, particularly maritime safety, and
                consistently liaises with its technical management partners to
                ensure the highest standards are upheld.
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-light drop-shadow">
                Vessels are screened via partners RIGHTSHIP, making sure that we
                are up to date on vessel performance and condition before
                engaging in trade with Montfort.
              </p>
            </div>
          </div>
        </ScrollSection>
      </div>
    </div>
  );
}

// Scroll Reveal Animation Component
function ScrollSection({
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

  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.8], [50, 0]);

  return (
    <section ref={ref} className={className}>
      <motion.div style={{ opacity, y }} className="w-full">
        {children}
      </motion.div>
    </section>
  );
}
