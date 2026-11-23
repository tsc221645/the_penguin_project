<script setup lang="ts">
import { computed, ref } from 'vue'
import { getImage } from '../lib/content'
import type { ImageCategory } from '../types/content'

const props = defineProps<{ imageIds: string[] }>()
const selectedCategory = ref<ImageCategory | 'all'>('all')
const categories = computed(() => [...new Set(props.imageIds.flatMap((id) => getImage(id)?.categories ?? []))])
const visibleImages = computed(() => props.imageIds.map((id) => getImage(id)).filter((image) => image && (selectedCategory.value === 'all' || image.categories.includes(selectedCategory.value))))
</script>

<template>
  <div class="gallery" v-if="visibleImages.length">
    <div class="gallery-controls" v-if="categories.length > 1"><label for="gallery-category">Gallery view</label><select id="gallery-category" v-model="selectedCategory"><option value="all">All images</option><option v-for="category in categories" :key="category" :value="category">{{ category }}</option></select></div>
    <div class="gallery-grid"><figure v-for="image in visibleImages" :key="image!.id"><img :src="image!.approvedImageUrl" :alt="image!.alt"><figcaption><a :href="image!.originalFileUrl" target="_blank" rel="noreferrer">{{ image!.attributionText }}</a></figcaption></figure></div>
  </div>
</template>
