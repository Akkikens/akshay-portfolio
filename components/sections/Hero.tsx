"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { EASE_OUT, SPRING_SCRUB } from "@/lib/motion";
import { hero } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";

const REVEAL_DURATION = 0.7;

/** Load choreography offsets, in seconds. The status line settles first; the name follows. */
const CHOREO = {
  status: 0.1,
  name: 0.25,
  role: 0.5,
  tagline: 0.6,
  cta: 0.7,
  portrait: 0.3,
  proof: 0.8,
} as const;

function RiseBlock({
  children,
  delay,
  y = 18,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      // Position only: the copy is visible from the first paint (it is the
      // LCP), so the rise never delays Largest Contentful Paint.
      initial={{ y }}
      animate={{ y: 0 }}
      transition={{ duration: REVEAL_DURATION, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

function ProofChips({ className = "" }: { className?: string }) {
  return (
    <ul aria-label="Agent work at a glance" className={`flex flex-wrap gap-2 ${className}`}>
      {hero.proof.map((item) => (
        <li
          key={item}
          className="glass-strong !rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Desktop: the portrait in a glass mat beside the card, with the proof chips
 * resting on its lower edge. It drifts a little with the pointer and the
 * scroll for depth; still under reduced motion.
 */
function Portrait() {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, SPRING_SCRUB);
  const py = useSpring(rawY, SPRING_SCRUB);
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 800], [0, -60]);
  const x = useTransform(px, [-1, 1], [-10, 10]);
  const pointerY = useTransform(py, [-1, 1], [-10, 10]);
  const y = useTransform([pointerY, scrollShift], ([a, b]) => (a as number) + (b as number));

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, rawX, rawY]);

  return (
    <motion.div
      className="relative mx-auto hidden w-full max-w-[24rem] lg:block"
      style={reduced ? undefined : { x, y }}
      initial={reduced ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: CHOREO.portrait }}
    >
      <div className="glass-panel !rounded-[2rem] p-2.5">
        <div className="overflow-hidden rounded-[1.6rem] bg-raised">
          <img
            src={hero.portrait.src}
            width={hero.portrait.width}
            height={hero.portrait.height}
            alt={hero.portrait.alt}
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
      </div>
      <RiseBlock delay={CHOREO.proof} className="absolute -left-10 bottom-8">
        <ProofChips className="flex-col items-start" />
      </RiseBlock>
    </motion.div>
  );
}

/**
 * The hero leads with the AI agent engineering pitch: a frosted card with
 * the name, the one-line role and the main actions, beside a glass-framed
 * portrait with small proof chips. On phones the portrait sits inside the
 * card as a rounded avatar. All copy is server-rendered (the LCP).
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const panelY = useTransform(scrollY, [0, 700], [0, -40]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative w-full pb-12 pt-28 md:pb-16 md:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14">
        <motion.div style={reduced ? undefined : { y: panelY }}>
          <RiseBlock delay={0} y={24} className="glass-strong !rounded-[1.75rem] p-7 sm:p-10 md:p-12">
            <RiseBlock delay={CHOREO.status} className="flex items-center gap-3.5">
              <span className="glass-panel block h-16 w-16 flex-none !rounded-full p-1 lg:hidden">
                <img
                  src={hero.avatar.src}
                  width={hero.avatar.width}
                  height={hero.avatar.height}
                  alt={hero.portrait.alt}
                  decoding="async"
                  className="block h-full w-full rounded-full object-cover"
                />
              </span>
              <p className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink-dim">
                <span aria-hidden className="h-2 w-2 flex-none rounded-full bg-live animate-pulse-dot" />
                {hero.statusLine}
              </p>
            </RiseBlock>

            {/* The only h1 on the page. */}
            <RiseBlock delay={CHOREO.name}>
              <h1 className="mt-5 font-display text-[clamp(2.75rem,7.5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink">
                {hero.firstName} {hero.lastName}
              </h1>
            </RiseBlock>

            <RiseBlock delay={CHOREO.role} className="mt-5">
              <p className="text-balance text-[clamp(1.25rem,2.4vw,1.625rem)] font-medium leading-snug tracking-[-0.015em] text-ink">
                {hero.role}
              </p>
            </RiseBlock>

            <RiseBlock delay={CHOREO.tagline} className="mt-4 max-w-xl">
              <p className="text-pretty text-[1rem] leading-relaxed text-ink-dim md:text-[1.0625rem]">{hero.tagline}</p>
            </RiseBlock>

            <RiseBlock delay={CHOREO.cta} className="mt-8 flex flex-wrap items-center gap-2.5">
              <MagneticButton href={hero.ctaPrimary.href} variant="solid">
                {hero.ctaPrimary.label}
              </MagneticButton>
              <MagneticButton
                href={hero.ctaSecondary.href}
                variant="ghost"
                download
                ariaLabel={`Download résumé (${hero.ctaSecondary.label})`}
              >
                {hero.ctaSecondary.label}
              </MagneticButton>
              <span className="-ml-2 flex items-center gap-1 sm:ml-0">
                {hero.ctaLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center rounded-full px-3 text-[0.9375rem] font-medium text-ink-dim hover:text-signal"
                  >
                    {link.label}
                  </a>
                ))}
              </span>
            </RiseBlock>

            <RiseBlock delay={CHOREO.proof} className="mt-7 lg:hidden">
              <ProofChips />
            </RiseBlock>
          </RiseBlock>
        </motion.div>

        <Portrait />
      </div>
    </section>
  );
}
