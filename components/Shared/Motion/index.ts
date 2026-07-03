/**
 * Motion kit — the single source of truth for the portfolio's animation
 * vocabulary. Every workstream imports primitives and constants from this
 * barrel instead of hand-rolling easings, springs, or reveal variants.
 *
 * PAGE-WIDE CHOREOGRAPHY RULE
 * ---------------------------
 * Every section follows the same recipe:
 *   1. ScrubSection wraps the section's INNER content wrapper (enter depth) —
 *      never the id-carrying <section> itself (ids + border-t stay static).
 *   2. SectionHeader (which uses TextReveal internally) for the heading.
 *   3. Two ParallaxBlobs at opposing `range` values for layered depth.
 *   4. Reveal (or stagger variants built from EASE_OUT) for body blocks.
 *   5. Magnetic on primary CTAs only.
 * Nothing ever animates width/height/box-shadow/filter — transform and
 * opacity only (compositor path, 60fps). All primitives are reduced-motion
 * safe and hydration-safe (no Math.random/Date.now/window in SSR render).
 */

/** Standard deceleration curve (matches Reveal's easeOut). Use for all tweens. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Spring config for all scroll-scrub smoothing (useSpring on scrollYProgress). */
export const SPRING_SCRUB = { stiffness: 120, damping: 24, restDelta: 0.001 };

/** Spring config for hover/magnetic/tap micro-interactions. */
export const SPRING_HOVER = { stiffness: 300, damping: 20, mass: 0.5 };

/** Transition for layoutId indicators (nav underlines, tab pills). */
export const INDICATOR_TRANSITION = { duration: 0.3, ease: EASE_OUT };

export { default as Reveal } from "./Reveal";
export { default as SectionHeader } from "./SectionHeader";
export { default as SectionIndex } from "./SectionIndex";
export { default as ParallaxBlob } from "./ParallaxBlob";
export { default as TextReveal } from "./TextReveal";
export { default as ScrubSection } from "./ScrubSection";
export { default as Magnetic } from "./Magnetic";
export { default as CountUp } from "./CountUp";
export { useSectionProgress } from "./useSectionProgress";
