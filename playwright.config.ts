import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  outputDir: "test-results/playwright",
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3100",
    browserName: "chromium",
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
  },
  webServer: {
    // Next normalizes loopback URLs to localhost; matching the listener avoids
    // network self-proxy loops in Clerk's middleware rewrite (Next issue #94745).
    command: "npm run start -- --hostname localhost --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
