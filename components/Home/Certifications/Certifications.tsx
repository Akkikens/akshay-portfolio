import React, { useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function Certifications() {
  const [selectedCertification, setSelectedCertification] = useState<string>(
    "AWS Certified Developer Associate"
  );

  const certificationDetails = {
    "AWS Certified Developer Associate": {
      pdf: "/CloudDev.pdf",
      verificationLink:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/7ed5cd682f894cbb93b854b148f4da49",
      description: [
        "Learned to develop and maintain applications on the AWS platform.",
        "Developed expertise in using AWS Lambda, DynamoDB, and API Gateway.",
        "Gained skills in building scalable and cost-effective cloud-native applications.",
      ],
    },
    "AWS Certified Cloud Practitioner": {
      pdf: "/CloudPrac.pdf",
      verificationLink:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/B2NDSG6JF114115G",
      description: [
        "Gained foundational knowledge of AWS services and core cloud concepts.",
        "Understood AWS global infrastructure, security models, and pricing structure.",
        "Acquired familiarity with AWS services and their use cases in cloud environments.",
      ],
    },
    "IBM Applied AI": {
      pdf: "/AI.pdf",
      verificationLink:
        "https://www.coursera.org/account/accomplishments/professional-cert/2UU4UYDG6R6V",
      description: [
        "Built expertise in AI principles, applications, and IBM Watson services.",
        "Gained hands-on experience with building AI-powered chatbots for customer support.",
        "Utilized IBM Watson APIs for implementing NLP and image recognition models.",
        "Acquired Python skills for developing and deploying AI applications.",
        "Completed multiple projects demonstrating applied AI knowledge.",
      ],
    },
    "IBM Data Science": {
      pdf: "/DataSci.pdf",
      verificationLink:
        "https://www.coursera.org/account/accomplishments/professional-cert/EW88XURE6LLM",
      description: [
        "Developed a strong foundation in data science methodologies and tools.",
        "Mastered Python, SQL, and data visualization for data-driven decision-making.",
        "Created machine learning models and deployed them on cloud environments.",
        "Completed a capstone project showcasing advanced data analysis skills.",
      ],
    },
    "Open Source Software Development, Linux, and Git": {
      pdf: "/Git.pdf",
      verificationLink:
        "https://www.coursera.org/account/accomplishments/specialization/UZCVHP8ETK29",
      description: [
        "Gained proficiency in open-source software development methodologies.",
        "Learned Linux system administration and core Linux commands.",
        "Mastered Git for distributed version control and collaborative workflows.",
        "Acquired hands-on experience with essential Linux tools for developers.",
      ],
    },
    "An Introduction to Programming the Internet of Things (IoT)": {
      pdf: "/iot.pdf",
      verificationLink:
        "https://www.coursera.org/account/accomplishments/specialization/9MAE3XMMZ5W7",
      description: [
        "Learned IoT fundamentals and embedded system design.",
        "Developed skills in Arduino and Raspberry Pi programming and interfacing.",
        "Built and deployed IoT devices that interact with physical environments.",
        "Completed a capstone project involving IoT system design and deployment.",
      ],
    },
  };

  const renderCertification = () => {
    const { pdf, verificationLink, description } =
      certificationDetails[selectedCertification];

    return (
      <div className="flex flex-col space-y-1">
        {pdf && (
          <div className="w-full">
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={pdf} />
            </Worker>
          </div>
        )}
        {verificationLink && (
          <a
            href={verificationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-AAsecondary underline mt-2 mb-0"
          >
            Verify Certification
          </a>
        )}
        <div className="flex flex-col mt-2">
          {description.map((point, index) => (
            <div key={index} className="flex flex-row space-x-2 items-start">
              <ArrowIcon className="h-4 w-4 text-AAsecondary flex-none" />
              <p className="text-gray-300 sm:text-sm text-xs leading-relaxed m-0">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
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
        <div className="w-full md:w-2/3 h-screen bg-transparent rounded p-0">
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
    "Open Source Software Development, Linux, and Git",
    "An Introduction to Programming the Internet of Things (IoT)",
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
