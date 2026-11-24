import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HomePage from '../src/pages/HomePage.vue'

const global = { stubs: { RouterLink: { template: '<a><slot /></a>' }, SpeciesCard: { template: '<article />' } } }

describe('HomePage hero carousel', () => {
  it('starts with all 18 approved hero images available to the carousel', () => {
    const wrapper = mount(HomePage, { global })

    expect(wrapper.find('.hero-carousel-image').exists()).toBe(true)
    expect(wrapper.find('.art-label').text()).toBe('01 / 18')
  })

  it('moves to the next featured species', async () => {
    const wrapper = mount(HomePage, { global })
    const firstSource = wrapper.find('.hero-carousel-image').attributes('src')

    await wrapper.get('button[aria-label="Next featured species"]').trigger('click')

    expect(wrapper.find('.hero-carousel-image').attributes('src')).not.toBe(firstSource)
    expect(wrapper.find('.art-label').text()).toBe('02 / 18')
  })
})
