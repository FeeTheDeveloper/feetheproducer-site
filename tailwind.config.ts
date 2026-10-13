import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        "ink-elevated": "#151513",
        bone: "#f2eee5",
        gold: { DEFAULT: "rgb(var(--gold-rgb) / <alpha-value>)" },
        red: { DEFAULT: "#cc7666", ember: "#f2a492" },
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      letterSpacing: { widerx: "0.16em" },
    },
  },
  plugins: [],
};
export default config;
