<script setup lang="ts">
import { computed, ref } from 'vue'
import FactCard from '../components/FactCard.vue'
import SourceList from '../components/SourceList.vue'
import UiIcon from '../components/UiIcon.vue'
import { didYouKnowFacts, quizQuestions } from '../content/quiz'
import { getImage, getSpecies } from '../lib/content'
import { shuffleQuestions } from '../lib/quiz'

const questions = ref(shuffleQuestions(quizQuestions))
const questionIndex = ref(0)
const score = ref(0)
const selectedOption = ref<string | null>(null)
const finished = ref(false)
const currentQuestion = computed(() => questions.value[questionIndex.value])
const selectedSpecies = computed(() => currentQuestion.value?.speciesId ? getSpecies(currentQuestion.value.speciesId) : undefined)
const questionImage = computed(() => currentQuestion.value?.imageId ? getImage(currentQuestion.value.imageId) : undefined)

function choose(optionId: string) {
  if (selectedOption.value || !currentQuestion.value) return
  selectedOption.value = optionId
  if (optionId === currentQuestion.value.correctOptionId) score.value += 1
}

function nextQuestion() {
  if (questionIndex.value === questions.value.length - 1) { finished.value = true; return }
  questionIndex.value += 1
  selectedOption.value = null
}

function restart() {
  questionIndex.value = 0
  questions.value = shuffleQuestions(quizQuestions)
  score.value = 0
  selectedOption.value = null
  finished.value = false
}
</script>

<template>
  <section class="page-heading"><div class="container"><p class="eyebrow">Field guide / quiz</p><h1>Test your penguin knowledge</h1><p>Answer questions built from the project’s reviewed facts and follow every explanation back to its source.</p></div></section>
  <section class="container quiz-page">
    <div v-if="!finished && currentQuestion" class="quiz-card" aria-live="polite">
      <div class="quiz-progress"><span>Question {{ questionIndex + 1 }} of {{ questions.length }}</span><span>Score {{ score }}</span></div>
      <p v-if="selectedSpecies" class="eyebrow">{{ selectedSpecies.commonName }}</p>
      <h2>{{ currentQuestion.prompt }}</h2>
      <figure v-if="questionImage" class="quiz-image"><img :src="questionImage.approvedImageUrl" :alt="questionImage.alt"><figcaption>{{ questionImage.attributionText }}</figcaption></figure>
      <div class="quiz-options" role="group" :aria-label="currentQuestion.prompt">
        <button v-for="option in currentQuestion.options" :key="option.id" type="button" :class="{ selected: selectedOption === option.id, correct: selectedOption && option.id === currentQuestion.correctOptionId, incorrect: selectedOption === option.id && option.id !== currentQuestion.correctOptionId }" :disabled="Boolean(selectedOption)" @click="choose(option.id)"><span>{{ option.label }}</span><span v-if="selectedOption === option.id && option.id === currentQuestion.correctOptionId" class="answer-check" aria-label="Correct answer">✓</span></button>
      </div>
      <div v-if="selectedOption" class="quiz-feedback" :class="{ correct: selectedOption === currentQuestion.correctOptionId }" role="status">
        <strong>{{ selectedOption === currentQuestion.correctOptionId ? 'Correct!' : 'Not quite.' }}</strong>
        <p>{{ currentQuestion.explanation }}</p>
        <SourceList :source-ids="currentQuestion.sourceIds" />
        <div class="quiz-feedback-actions"><button class="button" type="button" @click="nextQuestion">{{ questionIndex === questions.length - 1 ? 'See result' : 'Next question' }} <span><UiIcon name="arrow-right" /></span></button></div>
      </div>
    </div>
    <div v-else class="quiz-result" aria-live="polite"><p class="eyebrow">Quiz complete</p><h2>You scored {{ score }} of {{ questions.length }}</h2><p>{{ score === questions.length ? 'A perfect flight through the field guide.' : 'Every answer is another trail back to the birds.' }}</p><button class="button" type="button" @click="restart">Try again <span><UiIcon name="refresh" /></span></button></div>
    <section class="did-you-know"><div class="section-heading"><div><p class="eyebrow">A little more to know</p><h2>Small facts,<br><i>big birds</i>.</h2></div></div><div class="fact-card-grid"><FactCard v-for="fact in didYouKnowFacts" :key="fact.id" :fact="fact" /></div></section>
  </section>
</template>

<style scoped>
.quiz-page { padding: 70px 0 120px; }
.quiz-card, .quiz-result { max-width: 760px; margin: 0 auto; padding: 38px; background: #fff; border: 1px solid #dfe7e5; box-shadow: 0 18px 38px #294d5812; }
.quiz-progress { display: flex; justify-content: space-between; color: #779094; font-size: 12px; margin-bottom: 42px; }
.quiz-card h2, .quiz-result h2 { font-family: 'Playfair Display', serif; font-size: clamp(34px, 5vw, 54px); line-height: 1.05; margin: 0 0 30px; }
.quiz-options { display: grid; gap: 12px; }
.quiz-options button { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 16px 18px; border: 1px solid #b9cbc7; background: #f6f8f6; color: #193044; text-align: left; font: inherit; cursor: pointer; transition: background .25s ease, border-color .25s ease, transform .25s ease; }
.quiz-options button:hover:not(:disabled), .quiz-options button.selected { transform: translateX(5px); border-color: #1c4e62; background: #e2eeeb; }
.quiz-options button.correct { border-color: var(--logo-blue); background: var(--logo-ice); }
.quiz-options button.incorrect { border-color: var(--logo-blue); background: var(--logo-ice); }
.quiz-feedback { margin-top: 25px; padding: 22px; border-left: 3px solid var(--logo-blue); background: var(--logo-pale); }
.quiz-feedback.correct { border-left-color: var(--logo-blue); background: var(--logo-ice); }
.quiz-feedback p { color: #536d74; }
.quiz-feedback .button { margin-top: 12px; }
.quiz-feedback-actions { display: flex; justify-content: flex-end; }
.answer-check { display: grid; place-items: center; width: 27px; height: 27px; flex: 0 0 27px; border-radius: 50%; background: #087fbe; color: #fff; font-size: 19px; font-weight: 700; animation: answer-check-pop .45s cubic-bezier(.2,.8,.2,1) both; }
.quiz-result { text-align: center; }
.did-you-know { margin-top: 100px; }
.did-you-know h2 { font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 58px); line-height: 1.05; margin: 0; }
.did-you-know h2 i { color: var(--logo-blue); }
.fact-card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.fact-card { padding: 24px; background: #eef4f1; border-top: 3px solid var(--logo-blue); }
.fact-card-text { font-family: 'Playfair Display', serif; font-size: 21px; line-height: 1.3; }
.fact-card :deep(.source-list) { margin-top: 20px; }
@media (max-width: 700px) { .quiz-card, .quiz-result { padding: 24px; } .fact-card-grid { grid-template-columns: 1fr; } }
@keyframes answer-check-pop { 0% { opacity: 0; transform: scale(.2) rotate(-18deg); } 65% { opacity: 1; transform: scale(1.18) rotate(5deg); } 100% { transform: scale(1) rotate(0); } }
</style>
