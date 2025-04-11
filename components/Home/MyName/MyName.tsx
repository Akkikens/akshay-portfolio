import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MyName({ finishedLoading }) {
  const [isVisible, setIsVisible] = useState(false);

  // Show the content only after the base delay
  useEffect(() => {
    const timer = setTimeout(
      () => setIsVisible(true),
      (finishedLoading ? 2 : 2.3) * 1000
    );
    return () => clearTimeout(timer);
  }, [finishedLoading]);

  const baseDelay = finishedLoading ? 2 : 2.3;
  const transitionConfig = {
    opacity: { duration: 0.6 },
    y: { duration: 0.6 },
  };

  return (
    <div
      className={`h-full flex flex-col justify-center px-8 2xl:px-72 xl:px-56 lg:px-32 md:px-28 sm:px-8 py-32 sm:py-52 ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      <motion.span
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ...transitionConfig,
          delay: baseDelay,
        }}
        className="text-AAsecondary font-mono"
      >
        Hello, I am
      </motion.span>

      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ...transitionConfig,
          delay: baseDelay + 0.2,
        }}
        className="text-gray-300 font-bold text-3xl lg:text-7xl sm:text-5xl md:text-6xl mt-4"
      >
        Akshay Kalapgar.
      </motion.h1>

      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ...transitionConfig,
          delay: baseDelay + 0.4,
        }}
        className="text-gray-400 font-bold text-3xl lg:text-7xl sm:text-5xl md:text-6xl mt-4"
      >
        I build impactful digital solutions.
      </motion.h2>

      <motion.h3
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ...transitionConfig,
          delay: baseDelay + 0.6,
        }}
        className="text-gray-400 font-Header text-sm md:text-lg sm:text-md mt-10 tracking-wider"
      >
        I'm a{" "}
        <span className="text-AAsecondary">Full Stack Software Engineer</span>{" "}
        with a strong focus on{" "}
        <span className="text-AAsecondary">problem-solving</span> and creating
        exceptional digital experiences. With expertise in{" "}
        <span className="text-AAsecondary">front-end</span> and{" "}
        <span className="text-AAsecondary">back-end development</span>, I
        leverage technologies like{" "}
        <span className="text-AAsecondary">
          Next.js, React Native, TypeScript, and AWS
        </span>{" "}
        to bring ideas to life.
        <br className="3xl:block hidden" /> During my career, I've optimized
        applications for performance, enhanced user engagement by 60%, and
        reduced API response times by 55% at UMass Chan Medical School.
        <br className="3xl:block hidden" /> I am passionate about tackling
        challenging projects, whether in{" "}
        <span className="text-AAsecondary">web development</span> or{" "}
        <span className="text-AAsecondary">cloud solutions</span>, and
        delivering high-quality results.
      </motion.h3>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ...transitionConfig,
          delay: baseDelay + 0.8,
        }}
        className="mt-12"
      >
        <Link href={"/resume.pdf"} passHref legacyBehavior>
          <a target="_blank" rel="noreferrer">
            <button className="bg-AAprimary text-AAsecondary border rounded px-4 sm:px-8 py-3 sm:py-4 border-AAsecondary">
              View My Resume
            </button>
          </a>
        </Link>
      </motion.div>
    </div>
  );
}
