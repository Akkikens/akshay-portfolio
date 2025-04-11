import React from 'react';
import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function Tag8() {
  const tasks = [
    {
      text: "Developed RESTful APIs using Spring Boot for microservices, resulting in a 25% performance improvement.",
      keywords: ["RESTful APIs", "Spring Boot", "microservices"],
    },
    {
      text: "Led a team of 3 interns, reducing processing time by 30% with enhancements in Spring Security.",
      keywords: ["team leadership", "processing time", "Spring Security"],
    },
  ];

  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Software Engineer <span className="text-AAsecondary">@ tag8</span>
        </span>
        <span className="font-mono text-xs text-gray-500">
          Feb 2021 - Nov 2021
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
