<script setup lang="ts">
import { computed } from 'vue'
import { getImage } from '../lib/content'

const props = withDefaults(defineProps<{ imageId: string; label?: string }>(), { label: 'Image credits' })
const image = computed(() => getImage(props.imageId))
</script>

<template>
  <details v-if="image" class="image-details">
    <summary>{{ label }}</summary>
    <div class="image-details-panel">
      <p class="image-details-title">{{ image.title }}</p>
      <dl>
        <div><dt>Creator</dt><dd>{{ image.author }}</dd></div>
        <div><dt>License</dt><dd><a :href="image.licenseUrl" target="_blank" rel="noreferrer">{{ image.licenseId }}</a></dd></div>
        <div><dt>Verified</dt><dd>{{ image.verifiedAt }}</dd></div>
        <div><dt>Alt text</dt><dd>{{ image.alt }}</dd></div>
        <div v-if="image.modifications.length"><dt>Modifications</dt><dd>{{ image.modifications.join(', ') }}</dd></div>
      </dl>
      <p class="image-details-attribution">{{ image.attributionText }}</p>
      <a class="image-details-source" :href="image.originalFileUrl" target="_blank" rel="noreferrer">View original image record</a>
    </div>
  </details>
</template>

<style scoped>
.image-details { font-size: 11px; }
.image-details summary { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; color: inherit; text-decoration: underline; text-underline-offset: 3px; }
.image-details summary::marker { color: var(--logo-blue); }
.image-details-panel { margin-top: 10px; padding: 14px; background: #fff; border: 1px solid #d7e2e0; color: #536d74; text-align: left; }
.image-details-title { margin: 0 0 10px; color: #193044; font-weight: 700; }
.image-details-panel dl { display: grid; gap: 6px; margin: 0; }
.image-details-panel dl div { display: grid; grid-template-columns: 80px 1fr; gap: 8px; }
.image-details-panel dt { color: #779094; }
.image-details-panel dd { margin: 0; }
.image-details-panel a { text-decoration: underline; }
.image-details-attribution { margin: 12px 0 8px; }
.image-details-source { color: #1c4e62; font-weight: 700; }
</style>
