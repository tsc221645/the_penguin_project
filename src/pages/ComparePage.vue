<script setup lang="ts">
import { computed, ref } from 'vue'
import adelieModel from '../assets/models/adelie.glb?url'
import SpeciesModelViewer from '../components/SpeciesModelViewer.vue'
import { getImage, getSource, species } from '../lib/content'
import { compareSpeciesMany } from '../lib/explore'
import type { SourceRecord, SpeciesRecord } from '../types/content'
import UiIcon from '../components/UiIcon.vue'

const selectedSlugs = ref(['adelie', 'emperor'])
const selectorLabels = ['First species', 'Second species', 'Third species', 'Fourth species', 'Fifth species']

const selectedSpecies = computed(() => selectedSlugs.value
  .map((slug) => species.find((item) => item.slug === slug))
  .filter((item): item is SpeciesRecord => Boolean(item)))

const rows = computed(() => compareSpeciesMany(selectedSpecies.value))
const scaleMaxHeight = Math.max(...species.map((item) => item.heightCm.max))

const heightLabel = (item: SpeciesRecord) => item.heightCm.min === item.heightCm.max
  ? `About ${item.heightCm.min} cm`
  : `${item.heightCm.min}–${item.heightCm.max} cm`

const sizeBarHeight = (item: SpeciesRecord) => `${Math.max(12, ((item.heightCm.min + item.heightCm.max) / 2 / scaleMaxHeight) * 100)}%`

const availableSpecies = (index: number) => species.filter((item) => !selectedSlugs.value.includes(item.slug) || item.slug === selectedSlugs.value[index])

const selectSpecies = (index: number, event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  if (value) selectedSlugs.value[index] = value
}

const addSpecies = () => {
  const next = species.find((item) => !selectedSlugs.value.includes(item.slug))
  if (next && selectedSlugs.value.length < 5) selectedSlugs.value.push(next.slug)
}

const removeSpecies = (index: number) => {
  if (selectedSlugs.value.length > 2) selectedSlugs.value.splice(index, 1)
}

const sourceIdsFor = (item: SpeciesRecord) => [...new Set([
  ...item.sourceIds,
  ...item.heightCm.sourceIds,
  ...item.weightKg.sourceIds,
  item.conservation.sourceId,
])]

const comparisonSources = computed(() => {
  const sourceIds = [...new Set(selectedSpecies.value.flatMap(sourceIdsFor))]
  return sourceIds
    .map((id) => getSource(id))
    .filter((source): source is SourceRecord => Boolean(source))
})

const imageFor = (item: SpeciesRecord) => getImage(item.heroImageId)
</script>

