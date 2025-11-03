import React, { useState } from "react";
import { motion } from "framer-motion";
import Img from "../../../components/smallComp/image/Img";
import ArrowIcon from "../../../components/Icons/ArrowIcon";

export default function AboutMe() {

  const technologies: string[][] = [
    ["Next.js/React", "TypeScript/JavaScript", "React Native", "Tailwind CSS", "GraphQL/REST APIs", "AWS/Azure"],
    ["Node.js", "Java", "Python", "PostgreSQL/MySQL", "Docker/Kubernetes", "CI/CD (GitHub Actions/Jenkins)"],
    ["LangChain", "Hugging Face", "OpenAI", "PyTorch", "TensorFlow", "Scikit-learn"],
    ["MLflow", "Multi-agent Systems", "NLP", "Computer Vision", "MLOps", "AI/ML"],
  ];

  const systemsPlatform = [
    "System Design", "Scalability", "Distributed Systems",
    "Caching (CDN/Redis)", "Monitoring & Logging",
    "Testing (Jest/Playwright)", "Security & Accessibility (WCAG)",
    "AI/ML Pipelines", "Model Integration", "API Design",
  ];

  const quickSnapshot = [
    "Performance Optimization",
    "Scale: 100K+ users",
    "AWS Serverless",
    "500+ tests",
    "AI: LangChain/Hugging Face",
    "ML: PyTorch/TensorFlow",
  ];

  const keyBulletsCore = [
    "Built scalable React/Next.js applications with server-side rendering and optimized frontend performance.",
    "Developed AI-powered chatbots with LangChain, Hugging Face, and OpenAI APIs serving 100K+ users.",
    "Migrated services to AWS serverless architecture (Lambda + API Gateway) reducing latency by ~50%.",
  ];

  const keyBulletsMore = [
    "Implemented comprehensive monitoring and logging with distributed tracing for faster debugging.",
    "Built event-driven pipelines using queues and Lambda functions for notifications and analytics, increasing re-engagement by ~28%.",
    "Created multi-agent AI systems with LangChain orchestration and Hugging Face model integration.",
    "Developed ML pipelines with PyTorch/TensorFlow, achieving 99.5% accuracy in production models.",
    "Designed reliable APIs with type-safe clients, retry logic, and graceful degradation under load.",
    "Established security best practices and quality gates with feature flags and safe deployment strategies.",
  ];

  return (
    <div id="aboutSection" data-aos="fade-up" className="snap-start flex flex-col items-center py-16 sm:py-20 bg-gradient-to-br from-AAprimary to-MobileNavBarColor border-t border-AAborder relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-8">
      {/* Section Header */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mr-4">
            <ArrowIcon className="h-4 md:h-6 w-4 md:w-5 translate-y-[0.5px] text-AAsecondary" />
            <span className="text-AAsecondary font-semibold text-sm sm:text-xl">01.</span>
            <span className="text-AAtext font-bold tracking-wider text-lg sm:text-2xl pl-4">About Me</span>
          </div>
          <div className="bg-AAborder h-[1px] w-full sm:w-72 ml-4" />
        </motion.div>

        {/* Desktop grid: tighter measure on text, sticky image on the far right */}
        <div className="hidden md:grid 
                 md:grid-cols-[minmax(0,70ch)_340px] 
                 lg:grid-cols-[minmax(0,76ch)_360px] 
                 md:gap-x-12 lg:gap-x-16 xl:gap-x-20">          {/* Text column with clean measure */}
          <div className="space-y-5 text-[15px] leading-[1.75] md:pr-6">
            <p className="font-Header text-justify text-gray-400">
              Hello! I'm Akshay, a <span className="text-AAsecondary">Full Stack Software Engineer</span> focused on building fast, reliable products.
              I earned a <span className="text-AAsecondary">B.E. in Information Technology</span> and{" "}
              <span className="text-AAsecondary">completed my M.S. in Computer Science (May 2025)</span>.
            </p>

            <p className="font-Header text-justify text-gray-400">
              I’ve shipped production software across healthcare, e-commerce and edtech at{" "}
              <span className="text-AAsecondary">Capgemini</span> and{" "}
              <span className="text-AAsecondary">UMass Chan Medical School</span>, with a focus on performance, reliability and developer experience.
            </p>

            <p className="font-Header text-justify text-gray-400">
              <span className="text-AAsecondary">Currently at Climb Together</span>, I optimize web performance for large Next.js applications
              using server-side rendering, code-splitting, and performance monitoring. On the backend, I work with
              an AWS serverless stack (Lambda, API Gateway, PostgreSQL) and build real-time pipelines for notifications and analytics. I also develop
              AI-powered chatbots using LangChain, Hugging Face models, and OpenAI APIs for intelligent conversational experiences.
            </p>

            {/* Impact bullets */}
            <ul className="list-none space-y-2">
              {[...keyBulletsCore, ...keyBulletsMore].map((b, i) => (
                <li key={i} className="flex items-start">
                  <ArrowIcon className="h-3 w-3 mt-1 text-AAsecondary" />
                  <span className="ml-2 text-AAtext">{b}</span>
                </li>
              ))}
            </ul>

            {/* Quick Snapshot Section */}
            <motion.div 
              className="bg-gradient-to-br from-AAhover to-MobileNavBarColor rounded-2xl p-6 border border-AAborder backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-AAtext font-bold text-lg mb-4 flex items-center space-x-2">
                <span className="text-AAsecondary">⚡</span>
                <span>Quick Snapshot</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {quickSnapshot.map((item, i) => (
                  <motion.span
                    key={item}
                    className="text-sm text-AAtext bg-AAprimary/50 border border-AAborder rounded-full px-4 py-2 hover:border-AAsecondary hover:text-AAsecondary transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Systems & Platform Section */}
            <motion.div 
              className="bg-gradient-to-br from-AAhover to-MobileNavBarColor rounded-2xl p-6 border border-AAborder backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-AAtext font-bold text-lg mb-4 flex items-center space-x-2">
                <span className="text-AAaccent">🏗️</span>
                <span>Systems & Platform</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {systemsPlatform.map((item, i) => (
                  <motion.span
                    key={item}
                    className="text-sm text-AAtext bg-AAprimary/50 border border-AAborder rounded-full px-4 py-2 hover:border-AAaccent hover:text-AAaccent transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Technologies Section */}
            <motion.div 
              className="bg-gradient-to-br from-AAhover to-MobileNavBarColor rounded-2xl p-6 border border-AAborder backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-AAtext font-bold text-lg mb-4 flex items-center space-x-2">
                <span className="text-AAsecondary">💻</span>
                <span>Technologies I Use</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {technologies.map((group, gi) => (
                  <div key={gi} className="flex flex-col space-y-3">
                    {group.map((tech, ti) => (
                      <motion.div 
                        key={tech} 
                        className="flex items-center space-x-2 group cursor-pointer"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: (gi * 0.1) + (ti * 0.05) }}
                        whileHover={{ x: 5 }}
                      >
                        <ArrowIcon className="h-3 w-3 text-AAsecondary group-hover:text-AAaccent transition-colors" />
                        <span className="text-AAtext text-sm group-hover:text-AAsecondary transition-colors">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>



            {/* Career Goals Section */}
            <motion.div 
              className="bg-gradient-to-r from-AAsecondary/10 to-AAaccent/10 rounded-2xl p-6 border border-AAsecondary/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-AAtext font-bold text-lg mb-3 flex items-center space-x-2">
                <span className="text-AAaccent">🎯</span>
                <span>What I'm Looking For</span>
              </h3>
              <p className="text-AAtext leading-relaxed">
                Seeking <span className="text-AAaccent font-semibold">AI Software Engineer</span> roles at innovative companies where I can build scalable full-stack applications,
                develop AI/ML systems with <span className="text-AAsecondary font-semibold">LangChain and Hugging Face</span>, optimize performance, and deliver measurable impact.
              </p>
            </motion.div>
          </div>

          {/* Sticky portrait on the far right */}
          <div className="relative md:justify-self-end md:sticky md:top-24">
          <figure className="relative w-[300px] lg:w-[320px] xl:w-[360px]">
          <div className="rounded-2xl overflow-hidden ring-2 ring-AAsecondary/70 ring-offset-4 ring-offset-AAprimary transition-all duration-300 hover:translate-x-1.5 hover:translate-y-1.5 hover:ring-AAaccent/70 hover:shadow-2xl hover:shadow-AAsecondary/20">
                <div className="relative w-full aspect-[4/5]">
                  <Img
                    src={"/Portfolio-portrait-4.jpg"}
                    className="object-cover w-full h-full rounded-2xl"
                    alt="Akshay portrait"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl translate-x-3 translate-y-3 border-2 border-AAsecondary/40" />
            </figure>
          </div>
        </div>

        {/* Mobile layout (unchanged) */}
        <div className="md:hidden space-y-6">
          <div className="space-y-5 sm:text-base text-sm leading-relaxed">
            <p className="font-Header text-justify text-gray-400">
              Hello! I'm Akshay, a <span className="text-AAsecondary">Full Stack Software Engineer</span> focused on building fast, reliable products.
              I earned a <span className="text-AAsecondary">B.E. in Information Technology</span> and{" "}
              <span className="text-AAsecondary">completed my M.S. in Computer Science (May 2025)</span>.
            </p>
            <p className="font-Header text-justify text-gray-400">
              I’ve shipped software at <span className="text-AAsecondary">Capgemini</span> and{" "}
              <span className="text-AAsecondary">UMass Chan Medical School</span> with a focus on performance, reliability and DX.
            </p>
          </div>

          <figure className="relative w-48 mx-auto">
            <div className="rounded-lg overflow-hidden ring-2 ring-AAsecondary/70 ring-offset-4 ring-offset-AAprimary">
              <div className="w-full aspect-[4/5]">
                <Img
                  src={"/Portfolio-portrait-4.jpg"}
                  className="object-cover w-full h-full rounded-lg"
                  alt="Akshay portrait"
                  loading="lazy"
                />
              </div>
            </div>
          </figure>

          {/* (The rest of the content stacks below on mobile, as before) */}
        </div>
      </div>
    </div>
  );
}
