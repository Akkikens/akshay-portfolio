import React from "react";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "framer-motion";

type SectionProgress = {
  /** 0→1 scroll progress of the ref through the viewport (constant 0 under reduced motion) */
  progress: MotionValue<number>;
  prefersReducedMotion: boolean;
};

/**
 * Section-scoped scroll progress for scrubbed choreography.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null);
 *   const { progress, prefersReducedMotion } = useSectionProgress(ref);
 *   const y = useTransform(progress, [0, 1], [40, -40]);
 *   <motion.div ref={ref} style={prefersReducedMotion ? undefined : { y }} />
 *
 * Under reduced motion `progress` is a constant MotionValue(0), so consumers
 * can attach useTransform unconditionally (hooks order stays stable) and
 * either get a static frame or branch on the flag — matching the established
 * `style={reduced ? undefined : {...}}` pattern.
 */
export function useSectionProgress(
  ref: React.RefObject<HTMLElement>,
  offset: any = ["start end", "end start"]
): SectionProgress {
  const prefersReducedMotion = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const staticProgress = useMotionValue(0);

  return {
    progress: prefersReducedMotion ? staticProgress : scrollYProgress,
    prefersReducedMotion,
  };
}
