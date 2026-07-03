import React from "react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ArrowIcon from "../../Icons/ArrowIcon";
import {
  EASE_OUT,
  INDICATOR_TRANSITION,
  ScrubSection,
  SectionHeader,
  ParallaxBlob,
} from "../../Shared/Motion";

const descriptionListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const descriptionItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

export default function Certifications() {
  const [selected, setSelected] = useState<string>("IBM AI Developer");
  const prefersReducedMotion = useReducedMotion();

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

  const certifications = Object.keys(certificationDetails);

  const renderCertification = () => {
    const { pdf, verificationLink, description } = certificationDetails[selected];

    return (
      <div className="flex flex-col space-y-6">
        {(pdf || verificationLink) && (
          <div className="flex flex-wrap items-center gap-3">
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
            {pdf && (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-AAsecondary hover:text-AAaccent font-medium transition-colors duration-300 bg-AAsecondary/10 hover:bg-AAaccent/10 px-4 py-2 rounded-full border border-AAsecondary/30 hover:border-AAaccent/30"
              >
                <span>View Certificate (PDF)</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            )}
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            className="space-y-3 mt-6"
            variants={prefersReducedMotion ? undefined : descriptionListVariants}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="show"
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: -8, transition: { duration: 0.15 } }
            }
          >
            {description.map((point, index) => (
              <motion.div
                key={index}
                variants={prefersReducedMotion ? undefined : descriptionItemVariants}
                className="flex space-x-4 items-start p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-AAsecondary/30 hover:bg-white/[0.05] transition-colors duration-200"
              >
                <ArrowIcon className="h-4 w-4 text-AAsecondary flex-none mt-1" />
                <p className="text-AAtext text-base leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
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

      <ScrubSection className="relative flex flex-col space-y-12 w-full">
        <SectionHeader
          index="03"
          eyebrow="Credentials"
          title="Professional Certifications"
          className="relative w-full max-w-7xl mx-auto"
        />

        <section className="relative flex flex-col md:flex-row space-y-8 md:space-y-0 items-start w-full max-w-7xl mx-auto">
          <div className="md:w-64 md:mr-12 flex-shrink-0">
            <CertificationsBar
              certifications={certifications}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
          <div className="flex-1 w-full">
            {renderCertification()}
          </div>
        </section>
      </ScrubSection>
    </div>
  );
}

interface CertificationsBarProps {
  certifications: string[];
  selected: string;
  onSelect: (cert: string) => void;
}

const CertificationsBar: React.FC<CertificationsBarProps> = ({
  certifications,
  selected,
  onSelect,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex w-full gap-2 md:gap-3 overflow-x-auto md:flex-col md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
      {certifications.map((cert) => {
        const isActive = cert === selected;
        return (
          <button
            key={cert}
            onClick={() => onSelect(cert)}
            className={`relative flex-none md:flex-auto py-4 px-5 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 text-left border min-w-[200px] sm:min-w-[240px] md:min-w-0 cursor-pointer ${
              isActive
                ? "text-AAsecondary border-AAsecondary/30"
                : "text-AAsubtext hover:text-AAtext hover:bg-white/[0.04] border-white/[0.06] hover:border-white/[0.12]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeCertIndicator"
                className="absolute inset-0 bg-AAsecondary/[0.08] rounded-xl"
                transition={
                  prefersReducedMotion ? { duration: 0 } : INDICATOR_TRANSITION
                }
              />
            )}
            <span className="relative">{cert}</span>
          </button>
        );
      })}
    </div>
  );
};
