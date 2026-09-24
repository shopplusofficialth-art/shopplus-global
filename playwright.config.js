// ShopPlus Global — Module 2 Homework 4 — Tester agent
// Playwright config for E2E tests against the real deployed site
// (https://shopplus-global.web.app) per spec.md. Test accounts are read
// from `.env.test` (see .env.test.example) — NEVER hardcode credentials
// here or in any test file.

import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  // Tests share live Firestore data (real deployed site, not an emulator)
  // and some tests depend on data created by earlier tests within the
  // same file — force fully serial execution, one worker, no retries
  // that could race writes against each other.
  workers: 1,
  retries: 0,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/e2e.json" }],
  ],
  use: {
    baseURL: process.env.BASE_URL || "https://shopplus-global.web.app",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
