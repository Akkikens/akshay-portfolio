import React from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function Capgemini() {
  const tasks = [
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
    {
      text: "Implemented blue/green and canary deployments with health checks and automatic rollback criteria to minimize downtime risk.",
      keywords: ["blue/green", "canary", "health checks", "rollback"],
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
            Full Stack Engineer
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-AAsecondary font-semibold text-lg">@ Capgemini</span>
            <span className="w-1.5 h-1.5 bg-AAaccent rounded-full"></span>
            <span className="font-mono text-sm text-AAsubtext">Aug 2021 – Aug 2023</span>
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
