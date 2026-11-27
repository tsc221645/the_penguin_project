import { expect, test } from '@playwright/test'

test('searches the species directory', async ({ page }) => {
  await page.goto('./species')
  await expect(page.getByRole('heading', { name: 'Explore species' })).toBeVisible()
  await page.getByRole('searchbox', { name: 'Search species' }).fill('ADÉLIE')
  await expect(page.locator('.species-card')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Adélie penguin' })).toBeVisible()
})

test('cycles through all featured species on the home hero', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByText('01 / 18', { exact: true })).toBeVisible()
  const image = page.locator('.hero-carousel-image')
  const firstSource = await image.getAttribute('src')
  await page.getByRole('button', { name: 'Next featured species' }).click()
  await expect(page.getByText('02 / 18', { exact: true })).toBeVisible()
  await expect(image).not.toHaveAttribute('src', firstSource ?? '')
})

test('cycles through the Adélie image carousel', async ({ page }) => {
  await page.goto('./species/adelie')
  const image = page.locator('.carousel-stage img')
  const firstSource = await image.getAttribute('src')
  await page.getByRole('button', { name: 'Next image' }).click()
  await expect(image).not.toHaveAttribute('src', firstSource ?? '')
})

test('compares up to five species and collects sources at the bottom', async ({ page }) => {
  await page.goto('./compare')
  await page.getByLabel('Second species').selectOption('gentoo')
  await page.getByLabel('First species').selectOption('emperor')
  for (let index = 0; index < 3; index += 1) {
    await page.getByRole('button', { name: 'Add another species' }).click()
  }
  await expect(page.getByRole('heading', { name: 'Side by side' })).toBeVisible()
  await expect(page.locator('.compare-table')).toContainText('Conservation')
  await expect(page.locator('.compare-species-card')).toHaveCount(5)
  await expect(page.locator('.compare-size-item')).toHaveCount(5)
  await expect(page.locator('.compare-scale-section model-viewer')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Add another species' })).toHaveCount(0)
  await expect(page.locator('.compare-table a')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Sources & review.' })).toBeVisible()
  await expect(page.locator('.compare-sources a').first()).toHaveAttribute('href', /https:\/\//)
})

test('explains the IUCN Red List categories', async ({ page }) => {
  await page.goto('./about')
  await expect(page.getByRole('heading', { name: 'What the IUCN categories mean' })).toBeVisible()
  await expect(page.getByText('Critically Endangered', { exact: true })).toBeVisible()
  await expect(page.getByText(/collectively considered threatened/)).toBeVisible()
})

test('shows habitat observations with an accessible region fallback', async ({ page }) => {
  await page.goto('./habitats')
  await expect(page.getByRole('heading', { name: 'Where penguins live' })).toBeVisible()
  await expect(page.locator('.habitat-map')).toBeVisible()
  await expect(page.getByLabel('Species').locator('option')).toHaveCount(19)
  await expect(page.getByRole('heading', { name: 'All 18 species' })).toBeVisible()
  await expect(page.getByText(/individual GBIF observations/)).toBeVisible()
  await expect(page.getByRole('link', { name: /GBIF occurrence source/ })).toHaveAttribute('href', /gbif.org/)
})

test('answers a sourced quiz question', async ({ page }) => {
  await page.goto('./quiz')
  await expect(page.getByRole('heading', { name: 'Test your penguin knowledge' })).toBeVisible()
  await page.locator('.quiz-options button').first().click()
  await expect(page.getByRole('status')).toContainText(/Correct!|Not quite\./)
  await expect(page.getByRole('status').locator('.source-list')).toBeVisible()
})

test('shows a species-specific habitat map on a profile', async ({ page }) => {
  await page.goto('./species/king')
  await expect(page.getByRole('heading', { name: 'Where to find King penguin' })).toBeVisible()
  await expect(page.locator('.profile-habitat .habitat-map')).toBeVisible()
  await expect(page.locator('.profile-region-list')).toContainText('Subantarctic islands')
})

test('shows the Adélie 3D model preview in compare', async ({ page }) => {
  await page.goto('./compare')
  await expect(page.locator('.compare-scale-section')).toBeVisible()
  const modelSource = await page.locator('.compare-scale-section model-viewer').evaluate((element) => (element as HTMLElement & { src?: string }).src ?? element.getAttribute('src') ?? '')
  expect(modelSource).toMatch(/adelie-[^/]+\.glb/)
})
