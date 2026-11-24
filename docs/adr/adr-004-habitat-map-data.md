# ADR-004: Habitat map data and geographic precision

- Status: Accepted for the initial Phase 3 slice
- Date: 2026-11-24

## Context

The project needs to show where penguins have been observed without presenting a small number of records as a complete species range or exposing precise colony locations. Map tiles and occurrence data have separate provenance and licensing responsibilities.

## Decision

Use Leaflet with the official OpenStreetMap raster tile URL for the interactive basemap, including visible OpenStreetMap attribution and a link to its tile policy. Store selected GBIF occurrence records locally in the typed content registry with GBIF ID, dataset key, record URL, coordinates, coordinate uncertainty, observation date, source ID, and license.

The UI labels markers as individual observations and always provides a text-only generalized habitat list. It does not draw a full distribution polygon from isolated observations, and it does not show precise unpublished colony locations.

Natural Earth remains the preferred source for a future manually reviewed boundary or generalized region layer. It is not bundled yet because no specific layer, version, transformation, or attribution record has been reviewed for this release.

## Consequences

- Visitors can inspect real, traceable observations while seeing their uncertainty.
- The page remains useful when the map fails or JavaScript is unavailable through the region list.
- OSM tiles introduce an external runtime dependency and must follow the tile usage policy.
- GBIF records are snapshots in version-controlled content; updates require review rather than silent runtime ingestion.
- The current map is an observation explorer, not a complete range map.
