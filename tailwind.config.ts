import { sign } from "crypto";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", `[data-color-scheme="dark"]`],
  theme: {
    extend: {
      colors: {
        day: "hsl(220 100% 98%)",
        muted: "hsl(231 10% 75%)",
        night: "hsl(220 46% 16%)",
      },
      fontFamily: {
        mono: ["var(--font-lato)"],
        sans: ["var(--font-lato)"],
        sign: ["var(--font-caveat)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
