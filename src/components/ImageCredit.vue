<script setup lang="ts">
import ImageDetails from './ImageDetails.vue'
defineProps<{ imageId: string }>()
</script>
<template><div class="image-credit"><ImageDetails :image-id="imageId" /></div></template>
