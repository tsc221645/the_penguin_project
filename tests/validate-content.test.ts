import { describe, expect, it } from 'vitest'
import { images } from '../src/content/images'
import { sources } from '../src/content/sources'
import { species } from '../src/content/species'
import { habitatAnchors, occurrences } from '../src/content/geography'
import { validateContent } from '../scripts/validate-content'
import { quizQuestions } from '../src/content/quiz'

const validBundle = () => ({ images: structuredClone(images), sources: structuredClone(sources), species: structuredClone(species), occurrences: structuredClone(occurrences), habitatAnchors: structuredClone(habitatAnchors), quizQuestions: structuredClone(quizQuestions) })

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

  it('rejects incomplete comparison measurements', () => {
    const bundle = validBundle()
    const king = bundle.species.find((item) => item.id === 'king')!
    king.heightCm = { ...king.heightCm, min: 0, max: 0 }
    expect(validateContent(bundle)).toContain('Species king has incomplete height comparison data')
  })
})
