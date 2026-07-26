import React from "react";
import { motion } from "framer-motion";

const IconMenu = (props: {
  rotate;
  setRotate;
  setShowElement;
  ShowElement;
  finishedLoading;
}) => {
  return (
    <button
      type="button"
      id="mobile-menu-button"
      aria-label={props.rotate ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={props.rotate}
      aria-controls="mobile-menu"
      className="md:hidden text-white space-y-2 left-0 hover:cursor-pointer mt-2 outline-none focus-visible:ring-2 focus-visible:ring-AAaccent/60 rounded"
      onClick={() => {
        props.setRotate(!props.rotate);
        props.setShowElement(!props.ShowElement);
      }}
    >
      <div className="flex justify-end">
        <motion.div
          animate={props.rotate ? { y: 10, rotate: 45 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-8 h-0.5 rounded bg-AAsecondary"
        ></motion.div>
      </div>
      <motion.div
        animate={props.rotate ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-end"
      >
        <div className="w-6 h-0.5 rounded bg-AAsecondary"></div>
      </motion.div>
      <div className="flex justify-end">
        <motion.div
          animate={
            props.rotate
              ? { y: -10, width: "150%", rotate: -45 }
              : { y: 0, rotate: 0, width: "50%" }
          }
          transition={{ duration: 0.3 }}
          className="w-4 h-0.5 rounded bg-AAsecondary"
        ></motion.div>
      </div>
    </button>
  );
};

export default IconMenu;