<template>
  <section class="page-heading compare-heading">
    <div class="container">
      <p class="eyebrow">Field guide / compare</p>
      <h1>Side by side.</h1>
      <p>Build your own field set and see how up to five penguins differ.</p>
    </div>
  </section>

  <main class="container compare-page">
    <section class="compare-builder" aria-labelledby="compare-builder-title">
      <div class="compare-builder-heading">
        <div>
          <p class="eyebrow">Build a field set</p>
          <h2 id="compare-builder-title">Choose your penguins.</h2>
        </div>
        <p class="compare-count" aria-live="polite">{{ selectedSpecies.length }} / 5 selected</p>
      </div>

      <div class="compare-selectors">
        <div v-for="(slug, index) in selectedSlugs" :key="`${index}-${slug}`" class="compare-selector">
          <label :for="`compare-species-${index}`">{{ selectorLabels[index] }}</label>
          <div class="compare-selector-control">
            <select :id="`compare-species-${index}`" :value="slug" @change="selectSpecies(index, $event)">
              <option v-for="item in availableSpecies(index)" :key="item.slug" :value="item.slug">{{ item.commonName }}</option>
            </select>
            <button v-if="selectedSlugs.length > 2" type="button" class="compare-remove" :aria-label="`Remove ${species.find((item) => item.slug === slug)?.commonName ?? 'species'}`" @click="removeSpecies(index)">Remove</button>
          </div>
        </div>
        <button v-if="selectedSlugs.length < 5" type="button" class="compare-add" @click="addSpecies">+ Add another species</button>
      </div>
    </section>

    <section class="compare-scale-section" aria-labelledby="compare-scale-heading">
      <div class="compare-scale-heading">
        <div>
          <p class="eyebrow">Scale lab</p>
          <h2 id="compare-scale-heading">See the difference in size.</h2>
        </div>
        <p class="muted">Bars use the midpoint of each recorded height range. The exact range is shown below each species.</p>
      </div>
      <div class="compare-scale-layout">
        <div class="compare-size-chart" aria-label="Relative height comparison">
          <div class="compare-size-bars">
            <article v-for="item in selectedSpecies" :key="item.id" class="compare-size-item">
              <div class="compare-size-track">
                <div class="compare-size-bar" :style="{ height: sizeBarHeight(item) }">
                  <span>{{ heightLabel(item) }}</span>
                </div>
              </div>
              <strong>{{ item.commonName }}</strong>
              <small>{{ item.scientificName }}</small>
            </article>
          </div>
        </div>
        <div class="compare-scale-model">
          <div class="compare-scale-model-heading">
            <p class="eyebrow">3D reference</p>
            <strong>Adélie penguin</strong>
          </div>
          <SpeciesModelViewer :model-path="adelieModel" :poster="getImage('adelie-hero')?.approvedImageUrl" alt="Interactive 3D model of an Adélie penguin" />
        </div>
      </div>
    </section>

    <section class="compare-results" aria-labelledby="compare-results-title">
      <div class="compare-results-heading">
        <div>
          <p class="eyebrow">A living comparison</p>
          <h2 id="compare-results-title">Different bodies, shared oceans.</h2>
        </div>
        <p class="muted">Scroll horizontally on smaller screens to see every species.</p>
      </div>

      <div class="compare-table-scroll">
        <div class="compare-table compare-table-grid" :style="{ '--compare-columns': selectedSpecies.length }">
          <div class="compare-row compare-header-row">
            <div class="compare-label">Field</div>
            <article v-for="(item, index) in selectedSpecies" :key="item.id" class="compare-species-card">
              <div class="compare-species-image">
                <img v-if="imageFor(item)" :src="imageFor(item)?.thumbnailUrl ?? imageFor(item)?.approvedImageUrl" :alt="imageFor(item)?.alt ?? item.commonName">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <div class="compare-species-copy">
                <p class="eyebrow">{{ item.commonName }}</p>
                <strong>{{ item.scientificName }}</strong>
              </div>
            </article>
          </div>

          <div v-for="row in rows" :key="row.label" class="compare-row compare-data-row">
            <strong class="compare-label">{{ row.label }}</strong>
            <span v-for="(value, index) in row.values" :key="`${row.label}-${selectedSpecies[index]?.id}`" class="compare-value">{{ value }}</span>
          </div>
        </div>
      </div>

      <p class="muted compare-note">Conservation categories include their assessment year. Measurements remain in their recorded units and are not converted or estimated.</p>
    </section>

    <section class="compare-sources" aria-labelledby="compare-sources-title">
      <div class="compare-sources-heading">
        <div>
          <p class="eyebrow">Trace the details</p>
          <h2 id="compare-sources-title">Sources & review.</h2>
        </div>
        <p>Reference links are collected here so the comparison stays easy to scan.</p>
      </div>
      <div class="compare-source-grid">
        <article v-for="source in comparisonSources" :key="source.id" class="compare-source-card">
          <UiIcon name="open" class="compare-source-icon" />
          <div>
            <a :href="source.url" target="_blank" rel="noreferrer">{{ source.title }} <UiIcon name="open" /></a>
            <small>{{ source.organizationOrAuthor }} · accessed {{ source.accessedAt }}</small>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
