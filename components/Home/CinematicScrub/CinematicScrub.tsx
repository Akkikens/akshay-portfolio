import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { SPRING_SCRUB } from "../../Shared/Motion";

// Desktop 1440p / mobile 720p variants, both encoded keyframe-every-4-frames
// (ffmpeg -g 4) so currentTime seeks resolve in ≤4 decode steps — sparse
// default keyframes make scrubbing visibly snap between GOP boundaries.
const VIDEO_SRC = "/cinematic-scrub.mp4";
const VIDEO_SRC_MOBILE = "/cinematic-scrub-720.mp4";
const POSTER_SRC = "/cinematic-poster.jpg";

/**
 * Apple-keynote scroll-scrubbed film ("How I work").
 *
 * Three render paths, chosen once per pageload:
 *  - reduced motion → static stacked statements, no video (StaticFilm)
 *  - mobile (≤768px) → compact auto-looping background, normal page flow
 *    (MobileFilm). No pin/scrub: a 320vh sticky scroll-jack reads as a frozen
 *    page on a phone, and a full-viewport <video> can eat the touch gesture
 *    on iOS Safari.
 *  - desktop → 320vh sticky stage, scroll position scrubs video.currentTime
 *    frame-by-frame (DesktopScrub).
 *
 * The scroll hooks (useScroll/useSpring) live ONLY in DesktopScrub — they
 * throw "target ref defined but not hydrated" if their target ref is never
 * attached, so they must not run in the branches that don't render the pin.
 */
const PHASES = [
  {
    title: "Agents that think.",
    sub: "Multi-agent systems that reason, plan, and use tools.",
  },
  {
    title: "Shipped to production.",
    sub: "Harnesses, MCP servers, evals — not demos.",
  },
  {
    title: "Reliable at scale.",
    sub: "Observability and infra that keep them honest.",
  },
] as const;

// Each phase owns a window of scroll progress: [fadeInStart, hold..., fadeOutEnd].
// Phase 1 is already visible at p=0 — while the stage is still scrolling into
// view the film reads as a titled scene, never an empty black band.
const PHASE_WINDOWS: Array<[number, number, number, number]> = [
  [0, 0.001, 0.26, 0.34],
  [0.36, 0.44, 0.6, 0.68],
  [0.7, 0.78, 0.94, 1.0],
];

function Phase({
  progress,
  index,
}: {
  progress: ReturnType<typeof useSpring>;
  index: number;
}) {
  const [a, b, c, d] = PHASE_WINDOWS[index];
  // Phase 1 is pre-shown (opaque at p=0) so the entering stage never reads
  // as an empty black viewport before the pin engages.
  const first = index === 0;
  const opacity = useTransform(progress, [a, b, c, d], [first ? 1 : 0, 1, 1, 0]);
  const y = useTransform(progress, [a, b, c, d], [first ? 0 : 48, 0, 0, -48]);
  const { title, sub } = PHASES[index];
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{ opacity, y }}
    >
      <h2 className="font-bold tracking-tight text-AAtext text-[clamp(2.25rem,6vw,4.5rem)] leading-tight [text-shadow:0_2px_24px_rgba(2,6,23,0.8)]">
        {title}
      </h2>
      <p className="mt-4 font-mono text-AAsecondary text-sm sm:text-lg [text-shadow:0_1px_12px_rgba(2,6,23,0.9)]">
        {sub}
      </p>
    </motion.div>
  );
}

/** Static, motion-free passage for prefers-reduced-motion. */
function StaticFilm() {
  return (
    <section aria-label="How I work" className="relative bg-AAprimary py-24 px-6">
      <div className="mx-auto max-w-[900px] space-y-16 text-center">
        {PHASES.map(({ title, sub }) => (
          <div key={title}>
            <h2 className="font-bold tracking-tight text-AAtext text-3xl sm:text-5xl">
              {title}
            </h2>
            <p className="mt-3 font-mono text-AAsecondary text-sm sm:text-base">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Mobile: one normal-height section, no pin, no scrub. The film auto-loops as
 * a decorative background (pointer-events:none so touch always reaches the
 * page scroll), statements stacked over it.
 */
function MobileFilm() {
  const [videoOk, setVideoOk] = useState(true);
  return (
    <section
      aria-label="How I work"
      className="relative min-h-screen overflow-hidden bg-AAprimary flex flex-col justify-center gap-16 py-28 px-6"
    >
      {videoOk ? (
        <video
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          src={VIDEO_SRC_MOBILE}
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoOk(false)}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.14),transparent_60%),linear-gradient(180deg,#0a0e1a,#020617)]"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.3)_50%,rgba(2,6,23,0.65))]"
      />
      <div className="relative mx-auto max-w-[600px] w-full space-y-14 text-center">
        {PHASES.map(({ title, sub }) => (
          <div key={title}>
            <h2 className="font-bold tracking-tight text-AAtext text-3xl leading-tight [text-shadow:0_2px_24px_rgba(2,6,23,0.9)]">
              {title}
            </h2>
            <p className="mt-3 font-mono text-AAsecondary text-sm [text-shadow:0_1px_12px_rgba(2,6,23,0.95)]">
              {sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Desktop: 320vh sticky stage, scroll scrubs the film frame-by-frame. */
function DesktopScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadKickedRef = useRef(false);
  const [videoOk, setVideoOk] = useState(true);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, SPRING_SCRUB);

  // Full brightness throughout the pin; only a gentle dim on exit. (An entry
  // dim here reads as a dead black viewport while the stage scrolls in.)
  const stageOpacity = useTransform(scrollYProgress, [0.94, 1], [1, 0.75]);

  // Scrub: scroll progress → video timeline. Guarded so offscreen scroll
  // (spring settling) never touches the decoder. 1/30 threshold = the video's
  // frame interval; a finer threshold would issue seeks that land on the
  // same frame.
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
    <section
      ref={sectionRef}
      aria-label="How I work"
      className="relative h-[320vh] bg-AAprimary"
    >
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity: stageOpacity }}
      >
        {/* Film layer */}
        {videoOk ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            onError={() => setVideoOk(false)}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.14),transparent_60%),linear-gradient(180deg,#0a0e1a,#020617)]"
          />
        )}

        {/* Legibility scrim — deep at edges, open in the middle */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.45),rgba(2,6,23,0.1)_30%,rgba(2,6,23,0.1)_70%,rgba(2,6,23,0.55))]"
        />

        {/* Narrative phases */}
        {PHASES.map((phase, i) => (
          <Phase key={phase.title} progress={progress} index={i} />
        ))}

        {/* Playhead hairline — the scrub position, like a film timeline */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-px bg-white/15">
          <motion.div
            className="h-full bg-AAsecondary origin-left"
            style={{ scaleX: progress }}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default function CinematicScrub() {
  const prefersReducedMotion = useReducedMotion();
  // Component is ssr:false so matchMedia is safe here; the choice is
  // per-pageload, which is fine — only devtools crosses the 768px boundary
  // mid-session.
  const [isMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  if (prefersReducedMotion) return <StaticFilm />;
  if (isMobile) return <MobileFilm />;
  return <DesktopScrub />;
}
