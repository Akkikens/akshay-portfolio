import React, { useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIconForSomethingIveBuild";

export default function SomethingIveBuilt() {
  const [activeTab, setActiveTab] = useState("Factorbook");

  const projects = {
    Factorbook: {
      title: "Factorbook 2.0",
      description:
        "As a Software Engineer Intern at UMass Chan Medical School, I led the development of Factorbook 2.0, a platform using Next.js, TypeScript, and Material UI. Implemented GraphQL, reducing API response times by 55%, and improved engagement by 60% through UI/UX enhancements.",
      techStack: ["Next.js", "TypeScript", "GraphQL", "VISX", "Material UI"],
      image: "/Factorbook.png",
      githubLink: "https://github.com/weng-lab/Factorbook2.0",
      liveLink: "https://factorbook2-0.vercel.app/",
    },
    AWS: {
      title: "AWS Certification Project",
      description:
        "Developed scalable and cost-effective cloud-native applications as part of the AWS Developer Associate certification. Leveraged AWS Lambda, DynamoDB, and API Gateway for efficient development.",
      techStack: ["AWS Lambda", "DynamoDB", "API Gateway"],
      // image: "/AWSProject.png",
      githubLink: "",
      liveLink:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/7ed5cd682f894cbb93b854b148f4da49",
    },
    ClarkMarketplace: {
      title: "Clark Marketplace",
      description:
        "Co-developed a React Native application for Clark University students to buy, sell, and trade items within a secure ecosystem. Features include user authentication, product listing, search filters, and real-time messaging, all powered by AWS services.",
      techStack: ["React Native", "AWS", "Node.js", "Express", "Amazon RDS"],
      // image: "/ClarkMarketplace.png",
      githubLink: "https://github.com/Akkikens/marketplace",
      liveLink: "",
    },
    CareerSupport: {
      title: "Career Advancement Support",
      description:
        "Built a web application connecting Clark University students with alumni for career guidance. Leveraged Python, Django, and PostgreSQL to streamline processes, reduce manual effort by 80%, and enhance user engagement.",
      techStack: ["Python", "Django", "PostgreSQL", "Docker", "JIRA"],
      // image: "/CareerSupport.png",
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
          Some Things I’ve Built
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
        className="relative md:grid md:grid-cols-12 w-full md:h-96 mt-12"
      >
        {/* Left Image Section */}
        <div className="hidden bg-AAprimary z-10 py-4 absolute md:grid grid-cols-12 w-full h-full content-center">
          <div className="relative rounded w-full h-full col-start-6 col-span-7">
            {activeProject.image && (
              <Img
                src={activeProject.image}
                alt={`${activeProject.title} Screenshot`}
                className="w-full rounded h-full"
              />
            )}
          </div>
        </div>

        {/* Right Content Section */}
        <div className="md:absolute py-4 md:grid md:grid-cols-12 w-full h-full content-center">
          <div className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 col-span-8 flex flex-col items-start space-y-3">
            <div className="flex flex-col space-y-1 z-10">
              <span className="text-AAsecondary text-base font-semibold">
                {activeProject.title}
              </span>
              {activeProject.liveLink && (
                <a
                  href={activeProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-gray-200 text-AAsecondary font-bold"
                >
                  {activeProject.title}
                </a>
              )}
            </div>
            <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6 z-10 bg-opacity-10 backdrop-filter backdrop-blur-md">
              <p className="text-gray-300 md:text-gray-400 text-lg">
                {activeProject.description}
              </p>
            </div>
            <ul className="flex flex-wrap text-gray-300 md:text-gray-400 text-sm font-Text2">
              {activeProject.techStack.map((tech, index) => (
                <span key={index} className="pr-4">
                  {tech}
                </span>
              ))}
            </ul>
            <div className="flex space-x-5 z-10">
              {activeProject.githubLink && (
                <GithubIcon link={activeProject.githubLink} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
