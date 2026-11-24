<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import { getSpecies, occurrences } from '../lib/content'

const props = defineProps<{ speciesId: string }>()
const mapElement = ref<HTMLElement | null>(null)
const mapError = ref(false)
let map: L.Map | undefined
let layer: L.LayerGroup | undefined

function renderMarkers() {
  if (!map) return
  layer?.clearLayers()
  layer = L.layerGroup().addTo(map)
  const selected = occurrences.filter((occurrence) => !props.speciesId || occurrence.speciesId === props.speciesId)
  if (!selected.length) return
  const bounds = L.latLngBounds([])
  for (const occurrence of selected) {
    const species = getSpecies(occurrence.speciesId)
    const marker = L.circleMarker([occurrence.latitude, occurrence.longitude], { radius: 7, color: '#d56c46', fillColor: '#d56c46', fillOpacity: 0.85 })
    marker.bindPopup(`<strong>${species?.commonName ?? occurrence.speciesId}</strong><br>GBIF observation<br>${occurrence.observedAt ?? 'Date unavailable'}<br>Uncertainty: ${occurrence.uncertaintyMeters?.toLocaleString() ?? 'not available'} m`)
    marker.addTo(layer)
    bounds.extend([occurrence.latitude, occurrence.longitude])
  }
  map.fitBounds(bounds.pad(0.4), { maxZoom: 5 })
}

onMounted(() => {
  try {
    if (!mapElement.value) return
    map = L.map(mapElement.value, { scrollWheelZoom: false }).setView([-65, 0], 3)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>', maxZoom: 18 }).addTo(map)
    renderMarkers()
  } catch {
    mapError.value = true
  }
})
watch(() => props.speciesId, renderMarkers)
onBeforeUnmount(() => map?.remove())
</script>

<template>
  <div class="map-shell">
    <div v-if="mapError" class="map-fallback">The interactive map could not load. Use the region list below instead.</div>
    <div ref="mapElement" class="habitat-map" aria-label="Map of selected penguin observations"></div>
  </div>
</template>
