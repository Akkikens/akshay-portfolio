import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./index";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Delay (s) before the word stagger begins */
  delayChildren?: number;
  align?: "left" | "center";
};

const parentVariants = (delayChildren: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren } },
});

const wordVariants = {
  hidden: { y: "110%" },
  show: { y: "0%" },
};

/**
 * Word-level masked rise for headings — each word slides up out of an
 * overflow-hidden clip on viewport entry (Apple-style headline reveal).
 *
 * Usage: <TextReveal as="h2" text="What I build" className="text-3xl ..." />
 *
 * Deterministic `text.split(' ')` keeps SSR/client markup identical
 * (hydration-safe). Screen readers get the full sentence via aria-label;
 * the word spans are aria-hidden. Reduced motion renders the plain tag.
 */
export default function TextReveal({
  text,
  className,
  as = "h2",
  delayChildren = 0.1,
  align = "left",
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const alignClass = align === "center" ? "text-center" : "";
  const fullClassName = [className, alignClass].filter(Boolean).join(" ");

  if (prefersReducedMotion) {
    const Plain = as;
    return <Plain className={fullClassName}>{text}</Plain>;
  }

  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      aria-label={text}
      className={fullClassName}
      variants={parentVariants(delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={wordVariants}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </Tag>
  );
}
