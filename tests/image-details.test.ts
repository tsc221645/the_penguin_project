import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ImageDetails from '../src/components/ImageDetails.vue'

describe('ImageDetails', () => {
  it('keeps the visible credit short and reveals the full record on demand', async () => {
    const wrapper = mount(ImageDetails, { props: { imageId: 'adelie-hero' } })

    expect(wrapper.get('summary').text()).toBe('Image credits')
    expect(wrapper.find('.image-details-panel').exists()).toBe(true)
    expect(wrapper.get('.image-details-panel').text()).toContain('Tamatukurikei')

    await wrapper.get('summary').trigger('click')
    expect((wrapper.get('details').element as HTMLDetailsElement).open).toBe(true)
  })
})
