import type { OccurrenceRecord } from '../types/content'

// These are individual GBIF records, not generalized species ranges.
export const occurrences: OccurrenceRecord[] = [
  { id: 'gbif-adelie-5938063689', speciesId: 'adelie', gbifId: '5938063689', datasetKey: '50c9509d-22c7-4a22-a47d-8c48425ef4a7', recordUrl: 'https://www.gbif.org/occurrence/5938063689', latitude: -65.172662, longitude: -64.136964, uncertaintyMeters: 4, observedAt: '2026-01-05', licenseId: 'CC-BY-4.0', sourceId: 'gbif-occurrences' },
  { id: 'gbif-emperor-6130180695', speciesId: 'emperor', gbifId: '6130180695', datasetKey: '50c9509d-22c7-4a22-a47d-8c48425ef4a7', recordUrl: 'https://www.gbif.org/occurrence/6130180695', latitude: -69.699158, longitude: -69.148366, uncertaintyMeters: 23540, observedAt: '2026-01-09', licenseId: 'CC-BY-4.0', sourceId: 'gbif-occurrences' },
  { id: 'gbif-gentoo-5938311643', speciesId: 'gentoo', gbifId: '5938311643', datasetKey: '50c9509d-22c7-4a22-a47d-8c48425ef4a7', recordUrl: 'https://www.gbif.org/occurrence/5938311643', latitude: -65.17267, longitude: -64.136894, uncertaintyMeters: 4, observedAt: '2026-01-05', licenseId: 'CC-BY-4.0', sourceId: 'gbif-occurrences' },
]
