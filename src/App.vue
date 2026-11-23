<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <div class="container nav-wrap">
      <RouterLink class="brand" to="/"><span class="brand-mark">◒</span><span>The Penguin<br><em>Project</em></span></RouterLink>
      <nav aria-label="Main navigation"><RouterLink to="/species">Explore species</RouterLink><RouterLink to="/about">About</RouterLink><RouterLink class="nav-button" to="/credits">Credits</RouterLink></nav>
    </div>
  </header>
  <main><RouterView /></main>
  <footer class="site-footer"><div class="container footer-inner"><span>Made with curiosity for the world’s most charming seabirds.</span><RouterLink to="/credits">Image credits</RouterLink></div></footer>
</template>
