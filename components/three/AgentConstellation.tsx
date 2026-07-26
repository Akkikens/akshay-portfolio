"use client";

/**
 * AgentConstellation — the site signature. A living multi-agent orchestration
 * graph rendered in @react-three/fiber: an orchestrator core, drifting agent
 * nodes wired by trace edges, traveling "tool call" pulses, and a background
 * starfield. See SPEC.md §5.1.
 *
 * Perf contract: zero per-frame React state. Every animated value lives on a
 * three.js object mutated inside useFrame via refs; the only React state in
 * this file responds to discrete, infrequent browser events (breakpoint
 * change, tab visibility, intersection), never to the render loop itself.
 *
 * Default-exported for `next/dynamic(() => import(...), { ssr: false })`.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

// ---------------------------------------------------------------------------
// Tunables (SPEC §5.1)
// ---------------------------------------------------------------------------

const MOBILE_BREAKPOINT = 768;
const NODE_COUNT_DESKTOP = 56;
const NODE_COUNT_MOBILE = 32;

const SPHERE_RADIUS = 4;
const Y_SQUASH = 0.72;
const POSITION_JITTER = 0.35;

const INDIGO_RATIO = 0.2;
const AMBER = new THREE.Color("#FFB224");
const INDIGO = new THREE.Color("#6D5EF0");
const MIN_INTENSITY = 0.55;
const MAX_INTENSITY = 1.1;

const MIN_NODE_SCALE = 0.045;
const MAX_NODE_SCALE = 0.09;
const DRIFT_AMPLITUDE = 0.08;

const IGNITION_STAGGER = 0.9; // seconds — outer nodes ignite up to this much later than the core
const IGNITION_EASE_DURATION = 0.6; // seconds each node takes to grow in once its delay elapses
const CORE_IGNITE_DURATION = 0.5;
const CORE_RADIUS = 0.4;
const CORE_BREATH_PERIOD = 4; // seconds
const CORE_BREATH_AMPLITUDE = 0.04;

const EDGE_COLOR = "#8B93B8";
const EDGE_OPACITY = 0.16;
const EDGE_FADE_START = 0.4; // seconds
const EDGE_FADE_DURATION = 0.6; // seconds
const CORE_EDGE_COUNT = 12;

const PULSE_COUNT = 14;
const PULSE_MIN_DURATION = 1.2;
const PULSE_MAX_DURATION = 2.4;
const PULSE_RESPAWN_MIN_GAP = 0.2;
const PULSE_RESPAWN_MAX_GAP = 1.0;
const PULSE_INITIAL_START = 1.2; // seconds — "live traffic" begins
const PULSE_SPRITE_SIZE = 0.4;

const STAR_COUNT = 1400;
const STAR_FIELD_RADIUS = 30;

const CAMERA_ROTATION_SPEED = 0.0125; // rad/s
const CAMERA_PARALLAX_X = 0.9;
const CAMERA_PARALLAX_Y = 0.55;
const CAMERA_LERP = 0.05;

/** Frozen elapsed-time used to render a fully-settled snapshot for reduced
 * motion (no continuous animation, but nodes/edges/core still read as
 * "arrived" instead of frozen mid-cascade). */
const FROZEN_T = 999;

// ---------------------------------------------------------------------------
// Math helpers
// ---------------------------------------------------------------------------

function easeOutCubic(x: number): number {
  const c = Math.min(1, Math.max(0, x));
  return 1 - Math.pow(1 - c, 3);
}

function smoothstep(x: number): number {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
}

/** Small radial-gradient sprite texture, built on a throwaway 2D canvas. */
function createGlowTexture(rgb: string): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, `rgba(${rgb},1)`);
    gradient.addColorStop(0.4, `rgba(${rgb},0.5)`);
    gradient.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ---------------------------------------------------------------------------
// Graph data
// ---------------------------------------------------------------------------

type NodeDatum = {
  base: THREE.Vector3;
  color: THREE.Color;
  scale: number;
  phase: THREE.Vector3;
  driftSpeed: number;
  ignitionDelay: number;
};

