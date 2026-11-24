import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SpeciesPage from './pages/SpeciesPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import AboutPage from './pages/AboutPage.vue'
import CreditsPage from './pages/CreditsPage.vue'
import ComparePage from './pages/ComparePage.vue'
import HabitatsPage from './pages/HabitatsPage.vue'
import QuizPage from './pages/QuizPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (_to, _from, savedPosition) => savedPosition ?? { top: 0, left: 0 },
  routes: [
  { path: '/', component: HomePage }, { path: '/species', component: SpeciesPage },
  { path: '/species/:slug', component: ProfilePage }, { path: '/compare', component: ComparePage }, { path: '/habitats', component: HabitatsPage }, { path: '/quiz', component: QuizPage }, { path: '/about', component: AboutPage },
  { path: '/credits', component: CreditsPage }, { path: '/:pathMatch(.*)*', redirect: '/species' },
] })
