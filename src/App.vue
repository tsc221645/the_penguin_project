<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import logo from './assets/The Penguin Project Logo.png'

const appVersion = import.meta.env.VITE_APP_VERSION ?? 'development'
</script>

<template>
  <header class="site-header">
    <div class="container nav-wrap">
      <RouterLink class="brand" to="/"><img class="brand-logo" :src="logo" alt="The Penguin Project"></RouterLink>
      <nav aria-label="Main navigation"><RouterLink to="/species">Explore species</RouterLink><RouterLink to="/compare">Compare</RouterLink><RouterLink to="/habitats">Habitats</RouterLink><RouterLink to="/quiz">Quiz</RouterLink><RouterLink to="/about">About</RouterLink><RouterLink class="nav-button" to="/credits">Credits</RouterLink></nav>
    </div>
  </header>
  <main><RouterView /></main>
  <footer class="site-footer"><div class="container footer-inner"><span>Made with curiosity for the world’s most charming seabirds.</span><span>Version {{ appVersion }}</span><RouterLink to="/credits">Image credits</RouterLink></div></footer>
</template>
