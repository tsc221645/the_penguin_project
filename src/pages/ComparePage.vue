<script setup lang="ts">
import { computed, ref } from 'vue'
import { species } from '../lib/content'
import { compareSpecies } from '../lib/explore'

const leftSlug = ref('adelie')
const rightSlug = ref('emperor')
const left = computed(() => species.find((item) => item.slug === leftSlug.value) ?? species[0])
const right = computed(() => species.find((item) => item.slug === rightSlug.value) ?? species[1])
const rows = computed(() => compareSpecies(left.value, right.value))
</script>

<template>
  <section class="page-heading"><div class="container"><p class="eyebrow">Field guide / compare</p><h1>Side by side</h1><p>Put two penguins next to each other and see how their lives differ.</p></div></section>
  <section class="container compare-page">
    <div class="compare-selectors"><label>First species<select v-model="leftSlug"><option v-for="item in species" :key="item.slug" :value="item.slug">{{ item.commonName }}</option></select></label><span>×</span><label>Second species<select v-model="rightSlug"><option v-for="item in species" :key="item.slug" :value="item.slug">{{ item.commonName }}</option></select></label></div>
    <div class="compare-header"><div></div><div><p class="eyebrow">{{ left.commonName }}</p><strong>{{ left.scientificName }}</strong></div><div><p class="eyebrow">{{ right.commonName }}</p><strong>{{ right.scientificName }}</strong></div></div>
    <div class="compare-table"><div v-for="row in rows" :key="row.label" class="compare-row"><strong>{{ row.label }}</strong><span>{{ row.left }}</span><span>{{ row.right }}</span></div></div>
    <p class="muted compare-note">Conservation categories are shown with their assessment year. Measurements remain in their recorded units and are not converted or estimated.</p>
  </section>
</template>
