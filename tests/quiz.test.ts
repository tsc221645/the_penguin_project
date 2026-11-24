import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import QuizPage from '../src/pages/QuizPage.vue'

describe('QuizPage', () => {
  it('shows a sourced question and reveals feedback after an answer', async () => {
    const wrapper = mount(QuizPage)
    expect(wrapper.text()).toContain('What do Adélie penguins use to build their nests?')

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('Correct!')
    expect(wrapper.text()).toContain('Penguin species and adaptations')
    expect(wrapper.find('.answer-check').exists()).toBe(true)
  })

  it('moves to the next question after feedback', async () => {
    const wrapper = mount(QuizPage)
    await wrapper.findAll('.quiz-options button')[0].trigger('click')
    await wrapper.get('.quiz-feedback .button').trigger('click')

    expect(wrapper.text()).toContain('Who balances the single Emperor penguin egg during incubation?')
  })

  it('places the next-question action on the feedback row aligned to the right', async () => {
    const wrapper = mount(QuizPage)
    await wrapper.findAll('.quiz-options button')[0].trigger('click')
    expect(wrapper.find('.quiz-feedback-actions').exists()).toBe(true)
    expect(wrapper.find('.quiz-feedback-actions .button').text()).toContain('Next question')
  })
})
