"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PinnedSectionProps {
  children: ReactNode;
  pinDistance?: string; // e.g. "200%"
  className?: string;
  innerClassName?: string;
}

export default function PinnedSection({
  children,
  pinDistance = "200%",
  className = "",
  innerClassName = "",
}: PinnedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const pinTarget = pinTargetRef.current;
    if (!container || !pinTarget) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${pinDistance}`,
        pin: pinTarget,
        anticipatePin: 1,
        pinSpacing: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [pinDistance]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div
        ref={pinTargetRef}
        className={`relative w-full h-screen overflow-hidden ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
