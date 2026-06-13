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
        charcoal: {
          DEFAULT: "#0B0F17",
          light: "#141B27",
        },
        army: {
          DEFAULT: "#1A4D2E",
          light: "#2D7A4A",
          dark: "#123D24",
        },
        gold: {
          DEFAULT: "#D4AF37",
          muted: "#C4A032",
          light: "#E8C96A",
        },
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 0, 0, 0.25)",
        card: "0 8px 32px rgba(0, 0, 0, 0.35)",
        "glow-gold": "0 0 24px rgba(212, 175, 55, 0.22), 0 8px 32px rgba(0, 0, 0, 0.3)",
        "glow-gold-sm": "0 0 16px rgba(212, 175, 55, 0.18)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
