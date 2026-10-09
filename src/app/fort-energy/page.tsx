"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FortEnergyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#020912] text-white selection:bg-[#0072b2] selection:text-white"
    >
      {/* Background Single Video Layer (Fixed) */}
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover filter brightness-90"
          src="/videos/fort-energy.mp4"
        />

        {/* Deep Cyber Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020912]/50 via-transparent to-[#020912]/80" />
      </div>

      {/* Floating Action Controls (Right Bottom) */}
      <div className="fixed bottom-10 right-8 z-40 flex flex-col items-center gap-3">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/25 bg-[#020912]/70 text-sky-400 backdrop-blur-md transition-all hover:scale-105 hover:border-sky-300 cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/25 bg-[#020912]/70 text-sky-400 backdrop-blur-md">
          <ChevronDown className="h-4 w-4 animate-pulse" />
        </div>
      </div>

      {/* Scroll Sections Container */}
      <div className="relative z-10">
        {/* Section 1: Hero (Fort Energy Center Layout) */}
        <ScrollSection className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="flex flex-col items-center">
            {/* Logo, Divider Line & Title */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {/* Fort Energy Dot-Shield Logo */}
              <div className="flex h-14 w-14 items-center justify-center">
                <svg
                  className="h-12 w-12 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="5" cy="8" r="1.2" />
                  <circle cx="8" cy="8" r="1.2" />
                  <circle cx="11" cy="8" r="1.2" />
                  <circle cx="14" cy="8" r="1.2" />
                  <circle cx="17" cy="8" r="1.2" />
                  <circle cx="19" cy="8" r="1.2" />
                  <circle cx="6" cy="12" r="1.2" />
                  <circle cx="18" cy="12" r="1.2" />
                  <circle cx="8" cy="16" r="1.2" />
                  <circle cx="16" cy="16" r="1.2" />
                  <circle cx="12" cy="19" r="1.4" />
                </svg>
              </div>

              {/* Elegant Vertical Divider */}
              <div className="h-10 sm:h-12 w-[1px] bg-white/40" />

              {/* Title */}
              <h1 className="text-3xl font-extralight tracking-[0.32em] sm:text-5xl md:text-6xl text-white drop-shadow-[0_4px_24px_rgba(0,180,255,0.4)]">
                FORT ENERGY
              </h1>
            </div>
          </div>

          {/* Bottom Discover Prompt */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-[10px] sm:text-[11px] font-light uppercase tracking-[0.25em] text-white/80 drop-shadow">
              SCROLL DOWN TO DISCOVER
            </span>
            <div className="h-5 w-[1px] bg-sky-400/60 animate-bounce" />
          </div>
        </ScrollSection>

        {/* Section 2: Advancing Innovation In Energy Investments */}
        <ScrollSection className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="max-w-[1500px] mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase leading-tight mb-28 max-w-3xl text-white drop-shadow">
              ADVANCING INNOVATION IN ENERGY INVESTMENTS
            </h2>
            <div className="flex justify-end">
              <p className="max-w-xl text-base md:text-lg font-light leading-relaxed text-white/85 drop-shadow">
                As the dedicated investment division of the Montfort Group, Fort
                Energy supports Montfort&apos;s oil trading success through
                strategic expansions in the midstream and downstream sectors.
                Functioning as both an investor and an operator, Fort Energy...
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Section 3: The Fort Energy Advantage & Refinery Industrial Units */}
        <ScrollSection className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-14 items-start relative">
            {/* Left Block */}
            <div className="flex flex-col">
              <div className="mb-6 inline-flex h-10 w-10 items-center justify-center border border-sky-400/40 rotate-45 bg-[#020912]/50 backdrop-blur-sm">
                <span className="-rotate-45 text-[11px] font-mono text-sky-300">
                  ◇
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-white mb-6 leading-tight drop-shadow">
                The Fort Energy Advantage
              </h2>
              <p className="text-sm md:text-base text-white/75 leading-relaxed font-light drop-shadow">
                The company&apos;s portfolio consists of six companies in the
                refining, storage, and distribution sectors.
              </p>
            </div>

            {/* Middle Block */}
            <div className="flex flex-col pt-12 md:pt-24">
              <h3 className="text-xl sm:text-2xl font-light text-white mb-4 drop-shadow">
                Leadership driving growth and innovation
              </h3>
              <p className="text-sm md:text-base text-white/75 leading-relaxed font-light drop-shadow">
                Fort Energy&apos;s greatest strength lies in the synergy between
                its talented team and robust operating platform. The
                leadership...
              </p>
            </div>

            {/* Right Block */}
            <div className="flex flex-col pt-12 md:pt-24">
              <h3 className="text-xl sm:text-2xl font-light text-white mb-4 drop-shadow">
                Strategic relationships
              </h3>
              <p className="text-sm md:text-base text-white/75 leading-relaxed font-light drop-shadow">
                Fort Energy prioritizes relationship building within the
                downstream and other relevant sectors, while simultaneously
                exploring ne...
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Section 4: Empowering Communities & Preferential Market Access */}
        <ScrollSection className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Column 1 */}
            <div className="flex flex-col justify-center">
              <div className="max-w-md">
                <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 drop-shadow">
                  Empowering communities through social responsibility
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-light drop-shadow">
                  In addition to its business operations, Fort Energy is
                  committed to empowering communities through initiatives that
                  includ...
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col justify-center md:items-end">
              <div className="max-w-md">
                <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 drop-shadow">
                  Preferential market access
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-light drop-shadow">
                  Courtesy of Montfort&apos;s wide net cast across geographies,
                  Fort Energy is able to capitalize on opportunities to
                  receive...
                </p>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Section 5: Corporate Governance & Website CTA */}
        <ScrollSection className="min-h-screen px-8 md:px-20 lg:px-32 flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-white mb-6 drop-shadow">
              Corporate governance and global compliance
            </h2>
            <p className="max-w-2xl text-base md:text-lg font-light leading-relaxed text-white/80 mb-14 drop-shadow">
              Fort Energy operates under an integrated ESG management framework
              and adheres to strict corporate governance principles....
            </p>

            {/* Website Link Badge */}
            <div className="flex flex-col items-center gap-3">
              <Link
                href="https://www.fortenergy.com"
                target="_blank"
                className="group inline-flex items-center gap-4 text-xs tracking-[0.3em] uppercase text-white/90 hover:text-sky-300 transition-colors"
              >
                <span>WWW.FORTENERGY.COM</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-transform group-hover:scale-110 group-hover:border-sky-300">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <div className="h-[1px] w-56 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
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
