import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// easeOutExpo — fast start, long glide. The "Apple" deceleration curve.
// Used for programmatic anchor scrolls only; wheel scrolling is lerp-driven.
const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Inertia smooth scrolling for the whole page. Lenis runs in window mode, so it
 * drives the real scroll position — framer-motion's useScroll, ScrollProgress,
 * and all parallax stay in sync for free (no double-smoothing, no jitter).
 *
 * lerp-only config: `duration`/`easing` are intentionally omitted from the
 * constructor (they only affect programmatic scrollTo calls, which pass their
 * own). lerp 0.09 = slightly heavier, Apple-like glide.
 *
 * Reduced motion: Lenis is never initialized; native scrolling is untouched.
 * Touch: left native (syncTouch off) — iOS/Android momentum already feels right
 * and capturing touch is how scroll-hijacking happens.
 */
export const useLenis = () => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    // autoRaf (lenis 1.3.x): Lenis owns its own single rAF loop internally
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
    });
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, [prefersReducedMotion]);
};

/**
 * Scroll to a section through Lenis when it's active, with native fallback.
 * Single entry point so anchor clicks and CTA buttons never fight the RAF loop.
 * Anchor glides get the long easeOutExpo deceleration; wheel stays lerp-crisp.
 */
export const scrollToTarget = (target: HTMLElement | string, offset = -80) => {
  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, easing: easeOutExpo, offset });
    return;
  }
  const element =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target.startsWith("#") ? target : `#${target}`)
      : target;
  if (!element) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = element.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
};
