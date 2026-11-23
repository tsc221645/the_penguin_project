<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SpeciesCard from '../components/SpeciesCard.vue'
import { species } from '../lib/content'
</script>
<template>
  <section class="hero"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">A field guide to the curious</p><h1>Meet the<br><span>penguins.</span></h1><p class="hero-lede">A calm corner of the internet for discovering the remarkable birds of the southern seas.</p><RouterLink class="button" to="/species">Start exploring <span>→</span></RouterLink></div><div class="hero-art"><div class="sun"></div><div class="hero-ice"></div><img src="/images/emperor.svg" alt="Illustrated emperor penguin standing on sea ice"><span class="art-label">01 / 03</span></div></div></section>
  <section class="section container"><div class="section-heading"><div><p class="eyebrow">The collection</p><h2>Three species,<br><i>three ways</i> to thrive.</h2></div><RouterLink class="text-link" to="/species">View all species <span>→</span></RouterLink></div><div class="species-grid"> <SpeciesCard v-for="item in species" :key="item.id" :item="item" /></div></section>
  <section class="callout"><div class="container callout-inner"><p class="eyebrow">Good to know</p><h2>Every fact has a trail.<br>Every image has a credit.</h2><p>We believe learning about wildlife should also teach us how to care for the sources behind it.</p><RouterLink class="text-link light" to="/about">Our approach <span>→</span></RouterLink></div></section>
</template>
