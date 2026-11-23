<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { SpeciesRecord } from '../types/content'
import { getImage } from '../lib/content'
defineProps<{ item: SpeciesRecord }>()
</script>
<template>
  <RouterLink class="species-card" :to="`/species/${item.slug}`">
    <div class="card-image"><img :src="getImage(item.heroImageId)?.localPath" :alt="getImage(item.heroImageId)?.alt"><span class="card-arrow">↗</span></div>
    <div class="card-copy"><p class="eyebrow">{{ item.scientificName }}</p><h3>{{ item.commonName }}</h3><p>{{ item.intro }}</p></div>
  </RouterLink>
</template>
