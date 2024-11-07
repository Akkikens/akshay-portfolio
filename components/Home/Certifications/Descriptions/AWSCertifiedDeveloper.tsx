import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";

const AWSCertifiedDeveloper: React.FC = () => {
  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          AWS Certified Developer - Associate
        </span>
        <span className="font-mono text-xs text-gray-500">Issued: 2023</span>
      </div>
      <div className="flex flex-col space-y-4 sm:text-sm text-xs">
        <div className="flex flex-row space-x-2">
          <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
          <span className="text-gray-500 sm:text-sm text-xs">
            Demonstrated proficiency in AWS core services and best practices.
          </span>
        </div>
        <div className="flex flex-row space-x-2">
          <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
          <span className="text-gray-500 sm:text-sm text-xs">
            Developed and deployed applications with AWS best practices.
          </span>
        </div>
      </div>
      <button
        onClick={() =>
          window.open("/certifications/AWS_Certified_Developer.pdf", "_blank")
        }
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        View Certification PDF
      </button>
    </div>
  );
};

export default AWSCertifiedDeveloper;
