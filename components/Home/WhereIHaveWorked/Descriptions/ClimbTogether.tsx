import React from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function ClimbTogether() {
  const tasks = [
    {
      text:
        "Built full-stack Next.js 15 application with React 19, TypeScript, and Tailwind CSS; implemented server-side rendering and code-splitting for optimal performance.",
      keywords: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "SSR", "code-splitting"],
    },
    {
      text:
        "Developed AI-powered chatbot using LangChain, OpenAI GPT-4, and Anthropic Claude; integrated voice capabilities with Hume AI for natural conversations.",
      keywords: ["LangChain", "OpenAI", "Anthropic Claude", "Hume AI", "chatbot"],
    },
    {
      text:
        "Implemented user authentication and onboarding with Clerk, integrated Twilio for SMS verification and notifications, serving 100K+ users.",
      keywords: ["Clerk", "Twilio", "SMS", "authentication", "100K+"],
    },
    {
      text:
        "Built database layer with Drizzle ORM and PostgreSQL; designed schema migrations and optimized queries for performance.",
      keywords: ["Drizzle ORM", "PostgreSQL", "database", "migrations", "queries"],
    },
    {
      text:
        "Integrated vector search with ChromaDB for semantic search and RAG (Retrieval-Augmented Generation) capabilities in AI features.",
      keywords: ["ChromaDB", "vector search", "RAG", "semantic search"],
    },
    {
      text:
        "Implemented monitoring with Sentry for error tracking and Vercel Analytics for performance metrics; set up PostHog for product analytics.",
      keywords: ["Sentry", "Vercel Analytics", "PostHog", "monitoring", "error tracking"],
    },
    {
      text:
        "Set up CI/CD pipeline with automated testing, linting with Biome, and deployment to Vercel; configured environment-specific builds.",
      keywords: ["CI/CD", "Biome", "Vercel", "automated testing", "deployment"],
    },
  ];

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-AAtext text-lg sm:text-xl md:text-2xl font-bold">
            AI Full Stack Developer
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
            <span className="text-AAsecondary font-semibold text-base sm:text-lg">@ Climb Together</span>
            <span className="hidden sm:block w-1.5 h-1.5 bg-AAaccent rounded-full"></span>
            <span className="font-mono text-xs sm:text-sm text-AAsubtext">May 2025 – Present</span>
          </div>
        </div>

        {/* Tasks - Apple-style clean list */}
        <div className="space-y-2 sm:space-y-3">
          {tasks.map((item, idx) => (
            <motion.div 
              key={idx} 
              className="group flex flex-row space-x-3 sm:space-x-4 p-3 sm:p-5 bg-AAhover/50 rounded-xl sm:rounded-2xl border border-AAborder/30 hover:border-AAsecondary/40 transition-all duration-300 hover:bg-AAhover/80 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              whileHover={{ x: 4 }}
            >
              <motion.div 
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-AAsecondary to-AAaccent rounded-full mt-2 flex-shrink-0"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              />
              <span
                className="text-AAtext text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: getTasksTextWithHighlightedKeyword(item.text, item.keywords),
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
