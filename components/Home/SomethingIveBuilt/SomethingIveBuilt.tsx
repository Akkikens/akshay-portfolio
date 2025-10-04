import React from "react";
import { useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIconForSomethingIveBuild";

export default function SomethingIveBuilt() {
  const [activeTab, setActiveTab] = useState("Goldi");

  const projects = {
    Goldi: {
      title: "Goldi - AI Career Assistant",
      description:
        "An AI-powered career chat assistant that teaches students a better way to get interviews for internships and jobs. Goldi helps users discover career paths, brainstorm networking opportunities, practice career conversations, and write effective outreach messages. Built with advanced AI technologies including LangChain, Hugging Face models, and OpenAI integration for intelligent conversational experiences. Supported by major organizations including Google.org, Walmart.org, and various universities.",
      techStack: ["Next.js", "TypeScript", "React", "LangChain", "Hugging Face", "OpenAI", "AI/ML", "Career Development"],
      image: "/goldi-preview.png",
      githubLink: "https://github.com/climb-together/goldi",
      liveLink: "https://goldi.climbtogether.co/",
    },
    Factorbook: {
      title: "Factorbook 2.0 - Genomic AI Platform",
      description:
        "Advanced genomic research platform at UMass Chan Medical School using Next.js, TypeScript, and Material UI. Implemented GraphQL with AI-powered data processing, reducing API response times by 55%. Built interactive visualizations with VISX and integrated machine learning workflows for genomic analysis, improving researcher engagement by 60%.",
      techStack: ["Next.js", "TypeScript", "GraphQL", "VISX", "Material UI", "Python", "TensorFlow", "PyTorch", "ML/AI"],
      image: "/Factorbook.png",
      githubLink: "https://github.com/weng-lab/Factorbook2.0",
      liveLink: "https://factorbook2-0.vercel.app/",
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
      className="flex flex-col bg-AAprimary w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-72"
    >
      {/* Section Title */}
      <div data-aos="fade-up" className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ArrowIcon className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-5 text-AAsecondary" />
          <span className="text-AAsecondary font-sans text-sm sm:text-xl">
            04.
          </span>
          <h2 className="font-bold tracking-wider text-gray-200 text-base sm:text-lg md:text-2xl">
            Some Things I've Built // Contributed
          </h2>
        </div>
        <div className="bg-gray-400 h-[0.2px] w-full sm:w-1/3 md:w-1/2 hidden sm:block"></div>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-6 sm:mt-8">
        {Object.keys(projects).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-1.5 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm rounded whitespace-nowrap ${
              activeTab === key
                ? "bg-AAsecondary text-AAprimary"
                : "text-gray-400 hover:text-AAsecondary bg-gray-800/50 hover:bg-gray-700/50"
            }`}
          >
            {projects[key].title}
          </button>
        ))}
      </div>

      {/* Active Project Content */}
      <div
        data-aos="fade-up"
        className={`relative grid ${
          activeProject.image ? "md:grid-cols-12" : "md:grid-cols-6"
        } grid-cols-1 w-full mt-8 sm:mt-12 gap-4 sm:gap-6 md:gap-8`}
      >
        {/* Left Image Section (Only Render If Image Exists) */}
        {activeProject.image && (
          <div className="col-span-12 md:col-span-7 flex items-center justify-center order-1 md:order-1">
            <Img
              src={activeProject.image}
              alt={`${activeProject.title} Screenshot`}
              className="w-full h-auto rounded-lg shadow-lg object-contain"
            />
          </div>
        )}

        {/* Right Content Section */}
        <div
          className={`${
            activeProject.image ? "md:col-span-5" : "md:col-span-6"
          } flex flex-col space-y-3 sm:space-y-4 md:space-y-6 order-2 md:order-2`}
        >
          <div className="space-y-1 sm:space-y-2">
            <span className="text-AAsecondary text-sm sm:text-base font-semibold block">
              {activeProject.title}
            </span>
            {activeProject.liveLink && (
              <a
                href={activeProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm md:text-base font-medium text-AAsecondary hover:underline block"
              >
                Visit Project →
              </a>
            )}
          </div>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed hyphens-auto break-words">
            {activeProject.description}
          </p>
          <ul className="flex flex-wrap text-gray-300 text-xs sm:text-sm gap-1 sm:gap-2">
            {activeProject.techStack.map((tech, index) => (
              <li key={index} className="bg-gray-700 px-2 py-1 rounded text-center whitespace-nowrap">
                {tech}
              </li>
            ))}
          </ul>
          {activeProject.githubLink && (
            <div className="mt-2">
              <GithubIcon link={activeProject.githubLink} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
