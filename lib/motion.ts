/** House motion tokens — every animated component uses these, no ad-hoc curves. */

/** easeOutQuart-ish. The house ease for reveals and sweeps. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Scroll-scrub smoothing (film section, progress rails). */
export const SPRING_SCRUB = { stiffness: 120, damping: 24, restDelta: 0.001 };

/** Hover/magnetic spring. */
export const SPRING_HOVER = { stiffness: 300, damping: 20, mass: 0.5 };

/** Standard reveal variants: rise + fade. */
export const reveal = (delay = 0, y = 24) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay },
  },
});
