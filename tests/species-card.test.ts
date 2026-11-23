import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SpeciesCard from '../src/components/SpeciesCard.vue'
import { species } from '../src/content/species'

const routerLinkStub = { template: '<a><slot /></a>' }

describe('SpeciesCard', () => {
  it('renders approved artwork for a published profile', () => {
    const wrapper = mount(SpeciesCard, { props: { item: species[0] }, global: { stubs: { RouterLink: routerLinkStub } } })
    expect(wrapper.find('img').attributes('src')).toContain('Researching_Ad%C3%A9lie_penguin_JARE_01')
    expect(wrapper.text()).toContain('Adélie penguin')
    expect(wrapper.text()).not.toContain('Profile coming soon')
  })

  it('renders a safe placeholder for a directory-only entry', () => {
    const directoryItem = species.find((item) => item.contentStatus === 'directory')!
    const wrapper = mount(SpeciesCard, { props: { item: directoryItem }, global: { stubs: { RouterLink: routerLinkStub } } })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain('Profile coming soon')
  })
})
