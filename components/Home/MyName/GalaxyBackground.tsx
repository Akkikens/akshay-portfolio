import React, { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

type GalaxyBackgroundProps = {
  /**
   * Optional scroll progress from the hero (0 at top → 1 scrolled away).
   * Read inside the draw loop via .get() — never triggers React re-renders.
   * Drives per-depth-layer star parallax.
   */
  progress?: MotionValue<number>;
};

// ---- Particle data (generated once on the client, inside useEffect) --------

type Star = {
  x: number; // 0..1 normalized
  y: number;
  size: number;
  baseAlpha: number;
  freq: number;
  phase: number;
  depth: number; // 0 far, 1 mid, 2 near
};

type GlowStar = {
  x: number;
  y: number;
  size: number;
  spriteIndex: number;
  freq: number;
  phase: number;
  depth: number;
};

type Dust = {
  x: number;
  y: number; // mutated each frame (upward drift with wraparound)
  speed: number; // normalized units / second
  phase: number;
};

type Nebula = {
  x: number;
  y: number;
  size: number; // draw size in px
  spriteIndex: number;
  phase: number;
};

type ConstellationPoint = { x: number; y: number };

const GLOW_COLORS = [
  "rgba(255, 255, 255, 1)",
  "rgba(147, 197, 253, 1)",
  "rgba(139, 92, 246, 1)",
  "rgba(16, 185, 129, 1)",
];

// Matches the palette of the old blurred nebula divs
const NEBULA_COLORS: Array<[string, string]> = [
  ["rgba(139, 92, 246, 0.25)", "rgba(59, 130, 246, 0.12)"],
  ["rgba(6, 182, 212, 0.2)", "rgba(16, 185, 129, 0.08)"],
  ["rgba(236, 72, 153, 0.15)", "rgba(139, 92, 246, 0.08)"],
];

/** Parallax shift per depth layer at progress = 1, in px */
const DEPTH_PX = [30, 60, 100];

/** Mouse-parallax shift per depth layer at full cursor deflection, in px.
 * Near layers move more than far ones — the flat canvas reads as a 3D volume. */
const MOUSE_PX = [6, 14, 26];

/** Pre-render a soft glow-star sprite (radial gradient) once. */
function makeGlowSprite(color: string, size = 32): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, color);
  grad.addColorStop(0.4, color.replace("1)", "0.35)"));
  grad.addColorStop(1, color.replace("1)", "0)"));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}

/** Pre-render a large, already-soft nebula sprite (no runtime blur/filter). */
function makeNebulaSprite(inner: string, mid: string, size = 256): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.5, mid);
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}

/**
 * Hero galaxy backdrop rendered on ONE canvas — replaces ~400 individually
 * animated framer-motion DOM nodes (the site's #1 runtime perf cost) with a
 * single 30fps rAF loop of drawImage/fillRect/arc calls.
 *
 * - All Math.random() runs inside useEffect (SSR renders an empty canvas over
 *   the static gradient div — hydration-safe).
 * - Sprites (glow stars, pre-blurred nebulae) are built once offscreen; the
 *   draw loop contains zero gradient construction, shadowBlur, or filters.
 * - Pauses when offscreen (IntersectionObserver) or the tab is hidden.
 * - prefers-reduced-motion: draws a single static frame, never loops.
 */
