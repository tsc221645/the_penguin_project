import type { ConservationStatus, SpeciesRecord } from '../types/content'

export const normalizeSearch = (value: string): string => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

export interface SpeciesFilters { query?: string; status?: ConservationStatus | ''; region?: string }

export function filterSpecies(items: SpeciesRecord[], filters: SpeciesFilters): SpeciesRecord[] {
  const query = normalizeSearch(filters.query ?? '')
  return items.filter((item) => {
    const searchable = normalizeSearch(`${item.commonName} ${item.scientificName}`)
    const matchesQuery = !query || searchable.includes(query)
    const matchesStatus = !filters.status || item.conservation.status === filters.status
    const matchesRegion = !filters.region || item.habitatRegions.includes(filters.region)
    return matchesQuery && matchesStatus && matchesRegion
  })
}

export const getRegions = (items: SpeciesRecord[]) => [...new Set(items.flatMap((item) => item.habitatRegions))].sort()
export const getRandomSpecies = (items: SpeciesRecord[], random = Math.random) => items[Math.floor(random() * items.length)]

export interface ComparisonRow { label: string; left: string; right: string }

const range = (min: number, max: number, unit: string) => min === 0 && max === 0 ? 'Not available' : `${min}–${max} ${unit}`
const list = (items: string[]) => items.length ? items.join(', ') : 'Not available'

export function compareSpecies(left: SpeciesRecord, right: SpeciesRecord): ComparisonRow[] {
  return [
    { label: 'Height', left: range(left.heightCm.min, left.heightCm.max, left.heightCm.unit), right: range(right.heightCm.min, right.heightCm.max, right.heightCm.unit) },
    { label: 'Weight', left: range(left.weightKg.min, left.weightKg.max, left.weightKg.unit), right: range(right.weightKg.min, right.weightKg.max, right.weightKg.unit) },
    { label: 'Habitat', left: list(left.habitatRegions), right: list(right.habitatRegions) },
    { label: 'Diet', left: list(left.dietItems), right: list(right.dietItems) },
    { label: 'Breeding', left: list(left.breeding), right: list(right.breeding) },
    { label: 'Conservation', left: `${left.conservation.status} (${left.conservation.assessmentYear})`, right: `${right.conservation.status} (${right.conservation.assessmentYear})` },
  ]
}
