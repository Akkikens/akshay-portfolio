module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        AAprimary: "#0a0e1a",
        AAsecondary: "#3b82f6",
        MobileNavBarColor: "#1a1f2e",
        ResumeButtonHover: "#2563eb",
        StartupBackground: "#0a0e1a",
        AAtext: "#f8fafc",
        AAsubtext: "#cbd5e1",
        AAborder: "#334155",
        AAhover: "#1e293b",
        AAaccent: "#06b6d4",
        AAwarning: "#f59e0b",
        AAsuccess: "#10b981",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
