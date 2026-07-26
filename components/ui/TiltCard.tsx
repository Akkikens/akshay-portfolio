"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { SPRING_HOVER } from "@/lib/motion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Glass panel with pointer-tracked 3D perspective tilt (max 6°) and a
 * signal-tinted specular highlight following the cursor. Disabled for touch
 * and reduced motion — falls back to a plain glass panel.
 */
export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, SPRING_HOVER);
  const sry = useSpring(ry, SPRING_HOVER);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  // MotionTemplate keeps the gradient bound to the live motion values —
  // reading .get() in a plain style string would freeze the glow at the
  // pointer-enter position (values update without re-rendering).
  const glowBackground = useMotionTemplate`radial-gradient(320px circle at ${glowX}% ${glowY}%, rgba(255,178,36,0.07), transparent 65%)`;

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 12); // max 6° each way
    rx.set((0.5 - py) * 12);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
    setHovering(false);
  };

  if (reduced) {
    return <div className={`glass-panel ${className}`}>{children}</div>;
  }

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={onPointerLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className={`glass-panel relative transition-[border-color] duration-200 ${
          hovering ? "border-line-bright" : ""
        } ${className}`}
      >
        {hovering ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: glowBackground }}
          />
        ) : null}
        {children}
      </motion.div>
    </div>
  );
}
