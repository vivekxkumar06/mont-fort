"use client";

import SmoothScroll from "./SmoothScroll";
import { ReactNode } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <SmoothScroll>{children}</SmoothScroll>;
}

export { useLenis } from "./SmoothScroll";
