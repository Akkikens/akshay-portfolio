import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";
import GalaxyBackground from "./GalaxyBackground";

type Props = { finishedLoading?: boolean };

export default function MyName({ finishedLoading = false }: Props) {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      top: string;
      duration: number;
      delay: number;
    }>
  >([]);
  
  // Don't render anything until the intros are done
  if (!finishedLoading) return null;

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string, offset = -50) =>
    scroller.scrollTo(id, { duration: 800, smooth: "easeInOutCubic", offset });

  // Apple-like scroll transform for the name
  const nameScale = mounted ? Math.max(0.7, 1 - scrollY * 0.0008) : 1;
  const nameOpacity = mounted ? Math.max(0.3, 1 - scrollY * 0.002) : 1;

  return (
    <section id="home" className="bg-gradient-to-br from-AAprimary via-AAprimary to-MobileNavBarColor text-AAtext relative overflow-x-hidden" aria-label="Introduction">
      {/* Galaxy Background */}
      <GalaxyBackground />
      
      {/* Animated Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-AAsecondary/5 via-transparent to-AAaccent/5 pointer-events-none" />
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-AAsecondary/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-AAaccent/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-AAsecondary/30 rounded-full pointer-events-none"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
      
      <div className="relative mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="min-h-[100vh] flex flex-col justify-center py-28 sm:py-36">
          <motion.span
            className="font-mono text-AAaccent text-sm sm:text-base font-medium tracking-wide inline-block"
            initial={{ opacity: 0, x: -50, rotateX: -90 }}
            animate={{ opacity: 1, x: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
          >
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              👋
            </motion.span> Hello, I am
          </motion.span>
          
          {/* Epic animated name with particles */}
          <motion.h1 
            className="mt-6 font-bold tracking-tight text-AAtext relative"
            style={{
              fontSize: `clamp(2.5rem, ${4 + nameScale * 2}vw, 5rem)`,
              transform: `scale(${nameScale})`,
              opacity: nameOpacity,
              transformOrigin: "left center",
            }}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.2, 
              ease: [0.22, 1, 0.36, 1],
              type: "spring",
              stiffness: 80
            }}
          >
            <motion.span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #f8fafc 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {["A", "k", "s", "h", "a", "y", " ", "K", "a", "l", "a", "p", "g", "a", "r", "."].map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.2,
                    color: "#06b6d4",
                    transition: { duration: 0.2 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          
          <motion.h2 
            className="mt-4 font-semibold text-AAtext tracking-tight text-2xl sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 20, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              type: "spring"
            }}
          >
            <motion.span
              className="inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              I build impactful digital solutions.
            </motion.span>
          </motion.h2>

          <motion.p 
            className="mt-8 text-base sm:text-lg leading-relaxed text-AAtext max-w-[65ch]"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Full-stack engineer focused on{" "}
            <motion.span 
              className="text-AAsecondary font-semibold inline-block"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
            >
              performance
            </motion.span>{" "}
            and{" "}
            <motion.span 
              className="text-AAsecondary font-semibold inline-block"
              whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.3 }}
            >
              scalability
            </motion.span>
            . I build React/Next.js applications with server-side rendering,
            optimize frontend performance, and design scalable backend systems. Recently increased engagement by{" "}
            <motion.span 
              className="text-AAsuccess font-bold inline-block"
              animate={{ 
                scale: [1, 1.1, 1],
                textShadow: [
                  "0 0 0px rgba(16, 185, 129, 0)",
                  "0 0 20px rgba(16, 185, 129, 0.5)",
                  "0 0 0px rgba(16, 185, 129, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              60%
            </motion.span>{" "}
            and reduced API latency by{" "}
            <motion.span 
              className="text-AAsuccess font-bold inline-block"
              animate={{ 
                scale: [1, 1.1, 1],
                textShadow: [
                  "0 0 0px rgba(16, 185, 129, 0)",
                  "0 0 20px rgba(16, 185, 129, 0.5)",
                  "0 0 0px rgba(16, 185, 129, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              55%
            </motion.span>{" "}
            at UMass Chan.
          </motion.p>

          <motion.div 
            className="mt-8 flex flex-wrap gap-3" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              "Next.js • TypeScript • Node.js",
              "AWS • Python • PostgreSQL", 
              "AI/ML: LangChain • OpenAI • Hugging Face",
              "Testing & CI/CD • Docker",
            ].map((chip, i) => (
              <motion.span 
                key={chip} 
                className="text-sm text-AAtext bg-AAhover border border-AAborder rounded-full px-4 py-2 backdrop-blur-sm cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 2 + i * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  borderColor: "#06b6d4",
                  color: "#06b6d4",
                  backgroundColor: "rgba(6, 182, 212, 0.1)",
                  boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <NextLink href="/resume.pdf" target="_blank" rel="noreferrer">
              <motion.button 
                className="relative bg-gradient-to-r from-AAsecondary to-AAaccent text-white rounded-full px-8 py-3 font-semibold shadow-lg shadow-AAsecondary/30 overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(6, 182, 212, 0.3)",
                    "0 10px 40px rgba(34, 211, 238, 0.4)",
                    "0 10px 30px rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-AAaccent to-AAsecondary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">View Resume</span>
              </motion.button>
            </NextLink>

            <motion.button
              onClick={() => scrollTo("SomethingIveContributedSection", 100)}
              className="rounded-full px-8 py-3 font-medium border-2 border-AAborder text-AAtext backdrop-blur-sm relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#06b6d4",
                color: "#06b6d4"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-AAsecondary/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">See My Work</span>
            </motion.button>

            <motion.button
              onClick={() => scrollTo("GetInTouchSection", 100)}
              className="rounded-full px-8 py-3 font-medium text-AAsubtext hover:text-AAtext hover:bg-AAhover border-2 border-AAborder hover:border-AAaccent transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
          </motion.div>

          {/* Location Badge */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="font-mono text-xs sm:text-sm text-AAsubtext px-3 py-1.5 rounded-full border border-AAborder/50 backdrop-blur-md bg-AAhover/40 inline-flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                borderColor: "#06b6d4",
                backgroundColor: "rgba(6, 182, 212, 0.15)",
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)"
              }}
            >
              <motion.span
                className="text-base"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                📍
              </motion.span>
              <span className="font-medium">San Francisco, CA</span>
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
