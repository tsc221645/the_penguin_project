export type ConservationStatus = 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered'

export interface SourceRecord {
  id: string; organizationOrAuthor: string; title: string; url: string
  publishedAt?: string; accessedAt: string; sourceType: string
}

export interface ImageRecord {
  id: string; speciesId: string; localPath: string; title: string; author: string
  originalFileUrl: string; licenseId: string; licenseUrl: string
  attributionText: string; modifications: string[]; verifiedAt: string
  reviewStatus: 'approved' | 'pending' | 'rejected'; alt: string
}

export interface SpeciesRecord {
  id: string; slug: string; commonName: string; scientificName: string
  intro: string; description: string; heroImageId: string; galleryImageIds: string[]
  habitatRegions: string[]; dietItems: string[]; traits: string[]; facts: string[]
  heightCm: { min: number; max: number }; weightKg: { min: number; max: number }
  conservation: { status: ConservationStatus; assessmentYear: number; sourceId: string; reviewDate: string }
  sourceIds: string[]; lastReviewed: string; contentStatus: 'published' | 'directory' | 'draft'
}
