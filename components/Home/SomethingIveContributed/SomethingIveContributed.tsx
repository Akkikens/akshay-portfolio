import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../Icons/ArrowIcon";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIconForSomethingIveBuild";

export default function SomethingIveContributed() {
  const [activeTab, setActiveTab] = useState("Goldi");

  const contributions = {
    Goldi: {
      title: "Goldi - AI Career Assistant",
      company: "Climb Together",
      description:
        "Contributed to an AI-powered career chat assistant that teaches students a better way to get interviews for internships and jobs. Helped build features for career path discovery, networking opportunities, practice conversations, and outreach messaging. Implemented AI technologies including LangChain, Hugging Face models, and OpenAI integration for intelligent conversational experiences. Supported by major organizations including Google.org, Walmart.org, and various universities.",
      techStack: ["Next.js", "TypeScript", "React", "LangChain", "Hugging Face", "OpenAI", "AI/ML", "Career Development"],
      image: "/goldi-preview.png",
      githubLink: "https://github.com/climb-together/goldi",
      liveLink: "https://goldi.climbtogether.co/",
    },
    Factorbook: {
      title: "Factorbook 2.0 - Genomic AI Platform",
      company: "UMass Chan Medical School",
      description:
        "Contributed to an advanced genomic research platform using Next.js, TypeScript, and Material UI. Implemented GraphQL with AI-powered data processing, reducing API response times by 55%. Built interactive visualizations with VISX and integrated machine learning workflows for genomic analysis, improving researcher engagement by 60%.",
      techStack: ["Next.js", "TypeScript", "GraphQL", "VISX", "Material UI", "Python", "TensorFlow", "PyTorch", "ML/AI"],
      image: "/Factorbook.png",
      githubLink: "https://github.com/weng-lab/Factorbook2.0",
      liveLink: "https://factorbook2-0.vercel.app/",
    },
  };

  const activeContribution = contributions[activeTab];

  return (
    <div
      id="SomethingIveContributedSection"
      className="flex flex-col bg-gradient-to-br from-AAprimary to-MobileNavBarColor w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-72 border-t border-AAborder relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Section Title */}
      <motion.div 
        data-aos="fade-up" 
        className="relative flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ArrowIcon className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-5 text-AAsecondary" />
          <span className="text-AAsecondary font-semibold text-sm sm:text-xl">
            04.
          </span>
          <h2 className="font-bold tracking-wider text-AAtext text-base sm:text-lg md:text-2xl">
            Professional Contributions
          </h2>
        </div>
        <div className="bg-AAborder h-[1px] w-full sm:w-1/3 md:w-1/2 hidden sm:block"></div>
      </motion.div>

      {/* Tabs Section */}
      <div className="relative flex flex-wrap gap-3 mt-8 sm:mt-12">
        {Object.keys(contributions).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-3 px-6 text-sm rounded-2xl whitespace-nowrap font-medium transition-all duration-300 backdrop-blur-sm ${
              activeTab === key
                ? "bg-gradient-to-r from-AAsecondary to-AAaccent text-white shadow-lg shadow-AAsecondary/30"
                : "text-AAsubtext hover:text-AAtext bg-AAhover hover:bg-AAborder border border-AAborder hover:border-AAsecondary/50 hover:shadow-lg"
            }`}
          >
            {contributions[key].title}
          </button>
        ))}
      </div>

      {/* Active Contribution Content */}
      <div
        data-aos="fade-up"
        className="relative grid md:grid-cols-12 grid-cols-1 w-full mt-8 sm:mt-12 gap-6 sm:gap-8 md:gap-12"
      >
        {/* Left Image Section */}
        {activeContribution.image && (
          <div className="col-span-12 md:col-span-7 flex items-center justify-center order-1 md:order-1">
            <div className="relative group">
              <Img
                src={activeContribution.image}
                alt={`${activeContribution.title} Screenshot`}
                className="w-full h-auto rounded-2xl shadow-2xl object-contain border border-AAborder group-hover:shadow-AAsecondary/20 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-AAsecondary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        )}

        {/* Right Content Section */}
        <div className="md:col-span-5 flex flex-col space-y-6 order-2 md:order-2">
          <div className="bg-gradient-to-br from-AAhover to-MobileNavBarColor rounded-2xl p-6 border border-AAborder backdrop-blur-sm">
            <div className="space-y-4">
              <div>
                <h3 className="text-AAtext text-xl font-bold block">
                  {activeContribution.title}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-AAsecondary text-base font-semibold">@ {activeContribution.company}</span>
                </div>
              </div>
              
              <p className="text-AAtext text-base leading-relaxed">
                {activeContribution.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {activeContribution.techStack.map((tech, index) => (
                  <span key={index} className="bg-AAprimary/50 text-AAtext px-3 py-1.5 rounded-full text-sm border border-AAborder hover:border-AAsecondary hover:text-AAsecondary transition-all duration-300">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                {activeContribution.liveLink && (
                  <a
                    href={activeContribution.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-AAsecondary hover:text-AAaccent font-medium transition-colors duration-300 bg-AAsecondary/10 hover:bg-AAaccent/10 px-4 py-2 rounded-full border border-AAsecondary/30 hover:border-AAaccent/30"
                  >
                    <span>Visit Project</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {activeContribution.githubLink && (
                  <GithubIcon link={activeContribution.githubLink} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
