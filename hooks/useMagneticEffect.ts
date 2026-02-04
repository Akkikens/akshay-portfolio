import { useRef, useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

interface MagneticEffectOptions {
  strength?: number;
  disabled?: boolean;
}

export const useMagneticEffect = (options: MagneticEffectOptions = {}) => {
  const { strength = 0.15, disabled = false } = options;
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    if (disabled) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Calculate distance from center
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Only apply effect within reasonable range
      const maxDistance = rect.width;

      if (distance < maxDistance) {
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, strength, disabled]);

  return { ref, x: xSpring, y: ySpring };
};
