module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        AAprimary: "#0a0e1a",
        AAsecondary: "#06b6d4",
        MobileNavBarColor: "#1a1f2e",
        ResumeButtonHover: "#0891b2",
        StartupBackground: "#0a0e1a",
        AAtext: "#f8fafc",
        AAsubtext: "#cbd5e1",
        AAborder: "#334155",
        AAhover: "#1e293b",
        AAaccent: "#22d3ee",
        AAwarning: "#f59e0b",
        AAsuccess: "#10b981",
        AApurple: "#8b5cf6",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
