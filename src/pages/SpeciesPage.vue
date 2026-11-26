<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SpeciesCard from '../components/SpeciesCard.vue'
import UiIcon from '../components/UiIcon.vue'
import { species } from '../lib/content'
import { filterSpecies, getRandomSpecies, getRegions } from '../lib/explore'
import type { ConservationStatus } from '../types/content'

const query = ref('')
const status = ref('')
const region = ref('')
const filtered = computed(() => filterSpecies(species, { query: query.value, status: status.value as ConservationStatus | '', region: region.value }))
const regions = getRegions(species)
const randomSpecies = () => { const target = getRandomSpecies(filtered.value.length ? filtered.value : species); if (target) window.location.href = `/species/${target.slug}` }
</script>

<template>
  <section class="page-heading"><div class="container"><p class="eyebrow">Field guide / 01</p><h1>Explore species</h1><p>Search all 18 recognized species, then filter by the data currently available.</p></div></section>
  <section class="container directory">
    <div class="directory-tools"><label class="search"><span>⌕</span><input v-model="query" type="search" placeholder="Search by common or scientific name" aria-label="Search species"></label><div class="filter-row"><label>Conservation<select v-model="status"><option value="">All statuses</option><option>Least Concern</option><option>Near Threatened</option><option>Vulnerable</option><option>Endangered</option><option>Critically Endangered</option></select></label><label>Region<select v-model="region"><option value="">All regions</option><option v-for="item in regions" :key="item">{{ item }}</option></select></label><button class="button secondary-button" type="button" @click="randomSpecies">Surprise me <span><UiIcon name="arrow-right" /></span></button></div></div>
    <div v-if="filtered.length" class="directory-result"><p class="muted">{{ filtered.length }} species found</p><div class="species-grid"><SpeciesCard v-for="item in filtered" :key="item.id" :item="item" /></div></div>
    <div v-else class="empty-state"><h2>No penguins found.</h2><p>Try a common name such as “emperor” or clear one of the filters.</p><RouterLink class="text-link" to="/species">Clear directory <span><UiIcon name="arrow-right" /></span></RouterLink></div>
  </section>
</template>
