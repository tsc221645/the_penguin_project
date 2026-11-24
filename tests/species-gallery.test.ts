import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SpeciesGallery from '../src/components/SpeciesGallery.vue'

describe('SpeciesGallery', () => {
  it('cycles through the approved images for Adélie penguin', async () => {
    const wrapper = mount(SpeciesGallery, { props: { imageIds: ['adelie-hero', 'adelie-colony'] } })
    const image = wrapper.find('.carousel-stage img')
    const firstSource = image.attributes('src')

    await wrapper.get('button[aria-label="Next image"]').trigger('click')

    expect(wrapper.find('.carousel-stage img').attributes('src')).not.toBe(firstSource)
    expect(wrapper.findAll('.carousel-dot')).toHaveLength(2)
  })
})
