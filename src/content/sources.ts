import type { SourceRecord } from '../types/content'

export const sources: SourceRecord[] = [
  { id: 'birdlife-adelie', organizationOrAuthor: 'BirdLife International', title: 'Adélie Penguin species factsheet', url: 'https://datazone.birdlife.org/species/factsheet/adelie-penguin-pygoscelis-adeliae', accessedAt: '2026-11-23', sourceType: 'Conservation factsheet' },
  { id: 'birdlife-emperor', organizationOrAuthor: 'BirdLife International', title: 'Emperor Penguin species factsheet', url: 'https://datazone.birdlife.org/species/factsheet/emperor-penguin-aptenodytes-forsteri', accessedAt: '2026-11-23', sourceType: 'Conservation factsheet' },
  { id: 'birdlife-gentoo', organizationOrAuthor: 'BirdLife International', title: 'Gentoo Penguin species factsheet', url: 'https://datazone.birdlife.org/species/factsheet/gentoo-penguin-pygoscelis-papua', accessedAt: '2026-11-23', sourceType: 'Conservation factsheet' },
  { id: 'penguin-world', organizationOrAuthor: 'Antarctica.gov.au', title: 'Penguin species and adaptations', url: 'https://www.antarctica.gov.au/about-antarctica/animals/penguins/', accessedAt: '2026-11-23', sourceType: 'Educational reference' },
]
