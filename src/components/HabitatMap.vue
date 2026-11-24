<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import { getSpecies, habitatAnchors, occurrences } from '../lib/content'

const NATURAL_EARTH_GEOJSON_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.json'

const props = defineProps<{ speciesId: string }>()
const mapElement = ref<HTMLElement | null>(null)
const mapError = ref(false)
let map: L.Map | undefined
let layer: L.LayerGroup | undefined
let naturalEarthLayer: L.GeoJSON | undefined

async function loadNaturalEarthLayer() {
  if (!map) return
  try {
    const response = await fetch(NATURAL_EARTH_GEOJSON_URL)
    if (!response.ok) throw new Error(`Natural Earth request failed: ${response.status}`)
    const data = await response.json()
    if (!map) return
    naturalEarthLayer = L.geoJSON(data, { style: { color: '#9dbbb5', weight: 1, fillColor: '#d8e8e3', fillOpacity: 0.72 } }).addTo(map)
    naturalEarthLayer.bringToBack()
  } catch {
    // The OSM basemap and accessible habitat list remain usable if the overlay is unavailable.
  }
}

function renderMarkers() {
  if (!map) return
  layer?.clearLayers()
  layer = L.layerGroup().addTo(map)
  const selected = occurrences.filter((occurrence) => !props.speciesId || occurrence.speciesId === props.speciesId)
  const selectedAnchors = habitatAnchors.filter((anchor) => !props.speciesId || anchor.speciesId === props.speciesId)
  const bounds = L.latLngBounds([])
  for (const anchor of selectedAnchors) {
    const species = getSpecies(anchor.speciesId)
    const marker = L.circleMarker([anchor.latitude, anchor.longitude], { radius: 8, color: '#1c4e62', fillColor: '#8db0b4', fillOpacity: 0.9, weight: 2 })
    marker.bindPopup(`<strong>${species?.commonName ?? anchor.speciesId}</strong><br>Generalized habitat reference<br>Not an observation or colony location`)
    marker.addTo(layer)
    bounds.extend([anchor.latitude, anchor.longitude])
  }
  for (const occurrence of selected) {
    const species = getSpecies(occurrence.speciesId)
    const marker = L.circleMarker([occurrence.latitude, occurrence.longitude], { radius: 7, color: '#d56c46', fillColor: '#d56c46', fillOpacity: 0.85 })
    marker.bindPopup(`<strong>${species?.commonName ?? occurrence.speciesId}</strong><br>GBIF observation<br>${occurrence.observedAt ?? 'Date unavailable'}<br>Uncertainty: ${occurrence.uncertaintyMeters?.toLocaleString() ?? 'not available'} m`)
    marker.addTo(layer)
    bounds.extend([occurrence.latitude, occurrence.longitude])
  }
  if (selectedAnchors.length || selected.length) map.fitBounds(bounds.pad(0.2), { maxZoom: props.speciesId ? 5 : 2 })
}

onMounted(() => {
  try {
    if (!mapElement.value) return
    map = L.map(mapElement.value, { scrollWheelZoom: true, doubleClickZoom: true, dragging: true, minZoom: 2, maxZoom: 9, worldCopyJump: true }).setView([-50, 0], 2)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>', maxZoom: 18 }).addTo(map)
    renderMarkers()
    void loadNaturalEarthLayer()
    requestAnimationFrame(() => map?.invalidateSize())
    window.setTimeout(() => map?.invalidateSize(), 250)
  } catch {
    mapError.value = true
  }
})
watch(() => props.speciesId, renderMarkers)
onBeforeUnmount(() => { naturalEarthLayer?.remove(); map?.remove() })
</script>

<template>
  <div class="map-shell">
    <div v-if="mapError" class="map-fallback">The interactive map could not load. Use the region list below instead.</div>
    <div class="map-legend" aria-label="Map legend"><span><i class="legend-dot habitat-dot"></i>Generalized habitat</span><span><i class="legend-dot occurrence-dot"></i>GBIF observation</span></div>
    <div ref="mapElement" class="habitat-map" aria-label="Map of selected penguin habitats and observations"></div>
  </div>
</template>

<style scoped>
.map-shell { position: relative; overflow: hidden; }
.map-legend { position: absolute; top: 12px; right: 12px; z-index: 500; display: flex; gap: 12px; padding: 8px 10px; background: #ffffffeb; border: 1px solid #cbdad8; color: #536d74; font-size: 11px; }
.map-legend span { display: inline-flex; align-items: center; gap: 5px; }
.legend-dot { width: 9px; height: 9px; display: inline-block; border-radius: 50%; }
.habitat-dot { background: #8db0b4; border: 2px solid #1c4e62; }
.occurrence-dot { background: #d56c46; }
.habitat-map { width: 100%; height: 480px; background: #dce9e6; }
@media (max-width: 700px) { .map-legend { top: 8px; right: 8px; flex-direction: column; gap: 4px; } .habitat-map { height: 420px; } }
</style>
