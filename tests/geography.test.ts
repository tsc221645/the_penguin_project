import { describe, expect, it } from 'vitest'
import { habitatAnchors, occurrences } from '../src/content/geography'
import { sources } from '../src/content/sources'
import { species } from '../src/content/species'

describe('habitat occurrence data', () => {
  it('contains reviewed launch-species observations with traceable GBIF records', () => {
    expect(occurrences).toHaveLength(3)
    expect(occurrences.every((item) => item.recordUrl.startsWith('https://www.gbif.org/occurrence/'))).toBe(true)
    expect(occurrences.every((item) => item.licenseId === 'CC-BY-4.0')).toBe(true)
  })

  it('preserves uncertainty instead of implying false precision', () => {
    expect(occurrences.find((item) => item.speciesId === 'emperor')?.uncertaintyMeters).toBe(23540)
  })

  it('keeps generalized habitat coverage for all 18 species', () => {
    expect(species).toHaveLength(18)
    expect(habitatAnchors).toHaveLength(18)
    expect(new Set(habitatAnchors.map((item) => item.speciesId)).size).toBe(18)
    expect(species.every((item) => item.habitatRegions.length > 0)).toBe(true)
    expect(sources.find((source) => source.id === 'natural-earth-land')?.licenseNotes).toContain('public domain')
  })
})
