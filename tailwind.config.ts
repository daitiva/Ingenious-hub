import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        // System aliases driven by globals.css CSS variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        // Brand palette — narrow + intentional
        ink: "#0E0D0A",
        bone: "#F4F0E8",
        mist: "#0A0C0F",
        hairline: "#E5E2D9",

        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5EEAD4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0D9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        // Counterpoint accent — used sparingly (one section per page)
        rust: {
          400: "#D86B53",
          500: "#C8553D",
          600: "#A8442F",
        },
        marigold: {
          400: "#E7B23E",
          500: "#D89B1F",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      fontSize: {
        // Fluid display + headings
        "d-1": ["clamp(3.2rem, 2rem + 7vw, 8.5rem)", { lineHeight: "0.94", letterSpacing: "-0.045em" }],
        "d-2": ["clamp(2.6rem, 1.8rem + 4.5vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        "h-1": ["clamp(2rem, 1.5rem + 2.5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "h-2": ["clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "h-3": ["clamp(1.2rem, 1.1rem + 0.6vw, 1.5rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        // Body
        "body-lg": ["clamp(1.05rem, 1rem + 0.3vw, 1.15rem)", { lineHeight: "1.6" }],
        "body":    ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55" }],
        // Meta / mono
        "meta":    ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.22em" }],
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "rule-in": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "rule-in": "rule-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
