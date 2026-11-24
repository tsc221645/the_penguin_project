<script setup lang="ts">
import { computed, ref } from 'vue'
import HabitatMap from '../components/HabitatMap.vue'
import { getSource, occurrences, species } from '../lib/content'

const selectedSpecies = ref('')
const selected = computed(() => species.find((item) => item.id === selectedSpecies.value))
const visibleOccurrences = computed(() => occurrences.filter((item) => !selectedSpecies.value || item.speciesId === selectedSpecies.value))
const habitatSpecies = computed(() => selected.value ? [selected.value] : species)
</script>

<template>
  <section class="page-heading"><div class="container"><p class="eyebrow">Field guide / habitats</p><h1>Where penguins live</h1><p>Explore reviewed observations while keeping them separate from a species’ broader, generalized range.</p></div></section>
  <section class="container habitats-page">
    <div class="habitat-controls"><label>Species<select v-model="selectedSpecies"><option value="">All 18 species</option><option v-for="item in species" :key="item.id" :value="item.id">{{ item.commonName }}</option></select></label><p class="map-warning">Markers represent individual GBIF observations, not complete distributions or colony locations.</p></div>
    <HabitatMap :species-id="selectedSpecies" />
    <div class="habitat-layout"><section><p class="eyebrow">Generalized habitat</p><h2>{{ selected?.commonName ?? 'All 18 species' }}</h2><ul class="region-list"><li v-for="item in habitatSpecies" :key="item.id"><strong>{{ item.commonName }}</strong><span>{{ item.habitatRegions.join(' · ') }}</span></li></ul></section><aside class="sources"><p class="eyebrow">Map data</p><h3>{{ visibleOccurrences.length }} reviewed observation{{ visibleOccurrences.length === 1 ? '' : 's' }}</h3><p v-if="selected && !visibleOccurrences.length" class="habitat-status">No reviewed GBIF observation is mapped for this species yet. Its generalized habitat is listed beside the map.</p><p v-else class="muted">Coordinates retain the uncertainty supplied by GBIF. They must not be read as the full geographic range.</p><a :href="getSource('gbif-occurrences')?.url" target="_blank" rel="noreferrer">GBIF occurrence source ↗</a><br><a href="https://operations.osmfoundation.org/policies/tiles/" target="_blank" rel="noreferrer">OpenStreetMap tile policy ↗</a></aside></div>
  </section>
</template>
