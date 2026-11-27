<script setup lang="ts">
import { ref } from 'vue'
import '@google/model-viewer'

defineProps<{
  modelPath: string
  poster?: string
  alt: string
}>()

const modelStatus = ref<'loading' | 'ready' | 'error'>('loading')
</script>

<template>
  <div class="species-model-viewer" :class="`species-model-viewer--${modelStatus}`">
    <model-viewer
      v-if="modelStatus !== 'error'"
      :src="modelPath"
      :poster="poster"
      :alt="alt"
      camera-controls
      auto-rotate
      auto-rotate-delay="900"
      rotation-per-second="18deg"
      camera-orbit="0deg 75deg 2.4m"
      field-of-view="30deg"
      shadow-intensity="0.8"
      touch-action="pan-y"
      interaction-prompt="auto"
      ar
      @load="modelStatus = 'ready'"
      @error="modelStatus = 'error'"
    >
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <button slot="ar-button" type="button" class="model-ar-button">View in AR</button>
    </model-viewer>

    <div v-if="modelStatus === 'loading'" class="model-viewer-status" aria-live="polite">Loading 3D specimen…</div>

    <div v-else-if="modelStatus === 'error'" class="model-viewer-fallback">
      <img v-if="poster" :src="poster" :alt="alt">
      <p>3D preview unavailable on this browser. The species profile is still available through the image and field notes.</p>
    </div>

    <p v-if="modelStatus === 'ready'" class="model-viewer-hint">Drag to rotate · scroll or pinch to zoom</p>
  </div>
</template>
