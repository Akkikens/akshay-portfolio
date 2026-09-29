"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { film, sectionById } from "@/lib/content";
import { SPRING_SCRUB } from "@/lib/motion";

/**
 * "How I work" — the scroll-scrubbed film section (SPEC §5.12).
 *
 * Ported faithfully from legacy/components/Home/CinematicScrub/CinematicScrub.tsx
 * (v1) with an amber-phosphor restyle of the chrome. The mechanics — sticky
 * pin, spring-smoothed scrub, seek guards, IO preload, live matchMedia
 * variant switch, phase windows — are preserved exactly; only the colors,
 * glow, and shadows change.
 *
 * Three render paths, chosen once the component has mounted on the client
 * (matchMedia + prefers-reduced-motion both need `window`, so nothing
 * renders until after hydration — the render path is inherently client-only):
 *
 *  - reduced motion  → static stacked headings over the poster, no video.
 *  - mobile (≤768px) → normal-height section, autoplaying muted/loop video,
 *                       phases stacked in normal flow. No pin, no scrub — a
 *                       full-viewport <video> can eat the scroll gesture on
 *                       iOS Safari, and a scroll-jacked stage reads as a
 *                       frozen page on a phone.
 *  - desktop         → sticky-pinned stage; scroll position scrubs the
 *                       video's `currentTime` frame-by-frame.
 *
 * The mobile check is LIVE (matchMedia + change listener): a page loaded in
 * a narrow window (split screen, devtools open) must swap to the desktop
 * scrub when the window is maximized — a one-shot check would lock a
 * visitor into the wrong layout for the whole session.
 */

const filmSection = sectionById("film");
const TRACE_LABEL = `TRACE ${String(filmSection.index).padStart(3, "0")} — ${filmSection.label}`;

// Each phase owns a window of (spring-smoothed) scroll progress:
// [fadeInStart, hold..., fadeOutEnd]. Phase 1 is already visible at p=0 —
// while the stage is still scrolling into view the film reads as a titled
// scene, never an empty band.
const PHASE_WINDOWS: Array<[number, number, number, number]> = [
  [0, 0.001, 0.26, 0.34],
  [0.36, 0.44, 0.6, 0.68],
  [0.7, 0.78, 0.94, 1.0],
];

/** Small mono trace marker over the stage, shared by all three render paths. */
function FilmEyebrow() {
  return (
    <div className="pointer-events-none absolute left-4 top-4 z-20 sm:left-6 sm:top-6 md:left-10 md:top-10">
      <p className="span-label [text-shadow:0_2px_12px_rgba(2,4,10,0.9)]">{TRACE_LABEL}</p>
    </div>
  );
}

/** Amber-tinted fallback painted in place of the video on decode/load error. */
function VideoFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,178,36,0.14),transparent_60%),linear-gradient(180deg,var(--color-raised),var(--color-void))]"
    />
  );
}

function Phase({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const [a, b, c, d] = PHASE_WINDOWS[index];
  // Phase 1 is pre-shown (opaque at p=0) so the entering stage never reads
  // as an empty viewport before the pin engages.
  const first = index === 0;
  const opacity = useTransform(progress, [a, b, c, d], [first ? 1 : 0, 1, 1, 0]);
  const y = useTransform(progress, [a, b, c, d], [first ? 0 : 48, 0, 0, -48]);
  const { title, sub } = film.phases[index];
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity, y }}
    >
      <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-tight tracking-[-0.02em] text-ink [text-shadow:0_2px_24px_rgba(2,4,10,0.8)]">
        {title}
      </h2>
      <p className="span-label mt-4 [text-shadow:0_1px_12px_rgba(2,4,10,0.9)]">{sub}</p>
    </motion.div>
  );
}

