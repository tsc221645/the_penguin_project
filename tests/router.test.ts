import { describe, expect, it } from 'vitest'
import { router } from '../src/router'

describe('site routes', () => {
  it.each(['/','/species','/species/adelie','/about','/credits'])('defines the %s route', (path) => {
    expect(router.resolve(path).matched.length).toBeGreaterThan(0)
  })
})
