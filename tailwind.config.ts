import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "var(--brand-bg)",
          surface: "var(--brand-surface)",
          surfaceElevated: "var(--brand-surface-elevated)",
          primary: "var(--brand-primary)",
          primaryHover: "var(--brand-primary-hover)",
          secondary: "var(--brand-secondary)",
          text: "var(--brand-text)",
          muted: "var(--brand-muted)",
          border: "var(--brand-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        resumeSans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        resumeSerif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        resumeMono: ["Menlo", "Consolas", "Courier New", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        card: "0 4px 6px -1px rgba(11, 19, 43, 0.06), 0 2px 4px -2px rgba(11, 19, 43, 0.04)",
        cardElevated: "0 10px 15px -3px rgba(11, 19, 43, 0.08), 0 4px 6px -4px rgba(11, 19, 43, 0.04)",
        mockup: "0 25px 50px -12px rgba(11, 19, 43, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
