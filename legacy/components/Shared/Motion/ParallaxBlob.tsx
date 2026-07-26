import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ParallaxBlobProps = {
  className?: string;
  /** Total drift in px across the element's viewport journey. Negative inverts direction. */
  range?: number;
};

/**
 * Decorative background blob that drifts against scroll for layered depth.
 * translateY only; tracks its own position through the viewport so it needs
 * no section ref. Static under reduced motion.
 */
export default function ParallaxBlob({ className, range = 60 }: ParallaxBlobProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${className ?? ""}`}
      style={prefersReducedMotion ? undefined : { y }}
    />
  );
}
