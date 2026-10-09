"use client";

import { useRef } from "react";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import SeamlessBackgroundManager from "../components/SeamlessBackgroundManager";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatementSection from "../components/StatementSection";
import DivisionsShowcase from "../components/DivisionsShowcase";
import GlobalNetworkSection from "../components/GlobalNetworkSection";
import SustainabilitySection from "../components/SustainabilitySection";
import MetricsSection from "../components/MetricsSection";
import Footer from "../components/Footer";

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <SmoothScrollProvider>
      <div
        ref={scrollContainerRef}
        className="relative w-full min-h-screen bg-transparent text-[#1e3f5a] overflow-x-hidden selection:bg-[#1e3f5a] selection:text-[#f3f6f9]"
      >
        {/* Background Controller for 4 Cinematic Seamless Videos */}
        <SeamlessBackgroundManager
          mountainVideoSrc="/videos/mountain-sky.mp4"
          shipVideoSrc="/videos/ship-ocean.mp4"
          globeVideoSrc="/videos/earth-globe.mp4"
          forestVideoSrc="/videos/forest-nature.mp4"
        />

        {/* Global Navigation Header */}

        {/* Seamless Story Scroller */}
        <main className="relative z-10 w-full flex flex-col m-0 p-0">
          {/* ZONE 1: Mountain Sky Experience */}
          <div id="mountain-zone" className="w-full flex flex-col m-0 p-0">
            <HeroSection />

            <StatementSection
              eyebrow="WHO WE ARE"
              heading={
                "MONTFORT IS A\nGLOBAL COMMODITY\nTRADING AND ASSET\nINVESTMENT COMPANY."
              }
              subtext="We trade, refine, store, and transport energy and commodities. We also invest in related assets and provide innovative services with integrity and efficiency to create long-term value."
              alignment="left"
            />

            <StatementSection
              eyebrow="COMMODITY SUPPLY & LOGISTICS"
              heading={
                "WE PROVIDE ENERGY\nSOLUTIONS WITH INTEGRITY\nAND EFFICIENCY THROUGH OUR\nDIFFERENT BUSINESS DIVISIONS."
              }
              subtext="Operating across integrated trading hubs worldwide, delivering capital discipline, strict compliance, and reliable physical supply security."
              alignment="left"
            />

            <StatementSection
              eyebrow="STRATEGIC SYNERGY"
              heading={
                "INTERLINKED DIVISIONS\nWORKING IN COMPLETE\nSTRATEGIC HARMONY."
              }
              subtext="Montfort's interlinked divisions complement each other, providing integrated services that leverage their combined expertise and agile physical logistics."
              alignment="left"
            />
          </div>

          {/* ZONE 2: 4 Division Cards with Tanker Ship Video */}
          <DivisionsShowcase />

          {/* ZONE 3: 3D Earth Globe & Trade Hubs Video */}
          <GlobalNetworkSection />

          {/* ZONE 4: Sustainability, Equality & CSR Photo Gallery (Forest Nature Video) */}
          <SustainabilitySection />

          {/* ZONE 5: Final Metrics & Overview */}
          <MetricsSection />

          {/* Premium Luxury-Corporate Footer */}
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
