import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HomePage from '../src/pages/HomePage.vue'
import { species } from '../src/content/species'

describe('HomePage', () => {
  it('presents the complete 18-species collection', () => {
    const wrapper = mount(HomePage, { global: { stubs: { RouterLink: { template: '<a><slot /></a>' }, SpeciesCard: { template: '<article class="species-card" />' } } } })

    expect(wrapper.get('h2').text()).toContain('18 species')
    expect(wrapper.findAll('.species-card')).toHaveLength(species.length)
  })
})
