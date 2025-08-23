import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function Capgemini() {
  const tasks = [
    // existing bullets (kept)
    {
      text: "Built 10+ Java/Spring Boot microservices for a global platform (200K+ users, 99.9% uptime) achieving 55% performance gains.",
      keywords: ["microservices", "Spring Boot", "200K+", "99.9%", "55%"],
    },
    {
      text: "Engineered React/Redux e-commerce modules and Webpack optimizations, reducing page load time by ~50%.",
      keywords: ["React", "Redux", "Webpack", "page load", "50%"],
    },
    {
      text: "Owned CI/CD with Jenkins + Docker, automating deployments and cutting manual bottlenecks by ~70%; mentored 4 junior devs.",
      keywords: ["CI/CD", "Jenkins", "Docker", "automation", "70%", "mentored"],
    },
    {
      text: "Migrated a legacy monolith to a modern Vue architecture, improving performance by ~40% and responsiveness across devices.",
      keywords: ["monolith", "Vue", "40%", "performance"],
    },

    // NEW: industry-standard additions
    {
      text: "Implemented blue/green and canary deployments with health checks and automatic rollback criteria to minimize downtime risk.",
      keywords: ["blue/green", "canary", "health checks", "rollback"],
    },
    {
      text: "Shipped zero-downtime database migrations (Liquibase/Flyway), backfills and read/write splitting; safeguarded data with checks.",
      keywords: ["zero-downtime", "migrations", "Liquibase", "Flyway", "data quality"],
    },
    {
      text: "Expanded observability with Prometheus/Grafana and Sentry; actionable alerts and playbooks reduced alert noise and false positives.",
      keywords: ["Prometheus", "Grafana", "Sentry", "alerts", "playbooks"],
    },
    {
      text: "Raised code quality: PR templates, pre-commit hooks, ESLint/Prettier and unit/integration test gates; improved lead time to merge.",
      keywords: ["code quality", "PR templates", "pre-commit", "ESLint", "testing"],
    },
  ];

  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Full Stack Engineer <span className="text-AAsecondary">@ Capgemini</span>
        </span>
        <span className="font-mono text-xs text-gray-500">Aug 2021 – Aug 2023</span>
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
