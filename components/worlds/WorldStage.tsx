"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

import { useCanRender3D } from "@/hooks/useCanRender3D";
import {
  driveFrameScroll,
  gateFrameAnimation,
  injectFrameStyle,
  unlockFrameScroll,
  type FrameGate,
} from "./sceneBridge";

export type ApplyScene = (frame: HTMLIFrameElement) => void;

/** What the loaded frame document must be before it is allowed on screen. */
export type SceneExpectation = {
  /** The authored WebGL canvas (the same selector the background presentation isolates). */
  canvas: string;
  /** The packaged document's own path; a redirect or a 404 page changes it. */
  pathname: string;
  /** A fragment of the authored <title>. */
  titleIncludes: string;
};

/** "pending" = the frame has not navigated yet (LandingPageFrame also calls applyScene on mount, before load). */
function frameMatches(frame: HTMLIFrameElement, expect: SceneExpectation): boolean | "pending" {
  try {
    const doc = frame.contentDocument;
    const win = frame.contentWindow;
    if (!doc || !win) return false;
    if (win.location.href === "about:blank") return "pending";
    if (win.location.pathname !== expect.pathname) return false;
    if (!doc.title.includes(expect.titleIncludes)) return false;
    return Boolean(doc.querySelector(expect.canvas));
  } catch {
    return false;
  }
}

type WorldStageProps = {
  id: string;
  /** Extra classes on the wrapper — used to scope the world's accent tokens. */
  className?: string;
  /** Static frame shown for reduced-motion / no-WebGL visitors and while the scene loads. */
  poster: string;
  /** Feed the parent page's scroll through the wrapper into the frame's own scroll (Kage). */
  scrollDriven?: boolean;
  /** Extra CSS appended to the frame's head once loaded (authored file stays untouched). */
  frameStyles?: string;
  /**
   * Polled every 250ms after load until it returns true — for pages that
   * build their scene asynchronously and only then expose a scene API.
   */
  onFrameReady?: (frameWindow: Window) => boolean;
  /** The ThreeUI frame component; it must forward `applyScene` to its LandingPageFrame. */
  scene: React.ComponentType<{ applyScene: ApplyScene }>;
  /**
   * Fail-safe: if the document that loads is not this scene (a host that
   * rewrote the URL, a 404 page, a redirect), the frame is unmounted and the
   * poster stays. Whatever page loaded is never shown.
   */
  expect: SceneExpectation;
  children: React.ReactNode;
};

/** Start loading the scene this far before it scrolls into view. */
const MOUNT_MARGIN = "80% 0px 80% 0px";
/** Keep animating this far outside the viewport before parking the loop. */
const ACTIVE_MARGIN = "12% 0px 12% 0px";

/**
 * A "world": a full-viewport ThreeUI scene pinned behind a run of sections.
 *
 * Layout: the wrapper is exactly as tall as its content. The scene is a
 * 100svh sticky layer at the top; the content is pulled up over it by the
 * same height, so the scene stays pinned for the whole run and then scrolls
 * away with the last section. The scene's opacity is scrubbed from the
 * wrapper's scroll span — 0 → 1 while it slides in from the bottom, 1 → 0
 * while it slides out — so consecutive worlds cross-dissolve through the
 * page's void background instead of hard-cutting.
 *
 * Performance: the frame is only mounted once the wrapper is within
 * MOUNT_MARGIN of the viewport, and its requestAnimationFrame loops are
 * parked (see sceneBridge) whenever it is further than ACTIVE_MARGIN away.
 * Reduced-motion and no-WebGL visitors get the poster and never load a frame.
 */
