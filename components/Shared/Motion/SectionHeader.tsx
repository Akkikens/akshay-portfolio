import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionIndex from "./SectionIndex";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";
import { EASE_OUT } from "./index";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: string;
  className?: string;
  align?: "left" | "center";
};

/**
 * Unified section header: mono kicker (number + eyebrow + scrubbed hairline)
 * over a large tight-tracked title with a word-level masked rise.
 * One look across all sections.
 */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  className,
  align = "left",
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const centered = align === "center";
  const hairlineClasses =
    "h-px w-24 bg-gradient-to-r from-AAsecondary/50 to-transparent origin-left";

  return (
    <div className={className}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <SectionIndex className="font-mono text-AAsecondary text-sm font-semibold">
            {index}
          </SectionIndex>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-AAsubtext/60">
            {eyebrow}
          </span>
          {!centered &&
            (prefersReducedMotion ? (
              <span aria-hidden="true" className={hairlineClasses} />
            ) : (
              <motion.span
                aria-hidden="true"
                className={hairlineClasses}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
              />
            ))}
        </div>
      </Reveal>
      <TextReveal
        as="h2"
        text={title}
        align={align}
        className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-AAtext"
      />
    </div>
  );
}
