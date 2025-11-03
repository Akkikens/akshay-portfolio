import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";

type Props = { finishedLoading?: boolean };

export default function MyName({ finishedLoading = false }: Props) {
  const [scrollY, setScrollY] = useState(0);
  
  // Don't render anything until the intros are done
  if (!finishedLoading) return null;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string, offset = -50) =>
    scroller.scrollTo(id, { duration: 800, smooth: "easeInOutCubic", offset });

  // Apple-like scroll transform for the name
  const nameScale = Math.max(0.7, 1 - scrollY * 0.0008);
  const nameOpacity = Math.max(0.3, 1 - scrollY * 0.002);

  return (
    <section id="home" className="bg-gradient-to-br from-AAprimary via-AAprimary to-MobileNavBarColor text-AAtext relative overflow-hidden" aria-label="Introduction">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-AAsecondary/5 via-transparent to-AAaccent/5" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-AAsecondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-AAaccent/10 rounded-full blur-3xl" />
      
      <div className="relative mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="min-h-[100vh] flex flex-col justify-center py-28 sm:py-36">
          <motion.span 
            className="font-mono text-AAaccent text-sm sm:text-base font-medium tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            👋 Hello, I am
          </motion.span>
          
          {/* Apple-like scaling name */}
          <motion.h1 
            className="mt-6 font-bold tracking-tight text-AAtext"
            style={{
              fontSize: `clamp(2.5rem, ${4 + nameScale * 2}vw, 5rem)`,
              transform: `scale(${nameScale})`,
              opacity: nameOpacity,
              transformOrigin: "left center",
              background: "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Akshay Kalapgar.
          </motion.h1>
          
          <motion.h2 
            className="mt-4 font-semibold text-AAtext tracking-tight text-2xl sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            I build impactful digital solutions.
          </motion.h2>

          <motion.p 
            className="mt-8 text-base sm:text-lg leading-relaxed text-AAtext max-w-[65ch]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Full-stack engineer focused on <span className="text-AAsecondary font-semibold">performance</span> and{" "}
            <span className="text-AAsecondary font-semibold">scalability</span>. I build React/Next.js applications with server-side rendering,
            optimize frontend performance, and design scalable backend systems. Recently increased engagement by{" "}
            <span className="text-AAsuccess font-semibold">60%</span> and reduced API latency by{" "}
            <span className="text-AAsuccess font-semibold">55%</span> at UMass Chan.
          </motion.p>

          <motion.div 
            className="mt-8 flex flex-wrap gap-2" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              "Next.js • TypeScript • Node.js",
              "AWS • Python • PostgreSQL", 
              "AI/ML: LangChain • OpenAI • Hugging Face",
              "Testing & CI/CD • Docker",
            ].map((chip) => (
              <span key={chip} className="text-sm text-AAtext bg-AAhover border border-AAborder rounded-full px-4 py-2 hover:border-AAsecondary hover:text-AAsecondary hover:bg-AAsecondary/10 transition-all duration-300 backdrop-blur-sm">
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <NextLink href="/resume.pdf" target="_blank" rel="noreferrer">
              <button className="bg-gradient-to-r from-AAsecondary to-AAaccent text-white rounded-full px-8 py-3 font-semibold hover:from-ResumeButtonHover hover:to-AAsecondary transition-all duration-300 hover:scale-105 shadow-lg shadow-AAsecondary/30 hover:shadow-AAsecondary/50">
                View Resume
              </button>
            </NextLink>

            <button
              onClick={() => scrollTo("SomethingIveContributedSection", 100)}
              className="rounded-full px-8 py-3 font-medium border border-AAborder text-AAtext hover:bg-AAhover hover:border-AAsecondary hover:text-AAsecondary transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              See My Work
            </button>

            <button
              onClick={() => scrollTo("GetInTouchSection", 100)}
              className="rounded-full px-8 py-3 font-medium text-AAsubtext hover:text-AAtext hover:bg-AAhover transition-all duration-300"
            >
              Contact
            </button>
          </motion.div>

          <motion.p 
            className="mt-8 text-sm text-AAtext max-w-[60ch]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Seeking <span className="text-AAaccent font-medium">AI Software Engineer</span> roles where I can build scalable applications, develop AI/ML solutions, and drive technical excellence.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
