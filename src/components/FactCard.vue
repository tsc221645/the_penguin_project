<script setup lang="ts">
import SourceList from './SourceList.vue'
import type { FactRecord } from '../types/content'

defineProps<{ fact: FactRecord }>()
</script>

<template>
  <article class="fact-card">
    <p class="eyebrow">Did you know?</p>
    <p class="fact-card-text">{{ fact.text }}</p>
    <SourceList :source-ids="fact.sourceIds" />
  </article>
</template>
