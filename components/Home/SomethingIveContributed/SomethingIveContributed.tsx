import React from "react";
import { useState } from "react";
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
      className="flex flex-col bg-AAprimary w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-72 border-t border-AAborder"
    >
      {/* Section Title */}
      <div data-aos="fade-up" className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ArrowIcon className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-5 text-AAsecondary" />
          <span className="text-AAsecondary font-sans text-sm sm:text-xl">
            04.
          </span>
          <h2 className="font-bold tracking-wider text-AAtext text-base sm:text-lg md:text-2xl">
            Professional Contributions
          </h2>
        </div>
        <div className="bg-AAborder h-[1px] w-full sm:w-1/3 md:w-1/2 hidden sm:block"></div>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-6 sm:mt-8">
        {Object.keys(contributions).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-2 px-4 text-sm rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
              activeTab === key
                ? "bg-AAsecondary text-white shadow-lg"
                : "text-AAsubtext hover:text-AAtext bg-AAhover hover:bg-AAborder border border-AAborder"
            }`}
          >
            {contributions[key].title}
          </button>
        ))}
      </div>

      {/* Active Contribution Content */}
      <div
        data-aos="fade-up"
        className="relative grid md:grid-cols-12 grid-cols-1 w-full mt-8 sm:mt-12 gap-4 sm:gap-6 md:gap-8"
      >
        {/* Left Image Section */}
        {activeContribution.image && (
          <div className="col-span-12 md:col-span-7 flex items-center justify-center order-1 md:order-1">
            <Img
              src={activeContribution.image}
              alt={`${activeContribution.title} Screenshot`}
              className="w-full h-auto rounded-lg shadow-lg object-contain"
            />
          </div>
        )}

        {/* Right Content Section */}
        <div className="md:col-span-5 flex flex-col space-y-3 sm:space-y-4 md:space-y-6 order-2 md:order-2">
          <div className="space-y-1 sm:space-y-2">
            <span className="text-AAtext text-lg sm:text-xl font-bold block">
              {activeContribution.title}
            </span>
            <span className="text-AAsecondary text-sm sm:text-base font-medium block">
              @ {activeContribution.company}
            </span>
            {activeContribution.liveLink && (
              <a
                href={activeContribution.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm md:text-base font-medium text-AAsecondary hover:underline block"
              >
                Visit Project →
              </a>
            )}
          </div>
          <p className="text-AAsubtext text-sm sm:text-base leading-relaxed">
            {activeContribution.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {activeContribution.techStack.map((tech, index) => (
              <span key={index} className="bg-AAhover text-AAtext px-3 py-1 rounded-full text-sm border border-AAborder">
                {tech}
              </span>
            ))}
          </div>
          {activeContribution.githubLink && (
            <div className="mt-2">
              <GithubIcon link={activeContribution.githubLink} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
