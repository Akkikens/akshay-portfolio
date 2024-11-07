import React, { useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import AWSCertifiedDeveloper from "./Descriptions/AWSCertifiedDeveloper";
import AWSCertifiedCloudPractitioner from "./Descriptions/AWSCertifiedCloudPractitioner";
import IBMAppliedAI from "./Descriptions/IBMAppliedAI";
import IBMDataScience from "./Descriptions/IBMDataScience";
import OpenSourceDevelopment from "./Descriptions/OpenSourceDevelopment";
import GoogleCloudCertification from "./Descriptions/GoogleCloudCertification";

export default function Certifications() {
  const [selectedCertification, setSelectedCertification] = useState<string>(
    "AWS Certified Developer Associate"
  );

  const renderCertification = () => {
    switch (selectedCertification) {
      case "AWS Certified Developer Associate":
        return <AWSCertifiedDeveloper />;
      case "AWS Certified Cloud Practitioner":
        return <AWSCertifiedCloudPractitioner />;
      case "IBM Applied AI":
        return <IBMAppliedAI />;
      case "IBM Data Science":
        return <IBMDataScience />;
      case "Open Source Development, Linux, and Git":
        return <OpenSourceDevelopment />;
      case "Google Cloud Certification":
        return <GoogleCloudCertification />;
      default:
        return <AWSCertifiedDeveloper />;
    }
  };

  return (
    <div
      id="CertificationsSection"
      className="flex flex-col xl:space-y-28 space-y-12 bg-AAprimary w-full 2xl:px-72 lg:px-24 md:px-16 sm:px-16 py-32 px-4"
    >
      {/* Section Title */}
      <div data-aos="fade-up" className="flex flex-row items-center md:px-0">
        <ArrowIcon className="flex-none h-5 md:h-6 w-5 md:w-5 translate-y-[2px] text-AAsecondary" />
        <div className="flex-none flex-row space-x-2 items-center pr-2">
          <span className="text-AAsecondary font-sans text-sm sm:text-xl">
            03.
          </span>
          <span className="font-bold tracking-wider text-gray-200 text-lg md:text-2xl w-44 md:w-56 opacity-85">
            Certifications
          </span>
        </div>
        <div className="bg-gray-400 h-[0.2px] w-full xl:w-1/3 md:w-1/2"></div>
      </div>

      {/* Certifications Content */}
      <section className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center items-start">
        <CertificationsBar
          setSelectedCertification={setSelectedCertification}
        />
        {renderCertification()}
      </section>
    </div>
  );
}

interface CertificationsBarProps {
  setSelectedCertification: React.Dispatch<React.SetStateAction<string>>;
}

const CertificationsBar: React.FC<CertificationsBarProps> = ({
  setSelectedCertification,
}) => {
  const [activeCertification, setActiveCertification] = useState<number>(0);

  const certifications = [
    "AWS Certified Developer Associate",
    "AWS Certified Cloud Practitioner",
    "IBM Applied AI",
    "IBM Data Science",
    "Open Source Development, Linux, and Git",
    "Google Cloud Certification",
  ];

  return (
    <div className="flex flex-col space-y-1 pl-8 md:pl-0">
      {certifications.map((cert, index) => (
        <button
          key={index}
          onClick={() => {
            setSelectedCertification(cert);
            setActiveCertification(index);
          }}
          className={`flex-none sm:text-sm text-xs text-center md:text-left hover:text-AAsecondary hover:bg-ResumeButtonHover rounded font-mono py-3 md:pl-6 md:px-4 md:w-44 w-32 duration-500 ${
            activeCertification === index
              ? "bg-ResumeButtonHover text-AAsecondary"
              : "text-gray-500"
          }`}
          aria-pressed={activeCertification === index}
        >
          {cert}
        </button>
      ))}
    </div>
  );
};
