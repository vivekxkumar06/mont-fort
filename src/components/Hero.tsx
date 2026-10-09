"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const headline = [
  "MONTFORT IS A",
  "GLOBAL COMMODITY",
  "TRADING AND ASSET",
  "INVESTMENT COMPANY.",
];

/* ---------- 3D reveal wrapper ---------- */
function Reveal({
  progress,
  range,
  className,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  children: React.ReactNode;
}) {
  const [s, e] = range;
  const opacity = useTransform(progress, [s, e], [0, 1]);
  const y = useTransform(progress, [s, e], [70, 0]);
  const rotateX = useTransform(progress, [s, e], [-65, 0]);

  return (
    <motion.div
      className={className}
      style={{
        opacity,
        y,
        rotateX,
        transformOrigin: "50% 100%",
        transformPerspective: 1200,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Dot logo (apna real logo ho to isko replace kar do) ---------- */
function LogoMark() {
  const rows = [5, 7, 8, 7, 6, 4, 3, 1];
  const gap = 10;
  const dots: { x: number; y: number; r: number }[] = [];
  rows.forEach((count, row) => {
    const startX = 45 - ((count - 1) * gap) / 2;
    for (let i = 0; i < count; i++) {
      dots.push({
        x: startX + i * gap,
        y: 6 + row * gap,
        r: Math.max(1.6, 3.2 - row * 0.2),
      });
    }
  });

  return (
    <svg
      viewBox="0 0 90 90"
      className="h-[64px] w-[64px] lg:h-[84px] lg:w-[84px]"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#0f6594" />
      ))}
    </svg>
  );
}

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // smooth / premium scroll feel
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  /* Backgrounds */
  const bg1Opacity = useTransform(p, [0.18, 0.45], [1, 0]);
  const bg1Scale = useTransform(p, [0, 0.45], [1, 1.22]);
  const bg2Opacity = useTransform(p, [0.18, 0.45], [0, 1]);
  const bg2Scale = useTransform(p, [0.18, 1], [1.2, 1]);

  /* Section 1: logo + hints */
  const logoOpacity = useTransform(p, [0, 0.16], [1, 0]);
  const logoY = useTransform(p, [0, 0.16], [0, -80]);
  const logoScale = useTransform(p, [0, 0.16], [1, 1.12]);
  const hintOpacity = useTransform(p, [0, 0.07], [1, 0]);

  /* Section 2: right indicator */
  const sideOpacity = useTransform(p, [0.55, 0.7], [0, 1]);

  return (
    <section ref={wrapRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ---------- Background 1: mountain ---------- */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: bg1Opacity,
            scale: bg1Scale,
            backgroundImage:
              "url('/hero/mountain.jpg'), radial-gradient(ellipse 60% 50% at 70% 35%, #dfe8ef, transparent 70%), linear-gradient(180deg, #e9eef3 0%, #f4f7fa 60%, #eef2f6 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* ---------- Background 2: clouds ---------- */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: bg2Opacity,
            scale: bg2Scale,
            backgroundImage: `url('/hero/clouds.jpg'),
              radial-gradient(ellipse 60% 30% at 15% 5%, rgba(160,172,186,0.85), transparent 70%),
              radial-gradient(ellipse 50% 25% at 85% 0%, rgba(172,182,196,0.8), transparent 70%),
              radial-gradient(ellipse 70% 30% at 50% 60%, rgba(236,242,248,0.95), transparent 75%),
              linear-gradient(180deg, #b9c2cd 0%, #d6dde6 40%, #e6edf5 75%, #f1f5f9 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* ---------- Section 1 content ---------- */}
        <motion.div
          className="absolute left-6 top-[34vh] flex items-center gap-4 md:left-[8vw] lg:left-[13vw] lg:gap-7"
          style={{
            opacity: logoOpacity,
            y: logoY,
            scale: logoScale,
          }}
        >
          <LogoMark />
          <span className="h-[56px] w-px bg-[#2f6393]/60 lg:h-[72px]" />
          <span className="text-[clamp(28px,5.2vw,100px)] font-light tracking-[0.32em] text-[#0f6594]">
            MONTFORT
          </span>
        </motion.div>

        <motion.div
          className="absolute bottom-[9vh] left-6 text-[12px] uppercase tracking-[0.08em] text-[#2f6393] md:left-[8vw] lg:left-[13vw] lg:text-[13px]"
          style={{ opacity: hintOpacity }}
        >
          Scroll down to discover
        </motion.div>

        <motion.svg
          viewBox="0 0 30 10"
          className="absolute bottom-[9vh] right-[8vw] h-[10px] w-[30px]"
          style={{ opacity: hintOpacity }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M2 8 Q15 -2 28 8"
            fill="none"
            stroke="#2f6393"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </motion.svg>

        {/* ---------- Section 2 content ---------- */}
        <div className="absolute inset-0">
          <div className="absolute left-6 right-6 top-[18vh] md:left-[12vw] md:right-[6vw] lg:left-[35vw] lg:top-[10vh]">
            {headline.map((line, i) => (
              <Reveal
                key={line}
                progress={p}
                range={[0.4 + i * 0.045, 0.52 + i * 0.045]}
              >
                <h2 className="text-[clamp(28px,4.2vw,78px)] uppercase leading-[1.18] tracking-[0.01em] text-[#2f6393]">
                  {line}
                </h2>
              </Reveal>
            ))}
          </div>

          <Reveal
            progress={p}
            range={[0.64, 0.76]}
            className="absolute bottom-[8vh] left-6 max-w-[520px] md:left-[8vw] lg:left-[13vw]"
          >
            <p className="text-[clamp(17px,1.65vw,30px)] leading-[1.6] text-[#2f6393]">
              We trade, refine, store, and transport energy and commodities. We
              also invest in related assets and provide innovative services with
              integrity and efficiency to create long-term value.
            </p>
          </Reveal>

          {/* right side small indicators */}
          <motion.div
            className="absolute bottom-[10vh] right-[8vw] flex flex-col items-center gap-14 text-[#2f6393]"
            style={{ opacity: sideOpacity }}
          >
            <svg viewBox="0 0 10 14" className="h-[14px] w-[10px]">
              <path
                d="M5 13 V2 M1 6 L5 2 L9 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg viewBox="0 0 30 10" className="h-[10px] w-[30px]">
              <path
                d="M2 2 Q15 12 28 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
