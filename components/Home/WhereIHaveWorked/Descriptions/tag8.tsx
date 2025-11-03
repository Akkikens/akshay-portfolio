import React from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function Tag8() {
  const tasks = [
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
    {
      text: "Fronted services with an API Gateway and enforced rate limiting, quotas, and idempotency keys to ensure safe retries under load.",
      keywords: ["API Gateway", "rate limiting", "quotas", "idempotency"],
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
        <div className="flex flex-col space-y-2">
          <h3 className="text-AAtext text-2xl font-bold">
            Software Engineer
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-AAsecondary font-semibold text-lg">@ tag8</span>
            <span className="w-1.5 h-1.5 bg-AAaccent rounded-full"></span>
            <span className="font-mono text-sm text-AAsubtext">Aug 2020 – Aug 2021</span>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.map((item, idx) => (
            <motion.div 
              key={idx} 
              className="group flex flex-row space-x-4 p-5 bg-AAhover/50 rounded-2xl border border-AAborder/30 hover:border-AAsecondary/40 transition-all duration-300 hover:bg-AAhover/80 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              whileHover={{ x: 4 }}
            >
              <motion.div 
                className="w-2 h-2 bg-gradient-to-r from-AAsecondary to-AAaccent rounded-full mt-2 flex-shrink-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              />
              <span
                className="text-AAtext text-base leading-relaxed"
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
