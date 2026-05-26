import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fadeSlideIn: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        bounceCheck: {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.4) rotate(5deg)" },
          "50%": { transform: "scale(0.9) rotate(-3deg)" },
          "70%": { transform: "scale(1.15) rotate(2deg)" },
          "100%": { transform: "scale(1.1) rotate(0deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-2deg)" },
          "75%": { transform: "rotate(2deg)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeSlideIn: "fadeSlideIn 0.6s ease forwards",
        shimmer: "shimmer 2s infinite",
        bounceCheck: "bounceCheck 0.5s ease",
        float: "float 3s ease-in-out infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        scaleIn: "scaleIn 0.5s ease forwards",
        slideUp: "slideUp 0.6s ease forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