/** Reduced motion: static passage, poster as a still backdrop, no video. */
function StaticFilmBody() {
  const [posterOk, setPosterOk] = useState(true);
  return (
    <>
      <FilmEyebrow />
      {posterOk ? (
        <img
          src={film.poster}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          onError={() => setPosterOk(false)}
        />
      ) : (
        <VideoFallback />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,12,0.5),rgba(4,6,12,0.12)_30%,rgba(4,6,12,0.12)_70%,rgba(4,6,12,0.6))]"
      />
      <div className="relative z-10 mx-auto max-w-[900px] space-y-16 text-center">
        {film.phases.map(({ title, sub }) => (
          <div key={title}>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-ink sm:text-5xl">
              {title}
            </h2>
            <p className="span-label mt-3">{sub}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * Mobile: one normal-height section, no pin, no scrub. The film loops as a
 * decorative background (pointer-events:none so touch always reaches page
 * scroll); statements stacked over it in normal flow.
 */
function MobileFilmBody() {
  const [videoOk, setVideoOk] = useState(true);
  return (
    <>
      <FilmEyebrow />
      {videoOk ? (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src={film.mobileSrc}
          poster={film.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoOk(false)}
        />
      ) : (
        <VideoFallback />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,12,0.55),rgba(4,6,12,0.3)_50%,rgba(4,6,12,0.65))]"
      />
      <div className="relative z-10 mx-auto w-full max-w-[600px] space-y-14 text-center">
        {film.phases.map(({ title, sub }) => (
          <div key={title}>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-ink [text-shadow:0_2px_24px_rgba(4,6,12,0.9)]">
              {title}
            </h2>
            <p className="span-label mt-3 [text-shadow:0_1px_12px_rgba(4,6,12,0.95)]">{sub}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/** Desktop: 280vh sticky stage, scroll scrubs the film frame-by-frame.
 * The 280vh section element itself lives in Film() — this body receives its
 * ref for useScroll targeting and IO observation. */
function DesktopScrubBody({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadKickedRef = useRef(false);
  const [videoOk, setVideoOk] = useState(true);
  const [inView, setInView] = useState(false);

  // Refs must already exist when this hook mounts — that's why useScroll
  // lives only inside this desktop-only child, never in the top-level Film.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, SPRING_SCRUB);

  // Full brightness throughout the pin; only a gentle dim on exit. (An entry
  // dim here reads as a dead viewport while the stage scrolls in.)
  const stageOpacity = useTransform(scrollYProgress, [0.94, 1], [1, 0.75]);

  // 3D screen entrance: the film starts as a tilted, glowing "screen"
  // floating in perspective space, then expands + flattens to full-bleed
  // over the first ~22% of the pin — so the section ARRIVES instead of
  // fading in as wallpaper.
  const frameScale = useTransform(scrollYProgress, [0, 0.22], [0.7, 1]);
  const frameRotateX = useTransform(scrollYProgress, [0, 0.22], [13, 0]);
  const frameY = useTransform(scrollYProgress, [0, 0.22], [56, 0]);
  const frameRadius = useTransform(scrollYProgress, [0, 0.22], [28, 0]);
  const glow = useTransform(scrollYProgress, [0, 0.18, 0.24], [1, 1, 0]);
  const frameShadow = useTransform(
    glow,
    (g) =>
      `0 60px 140px rgba(2,4,10,${0.75 * g}), 0 0 110px rgba(255,178,36,${0.35 * g}), 0 0 0 1px rgba(237,234,226,${0.25 * g})`
  );

  // Scrub: scroll progress → video timeline. Guarded so offscreen scroll
  // (spring settling) never touches the decoder. 1/30 threshold = the
  // video's frame interval; a finer threshold would issue seeks that land
  // on the same frame.
  useMotionValueEvent(progress, "change", (p) => {
    const video = videoRef.current;
    if (!video || !inView) return;
    if (video.readyState < 1 || !video.duration) return;
    const t = Math.min(Math.max(p, 0), 1) * (video.duration - 0.05);
    if (Math.abs(video.currentTime - t) > 1 / 30) video.currentTime = t;
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        // First approach: start fetching the film so it's buffered by the
        // time the pin engages (deferred from page load to protect LCP).
        if (entry.isIntersecting && !loadKickedRef.current) {
          loadKickedRef.current = true;
          const video = videoRef.current;
          if (video) {
            video.preload = "auto";
            video.load();
          }
        }
      },
      // Start loading one viewport early so the buffer wins the race
      // against the user's scroll.
      { rootMargin: "100% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden bg-void"
        style={{ opacity: stageOpacity, perspective: 1200 }}
      >
        <FilmEyebrow />

        {/* Ambient amber stage light behind the floating screen (fades as it docks) */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_center,rgba(255,178,36,0.16),transparent_70%)]"
          style={{ opacity: glow }}
        />

        {/* The screen: tilted floating card → full-bleed film */}
        <motion.div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{
            scale: frameScale,
            rotateX: frameRotateX,
            y: frameY,
            borderRadius: frameRadius,
            boxShadow: frameShadow,
            transformOrigin: "center 62%",
          }}
        >
          {videoOk ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={film.desktopSrc}
              poster={film.poster}
              muted
              playsInline
              preload="none"
              aria-hidden="true"
              onError={() => setVideoOk(false)}
            />
          ) : (
            <VideoFallback />
          )}

          {/* Legibility scrim — deep at edges, open in the middle */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,12,0.5),rgba(4,6,12,0.12)_30%,rgba(4,6,12,0.12)_70%,rgba(4,6,12,0.6))]"
          />

          {/* Narrative phases */}
          {film.phases.map((phase, i) => (
            <Phase key={phase.title} progress={progress} index={i} />
          ))}

          {/* Playhead hairline — the scrub position, like a film timeline */}
          <div className="absolute bottom-10 left-1/2 h-px w-40 -translate-x-1/2 bg-ink/15">
            <motion.div className="h-full origin-left bg-signal" style={{ scaleX: progress }} />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

/** Per-variant classes for the persistent section wrapper. */
const SECTION_CLASS = {
  // Pre-mount (SSR/first paint): reserve the desktop scrub's 280vh on md+ so
  // the post-hydration swap to "desktop" does NOT change the section's height
  // — without this, every section below Film shifted down ~1000+px right
  // after load. On mobile it stays content-sized (close to the mobile
  // variant's min-h-screen). Reduced-motion desktop visitors get one collapse
  // to content height at hydration — the rare case, traded for zero shift in
  // the common one.
  ssr: "relative overflow-hidden bg-void px-6 py-28 md:py-40 md:h-[280vh]",
  static: "relative overflow-hidden bg-void px-6 py-28 md:py-40",
  mobile:
    "relative flex min-h-screen flex-col justify-center gap-16 overflow-hidden bg-void px-6 py-28",
  desktop: "relative h-[280vh] bg-void",
} as const;

export default function Film() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Hydration gate: the render path needs matchMedia, so the first client
    // render must match the server's before the real variant is chosen.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // The choice is LIVE: a page loaded in a narrow window (split screen,
    // devtools open) must swap to the desktop scrub when maximized — a
    // one-shot check would lock visitors into the stacked mobile layout for
    // the whole session.
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // The variant depends on matchMedia / prefers-reduced-motion, neither of
  // which is knowable during SSR — pre-mount we render the static body (not
  // null): the SSR HTML then carries the section + phase copy (SEO, no
  // layout pop-in). Crucially the <section id="film"> element itself lives
  // HERE and persists across variant swaps — TraceRail's IntersectionObserver
  // holds a reference to this exact DOM node, and an unmount/remount (the old
  // per-variant <section>s) left it observing a dead detached element, which
  // is why the rail skipped span 002.
  const variant = !mounted ? "ssr" : reducedMotion ? "static" : isMobile ? "mobile" : "desktop";

  return (
    <section
      ref={sectionRef}
      id="film"
      aria-label={filmSection.title}
      className={SECTION_CLASS[variant]}
    >
      {variant === "ssr" || variant === "static" ? (
        <StaticFilmBody />
      ) : variant === "mobile" ? (
        <MobileFilmBody />
      ) : (
        <DesktopScrubBody sectionRef={sectionRef} />
      )}
    </section>
  );
}
