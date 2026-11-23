import type { ImageRecord } from '../types/content'

// Externally hosted, individually reviewed Wikimedia Commons files. No third-party photographs are bundled.
export const images: ImageRecord[] = [
  {
    id: 'adelie-hero', speciesId: 'adelie', categories: ['hero', 'portrait'], externalProvider: 'Wikimedia Commons',
    approvedImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Researching_Ad%C3%A9lie_penguin_JARE_01.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Researching_Ad%C3%A9lie_penguin_JARE_01.jpg/640px-Researching_Ad%C3%A9lie_penguin_JARE_01.jpg',
    title: 'Researching Adélie penguin JARE 01', author: '秋本周', originalFileUrl: 'https://commons.wikimedia.org/wiki/File:Researching_Ad%C3%A9lie_penguin_JARE_01.jpg',
    licenseId: 'CC-BY-4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', attributionText: 'Researching Adélie penguin JARE 01 — 秋本周 — Wikimedia Commons — CC BY 4.0',
    modifications: [], verifiedAt: '2026-11-23', reviewStatus: 'approved', alt: 'An Adélie penguin near a Japanese Antarctic research expedition member on Antarctic sea ice',
  },
  {
    id: 'emperor-hero', speciesId: 'emperor', categories: ['hero', 'portrait'], externalProvider: 'Wikimedia Commons',
    approvedImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Emperor_Penguin.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Emperor_Penguin.jpg/960px-Emperor_Penguin.jpg',
    title: 'Emperor Penguin', author: 'Pavan Nair', originalFileUrl: 'https://commons.wikimedia.org/wiki/File:Emperor_Penguin.jpg',
    licenseId: 'CC-BY-SA-4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', attributionText: 'Emperor Penguin — Pavan Nair — Wikimedia Commons — CC BY-SA 4.0',
    modifications: [], verifiedAt: '2026-11-23', reviewStatus: 'approved', alt: 'An emperor penguin standing in Antarctica near the Dakshin Gangotri construction site',
  },
  {
    id: 'gentoo-hero', speciesId: 'gentoo', categories: ['hero', 'portrait'], externalProvider: 'Wikimedia Commons',
    approvedImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/00_0395_Gentoo_penguins_in_Antarctica.jpg',
    thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/00_0395_Gentoo_penguins_in_Antarctica.jpg/960px-00_0395_Gentoo_penguins_in_Antarctica.jpg',
    title: 'Gentoo penguins in Antarctica', author: 'W. Bulach', originalFileUrl: 'https://commons.wikimedia.org/wiki/File:00_0395_Gentoo_penguins_in_Antarctica.jpg',
    licenseId: 'CC-BY-SA-4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', attributionText: 'Gentoo penguins in Antarctica — W. Bulach — Wikimedia Commons — CC BY-SA 4.0',
    modifications: [], verifiedAt: '2026-11-23', reviewStatus: 'approved', alt: 'Gentoo penguins gathered near nests on King George Island in Antarctica',
  },
]
