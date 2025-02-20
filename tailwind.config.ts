import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["selector", `[data-color-scheme="dark"]`],
  theme: {
    extend: {
      colors: {
        // note, why hsl? https://www.youtube.com/watch?v=EJtmfkKulNA
        day: "hsl(220 100% 98%)",
        gray: "hsl(231 10% 45%)",
        muted: "hsl(231 10% 75%)",
        night: "hsl(220 46% 16%)",
      },
      fontFamily: {
        mono: ["var(--font-lato)"],
        sans: ["var(--font-lato)"],
        sign: ["var(--font-caveat)"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        puff: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
