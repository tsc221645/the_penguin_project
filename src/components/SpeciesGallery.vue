<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getImage } from '../lib/content'
import type { ImageCategory, ImageRecord } from '../types/content'

const props = defineProps<{ imageIds: string[] }>()
const selectedCategory = ref<ImageCategory | 'all'>('all')
const currentIndex = ref(0)
const isPaused = ref(false)
const imageError = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
const categories = computed(() => [...new Set(props.imageIds.flatMap((id) => getImage(id)?.categories ?? []))])
function matchesCategory(image: ImageRecord | undefined): image is ImageRecord {
  if (!image) return false
  return selectedCategory.value === 'all' || image.categories.includes(selectedCategory.value)
}
const visibleImages = computed(() => props.imageIds
  .map((id) => getImage(id))
  .filter(matchesCategory))
const activeImage = computed(() => visibleImages.value[currentIndex.value])
const hasMultipleImages = computed(() => visibleImages.value.length > 1)

function stopAutoPlay() {
  if (timer) { clearInterval(timer); timer = undefined }
}

function startAutoPlay() {
  stopAutoPlay()
  if (!isPaused.value && hasMultipleImages.value) timer = setInterval(next, 5000)
}

function next() {
  if (!hasMultipleImages.value) return
  currentIndex.value = (currentIndex.value + 1) % visibleImages.value.length
  imageError.value = false
}

function previous() {
  if (!hasMultipleImages.value) return
  currentIndex.value = (currentIndex.value - 1 + visibleImages.value.length) % visibleImages.value.length
  imageError.value = false
}

function goTo(index: number) {
  currentIndex.value = index
  imageError.value = false
}

function pause() { isPaused.value = true; stopAutoPlay() }
function resume() { isPaused.value = false; startAutoPlay() }

watch([selectedCategory, visibleImages], () => {
  currentIndex.value = 0
  imageError.value = false
  startAutoPlay()
})

onMounted(startAutoPlay)
onBeforeUnmount(stopAutoPlay)
</script>

<template>
  <section v-if="visibleImages.length" class="gallery" aria-label="Species image gallery">
    <div v-if="categories.length > 1" class="gallery-controls"><label for="gallery-category">Gallery view</label><select id="gallery-category" v-model="selectedCategory"><option value="all">All images</option><option v-for="category in categories" :key="category" :value="category">{{ category }}</option></select></div>
    <div class="carousel" @mouseenter="pause" @mouseleave="resume" @focusin="pause" @focusout="resume">
      <div class="carousel-stage"><img v-if="!imageError && activeImage" :key="activeImage.id" :src="activeImage.approvedImageUrl" :alt="activeImage.alt" @error="imageError = true"><div v-else class="map-fallback" role="status">This image could not be loaded. Choose another gallery image.</div></div>
      <div v-if="activeImage" class="carousel-caption"><a :href="activeImage.originalFileUrl" target="_blank" rel="noreferrer">{{ activeImage.attributionText }}</a></div>
      <div v-if="hasMultipleImages" class="carousel-nav"><button class="carousel-control" type="button" aria-label="Previous image" @click="previous">←</button><div class="carousel-dots" aria-label="Choose gallery image"><button v-for="(image, index) in visibleImages" :key="image.id" class="carousel-dot" type="button" :aria-label="`Go to image ${index + 1}`" :aria-pressed="index === currentIndex" @click="goTo(index)"></button></div><button class="carousel-control" type="button" aria-label="Next image" @click="next">→</button></div>
    </div>
  </section>
</template>
