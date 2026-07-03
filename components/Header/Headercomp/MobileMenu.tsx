import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MobileMenu = ({ setRotate, setShowElement, rotate, ShowElement }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setRotate(!rotate);
    setShowElement(!ShowElement);
  };

  // While open: Escape closes, focus moves into the dialog and is trapped
  // inside it; on close, focus returns to the hamburger toggle.
  useEffect(() => {
    if (!rotate) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    containerRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const container = containerRef.current;
      if (!container) return;
      const focusables = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === container)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      const toggle = document.getElementById("mobile-menu-button");
      (toggle ?? previouslyFocused)?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotate]);

  return (
    <motion.div
      ref={containerRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!rotate}
      tabIndex={-1}
      initial={{ x: "100%", visibility: "hidden" }}
      animate={
        rotate
          ? { x: "0%", visibility: "visible" }
          : { x: "100%", transitionEnd: { visibility: "hidden" } }
      }
      transition={{ duration: 0.3 }}
      className="w-full fixed h-screen flex md:hidden z-20 outline-none"
    >
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className="w-1/4 h-full backdrop-blur-sm bg-MobileNavColor/30 cursor-pointer"
      ></div>
      <div className="w-3/4 h-full bg-MobileNavBarColor flex flex-col justify-center items-center space-y-8 font-sans">
        {[
          { to: "aboutSection", label: "About", number: "01." },
          {
            to: "WhereIhaveWorkedSection",
            label: "Experience",
            number: "02.",
          },
          {
            to: "SomethingIveBuiltSection",
            label: "Work",
            number: "03.",
          },
          {
            to: "CertificationsSection",
            label: "Certifications",
            number: "04.",
          },
          {
            to: "GetInTouchSection",
            label: "Contact",
            number: "05.",
          },
        ].map((item, index) => (
          <a
            key={index}
            href={`#${item.to}`}
            onClick={closeMenu}
            className="flex flex-col text-center space-y-2 cursor-pointer"
          >
            <span className="text-AAsecondary text-xs font-mono">
              {item.number}
            </span>
            <span className="text-white font-Text2 text-sm sm:text-base hover:text-AAsecondary duration-300">
              {item.label}
            </span>
          </a>
        ))}
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
