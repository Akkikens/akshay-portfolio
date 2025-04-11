import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function Capgemini() {
  const tasks = [
    {
      text: "Optimized critical algorithms and enhanced Jenkins pipeline, leading to a 50% faster build time.",
      keywords: ["algorithms", "Jenkins", "build time"],
    },
    {
      text: "Built Single Page Applications (SPAs) and PWAs using ReactJS, Java, and JavaScript, supported by NodeJS, Oracle, and PostgreSQL.",
      keywords: ["SPAs", "PWAs", "ReactJS", "NodeJS"],
    },
    {
      text: "Developed 300+ unit tests to verify functionality, using AWS for deployment and maintenance.",
      keywords: ["unit tests", "AWS", "deployment"],
    },
    {
      text: "Handled troubleshooting and bug fixing, improving Kibana efficiency.",
      keywords: ["troubleshooting", "bug fixing", "Kibana"],
    },
  ];

  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Full Stack Engineer{" "}
          <span className="text-AAsecondary">@ Capgemini</span>
        </span>
        <span className="font-mono text-xs text-gray-500">
          Nov 2021 - Aug 2023
        </span>
      </div>
      <div className="flex flex-col space-y-4 sm:text-sm text-xs">
        {tasks.map((item, index) => (
          <div key={index} className="flex flex-row space-x-2">
            <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
            <span
              className="text-gray-500 sm:text-sm text-xs"
              dangerouslySetInnerHTML={{
                __html: getTasksTextWithHighlightedKeyword(
                  item.text,
                  item.keywords
                ),
              }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
}
