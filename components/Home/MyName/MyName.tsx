import React from "react";
import NextLink from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { scroller } from "react-scroll";

type Props = { finishedLoading?: boolean };

export default function MyName({ finishedLoading = false }: Props) {
  // Don’t render anything until the intros are done
  if (!finishedLoading) return null;

  const prefersReduced = useReducedMotion();
  const baseDelay = prefersReduced ? 0 : 0.05;

  const fadeUp = (extraDelay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay: baseDelay + extraDelay, ease: [0.22, 1, 0.36, 1] as any },
  });

  const scrollTo = (id: string, offset = -50) =>
    scroller.scrollTo(id, { duration: 300, smooth: true, offset });

  return (
    <section id="home" className="bg-AAprimary text-gray-300" aria-label="Introduction">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="min-h-[80vh] flex flex-col justify-center py-28 sm:py-36">
          <motion.span {...fadeUp(0)} className="font-mono text-AAsecondary">Hello, I am</motion.span>
          <motion.h1 {...fadeUp(0.12)} className="mt-3 font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Akshay Kalapgar.
          </motion.h1>
          <motion.h2 {...fadeUp(0.24)} className="mt-3 font-bold text-gray-400 tracking-tight text-3xl sm:text-4xl md:text-5xl">
            I build impactful digital solutions.
          </motion.h2>

          <motion.p {...fadeUp(0.36)} className="mt-8 font-Header text-[15px] sm:text-base leading-8 text-gray-400 max-w-[70ch]">
            Full-stack engineer focused on <span className="text-AAsecondary">performance</span> and{" "}
            <span className="text-AAsecondary">reliability</span>. I ship React/Next.js with SSR & perf budgets,
            instrument RUM via OTel, and own SLI/SLOs. Recently increased engagement by{" "}
            <span className="text-AAsecondary">60%</span> and reduced API latency by{" "}
            <span className="text-AAsecondary">55%</span> at UMass Chan. Comfortable across{" "}
            <span className="text-AAsecondary">AWS serverless</span>, <span className="text-AAsecondary">TypeScript</span>, and{" "}
            <span className="text-AAsecondary">system design</span>.
          </motion.p>

          <motion.ul {...fadeUp(0.48)} className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
            {[
              "Next.js • TypeScript • Node",
              "AWS (Lambda / API GW / SQS)",
              "Observability: OTel / Prometheus",
              "Ownership: SLOs • On-call • Runbooks",
              "DX: 500+ tests • CI/CD",
            ].map((chip) => (
              <li key={chip} className="text-xs sm:text-[13px] text-gray-300 bg-MobileNavBarColor/50 border border-MobileNavBarColor/70 rounded px-2 py-1">
                {chip}
              </li>
            ))}
          </motion.ul>

          <motion.div {...fadeUp(0.6)} className="mt-10 flex flex-wrap gap-4">
            <NextLink href="/resume.pdf" target="_blank" rel="noreferrer" aria-label="Open my resume in a new tab">
              <button className="bg-AAprimary text-AAsecondary border border-AAsecondary rounded px-5 sm:px-7 py-3 hover:bg-ResumeButtonHover transition">
                View My Resume
              </button>
            </NextLink>

            <button
              onClick={() => scrollTo("SomethingIveBuiltSection", 100)}
              className="rounded px-5 sm:px-7 py-3 border border-transparent bg-MobileNavBarColor/60 hover:bg-MobileNavBarColor transition"
              aria-label="Jump to my work section"
            >
              See My Work
            </button>

            <button
              onClick={() => scrollTo("GetInTouchSection", 100)}
              className="rounded px-5 sm:px-7 py-3 border border-transparent bg-MobileNavBarColor/40 hover:bg-MobileNavBarColor/60 transition"
              aria-label="Jump to contact section"
            >
              Contact
            </button>
          </motion.div>

          <motion.p {...fadeUp(0.72)} className="mt-6 text-sm text-gray-500 max-w-[70ch]">
            Exploring high-ownership roles on product/platform teams. Comfortable leading performance initiatives, migrations, and incident response.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
