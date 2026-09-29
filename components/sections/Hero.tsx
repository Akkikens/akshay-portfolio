"use client";

import { useState } from "react";
import { motion, useReducedMotion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";
import { hero } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";
import CrtStage from "@/components/worlds/CrtStage";

const REVEAL_DURATION = 0.7;

/** Load choreography offsets, in seconds. The tube boots first; the name follows. */
const CHOREO = {
  status: 0.15,
  name: 0.35,
  role: 0.7,
  tagline: 0.85,
  cta: 1.0,
} as const;

const SCROLL_CUE_DELAY = 1.8;
const SCROLL_THRESHOLD = 24;

function RiseBlock({
  children,
  delay,
  y = 22,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: REVEAL_DURATION, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/** One line of the name: rises out of a clipped box, like a line of type being printed. */
function NameLine({ text, delay }: { text: string; delay: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className="block">{text}</span>;
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "110%", rotate: 2 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/** Bottom-edge scroll cue. Fades out permanently after the first scroll. */
function ScrollCue() {
  const reduced = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > SCROLL_THRESHOLD && !hasScrolled) setHasScrolled(true);
  });

  const label = (
    <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-dim">
      {hero.scrollCue}
    </span>
  );

  if (reduced) {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-3 transition-opacity duration-500 ${
          hasScrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        {label}
        <span className="block h-7 w-px bg-line-bright" />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: hasScrolled ? 0 : 1 }}
      transition={
        hasScrolled
          ? { duration: 0.4, ease: EASE_OUT }
          : { duration: 0.6, ease: EASE_OUT, delay: SCROLL_CUE_DELAY }
      }
    >
      {label}
      <motion.span
        className="block w-px bg-line-bright"
        style={{ height: 28 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: SCROLL_CUE_DELAY + 0.15 }}
      />
    </motion.div>
  );
}

/**
 * The hero: ThreeUI's CRT terminal boots beside the name — a green-phosphor
 * agent boot log on a curved tube. The copy owns a calm zone of plain void
 * (left on desktop, bottom on narrow screens) and the tube is a secondary
 * backdrop confined to the rest of the stage, feathered into the void where
 * the two meet. All copy is server-rendered (the LCP). As the visitor
 * scrolls, the copy drifts up and fades while the tube stays put.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const copyY = useTransform(scrollY, [0, 700], [0, -80]);
  const copyOpacity = useTransform(scrollY, [0, 260, 700], [1, 0.85, 0]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100svh] w-full overflow-hidden bg-void"
    >
      {/* The tube lives beside the copy, not under it: the right 45% of the
          stage on desktop, the top of the stage on narrow screens, and it
          feathers into the void on the side that meets the text. */}
      <div aria-hidden className="hero-tube z-0">
        <CrtStage variant="terminal" poster="/posters/crt-terminal.jpg" />
        <div className="hero-tube-fade" />
      </div>

      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-6 pb-28 pt-[46svh] md:px-10 md:pb-32 lg:max-w-6xl lg:pt-32"
      >
        <RiseBlock delay={CHOREO.status} className="flex items-center gap-2.5">
          <span aria-hidden className="h-2 w-2 flex-none rounded-full bg-signal animate-pulse-dot" />
          <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em]">
            <span className="text-signal">SYSTEMS NOMINAL</span>
            <span className="text-ink-faint"> — </span>
            <span className="text-ink-dim">{hero.status}</span>
          </p>
        </RiseBlock>

        {/* The only h1 on the page. */}
        <h1
          aria-label={`${hero.firstName} ${hero.lastName}`}
          className="mt-6 font-display text-[clamp(3.25rem,10vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink"
        >
          <NameLine text={hero.firstName} delay={CHOREO.name} />
          <NameLine text={hero.lastName} delay={CHOREO.name + 0.08} />
        </h1>

        <RiseBlock delay={CHOREO.role} className="mt-6">
          <p className="font-body text-xl font-medium text-ink md:text-2xl">{hero.role}</p>
        </RiseBlock>

        <RiseBlock delay={CHOREO.tagline} className="mt-5 max-w-xl">
          <p className="text-balance font-body text-base leading-relaxed text-ink-dim md:text-lg">
            {hero.tagline}
          </p>
        </RiseBlock>

        <RiseBlock delay={CHOREO.cta} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href={hero.ctaPrimary.href} variant="solid">
            {hero.ctaPrimary.label}
          </MagneticButton>
          <MagneticButton
            href={hero.ctaSecondary.href}
            variant="ghost"
            download
            ariaLabel={`Download résumé — ${hero.ctaSecondary.label}`}
          >
            {hero.ctaSecondary.label}
          </MagneticButton>
        </RiseBlock>
      </motion.div>

      <ScrollCue />
    </section>
  );
}
