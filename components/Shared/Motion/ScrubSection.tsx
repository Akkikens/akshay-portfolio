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
 * rises, fades in, and settles to full scale — scrubbed to scroll position
 * (not time), spring-smoothed for the Lenis glide.
 *
 * Usage (INNER wrapper only — never the id-carrying <section>, whose id,
 * border-t, and layout must stay static for nav anchors):
 *   <section id="aboutSection">
 *     <ScrubSection className="...">{content}</ScrubSection>
 *   </section>
 *
 * transform/opacity only; plain div under reduced motion.
 */
export default function ScrubSection({ children, className }: ScrubSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.25"],
  });
  const p = useSpring(scrollYProgress, SPRING_SCRUB);
  const y = useTransform(p, [0, 1], [48, 0]);
  const opacity = useTransform(p, [0, 0.6], [0.4, 1]);
  const scale = useTransform(p, [0, 1], [0.985, 1]);

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
