import type { FactRecord, MeasurementRange, SpeciesRecord } from '../types/content'

const fact = (id: string, text: string, sourceIds: string[]): FactRecord => ({ id, text, sourceIds })
const measurement = (min: number, max: number, unit: MeasurementRange['unit'], sourceIds: string[]): MeasurementRange => ({ min, max, unit, sourceIds })

export const species: SpeciesRecord[] = [
  {
    id: 'adelie', slug: 'adelie', commonName: 'Adélie penguin', scientificName: 'Pygoscelis adeliae', intro: 'Small, bold, and perfectly at home on the Antarctic coast.',
    description: 'Adélie penguins are compact, energetic seabirds with a white eye ring and a dark head. They gather in lively colonies close to the sea, where they launch into the water to hunt and return over sea ice to their nests.', heroImageId: 'adelie-hero', galleryImageIds: ['adelie-hero'],
    habitatRegions: ['Antarctic coast', 'Ross Sea', 'Antarctic Peninsula'], breedingRegions: ['Rocky Antarctic shores and islands'], dietItems: ['Krill', 'Small fish', 'Squid'], traits: ['White eye ring', 'Compact body', 'Fast underwater swimmer'], behavior: ['Colony living', 'Nearshore foraging'], breeding: ['Stone nest building', 'Seasonal breeding'],
    facts: [fact('adelie-stones', 'They build nests from small stones.', ['penguin-world']), fact('adelie-colonies', 'Their colonies can be loud and densely packed.', ['penguin-world']), fact('adelie-foraging', 'They usually forage close to the colony during breeding.', ['birdlife-adelie'])],
    heightCm: measurement(46, 71, 'cm', ['birdlife-adelie']), weightKg: measurement(3.6, 6, 'kg', ['birdlife-adelie']), conservation: { status: 'Least Concern', assessmentYear: 2021, sourceId: 'birdlife-adelie', reviewDate: '2026-11-23' }, sourceIds: ['birdlife-adelie', 'penguin-world'], lastReviewed: '2026-11-23', contentStatus: 'published',
  },
  {
    id: 'emperor', slug: 'emperor', commonName: 'Emperor penguin', scientificName: 'Aptenodytes forsteri', intro: 'The tallest penguin, built for long winters at the edge of the world.',
    description: 'Emperor penguins are the largest living penguins. Their deep body, dense feathers, and remarkable social behavior help them endure Antarctic winters, including the famous shared huddles that shelter adults from the wind.', heroImageId: 'emperor-hero', galleryImageIds: ['emperor-hero'],
    habitatRegions: ['Antarctic sea ice', 'East Antarctica', 'Ross Sea'], breedingRegions: ['Stable Antarctic sea ice near polynyas'], dietItems: ['Fish', 'Squid', 'Krill'], traits: ['Tallest penguin', 'Deep-diving hunter', 'Winter breeder'], behavior: ['Huddling', 'Deep diving'], breeding: ['One egg per breeding cycle', 'Male incubation'],
    facts: [fact('emperor-egg', 'The male balances the single egg on his feet during incubation.', ['penguin-world']), fact('emperor-travel', 'Adults can travel over sea ice between colony and ocean.', ['birdlife-emperor']), fact('emperor-countershade', 'Their countershading helps camouflage them in water.', ['penguin-world'])],
    heightCm: measurement(100, 122, 'cm', ['birdlife-emperor']), weightKg: measurement(22, 45, 'kg', ['birdlife-emperor']), conservation: { status: 'Near Threatened', assessmentYear: 2021, sourceId: 'birdlife-emperor', reviewDate: '2026-11-23' }, sourceIds: ['birdlife-emperor', 'penguin-world'], lastReviewed: '2026-11-23', contentStatus: 'published',
  },
  {
    id: 'gentoo', slug: 'gentoo', commonName: 'Gentoo penguin', scientificName: 'Pygoscelis papua', intro: 'A quick swimmer with a bright bill and a talent for adapting.',
    description: 'Gentoo penguins are recognizable by the white stripe above each eye and their warm orange-red bill. They are active coastal birds that often move quickly through the water and nest among grasses, stones, or bare ground.', heroImageId: 'gentoo-hero', galleryImageIds: ['gentoo-hero'],
    habitatRegions: ['Antarctic Peninsula', 'Subantarctic islands', 'Falkland Islands'], breedingRegions: ['Rocky shores and coastal ground'], dietItems: ['Krill', 'Fish', 'Small crustaceans'], traits: ['White head stripe', 'Orange-red bill', 'Agile swimmer'], behavior: ['Fast swimming', 'Coastal foraging'], breeding: ['Pebble nests', 'Colony breeding'],
    facts: [fact('gentoo-speed', 'They are among the fastest swimming penguins.', ['penguin-world']), fact('gentoo-pebbles', 'Gentoo colonies may use pebbles to build nests.', ['penguin-world']), fact('gentoo-range', 'Their range reaches farther north than many Antarctic penguins.', ['birdlife-gentoo'])],
    heightCm: measurement(51, 90, 'cm', ['birdlife-gentoo']), weightKg: measurement(4.5, 8.5, 'kg', ['birdlife-gentoo']), conservation: { status: 'Least Concern', assessmentYear: 2021, sourceId: 'birdlife-gentoo', reviewDate: '2026-11-23' }, sourceIds: ['birdlife-gentoo', 'penguin-world'], lastReviewed: '2026-11-23', contentStatus: 'published',
  },
]

