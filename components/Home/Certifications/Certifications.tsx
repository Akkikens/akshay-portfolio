import React, { useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import AWSCertifiedDeveloper from "./Descriptions/AWSCertifiedDeveloper";
import AWSCertifiedCloudPractitioner from "./Descriptions/AWSCertifiedCloudPractitioner";
import IBMAppliedAI from "./Descriptions/IBMAppliedAI";
import IBMDataScience from "./Descriptions/IBMDataScience";
import OpenSourceDevelopment from "./Descriptions/OpenSourceDevelopment";
import GoogleCloudCertification from "./Descriptions/GoogleCloudCertification";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function Certifications() {
  const [selectedCertification, setSelectedCertification] = useState<string>(
    "AWS Certified Developer Associate"
  );

  const renderCertification = () => {
    switch (selectedCertification) {
      case "AWS Certified Developer Associate":
        return (
          <div className="flex flex-col space-y-4">
            <div className="w-full h-full overflow-hidden">
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer fileUrl="/CloudDev.pdf" />
              </Worker>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Through the AWS Certified Developer Associate certification, I
              learned how to develop and maintain applications on the AWS
              platform, covering services like Lambda, DynamoDB, and API
              Gateway. This certification deepened my understanding of building
              scalable cloud-native applications.
            </p>
          </div>
        );
      case "AWS Certified Cloud Practitioner":
        return (
          <div className="flex flex-col space-y-4">
            <div className="w-full h-full overflow-hidden">
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer fileUrl="/CloudPrac.pdf" />
              </Worker>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The AWS Certified Cloud Practitioner certification provided me
              with foundational knowledge of AWS services and cloud concepts,
              including global infrastructure, security, and pricing models.
              This helped me understand core AWS services and use cases.
            </p>
          </div>
        );
      case "IBM Applied AI":
        return (
          <div className="flex flex-col space-y-4">
            <IBMAppliedAI />
            <p className="text-gray-300 text-sm leading-relaxed">
              In IBM Applied AI, I gained hands-on experience with machine
              learning and deep learning techniques. I learned how to build and
              deploy AI models and utilize IBM Watson for natural language
              processing and computer vision tasks.
            </p>
          </div>
        );
      case "IBM Data Science":
        return (
          <div className="flex flex-col space-y-4">
            <IBMDataScience />
            <p className="text-gray-300 text-sm leading-relaxed">
              The IBM Data Science certification focused on data analysis and
              visualization, machine learning, and Python programming. This
              program equipped me with essential skills for data-driven
              decision-making and insights.
            </p>
          </div>
        );
      case "Open Source Development, Linux, and Git":
        return (
          <div className="flex flex-col space-y-4">
            <OpenSourceDevelopment />
            <p className="text-gray-300 text-sm leading-relaxed">
              This certification covered the basics of open-source development,
              Linux system administration, and version control with Git. I
              learned about collaborative workflows, Linux commands, and Git
              branching techniques.
            </p>
          </div>
        );
      case "Google Cloud Certification":
        return (
          <div className="flex flex-col space-y-4">
            <GoogleCloudCertification />
            <p className="text-gray-300 text-sm leading-relaxed">
              The Google Cloud Certification taught me how to design, develop,
              and manage solutions on the Google Cloud Platform. I became
              familiar with Google services like Compute Engine, App Engine, and
              BigQuery for building cloud solutions.
            </p>
          </div>
        );
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
            Professional Certifications
          </span>
        </div>
        <div className="bg-gray-400 h-[0.2px] w-full xl:w-1/3 md:w-1/2"></div>
      </div>

      {/* Certifications Content */}
      <section className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center items-start">
        <CertificationsBar
          setSelectedCertification={setSelectedCertification}
        />
        <div className="w-full md:w-2/3 h-screen bg-transparent rounded p-4 overflow-hidden">
          {renderCertification()}
        </div>
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
