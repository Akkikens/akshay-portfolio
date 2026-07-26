import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./index";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger helper: pass the item index, delay = index * 0.04s */
  index?: number;
  /** Extra delay in seconds, added on top of index stagger */
  delay?: number;
  /** Rise distance in px (translateY only — GPU compositing) */
  y?: number;
  /** Horizontal offset in px, combined with y (translateX only) */
  x?: number;
  /** Viewport margin override for whileInView triggering */
  margin?: string;
  as?: "div" | "section" | "li" | "span";
};

/**
 * The one scroll-reveal used everywhere: fade + rise on viewport entry.
 * Reduced motion renders a plain element — content is always visible instantly.
 */
export default function Reveal({
  children,
  className,
  index = 0,
  delay = 0,
  y = 24,
  x = 0,
  margin = "-10% 0px",
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = motion[as];

  if (prefersReducedMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: margin as any }}
      transition={{ duration: 0.5, delay: delay + index * 0.04, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}
