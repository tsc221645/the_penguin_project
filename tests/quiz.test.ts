import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import QuizPage from '../src/pages/QuizPage.vue'
import { shuffleQuestions } from '../src/lib/quiz'

describe('QuizPage', () => {
  it('shows a sourced question and reveals feedback after an answer', async () => {
    const wrapper = mount(QuizPage)
    expect(wrapper.findAll('.quiz-options button')).toHaveLength(4)

    await wrapper.findAll('.quiz-options button')[0].trigger('click')

    expect(wrapper.text()).toMatch(/Correct!|Not quite\./)
    expect(wrapper.find('.quiz-feedback .source-list').exists()).toBe(true)
  })

  it('moves to the next question after feedback', async () => {
    const wrapper = mount(QuizPage)
    await wrapper.findAll('.quiz-options button')[0].trigger('click')
    await wrapper.get('.quiz-feedback .button').trigger('click')

    expect(wrapper.text()).toContain('Question 2 of')
  })

  it('places the next-question action on the feedback row aligned to the right', async () => {
    const wrapper = mount(QuizPage)
    await wrapper.findAll('.quiz-options button')[0].trigger('click')
    expect(wrapper.find('.quiz-feedback-actions').exists()).toBe(true)
    expect(wrapper.find('.quiz-feedback-actions .button').text()).toContain('Next question')
  })

  it('shuffles a copy of the question bank without mutating the source order', () => {
    const original = ['first', 'second', 'third', 'fourth']
    expect(shuffleQuestions(original, () => 0)).toEqual(['second', 'third', 'fourth', 'first'])
    expect(original).toEqual(['first', 'second', 'third', 'fourth'])
  })
})
