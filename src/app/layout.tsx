import type { Metadata } from "next";
import { Geist, Geist_Mono, Questrial, Manrope } from "next/font/google";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Footer import kiya gaya hai
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const questrial = Questrial({
  variable: "--font-main",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Montfort Group",
  description: "Montfort Group",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${questrial.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-[family-name:var(--font-heading)] font-light antialiased">
        <CustomCursor />

        {/* Top Navigation */}
        <Navbar />

        {/* Hero Section aur baaki saare sections children ke roop me yaha aayenge */}
        <main className="flex-1 w-full">{children}</main>

        {/* Bottom Footer */}
        <Footer />
      </body>
    </html>
  );
}
