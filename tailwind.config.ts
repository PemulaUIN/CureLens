import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      colors: {
        safety: {
          safe: "#10b981",      // Hijau Emerald
          warning: "#f59e0b",   // Kuning Amber
          danger: "#ef4444",    // Merah Koral
        },
      },
    },
  },
  plugins: [],
};
export default config;