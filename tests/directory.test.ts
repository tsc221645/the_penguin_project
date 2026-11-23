import { describe, expect, it } from 'vitest'
import { getSpecies, species } from '../src/lib/content'

describe('species directory', () => {
  it('contains the 18 extant species in the directory', () => {
    expect(species).toHaveLength(18)
    expect(new Set(species.map((item) => item.slug)).size).toBe(18)
  })

  it('can resolve every species by its URL slug', () => {
    for (const item of species) expect(getSpecies(item.slug)?.id).toBe(item.id)
  })

  it('keeps directory-only entries from being treated as published profiles', () => {
    expect(species.filter((item) => item.contentStatus === 'published')).toHaveLength(3)
    expect(species.filter((item) => item.contentStatus === 'directory')).toHaveLength(15)
  })
})
