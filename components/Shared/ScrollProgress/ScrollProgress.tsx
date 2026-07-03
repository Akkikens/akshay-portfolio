import React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Top-of-page scroll progress bar. Fully compositor-driven: visibility is a
 * scroll-mapped opacity MotionValue (no scroll listener, no React state) and
 * the fill is a spring-smoothed scaleX. The glow is a box-shadow on the bar
 * itself so only one fixed layer paints.
 */
export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  // Fade in between 100–160px of scroll — replaces the old window listener
  const opacity = useTransform(scrollY, [0, 100, 160], [0, 0, 1]);

  // Light spring only — Lenis already lerps the scroll position, so a heavy
  // spring here would double-smooth and make the bar lag behind the page.
  const springScaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 36,
    restDelta: 0.001,
  });
  const scaleX = prefersReducedMotion ? scrollYProgress : springScaleX;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-AAsecondary via-AAaccent to-AAsecondary z-50 origin-left pointer-events-none shadow-[0_0_10px_rgba(34,211,238,0.55)]"
      style={{ scaleX, opacity }}
    />
  );
}
