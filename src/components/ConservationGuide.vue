<script setup lang="ts">
import { iucnCategories } from '../content/iucn'
import UiIcon from './UiIcon.vue'
</script>

<template>
  <section class="conservation-guide">
    <div class="guide-heading"><div><p class="eyebrow">Conservation context</p><h2>What the IUCN categories mean</h2></div><a href="https://nrl.iucnredlist.org/" target="_blank" rel="noreferrer">Official IUCN reference <UiIcon name="open" /></a></div>
    <p class="guide-intro">The IUCN Red List uses nine global categories to describe extinction risk and assessment status. Vulnerable, Endangered, and Critically Endangered are collectively considered threatened.</p>
    <div class="category-grid"><article v-for="category in iucnCategories" :key="category.code" :class="{ threatened: category.threatened }"><span class="category-code">{{ category.code }}</span><div><h3>{{ category.name }}</h3><p>{{ category.description }}</p></div></article></div>
  </section>
</template>
