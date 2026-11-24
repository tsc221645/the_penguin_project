<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { SpeciesRecord } from '../types/content'
import { getImage } from '../lib/content'
defineProps<{ item: SpeciesRecord }>()
</script>
<template>
  <RouterLink class="species-card" :to="`/species/${item.slug}`">
    <div class="card-image" :class="{ 'directory-image': !getImage(item.heroImageId) }"><img v-if="getImage(item.heroImageId)" :src="getImage(item.heroImageId)?.thumbnailUrl || getImage(item.heroImageId)?.approvedImageUrl" :alt="getImage(item.heroImageId)?.alt"><span v-else class="directory-mark">◒</span><span class="card-arrow">↗</span></div>
    <div class="card-copy"><p class="eyebrow">{{ item.scientificName }}</p><h3>{{ item.commonName }}</h3><p>{{ item.intro }}</p><span v-if="item.contentStatus === 'directory'" class="card-status">Directory profile</span></div>
  </RouterLink>
</template>
