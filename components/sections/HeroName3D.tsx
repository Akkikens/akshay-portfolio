"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type HeroName3DProps = {
  firstName: string;
  lastName: string;
  /** The hero section — scroll progress across its own height drives the recede-into-depth effect. */
  scrollRef: React.RefObject<HTMLElement | null>;
};

const ENTRANCE_DURATION = 0.9;
const ENTRANCE_STAGGER = 0.022;
/** Aligns with Hero.tsx's CHOREO.nameLine1 — the name starts right after the status line. */
const ENTRANCE_BASE_DELAY = 0.08;

/** Deterministic pseudo-random in [0,1) — SSR/CSR must agree, so no Math.random() here. */
function hash(seed: number): number {
  const x = Math.sin(seed * 999.7) * 10000;
  return x - Math.floor(x);
}

function toLetters(word: string) {
  return word.split("").map((char, i) => ({ char: char === " " ? " " : char, i }));
}

/**
 * The hero's signature move. Three layered 3D systems, composed from outside in:
 *  - h1 (outer): idle mouse parallax — a slow holographic tilt toward the cursor.
 *  - each line ("Akshay" / "Kalapgar"): scroll-driven recede-into-depth — the two
 *    words separate onto different Z-planes as you scroll, like Apple's product
 *    pages, rather than moving as one flat card.
 *  - each letter (innermost): a one-time 3D materialization on mount — letters
 *    fly in from depth with a per-letter tumble, staggered left to right.
 *
 * Reduced motion: skips straight to the flat, fully-settled two-line heading —
 * no 3D, no parallax, no scroll transform.
 */
export default function HeroName3D({ firstName, lastName, scrollRef }: HeroName3DProps) {
  const reduced = useReducedMotion();
  const line1 = useMemo(() => toLetters(firstName), [firstName]);
  const line2 = useMemo(() => toLetters(lastName), [lastName]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  // Each word recedes onto its own depth plane at a different rate — the
  // separation itself is what reads as "3D" rather than a flat parallax card.
  const line1RotateX = useTransform(progress, [0, 1], [0, 52]);
  const line1Z = useTransform(progress, [0, 1], [0, -620]);
  const line1Scale = useTransform(progress, [0, 1], [1, 0.8]);

  const line2RotateX = useTransform(progress, [0, 1], [0, 68]);
  const line2Z = useTransform(progress, [0, 1], [0, -900]);
  const line2Scale = useTransform(progress, [0, 1], [1, 0.7]);

  const opacity = useTransform(progress, [0, 0.65, 1], [1, 0.55, 0]);
  const blurPx = useTransform(progress, [0, 1], [0, 8]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  // Idle mouse parallax — a slow "holographic sign" tilt, fine pointers only.
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 40, damping: 12 });
  const tiltY = useSpring(rawTiltY, { stiffness: 40, damping: 12 });

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      rawTiltY.set(nx * 5);
      rawTiltX.set(-ny * 3);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, rawTiltX, rawTiltY]);

  const headingClass =
    "mt-6 font-display text-[clamp(3.5rem,10vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink";

  if (reduced) {
    return (
      <h1 className={`${headingClass} text-balance`}>
        <span className="block">{firstName}</span>
        <span className="block">{lastName}</span>
      </h1>
    );
  }

  let globalIndex = 0;

  return (
    <div style={{ perspective: 1400 }}>
      <motion.h1
        aria-label={`${firstName} ${lastName}`}
        className={headingClass}
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
      >
        <motion.span
          aria-hidden
          className="block"
          style={{
            rotateX: line1RotateX,
            z: line1Z,
            scale: line1Scale,
            opacity,
            filter,
            transformStyle: "preserve-3d",
          }}
        >
          {line1.map(({ char, i }) => {
            const idx = globalIndex++;
            const wobble = (hash(i + 1) - 0.5) * 46;
            return (
              <motion.span
                key={`l1-${i}`}
                className="inline-block"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, z: -520, rotateX: -62, rotateY: wobble, scale: 0.4 }}
                animate={{ opacity: 1, z: 0, rotateX: 0, rotateY: 0, scale: 1 }}
                transition={{
                  duration: ENTRANCE_DURATION,
                  ease: EASE_OUT,
                  delay: ENTRANCE_BASE_DELAY + idx * ENTRANCE_STAGGER,
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </motion.span>

        <motion.span
          aria-hidden
          className="block"
          style={{
            rotateX: line2RotateX,
            z: line2Z,
            scale: line2Scale,
            opacity,
            filter,
            transformStyle: "preserve-3d",
          }}
        >
          {line2.map(({ char, i }) => {
            const idx = globalIndex++;
            const wobble = (hash(i + 97) - 0.5) * 46;
            return (
              <motion.span
                key={`l2-${i}`}
                className="inline-block"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, z: -520, rotateX: -62, rotateY: wobble, scale: 0.4 }}
                animate={{ opacity: 1, z: 0, rotateX: 0, rotateY: 0, scale: 1 }}
                transition={{
                  duration: ENTRANCE_DURATION,
                  ease: EASE_OUT,
                  delay: ENTRANCE_BASE_DELAY + idx * ENTRANCE_STAGGER,
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </motion.span>
      </motion.h1>
    </div>
  );
}
