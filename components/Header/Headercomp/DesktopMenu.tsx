import React from "react";
import { motion } from "framer-motion";
import { Link as ReactScrollLink } from "react-scroll";

export default function DesktopMenu(props: { finishedLoading: boolean }) {
  return (
    <div className="font-mono text-xs md:flex hidden flex-row items-center space-x-8 ">
      {[
        { to: "aboutSection", label: "About", number: "01.", delay: 0 },
        {
          to: "WhereIhaveWorkedSection",
          label: "Experience",
          number: "02.",
          delay: 0.3,
        },
        {
          to: "CertificationsSection",
          label: "Certifications",
          number: "03.",
          delay: 0.4,
        },
        {
          to: "SomethingIveBuiltSection",
          label: "Work",
          number: "04.",
          delay: 0.5,
        },
        {
          to: "GetInTouchSection",
          label: "Contact",
          number: "05.",
          delay: 0.6,
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 1.2,
            delay: props.finishedLoading ? 0 : item.delay,
          }}
          className="text-AAsecondary"
        >
          <ReactScrollLink
            to={item.to}
            spy={true}
            smooth={true}
            offset={-100}
            duration={200}
          >
            &gt; {item.number}{" "}
            <span className="text-white hover:cursor-pointer hover:text-AAsecondary duration-300">
              {item.label}
            </span>
          </ReactScrollLink>
        </motion.div>
      ))}
      <a href={"/resume.pdf"} target={"_blank"} rel="noreferrer">
        <motion.button
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 1.2,
            delay: props.finishedLoading ? 0 : 0.7,
          }}
          className="text-AAsecondary border border-spacing-2 py-2 px-3 rounded-sm border-AAsecondary hover:bg-ResumeButtonHover"
        >
          Resume
        </motion.button>
      </a>
    </div>
  );
}
