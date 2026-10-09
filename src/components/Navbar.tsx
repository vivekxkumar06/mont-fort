"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Har item me custom 'href' add kar diya hai
const links = [
  { name: "Montfort Group", href: "/" },
  { name: "Montfort Trading", href: "/montfort-trading" },
  { name: "Montfort Capital", href: "/montfort-capital" },
  { name: "Montfort Maritime", href: "/montfort-maritime" },
  { name: "Fort Energy", href: "/fort-energy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50 pointer-events-auto">
      <nav
        className={`mx-auto mt-20 flex h-[130px] w-full max-w-[1700px] items-start justify-between px-8 transition-all duration-1000 ease-out md:mt-24 md:px-16 lg:mt-28 lg:px-24 xl:mt-32 xl:px-32 2xl:mt-36 2xl:px-44 ${
          mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        {/* Left links (Desktop) */}
        <ul className="hidden items-start gap-[34px] lg:flex">
          {links.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.name} className="relative">
                <Link
                  href={item.href}
                  className={`inline-block pb-[14px] text-[15px] uppercase tracking-[0.04em] transition-colors duration-500 ${
                    isActive
                      ? "text-[#2f5f8a]"
                      : "text-[#8eaac3] hover:text-[#2f5f8a]"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Active underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] origin-left bg-[#2f5f8a] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </li>
            );
          })}
        </ul>

        {/* Mobile logo link */}
        <Link
          href="/montfort-group"
          className="text-[15px] uppercase tracking-[0.04em] text-[#2f5f8a] lg:hidden"
        >
          Montfort Group
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6 text-[15px] uppercase tracking-[0.04em] text-[#2f5f8a]">
          <Link
            href="/news"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
          >
            News
            <span className="font-mono text-[11px] text-[#2f5f8a] opacity-80">
              [27]
            </span>
          </Link>

          <button
            type="button"
            className="transition-opacity hover:opacity-70 cursor-pointer"
          >
            Menu
          </button>

          <button
            type="button"
            aria-label="More"
            className="ml-3 flex items-center gap-[7px] transition-transform duration-300 hover:scale-110 cursor-pointer"
          >
            <span className="h-[5px] w-[5px] rounded-full bg-[#2f5f8a]" />
            <span className="h-[5px] w-[5px] rounded-full bg-[#2f5f8a]" />
          </button>
        </div>
      </nav>
    </header>
  );
}
