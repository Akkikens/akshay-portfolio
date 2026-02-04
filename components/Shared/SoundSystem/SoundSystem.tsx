import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SoundContextType {
  enabled: boolean;
  toggleSound: () => void;
  playSound: (soundName: keyof typeof sounds) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Simple sound generator using Web Audio API
const sounds = {
  click: { frequency: 800, duration: 0.05, type: "sine" as OscillatorType },
  hover: { frequency: 1000, duration: 0.03, type: "sine" as OscillatorType },
  success: { frequency: 1200, duration: 0.15, type: "triangle" as OscillatorType },
  error: { frequency: 300, duration: 0.2, type: "sawtooth" as OscillatorType },
  transition: { frequency: 600, duration: 0.1, type: "sine" as OscillatorType },
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Check localStorage for saved preference
    const savedPreference = localStorage.getItem("soundEnabled");
    if (savedPreference !== null) {
      setEnabled(savedPreference === "true");
    }

    // Initialize Audio Context
    if (typeof window !== "undefined") {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
    }

    return () => {
      audioContext?.close();
    };
  }, []);

  const toggleSound = useCallback(() => {
    setEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("soundEnabled", String(newValue));
      return newValue;
    });
  }, []);

  const playSound = useCallback(
    (soundName: keyof typeof sounds) => {
      if (!enabled || !audioContext) return;

      const sound = sounds[soundName];
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = sound.type;
      oscillator.frequency.value = sound.frequency;

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + sound.duration
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + sound.duration);
    },
    [enabled, audioContext]
  );

  return (
    <SoundContext.Provider value={{ enabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return context;
}

// Sound Toggle Component
export function SoundToggle() {
  const { enabled, toggleSound } = useSound();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={toggleSound}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-12 h-12 rounded-full bg-AAhover/50 border border-AAborder/50 backdrop-blur-sm flex items-center justify-center group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Sound ${enabled ? "enabled" : "disabled"}`}
      >
        <AnimatePresence mode="wait">
          {enabled ? (
            <motion.svg
              key="sound-on"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-AAsecondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="sound-off"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-AAsubtext"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Ripple effect when enabled */}
        {enabled && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-AAsecondary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-AAprimary/90 backdrop-blur-sm border border-AAborder/50 rounded-lg text-xs text-AAtext"
          >
            Sound {enabled ? "On" : "Off"}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-AAprimary/90" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// HOC to add sound to any component
export function withSound<P extends object>(
  Component: React.ComponentType<P>,
  soundType: keyof typeof sounds = "click"
) {
  return function WithSoundComponent(props: P) {
    const { playSound } = useSound();

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        playSound(soundType);
        const originalOnClick = (props as any).onClick;
        if (originalOnClick) {
          originalOnClick(e);
        }
      },
      [playSound]
    );

    return <Component {...props} onClick={handleClick} />;
  };
}
