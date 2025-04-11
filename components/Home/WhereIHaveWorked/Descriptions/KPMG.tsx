import React from 'react';
import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function KPMG() {
  const tasks = [
    {
      text: "Enhanced the in-house CRM with 30+ new features using Java, increasing system functionality.",
      keywords: ["CRM", "Java", "feature enhancements"],
    },
    {
      text: "Implemented client-side validation using JavaScript, achieving a 99% client satisfaction rate.",
      keywords: ["client-side validation", "JavaScript", "client satisfaction"],
    },
  ];

  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Intern <span className="text-AAsecondary">@ KPMG</span>
        </span>
        <span className="font-mono text-xs text-gray-500">
          Jul 2020 - Dec 2020
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
