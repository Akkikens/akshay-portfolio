import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skillsData: Skill[] = [
  // Frontend
  { name: "React/Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", level: 92, category: "Frontend" },

  // Backend
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Python", level: 85, category: "Backend" },
  { name: "PostgreSQL", level: 82, category: "Backend" },

  // AI/ML
  { name: "LangChain", level: 90, category: "AI/ML" },
  { name: "OpenAI APIs", level: 92, category: "AI/ML" },
  { name: "PyTorch", level: 80, category: "AI/ML" },
  { name: "Hugging Face", level: 85, category: "AI/ML" },

  // Cloud/DevOps
  { name: "AWS", level: 88, category: "Cloud" },
  { name: "Docker", level: 85, category: "Cloud" },
];

const categories = ["Frontend", "Backend", "AI/ML", "Cloud"];

export default function SkillVisualization() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = selectedCategory
    ? skillsData.filter((skill) => skill.category === selectedCategory)
    : skillsData.slice(0, 8); // Show top 8 for radar chart

  const radarData = filteredSkills.map((skill) => ({
    skill: skill.name,
    level: skill.level,
    fullMark: 100,
  }));

  return (
    <div className="w-full space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        <motion.button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null
              ? "bg-gradient-to-r from-AAsecondary to-AAaccent text-white shadow-lg shadow-AAsecondary/30"
              : "bg-AAhover/50 text-AAsubtext hover:text-AAtext border border-AAborder"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Show all skills"
        >
          All Skills
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-gradient-to-r from-AAsecondary to-AAaccent text-white shadow-lg shadow-AAsecondary/30"
                : "bg-AAhover/50 text-AAsubtext hover:text-AAtext border border-AAborder"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Filter by ${category}`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Radar Chart */}
        <motion.div
          className="relative h-[400px] bg-gradient-to-br from-AAhover/30 to-MobileNavBarColor/30 rounded-2xl p-6 border border-AAborder/50 backdrop-blur-sm"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" strokeWidth={1} />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: "#cbd5e1", fontSize: 12 }}
                stroke="#475569"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                stroke="#475569"
              />
              <Radar
                name="Proficiency"
                dataKey="level"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f8fafc",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>

          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-AAsecondary/10 to-AAaccent/10 pointer-events-none"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Skill Bars */}
        <div className="space-y-4">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-AAtext">
                  {skill.name}
                </span>
                <motion.span
                  className="text-xs font-mono text-AAsecondary"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {skill.level}%
                </motion.span>
              </div>
              <div className="relative h-2 bg-AAhover/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-AAsecondary to-AAaccent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.1 + 0.5,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: "Years Experience", value: "4+", color: "from-AAsecondary to-AAaccent" },
          { label: "Projects Delivered", value: "50+", color: "from-AAsuccess to-AAsecondary" },
          { label: "Technologies", value: "20+", color: "from-AAaccent to-AApurple" },
          { label: "Certifications", value: "5+", color: "from-AApurple to-AAwarning" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="relative bg-gradient-to-br from-AAhover/50 to-MobileNavBarColor/50 rounded-xl p-4 border border-AAborder/50 backdrop-blur-sm overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <div className="relative z-10">
              <motion.div
                className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs sm:text-sm text-AAsubtext mt-1">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
