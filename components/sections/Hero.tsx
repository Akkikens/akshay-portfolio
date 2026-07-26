"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";
import { hero } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";
import ConstellationFallback, { useCanRender3D } from "@/components/three/ConstellationFallback";

/**
 * The signature WebGL scene is heavy (three + R3F). Load it only on the
 * client, and only once we know it's worth it — `useCanRender3D` gates the
 * decision to even fetch the chunk; this dynamic wrapper's `loading` state
 * covers the gap between "worth it" and "chunk has arrived".
 */
const AgentConstellation = dynamic(() => import("@/components/three/AgentConstellation"), {
  ssr: false,
  loading: () => <ConstellationFallback className="absolute inset-0 z-0" />,
});

/** Mount-triggered reveal (not scroll-triggered — this fires once on load). */
const REVEAL_DURATION = 0.6;

/** Load choreography offsets, in seconds — see SPEC.md §5.2. */
const CHOREO = {
  status: 0,
  nameLine1: 0.08,
  nameLine2: 0.14,
  role: 0.2,
  tagline: 0.45,
  cta: 0.8,
} as const;

const SCROLL_CUE_DELAY = 1.5;
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

/** Same as RiseBlock but renders an inline <span> — used for the two name lines inside the single h1. */
function RiseLine({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: REVEAL_DURATION, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.span>
  );
}

/** Bottom-edge "scroll to inspect trace" cue. Fades out permanently after the first scroll. */
function ScrollCue() {
  const reduced = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > SCROLL_THRESHOLD && !hasScrolled) setHasScrolled(true);
  });

  if (reduced) {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 transition-opacity duration-500 md:bottom-10 ${
          hasScrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-ink-faint">
          {hero.scrollCue}
        </span>
        <span className="block h-7 w-px bg-line-bright" />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 md:bottom-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: hasScrolled ? 0 : 1 }}
      transition={
        hasScrolled
          ? { duration: 0.4, ease: EASE_OUT }
          : { duration: 0.6, ease: EASE_OUT, delay: SCROLL_CUE_DELAY }
      }
    >
      <span className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-ink-faint">
        {hero.scrollCue}
      </span>
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
 * Full-viewport mission-control stage. AgentConstellation renders as an
 * absolute background layer; all text content is server-rendered (this is
 * the page's LCP) and sits above it, anchored to the lower half with a
 * bottom-left vignette for contrast. `useCanRender3D` decides up front
 * whether the WebGL chunk is even worth fetching — reduced-motion / no-WebGL
 * visitors get the static fallback directly, never the three.js bundle.
 */
export default function Hero() {
  const canRender3D = useCanRender3D();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-void"
    >
      {canRender3D ? (
        <AgentConstellation className="absolute inset-0 z-0" />
      ) : (
        <ConstellationFallback className="absolute inset-0 z-0" />
      )}

      {/* Bottom-left vignette so hero text stays legible over the constellation. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 6% 100%, color-mix(in srgb, var(--color-void) 90%, transparent) 0%, transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-end px-6 pb-28 pt-32 md:px-10 md:pb-36">
        <RiseBlock delay={CHOREO.status} className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2 w-2 flex-none rounded-full bg-signal animate-pulse-dot"
          />
          <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em]">
            <span className="text-signal">SYSTEMS NOMINAL</span>
            <span className="text-ink-faint"> — </span>
            <span className="text-ink-dim">{hero.status}</span>
          </p>
        </RiseBlock>

        {/* The only h1 on the page — both name lines live inside it. */}
        <h1 className="mt-6 font-display text-[clamp(3.5rem,10vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink text-balance">
          <RiseLine delay={CHOREO.nameLine1} className="block">
            {hero.firstName}
          </RiseLine>
          <RiseLine delay={CHOREO.nameLine2} className="block">
            {hero.lastName}
          </RiseLine>
        </h1>

        <RiseBlock delay={CHOREO.role} className="mt-6">
          <p className="font-body text-xl font-medium text-ink-dim md:text-2xl">{hero.role}</p>
        </RiseBlock>

        <RiseBlock delay={CHOREO.tagline} className="mt-6 max-w-xl">
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
      </div>

      <ScrollCue />
    </section>
  );
}
