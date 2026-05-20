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
        // Editorial scale. Hero / display / h1 / h2 are clamped so
        // they scale calmly between phone and desktop. `lead` is the
        // intro-paragraph utility used after every page H1.
        hero: ["clamp(2.25rem, 4.6vw, 3.75rem)", { lineHeight: "1.06", letterSpacing: "-0.022em" }],
        display: ["clamp(1.875rem, 3.4vw, 2.625rem)", { lineHeight: "1.1", letterSpacing: "-0.018em" }],
        h1: ["clamp(1.625rem, 2.6vw, 2.125rem)", { lineHeight: "1.15", letterSpacing: "-0.012em" }],
        h2: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.008em" }],
        h3: ["1.0625rem", { lineHeight: "1.4", letterSpacing: "-0.004em" }],
        lead: ["clamp(1.0625rem, 1.4vw, 1.1875rem)", { lineHeight: "1.65" }],
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      letterSpacing: {
        eyebrow: "0.16em",
      },
      maxWidth: {
        content: "80rem",
        prose: "42rem",
        editorial: "56rem",
      },
      spacing: {
        // Section rhythm: ~4rem on phones, ~7rem on desktop. Used
        // as `py-section-y` on every major homepage / route block
        // so the page breathes consistently.
        "section-y": "clamp(3.5rem, 8vw, 7rem)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.03)",
        "card-hover": "0 1px 2px rgba(15, 23, 42, 0.04), 0 6px 20px -8px rgba(15, 23, 42, 0.08)",
        focus: "0 0 0 3px rgba(59, 130, 246, 0.22)",
      },
      borderRadius: {
        card: "0.875rem",
      },
    },
  },
  plugins: [],
};

export default config;
