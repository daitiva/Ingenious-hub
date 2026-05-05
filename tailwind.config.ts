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
      padding: "1.25rem",
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
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
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        ink: "hsl(var(--ink))",
        cream: "hsl(var(--cream))",
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument)", "Georgia", "serif"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.78rem, 0.76rem + 0.1vw, 0.85rem)",
        "fluid-sm": "clamp(0.88rem, 0.84rem + 0.2vw, 0.95rem)",
        "fluid-base": "clamp(1rem, 0.96rem + 0.2vw, 1.05rem)",
        "fluid-lg": "clamp(1.1rem, 1rem + 0.5vw, 1.25rem)",
        "fluid-xl": "clamp(1.3rem, 1.1rem + 1vw, 1.5rem)",
        "fluid-2xl": "clamp(1.6rem, 1.3rem + 1.5vw, 2rem)",
        "fluid-3xl": "clamp(2rem, 1.6rem + 2vw, 2.75rem)",
        "fluid-4xl": "clamp(2.6rem, 2rem + 3vw, 3.75rem)",
        "fluid-5xl": "clamp(3.2rem, 2.4rem + 4vw, 5rem)",
        "fluid-6xl": "clamp(4rem, 3rem + 5vw, 6.5rem)",
        "fluid-7xl": "clamp(4.5rem, 3.5rem + 7vw, 9rem)",
        "fluid-display": "clamp(3rem, 2rem + 8vw, 11rem)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-slow": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-slow": "marquee-slow 60s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
