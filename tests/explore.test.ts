import { describe, expect, it } from 'vitest'
import { species } from '../src/content/species'
import { compareSpecies, filterSpecies, getRandomSpecies, normalizeSearch } from '../src/lib/explore'

describe('species exploration', () => {
  it('normalizes accents, punctuation, and case for search', () => {
    expect(normalizeSearch('  ADÉLIE-PENGUIN ')).toBe('adelie penguin')
    expect(filterSpecies(species, { query: 'adelie' })[0].id).toBe('adelie')
  })

  it('filters by conservation status and region', () => {
    expect(filterSpecies(species, { status: 'Least Concern' }).every((item) => item.conservation.status === 'Least Concern')).toBe(true)
    expect(filterSpecies(species, { region: 'New Zealand' }).map((item) => item.id)).toEqual(['yellow-eyed', 'fiordland'])
  })

  it('returns a deterministic random species when supplied a random function', () => {
    expect(getRandomSpecies(species, () => 0)?.id).toBe('adelie')
    expect(getRandomSpecies(species, () => 0.99)?.id).toBe('erect-crested')
  })

  it('keeps measurements unavailable while comparing reviewed profile fields', () => {
    const rows = compareSpecies(species[0], species.find((item) => item.id === 'king')!)
    expect(rows.find((row) => row.label === 'Height')?.right).toBe('Not available')
    expect(rows.find((row) => row.label === 'Diet')?.right).toBe('Fish, Squid')
  })
})
