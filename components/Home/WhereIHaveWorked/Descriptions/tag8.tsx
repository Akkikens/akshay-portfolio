import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function Tag8() {
  const tasks = [
    // existing bullets (kept)
    {
      text: "Integrated Redis caching + Elasticsearch with a Django backend, reducing DB latency by ~60% and enabling real-time dashboards.",
      keywords: ["Redis", "Elasticsearch", "Django", "latency", "60%"],
    },
    {
      text: "Raised platform quality: security hardening (CSP, Trusted Types), WCAG 2.1 AA accessibility, i18n/l10n, and design-system tokens.",
      keywords: ["security", "CSP", "Trusted Types", "WCAG 2.1 AA", "design system"],
    },
    {
      text: "Accelerated experimentation with feature flags and type-safe RPC clients; APIs ~77% faster after backend redesign.",
      keywords: ["feature flags", "RPC", "APIs", "77%"],
    },

    // NEW: industry-standard additions
    {
      text: "Fronted services with an API Gateway and enforced rate limiting, quotas, and idempotency keys to ensure safe retries under load.",
      keywords: ["API Gateway", "rate limiting", "quotas", "idempotency"],
    },
    {
      text: "Parallelized CI workflows with caching (pip/pytest/node) and container layers; reduced average build time by ~40%.",
      keywords: ["CI", "parallel", "caching", "build time", "40%"],
    },
    {
      text: "Container security scanning (Trivy/Grype) + Dependabot policies; patched high-severity CVEs and tightened supply chain.",
      keywords: ["security", "Trivy", "Grype", "Dependabot", "CVE"],
    },
    {
      text: "Provisioned environments via Infrastructure as Code (Terraform) for repeatable staging/prod with least-privilege roles.",
      keywords: ["Terraform", "IaC", "staging", "production", "least privilege"],
    },
  ];

  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Software Engineer <span className="text-AAsecondary">@ tag8</span>
        </span>
        <span className="font-mono text-xs text-gray-500">Aug 2020 – Aug 2021</span>
      </div>
      <div className="flex flex-col space-y-4 sm:text-sm text-xs">
        {tasks.map((item, i) => (
          <div key={i} className="flex flex-row space-x-2">
            <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
            <span
              className="text-gray-500 sm:text-sm text-xs"
              dangerouslySetInnerHTML={{ __html: getTasksTextWithHighlightedKeyword(item.text, item.keywords) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
