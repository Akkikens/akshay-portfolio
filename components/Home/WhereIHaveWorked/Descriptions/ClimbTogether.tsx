import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function ClimbTogether() {
  const tasks = [
    // existing high-impact items
    {
      text:
        "Owned performance & reliability for large Next.js surfaces: SSR with selective hydration, code-splitting, perf budgets, RUM via OpenTelemetry, and SLI/SLO ownership; added type-safe RPC clients and Node.js middleware.",
      keywords: ["Next.js", "SSR", "selective hydration", "OpenTelemetry", "SLI", "SLO", "RPC", "middleware"],
    },
    {
      text:
        "Architected distributed onboarding with Next.js + Clerk + Twilio Verify, scaling to 100K+ users and increasing verified opt-ins by 35%.",
      keywords: ["onboarding", "Clerk", "Twilio Verify", "100K+", "35%"],
    },
    {
      text:
        "Built real-time data pipelines for SMS nudges & behavior analytics, lifting re-engagement by 28%.",
      keywords: ["real-time", "pipelines", "SMS", "analytics", "28%"],
    },
    {
      text:
        "Drove migration to a serverless backend on AWS Lambda with PostgreSQL (Drizzle ORM), reducing cold-start latency by ~50%.",
      keywords: ["serverless", "AWS Lambda", "PostgreSQL", "Drizzle", "cold-start", "50%"],
    },

    // NEW: industry-standard bullets
    {
      text:
        "Defined service SLOs and error budgets; held p95 latency under target across key surfaces and used burn-rate alerts for proactive incident response.",
      keywords: ["SLOs", "error budgets", "p95 latency", "burn-rate alerts", "incident response"],
    },
    {
      text:
        "Established on-call rotation and incident runbooks (triage, rollback, comms); reduced MTTR by ~25% with clear ownership and dashboards.",
      keywords: ["on-call", "runbooks", "rollback", "MTTR", "dashboards"],
    },
    {
      text:
        "Introduced progressive delivery with feature flags, canaries and guarded rollouts; decreased change-failure rate and unplanned rollbacks.",
      keywords: ["feature flags", "canary", "progressive delivery", "rollouts"],
    },
    {
      text:
        "Capacity & load testing (k6) and CPU/heap flamegraph profiling to prevent regressions before launch; automated budgets in CI.",
      keywords: ["k6", "profiling", "flamegraph", "performance budgets", "CI"],
    },
    {
      text:
        "Optimized AWS cost: provisioned concurrency right-sizing, SQS batching, and storage lifecycle rules — lowered monthly compute spend ~22%.",
      keywords: ["cost optimization", "provisioned concurrency", "SQS", "lifecycle policies"],
    },
    {
      text:
        "Hardened security: least-privilege IAM, secrets rotation, TLS everywhere, encryption at rest, and audit logs for sensitive actions.",
      keywords: ["IAM", "secrets rotation", "TLS", "encryption", "audit logs"],
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
