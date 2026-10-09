"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Sun, Wind, CloudRain } from "lucide-react";
import AnimatedText from "./AnimatedText";

const csrImages = [
  {
    id: 1,
    title: "Children Education & Community",
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Clean Water & Village Wells",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "University & Women Graduates",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Community Outreach & Relief",
    url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
  },
];

export default function SustainabilitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"env" | "soc" | "gov">("env");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(".sustainability-block");
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 78%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // CSR Image cards subtle staggered zoom reveal
      const galleryCards = gsap.utils.toArray<HTMLElement>(".csr-card");
      if (galleryCards.length) {
        gsap.fromTo(
          galleryCards,
          { opacity: 0, scale: 0.95, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".csr-gallery-grid",
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="sustainability-zone"
      ref={containerRef}
      className="relative w-full flex flex-col m-0 p-0 text-white select-none"
    >
      {/* ========================================================
          STEP 1: OUR ETHICS AND COMPLIANCE FRAMEWORK
          ======================================================== */}
      <section className="sustainability-block relative w-full min-h-screen flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 py-24 z-20 will-change-transform">
        <div className="max-w-6xl w-full">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[clamp(11px,0.9vw,14px)] font-mono tracking-[0.25em] text-white/70">
              01
            </span>
            <span className="w-8 h-[1px] bg-white/40" />
            <span className="text-[clamp(11px,0.9vw,14px)] uppercase tracking-[0.28em] text-white/80 font-light">
              Governance & Compliance
            </span>
          </div>

          <AnimatedText
            text={"OUR ETHICS AND\nCOMPLIANCE FRAMEWORK"}
            as="h2"
            type="lines"
            className="font-heading text-[clamp(34px,4.4vw,66px)] font-normal md:font-medium tracking-[-0.015em] text-white leading-[1.0] sm:leading-[1.03] lg:leading-[1.05] mb-14 drop-shadow-[0_4px_28px_rgba(0,0,0,0.7)] uppercase"
            start="top 75%"
          />

          {/* 3 Floating Text Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 text-white/90 font-light leading-[1.75] text-sm md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col gap-6">
              <p>
                At Montfort, we operate under an integrated Sustainability
                Framework and adhere to strict corporate governance principles
                that allow us to drive transformative social and environmental
                progress.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <p>
                We ensure compliance with all applicable laws and regulations
                across our global operations, including those of the UN, EU,
                Switzerland, UK, US, Singapore, and the UAE.
              </p>
              <p className="text-white/70 text-xs md:text-sm">
                Any products purchased, sold, or shipped by Montfort are in full
                compliance with all applicable laws and anti-bribery &
                corruption (ABAC) protocols.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <p>
                Prior to engaging with any counterparty, a thorough and rigorous
                external onboarding process is conducted for all our trade
                counterparties and vessels we employ.
              </p>
              <p className="text-white/70 text-xs md:text-sm">
                Using renowned global compliance platforms, we analyze the
                counterparty, their corporate structure, and their ultimate
                beneficial owners (UBO).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          STEP 2: DELIVERING SUSTAINABLE ENERGY SOLUTIONS
          ======================================================== */}
      <section className="sustainability-block relative w-full min-h-screen flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 py-24 z-20 will-change-transform">
        <div className="max-w-6xl w-full">
          {/* Minimalist Step Marker */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono tracking-[0.25em] text-white/70">
              02
            </span>
            <span className="w-8 h-[1px] bg-white/40" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-light">
              Sustainability
            </span>
          </div>

          <AnimatedText
            text={"DELIVERING SUSTAINABLE\nENERGY SOLUTIONS"}
            as="h2"
            type="lines"
            className="font-heading text-[clamp(34px,4.4vw,66px)] font-normal md:font-medium tracking-[-0.015em] text-white leading-[1.0] sm:leading-[1.03] lg:leading-[1.05] mb-14 drop-shadow-[0_4px_28px_rgba(0,0,0,0.7)] uppercase"
            start="top 75%"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-14">
            <p className="lg:col-span-5 text-sm md:text-base font-light text-white/85 leading-[1.75] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              We are dedicated to fostering a future where energy is both
              sustainable and accessible. Our strategy includes innovative
              practices to reduce environmental impact and promote renewable
              energy sources. By connecting people, ingenuity, and resources
              with a shared vision of value and prosperity, we aim to lead
              meaningful transformation.
            </p>

            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-8 border-b border-white/20 pb-3">
                <button
                  onClick={() => setActiveTab("env")}
                  className={`text-xs uppercase tracking-[0.25em] font-medium transition-all cursor-pointer ${
                    activeTab === "env"
                      ? "text-white border-b-2 border-white pb-2 -mb-3"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Environmental
                </button>
                <button
                  onClick={() => setActiveTab("soc")}
                  className={`text-xs uppercase tracking-[0.25em] font-medium transition-all cursor-pointer ${
                    activeTab === "soc"
                      ? "text-white border-b-2 border-white pb-2 -mb-3"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Social
                </button>
                <button
                  onClick={() => setActiveTab("gov")}
                  className={`text-xs uppercase tracking-[0.25em] font-medium transition-all cursor-pointer ${
                    activeTab === "gov"
                      ? "text-white border-b-2 border-white pb-2 -mb-3"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Governance
                </button>
              </div>

              <p className="text-sm font-light text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Reducing our impact on the environment is paramount to our
                business. Our environmental policies and culture focus on:
              </p>

              {/* Environmental Metrics Rings */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full border border-white/35 flex items-center justify-center bg-transparent hover:border-white transition-colors">
                    <Leaf className="w-6 h-6 text-white stroke-1" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-white/80 font-light">
                    Clean Energy
                  </span>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full border border-white/35 flex items-center justify-center bg-transparent hover:border-white transition-colors">
                    <Sun className="w-6 h-6 text-white stroke-1" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-white/80 font-light">
                    Reduced Usage
                  </span>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full border border-white/35 flex items-center justify-center bg-transparent hover:border-white transition-colors">
                    <Wind className="w-6 h-6 text-white stroke-1" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-white/80 font-light">
                    Climate Action
                  </span>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full border border-white/35 flex items-center justify-center bg-transparent hover:border-white transition-colors">
                    <CloudRain className="w-6 h-6 text-white stroke-1" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-white/80 font-light">
                    Carbon Cuts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          STEP 3: OUR COMMITMENT TO EQUALITY
          ======================================================== */}
      <section className="sustainability-block relative w-full min-h-[90vh] flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 py-24 z-20 will-change-transform">
        <div className="max-w-6xl w-full">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono tracking-[0.25em] text-white/70">
              03
            </span>
            <span className="w-8 h-[1px] bg-white/40" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-light">
              Diversity & Inclusion
            </span>
          </div>

          <AnimatedText
            text={"OUR COMMITMENT\nTO EQUALITY"}
            as="h2"
            type="lines"
            className="font-heading text-[clamp(34px,4.4vw,66px)] font-normal md:font-medium tracking-[-0.015em] text-white leading-[1.0] sm:leading-[1.03] lg:leading-[1.05] mb-14 drop-shadow-[0_4px_28px_rgba(0,0,0,0.7)] uppercase"
            start="top 75%"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 text-white/90 font-light leading-[1.8] text-sm md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            <p>
              We strive to create an environment where everyone can thrive and
              contribute to our success. Diversity in background, perspective,
              and identity fuels our long-term resilience and innovation.
            </p>
            <p>
              We are proud that our staff come from almost 27 nationalities
              across five continents. We are committed to equality, with over
              35% of our global team being female. We are proud to share that
              over 22% of our management team are women, reflecting our
              dedication to empowering women in trading leadership.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          STEP 4 & 5: CSR PLEDGE & HD PHOTO GALLERY
          ======================================================== */}
      <section className="sustainability-block relative w-full min-h-screen flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 py-24 z-20 will-change-transform">
        <div className="max-w-6xl w-full">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono tracking-[0.25em] text-white/70">
              04
            </span>
            <span className="w-8 h-[1px] bg-white/40" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-light">
              Social Responsibility
            </span>
          </div>

          <AnimatedText
            text={"OUR PLEDGE TO CORPORATE\nSOCIAL RESPONSIBILITY"}
            as="h2"
            type="lines"
            className="font-heading text-[clamp(34px,4.4vw,66px)] font-normal md:font-medium tracking-[-0.015em] text-white leading-[1.0] sm:leading-[1.03] lg:leading-[1.05] mb-14 drop-shadow-[0_4px_28px_rgba(0,0,0,0.7)] uppercase"
            start="top 75%"
          />

          {/* CSR Image Gallery */}
          <div className="csr-gallery-grid grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {csrImages.map((img) => (
              <div
                key={img.id}
                className="csr-card group relative h-48 sm:h-64 overflow-hidden will-change-transform"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover brightness-[0.88] group-hover:scale-106 group-hover:brightness-100 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-[11px] text-white font-light tracking-wider leading-snug">
                    {img.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CSR Description */}
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.32em] text-white/80 font-medium">
                Alleviating Poverty
              </span>
              <div className="w-16 h-[1px] bg-white/50" />
            </div>

            <p className="text-sm md:text-base font-light text-white/90 leading-[1.8] max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              With the help of local NGOs, we support the communities where we
              invest. Montfort has successfully financed clean water projects,
              initiatives for orphaned children, earthquake relief, food
              distribution, and medical support for those in need.
            </p>

            {/* NGO Partner Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-8 opacity-80">
              <span className="text-xs font-mono tracking-[0.25em] text-white/80 hover:text-white transition-colors">
                MERCY SHIPS
              </span>
              <span className="text-xs font-mono tracking-[0.25em] text-white/80 hover:text-white transition-colors">
                MERCY CORPS
              </span>
              <span className="text-xs font-mono tracking-[0.25em] text-white/80 hover:text-white transition-colors">
                KENYA RED CROSS
              </span>
              <span className="text-xs font-mono tracking-[0.25em] text-white/80 hover:text-white transition-colors">
                EMIRATES RED CRESCENT
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
