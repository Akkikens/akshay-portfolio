"use client";

import { useEffect, useId } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { EASE_OUT, SPRING_SCRUB } from "@/lib/motion";
import { apps, hero, type App } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";

const REVEAL_DURATION = 0.7;

/** Load choreography offsets, in seconds. The status line settles first; the name follows. */
const CHOREO = {
  status: 0.1,
  name: 0.25,
  role: 0.5,
  tagline: 0.6,
  cta: 0.7,
  tiles: 0.55,
} as const;

/**
 * Where each app tile floats around the hero panel (desktop), and how deep it
 * sits: deeper tiles move further with the pointer and the scroll.
 */
const TILE_LAYOUT = [
  { top: "6%", left: "8%", size: 116, depth: 1.0, rotate: -6 },
  { top: "18%", left: "58%", size: 96, depth: 0.6, rotate: 5 },
  { top: "56%", left: "18%", size: 104, depth: 0.8, rotate: 4 },
  { top: "64%", left: "64%", size: 88, depth: 0.45, rotate: -4 },
] as const;

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
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: REVEAL_DURATION, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Whosnear has no icon yet (it is a concept), so its tile draws a place pin with presence rings. */
function NearGlyph() {
  // Unique per instance: the desktop copy sits in a display:none subtree on
  // phones, and a shared id there would leave the mobile gradient unresolved.
  const gradientId = useId();
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="h-full w-full">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b8cff" />
          <stop offset="1" stopColor="#8a5cff" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill={`url(#${gradientId})`} />
      <circle cx="32" cy="36" r="20" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
      <circle cx="32" cy="36" r="13" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" />
      <path
        d="M32 17c-6 0-10.5 4.6-10.5 10.4 0 7.4 8.7 15.4 9.6 16.2a1.3 1.3 0 0 0 1.8 0c.9-.8 9.6-8.8 9.6-16.2C42.5 21.6 38 17 32 17Z"
        fill="#fff"
      />
      <circle cx="32" cy="27.5" r="3.8" fill="#6d74ff" />
    </svg>
  );
}

function TileFace({ app }: { app: App }) {
  if (app.icon) {
    return (
      <img
        src={app.icon.src}
        alt=""
        width={192}
        height={192}
        decoding="async"
        className="h-full w-full object-cover"
      />
    );
  }
  return <NearGlyph />;
}

/** One floating app tile: a glass plate holding the app icon, with its name underneath. */
function FloatingTile({
  app,
  layout,
  index,
  px,
  py,
  scrollShift,
}: {
  app: App;
  layout: (typeof TILE_LAYOUT)[number];
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  scrollShift: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const range = 22 * layout.depth;
  const x = useTransform(px, [-1, 1], [-range, range]);
  const pointerY = useTransform(py, [-1, 1], [-range, range]);
  const scrollY = useTransform(scrollShift, (v) => v * layout.depth);
  const y = useTransform([pointerY, scrollY], ([a, b]) => (a as number) + (b as number));

  return (
    <motion.a
      href="#apps"
      aria-label={`${app.name} — see it in Apps`}
      className="group absolute flex flex-col items-center gap-2"
      style={{
        top: layout.top,
        left: layout.left,
        ...(reduced ? {} : { x, y }),
      }}
      initial={reduced ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: CHOREO.tiles + index * 0.08 }}
    >
      <span
        className="hero-tile glass-panel block p-2.5"
        style={{
          width: layout.size,
          height: layout.size,
          rotate: `${layout.rotate}deg`,
          animationDelay: `${index * -2.1}s`,
        }}
      >
        <span className="block h-full w-full overflow-hidden rounded-[22%] shadow-[0_6px_18px_-8px_rgba(0,0,0,0.35)]">
          <TileFace app={app} />
        </span>
      </span>
      <span className="rounded-full px-2 text-[0.8125rem] font-medium text-ink-dim transition-colors group-hover:text-ink">
        {app.tile}
      </span>
    </motion.a>
  );
}

/** Desktop: tiles float in a field beside the panel and parallax on pointer and scroll. */
function TileField() {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, SPRING_SCRUB);
  const py = useSpring(rawY, SPRING_SCRUB);
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 800], [0, -90]);

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
    <div className="relative hidden h-[30rem] lg:block" role="list" aria-label="My apps">
      {apps.slice(0, TILE_LAYOUT.length).map((app, i) => (
        <div role="listitem" key={app.name}>
          <FloatingTile
            app={app}
            layout={TILE_LAYOUT[i]}
            index={i}
            px={px}
            py={py}
            scrollShift={scrollShift}
          />
        </div>
      ))}
    </div>
  );
}

/** Narrow screens: the same four tiles as a calm row under the panel. */
function TileRow() {
  return (
    <ul aria-label="My apps" className="grid grid-cols-4 gap-3 lg:hidden">
      {apps.slice(0, 4).map((app) => (
        <li key={app.name}>
          <a href="#apps" className="group flex flex-col items-center gap-2" aria-label={`${app.name} — see it in Apps`}>
            <span className="glass-panel block aspect-square w-full max-w-[5.5rem] !rounded-[1.4rem] p-2">
              <span className="block h-full w-full overflow-hidden rounded-[22%]">
                <TileFace app={app} />
              </span>
            </span>
            <span className="text-[0.8125rem] font-medium text-ink-dim group-hover:text-ink">{app.tile}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * The hero: a frosted panel with the name, the one-line role and the main
 * actions, beside a field of floating app tiles that drift with the pointer
 * and the scroll. All copy is server-rendered (the LCP).
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
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-6">
        <motion.div style={reduced ? undefined : { y: panelY }}>
          <RiseBlock delay={0} y={24} className="glass-strong !rounded-[1.75rem] p-7 sm:p-10 md:p-12">
            <RiseBlock delay={CHOREO.status} className="flex items-center gap-2.5">
              <span aria-hidden className="h-2 w-2 flex-none rounded-full bg-live animate-pulse-dot" />
              <p className="text-[0.8125rem] font-medium text-ink-dim">{hero.statusLine}</p>
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

            <RiseBlock delay={CHOREO.cta} className="mt-8 flex flex-wrap items-center gap-3">
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
              <span className="-ml-2 flex items-center gap-1 sm:ml-0">
                {hero.ctaLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center rounded-full px-4 text-[0.9375rem] font-medium text-ink-dim hover:text-signal"
                  >
                    {link.label}
                  </a>
                ))}
              </span>
            </RiseBlock>
          </RiseBlock>
        </motion.div>

        <TileField />
        <TileRow />
      </div>
    </section>
  );
}
