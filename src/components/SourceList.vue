<script setup lang="ts">
import UiIcon from './UiIcon.vue'
import { getSource } from '../lib/content'
defineProps<{ sourceIds: string[] }>()
</script>
<template><div class="source-list"><div v-for="id in sourceIds" :key="id" class="source-item"><span class="source-number"><UiIcon name="open" /></span><div><a :href="getSource(id)?.url" target="_blank" rel="noreferrer">{{ getSource(id)?.title }}</a><small>{{ getSource(id)?.organizationOrAuthor }} · accessed 23 Nov 2026</small></div></div></div></template>
