import React from "react";
import { useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import SectionHeader from "../../Shared/Motion/SectionHeader";
import ParallaxBlob from "../../Shared/Motion/ParallaxBlob";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function Certifications() {
  const [selectedCertification, setSelectedCertification] = useState<string>(
    "IBM AI Developer"
  );

  const certificationDetails: Record<
    string,
    { pdf?: string | null; verificationLink?: string | null; description: string[] }
  > = {
    "IBM AI Developer": {
      pdf: "/AI.pdf",
      verificationLink:
        "https://coursera.org/verify/professional-cert/2UU4UYDG6R6V",
      description: [
        "IBM Professional Certificate (6 courses) — applied AI development from fundamentals to deployed applications.",
        "Built and deployed an AI-powered customer support chatbot, plus smart applications on IBM Watson AI services and APIs.",
        "Practical Python for AI, computer vision with OpenCV and Watson Visual Recognition, and multiple hands-on AI projects.",
      ],
    },
    "AWS Certified Developer – Associate": {
      pdf: "/CloudDev.pdf",
      verificationLink:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/7ed5cd682f894cbb93b854b148f4da49",
      description: [
        "Earned in 2024 — validates building, deploying, and maintaining production applications on AWS.",
        "Hands-on expertise with AWS Lambda, DynamoDB, API Gateway, and IAM — the same serverless stack I run in production.",
        "Covers cloud-native architecture, CI/CD integration, and cost-effective scaling patterns.",
      ],
    },
    "AWS Certified Cloud Practitioner": {
      pdf: "/CloudPrac.pdf",
      verificationLink:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/B2NDSG6JF114115G",
      description: [
        "Foundational knowledge of AWS services and core cloud concepts.",
        "AWS global infrastructure, security models, and pricing structure.",
        "Service selection and use-case mapping across cloud environments.",
      ],
    },
    "IBM Data Science": {
      pdf: "/DataSci.pdf",
      verificationLink:
        "https://www.coursera.org/account/accomplishments/professional-cert/EW88XURE6LLM",
      description: [
        "Strong foundation in data science methodologies and tooling.",
        "Python, SQL, and data visualization for data-driven decision-making.",
        "Built and deployed machine learning models to cloud environments.",
        "Capstone project demonstrating end-to-end data analysis.",
      ],
    },
    "Open Source Software Development, Linux & Git": {
      pdf: "/Git.pdf",
      verificationLink:
        "https://www.coursera.org/account/accomplishments/specialization/UZCVHP8ETK29",
      description: [
        "Open-source development methodologies and collaborative workflows.",
        "Linux system administration and core tooling for developers.",
        "Git for distributed version control at scale.",
      ],
    },
    "Google Cloud": {
      pdf: "/GoogleGO.pdf",
      verificationLink: null,
      description: [
        "Core GCP services, compute options, and deployment models.",
        "Cloud architecture patterns complementing my AWS production experience.",
      ],
    },
    "Game Development in Unity (C#)": {
      pdf: null,
      verificationLink: null,
      description: [
        "Built interactive 3D experiences with Unity and C#.",
        "Game loops, physics, and real-time rendering fundamentals — skills that transfer to performance-sensitive UI work.",
      ],
    },
  };

  const renderCertification = () => {
    const { pdf, verificationLink, description } =
      certificationDetails[selectedCertification];

    return (
      <div className="flex flex-col space-y-6">
        {pdf && (
          <div className="w-full rounded-2xl p-4 border border-white/[0.08] bg-white/[0.03]">
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
            <div key={index} className="flex space-x-4 items-start p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-AAsecondary/30 hover:bg-white/[0.05] transition-colors duration-200 backdrop-blur-sm">
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
      className="flex flex-col space-y-12 w-full px-5 py-20 sm:py-28 md:px-16 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Ambient accents with parallax drift */}
      <ParallaxBlob className="absolute top-0 left-0 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl" range={55} />
      <ParallaxBlob className="absolute bottom-0 right-0 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl" range={-40} />

      <SectionHeader
        index="03"
        eyebrow="Credentials"
        title="Professional Certifications"
        className="relative w-full max-w-7xl mx-auto"
      />

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
    "AWS Certified Developer – Associate",
    "AWS Certified Cloud Practitioner",
    "IBM Data Science",
    "Open Source Software Development, Linux & Git",
    "Google Cloud",
    "Game Development in Unity (C#)",
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
          className={`flex-none md:flex-auto py-4 px-5 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 text-left backdrop-blur-sm border min-w-[200px] sm:min-w-[240px] md:min-w-0 cursor-pointer ${
            activeCertification === index
              ? "bg-AAsecondary/[0.08] text-AAsecondary border-AAsecondary/30"
              : "text-AAsubtext hover:text-AAtext hover:bg-white/[0.04] border-white/[0.06] hover:border-white/[0.12]"
          }`}
        >
          {cert}
        </button>
      ))}
    </div>
  );
};
