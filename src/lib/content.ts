import { images } from '../content/images'
import { sources } from '../content/sources'
import { species } from '../content/species'
import type { ImageRecord, SourceRecord, SpeciesRecord } from '../types/content'

export const getSpecies = (slug: string) => species.find((item) => item.slug === slug)
export const getImage = (id: string): ImageRecord | undefined => images.find((item) => item.id === id)
export const getSource = (id: string): SourceRecord | undefined => sources.find((item) => item.id === id)
export { images, sources, species }
export type { ImageRecord, SourceRecord, SpeciesRecord }
