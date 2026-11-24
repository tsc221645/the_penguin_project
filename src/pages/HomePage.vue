<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SpeciesCard from '../components/SpeciesCard.vue'
import { getImage, species } from '../lib/content'

const heroSpecies = computed(() => species.filter((item) => getImage(item.heroImageId)))
const currentHeroIndex = ref(0)
const isHeroPaused = ref(false)
let heroTimer: ReturnType<typeof setInterval> | undefined

const activeHero = computed(() => {
  const item = heroSpecies.value[currentHeroIndex.value]
  return item ? { item, image: getImage(item.heroImageId)! } : undefined
})

function stopHeroAutoPlay() {
  if (heroTimer) { clearInterval(heroTimer); heroTimer = undefined }
}

function startHeroAutoPlay() {
  stopHeroAutoPlay()
  if (!isHeroPaused.value && heroSpecies.value.length > 1) heroTimer = setInterval(nextHero, 5000)
}

function nextHero() { currentHeroIndex.value = (currentHeroIndex.value + 1) % heroSpecies.value.length }
function previousHero() { currentHeroIndex.value = (currentHeroIndex.value - 1 + heroSpecies.value.length) % heroSpecies.value.length }
function pauseHero() { isHeroPaused.value = true; stopHeroAutoPlay() }
function resumeHero() { isHeroPaused.value = false; startHeroAutoPlay() }

onMounted(startHeroAutoPlay)
onBeforeUnmount(stopHeroAutoPlay)
</script>
<template>
  <section class="hero"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">A field guide to the curious</p><h1>Meet the<br><span>penguins.</span></h1><p class="hero-lede">A calm corner of the internet for discovering the remarkable birds of the southern seas.</p><RouterLink class="button" to="/species">Start exploring <span>→</span></RouterLink></div><div class="hero-art" @mouseenter="pauseHero" @mouseleave="resumeHero" @focusin="pauseHero" @focusout="resumeHero"><div class="sun"></div><div class="hero-ice"></div><img v-if="activeHero" :key="activeHero.item.id" class="hero-carousel-image" :src="activeHero.image.approvedImageUrl" :alt="activeHero.image.alt"><span class="hero-species-name">{{ activeHero?.item.commonName }}</span><span class="art-label">{{ String(currentHeroIndex + 1).padStart(2, '0') }} / {{ String(heroSpecies.length).padStart(2, '0') }}</span><div v-if="heroSpecies.length > 1" class="hero-carousel-controls"><button type="button" aria-label="Previous featured species" @click="previousHero">←</button><button type="button" aria-label="Next featured species" @click="nextHero">→</button></div></div></div></section>
  <section class="section container"><div class="section-heading"><div><p class="eyebrow">The collection</p><h2>18 species,<br><i>many ways</i> to thrive.</h2></div><RouterLink class="text-link" to="/species">View all species <span>→</span></RouterLink></div><div class="species-grid"> <SpeciesCard v-for="item in species" :key="item.id" :item="item" /></div></section>
  <section class="callout"><div class="container callout-inner"><p class="eyebrow">Good to know</p><h2>Every fact has a trail.<br>Every image has a credit.</h2><p>We believe learning about wildlife should also teach us how to care for the sources behind it.</p><RouterLink class="text-link light" to="/about">Our approach <span>→</span></RouterLink></div></section>
</template>

<style scoped>
.hero-art .hero-carousel-image { width: min(74%, 400px); height: 500px; object-fit: cover; object-position: center; border-radius: 2px; box-shadow: 0 22px 35px #294d581f; animation: hero-image-in .55s ease both; }
.hero-species-name { position: absolute; left: 50%; bottom: 48px; z-index: 2; width: min(74%, 400px); padding: 28px 14px 12px; transform: translateX(-50%); color: #fff; background: linear-gradient(transparent, #193044c9); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; }
.hero-art .art-label { top: auto; right: 0; bottom: 16px; }
.hero-carousel-controls { position: absolute; right: 0; bottom: 58px; z-index: 3; display: flex; gap: 8px; }
.hero-carousel-controls button { width: 34px; height: 34px; border: 1px solid #b9cbc7; border-radius: 50%; background: #fff; color: #1c4e62; cursor: pointer; font-size: 18px; transition: background-color .25s ease, color .25s ease, transform .25s ease; }
.hero-carousel-controls button:hover { background: #1c4e62; color: #fff; transform: translateY(-2px); }
@keyframes hero-image-in { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@media (max-width: 700px) { .hero-art .hero-carousel-image { width: 72%; height: 330px; } .hero-species-name { width: 72%; bottom: 32px; } .hero-carousel-controls { bottom: 42px; } .hero-art .art-label { bottom: 10px; } }
@media (prefers-reduced-motion: reduce) { .hero-carousel-image { animation: none; } }
</style>
