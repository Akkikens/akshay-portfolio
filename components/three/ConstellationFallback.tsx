"use client";

/**
 * ConstellationFallback — a pure CSS/SVG static snapshot of the live
 * AgentConstellation scene (SPEC.md §5.1). No `three` / `@react-three/*`
 * imports live here on purpose: this file must be cheap enough to serve as
 * the hero's loading poster, and safe enough to render for users who get
 * neither WebGL nor motion.
 *
 * Shown when:
 *  - `prefers-reduced-motion: reduce`
 *  - WebGL is unavailable
 *  - the live 3D chunk hasn't finished loading yet
 *
 * The node/edge/star layout is generated once at module scope from a fixed
 * seed (mulberry32) so server and client always produce byte-identical
 * markup — required since this component renders during SSR (it stays
 * "use client" only for the `useCanRender3D` hook it also exports).
 */

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Deterministic layout (seeded PRNG — never Math.random at module scope)
// ---------------------------------------------------------------------------

function mulberry32(seed: number): () => number {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FALLBACK_SEED = 1337;

/**
 * Quantize to 3 decimals. Math.sin/cos results can differ by 1 ULP between
 * the server's and browser's V8 versions — enough to make React's attribute
 * serialization mismatch on hydration. Rounding removes the noise while
 * keeping full visual fidelity in a 0–100 viewBox.
 */
const q = (v: number) => Math.round(v * 1000) / 1000;
const FALLBACK_NODE_COUNT = 40;
const FALLBACK_STAR_COUNT = 70;
const INDIGO_RATIO = 0.2;
const CORE_EDGE_COUNT = 10;
/** Matches AgentConstellation's edge color exactly — spec-mandated value,
 * not a token in globals.css (edges are a 3D-scene-only accent). */
const EDGE_COLOR = "#8B93B8";

type FallbackNode = {
  x: number; // percent, 0-100
  y: number;
  radius: number; // percent
  color: "amber" | "indigo";
  opacity: number;
};

type FallbackEdge = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type FallbackStar = {
  x: number;
  y: number;
  size: number;
  opacity: number;
};

function buildFallbackNodes(): FallbackNode[] {
  const rand = mulberry32(FALLBACK_SEED);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nodes: FallbackNode[] = [];

  for (let i = 0; i < FALLBACK_NODE_COUNT; i++) {
    const t = FALLBACK_NODE_COUNT <= 1 ? 0 : i / (FALLBACK_NODE_COUNT - 1);
    const radiusPct = Math.sqrt(t) * 42;
    const angle = golden * i;
    const jitter = (rand() - 0.5) * 6;

    const x = 50 + Math.cos(angle) * radiusPct + jitter;
    const y = 50 + Math.sin(angle) * radiusPct * 0.62 + jitter * 0.5;

    nodes.push({
      x: q(Math.min(97, Math.max(3, x))),
      y: q(Math.min(95, Math.max(5, y))),
      radius: q(0.35 + rand() * 0.55),
      color: rand() < INDIGO_RATIO ? "indigo" : "amber",
      opacity: q(0.5 + rand() * 0.45),
    });
  }

  return nodes;
}

function buildFallbackEdges(nodes: FallbackNode[]): FallbackEdge[] {
  const n = nodes.length;
  const edgeSet = new Set<string>();
  const edges: FallbackEdge[] = [];
  const distSq = (a: FallbackNode, b: FallbackNode) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

  for (let i = 0; i < n; i++) {
    const distances: { j: number; d: number }[] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      distances.push({ j, d: distSq(nodes[i], nodes[j]) });
    }
    distances.sort((a, b) => a.d - b.d);
    for (let k = 0; k < 2 && k < distances.length; k++) {
      const j = distances[k].j;
      const key = i < j ? `${i}:${j}` : `${j}:${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y });
      }
    }
  }

  const rand = mulberry32(FALLBACK_SEED + 1);
  const coreEdgeTarget = Math.min(CORE_EDGE_COUNT, n);
  const used = new Set<number>();
  while (used.size < coreEdgeTarget) {
    used.add(Math.floor(rand() * n));
  }
  used.forEach((idx) => {
    edges.push({ x1: nodes[idx].x, y1: nodes[idx].y, x2: 50, y2: 50 });
  });

  return edges;
}

function buildFallbackStars(): FallbackStar[] {
  const rand = mulberry32(FALLBACK_SEED + 2);
  const stars: FallbackStar[] = [];
  for (let i = 0; i < FALLBACK_STAR_COUNT; i++) {
    stars.push({
      x: q(rand() * 100),
      y: q(rand() * 100),
      size: q(0.3 + rand() * 0.7),
      opacity: q(0.12 + rand() * 0.3),
    });
  }
  return stars;
}

const FALLBACK_NODES = buildFallbackNodes();
const FALLBACK_EDGES = buildFallbackEdges(FALLBACK_NODES);
const FALLBACK_STARS = buildFallbackStars();

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type ConstellationFallbackProps = {
  className?: string;
};

/**
 * Static snapshot: layered SVG (starfield -> edges -> core glow -> nodes ->
 * core). Visually consistent with the live scene's palette (amber core/nodes,
 * indigo sub-agents, slate-indigo edges) with zero animation and zero
 * `three`/WebGL dependency.
 */
export default function ConstellationFallback({ className }: ConstellationFallbackProps) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <radialGradient id="constellation-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "var(--color-signal)", stopOpacity: 0.5 }} />
            <stop offset="45%" style={{ stopColor: "var(--color-signal)", stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-signal)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {FALLBACK_STARS.map((star, i) => (
          <circle
            key={`star-${i}`}
            cx={star.x}
            cy={star.y}
            r={star.size * 0.2}
            style={{ fill: "var(--color-ink)", opacity: star.opacity }}
          />
        ))}

        {FALLBACK_EDGES.map((edge, i) => (
          <line
            key={`edge-${i}`}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            style={{ stroke: EDGE_COLOR, strokeOpacity: 0.16, strokeWidth: 0.15 }}
          />
        ))}

        <circle cx={50} cy={50} r={15} fill="url(#constellation-core-glow)" />

        {FALLBACK_NODES.map((node, i) => (
          <circle
            key={`node-${i}`}
            cx={node.x}
            cy={node.y}
            r={node.radius}
            style={{
              fill: node.color === "indigo" ? "var(--color-depth)" : "var(--color-signal)",
              opacity: node.opacity,
            }}
          />
        ))}

        <circle cx={50} cy={50} r={2.2} style={{ fill: "var(--color-signal)" }} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// useCanRender3D — gates whether a consumer should mount AgentConstellation
// ---------------------------------------------------------------------------

function detectWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (gl && "getExtension" in gl) {
      (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    }
    return Boolean(gl);
  } catch {
    return false;
  }
}

/**
 * Returns whether the live 3D constellation should be mounted: `false` for
 * `prefers-reduced-motion: reduce`, `false` when WebGL context creation
 * fails, and `false` on the very first render (server + initial client
 * paint) so ConstellationFallback is always what SSR emits — it flips to
 * `true` once client-side feature detection actually passes.
 */
export function useCanRender3D(): boolean {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      if (mql.matches) {
        setCanRender(false);
        return;
      }
      setCanRender(detectWebgl());
    };

    evaluate();
    mql.addEventListener("change", evaluate);
    return () => mql.removeEventListener("change", evaluate);
  }, []);

  return canRender;
}
