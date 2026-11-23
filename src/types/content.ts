export type ConservationStatus = 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered'
export type ImageCategory = 'hero' | 'portrait' | 'colony' | 'social' | 'swimming' | 'diving' | 'feeding' | 'breeding' | 'chicks' | 'habitat' | 'comparison'

export interface FactRecord { id: string; text: string; sourceIds: string[] }

export interface MeasurementRange { min: number; max: number; unit: 'cm' | 'kg'; sourceIds: string[]; qualifier?: string }

export interface SourceRecord {
  id: string; organizationOrAuthor: string; title: string; url: string
  publishedAt?: string; accessedAt: string; sourceType: string
}

export interface ImageRecord {
  id: string; speciesId: string; categories: ImageCategory[]; externalProvider: 'Wikimedia Commons' | 'Project-owned'
  approvedImageUrl: string; thumbnailUrl?: string; title: string; author: string
  originalFileUrl: string; licenseId: string; licenseUrl: string
  attributionText: string; modifications: string[]; verifiedAt: string
  reviewStatus: 'approved' | 'pending' | 'rejected'; alt: string
}

export interface SpeciesRecord {
  id: string; slug: string; commonName: string; scientificName: string
  intro: string; description: string; heroImageId: string; galleryImageIds: string[]
  habitatRegions: string[]; breedingRegions: string[]; dietItems: string[]; traits: string[]; facts: FactRecord[]
  behavior: string[]; breeding: string[]; heightCm: MeasurementRange; weightKg: MeasurementRange
  conservation: { status: ConservationStatus; assessmentYear: number; sourceId: string; reviewDate: string }
  sourceIds: string[]; lastReviewed: string; contentStatus: 'published' | 'directory' | 'draft'
}
