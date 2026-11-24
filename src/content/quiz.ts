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
  {
    id: 'king-image-identification', speciesId: 'king', imageId: 'king-hero', prompt: 'Which penguin is shown in this approved reference image?',
    options: [{ id: 'king', label: 'King penguin' }, { id: 'chinstrap', label: 'Chinstrap penguin' }, { id: 'little', label: 'Little penguin' }, { id: 'african', label: 'African penguin' }],
    correctOptionId: 'king', explanation: 'This image is registered to the King penguin record in the project image registry.', sourceIds: ['penguins-list'],
  },
  {
    id: 'yellow-eyed-name', speciesId: 'yellow-eyed', prompt: 'What Māori name is associated with the Yellow-eyed penguin?',
    options: [{ id: 'hoiho', label: 'Hoiho' }, { id: 'tawaki', label: 'Tawaki' }, { id: 'korora', label: 'Kororā' }, { id: 'pokotiwha', label: 'Pokotiwha' }],
    correctOptionId: 'hoiho', explanation: 'The New Zealand Department of Conservation identifies hoiho as the Māori name for the Yellow-eyed penguin.', sourceIds: ['nz-doc-yellow-eyed'],
  },
  {
    id: 'snares-bill-mark', speciesId: 'snares', prompt: 'Which feature helps distinguish a Snares penguin from a Fiordland penguin?',
    options: [{ id: 'bare-bill', label: 'A prominent bare area at the bill base' }, { id: 'blue-feathers', label: 'A bright blue back' }, { id: 'long-tail', label: 'A long feathered tail' }, { id: 'red-chest', label: 'A red chest band' }],
    correctOptionId: 'bare-bill', explanation: 'The New Zealand Department of Conservation notes the prominent bare skin at the bill base as a distinguishing feature.', sourceIds: ['nz-doc-snares'],
  },
]

export const didYouKnowFacts: FactRecord[] = [
  { id: 'did-you-know-adelie', text: 'Adélie penguins build nests from small stones.', sourceIds: ['penguin-world'] },
  { id: 'did-you-know-emperor', text: 'Male Emperor penguins balance the single egg on their feet during incubation.', sourceIds: ['penguin-world'] },
  { id: 'did-you-know-gentoo', text: 'Gentoo penguins are among the fastest swimming penguins.', sourceIds: ['penguin-world'] },
]
