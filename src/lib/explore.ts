import type { ConservationStatus, MeasurementRange, SpeciesRecord } from '../types/content'

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

export interface ComparisonRow { label: string; left: string; right: string; sourceIds: string[] }
export interface MultiComparisonRow { label: string; values: string[]; sourceIds: string[] }

const range = (measurement: MeasurementRange) => {
  if (measurement.min === 0 && measurement.max === 0) return 'Not available'
  const value = measurement.min === measurement.max ? `${measurement.min} ${measurement.unit}` : `${measurement.min}–${measurement.max} ${measurement.unit}`
  if (measurement.qualifier === 'about') return `About ${value}`
  if (measurement.qualifier === 'mean adult') return `Mean adult: ${value}`
  return value
}
const list = (items: string[]) => items.length ? items.join(', ') : 'Not available'

export function compareSpeciesMany(items: SpeciesRecord[]): MultiComparisonRow[] {
  const sources = (...ids: string[]) => [...new Set(ids)]
  return [
    { label: 'Height', values: items.map((item) => range(item.heightCm)), sourceIds: sources(...items.flatMap((item) => item.heightCm.sourceIds)) },
    { label: 'Weight', values: items.map((item) => range(item.weightKg)), sourceIds: sources(...items.flatMap((item) => item.weightKg.sourceIds)) },
    { label: 'Habitat', values: items.map((item) => list(item.habitatRegions)), sourceIds: sources(...items.flatMap((item) => item.sourceIds)) },
    { label: 'Diet', values: items.map((item) => list(item.dietItems)), sourceIds: sources(...items.flatMap((item) => item.sourceIds)) },
    { label: 'Breeding', values: items.map((item) => list(item.breeding)), sourceIds: sources(...items.flatMap((item) => item.sourceIds)) },
    { label: 'Conservation', values: items.map((item) => `${item.conservation.status} (${item.conservation.assessmentYear})`), sourceIds: sources(...items.map((item) => item.conservation.sourceId)) },
  ]
}

export function compareSpecies(left: SpeciesRecord, right: SpeciesRecord): ComparisonRow[] {
  return compareSpeciesMany([left, right]).map((row) => ({ label: row.label, left: row.values[0], right: row.values[1], sourceIds: row.sourceIds }))
}
