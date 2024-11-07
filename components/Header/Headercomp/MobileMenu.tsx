import { motion } from "framer-motion";
import { Link } from "react-scroll";

const MobileMenu = ({ setRotate, setShowElement, rotate, ShowElement }) => {
  const closeMenu = () => {
    setRotate(!rotate);
    setShowElement(!ShowElement);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={rotate ? { x: "0" } : { x: "100%" }}
      transition={{ duration: 0.4 }}
      className="w-full fixed h-screen flex md:hidden z-20"
    >
      {/* Backdrop for closing menu */}
      <div
        onClick={closeMenu}
        className="w-1/4 h-full backdrop-blur-sm bg-MobileNavColor/30 cursor-pointer"
      ></div>

      {/* Menu items */}
      <div className="w-3/4 h-full bg-MobileNavBarColor flex flex-col justify-center items-center space-y-8 font-sans">
        {[
          { to: "aboutSection", label: "About", number: "01." },
          {
            to: "WhereIhaveWorkedSection",
            label: "Experience",
            number: "02.",
            offset: -250,
          },
          {
            to: "SomethingIveBuiltSection",
            label: "Work",
            number: "03.",
            offset: 100,
          },
          {
            to: "certificationsSection",
            label: "Certifications",
            number: "04.",
            offset: -50,
          }, // Adjusted offset for mobile
          {
            to: "GetInTouchSection",
            label: "Contact",
            number: "05.",
            offset: 100,
          },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.to}
            spy={true}
            smooth={true}
            offset={item.offset || -50}
            duration={200}
            onClick={closeMenu}
            className="flex flex-col text-center space-y-2 cursor-pointer"
          >
            <span className="text-AAsecondary text-xs font-mono">
              {item.number}
            </span>
            <span className="text-white font-Text2 text-sm sm:text-base hover:text-AAsecondary duration-300">
              {item.label}
            </span>
          </Link>
        ))}
        {/* Resume button */}
        <a href="/resume.pdf" target="_blank" rel="noreferrer">
          <button className="rounded border font-Text2 border-AAsecondary hover:bg-ResumeButtonHover py-2 sm:py-4 px-5 sm:px-10 text-xs text-AAsecondary">
            Resume
          </button>
        </a>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
