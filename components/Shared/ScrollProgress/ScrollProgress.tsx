import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Light spring only — Lenis already lerps the scroll position, so a heavy
  // spring here would double-smooth and make the bar lag behind the page.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 36,
    restDelta: 0.001,
  });

  useEffect(() => {
    const checkScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", checkScroll);
    checkScroll();

    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-AAsecondary via-AAaccent to-AAsecondary z-50 origin-left pointer-events-none"
      style={{
        scaleX,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.3 } }}
    >
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-AAsecondary via-AAaccent to-AAsecondary blur-sm opacity-70" />
    </motion.div>
  );
}
