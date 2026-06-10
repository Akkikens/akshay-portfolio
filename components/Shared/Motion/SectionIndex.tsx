import React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

type SectionIndexProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Section number (01–07) with a barely-there scroll-velocity skew.
 * Fast scrolling tilts the glyphs up to ~6°; the spring snaps them back to
 * rest the moment scrolling stops. Skew-only transform, no layout impact.
 */
export default function SectionIndex({ children, className }: SectionIndexProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const skewX = useTransform(smoothVelocity, [-2000, 0, 2000], [6, 0, -6]);

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span className={`inline-block ${className ?? ""}`} style={{ skewX }}>
      {children}
    </motion.span>
  );
}
