import React from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function UMassChanMedicalSchool() {
  const tasks = [
    {
      text: "Architected and developed Factorbook2.0 using Next.js, TypeScript, and Material UI, enhancing the platform's performance.",
      keywords: ["Next.js", "TypeScript", "Material UI", "performance"],
    },
    {
      text: "Integrated GraphQL for efficient data querying, reducing API response times by 55%.",
      keywords: ["GraphQL", "data querying", "API response"],
    },
    {
      text: "Built complex, interactive data visualizations with VISX for real-time analytics, aiding researchers in exploring genetic factors.",
      keywords: ["VISX", "data visualizations", "analytics"],
    },
    {
      text: "Collaborated with UI/UX designers to improve engagement by 60%, ensuring design consistency.",
      keywords: ["UI/UX", "design consistency", "engagement"],
    },
    {
      text: "Implemented responsive design for compatibility across mobile and tablet devices, enhancing accessibility.",
      keywords: ["responsive design", "mobile compatibility", "accessibility"],
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
            Software Engineer Intern
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-AAsecondary font-semibold text-lg">@ UMass Chan Medical School</span>
            <span className="w-1.5 h-1.5 bg-AAaccent rounded-full"></span>
            <span className="font-mono text-sm text-AAsubtext">May 2024 - January 2025</span>
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
