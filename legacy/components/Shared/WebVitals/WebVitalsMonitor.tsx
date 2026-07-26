import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from "web-vitals";

interface VitalsData {
  CLS: number | null;
  INP: number | null;
  LCP: number | null;
  FCP: number | null;
  TTFB: number | null;
}

const thresholds = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  INP: { good: 200, needsImprovement: 500 },
  LCP: { good: 2500, needsImprovement: 4000 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

export default function WebVitalsMonitor() {
  const [vitals, setVitals] = useState<VitalsData>({
    CLS: null,
    INP: null,
    LCP: null,
    FCP: null,
    TTFB: null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateMetric = (metric: Metric) => {
      setVitals((prev) => ({
        ...prev,
        [metric.name]: metric.value,
      }));
    };

    onCLS(updateMetric);
    onINP(updateMetric);
    onLCP(updateMetric);
    onFCP(updateMetric);
    onTTFB(updateMetric);
  }, [mounted]);

  const getStatus = (name: keyof VitalsData, value: number | null) => {
    if (value === null) return "loading";
    const threshold = thresholds[name];
    if (value <= threshold.good) return "good";
    if (value <= threshold.needsImprovement) return "needs-improvement";
    return "poor";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "from-AAsuccess to-AAsuccess";
      case "needs-improvement":
        return "from-AAwarning to-AAwarning";
      case "poor":
        return "from-red-500 to-red-600";
      default:
        return "from-AAsubtext to-AAsubtext";
    }
  };

  const formatValue = (name: keyof VitalsData, value: number | null) => {
    if (value === null) return "—";
    if (name === "CLS") return value.toFixed(3);
    return Math.round(value).toString();
  };

  const getUnit = (name: keyof VitalsData) => {
    if (name === "CLS") return "";
    return "ms";
  };

  if (!mounted) return null;

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-AAsecondary to-AAaccent text-white rounded-full p-3 shadow-lg shadow-AAsecondary/30 hover:shadow-xl hover:shadow-AAsecondary/40 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle Web Vitals Monitor"
        title="Web Vitals Monitor"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </motion.button>

      {/* Vitals Dashboard */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 bg-AAprimary/95 backdrop-blur-lg border border-AAborder/50 rounded-2xl shadow-2xl shadow-AAsecondary/20 p-6 w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-AAtext flex items-center gap-2">
                <span className="text-AAaccent">⚡</span>
                Web Vitals
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-AAsubtext hover:text-AAtext transition-colors"
                aria-label="Close Web Vitals Monitor"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {Object.entries(vitals).map(([name, value]) => {
                const status = getStatus(name as keyof VitalsData, value);
                const color = getStatusColor(status);

                return (
                  <motion.div
                    key={name}
                    className="bg-AAhover/50 rounded-lg p-3 border border-AAborder/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-AAtext">
                        {name}
                      </span>
                      <motion.div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-AAaccent">
                        {formatValue(name as keyof VitalsData, value)}
                      </span>
                      <span className="text-xs text-AAsubtext">
                        {getUnit(name as keyof VitalsData)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-AAborder/30">
              <p className="text-xs text-AAsubtext text-center">
                Real-time Core Web Vitals monitoring
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
