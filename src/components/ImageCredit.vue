<script setup lang="ts">
import { getImage } from '../lib/content'
defineProps<{ imageId: string }>()
</script>
<template><p v-if="getImage(imageId)" class="image-credit">Image: <a :href="getImage(imageId)!.licenseUrl" target="_blank" rel="noreferrer">{{ getImage(imageId)!.attributionText }}</a></p></template>