export default function WorldStage({
  id,
  className = "",
  poster,
  scrollDriven = false,
  frameStyles,
  onFrameReady,
  scene: Scene,
  expect,
  children,
}: WorldStageProps) {
  const canRender3D = useCanRender3D();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const gateRef = useRef<FrameGate | null>(null);
  const activeRef = useRef(true);
  const fadeRef = useRef({ enter: 0.12, exit: 0.88 });
  const [mounted, setMounted] = useState(false);
  const [rejected, setRejected] = useState(false);

  // Sticky span: 0 when the wrapper's top pins, 1 when its bottom leaves.
  const { scrollYProgress: pinned } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  // Full span: 0 as the wrapper enters from below, 1 once it has fully left.
  const { scrollYProgress: span } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(span, (value) => {
    const { enter, exit } = fadeRef.current;
    if (value <= 0) return 0;
    if (value < enter) return value / enter;
    if (value <= exit) return 1;
    if (value >= 1) return 0;
    return (1 - value) / (1 - exit);
  });

  // The entry fade lasts exactly the distance the sticky layer slides in
  // (one viewport), and the exit fade the distance it slides out.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const measure = () => {
      const height = wrapper.offsetHeight;
      const viewport = window.innerHeight;
      const total = height + viewport;
      fadeRef.current = {
        enter: total > 0 ? viewport / total : 0.12,
        exit: total > 0 ? height / total : 0.88,
      };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Lazy mount + park/resume based on proximity to the viewport.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !canRender3D) return;

    const mountObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          mountObserver.disconnect();
        }
      },
      { rootMargin: MOUNT_MARGIN },
    );
    const activeObserver = new IntersectionObserver(
      (entries) => {
        const active = entries[entries.length - 1]?.isIntersecting ?? true;
        activeRef.current = active;
        gateRef.current?.setPaused(!active);
      },
      { rootMargin: ACTIVE_MARGIN },
    );
    mountObserver.observe(wrapper);
    activeObserver.observe(wrapper);
    return () => {
      mountObserver.disconnect();
      activeObserver.disconnect();
    };
  }, [canRender3D]);

  useMotionValueEvent(pinned, "change", (value) => {
    if (scrollDriven && frameRef.current) driveFrameScroll(frameRef.current, value);
  });

  // Runs on the frame's load (and never changes identity afterwards).
  const applyScene = useCallback<ApplyScene>(
    (frame) => {
      const match = frameMatches(frame, expect);
      if (match === "pending") return;
      if (!match) {
        // Runs from LandingPageFrame's onLoad, before it flips the frame
        // visible — unmounting here means the wrong document never paints.
        setRejected(true);
        return;
      }
      frameRef.current = frame;
      // Decorative: the parent layer is aria-hidden and nothing inside the
      // scene-only frame is focusable, so keep the frame itself out of the tab order.
      frame.tabIndex = -1;
      frame.setAttribute("aria-hidden", "true");
      gateRef.current = gateFrameAnimation(frame);
      gateRef.current?.setPaused(!activeRef.current);
      if (frameStyles) injectFrameStyle(frame, "portfolio-frame-styles", frameStyles);
      if (scrollDriven) {
        unlockFrameScroll(frame);
        driveFrameScroll(frame, pinned.get());
      }
      if (onFrameReady) {
        const win = frame.contentWindow;
        if (!win) return;
        const started = Date.now();
        const poll = win.setInterval(() => {
          let done = false;
          try {
            done = onFrameReady(win);
          } catch {
            done = true;
          }
          if (done || Date.now() - started > 90_000) win.clearInterval(poll);
        }, 250);
      }
    },
    [expect, frameStyles, onFrameReady, pinned, scrollDriven],
  );

  return (
    <div ref={wrapperRef} id={id} className={`world relative ${className}`}>
      <div aria-hidden className="sticky top-0 z-0 h-[100svh] overflow-hidden bg-void">
        <motion.div className="absolute inset-0" style={{ opacity }}>
          <img
            src={poster}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {canRender3D && mounted && !rejected ? <Scene applyScene={applyScene} /> : null}
        </motion.div>
        <div className="world-scrim world-scrim--top" />
        <div className="world-scrim world-scrim--bottom" />
      </div>
      <div className="relative z-10 -mt-[100svh]">{children}</div>
    </div>
  );
}
