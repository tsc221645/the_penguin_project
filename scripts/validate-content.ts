import { images } from '../src/content/images'
import { sources } from '../src/content/sources'
import { species } from '../src/content/species'

const errors: string[] = []
const sourceIds = new Set(sources.map((source) => source.id))
const imageIds = new Set(images.map((image) => image.id))
const speciesIds = new Set(species.map((item) => item.id))
const allowedLicenses = new Set(['PROJECT-OWNED', 'CC0', 'CC-BY-4.0', 'CC-BY-SA-4.0'])

for (const image of images) {
  for (const field of ['id', 'speciesId', 'localPath', 'author', 'originalFileUrl', 'licenseId', 'licenseUrl', 'attributionText', 'alt']) if (!image[field as keyof typeof image]) errors.push(`Image ${image.id || '(unknown)'} is missing ${field}`)
  if (!speciesIds.has(image.speciesId)) errors.push(`Image ${image.id} references missing species ${image.speciesId}`)
  if (image.reviewStatus !== 'approved') errors.push(`Image ${image.id} is not approved`)
  if (!allowedLicenses.has(image.licenseId)) errors.push(`Image ${image.id} has unsupported license ${image.licenseId}`)
}
for (const item of species) {
  if (!imageIds.has(item.heroImageId)) errors.push(`Species ${item.id} references missing hero image`)
  for (const imageId of item.galleryImageIds) if (!imageIds.has(imageId)) errors.push(`Species ${item.id} references missing gallery image ${imageId}`)
  for (const sourceId of item.sourceIds) if (!sourceIds.has(sourceId)) errors.push(`Species ${item.id} references missing source ${sourceId}`)
  if (!sourceIds.has(item.conservation.sourceId)) errors.push(`Species ${item.id} has no conservation source`)
  if (!item.conservation.assessmentYear || !item.conservation.reviewDate) errors.push(`Species ${item.id} has incomplete conservation context`)
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log(`Content valid: ${species.length} species, ${images.length} approved images, ${sources.length} sources.`)
