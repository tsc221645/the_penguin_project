<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import behaviorIcon from '../assets/behavior.png'
import breedingIcon from '../assets/breeding.png'
import breedingRegionsIcon from '../assets/breeding_regions.png'
import dietIcon from '../assets/diet.png'
import homeIcon from '../assets/home.png'
import recognizeIcon from '../assets/recognize.png'
import sourcesIcon from '../assets/sources.png'
import ImageCredit from '../components/ImageCredit.vue'
import HabitatMap from '../components/HabitatMap.vue'
import SourceList from '../components/SourceList.vue'
import SpeciesGallery from '../components/SpeciesGallery.vue'
import UiIcon from '../components/UiIcon.vue'
import { getImage, getSource, getSpecies } from '../lib/content'

const route = useRoute()
const item = computed(() => getSpecies(String(route.params.slug)))
const highlightedRegion = ref<string>()

const profileIcons = {
  behavior: behaviorIcon,
  breeding: breedingIcon,
  breedingRegions: breedingRegionsIcon,
  diet: dietIcon,
  habitat: homeIcon,
  recognize: recognizeIcon,
  sources: sourcesIcon,
}
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
          <RouterLink class="back-link" to="/species"><UiIcon name="arrow-left" /> All species</RouterLink>
          <p class="eyebrow">{{ item.scientificName }}</p>
          <h1>{{ item.commonName }}</h1>
          <p class="intro">{{ item.intro }}</p>
        </div>
      </div>
    </section>
    <section class="container profile-body">
      <div class="content-column">
        <section class="profile-description" aria-labelledby="profile-description-heading">
          <p class="eyebrow">{{ item.contentStatus === 'directory' ? 'Directory profile' : 'In the field' }}</p>
          <h2 id="profile-description-heading">A life shaped by<br><i>ice and ocean.</i></h2>
          <p class="body-copy">{{ item.description }}</p>
          <div class="detail-grid">
            <div>
              <div class="detail-heading"><img :src="profileIcons.habitat" alt="" aria-hidden="true"><h3>Habitat</h3></div>
              <ul><li v-for="region in item.habitatRegions" :key="region">{{ region }}</li></ul>
            </div>
            <div>
              <div class="detail-heading"><img :src="profileIcons.diet" alt="" aria-hidden="true"><h3>Diet</h3></div>
              <ul><li v-for="food in item.dietItems" :key="food">{{ food }}</li></ul>
            </div>
            <div>
              <div class="detail-heading"><img :src="profileIcons.recognize" alt="" aria-hidden="true"><h3>Recognize them by</h3></div>
              <ul><li v-for="trait in item.traits" :key="trait">{{ trait }}</li></ul>
            </div>
          </div>
          <div class="detail-grid profile-secondary-details">
            <div>
              <div class="detail-heading"><img :src="profileIcons.behavior" alt="" aria-hidden="true"><h3>Behavior</h3></div>
              <ul><li v-for="entry in item.behavior" :key="entry">{{ entry }}</li></ul>
            </div>
            <div>
              <div class="detail-heading"><img :src="profileIcons.breeding" alt="" aria-hidden="true"><h3>Breeding</h3></div>
              <ul><li v-for="entry in item.breeding" :key="entry">{{ entry }}</li></ul>
            </div>
            <div>
              <div class="detail-heading"><img :src="profileIcons.breedingRegions" alt="" aria-hidden="true"><h3>Breeding regions</h3></div>
              <ul><li v-for="region in item.breedingRegions" :key="region">{{ region }}</li></ul>
            </div>
          </div>
        </section>

        <section class="profile-facts" aria-labelledby="profile-facts-heading">
          <div class="profile-section-heading">
            <div>
              <p class="eyebrow">Field notes</p>
              <h2 id="profile-facts-heading">Facts worth knowing.</h2>
            </div>
          </div>
          <div class="profile-fact-grid">
            <article>
              <span>Conservation</span>
              <strong>{{ item.conservation.status }}</strong>
              <small>Assessment {{ item.conservation.assessmentYear }}</small>
            </article>
            <article>
              <span>Recorded range</span>
              <strong>{{ item.habitatRegions[0] }}</strong>
              <small>Generalized habitat</small>
            </article>
            <article>
              <span>Typical diet</span>
              <strong>{{ item.dietItems.slice(0, 2).join(' · ') }}</strong>
              <small>Common food sources</small>
            </article>
          </div>
          <div class="facts">
            <ul>
              <li v-for="fact in item.facts" :key="fact.id">
                <span>{{ fact.text }}</span>
                <small><a v-for="sourceId in fact.sourceIds" :key="sourceId" :href="getSource(sourceId)?.url" target="_blank" rel="noreferrer">Source <UiIcon name="open" /></a></small>
              </li>
            </ul>
          </div>
        </section>

        <section class="profile-habitat" aria-labelledby="profile-habitat-heading">
          <div class="profile-section-heading">
            <div>
              <p class="eyebrow">In the wild</p>
              <h2 id="profile-habitat-heading">Where to find<br><i>{{ item.commonName }}</i></h2>
            </div>
          </div>
          <p class="body-copy">The map shows a generalized habitat anchor for this species and any reviewed GBIF observations available in the project. It is context, not a complete distribution map.</p>
          <HabitatMap :species-id="item.id" :highlighted-region="highlightedRegion" />
          <ul class="profile-region-list" aria-label="Highlight a habitat region">
            <li v-for="region in item.habitatRegions" :key="region">
              <button type="button" :class="{ 'is-active': highlightedRegion === region }" :aria-pressed="highlightedRegion === region" @click="highlightedRegion = highlightedRegion === region ? undefined : region">{{ region }}</button>
            </li>
          </ul>
        </section>

        <section class="profile-gallery-section" aria-labelledby="profile-gallery-heading">
          <div class="profile-section-heading">
            <div>
              <p class="eyebrow">Field notes</p>
              <h2 id="profile-gallery-heading">More images.</h2>
            </div>
          </div>
          <SpeciesGallery :image-ids="item.galleryImageIds" />
        </section>
      </div>
      <aside class="sources">
        <div class="sources-heading"><img :src="profileIcons.sources" alt="" aria-hidden="true"><div><p class="eyebrow">Trace the details</p><h3>Sources & review</h3></div></div>
        <p class="muted">This entry was last reviewed {{ item.lastReviewed }}. Conservation status reflects the dated assessment shown above.</p>
        <SourceList :source-ids="item.sourceIds" />
      </aside>
    </section>
  </div>
  <div v-else class="container empty-state"><h2>That penguin wandered off.</h2><RouterLink class="text-link" to="/species">Return to the collection <span><UiIcon name="arrow-right" /></span></RouterLink></div>
</template>
