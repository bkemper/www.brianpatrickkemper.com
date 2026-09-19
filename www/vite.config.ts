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
        // Emit /404 as 404.html (Amplify custom-404 target), not 404/index.html.
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