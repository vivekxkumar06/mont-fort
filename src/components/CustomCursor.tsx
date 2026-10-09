"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const TEXT_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, p, h1, h2, h3, h4, h5, h6, span, li, small, strong, em";

const subscribePointerFine = (callback: () => void) => {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  const [single, setSingle] = useState(false); // text par: ring ke andar ek dot
  const [pressed, setPressed] = useState(false);
  const enabled = useSyncExternalStore(
    subscribePointerFine,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dots = dotsRef.current;
    if (!ring || !dots) return;

    let mx = -200,
      my = -200,
      rx = -200,
      ry = -200,
      shown = false,
      raf = 0;
    let isSingle = false;

    const setVisible = (v: boolean) => {
      shown = v;
      ring.style.visibility = v ? "visible" : "hidden";
      dots.style.visibility = v ? "visible" : "hidden";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!shown) {
        rx = mx;
        ry = my;
        setVisible(true);
      }
      const target = e.target as HTMLElement | null;
      const onText = !!target?.closest(TEXT_SELECTOR);
      if (onText !== isSingle) {
        isSingle = onText;
        setSingle(onText);
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const loop = () => {
      // ring smooth lag ke saath follow karti hai
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      dots.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Ring size states
  const ringScale = pressed ? (single ? 0.85 : 0.82) : single ? 1.05 : 1;

  return (
    <>
      {/* Fully transparent ring: andar ka text clearly dikhega */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ visibility: "hidden" }}
      >
        <div
          className="h-[68px] w-[68px] rounded-full bg-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `scale(${ringScale})`,
            border: single
              ? "1px solid rgba(47, 95, 138, 0.65)"
              : "1px solid rgba(47, 95, 138, 0.4)",
            // koi background / blur nahi, sirf bahar ka halka glow
            boxShadow:
              "0 0 0 4px rgba(255,255,255,0.1), 0 8px 24px rgba(47,95,138,0.12)",
          }}
        />
      </div>

      {/* Dots: normal = 2 dots, text par = ring ke andar 1 dot */}
      <div
        ref={dotsRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ visibility: "hidden" }}
      >
        <div className="relative h-[6px] w-[6px]">
          <span
            className="absolute inset-0 rounded-full bg-[#2f5f8a] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: single
                ? "translateX(0) scale(1)"
                : "translateX(-7px) scale(1)",
            }}
          />
          <span
            className="absolute inset-0 rounded-full bg-[#2f5f8a] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: single
                ? "translateX(0) scale(0)"
                : "translateX(7px) scale(1)",
              opacity: single ? 0 : 1,
            }}
          />
        </div>
      </div>
    </>
  );
}
