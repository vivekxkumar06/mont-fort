// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// interface BackgroundScrubVideoProps {
//   containerRef: React.RefObject<HTMLDivElement | null>;
// }

// export default function BackgroundScrubVideo({
//   containerRef,
// }: BackgroundScrubVideoProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     const video = videoRef.current;
//     if (!video || !containerRef.current) return;

//     const setupScrub = () => {
//       const duration = video.duration || 10;

//       // Video time scrubbed directly by page scroll
//       const trigger = ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1.2,
//         onUpdate: (self) => {
//           if (video.duration) {
//             video.currentTime = self.progress * duration;
//           }
//         },
//       });

//       // Subtle scale up / parallax as you go deep down
//       gsap.to(video, {
//         scale: 1.15,
//         ease: "none",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: true,
//         },
//       });

//       return trigger;
//     };

//     let scrubTrigger: ScrollTrigger | undefined;

//     if (video.readyState >= 1) {
//       scrubTrigger = setupScrub();
//     } else {
//       video.onloadedmetadata = () => {
//         scrubTrigger = setupScrub();
//       };
//     }

//     return () => {
//       if (scrubTrigger) scrubTrigger.kill();
//     };
//   }, [containerRef]);

//   return (
//     <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden pointer-events-none select-none">
//       {/* 3D Mountain Video Scrubber */}
//       <video
//         ref={videoRef}
//         muted
//         playsInline
//         preload="auto"
//         className="h-full w-full object-cover brightness-[1.03] contrast-[1.08] saturate-[0.88] will-change-transform"
//         src="https://media.istockphoto.com/id/1441550846/video/high-mountains-under-snow-in-the-winter.mp4?s=mp4-640x640-is&k=20&c=PSYo1pc5CLkkHu2u6s9VYkCGw1DvYs1JlITGVum-NYs="
//       />

//       {/* Montfort Soft Fog / Mist Overlays */}
//       <div className="absolute top-0 left-0 right-0 h-[38vh] bg-gradient-to-b from-[#f3f6f9]/95 via-[#f3f6f9]/60 to-transparent pointer-events-none" />
//       <div className="absolute bottom-0 left-0 right-0 h-[48vh] bg-gradient-to-t from-[#f3f6f9]/95 via-[#f3f6f9]/70 to-transparent pointer-events-none" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_40%,rgba(215,225,235,0.45)_100%)] pointer-events-none" />
//     </div>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BackgroundScrubVideoProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function BackgroundScrubVideo({
  containerRef,
}: BackgroundScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let ctx: gsap.Context | undefined;

    const setupScrub = () => {
      const duration = video.duration || 10;

      ctx = gsap.context(() => {
        // Video time scrubbed directly by page scroll
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * duration;
            }
          },
        });

        // Subtle scale up / parallax as you go deep down
        gsap.to(video, {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
    };

    if (video.readyState >= 1) {
      setupScrub();
    } else {
      video.addEventListener("loadedmetadata", setupScrub, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", setupScrub);
      ctx?.revert();
    };
  }, [containerRef]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen select-none overflow-hidden">
      {/* 3D Mountain Video Scrubber (local video) */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover brightness-[1.03] contrast-[1.08] saturate-[0.88] will-change-transform"
        src="/videos/mountain-sky0.mp4"
      />

      {/* Montfort Soft Fog / Mist Overlays */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[38vh] bg-gradient-to-b from-[#f3f6f9]/95 via-[#f3f6f9]/60 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[48vh] bg-gradient-to-t from-[#f3f6f9]/95 via-[#f3f6f9]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_40%,rgba(215,225,235,0.45)_100%)]" />
    </div>
  );
}
