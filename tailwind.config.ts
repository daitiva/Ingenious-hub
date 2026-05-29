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

        // Brand palette — narrow and on-logo.
        // bone now means "the light surface" → pure white. Kept as alias
        // so legacy `bg-bone` references render against the new white system.
        bone: "#FFFFFF",
        // Ink is the deep warm slab colour used for Proof + Impact + final CTA.
        // Sits in graphite territory: dark enough for tonal contrast against
        // the white surface, warm enough to feel editorial.
        ink: "#1B1916",
        "ink-soft": "#272421",
        mist: "#1B1916",
        hairline: "#E5E7EB",

        // Teal scale — 300 and 600 are EXACT logo gradient endpoints.
        // Both bookends of the wordmark gradient now live as utility
        // tokens, so `from-teal-300 to-teal-600` reproduces the mark.
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#81D5D3",   // ← logo gradient: light bookend
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#009E8B",   // ← logo gradient: deep bookend
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        // Brand grey — single warm-neutral counterpoint, replacing rust.
        // 500 is the exact wordmark grey ("hub" + tagline in logo.svg).
        grey: {
          50: "#F8F9FA",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#636363",   // ← logo grey
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        // Convenience aliases that map to the brand triad — used in
        // gradient utilities and where readability beats abstraction.
        brand: {
          mint: "#81D5D3",
          teal: "#009E8B",
          grey: "#636363",
        },
      },
      backgroundImage: {
        // Logo wordmark gradient — light → deep teal, 135deg.
        // The single source of truth for every gradient surface on the site.
        "gradient-brand":
          "linear-gradient(135deg, #81D5D3 0%, #009E8B 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
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
