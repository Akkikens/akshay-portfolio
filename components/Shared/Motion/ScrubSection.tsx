import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { SPRING_SCRUB } from "./index";

type ScrubSectionProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Section-entry depth scrub: as a section scrolls into view its content
 * rises out of a slight 3D recede — perspective-tilted back and scaled
 * down — and settles flat, scrubbed to scroll position (not time),
 * spring-smoothed for the Lenis glide. This is the "surfaces rotating
 * into place" moment that reads as dimensional depth rather than a flat
 * fade/rise.
 *
 * Usage (INNER wrapper only — never the id-carrying <section>, whose id,
 * border-t, and layout must stay static for nav anchors):
 *   <section id="aboutSection">
 *     <ScrubSection className="...">{content}</ScrubSection>
 *   </section>
 *
 * transform/opacity only (rotateX/scale/translateY are compositor-path CSS
 * 3D transforms); plain div under reduced motion.
 */
export default function ScrubSection({ children, className }: ScrubSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const p = useSpring(scrollYProgress, SPRING_SCRUB);
  const y = useTransform(p, [0, 1], [72, 0]);
  const opacity = useTransform(p, [0, 0.55], [0, 1]);
  const scale = useTransform(p, [0, 1], [0.92, 1]);

  // Note: rotateX + perspective/preserve-3d were tried here for a "tilting
  // into place" depth effect, but combined 3D transforms render fully blank
  // on software-rasterized browsers (no GPU compositing for 3D). Scale+y+
  // opacity gets ~90% of the perceived depth with zero rendering risk.
  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReducedMotion ? undefined : { y, opacity, scale }}
    >
      {children}
    </motion.div>
  );
}
