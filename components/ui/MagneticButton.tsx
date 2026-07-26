"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { SPRING_HOVER } from "@/lib/motion";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  download?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * CTA with magnetic cursor pull (desktop fine pointers only, ≤8px) and press
 * scale. Solid = amber signal; ghost = hairline outline. Inert under reduced
 * motion and on touch.
 */
export default function MagneticButton({
  href,
  children,
  variant = "solid",
  download,
  external,
  className = "",
  ariaLabel,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_HOVER);
  const sy = useSpring(y, SPRING_HOVER);

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    // Fine-pointer check: touch fires no mousemove stream worth chasing
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-8, Math.min(8, dx * 0.15)));
    y.set(Math.max(-8, Math.min(8, dy * 0.15)));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles =
    variant === "solid"
      ? "bg-signal text-void hover:bg-signal-bright font-semibold"
      : "border border-line text-ink hover:border-signal hover:text-signal-bright font-medium";

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={reduced ? undefined : { x: sx, y: sy }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-6 py-3 text-[0.9375rem] ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
