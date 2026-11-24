import type { HabitatAnchorRecord, OccurrenceRecord } from '../types/content'

// Generalized visual anchors for species habitat context. These are not sightings, colony coordinates, or full ranges.
export const habitatAnchors: HabitatAnchorRecord[] = [
  { id: 'habitat-adelie', speciesId: 'adelie', latitude: -67, longitude: 140, sourceId: 'penguins-list' },
  { id: 'habitat-emperor', speciesId: 'emperor', latitude: -72, longitude: 100, sourceId: 'penguins-list' },
  { id: 'habitat-gentoo', speciesId: 'gentoo', latitude: -64, longitude: -60, sourceId: 'penguins-list' },
  { id: 'habitat-king', speciesId: 'king', latitude: -54, longitude: -37, sourceId: 'penguins-list' },
  { id: 'habitat-chinstrap', speciesId: 'chinstrap', latitude: -62, longitude: -58, sourceId: 'penguins-list' },
  { id: 'habitat-little', speciesId: 'little', latitude: -38, longitude: 145, sourceId: 'penguins-list' },
  { id: 'habitat-galapagos', speciesId: 'galapagos', latitude: 0, longitude: -90, sourceId: 'penguins-list' },
  { id: 'habitat-humboldt', speciesId: 'humboldt', latitude: -12, longitude: -77, sourceId: 'penguins-list' },
  { id: 'habitat-magellanic', speciesId: 'magellanic', latitude: -45, longitude: -68, sourceId: 'penguins-list' },
  { id: 'habitat-african', speciesId: 'african', latitude: -34, longitude: 18, sourceId: 'penguins-list' },
  { id: 'habitat-yellow-eyed', speciesId: 'yellow-eyed', latitude: -45, longitude: 170, sourceId: 'penguins-list' },
  { id: 'habitat-macaroni', speciesId: 'macaroni', latitude: -54, longitude: -36, sourceId: 'penguins-list' },
  { id: 'habitat-royal', speciesId: 'royal', latitude: -54, longitude: 158, sourceId: 'penguins-list' },
  { id: 'habitat-northern-rockhopper', speciesId: 'northern-rockhopper', latitude: -37, longitude: 77, sourceId: 'penguins-list' },
  { id: 'habitat-southern-rockhopper', speciesId: 'southern-rockhopper', latitude: -52, longitude: -59, sourceId: 'penguins-list' },
  { id: 'habitat-fiordland', speciesId: 'fiordland', latitude: -45, longitude: 168, sourceId: 'penguins-list' },
  { id: 'habitat-snares', speciesId: 'snares', latitude: -48, longitude: 166, sourceId: 'penguins-list' },
  { id: 'habitat-erect-crested', speciesId: 'erect-crested', latitude: -48, longitude: 179, sourceId: 'penguins-list' },
]

// These are individual GBIF records, not generalized species ranges.
export const occurrences: OccurrenceRecord[] = [
  { id: 'gbif-adelie-5938063689', speciesId: 'adelie', gbifId: '5938063689', datasetKey: '50c9509d-22c7-4a22-a47d-8c48425ef4a7', recordUrl: 'https://www.gbif.org/occurrence/5938063689', latitude: -65.172662, longitude: -64.136964, uncertaintyMeters: 4, observedAt: '2026-01-05', licenseId: 'CC-BY-4.0', sourceId: 'gbif-occurrences' },
  { id: 'gbif-emperor-6130180695', speciesId: 'emperor', gbifId: '6130180695', datasetKey: '50c9509d-22c7-4a22-a47d-8c48425ef4a7', recordUrl: 'https://www.gbif.org/occurrence/6130180695', latitude: -69.699158, longitude: -69.148366, uncertaintyMeters: 23540, observedAt: '2026-01-09', licenseId: 'CC-BY-4.0', sourceId: 'gbif-occurrences' },
  { id: 'gbif-gentoo-5938311643', speciesId: 'gentoo', gbifId: '5938311643', datasetKey: '50c9509d-22c7-4a22-a47d-8c48425ef4a7', recordUrl: 'https://www.gbif.org/occurrence/5938311643', latitude: -65.17267, longitude: -64.136894, uncertaintyMeters: 4, observedAt: '2026-01-05', licenseId: 'CC-BY-4.0', sourceId: 'gbif-occurrences' },
]
