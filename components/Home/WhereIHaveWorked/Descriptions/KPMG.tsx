import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function KPMG() {
  const tasks = [
    // existing bullets (kept/trimmed)
    {
      text: "Created 30+ feature enhancements for the in-house CRM using Java, improving usability and team efficiency.",
      keywords: ["CRM", "Java", "feature enhancements"],
    },
    {
      text: "Contributed to distributed applications architecture and ensured compliance with internal data-handling standards.",
      keywords: ["distributed architecture", "compliance", "data handling"],
    },

    // NEW: industry-standard additions
    {
      text: "Wrote unit/integration tests and CI checks for core CRM modules; reached ~85% coverage on critical paths.",
      keywords: ["unit tests", "integration tests", "CI", "coverage"],
    },
    {
      text: "Documented services and onboarding guides; ran stakeholder demos and gathered feedback to tighten acceptance cycles.",
      keywords: ["documentation", "onboarding", "demos", "stakeholders"],
    },
  ];

  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Intern <span className="text-AAsecondary">@ KPMG</span>
        </span>
        <span className="font-mono text-xs text-gray-500">Jul 2020 – Dec 2020</span>
      </div>
      <div className="flex flex-col space-y-4 sm:text-sm text-xs">
        {tasks.map((item, index) => (
          <div key={index} className="flex flex-row space-x-2">
            <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
            <span
              className="text-gray-500 sm:text-sm text-xs"
              dangerouslySetInnerHTML={{
                __html: getTasksTextWithHighlightedKeyword(item.text, item.keywords),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