function buildNodes(count: number): NodeDatum[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nodes: NodeDatum[] = [];
  let maxDist = 0;

  for (let i = 0; i < count; i++) {
    const y = count <= 1 ? 0 : 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const jitter = 1 + (Math.random() - 0.5) * POSITION_JITTER;

    const x = Math.cos(theta) * radiusAtY * SPHERE_RADIUS * jitter;
    const z = Math.sin(theta) * radiusAtY * SPHERE_RADIUS * jitter;
    const py = y * SPHERE_RADIUS * Y_SQUASH * jitter;

    const base = new THREE.Vector3(x, py, z);
    maxDist = Math.max(maxDist, base.length());

    const isIndigo = Math.random() < INDIGO_RATIO;
    const intensity = MIN_INTENSITY + Math.random() * (MAX_INTENSITY - MIN_INTENSITY);
    const color = (isIndigo ? INDIGO : AMBER).clone().multiplyScalar(intensity);

    nodes.push({
      base,
      color,
      scale: MIN_NODE_SCALE + Math.random() * (MAX_NODE_SCALE - MIN_NODE_SCALE),
      phase: new THREE.Vector3(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ),
      driftSpeed: 0.25 + Math.random() * 0.35,
      ignitionDelay: 0,
    });
  }

  const denom = maxDist || 1;
  for (const n of nodes) {
    n.ignitionDelay = (n.base.length() / denom) * IGNITION_STAGGER;
  }

  return nodes;
}

type EdgePositions = [THREE.Vector3, THREE.Vector3][];

