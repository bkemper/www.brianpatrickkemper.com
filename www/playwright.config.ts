import { defineConfig, devices } from "@playwright/test";

const staticPreviewOrigin = "http://127.0.0.1:4173";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: staticPreviewOrigin,
    javaScriptEnabled: false,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm build && pnpm static-preview",
    url: staticPreviewOrigin,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
