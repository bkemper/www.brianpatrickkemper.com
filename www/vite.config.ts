import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tanstackStart({
      prerender: {
        // Emit /not-found as not-found.html (Amplify custom-404 target), not not-found/index.html.
        autoSubfolderIndex: false,
        crawlLinks: false,
        enabled: true,
        failOnError: true,
      },
    }),
    viteReact(),
    tailwindcss(),
  ],
});