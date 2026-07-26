import React, { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./index";

type CountUpProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Decimal places in the animated + final value (default 0) */
  decimals?: number;
  className?: string;
  /** Custom number formatter — overrides the default toLocaleString/toFixed */
  format?: (v: number) => string;
};

/**
 * Stat number that counts up from 0 when scrolled into view.
 *
 * Usage: <CountUp value={99.9} decimals={1} suffix="%" />
 *
 * HYDRATION CONTRACT: SSR and the initial client render output the FINAL
 * formatted string (e.g. "99.9%"), so static export shows real numbers and
 * hydration never mismatches. The count-up runs once on viewport entry by
 * writing span.textContent directly (no re-renders). Reduced motion (or no
 * JS) simply keeps the static final value.
 */
export default function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  format,
}: CountUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  const formatNumber =
    format ??
    ((v: number) =>
      decimals === 0
        ? Math.round(v).toLocaleString("en-US")
        : v.toFixed(decimals));

  const finalText = prefix + formatNumber(value) + suffix;

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration: 1.2,
      ease: EASE_OUT,
      onUpdate: (v) => {
        node.textContent = prefix + formatNumber(v) + suffix;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, prefersReducedMotion, value, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {finalText}
    </span>
  );
}
