import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMagneticEffect } from "../../../hooks/useMagneticEffect";
import { SPRING_HOVER } from "./index";

type MagneticProps = {
  children: React.ReactNode;
  /** Pull strength: fraction of cursor distance from center (0.15–0.3 feels right) */
  strength?: number;
  className?: string;
};

/**
 * Magnetic hover wrapper for primary CTAs — the element leans toward the
 * cursor and springs back on leave, with a subtle hover/tap scale.
 *
 * Usage: <Magnetic><button>View Resume</button></Magnetic>
 *
 * Wraps hooks/useMagneticEffect; fully inert under reduced motion.
 */
export default function Magnetic({
  children,
  strength = 0.2,
  className,
}: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, x, y } = useMagneticEffect({
    strength,
    disabled: !!prefersReducedMotion,
  });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`inline-block ${className ?? ""}`}
      style={prefersReducedMotion ? undefined : { x, y }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      transition={SPRING_HOVER}
    >
      {children}
    </motion.div>
  );
}
