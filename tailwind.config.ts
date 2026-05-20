import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          50: "#f6f7f9",
          100: "#e7eaef",
          200: "#c7ccd6",
          300: "#9aa1ae",
          400: "#6b7280",
          500: "#4b5563",
          600: "#374151",
          700: "#1f2937",
          800: "#141a24",
          900: "#0a0e15",
          950: "#05080d",
        },
        signal: {
          blue: {
            50: "#eaf2ff",
            100: "#cfe0ff",
            200: "#a5c4ff",
            300: "#6ea0ff",
            400: "#3d7df0",
            500: "#1f5fd0",
            600: "#1747a3",
            700: "#133a82",
            800: "#102e66",
            900: "#0c2350",
          },
          orange: {
            400: "#ff9f43",
            500: "#f5832a",
            600: "#d96a1a",
          },
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
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        eyebrow: "0.16em",
      },
      maxWidth: {
        content: "76rem",
        prose: "44rem",
      },
    },
  },
  plugins: [],
};

export default config;
