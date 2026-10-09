"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MontfortLogoMark } from "./MontfortLogo";
import { useLenis } from "./SmoothScroll";

interface NavLinkItem {
  name: string;
  target?: string;
  href?: string;
  activeRing?: boolean;
}

const mainNavLinks: NavLinkItem[] = [
  { name: "MONTFORT GROUP", target: "#mountain-zone", activeRing: true },
  { name: "MONTFORT TRADING", target: "#divisions-zone" },
  { name: "MONTFORT CAPITAL", target: "#divisions-zone" },
  { name: "MONTFORT MARITIME", target: "#divisions-zone" },
  { name: "FORT ENERGY", target: "#divisions-zone" },
];

const secondaryNavLinks: NavLinkItem[] = [
  { name: "CONTACT", href: "#contact" },
  { name: "ESG", target: "#sustainability-zone" },
  { name: "PRIVACY POLICY", href: "#privacy" },
  { name: "TERMS OF USE", href: "#terms" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const footer = footerRef.current;
    const content = contentRef.current;
    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (e: React.MouseEvent, item: NavLinkItem) => {
    if (item.target) {
      e.preventDefault();
      scrollTo(item.target, { duration: 1.6, offset: -20 });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-20 w-full bg-white text-[#1b4965] px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 select-none font-heading"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto flex flex-col will-change-transform">
        {/* =========================================================
            TOP 4-COLUMN LUXURY CORPORATE GRID
            ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 xl:gap-16 mb-20 sm:mb-24 lg:mb-28">
          {/* COLUMN 1: COMPANY NAVIGATION */}
          <div className="flex flex-col justify-between">
            {/* Primary Divisions List */}
            <ul className="flex flex-col gap-3.5 sm:gap-4">
              {mainNavLinks.map((link) => (
                <li key={link.name} className="relative">
                  <a
                    href={link.target || link.href || "#"}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="group inline-flex items-center gap-2 text-xs sm:text-[13px] tracking-[0.16em] uppercase font-light text-[#1b4965] hover:text-[#0f3248] transition-colors duration-300 relative py-0.5"
                  >
                    {/* Reference Ring on Montfort Group */}
                    {link.activeRing && (
                      <span className="absolute -left-2 sm:-left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#1b4965]/40 pointer-events-none -z-10" />
                    )}
                    <span className="relative">
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1b4965] transition-all duration-300 ease-out group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Secondary Legal & Info List */}
            <ul className="flex flex-col gap-3 sm:gap-3.5 mt-10 sm:mt-14">
              {secondaryNavLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.target || link.href || "#"}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="group inline-block text-[11px] sm:text-xs tracking-[0.18em] uppercase font-light text-[#1b4965]/75 hover:text-[#1b4965] transition-colors duration-300 relative py-0.5"
                  >
                    <span>{link.name}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1b4965] transition-all duration-300 ease-out group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: GENEVA, SWITZERLAND */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-sm sm:text-base tracking-[0.14em] uppercase font-medium text-[#1b4965] mb-6 leading-snug">
                GENEVA,
                <br />
                SWITZERLAND
              </h3>
              <address className="not-italic text-xs sm:text-[13px] font-light leading-[1.8] text-[#1b4965]/85 tracking-wide">
                3rd & 4th floor
                <br />
                Rue du Mont-Blanc 14
                <br />
                1201 Geneva, Switzerland
              </address>
            </div>

            <div className="mt-8 sm:mt-12 text-xs sm:text-[13px] font-light leading-[1.85] text-[#1b4965]/85 tracking-wide">
              <p>
                <span className="font-normal text-[#1b4965]">P : </span>
                <a
                  href="tel:+41227415900"
                  className="hover:text-[#0f3248] transition-colors hover:underline"
                >
                  +41 227415900
                </a>
              </p>
              <p>
                <a
                  href="mailto:gva.reception@mont-fort.com"
                  className="hover:text-[#0f3248] transition-colors hover:underline"
                >
                  gva.reception@mont-fort.com
                </a>
              </p>
            </div>
          </div>

          {/* COLUMN 3: DUBAI, UAE */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-sm sm:text-base tracking-[0.14em] uppercase font-medium text-[#1b4965] mb-6 leading-snug">
                DUBAI,
                <br />
                UAE
              </h3>
              <address className="not-italic text-xs sm:text-[13px] font-light leading-[1.8] text-[#1b4965]/85 tracking-wide">
                1104 ICD Brookfield Place
                <br />
                Dubai International Financial Centre
                <br />
                Dubai, United Arab Emirates
              </address>
            </div>

            <div className="mt-8 sm:mt-12 text-xs sm:text-[13px] font-light leading-[1.85] text-[#1b4965]/85 tracking-wide">
              <p>
                <span className="font-normal text-[#1b4965]">P : </span>
                <a
                  href="tel:+97145914032"
                  className="hover:text-[#0f3248] transition-colors hover:underline"
                >
                  +971 45914032
                </a>
              </p>
              <p>
                <a
                  href="mailto:uae.reception@mont-fort.com"
                  className="hover:text-[#0f3248] transition-colors hover:underline"
                >
                  uae.reception@mont-fort.com
                </a>
              </p>
            </div>
          </div>

          {/* COLUMN 4: SINGAPORE */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-sm sm:text-base tracking-[0.14em] uppercase font-medium text-[#1b4965] mb-6 leading-snug">
                SINGAPORE
              </h3>
              <address className="not-italic text-xs sm:text-[13px] font-light leading-[1.8] text-[#1b4965]/85 tracking-wide">
                0804 Marina One East Tower
                <br />
                7 Straits View
                <br />
                018936, Singapore
              </address>
            </div>

            <div className="mt-8 sm:mt-12 text-xs sm:text-[13px] font-light leading-[1.85] text-[#1b4965]/85 tracking-wide">
              <p>
                <span className="font-normal text-[#1b4965]">P : </span>
                <a
                  href="tel:+6531051583"
                  className="hover:text-[#0f3248] transition-colors hover:underline"
                >
                  +65 3105 1583
                </a>
              </p>
              <p>
                <a
                  href="mailto:sing.reception@mont-fort.com"
                  className="hover:text-[#0f3248] transition-colors hover:underline"
                >
                  sing.reception@mont-fort.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            THIN HORIZONTAL DIVIDER
            ========================================================= */}
        <div className="w-full h-[1px] bg-[#1b4965]/20 mb-10 sm:mb-12" />

        {/* =========================================================
            BOTTOM ROW: LOGO LOCKUP & COPYRIGHT
            ========================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
          {/* Brand Lockup: [ Icon | MONTFORT ] */}
          <div className="flex items-center gap-4">
            <MontfortLogoMark
              className="w-7 h-7 sm:w-8 sm:h-8 shrink-0"
              fill="#1b4965"
            />
            <span className="w-[1px] h-5 sm:h-6 bg-[#1b4965]/35 shrink-0" />
            <span className="text-sm sm:text-base font-light tracking-[0.32em] text-[#1b4965] uppercase pl-[0.1em]">
              MONTFORT
            </span>
          </div>

          {/* Copyright Notice */}
          <p className="text-[11px] sm:text-xs font-light text-[#1b4965]/65 tracking-wider">
            © 2026 | Montfort - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
