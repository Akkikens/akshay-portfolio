import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type StatusPhase = "offline" | "reconnecting" | "online";

const statusStyles: Record<StatusPhase, string> = {
  offline: "from-black/95 via-rose-900/70 to-black/90",
  reconnecting: "from-black/95 via-amber-900/60 to-black/85",
  online: "from-black/90 via-emerald-900/50 to-black/85",
};

const statusCopy: Record<
  StatusPhase,
  { headline: string; detail: string; logLines: string[] }
> = {
  offline: {
    headline: "Signal Lost",
    detail: "akshaykalapgar.com took too long to respond.",
    logLines: [
      "[WARN] Packet loss detected.",
      "[INFO] Retrying secure tunnel handshake…",
      "[DEBUG] Injecting chaos mitigation protocol.",
    ],
  },
  reconnecting: {
    headline: "Reconnecting…",
    detail: "Negotiating a futuristic handshake protocol.",
    logLines: [
      "[INFO] Dialing Akshayverse edge node…",
      "[DEBUG] Establishing encrypted neural uplink.",
      "[TRACE] Latency stabilizing. Hold tight.",
    ],
  },
  online: {
    headline: "Connection Restored",
    detail: "Sneaky mode disengaged. Carry on.",
    logLines: [
      "[INFO] Session integrity verified.",
      "[OK] Packet stream back to 99.9% uptime.",
      "[OK] Welcome back, explorer.",
    ],
  },
};

const ChaosOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<StatusPhase>("offline");
  const [glitch, setGlitch] = useState(0);
  const [scanlineOffset, setScanlineOffset] = useState(0);
  const [noiseSeed, setNoiseSeed] = useState(0);
  const rafRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const coverTimerRef = useRef<number | null>(null);
  const [coverVisible, setCoverVisible] = useState(false);

  const asciiBanner = useMemo(
    () => [
      "   ___      __        __           __        ",
      "  / _ |____/ /__ ____/ /__  ____  / /_____ _ ",
      " / __ / __/ / _ `/ _  / _ \\/ __/ /  '_/ _ `/ ",
      "/_/ |_\\__/_/\\_,_/\\_,_/\\___/_/   /_/\\_\\\\_,_/  ",
    ],
    []
  );

  useEffect(() => {
    if (!isVisible) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const animate = () => {
      setGlitch(Math.random());
      setScanlineOffset((prev) => (prev + 1.7) % 6);
      setNoiseSeed(Math.random());
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStart = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      if (coverTimerRef.current) {
        clearTimeout(coverTimerRef.current);
        coverTimerRef.current = null;
      }
      setIsVisible(true);
      setStatus("offline");
      setCoverVisible(true);
      coverTimerRef.current = window.setTimeout(() => {
        setCoverVisible(false);
      }, 1400);
    };

    const handleStatus = (event: Event) => {
      const custom = event as CustomEvent<StatusPhase>;
      if (!custom.detail) return;
      setStatus(custom.detail);
    };

    const handleEnd = () => {
      if (coverTimerRef.current) {
        clearTimeout(coverTimerRef.current);
        coverTimerRef.current = null;
      }
      setCoverVisible(false);
      hideTimerRef.current = window.setTimeout(() => {
        setIsVisible(false);
        setStatus("offline");
      }, 800);
    };

    window.addEventListener("akshay:easterEgg-start", handleStart);
    window.addEventListener("akshay:easterEgg-status", handleStatus as EventListener);
    window.addEventListener("akshay:easterEgg-end", handleEnd);

    return () => {
      window.removeEventListener("akshay:easterEgg-start", handleStart);
      window.removeEventListener("akshay:easterEgg-status", handleStatus as EventListener);
      window.removeEventListener("akshay:easterEgg-end", handleEnd);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      if (coverTimerRef.current) {
        clearTimeout(coverTimerRef.current);
        coverTimerRef.current = null;
      }
    };
  }, []);

  const activeCopy = statusCopy[status];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="chaos-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-[60]"
          aria-hidden
        >
          <AnimatePresence>
            {coverVisible && (
              <motion.div
                key="chaos-cover"
                className="pointer-events-none absolute inset-0 z-10 bg-AAprimary"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${statusStyles[status]} backdrop-blur-xl`}
            animate={{
              opacity: [0.9, 1, 0.95],
              scale: [1.02, 1, 1.01],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.25),transparent_60%)] mix-blend-screen opacity-60"
            animate={{
              rotate: [0, 2, -2, 0],
              scale: [1, 1.03, 1.01, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(148,163,184,0.05) 0px, rgba(148,163,184,0.05) 1px, transparent 1px, transparent 2px)",
              transform: `translateY(${scanlineOffset}px)`,
            }}
            animate={{
              opacity: [0.2, 0.4, 0.25],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='rgba(15,118,110,0.08)' d='M0 32h32v32H0z'/%3E%3Cpath fill='rgba(15,118,110,0.04)' d='M32 0h32v32H32z'/%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.2 + noiseSeed * 0.25,
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 text-center text-slate-200">
            <motion.div
              style={{
                transform: `translate(${(glitch - 0.5) * 16}px, ${
                  (0.5 - glitch) * 10
                }px)`,
              }}
              animate={{
                opacity: [0.8, 1, 0.85],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="font-mono text-xs uppercase tracking-[0.5em] text-AAaccent"
            >
              {activeCopy.headline}
            </motion.div>

            <motion.div
              className="space-y-2 font-mono text-[13px] text-slate-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {asciiBanner.map((line) => (
                <div key={line} className="leading-tight">
                  {line}
                </div>
              ))}
            </motion.div>

            <motion.div
              className="max-w-[460px] rounded-lg border border-slate-500/40 bg-black/40 px-6 py-5 text-left shadow-2xl backdrop-blur"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>akshaykalapgar.com</span>
                <span className="text-AAaccent">{status.toUpperCase()}</span>
              </div>
              <div className="mt-3 text-sm text-slate-200">{activeCopy.detail}</div>
              <div className="mt-4 space-y-1.5 font-mono text-[11px] text-slate-400">
                {activeCopy.logLines.map((line, idx) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.25, duration: 0.35, ease: "easeOut" }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="font-mono text-[11px] text-slate-400"
              animate={{
                opacity: [0.3, 0.7, 0.4],
              }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              &gt; establishing encrypted connection… {status === "online" ? "DONE" : "…"}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChaosOverlay;
