import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function ClimbTogether() {
  const tasks = [
    {
      text:
        "Optimized performance for large Next.js applications using server-side rendering, code-splitting, and performance monitoring; built type-safe API clients and Node.js middleware.",
      keywords: ["Next.js", "SSR", "code-splitting", "performance monitoring", "API clients", "middleware"],
    },
    {
      text:
        "Architected scalable user onboarding system with Next.js, Clerk authentication, and Twilio Verify, serving 100K+ users and increasing verified opt-ins by 35%.",
      keywords: ["onboarding", "Clerk", "Twilio Verify", "100K+", "35%"],
    },
    {
      text:
        "Built real-time data pipelines for SMS notifications and behavior analytics, increasing user re-engagement by 28%.",
      keywords: ["real-time", "pipelines", "SMS", "analytics", "28%"],
    },
    {
      text:
        "Led migration to serverless architecture on AWS Lambda with PostgreSQL (Drizzle ORM), reducing cold-start latency by ~50%.",
      keywords: ["serverless", "AWS Lambda", "PostgreSQL", "Drizzle", "cold-start", "50%"],
    },
    {
      text:
        "Implemented comprehensive monitoring and alerting system to track application performance and proactively identify issues.",
      keywords: ["monitoring", "alerting", "performance tracking", "proactive"],
    },
    {
      text:
        "Established incident response procedures and documentation, reducing mean time to recovery by ~25% through clear ownership and dashboards.",
      keywords: ["incident response", "documentation", "recovery time", "dashboards"],
    },
    {
      text:
        "Deployed feature flags and gradual rollout strategies to minimize deployment risks and enable safe releases.",
      keywords: ["feature flags", "gradual rollout", "deployment", "safe releases"],
    },
    {
      text:
        "Conducted load testing and performance profiling to identify bottlenecks and prevent regressions; automated performance checks in CI/CD pipeline.",
      keywords: ["load testing", "profiling", "bottlenecks", "CI/CD"],
    },
    {
      text:
        "Optimized AWS infrastructure costs through resource right-sizing, SQS batching, and storage lifecycle policies, reducing monthly compute spend by ~22%.",
      keywords: ["cost optimization", "AWS", "SQS", "lifecycle policies"],
    },
    {
      text:
        "Implemented security best practices including IAM policies, secrets management, TLS encryption, and audit logging for sensitive operations.",
      keywords: ["IAM", "secrets management", "TLS", "encryption", "audit logs"],
    },
  ];

  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Full Stack Developer <span className="text-AAsecondary">@ Climb Together</span>
        </span>
        <span className="font-mono text-xs text-gray-500">May 2025 – Present</span>
      </div>

      <div className="flex flex-col space-y-4 sm:text-sm text-xs">
        {tasks.map((item, idx) => (
          <div key={idx} className="flex flex-row space-x-2">
            <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
            <span
              className="text-gray-500 sm:text-sm text-xs"
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