const directoryEntry = (id: string, slug: string, commonName: string, scientificName: string, range: string, status: SpeciesRecord['conservation']['status']): SpeciesRecord => ({
  id, slug, commonName, scientificName, intro: 'Directory entry — full profile coming soon.', description: '', heroImageId: '', galleryImageIds: [], habitatRegions: [range], breedingRegions: [], dietItems: [], traits: [], behavior: [], breeding: [], facts: [], heightCm: measurement(0, 0, 'cm', []), weightKg: measurement(0, 0, 'kg', []), conservation: { status, assessmentYear: 2023, sourceId: 'penguins-list', reviewDate: '2026-11-23' }, sourceIds: ['penguins-list', 'ioc-13-2'], lastReviewed: '2026-11-23', contentStatus: 'directory',
})

species.push(
  directoryEntry('king', 'king', 'King penguin', 'Aptenodytes patagonicus', 'Subantarctic islands', 'Least Concern'),
  directoryEntry('chinstrap', 'chinstrap', 'Chinstrap penguin', 'Pygoscelis antarcticus', 'Antarctic Peninsula and Balleny Islands', 'Least Concern'),
  directoryEntry('little', 'little', 'Little penguin', 'Eudyptula minor', 'Australia and New Zealand', 'Least Concern'),
  directoryEntry('galapagos', 'galapagos', 'Galápagos penguin', 'Spheniscus mendiculus', 'Galápagos Islands', 'Endangered'),
  directoryEntry('humboldt', 'humboldt', 'Humboldt penguin', 'Spheniscus humboldti', 'Pacific coast of South America', 'Vulnerable'),
  directoryEntry('magellanic', 'magellanic', 'Magellanic penguin', 'Spheniscus magellanicus', 'Coasts of southern South America', 'Least Concern'),
  directoryEntry('african', 'african', 'African penguin', 'Spheniscus demersus', 'Coasts of Southern Africa', 'Critically Endangered'),
  directoryEntry('yellow-eyed', 'yellow-eyed', 'Yellow-eyed penguin', 'Megadyptes antipodes', 'New Zealand', 'Endangered'),
  directoryEntry('macaroni', 'macaroni', 'Macaroni penguin', 'Eudyptes chrysolophus', 'Antarctic Peninsula, South America, and subantarctic islands', 'Vulnerable'),
  directoryEntry('royal', 'royal', 'Royal penguin', 'Eudyptes schlegeli', 'Macquarie Island and nearby islands', 'Least Concern'),
  directoryEntry('northern-rockhopper', 'northern-rockhopper', 'Northern rockhopper penguin', 'Eudyptes moseleyi', 'Tristan da Cunha, Amsterdam Island, and Saint Paul Island', 'Endangered'),
  directoryEntry('southern-rockhopper', 'southern-rockhopper', 'Southern rockhopper penguin', 'Eudyptes chrysocome', 'Southern South America and subantarctic islands', 'Vulnerable'),
  directoryEntry('fiordland', 'fiordland', 'Fiordland penguin', 'Eudyptes pachyrhynchus', 'New Zealand', 'Near Threatened'),
  directoryEntry('snares', 'snares', 'Snares penguin', 'Eudyptes robustus', 'Snares Islands', 'Vulnerable'),
  directoryEntry('erect-crested', 'erect-crested', 'Erect-crested penguin', 'Eudyptes sclateri', 'Bounty and Antipodes Islands', 'Endangered'),
)
