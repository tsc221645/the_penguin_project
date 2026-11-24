import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import './styles.css'
import 'leaflet/dist/leaflet.css'

createApp(App).use(router).mount('#app')
