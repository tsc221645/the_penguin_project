import { describe, expect, it } from 'vitest'
import { occurrences } from '../src/content/geography'

describe('habitat occurrence data', () => {
  it('contains reviewed launch-species observations with traceable GBIF records', () => {
    expect(occurrences).toHaveLength(3)
    expect(occurrences.every((item) => item.recordUrl.startsWith('https://www.gbif.org/occurrence/'))).toBe(true)
    expect(occurrences.every((item) => item.licenseId === 'CC-BY-4.0')).toBe(true)
  })

  it('preserves uncertainty instead of implying false precision', () => {
    expect(occurrences.find((item) => item.speciesId === 'emperor')?.uncertaintyMeters).toBe(23540)
  })
})
