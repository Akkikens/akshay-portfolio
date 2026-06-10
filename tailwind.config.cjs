const defaultTheme = require("tailwindcss/defaultTheme");

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
        AAcard: "#0f1526",
        AAaccent: "#22d3ee",
        AAwarning: "#f59e0b",
        AAsuccess: "#10b981",
        AApurple: "#8b5cf6",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        Header: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      letterSpacing: {
        hero: "-0.03em",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
