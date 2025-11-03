import React from "react";
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
        "Built comprehensive test suite with Jest achieving high code coverage; implemented E2E tests with Puppeteer for critical user flows.",
      keywords: ["Jest", "testing", "Puppeteer", "E2E tests", "code coverage"],
    },
    {
      text:
        "Developed document processing pipeline using PDF parsing libraries to extract and analyze content for AI-powered insights.",
      keywords: ["PDF parsing", "document processing", "data extraction"],
    },
    {
      text:
        "Implemented real-time features using React hooks and SWR for data fetching; optimized rendering with React Virtualized for large lists.",
      keywords: ["React hooks", "SWR", "React Virtualized", "real-time", "optimization"],
    },
    {
      text:
        "Set up CI/CD pipeline with automated testing, linting with Biome, and deployment to Vercel; configured environment-specific builds.",
      keywords: ["CI/CD", "Biome", "Vercel", "automated testing", "deployment"],
    },
  ];

  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-AAtext sm:text-lg text-sm font-semibold tracking-wide">
          AI Full Stack Developer <span className="text-AAsecondary">@ Climb Together</span>
        </span>
        <span className="font-mono text-xs text-AAsubtext">May 2025 – Present</span>
      </div>

      <div className="flex flex-col space-y-4 sm:text-sm text-xs">
        {tasks.map((item, idx) => (
          <div key={idx} className="flex flex-row space-x-2">
            <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none mt-0.5" />
            <span
              className="text-AAsubtext sm:text-sm text-xs leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: getTasksTextWithHighlightedKeyword(item.text, item.keywords),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
