import React from "react";
import { useRef, useState, useEffect } from "react";
import Logo from "./Headercomp/Logo";
import DesktopMenu from "./Headercomp/DesktopMenu";
import IconMenu from "./Headercomp/IconMenu";
import MobileMenu from "./Headercomp/MobileMenu";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const Header = (props: { finishedLoading: boolean; sectionsRef }) => {
  const RefNavBar = useRef<HTMLDivElement>(null);
  const [ShowElement, setShowElement] = useState(false);
  const [rotate, setRotate] = useState<boolean>(false);
  const { scrollY } = useScroll();

  // Apple-nav behavior: transparent at the top, gains bg + shadow past ~40px
  // in both scroll directions.
  useMotionValueEvent(scrollY, "change", (v) => {
    setShowElement(v > 40);
  });

  // Scroll lock for mobile menu — the viewport scrolls (not body), so lock
  // documentElement and pause Lenis so wheel momentum can't fight the lock.
  useEffect(() => {
    if (typeof document === "undefined") return;

    document.documentElement.style.overflow = rotate ? "hidden" : "";
    if (rotate) {
      window.__lenis?.stop();
    } else {
      window.__lenis?.start();
    }

    // Cleanup: ensure scroll is restored when component unmounts
    return () => {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
    };
  }, [rotate]);

  return (
    <>
      <MobileMenu
        rotate={rotate}
        setRotate={setRotate}
        setShowElement={setShowElement}
        ShowElement={ShowElement}
      />
      <motion.div
        ref={RefNavBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // changed from 10.4 to 1
        transition={{
          opacity: { delay: props.finishedLoading ? 0 : 4.4, duration: 0 },
        }}
        className={`w-full fixed ${
          ShowElement ? `bg-opacity-70 shadow-xl` : `bg-opacity-0 `
        } bg-AAprimary flex 
      justify-between px-6 sm:px-12 py-2 sm:py-4 transition-[background-color,box-shadow] duration-300 translate-y-0 z-20`}
      >
        <Logo finishedLoading={props.finishedLoading} />
        <IconMenu
          rotate={rotate}
          setRotate={setRotate}
          setShowElement={setShowElement}
          ShowElement={ShowElement}
          finishedLoading={props.finishedLoading}
        />
        <DesktopMenu finishedLoading={props.finishedLoading} />
      </motion.div>
    </>
  );
};

export default Header;
