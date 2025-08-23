import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type StartupProps = {
  onDone?: () => void;
  /** Total intro time (ms). 900 is snappy; bump to ~1200 for a touch more flair. */
  durationMs?: number;
};

type XY = { x: number; y: number };
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Beacon: React.FC<{ delay?: number; className?: string; borderColor?: string }> = ({
  delay = 0,
  className = "",
  borderColor = "#64ffda",
}) => (
  <motion.div
    initial={{ opacity: 0.2, scale: 0.85 }}
    animate={{ opacity: [0.2, 1, 0.2], scale: [0.85, 1, 0.85] }}
    transition={{ duration: 1.2, delay, repeat: Infinity, ease: EASE }}
    className={className}
  >
    <div className="h-5 w-5 rounded-full border-2" style={{ borderColor }} />
  </motion.div>
);

const Critter: React.FC<{
  delay?: number;
  start: XY;
  end: XY;
  flip?: boolean;
  accent: string;
}> = ({ delay = 0, start, end, flip = false, accent }) => {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <motion.div
      initial={{ x: start.x, y: start.y, rotate: flip ? -12 : 12, opacity: 0 }}
      animate={{
        x: [start.x, end.x - 12, end.x],
        y: [start.y, end.y + 8, end.y],
        opacity: [0, 1, 1],
        rotate: [flip ? -12 : 12, 0, 0],
      }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className="pointer-events-none absolute"
    >
      <div
        className="relative"
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: accent,
          boxShadow: `0 0 20px ${accent}66`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-1">
          <span className="h-1.5 w-1.5 bg-AAprimary rounded-full" />
          <span className="h-1.5 w-1.5 bg-AAprimary rounded-full" />
        </div>
        <div className="absolute -bottom-1 right-1 w-2 h-1 rounded" style={{ background: accent }} />
      </div>
    </motion.div>
  );
};

const Startup: React.FC<StartupProps> = ({ onDone, durationMs = 900 }) => {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = React.useState<"assemble" | "fade">("assemble");
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (prefersReduced) {
      const t = setTimeout(() => {
        setShow(false);
        onDone?.();
      }, 200);
      return () => clearTimeout(t);
    }

    const fadeAt = Math.max(500, durationMs - 300);
    const toFade = setTimeout(() => setPhase("fade"), fadeAt);
    const done = setTimeout(() => {
      setShow(false);
      onDone?.();
    }, durationMs);

    return () => {
      clearTimeout(toFade);
      clearTimeout(done);
    };
  }, [durationMs, onDone, prefersReduced]);

  if (!show) return null;

  const accent = "var(--aa-secondary, #64ffda)";
  const primary = "var(--aa-primary, #0b192f)";

  const CENTER_RING = 110;
  const critters = [
    { start: { x: -520, y: -340 }, end: { x: -CENTER_RING, y: -CENTER_RING }, delay: 0.05, flip: false },
    { start: { x: 520, y: -340 }, end: { x: CENTER_RING, y: -CENTER_RING }, delay: 0.10, flip: true },
    { start: { x: -520, y: 340 }, end: { x: -CENTER_RING, y: CENTER_RING }, delay: 0.15, flip: true },
    { start: { x: 520, y: 340 }, end: { x: CENTER_RING, y: CENTER_RING }, delay: 0.20, flip: false },
  ];

  return (
    <motion.div
      key="startup"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      transition={{ duration: phase === "fade" ? 0.28 : 0 }}
      className="fixed inset-0 z-[60] pointer-events-auto"
      aria-busy="true"
    >
      {/* Backdrop */}
      <div
        className="
          absolute inset-0
          [background:radial-gradient(900px_circle_at_70%_20%,rgba(100,255,218,0.08),transparent_55%),radial-gradient(700px_circle_at_20%_80%,rgba(100,255,218,0.06),transparent_55%)]
        "
        style={{ backgroundColor: primary }}
      />
      <div
        className="
          absolute inset-0 opacity-15
          [background-size:40px_40px]
          [background-image:linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]
        "
      />

      {/* Corner beacons */}
      <Beacon delay={0} className="absolute top-6 left-6" borderColor={accent} />
      <Beacon delay={0.15} className="absolute top-6 right-6" borderColor={accent} />
      <Beacon delay={0.3} className="absolute bottom-6 left-6" borderColor={accent} />
      <Beacon delay={0.45} className="absolute bottom-6 right-6" borderColor={accent} />

      {/* Center stage */}
      <div className="relative h-full w-full flex items-center justify-center px-6">
        {/* Pulsing ring */}
        {!prefersReduced && (
          <motion.div
            initial={{ opacity: 0.15, scale: 0.9 }}
            animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
            style={{
              width: 240,
              height: 240,
              borderRadius: "9999px",
              border: `2px solid ${accent}`,
              filter: "blur(1px)",
            }}
          />
        )}

        {/* Critters */}
        {!prefersReduced &&
          critters.map((c, idx) => (
            <Critter key={idx} delay={c.delay} start={c.start} end={c.end} flip={c.flip} accent={accent} />
          ))}

        {/* Assembled “A” */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="relative h-28 w-28 flex items-center justify-center"
          aria-label="Booting"
        >
          {[
            { rot: 90, tx: 40, ty: 0, d: 0.00 },
            { rot: 90, tx: -40, ty: 0, d: 0.06 },
            { rot: 35, tx: 18, ty: -36, d: 0.12 },
            { rot: -35, tx: -18, ty: -36, d: 0.18 },
            { rot: -35, tx: 18, ty: 36, d: 0.24 },
            { rot: 35, tx: -18, ty: 36, d: 0.30 },
          ].map(({ rot, tx, ty, d }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0, 1], scale: [0.85, 1], rotate: rot, x: tx, y: ty }}
              transition={{ duration: 0.45, delay: 0.35 + d, ease: EASE }}
              className="absolute h-2 w-12 rounded"
              style={{ background: accent, boxShadow: `0 0 18px ${accent}44` }}
            />
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: [0.7, 1.1, 1] }}
            transition={{ delay: 0.9, duration: 0.45, ease: EASE }}
            className="text-4xl font-Text2"
            style={{ color: accent, textShadow: `0 0 14px ${accent}55` }}
          >
            A
          </motion.span>
        </motion.div>

        {/* Status line */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.55, duration: 0.25 }}
          className="absolute bottom-10 text-[12px] sm:text-sm font-mono text-gray-300"
        >
          Booting portfolio… warming caches… <span style={{ color: accent }}>OK</span>
        </motion.div>

        {/* Skip */}
        <button
          onClick={() => {
            setPhase("fade");
            setTimeout(() => {
              setShow(false);
              onDone?.();
            }, 280);
          }}
          className="absolute top-4 right-4 rounded border border-white/20 hover:border-white/40 text-gray-300/90 hover:text-white px-3 py-1.5 text-xs sm:text-sm"
        >
          Skip intro
        </button>
      </div>
    </motion.div>
  );
};

export default Startup;
