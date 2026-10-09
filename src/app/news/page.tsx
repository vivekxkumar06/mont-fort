"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ChevronDown } from "lucide-react";
import SmoothScrollProvider, {
  useLenis,
} from "../../components/SmoothScrollProvider";

interface NewsItem {
  id: string;
  category: "IN FOCUS" | "EVENTS" | "WELCOME" | "AUTHORITY";
  categorySubtitle?: string;
  date: string;
  title: string;
  image: string;
  href: string;
}

// Screenshot ke exact texts, dates aur HD matching images
const newsList: NewsItem[] = [
  {
    id: "1",
    category: "IN FOCUS",
    categorySubtitle: "FLEET COMMITMENT & DELIVERY: MFM NICOLE",
    date: "September 3 2026",
    title: "Montfort Maritime receives MFM Nicole, first of two MGC...",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop", // Ocean cargo tanker
    href: "/news/montfort-maritime-receives-mfm-nicole",
  },
  {
    id: "2",
    category: "EVENTS",
    categorySubtitle: "APPEC 2026",
    date: "September 2 2026",
    title: "Montfort at APPEC 2026",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop", // Exhibition hall / conference
    href: "/news/montfort-at-appec-2026",
  },
  {
    id: "3",
    category: "WELCOME",
    categorySubtitle: "CLEMENT CHOY - FREIGHT TRADING MANAGER",
    date: "September 1 2026",
    title: "Montfort Maritime Appoints Clement Choy as Trading...",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop", // Executive corporate portrait
    href: "/news/montfort-maritime-appoints-clement-choy",
  },
  {
    id: "4",
    category: "IN FOCUS",
    categorySubtitle: "SUSTAINABLE MARITIME INNOVATIONS",
    date: "May 20 2026",
    title: "Innovations in Hull Hydrodynamics and Fuel Savings...",
    image:
      "https://images.unsplash.com/photo-1505705694340-019e1e335916?q=80&w=1200&auto=format&fit=crop", // Aerial ship bow wake
    href: "/news/innovations-in-hull-hydrodynamics",
  },
  {
    id: "5",
    category: "EVENTS",
    categorySubtitle: "MARITIME LOGISTICS SUMMIT",
    date: "May 12 2026",
    title: "Key Insights from the Global Logistics & Chartering Summit",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop", // Convention exhibition booths
    href: "/news/global-logistics-chartering-summit",
  },
  {
    id: "6",
    category: "WELCOME",
    categorySubtitle: "GEORGE BOLTON - HEAD OF MARITIME INVESTMENTS",
    date: "April 28 2026",
    title: "Welcoming George Bolton as Head of Maritime Investments",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop", // Corporate professional portrait
    href: "/news/welcoming-george-bolton",
  },
  {
    id: "7",
    category: "EVENTS",
    categorySubtitle: "ARDA WEEK 2026",
    date: "April 14 2026",
    title: "Montfort at ARDA Week 2026",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop", // Large auditorium conference
    href: "/news/montfort-at-arda-week-2026",
  },
  {
    id: "8",
    category: "WELCOME",
    categorySubtitle: "JONAS V. B. NISSEN - GLOBAL HEAD OF FREIGHT OPERATIONS",
    date: "April 12 2026",
    title: "Montfort Maritime has appointed Jonas V. B. Nissen a...",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop", // Global head executive portrait
    href: "/news/appointed-jonas-nissen",
  },
  {
    id: "9",
    category: "EVENTS",
    categorySubtitle: "IE WEEK 2026",
    date: "February 1 2026",
    title: "Montfort at IE Week 2026",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop", // Keynote stage presentation
    href: "/news/montfort-at-ie-week-2026",
  },
  {
    id: "10",
    category: "IN FOCUS",
    categorySubtitle: "FLEET EXPANSION STRATEGY",
    date: "November 28 2025",
    title: "Montfort Maritime expands fleet with two Japanese-built tanker...",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop", // Industrial dock shipyard tanker
    href: "/news/montfort-maritime-expands-fleet",
  },
  {
    id: "11",
    category: "EVENTS",
    categorySubtitle: "ADIPEC 2025",
    date: "October 29 2025",
    title: "Montfort at ADIPEC 2025",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop", // Panel discussion stage
    href: "/news/montfort-at-adipec-2025",
  },
  {
    id: "12",
    category: "AUTHORITY",
    categorySubtitle: "MARKET INSIGHTS & RELATIONSHIPS",
    date: "September 22 2025",
    title: "Why Relationships Still Matter in Global Commodity Trading",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop", // Modern executive office lounge
    href: "/news/why-relationships-still-matter",
  },
  {
    id: "13",
    category: "EVENTS",
    categorySubtitle: "EMF WEEK 2025",
    date: "September 21 2025",
    title: "Montfort at Energy Markets Forum 2025",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop", // Forum entrance venue
    href: "/news/energy-markets-forum-2025",
  },
  {
    id: "14",
    category: "EVENTS",
    categorySubtitle: "ARGUS GLOBAL MARKETS",
    date: "September 20 2025",
    title: "Montfort at Argus Global Markets 2025",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop", // Business conference audience
    href: "/news/argus-global-markets-2025",
  },
  {
    id: "15",
    category: "AUTHORITY",
    categorySubtitle: "DISCIPLINED OPERATIONS",
    date: "August 11 2025",
    title: "How Montfort Turns Discipline into a Strategic Asset",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop", // Corporate architecture facade
    href: "/news/how-montfort-turns-discipline",
  },
  {
    id: "16",
    category: "IN FOCUS",
    categorySubtitle: "NEWBUILDING DELIVERY",
    date: "April 25 2025",
    title: "Montfort Maritime Celebrates Delivery of First Newbuilding...",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop", // Ship bow christening / harbor
    href: "/news/first-newbuilding-delivery",
  },
  {
    id: "17",
    category: "EVENTS",
    categorySubtitle: "CARGO DAY 2024",
    date: "February 23 2025",
    title: "Montfort Participates in Cargo Day 2024",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop", // Evening gala event
    href: "/news/cargo-day-2024",
  },
  {
    id: "18",
    category: "IN FOCUS",
    categorySubtitle: "GREENER SHIPPING",
    date: "May 15 2024",
    title: "Montfort agrees innovative and greener shipping deal",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop", // Tech cyan green eco globe
    href: "/news/greener-shipping-deal",
  },
];

