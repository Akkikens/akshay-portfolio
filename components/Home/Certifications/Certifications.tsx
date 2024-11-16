import React, { useState } from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../Icons/ArrowIcon";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function Certifications() {
  const [selectedCertification, setSelectedCertification] = useState<string>(
    "AWS Certified Developer Associate"
  );

  const [barPosition, setBarPosition] = useState(0);
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
    // Add other certifications similarly
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
            className="text-AAsecondary underline mt-2"
          >
            Verify Certification
          </a>
        )}
        <div className="flex flex-col mt-2 space-y-1">
          {description.map((point, index) => (
            <div key={index} className="flex flex-row space-x-2 items-start">
              <ArrowIcon className="h-4 w-4 text-AAsecondary flex-none" />
              <p className="text-gray-300 sm:text-sm text-xs leading-relaxed">
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
      className="flex flex-col space-y-10 bg-AAprimary w-full px-4 py-16 md:px-16"
    >
      <div data-aos="fade-up" className="flex flex-row items-center space-x-4">
        <ArrowIcon className="h-6 w-6 text-AAsecondary" />
        <span className="text-AAsecondary font-sans text-sm sm:text-xl">
          03.
        </span>
        <h2 className="font-bold text-gray-200 text-lg md:text-2xl">
          Professional Certifications
        </h2>
        <div className="bg-gray-400 h-[0.2px] w-full"></div>
      </div>

      <section className="flex flex-col md:flex-row md:space-x-4 items-start">
        {/* Tabs */}
        <CertificationsBar
          setSelectedCertification={setSelectedCertification}
          setBarPosition={setBarPosition}
        />
        <div className="w-full md:w-2/3 bg-transparent rounded">
          {renderCertification()}
        </div>
      </section>
    </div>
  );
}

interface CertificationsBarProps {
  setSelectedCertification: React.Dispatch<React.SetStateAction<string>>;
  setBarPosition: React.Dispatch<React.SetStateAction<number>>;
}

const CertificationsBar: React.FC<CertificationsBarProps> = ({
  setSelectedCertification,
  setBarPosition,
}) => {
  const certifications = [
    "AWS Certified Developer Associate",
    "AWS Certified Cloud Practitioner",
    "IBM Applied AI",
    "IBM Data Science",
    "Open Source Software Development, Linux, and Git",
    "An Introduction to Programming the Internet of Things (IoT)",
  ];
  const [activeCertification, setActiveCertification] = useState(0);

  return (
    <div className="flex flex-col space-y-1 pl-8 md:pl-0 relative">
      <div className="hidden md:block bg-gray-500 relative h-[240px] w-0.5">
        <motion.div
          animate={{ y: activeCertification * 40 }}
          className="absolute w-0.5 h-10 bg-AAsecondary rounded"
        ></motion.div>
      </div>

      {certifications.map((cert, index) => (
        <button
          key={index}
          onClick={() => {
            setSelectedCertification(cert);
            setActiveCertification(index);
            setBarPosition(index * 40);
          }}
          className={`flex-none sm:text-sm text-xs text-center md:text-left hover:text-AAsecondary hover:bg-ResumeButtonHover rounded font-mono py-3 md:px-4 w-full ${
            activeCertification === index
              ? "bg-ResumeButtonHover text-AAsecondary"
              : "text-gray-500"
          }`}
        >
          {cert}
        </button>
      ))}

      {/* Horizontal bar for mobile */}
      <div className="block md:hidden h-0.5 bg-gray-500 mt-2">
        <motion.div
          animate={{ x: activeCertification * 128 }}
          className="w-32 h-0.5 bg-AAsecondary rounded"
        ></motion.div>
      </div>
    </div>
  );
};
