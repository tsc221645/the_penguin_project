import { describe, expect, it } from 'vitest'
import { router } from '../src/router'

describe('site routes', () => {
  it.each(['/','/species','/species/adelie','/compare','/habitats','/quiz','/about','/credits'])('defines the %s route', (path) => {
    expect(router.resolve(path).matched.length).toBeGreaterThan(0)
  })

  it('starts new routes at the top and restores browser history positions', () => {
    expect(router.options.scrollBehavior?.({} as never, {} as never, null)).toEqual({ top: 0, left: 0 })
    const savedPosition = { top: 420, left: 0 }
    expect(router.options.scrollBehavior?.({} as never, {} as never, savedPosition)).toEqual(savedPosition)
  })
})
