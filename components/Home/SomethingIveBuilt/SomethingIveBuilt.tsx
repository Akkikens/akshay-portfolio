import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../Icons/ArrowIcon";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIconForSomethingIveBuild";

export default function SomethingIveBuilt() {
  const [activeTab, setActiveTab] = useState("DevDiagrams");

  const projects: Record<string, {
    title: string;
    description: string;
    techStack: string[];
    image?: string | null;
    githubLink: string;
    liveLink: string;
  }> = {
    DevDiagrams: {
      title: "DevDiagrams - Interactive Learning Platform",
      description:
        "Interactive learning platform built with Next.js 15 and React 18, featuring comprehensive UI components from Radix UI. Integrated Supabase for authentication and real-time data management, with Stripe and Razorpay for payment processing. Includes PDF processing with react-pdf, AI-powered features using OpenAI, and real-time notifications with react-hot-toast. Optimized with Vercel Speed Insights for performance monitoring.",
      techStack: ["Next.js 15", "React 18", "TypeScript", "Supabase", "Radix UI", "OpenAI", "Stripe", "Razorpay", "Framer Motion", "Tailwind CSS"],
      image: "/devdiagrams.png",
      githubLink: "https://github.com/Akkikens/devdiagrams",
      liveLink: "https://devdiagrams.app",
    },
    ChatbotUI: {
      title: "AI Chatbot Platform",
      description:
        "Advanced AI chat application built with Next.js, React, and Supabase. Features LangChain integration for conversational AI, Hugging Face models for specialized NLP tasks, and OpenAI API integration for intelligent responses. Includes real-time analytics, conversation memory, and multi-agent orchestration capabilities.",
      techStack: ["Next.js", "React", "Supabase", "LangChain", "Hugging Face", "OpenAI", "Docker", "Node.js"],
      image: "/screenshot.png",
      githubLink: "https://github.com/akkikens/ui-chatbot",
      liveLink: "https://akshaykalapgar.com/projects/ui-chatbot",
    },
    AWS: {
      title: "AWS Certification Project",
      description:
        "Developed scalable and cost-effective cloud-native applications as part of the AWS Developer Associate certification. Leveraged AWS Lambda, DynamoDB, and API Gateway for efficient development.",
      techStack: ["AWS Lambda", "DynamoDB", "API Gateway"],
      image: null, // No image provided
      githubLink: "",
      liveLink:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/7ed5cd682f894cbb93b854b148f4da49",
    },
    ClarkMarketplace: {
      title: "Clark Marketplace",
      description:
        "Co-developed a React Native application for Clark University students to buy, sell, and trade items within a secure ecosystem. Features include user authentication, product listing, search filters, and real-time messaging, all powered by AWS services.",
      techStack: ["React Native", "AWS", "Node.js", "Express", "Amazon RDS"],
      githubLink: "https://github.com/Akkikens/marketplace",
      liveLink: "",
    },
    CareerSupport: {
      title: "AI-Powered Career Platform",
      description:
        "Intelligent web application connecting Clark University students with alumni for career guidance. Leveraged Python, Django, and PostgreSQL with AI integration using LangChain for intelligent matching, Hugging Face models for resume analysis, and OpenAI for personalized career recommendations. Streamlined processes, reduced manual effort by 80%, and enhanced user engagement through AI-driven insights.",
      techStack: ["Python", "Django", "PostgreSQL", "LangChain", "Hugging Face", "OpenAI", "Docker", "JIRA"],
      githubLink: "",
      liveLink: "",
    },
    MLPipeline: {
      title: "Advanced ML Pipeline & Agent System",
      description:
        "Comprehensive machine learning pipeline with multi-agent orchestration using LangChain, Hugging Face Transformers, and OpenAI APIs. Built end-to-end ML workflows including data preprocessing, model training with PyTorch/TensorFlow, evaluation pipelines, and deployment automation. Implemented agent-based systems for automated data processing, model validation, and intelligent decision-making with 99.5% accuracy.",
      techStack: ["Python", "LangChain", "Hugging Face", "OpenAI", "PyTorch", "TensorFlow", "Scikit-learn", "MLflow", "Docker", "Kubernetes"],
      githubLink: "",
      liveLink: "",
    },
  };

  const activeProject = projects[activeTab];

  return (
    <div
      id="SomethingIveBuiltSection"
      className="flex flex-col bg-gradient-to-br from-AAprimary to-MobileNavBarColor w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-72 border-t border-AAborder relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
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
            05.
          </span>
          <h2 className="font-bold tracking-wider text-AAtext text-base sm:text-lg md:text-2xl">
            Personal Projects
          </h2>
        </div>
        <div className="bg-AAborder h-[1px] w-full sm:w-1/3 md:w-1/2 hidden sm:block"></div>
      </motion.div>

      {/* Tabs Section */}
      <motion.div 
        className="relative -mx-2 flex overflow-x-auto sm:flex-wrap sm:overflow-visible gap-3 mt-8 sm:mt-12 px-2 scrollbar-hide"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {Object.keys(projects).map((key, index) => (
          <motion.button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-3 px-5 text-xs sm:text-sm rounded-2xl font-medium transition-all duration-300 backdrop-blur-sm min-w-[220px] sm:min-w-0 text-left whitespace-normal sm:whitespace-nowrap ${
              activeTab === key
                ? "bg-gradient-to-r from-AAaccent to-AAsecondary text-white shadow-lg shadow-AAaccent/30"
                : "text-AAsubtext hover:text-AAtext bg-AAhover hover:bg-AAborder border border-AAborder hover:border-AAaccent/50 hover:shadow-lg"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {projects[key].title}
          </motion.button>
        ))}
      </motion.div>

      {/* Active Project Content */}
      <motion.div
        data-aos="fade-up"
        className={`relative grid ${
          activeProject.image ? "md:grid-cols-12" : "md:grid-cols-6"
        } grid-cols-1 w-full mt-8 sm:mt-12 gap-6 sm:gap-8 md:gap-12`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Left Image Section (Only Render If Image Exists) */}
        {activeProject.image && (
          <div className="col-span-12 md:col-span-7 flex items-center justify-center order-1 md:order-1">
            <div className="relative group">
              <Img
                src={activeProject.image}
                alt={`${activeProject.title} Screenshot`}
                className="w-full h-auto rounded-2xl shadow-2xl object-contain border border-AAborder group-hover:shadow-AAaccent/20 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-AAaccent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        )}

        {/* Right Content Section */}
        <div
          className={`${
            activeProject.image ? "md:col-span-5" : "md:col-span-6"
          } flex flex-col space-y-6 order-2 md:order-2 min-w-0 w-full`}
        >
          <div className="bg-gradient-to-br from-AAhover to-MobileNavBarColor rounded-2xl p-5 sm:p-6 md:p-7 border border-AAborder backdrop-blur-sm">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-AAtext text-base sm:text-lg md:text-xl font-bold">
                  {activeProject.title}
                </h3>
              </div>
              
              <p className="text-AAtext text-sm sm:text-base md:text-lg leading-relaxed">
                {activeProject.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {activeProject.techStack.map((tech, index) => (
                  <span key={index} className="bg-AAprimary/50 text-AAtext px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm border border-AAborder hover:border-AAaccent hover:text-AAaccent transition-all duration-300">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                {activeProject.liveLink && (
                  <a
                    href={activeProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-AAaccent hover:text-AAsecondary font-medium transition-colors duration-300 bg-AAaccent/10 hover:bg-AAsecondary/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-AAaccent/30 hover:border-AAsecondary/30 text-xs sm:text-sm"
                  >
                    <span>Visit Project</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {activeProject.githubLink && (
                  <GithubIcon link={activeProject.githubLink} />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
