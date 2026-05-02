import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        "ink-elevated": "#0c0c0c",
        "ink-soft": "#161616",
        line: "#1f1f1f",
        bone: "#f5f5f5",
        red: {
          DEFAULT: "#B00000",
          bright: "#D00000",
          deep: "#7a0000",
          ember: "#ff2a2a"
        },
        gold: {
          DEFAULT: "#D4AF37",
          warm: "#F5C542",
          deep: "#9d801f"
        }
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Bebas Neue",
          "Oswald",
          "Impact",
          "system-ui",
          "sans-serif"
        ],
        sans: [
          "var(--font-sans)",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif"
        ]
      },
      letterSpacing: {
        widerx: "0.18em"
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(212, 175, 55, 0.35), 0 30px 60px -28px rgba(212, 175, 55, 0.45)",
        ember:
          "0 0 0 1px rgba(208, 0, 0, 0.45), 0 28px 60px -28px rgba(208, 0, 0, 0.6)",
        panel:
          "0 0 0 1px rgba(212, 175, 55, 0.12), 0 30px 80px -40px rgba(0, 0, 0, 0.85)"
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #F5C542 0%, #D4AF37 45%, #9d801f 100%)",
        "red-gradient":
          "linear-gradient(135deg, #D00000 0%, #B00000 50%, #7a0000 100%)",
        "ink-radial":
          "radial-gradient(circle at top left, rgba(208, 0, 0, 0.22), transparent 38%), radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.18), transparent 42%)",
        "stage-glow":
          "radial-gradient(60% 60% at 50% 30%, rgba(208, 0, 0, 0.35) 0%, rgba(208, 0, 0, 0) 65%), radial-gradient(45% 50% at 50% 65%, rgba(212, 175, 55, 0.18) 0%, rgba(0, 0, 0, 0) 70%)"
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
