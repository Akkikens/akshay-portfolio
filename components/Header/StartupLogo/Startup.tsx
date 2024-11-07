import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Import the Image component if you want Next.js image optimization

const Startup = () => {
  let WidthBy2 = 0;
  let HeightBy2 = 0;
  let greaterThanSmall = false;

  if (typeof window !== "undefined") {
    if (window.innerWidth > 768) {
      WidthBy2 = window.innerWidth / 2 - 48 - 20;
      HeightBy2 = window.innerHeight / 2 - 44;
      greaterThanSmall = true;
    } else {
      WidthBy2 = window.innerWidth / 2 - 28;
      HeightBy2 = window.innerHeight / 2 - 40;
    }

    console.log("width by 2: ", WidthBy2);
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ opacity: { delay: 4.9, duration: 0 } }}
      className="absolute h-full w-full flex justify-center items-center bg-StartupBackground"
    >
      <motion.div
        initial={{ opacity: 0, x: 0, y: 0, scale: "100%" }}
        animate={{
          opacity: [1, 0, 1],
          x: -WidthBy2,
          y: -HeightBy2,
          scale: greaterThanSmall ? "57%" : "50%",
        }}
        transition={{
          opacity: { delay: 3, duration: 0.5 },
          x: { duration: 0.5, delay: 0.5 },
          y: { duration: 0.5, delay: 0.5 },
          scale: { duration: 0.5, delay: 0.5 },
        }}
        className="relative h-24 w-24 flex justify-center items-center"
      >
        {/* Animated Lines */}
        <motion.div
          initial={{ scale: 0, x: 0 }}
          animate={{ scale: 1, rotate: 90, x: 38 }}
          transition={{
            scale: { duration: 1.5 },
            rotate: { delay: 0.5, duration: 0.5 },
            x: { delay: 0.8, duration: 1 },
          }}
          className="absolute h-2 w-12 bg-AAsecondary rounded"
        ></motion.div>
        {/* Add other animated lines here as in the original code... */}

        {/* Logo Image */}
        <motion.div
          initial={{ scale: 0, y: -4, x: -1 }}
          animate={{ scale: 1 }}
          transition={{ scale: { delay: 1.5, duration: 1.5 } }}
          className="flex justify-center items-center"
        >
          <Image
            src="/logo.png" // Use your actual logo path here
            alt="Startup Logo"
            width={80} // Adjust width as needed
            height={80} // Adjust height as needed
            className="rounded-full" // Optional styling
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Startup;
