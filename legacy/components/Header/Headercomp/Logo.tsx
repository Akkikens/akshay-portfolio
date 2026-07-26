import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type StatusPhase = "offline" | "reconnecting" | "online" | null;

export default function Logo(props: { finishedLoading: boolean }) {
  const [isChaos, setIsChaos] = useState(false);
  const [status, setStatus] = useState<StatusPhase>(null);
  const timeoutsRef = useRef<number[]>([]);

  const baseSegments = [
    { rotate: -30, x: 0, y: 5, scale: 1 },
    { rotate: 90, x: -10, y: 18, scale: 1 },
    { rotate: 30, x: 0, y: 31, scale: 1 },
    { rotate: -30, x: 19, y: 27, scale: 1 },
    { rotate: 30, x: 19, y: -10, scale: 1 },
    { rotate: 90, x: 28, y: 2, scale: 1 },
  ];

  const chaosSegments = [
    { rotate: -320, x: -32, y: -26, scale: 1.4 },
    { rotate: 540, x: 42, y: 26, scale: 1.2 },
    { rotate: 260, x: -12, y: 46, scale: 1.8 },
    { rotate: -420, x: 46, y: 8, scale: 0.8 },
    { rotate: 640, x: 4, y: -36, scale: 1.6 },
    { rotate: -560, x: 58, y: -22, scale: 1.3 },
  ];

  const clearTimers = () => {
    timeoutsRef.current.forEach((timerId) => clearTimeout(timerId));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatchStatus = (phase: StatusPhase | "end") => {
    if (typeof window === "undefined") return;
    if (phase === "end") {
      window.dispatchEvent(new CustomEvent("akshay:easterEgg-end"));
    } else {
      window.dispatchEvent(
        new CustomEvent("akshay:easterEgg-status", { detail: phase })
      );
    }
  };

  const triggerChaos = () => {
    if (isChaos) return;
    if (typeof window === "undefined") return;

    clearTimers();
    setIsChaos(true);
    setStatus("offline");
    window.dispatchEvent(new CustomEvent("akshay:easterEgg-start"));
    dispatchStatus("offline");

    timeoutsRef.current.push(
      window.setTimeout(() => {
        setStatus("reconnecting");
        dispatchStatus("reconnecting");
      }, 1600)
    );
    timeoutsRef.current.push(
      window.setTimeout(() => {
        setStatus("online");
        dispatchStatus("online");
      }, 2900)
    );
    timeoutsRef.current.push(
      window.setTimeout(() => {
        setStatus(null);
        setIsChaos(false);
        clearTimers();
        dispatchStatus("end");
      }, 4200)
    );
  };

  return (
    <motion.button
      type="button"
      onClick={triggerChaos}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        y: { delay: props.finishedLoading ? 0 : 4.5, duration: 0 },
        opacity: { delay: props.finishedLoading ? 0 : 4.5, duration: 0 },
      }}
      className="relative h-12 w-10 origin-center cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-AAaccent/60"
      whileTap={{ scale: 0.92, rotate: isChaos ? 12 : 0 }}
      aria-label="Akshay Kalapgar"
    >
      <motion.span
        initial={{ x: 1, rotate: 0 }}
        animate={
          isChaos
            ? {
                rotate: [0, -10, 12, -8, 6, 0],
                y: [0, -4, 6, -8, 0],
                color: ["#64ffda", "#fbbf24", "#f87171", "#38bdf8", "#e2e8f0"],
              }
            : { rotate: 0, y: 0, color: "#64ffda" }
        }
        transition={{
          duration: isChaos ? 1.6 : 0.6,
          ease: "easeInOut",
        }}
        className="absolute flex h-full w-full items-center justify-center text-lg font-Header text-AAsecondary"
      >
        <motion.span
          animate={
            isChaos
              ? {
                  x: [0, -2, 2, -4, 4, 0],
                  textShadow: [
                    "0px 0px 0px rgba(100,255,218,0.15)",
                    "6px 0px 6px rgba(248,113,113,0.35)",
                    "-4px 0px 8px rgba(14,165,233,0.45)",
                    "0px 0px 0px rgba(100,255,218,0.25)",
                  ],
                }
              : { x: 0, textShadow: "0px 0px 0px rgba(100,255,218,0)" }
          }
          transition={{ duration: isChaos ? 1.1 : 0.4, repeat: isChaos ? 2 : 0 }}
        >
          A
        </motion.span>
      </motion.span>

      {(isChaos ? chaosSegments : baseSegments).map((segment, index) => (
        <motion.div
          key={index}
          animate={segment}
          transition={{
            type: "spring",
            stiffness: isChaos ? 180 : 120,
            damping: isChaos ? 12 : 18,
            duration: isChaos ? 0.8 : 0.4,
          }}
          className="h-1 w-6 rounded bg-AAsecondary"
        />
      ))}

      <AnimatePresence>
        {status && (
          <motion.div
            key={status}
            initial={{ opacity: 0, x: 12, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 14, y: -12, scale: 1 }}
            exit={{ opacity: 0, x: 22, y: -16, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-none absolute left-full top-1/2 ml-4 w-48 -translate-y-1/2 rounded-md border border-AAsecondary/40 bg-AAprimary/90 px-3 py-2 text-left text-xs text-AAtext shadow-2xl backdrop-blur-sm"
          >
            {status === "offline" && (
              <>
                <div className="flex items-center gap-2 font-semibold text-rose-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
                  This site can’t be reached
                </div>
                <p className="mt-1 text-[11px] text-slate-300">
                  akshaykalapgar.com took too long to respond.
                </p>
              </>
            )}
            {status === "reconnecting" && (
              <>
                <div className="flex items-center gap-2 font-semibold text-amber-300">
                  <span className="h-2 w-2 animate-ping rounded-full bg-amber-400" />
                  Reconnecting…
                </div>
                <p className="mt-1 text-[11px] text-slate-300">
                  Negotiating a futuristic handshake protocol.
                </p>
              </>
            )}
            {status === "online" && (
              <>
                <div className="flex items-center gap-2 font-semibold text-emerald-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Connection restored
                </div>
                <p className="mt-1 text-[11px] text-slate-300">
                  Sneaky mode disengaged. Carry on.
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
