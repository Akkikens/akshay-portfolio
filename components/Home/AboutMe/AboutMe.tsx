import React from "react";
import Img from "../../../components/smallComp/image/Img";
import ArrowIcon from "../../../components/Icons/ArrowIcon";

export default function AboutMe(props) {
  const technologies = [
    [
      "Next.js/React",
      "TypeScript/JavaScript",
      "React Native",
      "Tailwind CSS",
      "AWS/Azure",
      "GraphQL/REST APIs",
    ],
    ["Node.js", "Java", "Python", "PostgreSQL/MySQL", "Docker/Kubernetes"],
  ];

  return (
    <div
      id="aboutSection"
      data-aos="fade-up"
      className="snap-start flex flex-col items-center py-20 bg-AAprimary"
    >
      {/* Section Header */}
      <div className="flex flex-col space-y-8 px-4 sm:px-0 w-full sm:w-[500px] md:w-[700px] lg:w-[900px]">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center mr-4">
            <ArrowIcon className="flex-none h-4 md:h-6 w-4 md:w-5 translate-y-[0.5px] text-AAsecondary" />
            <span className="text-AAsecondary font-Header text-sm sm:text-xl">
              01.
            </span>
            <span className="flex-none text-gray-200 opacity-85 font-bold tracking-wider text-lg sm:text-2xl pl-4">
              About Me
            </span>
          </div>
          <div className="bg-gray-400 h-[0.2px] w-full sm:w-72 ml-4"></div>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 sm:space-x-2">
          <div className="w-full md:w-7/12 space-y-4 sm:text-base text-sm">
            <div className="font-Header text-justify">
              <span className="text-gray-400">
                Hello! I'm Akshay, a dedicated{" "}
                <span className="text-AAsecondary">
                  Full Stack Software Engineer
                </span>{" "}
                passionate about creating efficient and scalable applications.
                My journey in technology began early, sparking my interest in
                problem-solving and programming, eventually leading me to pursue
                a{" "}
                <span className="text-AAsecondary">
                  Bachelor’s in Information Technology
                </span>{" "}
                and currently a{" "}
                <span className="text-AAsecondary">
                  Master’s degree in Computer Science
                </span>
                .
              </span>
            </div>
            <div className="font-Header text-justify">
              <span className="text-gray-400">
                Over the years, I've gained valuable experience through roles in
                diverse industries, contributing to projects at companies like{" "}
                <span className="text-AAsecondary">Capgemini</span> and{" "}
                <span className="text-AAsecondary">
                  UMass Chan Medical School
                </span>
                . At UMass, I enhanced the Factorbook platform, optimizing
                performance and implementing responsive design for a seamless
                user experience across devices.
              </span>
            </div>
            <div className="font-Header tracking-wide text-justify">
              <span className="text-gray-400">
                My ongoing goal is to leverage my skills to solve complex
                problems and continuously expand my technical knowledge. Here
                are a few technologies I've been working with recently:
              </span>
            </div>
            <div className="font-Header tracking-wide flex flex-row space-x-16 justify-center lg:justify-start">
              {technologies.map((techGroup, groupIndex) => (
                <div
                  key={groupIndex}
                  className="flex flex-col space-y-4 sm:text-base text-sm"
                >
                  {techGroup.map((tech, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center space-x-2"
                    >
                      <ArrowIcon className="h-3 w-3 text-AAsecondary" />
                      <span className="text-gray-400 sm:text-sm text-xs">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Image Section */}={" "}
          <div className="relative group lg:w-80 lg:h-80 md:w-64 md:h-64 hidden md:block">
            {/* Hover Border Frame */}
            <div className="absolute inset-0 transform translate-x-4 translate-y-4 border-2 border-AAsecondary rounded-lg group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300 ease-in-out z-0"></div>

            {/* Actual Image Container */}
            <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
              <div className="absolute inset-0 bg-AAsecondary opacity-10 group-hover:opacity-0 transition-opacity duration-300 rounded-lg"></div>
              <Img
                src={"/Portfolio-portrait-3.png"}
                className="object-cover w-full h-full rounded-lg"
                alt="My Image Not Found"
                loading="lazy"
              />
            </div>
          </div>
          {/* Mobile Image Section */}
          <div className="relative w-48 h-48 md:hidden flex justify-center items-center">
            {/* Hover Border Frame */}
            <div className="absolute inset-0 transform translate-x-4 translate-y-4 border-2 border-AAsecondary rounded-lg"></div>

            {/* Image Container */}
            <div className="absolute inset-0 overflow-hidden rounded-lg z-10">
              <Img
                src={"/Portfolio-portrait-3.png"}
                className="object-cover w-full h-full rounded-lg"
                alt="My Image Not Found"
                loading="lazy"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-AAsecondary opacity-10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
