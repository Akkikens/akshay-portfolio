"use client";

import { useLenis } from "@/hooks/useLenis";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/** Mounts Lenis + lenis-aware anchor clicks at the root. Renders nothing. */
export default function SmoothScroll() {
  useLenis();
  useSmoothScroll();
  return null;
}
