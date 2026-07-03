import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIconForSomethingIveBuild";
import SectionHeader from "../../Shared/Motion/SectionHeader";
import ParallaxBlob from "../../Shared/Motion/ParallaxBlob";
import { EASE_OUT, Reveal, ScrubSection } from "../../Shared/Motion";

const chipContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const chipItemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

/**
 * Product-shot frame: overflow-hidden rounded frame; the image drifts
 * vertically (-16px -> 16px) scrubbed to scroll, on a 1.06 baseline scale so
 * edges never show. Static under reduced motion.
 */
function ScreenshotFrame({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  return (
    <div
      ref={frameRef}
      className="relative group overflow-hidden rounded-2xl shadow-2xl border border-AAborder hover:shadow-AAaccent/20 transition-all duration-500"
    >
      <motion.div
        className="scale-[1.06]"
        style={prefersReducedMotion ? undefined : { y: imgY }}
      >
        <Img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-contain"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-AAaccent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default function SomethingIveBuilt() {
  const [activeTab, setActiveTab] = useState("MLPipeline");
  const prefersReducedMotion = useReducedMotion();

  const projects: Record<string, {
    title: string;
    description: string;
    techStack: string[];
    image?: string | null;
    imageWidth?: number;
    imageHeight?: number;
    githubLink: string;
    liveLink: string;
  }> = {
    MLPipeline: {
      title: "Advanced ML Pipeline & Agent System",
      description:
        "Comprehensive machine learning pipeline with multi-agent orchestration using LangChain, Hugging Face Transformers, and OpenAI APIs. Built end-to-end ML workflows including data preprocessing, model training with PyTorch/TensorFlow, evaluation pipelines, and deployment automation. Implemented agent-based systems for automated data processing, model validation, and intelligent decision-making with 99.5% accuracy.",
      techStack: ["Python", "LangChain", "Hugging Face", "OpenAI", "PyTorch", "TensorFlow", "Scikit-learn", "MLflow", "Docker", "Kubernetes"],
      githubLink: "",
      liveLink: "",
    },
    ChatbotUI: {
      title: "AI Chatbot Platform",
      description:
        "Advanced AI chat application built with Next.js, React, and Supabase. Features LangChain integration for conversational AI, Hugging Face models for specialized NLP tasks, and OpenAI API integration for intelligent responses. Includes real-time analytics, conversation memory, and multi-agent orchestration capabilities.",
      techStack: ["Next.js", "React", "Supabase", "LangChain", "Hugging Face", "OpenAI", "Docker", "Node.js"],
      image: "/screenshot.webp",
      imageWidth: 1200,
      imageHeight: 711,
      githubLink: "https://github.com/akkikens/ui-chatbot",
      liveLink: "https://akshaykalapgar.com/projects/ui-chatbot",
    },
    DevDiagrams: {
      title: "DevDiagrams - Interactive Learning Platform",
      description:
        "Interactive learning platform built with Next.js 15 and React 18, featuring comprehensive UI components from Radix UI. Integrated Supabase for authentication and real-time data management, with Stripe and Razorpay for payment processing. Includes PDF processing with react-pdf, AI-powered features using OpenAI, and real-time notifications with react-hot-toast. Optimized with Vercel Speed Insights for performance monitoring.",
      techStack: ["Next.js 15", "React 18", "TypeScript", "Supabase", "Radix UI", "OpenAI", "Stripe", "Razorpay", "Framer Motion", "Tailwind CSS"],
      image: "/devdiagrams.webp",
      imageWidth: 1200,
      imageHeight: 684,
      githubLink: "https://github.com/Akkikens/devdiagrams",
      liveLink: "https://devdiagrams.app",
    },
    AWS: {
      title: "AWS Certification Project",
      description:
        "Developed scalable and cost-effective cloud-native applications as part of the AWS Developer Associate certification. Leveraged AWS Lambda, DynamoDB, and API Gateway for efficient development.",
      techStack: ["AWS Lambda", "DynamoDB", "API Gateway"],
      image: null, // No image provided
      githubLink: "",
      liveLink:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/7ed5cd682f894cbb93b854b148f4da49",
    },
    ClarkMarketplace: {
      title: "Clark Marketplace",
      description:
        "Co-developed a React Native application for Clark University students to buy, sell, and trade items within a secure ecosystem. Features include user authentication, product listing, search filters, and real-time messaging, all powered by AWS services.",
      techStack: ["React Native", "AWS", "Node.js", "Express", "Amazon RDS"],
      githubLink: "https://github.com/Akkikens/marketplace",
      liveLink: "",
    },
    CareerSupport: {
      title: "AI-Powered Career Platform",
      description:
        "Intelligent web application connecting Clark University students with alumni for career guidance. Leveraged Python, Django, and PostgreSQL with AI integration using LangChain for intelligent matching, Hugging Face models for resume analysis, and OpenAI for personalized career recommendations. Streamlined processes, reduced manual effort by 80%, and enhanced user engagement through AI-driven insights.",
      techStack: ["Python", "Django", "PostgreSQL", "LangChain", "Hugging Face", "OpenAI", "Docker", "JIRA"],
      githubLink: "",
      liveLink: "",
    },
  };

  const activeProject = projects[activeTab];

  const contentGrid = (
    <>
      {/* Left Image Section (Only Render If Image Exists) */}
      {activeProject.image && (
        <div className="col-span-12 md:col-span-7 flex items-center justify-center order-1 md:order-1">
          <ScreenshotFrame
            src={activeProject.image}
            alt={`${activeProject.title} Screenshot`}
            width={activeProject.imageWidth ?? 1200}
            height={activeProject.imageHeight ?? 675}
          />
        </div>
      )}

      {/* Right Content Section */}
      <div
        className={`${
          activeProject.image ? "md:col-span-5" : "md:col-span-6"
        } flex flex-col space-y-6 order-2 md:order-2 min-w-0 w-full`}
      >
        <div className="rounded-2xl p-5 sm:p-6 md:p-7 border border-white/[0.08] bg-white/[0.03]">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-AAtext text-base sm:text-lg md:text-xl font-bold">
                {activeProject.title}
              </h3>
            </div>

            <p className="text-AAtext text-sm sm:text-base md:text-lg leading-relaxed">
              {activeProject.description}
            </p>

            <motion.div
              className="flex flex-wrap gap-2"
              variants={prefersReducedMotion ? undefined : chipContainerVariants}
              initial={prefersReducedMotion ? undefined : "hidden"}
              whileInView={prefersReducedMotion ? undefined : "show"}
              viewport={{ once: true }}
            >
              {activeProject.techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  variants={prefersReducedMotion ? undefined : chipItemVariants}
                  className="font-mono text-AAtext px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs border border-white/[0.08] bg-white/[0.03] hover:border-AAsecondary/40 hover:text-AAsecondary transition-colors duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
              {activeProject.liveLink && (
                <a
                  href={activeProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-AAaccent hover:text-AAsecondary font-medium transition-colors duration-300 bg-AAaccent/10 hover:bg-AAsecondary/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-AAaccent/30 hover:border-AAsecondary/30 text-xs sm:text-sm"
                >
                  <span>Visit Project</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {activeProject.githubLink && (
                <GithubIcon link={activeProject.githubLink} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const gridClassName = `relative grid ${
    activeProject.image ? "md:grid-cols-12" : "md:grid-cols-6"
  } grid-cols-1 w-full mt-8 sm:mt-12 gap-6 sm:gap-8 md:gap-12`;

  return (
    <div
      id="SomethingIveBuiltSection"
      className="flex flex-col w-full py-20 sm:py-28 px-5 sm:px-8 md:px-16 lg:px-24 2xl:px-72 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Ambient accents with parallax drift */}
      <ParallaxBlob className="absolute top-0 left-0 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl" range={55} />
      <ParallaxBlob className="absolute bottom-0 right-0 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl" range={-40} />

      <ScrubSection className="flex flex-col w-full">
        <SectionHeader
          index="05"
          eyebrow="Projects"
          title="Personal Projects"
          className="relative"
        />

        {/* Tabs Section */}
        <Reveal className="relative -mx-2 flex overflow-x-auto sm:flex-wrap sm:overflow-visible gap-3 mt-8 sm:mt-12 px-2 scrollbar-hide">
          {Object.keys(projects).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-3 px-5 text-xs sm:text-sm rounded-xl font-medium transition-colors duration-200 min-w-[220px] sm:min-w-0 text-left whitespace-normal sm:whitespace-nowrap cursor-pointer border ${
                activeTab === key
                  ? "bg-AAsecondary/[0.08] text-AAsecondary border-AAsecondary/30"
                  : "text-AAsubtext hover:text-AAtext bg-white/[0.03] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05]"
              }`}
            >
              {projects[key].title}
            </button>
          ))}
        </Reveal>

        {/* Active Project Content */}
        {prefersReducedMotion ? (
          <div className={gridClassName}>{contentGrid}</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className={gridClassName}
              initial={{ opacity: 0, y: 20, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              {contentGrid}
            </motion.div>
          </AnimatePresence>
        )}
      </ScrubSection>
    </div>
  );
}
