import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-AAborder/30 animate-pulse" />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-AAborder/30 backdrop-blur-sm border border-AAborder/50 overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-AAsecondary/20 to-AAaccent/20"
        animate={{
          opacity: isDark ? 1 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Sliding circle */}
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-gradient-to-br shadow-lg flex items-center justify-center"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #0a0e1a 0%, #1e293b 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          boxShadow: isDark
            ? "0 2px 8px rgba(6, 182, 212, 0.4)"
            : "0 2px 8px rgba(0, 0, 0, 0.2)",
        }}
        animate={{
          x: isDark ? 2 : 30,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="text-xs"
            >
              🌙
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ duration: 0.3 }}
              className="text-xs"
            >
              ☀️
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-AAsecondary/0 via-AAsecondary/20 to-AAaccent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.button>
  );
}
