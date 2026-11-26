<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import { getSpecies, habitatAnchors, occurrences } from '../lib/content'

const NATURAL_EARTH_GEOJSON_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.json'

const props = defineProps<{ speciesId: string; highlightedRegion?: string }>()
const mapElement = ref<HTMLElement | null>(null)
const mapError = ref(false)
let map: L.Map | undefined
let layer: L.LayerGroup | undefined
let naturalEarthLayer: L.GeoJSON | undefined
let highlightedArea: L.Circle | undefined

type RegionFocus = { center: L.LatLngExpression; zoom: number; radiusMeters: number }

const regionFocus: Record<string, RegionFocus> = {
  'Antarctic coast': { center: [-70, 0], zoom: 3, radiusMeters: 850000 },
  'Antarctic Peninsula': { center: [-65, -64], zoom: 5, radiusMeters: 230000 },
  'Antarctic sea ice': { center: [-77, 0], zoom: 3, radiusMeters: 900000 },
  'East Antarctica': { center: [-72, 75], zoom: 4, radiusMeters: 500000 },
  'Ross Sea': { center: [-73, 175], zoom: 4, radiusMeters: 420000 },
  'Balleny Islands': { center: [-67, 163], zoom: 6, radiusMeters: 120000 },
  'Subantarctic islands': { center: [-52, 80], zoom: 3, radiusMeters: 1000000 },
  'Subantarctic waters': { center: [-53, 80], zoom: 3, radiusMeters: 1200000 },
  'Southern Ocean': { center: [-55, 0], zoom: 3, radiusMeters: 1300000 },
  'Falkland Islands': { center: [-52, -59], zoom: 5, radiusMeters: 170000 },
  'Southern Australia': { center: [-38, 145], zoom: 4, radiusMeters: 500000 },
  'New Zealand coasts': { center: [-43, 172], zoom: 5, radiusMeters: 220000 },
  'New Zealand': { center: [-41, 173], zoom: 4, radiusMeters: 450000 },
  'South Island of New Zealand': { center: [-44, 170], zoom: 5, radiusMeters: 180000 },
  'Stewart Island': { center: [-47, 168], zoom: 7, radiusMeters: 50000 },
  'Stewart and Solander Islands': { center: [-47, 167], zoom: 6, radiusMeters: 90000 },
  'New Zealand subantarctic': { center: [-51, 166], zoom: 5, radiusMeters: 230000 },
  'Galápagos Islands': { center: [-0.8, -90.5], zoom: 6, radiusMeters: 120000 },
  'Equatorial Pacific': { center: [0, -100], zoom: 3, radiusMeters: 1100000 },
  'Pacific coast of Peru': { center: [-12, -77], zoom: 5, radiusMeters: 220000 },
  'Pacific coast of Chile': { center: [-35, -73], zoom: 4, radiusMeters: 500000 },
  'Patagonian coasts': { center: [-45, -68], zoom: 4, radiusMeters: 450000 },
  'Southern South America': { center: [-50, -70], zoom: 4, radiusMeters: 600000 },
  'Southern Atlantic and Pacific': { center: [-45, -50], zoom: 3, radiusMeters: 1500000 },
  'Namibia coast': { center: [-23, 15], zoom: 5, radiusMeters: 240000 },
  'South Africa coast': { center: [-33, 18], zoom: 5, radiusMeters: 240000 },
  'Benguela Current': { center: [-20, 10], zoom: 4, radiusMeters: 500000 },
  'Macquarie Island': { center: [-54.5, 158.9], zoom: 7, radiusMeters: 50000 },
  'Tristan da Cunha group': { center: [-37.1, -12.3], zoom: 6, radiusMeters: 100000 },
  'Amsterdam Island': { center: [-37.8, 77.5], zoom: 7, radiusMeters: 50000 },
  'Saint Paul Island': { center: [-38.7, 77.5], zoom: 7, radiusMeters: 50000 },
  'Fiordland coast': { center: [-45, 167], zoom: 6, radiusMeters: 100000 },
  'Snares Islands': { center: [-48, 166], zoom: 7, radiusMeters: 50000 },
  'Bounty Islands': { center: [-47.7, 179], zoom: 7, radiusMeters: 50000 },
  'Antipodes Islands': { center: [-49.7, 178.8], zoom: 7, radiusMeters: 70000 },
}

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
    const marker = L.circleMarker([occurrence.latitude, occurrence.longitude], { radius: 7, color: 'var(--logo-blue)', fillColor: 'var(--logo-blue)', fillOpacity: 0.85 })
    marker.bindPopup(`<strong>${species?.commonName ?? occurrence.speciesId}</strong><br>GBIF observation<br>${occurrence.observedAt ?? 'Date unavailable'}<br>Uncertainty: ${occurrence.uncertaintyMeters?.toLocaleString() ?? 'not available'} m`)
    marker.addTo(layer)
    bounds.extend([occurrence.latitude, occurrence.longitude])
  }
  if (selectedAnchors.length || selected.length) map.fitBounds(bounds.pad(0.2), { maxZoom: props.speciesId ? 5 : 2 })
}

function clearHighlightedArea() {
  highlightedArea?.remove()
  highlightedArea = undefined
}

function focusRegion(region?: string) {
  if (!map) return
  clearHighlightedArea()
  if (!region) {
    renderMarkers()
    return
  }
  const focus = regionFocus[region]
  if (!focus) return
  highlightedArea = L.circle(focus.center, {
    color: '#087fbe',
    fillColor: '#55b8e9',
    fillOpacity: 0.25,
    radius: focus.radiusMeters,
    weight: 3,
    dashArray: '8 7',
  }).addTo(map)
  map.flyTo(focus.center, focus.zoom, { duration: 0.75 })
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
watch(() => props.speciesId, () => {
  clearHighlightedArea()
  renderMarkers()
  if (props.highlightedRegion) focusRegion(props.highlightedRegion)
})
watch(() => props.highlightedRegion, focusRegion)
onBeforeUnmount(() => { clearHighlightedArea(); naturalEarthLayer?.remove(); map?.remove() })
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
.occurrence-dot { background: var(--logo-blue); }
.habitat-map { width: 100%; height: 480px; background: #dce9e6; }
@media (max-width: 700px) { .map-legend { top: 8px; right: 8px; flex-direction: column; gap: 4px; } .habitat-map { height: 420px; } }
</style>
