import type { FactRecord, QuizQuestion } from '../types/content'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'adelie-nest-material', speciesId: 'adelie', prompt: 'What do Adélie penguins use to build their nests?',
    options: [{ id: 'stones', label: 'Small stones' }, { id: 'feathers', label: 'Loose feathers' }, { id: 'seaweed', label: 'Seaweed' }, { id: 'ice', label: 'Packed ice' }],
    correctOptionId: 'stones', explanation: 'Adélie penguins build nests from small stones, which they collect and arrange during breeding.', sourceIds: ['penguin-world'],
  },
  {
    id: 'emperor-incubation', speciesId: 'emperor', prompt: 'Who balances the single Emperor penguin egg during incubation?',
    options: [{ id: 'male', label: 'The male' }, { id: 'female', label: 'The female' }, { id: 'both', label: 'Both parents at the same time' }, { id: 'colony', label: 'Another colony member' }],
    correctOptionId: 'male', explanation: 'The male Emperor penguin balances the egg on his feet while the female returns to the sea to feed.', sourceIds: ['penguin-world'],
  },
  {
    id: 'gentoo-swimming', speciesId: 'gentoo', prompt: 'Which statement about Gentoo penguins is supported by the project facts?',
    options: [{ id: 'fast', label: 'They are among the fastest swimming penguins.' }, { id: 'desert', label: 'They live in desert colonies.' }, { id: 'flying', label: 'They fly short distances.' }, { id: 'solitary', label: 'They avoid all colony life.' }],
    correctOptionId: 'fast', explanation: 'Gentoo penguins are recognized in the project facts as among the fastest swimming penguins.', sourceIds: ['penguin-world'],
  },
  {
    id: 'emperor-countershading', speciesId: 'emperor', prompt: 'What can Emperor penguin countershading help with?',
    options: [{ id: 'camouflage', label: 'Camouflage in water' }, { id: 'nest-building', label: 'Building stone nests' }, { id: 'flying', label: 'Flying above the sea' }, { id: 'climbing', label: 'Climbing trees' }],
    correctOptionId: 'camouflage', explanation: 'The darker back and lighter underside of countershading can help camouflage a penguin in water.', sourceIds: ['penguin-world'],
  },
]

export const didYouKnowFacts: FactRecord[] = [
  { id: 'did-you-know-adelie', text: 'Adélie penguins build nests from small stones.', sourceIds: ['penguin-world'] },
  { id: 'did-you-know-emperor', text: 'Male Emperor penguins balance the single egg on their feet during incubation.', sourceIds: ['penguin-world'] },
  { id: 'did-you-know-gentoo', text: 'Gentoo penguins are among the fastest swimming penguins.', sourceIds: ['penguin-world'] },
]
