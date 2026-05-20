import type { Config } from "tailwindcss";

/**
 * Design tokens for the editorial light theme.
 *
 * Direction: institutional infrastructure intelligence — calm,
 * readable, generous whitespace. References: Our World in Data,
 * Stripe, Linear, Vercel, Cloudflare Radar. Never dashboard-
 * heavy or cyber-aesthetic.
 *
 * Token families:
 *
 *   surface  — page and card backgrounds. White, near-white,
 *              and a slightly tinted "raised" used for inset
 *              sections that need a calm separation.
 *   ink      — text. Three weights: heading (near-black),
 *              body (slate-700), muted (slate-500). A `subtle`
 *              tone exists for footnotes.
 *   line     — borders. One value: a soft slate. Used sparingly.
 *   accent   — primary blue. The platform's institutional voice.
 *   cyan     — secondary, used for connection lines and hover
 *              transitions on map-like UI.
 *   amber    — the "infrastructure" accent. Reserved for tier-
 *              and confidence indicators; never decorative.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "#FFFFFF",
          subtle: "#F5F7FA",
          raised: "#EEF2F7",
        },
        ink: {
          900: "#0F172A",
          700: "#1E293B",
          500: "#475569",
          300: "#94A3B8",
        },
        line: {
          DEFAULT: "#E2E8F0",
          strong: "#CBD5E1",
        },
        accent: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
        cyan: {
          100: "#CFFAFE",
          400: "#22D3EE",
          500: "#06B6D4",
        },
        amber: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
          600: "#D97706",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        display: ["clamp(2rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        h1: ["clamp(1.875rem, 2.75vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h2: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.005em" }],
      },
      letterSpacing: {
        eyebrow: "0.14em",
      },
      maxWidth: {
        content: "80rem",
        prose: "44rem",
        editorial: "56rem",
      },
      spacing: {
        section: "5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 12px rgba(15, 23, 42, 0.04)",
      },
      borderRadius: {
        card: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
