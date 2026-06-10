import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// easeOutExpo — fast start, long glide. The "Apple" deceleration curve.
const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Inertia smooth scrolling for the whole page. Lenis runs in window mode, so it
 * drives the real scroll position — framer-motion's useScroll, ScrollProgress,
 * and all parallax stay in sync for free (no double-smoothing, no jitter).
 *
 * Reduced motion: Lenis is never initialized; native scrolling is untouched.
 * Touch: left native (syncTouch off) — iOS/Android momentum already feels right
 * and capturing touch is how scroll-hijacking happens.
 */
export const useLenis = () => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: easeOutExpo,
      smoothWheel: true,
      syncTouch: false,
    });
    window.__lenis = lenis;

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [prefersReducedMotion]);
};

/**
 * Scroll to a section through Lenis when it's active, with native fallback.
 * Single entry point so anchor clicks and CTA buttons never fight the RAF loop.
 */
export const scrollToTarget = (target: HTMLElement | string, offset = -80) => {
  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  if (lenis) {
    lenis.scrollTo(target, { offset });
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
