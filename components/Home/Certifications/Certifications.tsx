import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
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
      <div className="flex flex-col space-y-6">
        {pdf && (
          <div className="w-full bg-AAhover/50 rounded-2xl p-4 border border-AAborder/30">
            <div className="w-full" style={{ minHeight: '600px' }}>
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer fileUrl={pdf} />
              </Worker>
            </div>
          </div>
        )}
        {verificationLink && (
          <a
            href={verificationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-AAsecondary hover:text-AAaccent font-medium transition-colors duration-300 bg-AAsecondary/10 hover:bg-AAaccent/10 px-4 py-2 rounded-full border border-AAsecondary/30 hover:border-AAaccent/30"
          >
            <span>Verify Certification</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
        <div className="space-y-3 mt-6">
          {description.map((point, index) => (
            <div key={index} className="flex space-x-4 items-start p-5 bg-AAhover/50 rounded-2xl border border-AAborder/30 hover:border-AAsecondary/40 transition-all duration-300 backdrop-blur-sm">
              <ArrowIcon className="h-4 w-4 text-AAsecondary flex-none mt-1" />
              <p className="text-AAtext text-base leading-relaxed">
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
      className="flex flex-col space-y-12 bg-gradient-to-br from-AAprimary to-MobileNavBarColor w-full px-4 py-24 md:px-16 border-t border-AAborder relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        data-aos="fade-up" 
        className="relative flex items-center space-x-4"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ArrowIcon className="h-6 w-6 text-AAsecondary" />
        <span className="text-AAsecondary font-semibold text-sm sm:text-xl">
          03.
        </span>
        <h2 className="font-bold text-AAtext text-lg md:text-2xl">
          Professional Certifications
        </h2>
        <div className="bg-AAborder h-[1px] w-full"></div>
      </motion.div>

      <section className="relative flex flex-col md:flex-row space-y-8 md:space-y-0 items-start w-full max-w-7xl mx-auto">
        <div className="md:w-64 md:mr-12 flex-shrink-0">
          <CertificationsBar
            setSelectedCertification={setSelectedCertification}
          />
        </div>
        <div className="flex-1 w-full">
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
    <div className="flex w-full gap-2 md:gap-3 overflow-x-auto md:flex-col md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
      {certifications.map((cert, index) => (
        <button
          key={index}
          onClick={() => {
            setSelectedCertification(cert);
            setActiveCertification(index);
          }}
          className={`flex-none md:flex-auto py-4 px-5 text-xs sm:text-sm font-medium rounded-2xl transition-all duration-300 text-left backdrop-blur-sm border min-w-[200px] sm:min-w-[240px] md:min-w-0 ${
            activeCertification === index
              ? "bg-AAhover text-AAsecondary border-AAsecondary/30 shadow-lg shadow-AAsecondary/20"
              : "text-AAsubtext hover:text-AAtext hover:bg-AAhover/50 border-transparent hover:border-AAborder"
          }`}
        >
          {cert}
        </button>
      ))}
    </div>
  );
};
