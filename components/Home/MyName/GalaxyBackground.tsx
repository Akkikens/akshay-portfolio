import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface Constellation {
  stars: { x: number; y: number }[];
}

interface GlowingStar {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

interface Galaxy {
  id: number;
  x: number;
  y: number;
  size: number;
  scaleDuration: number;
  rotateDuration: number;
  opacityDuration: number;
}

interface DustParticle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function GalaxyBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [constellations, setConstellations] = useState<Constellation[]>([]);
  const [glowingStars, setGlowingStars] = useState<GlowingStar[]>([]);
  const [galaxies, setGalaxies] = useState<Galaxy[]>([]);
  const [dustParticles, setDustParticles] = useState<DustParticle[]>([]);

  useEffect(() => {
    // Generate regular stars
    const generatedStars: Star[] = Array.from({ length: 300 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setStars(generatedStars);

    // Generate constellations
    const generatedConstellations: Constellation[] = Array.from({ length: 4 }, () => {
      const baseX = Math.random() * 80 + 10;
      const baseY = Math.random() * 80 + 10;
      const numStars = 4 + Math.floor(Math.random() * 3);
      
      return {
        stars: Array.from({ length: numStars }, () => ({
          x: baseX + (Math.random() - 0.5) * 15,
          y: baseY + (Math.random() - 0.5) * 15,
        })),
      };
    });
    setConstellations(generatedConstellations);

    const glowColors = [
      "rgba(255, 255, 255, 1)",
      "rgba(147, 197, 253, 1)",
      "rgba(139, 92, 246, 1)",
      "rgba(16, 185, 129, 1)",
    ];

    // Glowing stars
    const generatedGlowingStars: GlowingStar[] = Array.from({ length: 40 }, (_, i) => {
      const size = Math.random() * 2 + 1;
      const color = glowColors[Math.floor(Math.random() * glowColors.length)];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        color,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 4,
      };
    });
    setGlowingStars(generatedGlowingStars);

    // Distant galaxies
    const generatedGalaxies: Galaxy[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 60 + Math.random() * 40,
      scaleDuration: 8 + Math.random() * 4,
      rotateDuration: 60 + Math.random() * 40,
      opacityDuration: 6 + Math.random() * 3,
    }));
    setGalaxies(generatedGalaxies);

    // Dust particles
    const generatedDust: DustParticle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 8,
    }));
    setDustParticles(generatedDust);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-purple-950/30 to-blue-950/40" />
      
      {/* Rotating galaxy spiral */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-500/5 to-transparent blur-2xl rotate-90" />
      </motion.div>

      {/* Aurora borealis effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/2"
        animate={{
          background: [
            "linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)",
            "linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)",
            "linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)",
            "linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Milky Way band */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, transparent 30%, rgba(147, 197, 253, 0.08) 50%, transparent 70%)",
          transform: "rotate(-25deg) scale(1.5)",
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Epic nebula clouds */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 100%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)",
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -70, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)",
        }}
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Constellation lines */}
      {constellations.map((constellation, idx) => (
        <svg key={`constellation-${idx}`} className="absolute inset-0 w-full h-full">
          {constellation.stars.map((star, i) => {
            if (i === constellation.stars.length - 1) return null;
            const nextStar = constellation.stars[i + 1];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${star.x}%`}
                y1={`${star.y}%`}
                x2={`${nextStar.x}%`}
                y2={`${nextStar.y}%`}
                stroke="rgba(147, 197, 253, 0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.2, 0.4, 0.2] }}
                transition={{
                  pathLength: { duration: 2, delay: idx * 0.5 },
                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            );
          })}
        </svg>
      ))}

      {/* Regular stars - twinkling */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.9)`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.4, star.opacity],
            scale: [1, 0.7, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Bright glowing stars */}
      {glowingStars.map((star) => (
        <motion.div
          key={`glow-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `radial-gradient(circle, ${star.color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${star.size * 6}px ${star.size * 2}px ${star.color.replace("1)", "0.5)")}`,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Distant spiral galaxies */}
      {galaxies.map((galaxy) => (
        <motion.div
          key={`galaxy-${galaxy.id}`}
          className="absolute rounded-full"
          style={{
            left: `${galaxy.x}%`,
            top: `${galaxy.y}%`,
            width: `${galaxy.size}px`,
            height: `${galaxy.size}px`,
            background:
              "radial-gradient(ellipse, rgba(147, 197, 253, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
            filter: "blur(3px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            scale: { duration: galaxy.scaleDuration, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: galaxy.rotateDuration, repeat: Infinity, ease: "linear" },
            opacity: { duration: galaxy.opacityDuration, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      {/* Cosmic dust particles */}
      {dustParticles.map((particle) => (
        <motion.div
          key={`dust-${particle.id}`}
          className="absolute w-px h-px bg-blue-200/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [0, -20, -40],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
