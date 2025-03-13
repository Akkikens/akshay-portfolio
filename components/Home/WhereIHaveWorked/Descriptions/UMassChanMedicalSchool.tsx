import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function UMassChanMedicalSchool() {
  const tasks = [
    {
      text: "Architected and developed Factorbook2.0 using Next.js, TypeScript, and Material UI, enhancing the platform's performance.",
      keywords: ["Next.js", "TypeScript", "Material UI", "performance"],
    },
    {
      text: "Integrated GraphQL for efficient data querying, reducing API response times by 55%.",
      keywords: ["GraphQL", "data querying", "API response"],
    },
    {
      text: "Built complex, interactive data visualizations with VISX for real-time analytics, aiding researchers in exploring genetic factors.",
      keywords: ["VISX", "data visualizations", "analytics"],
    },
    {
      text: "Collaborated with UI/UX designers to improve engagement by 60%, ensuring design consistency.",
      keywords: ["UI/UX", "design consistency", "engagement"],
    },
    {
      text: "Implemented responsive design for compatibility across mobile and tablet devices, enhancing accessibility.",
      keywords: ["responsive design", "mobile compatibility", "accessibility"],
    },
  ];

  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Software Engineer Intern{" "}
          <span className="text-AAsecondary">@ UMass Chan Medical School</span>
        </span>
        <span className="font-mono text-xs text-gray-500">
          May 2024 - January 2025
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
