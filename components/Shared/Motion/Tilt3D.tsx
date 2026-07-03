import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { SPRING_HOVER } from "./index";

type Tilt3DProps = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees */
  maxTilt?: number;
  /** Perspective distance in px — lower = more dramatic */
  perspective?: number;
  /** Subtle scale-up + lift toward the viewer on hover */
  lift?: boolean;
};

/**
 * Mouse-driven 3D perspective tilt (Apple product-card effect): the element
 * leans toward the cursor position with a glossy specular highlight that
 * tracks the same point. Springs back to flat on mouse-leave.
 *
 * transform-only (rotateX/rotateY/scale via CSS 3D transforms — compositor
 * path). Deliberately NOT using `transform-style: preserve-3d` — stacked
 * with `perspective` it renders fully blank on software-rasterized browsers
 * (no GPU compositing for 3D layers). A single transformed layer with
 * perspective on its static parent gets the same tilt with zero risk.
 * No-op under prefers-reduced-motion and effectively inert on touch (no
 * mousemove events fire).
 */
export default function Tilt3D({
  children,
  className,
  maxTilt = 10,
  perspective = 900,
  lift = true,
}: Tilt3DProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const springX = useSpring(mvX, SPRING_HOVER);
  const springY = useSpring(mvY, SPRING_HOVER);

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);
  const scale = useSpring(1, SPRING_HOVER);
  const glowX = useTransform(springX, (v) => `${v * 100}%`);
  const glowY = useTransform(springY, (v) => `${v * 100}%`);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]: string[]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.12), transparent 60%)`
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((e.clientX - rect.left) / rect.width);
    mvY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mvX.set(0.5);
    mvY.set(0.5);
    if (lift) scale.set(1);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={() => lift && scale.set(1.02)}
      onMouseLeave={handleLeave}
      style={{ perspective }}
    >
      <motion.div style={{ rotateX, rotateY, scale }} className="relative">
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glowBackground }}
        />
      </motion.div>
    </div>
  );
}
