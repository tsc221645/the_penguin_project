import { describe, expect, it } from 'vitest'
import { images } from '../src/content/images'
import { sources } from '../src/content/sources'
import { species } from '../src/content/species'
import { validateContent } from '../scripts/validate-content'

const validBundle = () => ({ images: structuredClone(images), sources: structuredClone(sources), species: structuredClone(species) })

describe('validateContent', () => {
  it('accepts the published content bundle', () => {
    expect(validateContent(validBundle())).toEqual([])
  })

  it('rejects an image that is not approved', () => {
    const bundle = validBundle()
    bundle.images[0].reviewStatus = 'pending'
    expect(validateContent(bundle)).toContain('Image adelie-hero is not approved')
  })

  it('rejects broken image and source references', () => {
    const bundle = validBundle()
    bundle.species[0].heroImageId = 'missing-image'
    bundle.species[0].sourceIds = ['missing-source']
    expect(validateContent(bundle)).toEqual(expect.arrayContaining([
      'Species adelie references missing hero image',
      'Species adelie references missing source missing-source',
    ]))
  })

  it('rejects unsupported licenses and missing alt text', () => {
    const bundle = validBundle()
    bundle.images[0].licenseId = 'ALL-RIGHTS-RESERVED'
    bundle.images[0].alt = ''
    expect(validateContent(bundle)).toEqual(expect.arrayContaining([
      'Image adelie-hero is missing alt',
      'Image adelie-hero has unsupported license ALL-RIGHTS-RESERVED',
    ]))
  })
})
