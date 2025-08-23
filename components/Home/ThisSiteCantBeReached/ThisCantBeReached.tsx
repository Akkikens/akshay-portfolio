import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** How long the fake error stays on screen (ms). Default 1400. */
  totalMs?: number;
  /** Domain label shown in the chrome bar. */
  domain?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ThisCantBeReached({
  totalMs = 1400,
  domain = "www.akshaykalapgar.com",
}: Props) {
  const prefersReduced = useReducedMotion();
  const [show, setShow] = React.useState(true);
  const [flip, setFlip] = React.useState(false); // ERR -> OK

  React.useEffect(() => {
    if (prefersReduced) {
      const t = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(t);
    }
    // Quick flip then exit
    const flipAt = Math.max(450, totalMs * 0.45);
    const t1 = setTimeout(() => setFlip(true), flipAt);
    const t2 = setTimeout(() => setShow(false), totalMs);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [prefersReduced, totalMs]);

  if (!show) return null;

  const accent = "var(--aa-secondary, #64ffda)";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: Math.max(0.8, totalMs / 1100), duration: 0.25 }}
      className="fixed inset-0 z-[55] bg-white flex items-center justify-center px-4 sm:px-10"
      role="alert"
      aria-live="polite"
    >
      {/* tiny corner critter so viewers know it's playful, not a real error */}
      {!prefersReduced && (
        <motion.div
          initial={{ x: -36, y: -36, rotate: -10, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute top-4 left-4"
        >
          <div
            className="relative"
            style={{
              width: 22,
              height: 22,
              borderRadius: 7,
              background: accent,
              boxShadow: `0 0 16px ${accent}55`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center gap-0.5">
              <span className="w-1 h-1 bg-white rounded-full" />
              <span className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        </motion.div>
      )}

      {/* “browser” card */}
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="w-full max-w-[720px] rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-red-400/80" />
            <span className="inline-block h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="inline-block h-3 w-3 rounded-full bg-green-400/80" />
          </div>
          <span className="text-xs font-mono text-gray-500">{domain}</span>
        </div>

        <div className="mt-5 sm:mt-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
            {flip ? "All good — connecting…" : "This site can’t be reached"}
          </h3>

          <p className="mt-2 text-gray-600">
            {flip ? (
              <>
                Network OK, preparing UI <span className="text-gray-400">•</span>{" "}
                <span className="text-gray-400">•</span>{" "}
                <span className="text-gray-400">•</span>
              </>
            ) : (
              <>
                <span className="font-semibold">{domain}</span> unexpectedly{" "}
                <span className="font-semibold">closed</span> the connection.
              </>
            )}
          </p>

          <div className="mt-4 space-y-1 text-sm font-mono">
            <div className="text-gray-500">
              {flip ? (
                <span className="text-green-600 font-semibold">SUCC_CONNECTION_OPENED</span>
              ) : (
                <span className="text-gray-600">ERR_CONNECTION_CLOSED</span>
              )}
            </div>

            {/* progress bar */}
            {!prefersReduced && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: Math.max(0.7, totalMs / 1600), ease: EASE }}
                className="h-1.5 rounded bg-gray-200 overflow-hidden"
              >
                <div className="h-full" style={{ background: accent }} />
              </motion.div>
            )}
          </div>

          {/* tiny “tips” list to sell the illusion */}
          {!flip && (
            <div className="mt-4 text-sm">
              <div className="text-gray-500 mb-1">Try:</div>
              <ul className="pl-5 list-disc text-gray-500/90 space-y-1">
                <li>Checking the connection</li>
                <li className="text-blue-600/80">Checking the proxy and the firewall</li>
                <li className="text-blue-600/80">Running Windows Network Diagnostics</li>
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