function buildEdges(nodes: NodeDatum[]): { edgePositions: EdgePositions; linePositions: Float32Array } {
  const n = nodes.length;
  const origin = new THREE.Vector3(0, 0, 0);
  const edgeSet = new Set<string>();
  const indexPairs: [number, number][] = [];

  for (let i = 0; i < n; i++) {
    const distances: { j: number; d: number }[] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      distances.push({ j, d: nodes[i].base.distanceToSquared(nodes[j].base) });
    }
    distances.sort((a, b) => a.d - b.d);
    for (let k = 0; k < 2 && k < distances.length; k++) {
      const j = distances[k].j;
      const key = i < j ? `${i}:${j}` : `${j}:${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        indexPairs.push([i, j]);
      }
    }
  }

  const coreEdgeTarget = Math.min(CORE_EDGE_COUNT, n);
  const usedCoreSources = new Set<number>();
  while (usedCoreSources.size < coreEdgeTarget) {
    usedCoreSources.add(Math.floor(Math.random() * n));
  }
  usedCoreSources.forEach((idx) => indexPairs.push([idx, -1]));

  const edgePositions: EdgePositions = indexPairs.map(([a, b]) => [
    nodes[a].base,
    b === -1 ? origin : nodes[b].base,
  ]);

  const linePositions = new Float32Array(edgePositions.length * 6);
  edgePositions.forEach(([a, b], idx) => {
    linePositions[idx * 6] = a.x;
    linePositions[idx * 6 + 1] = a.y;
    linePositions[idx * 6 + 2] = a.z;
    linePositions[idx * 6 + 3] = b.x;
    linePositions[idx * 6 + 4] = b.y;
    linePositions[idx * 6 + 5] = b.z;
  });

  return { edgePositions, linePositions };
}

function buildStarField(count: number): { positions: Float32Array; colors: Float32Array } {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [new THREE.Color("#4A5578"), new THREE.Color("#6D5EF0"), new THREE.Color("#EDEAE2")];
  const weights = [0.5, 0.3, 0.2];

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const r = STAR_FIELD_RADIUS * (0.55 + Math.random() * 0.45);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const roll = Math.random();
    let cumulative = 0;
    let colorIdx = weights.length - 1;
    for (let w = 0; w < weights.length; w++) {
      cumulative += weights[w];
      if (roll <= cumulative) {
        colorIdx = w;
        break;
      }
    }
    const c = palette[colorIdx];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  return { positions, colors };
}

// ---------------------------------------------------------------------------
// Pulses ("tool calls" traveling node -> node along edges)
// ---------------------------------------------------------------------------

type PulseState = {
  from: THREE.Vector3;
  to: THREE.Vector3;
  startTime: number;
  duration: number;
};

function pickEdge(edgePositions: EdgePositions): [THREE.Vector3, THREE.Vector3] {
  if (edgePositions.length === 0) {
    return [new THREE.Vector3(), new THREE.Vector3()];
  }
  const idx = Math.floor(Math.random() * edgePositions.length);
  return edgePositions[idx];
}

function spawnPulse(edgePositions: EdgePositions, earliestStart: number, jitterWindow: number): PulseState {
  const [from, to] = pickEdge(edgePositions);
  return {
    from,
    to,
    startTime: earliestStart + Math.random() * jitterWindow,
    duration: PULSE_MIN_DURATION + Math.random() * (PULSE_MAX_DURATION - PULSE_MIN_DURATION),
  };
}

function respawnPulse(edgePositions: EdgePositions, now: number): PulseState {
  const [from, to] = pickEdge(edgePositions);
  return {
    from,
    to,
    startTime: now + PULSE_RESPAWN_MIN_GAP + Math.random() * (PULSE_RESPAWN_MAX_GAP - PULSE_RESPAWN_MIN_GAP),
    duration: PULSE_MIN_DURATION + Math.random() * (PULSE_MAX_DURATION - PULSE_MIN_DURATION),
  };
}

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function Starfield() {
  const { positions, colors } = useMemo(() => buildStarField(STAR_COUNT), []);

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Edges({ linePositions, reducedMotion }: { linePositions: Float32Array; reducedMotion: boolean }) {
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    const t = reducedMotion ? FROZEN_T : state.clock.elapsedTime;
    const localT = (t - EDGE_FADE_START) / EDGE_FADE_DURATION;
    material.opacity = EDGE_OPACITY * easeOutCubic(localT);
  });

  return (
    <lineSegments frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        color={EDGE_COLOR}
        transparent
        opacity={0}
        toneMapped={false}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function Nodes({ nodes, reducedMotion }: { nodes: NodeDatum[]; reducedMotion: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    nodes.forEach((n, i) => mesh.setColorAt(i, n.color));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [nodes]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = reducedMotion ? FROZEN_T : state.clock.elapsedTime;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const localT = (t - n.ignitionDelay) / IGNITION_EASE_DURATION;
      const scale = n.scale * easeOutCubic(localT);

      const dx = Math.sin(t * n.driftSpeed + n.phase.x) * DRIFT_AMPLITUDE;
      const dy = Math.cos(t * n.driftSpeed * 0.8 + n.phase.y) * DRIFT_AMPLITUDE * 0.6;
      const dz = Math.sin(t * n.driftSpeed * 0.6 + n.phase.z) * DRIFT_AMPLITUDE;

      dummy.position.set(n.base.x + dx, n.base.y + dy, n.base.z + dz);
      dummy.scale.setScalar(Math.max(0.0001, scale));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, nodes.length]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial vertexColors toneMapped={false} transparent opacity={0.95} />
    </instancedMesh>
  );
}

function OrchestratorCore({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const haloTexture = useMemo(() => createGlowTexture("255,178,36"), []);

  useEffect(() => {
    return () => haloTexture.dispose();
  }, [haloTexture]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = reducedMotion ? FROZEN_T : state.clock.elapsedTime;
    const ignite = easeOutCubic(t / CORE_IGNITE_DURATION);
    const breathe = 1 + Math.sin((t / CORE_BREATH_PERIOD) * Math.PI * 2) * CORE_BREATH_AMPLITUDE;
    mesh.scale.setScalar(ignite * breathe);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[CORE_RADIUS, 1]} />
        <meshBasicMaterial color="#FFB224" toneMapped={false} />
      </mesh>
      <sprite scale={[CORE_RADIUS * 4, CORE_RADIUS * 4, 1]}>
        <spriteMaterial
          map={haloTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.55}
          toneMapped={false}
        />
      </sprite>
      <sprite scale={[CORE_RADIUS * 8, CORE_RADIUS * 8, 1]}>
        <spriteMaterial
          map={haloTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.22}
          toneMapped={false}
        />
      </sprite>
    </group>
  );
}

function Pulses({ edgePositions }: { edgePositions: EdgePositions }) {
  const spriteRefs = useRef<(THREE.Sprite | null)[]>([]);
  const pulsesRef = useRef<PulseState[]>([]);
  const glowTexture = useMemo(() => createGlowTexture("255,201,92"), []);

  useEffect(() => {
    return () => glowTexture.dispose();
  }, [glowTexture]);

  useEffect(() => {
    pulsesRef.current = Array.from({ length: PULSE_COUNT }, () =>
      spawnPulse(edgePositions, PULSE_INITIAL_START, 1.0)
    );
  }, [edgePositions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulses = pulsesRef.current;

    for (let i = 0; i < pulses.length; i++) {
      const sprite = spriteRefs.current[i];
      const p = pulses[i];
      if (!sprite || !p) continue;

      if (t < p.startTime) {
        sprite.visible = false;
        continue;
      }

      const elapsed = t - p.startTime;
      if (elapsed >= p.duration) {
        pulses[i] = respawnPulse(edgePositions, t);
        sprite.visible = false;
        continue;
      }

      const eased = smoothstep(elapsed / p.duration);
      sprite.position.lerpVectors(p.from, p.to, eased);
      sprite.visible = true;
    }
  });

  return (
    <>
      {Array.from({ length: PULSE_COUNT }).map((_, i) => (
        <sprite
          key={i}
          ref={(el) => {
            spriteRefs.current[i] = el;
          }}
          visible={false}
          scale={[PULSE_SPRITE_SIZE, PULSE_SPRITE_SIZE, 1]}
        >
          <spriteMaterial
            map={glowTexture}
            color="#FFC95C"
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.95}
            toneMapped={false}
          />
        </sprite>
      ))}
    </>
  );
}

/** No visual output — owns the camera's autonomous drift + mouse parallax. */
function CameraRig() {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    camera.rotation.y += delta * CAMERA_ROTATION_SPEED;

    const targetX = pointer.x * CAMERA_PARALLAX_X;
    const targetY = pointer.y * CAMERA_PARALLAX_Y;
    camera.position.x += (targetX - camera.position.x) * CAMERA_LERP;
    camera.position.y += (targetY - camera.position.y) * CAMERA_LERP;
  });
  return null;
}

function ConstellationScene({ nodeCount, reducedMotion }: { nodeCount: number; reducedMotion: boolean }) {
  const { nodes, linePositions, edgePositions } = useMemo(() => {
    const generatedNodes = buildNodes(nodeCount);
    const { edgePositions: pairs, linePositions: lp } = buildEdges(generatedNodes);
    return { nodes: generatedNodes, linePositions: lp, edgePositions: pairs };
  }, [nodeCount]);

  return (
    <>
      <Starfield />
      <Edges linePositions={linePositions} reducedMotion={reducedMotion} />
      <Nodes nodes={nodes} reducedMotion={reducedMotion} />
      <OrchestratorCore reducedMotion={reducedMotion} />
      {!reducedMotion && <Pulses edgePositions={edgePositions} />}
      {!reducedMotion && <CameraRig />}
      <AdaptiveDpr pixelated={false} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

type AgentConstellationProps = {
  className?: string;
};

export default function AgentConstellation({ className }: AgentConstellationProps) {
  const reducedMotionPreference = useReducedMotion();
  const reducedMotion = reducedMotionPreference === true;

  const containerRef = useRef<HTMLDivElement>(null);
  const [nodeCount, setNodeCount] = useState<number>(() =>
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT
      ? NODE_COUNT_MOBILE
      : NODE_COUNT_DESKTOP
  );
  const [active, setActive] = useState(true);

  // Regenerate the graph density when crossing the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setNodeCount(mq.matches ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pause the render loop when the tab is hidden or the canvas scrolls fully
  // offscreen — combined into one "active" flag flipped by discrete events,
  // never per-frame.
  useEffect(() => {
    const node = containerRef.current;
    const intersecting = { current: true };

    const recompute = () => setActive(intersecting.current && !document.hidden);

    document.addEventListener("visibilitychange", recompute);

    let observer: IntersectionObserver | undefined;
    if (node && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          intersecting.current = entry.isIntersecting;
          recompute();
        },
        { threshold: 0 }
      );
      observer.observe(node);
    }

    return () => {
      document.removeEventListener("visibilitychange", recompute);
      observer?.disconnect();
    };
  }, []);

  // "always" drives the living scene; "demand" renders a single settled frame
  // (and stops) whenever the scene is paused or reduced motion is preferred —
  // the invalidate-based demand loop called out in SPEC §5.1.
  const frameloop: "always" | "demand" = active && !reducedMotion ? "always" : "demand";

  return (
    <div ref={containerRef} aria-hidden className={`absolute inset-0 ${className ?? ""}`}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 11], fov: 42 }}
        frameloop={frameloop}
      >
        <ConstellationScene nodeCount={nodeCount} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
