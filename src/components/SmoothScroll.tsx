"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
    }
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: ReactNode;
  duration?: number;
  wheelMultiplier?: number;
}

export default function SmoothScroll({
  children,
  duration = 1.15,
  wheelMultiplier = 1.0,
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with natural, responsive cinematic inertia curve
    const lenis = new Lenis({
      duration,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier,
      touchMultiplier: 1.2,
      infinite: false,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll position with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's central ticker for 60fps/120fps lock without jitter
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // lagSmoothing(0) ensures no jump or snap when regaining focus or frame drops
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [duration, wheelMultiplier]);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
    }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  };

  const contextValue: SmoothScrollContextValue = {
    get lenis() {
      return lenisRef.current;
    },
    scrollTo,
  };

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
