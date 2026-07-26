"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { jobs, sectionById, type Job } from "@/lib/content";
import { EASE_OUT, SPRING_SCRUB } from "@/lib/motion";

const section = sectionById("experience");

/**
 * framer-motion's whileInView color interpolation needs literal, parseable
 * color values — it cannot resolve `var(--color-*)` the way plain CSS does.
 * These mirror the exact token values in app/globals.css (not invented).
 */
const RAIL_LINE_BRIGHT = "rgba(237, 234, 226, 0.18)"; // --color-line-bright
const RAIL_SIGNAL = "#FFB224"; // --color-signal

/** Chevron that rotates 180deg when the span's detail panel is open. */
function ChevronIcon({ expanded, reducedMotion }: { expanded: boolean; reducedMotion: boolean }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0 text-ink-dim"
      animate={{ rotate: expanded ? 180 : 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.25, ease: EASE_OUT }}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

/** Trace-rail node: hollow amber ring that fills in once its span scrolls into view. */
function TimelineNode({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) {
    return (
      <span className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-signal bg-void">
        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      </span>
    );
  }

  return (
    <motion.span
      className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 bg-void"
      initial={{ borderColor: RAIL_LINE_BRIGHT }}
      whileInView={{ borderColor: RAIL_SIGNAL }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-signal"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.15 }}
      />
    </motion.span>
  );
}

type JobRowProps = {
  job: Job;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
};

/** One span row: rail node + card (company/role/period header, expandable bullets). */
function JobRow({ job, index, expanded, onToggle, reducedMotion }: JobRowProps) {
  const panelId = `experience-panel-${index}`;
  const buttonId = `experience-toggle-${index}`;

  return (
    <div className="relative grid grid-cols-[18px_1fr] gap-5 md:gap-8">
      <div className="relative flex justify-center pt-8">
        <TimelineNode reducedMotion={reducedMotion} />
      </div>

      <div className="glass-panel overflow-hidden rounded-2xl">
        <div className="flex flex-col gap-3 px-6 pb-5 pt-6 md:px-8 md:pt-7">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-ink">
              {job.url ? (
                <a href={job.url} target="_blank" rel="noopener noreferrer" className="link-sweep">
                  {job.company}
                </a>
              ) : (
                job.company
              )}
            </h3>
            <span className="inline-flex items-center whitespace-nowrap rounded-full border border-line px-3 py-1 font-mono text-[0.75rem] font-medium uppercase tracking-[0.1em] text-ink-dim">
              {job.period}
            </span>
          </div>
          <p className="text-[0.9375rem] text-ink-dim">
            {job.title}{" "}
            <span aria-hidden className="mx-1 text-ink-faint">
              ·
            </span>{" "}
            <span className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-ink-faint">
              {job.location}
            </span>
          </p>
        </div>

        <button
          type="button"
          id={buttonId}
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-3 border-t border-line px-6 py-3 text-left font-mono text-[0.75rem] font-medium uppercase tracking-[0.1em] text-ink-faint transition-colors hover:text-signal md:px-8"
        >
          <span>{expanded ? "Hide trace detail" : "Show trace detail"}</span>
          <ChevronIcon expanded={expanded} reducedMotion={reducedMotion} />
        </button>

        <motion.div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          // height:0 clips visually but leaves the bullets in the a11y tree,
          // contradicting aria-expanded=false — inert removes them from both
          // the accessibility tree and the focus order while collapsed.
          inert={!expanded}
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE_OUT }}
          className="overflow-hidden"
        >
          <ul className="space-y-2.5 px-6 pb-6 pt-4 md:px-8">
            {job.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-dim">
                <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-signal/70" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

/** §5.5 — the trace timeline: career history as a literal agent trace. */
export default function Experience() {
  const reducedMotion = Boolean(useReducedMotion());
  const timelineRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<boolean[]>(() => jobs.map((_, i) => i === 0));

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, SPRING_SCRUB);
  const headTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  const toggle = (index: number) => {
    setExpanded((prev) => prev.map((value, i) => (i === index ? !value : value)));
  };

  return (
    <Section id={section.id} index={section.index} label={section.label} title={section.title} annotation={section.annotation}>
      <div ref={timelineRef} className="relative">
        {/* base hairline rail */}
        <div aria-hidden className="absolute bottom-0 left-[9px] top-0 w-px bg-line" />

        {!reducedMotion && (
          <>
            {/* amber fill tracking scroll progress through the timeline */}
            <motion.div
              aria-hidden
              className="absolute left-[9px] top-0 w-px origin-top bg-gradient-to-b from-signal via-signal/70 to-transparent"
              style={{ scaleY: progress, height: "100%" }}
            />
            {/* glowing head marking current scroll position */}
            <motion.div
              aria-hidden
              className="absolute left-[9px] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_14px_3px_color-mix(in_srgb,var(--color-signal)_55%,transparent)]"
              style={{ top: headTop }}
            />
          </>
        )}

        <div className="flex flex-col gap-10 md:gap-12">
          {jobs.map((job, index) => (
            <Reveal key={job.company} delay={Math.min(index, 3) * 0.05} y={20}>
              <JobRow
                job={job}
                index={index}
                expanded={expanded[index]}
                onToggle={() => toggle(index)}
                reducedMotion={reducedMotion}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
