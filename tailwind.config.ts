import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0A2342",
        ocean: "#0E6BA8",
        skysoft: "#EAF6FF",
        mint: "#D9FFF5",
        gold: "#F6B73C"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(10,35,66,0.12)",
      }
    },
  },
  plugins: [],
};

export default config;
