import { images } from '../src/content/images'
import { sources } from '../src/content/sources'
import { species } from '../src/content/species'
import { habitatAnchors, occurrences } from '../src/content/geography'

import type { HabitatAnchorRecord, ImageRecord, OccurrenceRecord, SourceRecord, SpeciesRecord } from '../src/types/content'

export interface ContentBundle { images: ImageRecord[]; sources: SourceRecord[]; species: SpeciesRecord[]; occurrences: OccurrenceRecord[]; habitatAnchors: HabitatAnchorRecord[] }

export function validateContent(content: ContentBundle): string[] {
  const errors: string[] = []
  const sourceIds = new Set(content.sources.map((source) => source.id))
  const imageIds = new Set(content.images.map((image) => image.id))
  const speciesIds = new Set(content.species.map((item) => item.id))
  const allowedLicenses = new Set(['PROJECT-OWNED', 'CC0', 'PUBLIC-DOMAIN', 'CC-BY-4.0', 'CC-BY-SA-4.0'])

  for (const image of content.images) {
    for (const field of ['id', 'speciesId', 'approvedImageUrl', 'author', 'originalFileUrl', 'licenseId', 'licenseUrl', 'attributionText', 'alt']) if (!image[field as keyof ImageRecord]) errors.push(`Image ${image.id || '(unknown)'} is missing ${field}`)
    if (!speciesIds.has(image.speciesId)) errors.push(`Image ${image.id} references missing species ${image.speciesId}`)
    if (image.reviewStatus !== 'approved') errors.push(`Image ${image.id} is not approved`)
    if (!allowedLicenses.has(image.licenseId)) errors.push(`Image ${image.id} has unsupported license ${image.licenseId}`)
    if (!image.categories.length) errors.push(`Image ${image.id} has no category`) 
    if (!/^https:\/\//.test(image.approvedImageUrl) || !/^https:\/\//.test(image.originalFileUrl)) errors.push(`Image ${image.id} must use HTTPS URLs`)
  }
  for (const item of content.species) {
    if (item.contentStatus === 'directory') {
      for (const sourceId of item.sourceIds) if (!sourceIds.has(sourceId)) errors.push(`Directory species ${item.id} references missing source ${sourceId}`)
      if (!imageIds.has(item.heroImageId)) errors.push(`Directory species ${item.id} references missing hero image`)
      for (const imageId of item.galleryImageIds) if (!imageIds.has(imageId)) errors.push(`Directory species ${item.id} references missing gallery image ${imageId}`)
      continue
    }
    for (const fact of item.facts) for (const sourceId of fact.sourceIds) if (!sourceIds.has(sourceId)) errors.push(`Fact ${fact.id} in ${item.id} references missing source ${sourceId}`)
    for (const measurement of [item.heightCm, item.weightKg]) for (const sourceId of measurement.sourceIds) if (!sourceIds.has(sourceId)) errors.push(`Measurement in ${item.id} references missing source ${sourceId}`)
    if (!imageIds.has(item.heroImageId)) errors.push(`Species ${item.id} references missing hero image`)
    for (const imageId of item.galleryImageIds) if (!imageIds.has(imageId)) errors.push(`Species ${item.id} references missing gallery image ${imageId}`)
    for (const sourceId of item.sourceIds) if (!sourceIds.has(sourceId)) errors.push(`Species ${item.id} references missing source ${sourceId}`)
    if (!sourceIds.has(item.conservation.sourceId)) errors.push(`Species ${item.id} has no conservation source`)
    if (!item.conservation.assessmentYear || !item.conservation.reviewDate) errors.push(`Species ${item.id} has incomplete conservation context`)
  }
  for (const occurrence of content.occurrences) {
    if (!speciesIds.has(occurrence.speciesId)) errors.push(`Occurrence ${occurrence.id} references missing species ${occurrence.speciesId}`)
    if (!sourceIds.has(occurrence.sourceId)) errors.push(`Occurrence ${occurrence.id} references missing source ${occurrence.sourceId}`)
    if (occurrence.latitude < -90 || occurrence.latitude > 90 || occurrence.longitude < -180 || occurrence.longitude > 180) errors.push(`Occurrence ${occurrence.id} has invalid coordinates`)
    if (occurrence.uncertaintyMeters !== undefined && occurrence.uncertaintyMeters < 0) errors.push(`Occurrence ${occurrence.id} has invalid uncertainty`)
  }
  for (const anchor of content.habitatAnchors) {
    if (!speciesIds.has(anchor.speciesId)) errors.push(`Habitat anchor ${anchor.id} references missing species ${anchor.speciesId}`)
    if (!sourceIds.has(anchor.sourceId)) errors.push(`Habitat anchor ${anchor.id} references missing source ${anchor.sourceId}`)
    if (anchor.latitude < -90 || anchor.latitude > 90 || anchor.longitude < -180 || anchor.longitude > 180) errors.push(`Habitat anchor ${anchor.id} has invalid coordinates`)
  }
  return errors
}

const errors = validateContent({ images, sources, species, occurrences, habitatAnchors })
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log(`Content valid: ${species.length} species, ${images.length} approved images, ${sources.length} sources.`)