export default function GalaxyBackground({ progress }: GalaxyBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep the latest MotionValue readable from the persistent draw loop
  const progressRef = useRef<MotionValue<number> | undefined>(progress);
  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---- Generation (client-only; hydration-safe) ----
    const stars: Star[] = Array.from({ length: 300 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 0.5,
      baseAlpha: Math.random() * 0.7 + 0.25,
      freq: Math.random() * 1.5 + 0.4,
      phase: Math.random() * Math.PI * 2,
      depth: Math.floor(Math.random() * 3),
    }));

    const glowStars: GlowStar[] = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 14 + 8,
      spriteIndex: Math.floor(Math.random() * GLOW_COLORS.length),
      freq: Math.random() * 1.2 + 0.4,
      phase: Math.random() * Math.PI * 2,
      depth: Math.floor(Math.random() * 3),
    }));

    const dust: Dust[] = Array.from({ length: 50 }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.01 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2,
    }));

    const nebulae: Nebula[] = [
      { x: 0.25, y: 0.3, size: 520, spriteIndex: 0, phase: Math.random() * Math.PI * 2 },
      { x: 0.75, y: 0.7, size: 460, spriteIndex: 1, phase: Math.random() * Math.PI * 2 },
      { x: 0.62, y: 0.45, size: 400, spriteIndex: 2, phase: Math.random() * Math.PI * 2 },
    ];

    const constellations: ConstellationPoint[][] = Array.from({ length: 4 }, () => {
      const baseX = 0.1 + Math.random() * 0.8;
      const baseY = 0.1 + Math.random() * 0.8;
      const numStars = 4 + Math.floor(Math.random() * 3);
      return Array.from({ length: numStars }, () => ({
        x: baseX + (Math.random() - 0.5) * 0.15,
        y: baseY + (Math.random() - 0.5) * 0.15,
      }));
    });
    const constellationPhases = constellations.map(() => Math.random() * Math.PI * 2);

    // ---- Sprites (built once — no gradients/filters in the draw loop) ----
    const glowSprites = GLOW_COLORS.map((c) => makeGlowSprite(c));
    const nebulaSprites = NEBULA_COLORS.map(([inner, mid]) =>
      makeNebulaSprite(inner, mid)
    );

    // ---- Sizing ----
    let cssW = 0;
    let cssH = 0;
    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ---- Mouse-depth parallax (eased; hover-capable pointers only) ----
    // target = raw cursor deflection (-1..1 from center); cur eases toward it
    // inside the draw loop so star layers glide instead of jittering.
    const mouseTarget = { x: 0, y: 0 };
    const mouseCur = { x: 0, y: 0 };
    const canHover = window.matchMedia("(hover: hover)").matches;
    const onPointerMove = (e: PointerEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (canHover) window.addEventListener("pointermove", onPointerMove, { passive: true });

    // ---- Draw (transform/alpha-composited primitives only) ----
    let lastT = performance.now() / 1000;
    const draw = (t: number) => {
      const dt = Math.min(t - lastT, 0.1);
      lastT = t;
      const w = cssW;
      const h = cssH;
      if (w === 0 || h === 0) return;
      const parallax = progressRef.current?.get() ?? 0;

      // Ease cursor deflection (~frame-rate independent low-pass)
      const ease = Math.min(1, dt * 4);
      mouseCur.x += (mouseTarget.x - mouseCur.x) * ease;
      mouseCur.y += (mouseTarget.y - mouseCur.y) * ease;

      ctx.clearRect(0, 0, w, h);

      // Nebulae — slow sinusoidal drift (~0.05 Hz), fixed scale
      for (let i = 0; i < nebulae.length; i++) {
        const n = nebulae[i];
        const ox = Math.sin(t * 0.3 + n.phase) * 40 - mouseCur.x * 10;
        const oy = Math.cos(t * 0.25 + n.phase) * 30 - mouseCur.y * 10;
        ctx.globalAlpha = 0.9;
        ctx.drawImage(
          nebulaSprites[n.spriteIndex],
          n.x * w - n.size / 2 + ox,
          n.y * h - n.size / 2 + oy,
          n.size,
          n.size
        );
      }

      // Constellations — pulsing cyan lines + vertex dots
      for (let i = 0; i < constellations.length; i++) {
        const pts = constellations[i];
        const a = 0.125 + 0.075 * Math.sin(t * 0.5 + constellationPhases[i]);
        ctx.strokeStyle = `rgba(6, 182, 212, ${a.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(pts[0].x * w, pts[0].y * h);
        for (let j = 1; j < pts.length; j++) {
          ctx.lineTo(pts[j].x * w, pts[j].y * h);
        }
        ctx.stroke();
        ctx.fillStyle = "rgba(147, 197, 253, 0.6)";
        for (let j = 0; j < pts.length; j++) {
          ctx.fillRect(pts[j].x * w - 1, pts[j].y * h - 1, 2, 2);
        }
      }

      // Dust — slow upward drift with wraparound
      ctx.fillStyle = "rgb(191, 219, 254)";
      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        d.y -= d.speed * dt;
        if (d.y < -0.02) d.y += 1.04;
        ctx.globalAlpha = 0.15 * (0.5 + 0.5 * Math.sin(t * 0.7 + d.phase));
        ctx.fillRect(d.x * w, d.y * h, 1, 1);
      }

      // Small stars — twinkle + depth parallax
      ctx.fillStyle = "rgb(255, 255, 255)";
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(t * s.freq + s.phase));
        ctx.globalAlpha = alpha;
        const drawX = s.x * w - mouseCur.x * MOUSE_PX[s.depth];
        const drawY = s.y * h + parallax * DEPTH_PX[s.depth] - mouseCur.y * MOUSE_PX[s.depth];
        if (s.size <= 1.5) {
          ctx.fillRect(drawX, drawY, s.size, s.size);
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, s.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Glow stars — sprite blit with alpha + size oscillation
      for (let i = 0; i < glowStars.length; i++) {
        const g = glowStars[i];
        const tw = Math.sin(t * g.freq + g.phase);
        ctx.globalAlpha = 0.5 + 0.5 * (tw * 0.5 + 0.5);
        const size = g.size * (1 + 0.08 * tw);
        const drawX = g.x * w - size / 2 - mouseCur.x * MOUSE_PX[g.depth];
        const drawY = g.y * h + parallax * DEPTH_PX[g.depth] - size / 2 - mouseCur.y * MOUSE_PX[g.depth];
        ctx.drawImage(glowSprites[g.spriteIndex], drawX, drawY, size, size);
      }

      ctx.globalAlpha = 1;
    };

    // ---- Loop control (30fps, paused offscreen / hidden tab) ----
    let rafId = 0;
    let frameCount = 0;
    let inView = true;
    let docHidden = document.visibilityState === "hidden";
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      // 30fps is indistinguishable for twinkling and halves main-thread cost
      if (frameCount++ & 1) return;
      draw(performance.now() / 1000);
    };

    const start = () => {
      if (rafId || reducedQuery.matches || !inView || docHidden) return;
      lastT = performance.now() / 1000;
      rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const drawStaticFrame = () => {
      // Mid-twinkle static frame for reduced motion (dt=0 keeps dust in place)
      lastT = performance.now() / 1000;
      draw(lastT);
    };

    if (reducedQuery.matches) {
      drawStaticFrame();
    } else {
      start();
    }

    // Redraw on resize (and keep the static frame fresh under reduced motion)
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedQuery.matches || !rafId) drawStaticFrame();
    });
    resizeObserver.observe(wrapper);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      docHidden = document.visibilityState === "hidden";
      if (docHidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onReducedChange = () => {
      if (reducedQuery.matches) {
        stop();
        drawStaticFrame();
      } else {
        start();
      }
    };
    reducedQuery.addEventListener("change", onReducedChange);

    return () => {
      stop();
      if (canHover) window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedQuery.removeEventListener("change", onReducedChange);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep space background (static CSS gradient — untouched) */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-purple-950/30 to-blue-950/40" />
      {/* Single canvas replaces all animated star/nebula/dust DOM nodes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
    </div>
  );
}
