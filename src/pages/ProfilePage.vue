<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import ImageCredit from '../components/ImageCredit.vue'
import SourceList from '../components/SourceList.vue'
import SpeciesGallery from '../components/SpeciesGallery.vue'
import { getImage, getSource, getSpecies } from '../lib/content'

const route = useRoute()
const item = computed(() => getSpecies(String(route.params.slug)))
</script>

<template>
  <div v-if="item" class="profile">
    <section class="profile-hero" :class="{ 'directory-profile': item.contentStatus === 'directory' }">
      <div class="container profile-grid">
        <div v-if="getImage(item.heroImageId)" class="profile-image">
          <img :src="getImage(item.heroImageId)?.approvedImageUrl" :alt="getImage(item.heroImageId)?.alt">
          <ImageCredit :image-id="item.heroImageId" />
        </div>
        <div v-else class="profile-image directory-profile-image"><span class="directory-mark">◒</span></div>
        <div class="profile-intro">
          <RouterLink class="back-link" to="/species">← All species</RouterLink>
          <p class="eyebrow">{{ item.scientificName }}</p>
          <h1>{{ item.commonName }}</h1>
          <p class="intro">{{ item.intro }}</p>
          <div class="quick-facts">
            <div><strong>{{ item.conservation.status }}</strong><span>status · {{ item.conservation.assessmentYear }}</span></div>
            <div><strong>{{ item.habitatRegions[0] }}</strong><span>recorded range</span></div>
          </div>
        </div>
      </div>
    </section>
    <section class="container profile-body">
      <div class="content-column">
        <SpeciesGallery :image-ids="item.galleryImageIds" />
        <p class="eyebrow">{{ item.contentStatus === 'directory' ? 'Directory profile' : 'In the field' }}</p>
        <h2>A life shaped by<br><i>ice and ocean.</i></h2>
        <p class="body-copy">{{ item.description }}</p>
        <div class="detail-grid">
          <div><h3>Habitat</h3><ul><li v-for="region in item.habitatRegions" :key="region">{{ region }}</li></ul></div>
          <div><h3>Diet</h3><ul><li v-for="food in item.dietItems" :key="food">{{ food }}</li></ul></div>
          <div><h3>Recognize them by</h3><ul><li v-for="trait in item.traits" :key="trait">{{ trait }}</li></ul></div>
        </div>
        <div class="detail-grid profile-secondary-details">
          <div><h3>Behavior</h3><ul><li v-for="entry in item.behavior" :key="entry">{{ entry }}</li></ul></div>
          <div><h3>Breeding</h3><ul><li v-for="entry in item.breeding" :key="entry">{{ entry }}</li></ul></div>
          <div><h3>Breeding regions</h3><ul><li v-for="region in item.breedingRegions" :key="region">{{ region }}</li></ul></div>
        </div>
        <div class="facts"><p class="eyebrow">Small wonders</p><ul><li v-for="fact in item.facts" :key="fact.id"><span>{{ fact.text }}</span><small><a v-for="sourceId in fact.sourceIds" :key="sourceId" :href="getSource(sourceId)?.url" target="_blank" rel="noreferrer">Source ↗</a></small></li></ul></div>
      </div>
      <aside class="sources"><p class="eyebrow">Trace the details</p><h3>Sources & review</h3><p class="muted">This entry was last reviewed {{ item.lastReviewed }}. Conservation status reflects the dated assessment shown above.</p><SourceList :source-ids="item.sourceIds" /></aside>
    </section>
  </div>
  <div v-else class="container empty-state"><h2>That penguin wandered off.</h2><RouterLink class="text-link" to="/species">Return to the collection →</RouterLink></div>
</template>
