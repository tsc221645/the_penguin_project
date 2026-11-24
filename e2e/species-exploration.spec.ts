import { expect, test } from '@playwright/test'

test('searches the species directory', async ({ page }) => {
  await page.goto('/species')
  await expect(page.getByRole('heading', { name: 'Explore species' })).toBeVisible()
  await page.getByRole('searchbox', { name: 'Search species' }).fill('ADÉLIE')
  await expect(page.locator('.species-card')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Adélie penguin' })).toBeVisible()
})

test('compares two species and shows source links', async ({ page }) => {
  await page.goto('/compare')
  await page.getByLabel('First species').selectOption('emperor')
  await page.getByLabel('Second species').selectOption('gentoo')
  await expect(page.getByRole('heading', { name: 'Side by side' })).toBeVisible()
  await expect(page.locator('.compare-table')).toContainText('Conservation')
  await expect(page.locator('.compare-table a').first()).toHaveAttribute('href', /https:\/\//)
})

test('explains the IUCN Red List categories', async ({ page }) => {
  await page.goto('/about')
  await expect(page.getByRole('heading', { name: 'What the IUCN categories mean' })).toBeVisible()
  await expect(page.getByText('Critically Endangered', { exact: true })).toBeVisible()
  await expect(page.getByText(/collectively considered threatened/)).toBeVisible()
})
