// tailwind.config.cjs (Tailwind v3)
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        AAprimary: "#0b192f",
        AAsecondary: "#64ffda",
        MobileNavBarColor: "#112340",
        ResumeButtonHover: "#153040",
        StartupBackground: "#020c1b",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  // only if you create class names dynamically like `bg-${color}`
  // safelist: ["bg-AAprimary","bg-AAsecondary","bg-MobileNavBarColor","bg-ResumeButtonHover","bg-StartupBackground"],
};
