import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SpeciesPage from './pages/SpeciesPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import AboutPage from './pages/AboutPage.vue'
import CreditsPage from './pages/CreditsPage.vue'

export const router = createRouter({ history: createWebHistory(), routes: [
  { path: '/', component: HomePage }, { path: '/species', component: SpeciesPage },
  { path: '/species/:slug', component: ProfilePage }, { path: '/about', component: AboutPage },
  { path: '/credits', component: CreditsPage }, { path: '/:pathMatch(.*)*', redirect: '/species' },
] })
