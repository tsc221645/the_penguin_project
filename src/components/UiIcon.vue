<script setup lang="ts">
import arrowImage from '../assets/arrow.png'
import openImage from '../assets/open.png'

type IconName = 'arrow-left' | 'arrow-right' | 'open' | 'refresh'

withDefaults(defineProps<{ name?: IconName }>(), { name: 'arrow-right' })
</script>

<template>
  <img v-if="name !== 'refresh'" class="ui-icon" :class="`ui-icon--${name}`" :src="name === 'open' ? openImage : arrowImage" alt="" aria-hidden="true">
  <svg v-else class="ui-icon ui-icon--refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path d="M20 11a8 8 0 1 0 2 5.3M20 5v6h-6" />
  </svg>
</template>
