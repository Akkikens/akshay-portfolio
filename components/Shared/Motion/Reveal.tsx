import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger helper: pass the item index, delay = index * 0.04s */
  index?: number;
  /** Extra delay in seconds, added on top of index stagger */
  delay?: number;
  /** Rise distance in px (translateY only — GPU compositing) */
  y?: number;
  as?: "div" | "section" | "li" | "span";
};

const easeOut = [0.22, 1, 0.36, 1] as const;

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
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: delay + index * 0.04, ease: easeOut }}
    >
      {children}
    </Tag>
  );
}
