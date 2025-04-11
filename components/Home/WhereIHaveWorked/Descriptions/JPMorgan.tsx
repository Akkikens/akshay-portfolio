import React from 'react';
import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function JPMorganChase() {
  const tasks = [
    {
      text: "Created interactive financial dashboards using Tableau, visualizing complex data for better client insights.",
      keywords: ["Tableau", "financial dashboards", "data visualization"],
    },
    {
      text: "Utilized Python for data cleaning and preprocessing, supporting machine learning models.",
      keywords: ["Python", "data cleaning", "machine learning"],
    },
  ];

  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Intern{" "}
          <span className="text-AAsecondary">@ JP Morgan Chase & Co</span>
        </span>
        <span className="font-mono text-xs text-gray-500">
          Feb 2020 - Jun 2020
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
