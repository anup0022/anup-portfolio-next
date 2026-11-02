import type { Config } from "tailwindcss";

/**
 * Colour tokens live in globals.css as space-separated RGB channels
 * (`--sv-ink: 6 8 13`) rather than hex, so Tailwind's `<alpha-value>`
 * modifier resolves. A bare `var(--x)` here silently breaks `bg-x/80`.
 */
const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: channel("sv-ink"),
        ink2: channel("sv-ink-2"),
        ink3: channel("sv-ink-3"),
        ink4: channel("sv-ink-4"),
        accent: channel("sv-accent"),
        accentHot: channel("sv-accent-hot"),
        gold: channel("sv-gold"),
        violet: channel("sv-violet"),
        jade: channel("sv-jade"),
        ember: channel("sv-ember"),
        txt1: channel("sv-text-1"),
        txt2: channel("sv-text-2"),
        txt3: channel("sv-text-3"),
        // Aliases so existing /blog classes keep resolving.
        background: channel("sv-ink"),
        foreground: channel("sv-text-1"),
      },
      fontFamily: {
        display: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "lab-1": "0.18em",
        "lab-2": "0.24em",
        "lab-3": "0.30em",
        "lab-4": "0.42em",
        "tight-display": "-0.03em",
      },
      fontSize: {
        kicker: ["0.625rem", { lineHeight: "1", letterSpacing: "0.30em" }],
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.24em" }],
        meta: ["0.8125rem", { lineHeight: "1.5" }],
        "card-title": ["clamp(1.5rem, 3vw, 2.3rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        section: ["clamp(2.2rem, 5.5vw, 4.2rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        hero: ["clamp(3.2rem, 10vw, 7.5rem)", { lineHeight: "0.88", letterSpacing: "-0.035em" }],
        ghost: ["clamp(7rem, 18vw, 13rem)", { lineHeight: "0.75" }],
      },
      transitionTimingFunction: { sv: "var(--sv-ease)", svIn: "var(--sv-ease-in)" },
      transitionDuration: { "220": "220ms", "420": "420ms", "700": "700ms", "1100": "1100ms" },
      boxShadow: {
        card: "0 12px 40px rgba(0, 0, 0, 0.55)",
        lift: "0 28px 70px -18px rgba(0, 0, 0, 0.8)",
        glow: "0 0 60px rgba(0, 212, 255, 0.30)",
        glowLg: "0 0 110px rgba(0, 212, 255, 0.22)",
      },
      backgroundImage: {
        scrim: "linear-gradient(to top, rgb(var(--sv-ink) / 0.92), rgb(var(--sv-ink) / 0.12) 55%, transparent)",
        scanlines: "repeating-linear-gradient(0deg, rgb(255 255 255 / 0.055) 0 1px, transparent 1px 4px)",
      },
      spacing: { gutter: "var(--sv-gutter)", nav: "var(--sv-nav-h)" },
      zIndex: { art: "1", scrim: "3", copy: "4", nav: "60", grain: "90", curtain: "120", toast: "150" },
      maxWidth: { shell: "88rem" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
