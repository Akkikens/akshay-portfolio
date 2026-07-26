"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { sections } from "@/lib/content";

/**
 * §5.9 — TraceRail: fixed left-gutter span-marker rail (desktop only, `lg:`
 * and up — the container is max-w-6xl mx-auto, so at `lg` there's always a
 * gutter wider than this rail's footprint and it never overlaps content).
 * Vertically centered via `top-1/2 -translate-y-1/2`, sized to its own
 * content (8 markers), so it never needs to claim the full viewport height.
 *
 * Scroll-spy mirrors Nav's IntersectionObserver pattern (nearest-to-viewport-
 * top visible section wins), but maps 1:1 onto every registry entry rather
 * than collapsing to nav-only items, since every trace span gets a marker
 * here. The amber fill mirrors Experience's scroll-progress treatment, scoped
 * to the whole page via a targetless `useScroll` (its `scrollYProgress` is
 * the document's overall scroll fraction).
 */
export default function TraceRail() {
  const reduced = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const visibleTops = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleTops.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleTops.delete(entry.target.id);
          }
        });

        if (visibleTops.size === 0) return;

        const [currentId] = [...visibleTops.entries()].sort(
          (a, b) => Math.abs(a[1]) - Math.abs(b[1])
        )[0];
        setActiveId(currentId);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.5, 1] }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section trace"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative flex flex-col items-center gap-7 py-2">
        {/* base hairline track */}
        <div aria-hidden className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />

        {/* scroll-progress fill — whole-page fraction, not scoped to a section */}
        {!reduced && (
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-signal via-signal/70 to-transparent"
            style={{ scaleY: scrollYProgress, height: "100%" }}
          />
        )}

        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Jump to ${section.title}`}
              className="group relative z-10 flex items-center py-1"
            >
              <span
                aria-hidden
                className={`block h-2.5 w-2.5 rounded-full border transition-colors duration-200 ${
                  isActive
                    ? "border-signal bg-signal shadow-[0_0_10px_2px_color-mix(in_srgb,var(--color-signal)_55%,transparent)]"
                    : "border-line-bright bg-void group-hover:border-signal/60"
                }`}
              />
              <span
                aria-hidden
                className={`pointer-events-none absolute left-full ml-3 whitespace-nowrap font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition-opacity duration-200 ${
                  isActive
                    ? "text-signal opacity-100"
                    : "text-ink-dim opacity-0 group-hover:opacity-100 group-hover:text-ink"
                }`}
              >
                {String(section.index).padStart(2, "0")} — {section.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