export default function NewsPage() {
  return (
    <SmoothScrollProvider>
      <NewsContent />
    </SmoothScrollProvider>
  );
}

function NewsContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  const scrollToTop = () => {
    if (scrollTo) {
      scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const articles = container.querySelectorAll(".news-article-card");
      articles.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#fafbfc] text-[#1c2e3d] antialiased"
    >
      {/* Main Content Area */}
      <main className="mx-auto max-w-[1700px] px-8 pt-36 pb-28 md:px-16 lg:pt-44 lg:px-24">
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
          {newsList.map((item) => (
            <article
              key={item.id}
              className="news-article-card group flex flex-col"
            >
              <Link href={item.href} className="block overflow-hidden">
                {/* Image Container with 16:9 Aspect Ratio */}
                <div className="relative aspect-[16/9.5] w-full overflow-hidden rounded-[14px] bg-[#e6edf2] transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 filter brightness-[0.88] contrast-[1.05] group-hover:brightness-95"
                    priority={parseInt(item.id) <= 6}
                  />

                  {/* Elegant Gradient Overlay for White Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2238]/90 via-[#0d2238]/30 to-transparent" />

                  {/* Badge Text on Image Bottom-Left */}
                  <div className="absolute bottom-5 left-6 right-6 z-10">
                    <span className="font-mono text-[13px] font-semibold tracking-[0.2em] text-white uppercase drop-shadow-sm">
                      {item.category}
                    </span>
                    {item.categorySubtitle && (
                      <p className="mt-1 text-[10px] font-light tracking-[0.14em] text-white/70 uppercase truncate drop-shadow-sm">
                        {item.categorySubtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Metadata & Headline below Card */}
                <div className="mt-5 flex flex-col items-start">
                  <time className="text-[12px] font-light tracking-[0.04em] text-[#8eaac3]">
                    {item.date}
                  </time>
                  <h2 className="mt-2 text-[16px] font-light leading-snug tracking-wide text-[#234563] transition-colors duration-300 group-hover:text-[#2f5f8a] md:text-[17px]">
                    {item.title}
                  </h2>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      {/* Floating Scroll to Top & Down Buttons */}
      <div className="fixed bottom-10 right-8 z-40 flex flex-col items-center gap-3">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8eaac3]/30 bg-white/80 text-[#2f5f8a] shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-[#2f5f8a] cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8eaac3]/30 bg-white/80 text-[#2f5f8a] shadow-lg backdrop-blur-md">
          <ChevronDown className="h-4 w-4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
