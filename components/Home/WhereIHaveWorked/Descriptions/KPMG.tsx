import React from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function KPMG() {
  const tasks = [
    {
      text: "Created 30+ feature enhancements for the in-house CRM using Java, improving usability and team efficiency.",
      keywords: ["CRM", "Java", "feature enhancements"],
    },
    {
      text: "Contributed to distributed applications architecture and ensured compliance with internal data-handling standards.",
      keywords: ["distributed architecture", "compliance", "data handling"],
    },
    {
      text: "Wrote unit/integration tests and CI checks for core CRM modules; reached ~85% coverage on critical paths.",
      keywords: ["unit tests", "integration tests", "CI", "coverage"],
    },
    {
      text: "Documented services and onboarding guides; ran stakeholder demos and gathered feedback to tighten acceptance cycles.",
      keywords: ["documentation", "onboarding", "demos", "stakeholders"],
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
            Intern
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-AAsecondary font-semibold text-lg">@ KPMG</span>
            <span className="w-1.5 h-1.5 bg-AAaccent rounded-full"></span>
            <span className="font-mono text-sm text-AAsubtext">Jul 2020 – Dec 2020</span>
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
