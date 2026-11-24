import { defineConfig, devices } from '@playwright/test'

const basePath = process.env.PLAYWRIGHT_BASE_PATH ?? '/'
const previewURL = `http://127.0.0.1:4173${basePath}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL ?? previewURL, trace: 'on-first-retry', ...devices['Desktop Chrome'] },
  webServer: { command: `npm run preview -- --host 127.0.0.1 --base ${basePath}`, url: previewURL, reuseExistingServer: !process.env.CI },
})
