import React from "react";
import { useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIconForSomethingIveBuild";

export default function SomethingIveBuilt() {
  const [activeTab, setActiveTab] = useState("Goldi");

  const projects = {
    Goldi: {
      title: "Goldi",
      description:
        "A modern web application built with Next.js and TypeScript, featuring a clean and responsive design. The project showcases advanced frontend development skills with optimized performance and user experience.",
      techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
      image: "/goldi-preview.png", // You'll need to add this image to the public folder
      githubLink: "",
      liveLink: "https://goldi.climbtogether.co/",
    },
    Factorbook: {
      title: "Factorbook 2.0",
      description:
        "As a Software Engineer Intern at UMass Chan Medical School, I led the development of Factorbook 2.0, a platform using Next.js, TypeScript, and Material UI. Implemented GraphQL, reducing API response times by 55%, and improved engagement by 60% through UI/UX enhancements.",
      techStack: ["Next.js", "TypeScript", "GraphQL", "VISX", "Material UI"],
      image: "/Factorbook.png",
      githubLink: "https://github.com/weng-lab/Factorbook2.0",
      liveLink: "https://factorbook2-0.vercel.app/",
    },
    ChatbotUI: {
      title: "Chatbot UI",
      description:
        "Chatbot UI is an AI chat app built with Next.js, React, and supported by Supabase. It features simpler deployment, enhanced backend compatibility, and improved mobile layouts. Experience the live demo on my custom domain.",
      techStack: ["Next.js", "React", "Supabase", "Docker", "Node.js"],
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
      title: "Career Advancement Support",
      description:
        "Built a web application connecting Clark University students with alumni for career guidance. Leveraged Python, Django, and PostgreSQL to streamline processes, reduce manual effort by 80%, and enhance user engagement.",
      techStack: ["Python", "Django", "PostgreSQL", "Docker", "JIRA"],
      githubLink: "",
      liveLink: "",
    },
  };

  const activeProject = projects[activeTab];

  return (
    <div
      id="SomethingIveBuiltSection"
      className="flex flex-col bg-AAprimary w-full py-32 px-4 sm:px-16 md:px-16 lg:px-24 2xl:px-72"
    >
      {/* Section Title */}
      <div data-aos="fade-up" className="flex flex-row items-center space-x-4">
        <ArrowIcon className="h-5 md:h-6 w-5 md:w-5 text-AAsecondary" />
        <span className="text-AAsecondary font-sans text-sm sm:text-xl">
          04.
        </span>
        <h2 className="font-bold tracking-wider text-gray-200 text-lg md:text-2xl">
          Some Things I’ve Built // Contributed
        </h2>
        <div className="bg-gray-400 h-[0.2px] w-full xl:w-1/3 md:w-1/2"></div>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-row space-x-4 mt-8 overflow-auto scrollbar-hide">
        {Object.keys(projects).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-2 px-4 rounded ${
              activeTab === key
                ? "bg-AAsecondary text-AAprimary"
                : "text-gray-400 hover:text-AAsecondary"
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
        } grid-cols-1 w-full mt-12 gap-8`}
      >
        {/* Left Image Section (Only Render If Image Exists) */}
        {activeProject.image && (
          <div className="col-span-12 md:col-span-7 flex items-center justify-center">
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
          } flex flex-col space-y-6`}
        >
          <div className="space-y-2">
            <span className="text-AAsecondary text-base font-semibold">
              {activeProject.title}
            </span>
            {activeProject.liveLink && (
              <a
                href={activeProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-AAsecondary hover:underline"
              >
                <br></br>
                Visit Project
              </a>
            )}
          </div>
          <p className="text-gray-300 text-lg">{activeProject.description}</p>
          <ul className="flex flex-wrap text-gray-300 text-sm space-x-4">
            {activeProject.techStack.map((tech, index) => (
              <li key={index} className="bg-gray-700 px-3 py-1 rounded">
                {tech}
              </li>
            ))}
          </ul>
          {activeProject.githubLink && (
            <div>
              <GithubIcon link={activeProject.githubLink} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
