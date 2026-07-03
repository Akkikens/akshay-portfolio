import React, { useRef } from "react";
import NextLink from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import GalaxyBackground from "./GalaxyBackground";
import GithubIcon from "../../Icons/GithubIcon";
import LinkedinIcon from "../../Icons/LinkedinIcon";
import { scrollToTarget } from "../../../hooks/useLenis";
import { useMagneticEffect } from "../../../hooks/useMagneticEffect";

type Props = { finishedLoading?: boolean };

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function MyName({ finishedLoading = false }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Hero exit progress: 0 at page top → 1 when the hero has scrolled away.
  // Drives layered parallax (content rises faster than blobs) + the radial.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Magnetic pull on the primary CTA only
  const magnetic = useMagneticEffect({ strength: 0.2, disabled: !!prefersReducedMotion });

  const scrollTo = (id: string) => scrollToTarget(`#${id}`);

  if (!finishedLoading) return null;

  // Staggered, fast entrance — everything visible in ~1s
  const reveal = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: easeOut },
  });

  return (
    <section
      id="home"
      ref={heroRef}
      className="bg-gradient-to-br from-AAprimary via-AAprimary to-MobileNavBarColor text-AAtext relative overflow-x-hidden"
      aria-label="Introduction"
    >
      {/* Galaxy Background */}
      <GalaxyBackground />

      {/* Ambient layers — blobs drift slower than content for scroll depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-AAsecondary/5 via-transparent to-AAaccent/5 pointer-events-none" />
      <motion.div
        aria-hidden="true"
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-AAsecondary/10 rounded-full blur-3xl pointer-events-none"
        style={prefersReducedMotion ? undefined : { y: blobY }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <motion.div
          className="min-h-[100vh] flex flex-col justify-center py-28 sm:py-36"
          style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <motion.span
            className="font-mono text-AAsecondary text-sm sm:text-base tracking-wide"
            {...reveal(0)}
          >
            Hi, my name is
          </motion.span>

          <motion.h1
            className="mt-5 font-bold tracking-hero text-AAtext text-[clamp(2.75rem,7vw,4.5rem)] leading-[1.05]"
            {...reveal(0.1)}
          >
            <span
              className="inline-block"
              style={{
                background:
                  "linear-gradient(135deg, #f8fafc 0%, #f8fafc 55%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Akshay Kalapgar.
            </span>
          </motion.h1>

          <motion.h2
            className="mt-3 font-semibold tracking-tight text-AAsubtext text-[clamp(1.5rem,4vw,2.5rem)] leading-tight max-w-[24ch]"
            {...reveal(0.2)}
          >
            AI Agent Engineer — I ship agents to production.
          </motion.h2>

          <motion.p
            className="mt-8 text-base sm:text-lg leading-relaxed text-AAsubtext max-w-[62ch]"
            {...reveal(0.3)}
          >
            I build <span className="text-AAsecondary font-medium">multi-agent systems</span>,{" "}
            <span className="text-AAsecondary font-medium">agent harnesses</span>, and{" "}
            <span className="text-AAsecondary font-medium">MCP servers</span> — plus the
            evals, observability, and infrastructure that make agents reliable in
            production. 4+ years delivering real-time systems across healthcare,
            e-commerce, and edtech — embedded with customers, owning outcomes end to end.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap gap-3" {...reveal(0.4)}>
            {[
              "Multi-Agent Orchestration · MCP",
              "Claude Code · Evals · Tool Use",
              "Kubernetes · Terraform · AWS/GCP",
              "Datadog · OpenTelemetry",
              "Next.js · TypeScript · Python",
            ].map((chip) => (
              <span
                key={chip}
                className="font-mono text-xs sm:text-sm text-AAsubtext bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2 transition-colors duration-200 hover:text-AAsecondary hover:border-AAsecondary/40"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div className="mt-12 flex flex-wrap items-center gap-4" {...reveal(0.5)}>
            <NextLink href="/resume.pdf" target="_blank" rel="noreferrer">
              <motion.button
                ref={magnetic.ref as React.RefObject<HTMLButtonElement>}
                className="bg-gradient-to-r from-AAsecondary to-AAaccent text-AAprimary rounded-full px-8 py-3 font-semibold shadow-[0_0_28px_rgba(6,182,212,0.35)] cursor-pointer"
                style={prefersReducedMotion ? undefined : { x: magnetic.x, y: magnetic.y }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                View Resume
              </motion.button>
            </NextLink>

            <motion.button
              onClick={() => scrollTo("GetInTouchSection")}
              className="rounded-full px-8 py-3 font-medium border border-AAborder text-AAtext hover:border-AAsecondary hover:text-AAsecondary transition-colors duration-200 cursor-pointer"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.2, ease: easeOut }}
            >
              Get In Touch
            </motion.button>

            <div className="flex items-center gap-3 sm:ml-2">
              <a
                href="https://github.com/Akkikens"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="p-2.5 rounded-full border border-AAborder text-AAsubtext hover:text-AAsecondary hover:border-AAsecondary transition-colors duration-200"
              >
                <GithubIcon className="w-5 h-5 fill-current" />
              </a>
              <a
                href="https://www.linkedin.com/in/akshaykalapgar/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="p-2.5 rounded-full border border-AAborder text-AAsubtext hover:text-AAsecondary hover:border-AAsecondary transition-colors duration-200"
              >
                <LinkedinIcon className="w-5 h-5 fill-current" />
              </a>
            </div>
          </motion.div>

          <motion.div className="mt-10" {...reveal(0.6)}>
            <span className="font-mono text-xs sm:text-sm text-AAsubtext px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm inline-flex items-center gap-2">
              <svg
                className="w-4 h-4 text-AAsecondary"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              San Francisco, CA · Open to AI agent &amp; forward-deployed roles
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll radial — ring fills as the hero scrolls away; click to descend */}
      <motion.button
        onClick={() => scrollTo("aboutSection")}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center text-AAsubtext hover:text-AAsecondary transition-colors duration-200 cursor-pointer"
        style={prefersReducedMotion ? undefined : { opacity: contentOpacity }}
      >
        <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
          <motion.circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ pathLength: prefersReducedMotion ? 1 : scrollYProgress }}
          />
        </svg>
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
          animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }
          }
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </motion.svg>
      </motion.button>
    </section>
  );
}
