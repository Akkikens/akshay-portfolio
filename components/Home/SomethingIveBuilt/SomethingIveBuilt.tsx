import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIconForSomethingIveBuild";
import ExternalLink from "../../Icons/ExternalLink";

export default function SomethingIveBuilt() {
  const router = useRouter();
  return (
    <div
      id="SomethingIveBuiltSection"
      className="flex flex-col xl:space-y-28 space-y-12 bg-AAprimary w-full 2xl:px-72 lg:px-24 md:px-16 sm:px-16 py-32 px-4"
    >
      {/* Section Title */}
      <div data-aos="fade-up" className="flex flex-row items-center md:px-0">
        <ArrowIcon className="flex-none h-5 md:h-6 w-5 md:w-5 translate-y-[2px] text-AAsecondary" />
        <div className="flex-none flex-row space-x-2 items-center pr-2">
          <span className="text-AAsecondary font-sans text-sm sm:text-xl">
            04.
          </span>
          <span className="font-bold tracking-wider text-gray-200 text-lg md:text-2xl w-44 md:w-56 opacity-85">
            Some Things I’ve Built
          </span>
        </div>
        <div className="bg-gray-400 h-[0.2px] w-full xl:w-1/3 md:w-1/2"></div>
      </div>

      {/* Project: Factorbook 2.0 */}
      <div className="flex flex-col xl:space-y-36 space-y-8 md:space-y-28">
        <div
          data-aos="fade-up"
          className="relative md:grid md:grid-cols-12 w-full md:h-96"
        >
          {/* Left Image Section */}
          <div className="hidden bg-AAprimary z-10 py-4 absolute md:grid grid-cols-12 w-full h-full content-center">
            <div className="relative rounded w-full h-full col-start-6 col-span-7">
              <a
                href="https://factorbook2-0.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="absolute w-full h-full rounded bg-AAprimary transition-opacity opacity-50 hover:opacity-0 duration-300"></div>
              </a>
              <Img
                src="/Factorbook.png"
                alt="Factorbook Project Screenshot"
                className="w-full rounded h-full"
              />
            </div>
          </div>

          {/* Right Content Section */}
          <div className="md:absolute py-4 md:grid md:grid-cols-12 w-full h-full content-center">
            <div className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 col-span-8 flex flex-col items-start space-y-3">
              <div className="flex flex-col space-y-1 z-10">
                <span className="text-AAsecondary text-base font-semibold">
                  Factorbook 2.0
                </span>
                <a
                  href="https://factorbook2-0.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-2xl md:text-gray-200 text-AAsecondary font-bold">
                    Genetic Research Platform
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6 z-10 bg-opacity-10 backdrop-filter backdrop-blur-md">
                <p className="text-gray-300 md:text-gray-400 text-lg">
                  As a Software Engineer Intern at UMass Chan Medical School, I
                  led the development of Factorbook 2.0, a platform using
                  Next.js, TypeScript, and Material UI. Implemented GraphQL,
                  reducing API response times by 55%, and improved engagement by
                  60% through UI/UX enhancements.
                </p>
              </div>
              <ul className="flex flex-wrap text-gray-300 md:text-gray-400 text-sm font-Text2">
                <span className="pr-4">Next.js</span>
                <span className="pr-4">TypeScript</span>
                <span className="pr-4">GraphQL</span>
                <span className="pr-4">VISX</span>
                <span className="pr-4">Material UI</span>
              </ul>
              <div className="flex space-x-5 z-10">
                <GithubIcon link="https://github.com/weng-lab/Factorbook2.0" />
                <a
                  href="https://factorbook2-0.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
