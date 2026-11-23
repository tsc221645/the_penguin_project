<script setup lang="ts">
import { computed, ref } from 'vue'
import SpeciesCard from '../components/SpeciesCard.vue'
import { species } from '../lib/content'
const query = ref('')
const filtered = computed(() => species.filter((item) => `${item.commonName} ${item.scientificName}`.toLowerCase().includes(query.value.toLowerCase())))
</script>
<template><section class="page-heading"><div class="container"><p class="eyebrow">Field guide / 01</p><h1>Explore species</h1><p>Start with three well-sourced portraits of life in the southern seas.</p></div></section><section class="container directory"><label class="search"><span>⌕</span><input v-model="query" type="search" placeholder="Search by common or scientific name" aria-label="Search species"></label><div class="species-grid" v-if="filtered.length"><SpeciesCard v-for="item in filtered" :key="item.id" :item="item" /></div><div v-else class="empty-state"><h2>No penguins found.</h2><p>Try a common name such as “emperor”.</p></div></section></template>
