# Geographic data policy

The habitat map distinguishes generalized habitat from individual observations.

- Generalized regions are editorial descriptions and must cite an appropriate species source.
- Observation markers come from reviewed GBIF records and retain their GBIF occurrence URL, dataset key, date, uncertainty, license, and source citation.
- An observation is evidence that a species was recorded at a place and time; it is not the complete range of the species.
- Coordinate uncertainty must remain visible in the data and must not be silently rounded into false precision.
- Sensitive or unpublished colony locations are not published.
- The current Leaflet basemap uses `https://tile.openstreetmap.org/{z}/{x}/{y}.png` with visible `© OpenStreetMap contributors` attribution. The project must follow the [OSM tile usage policy](https://operations.osmfoundation.org/policies/tiles/), including caching behavior, referer handling, and no bulk/offline tile downloads.
- A future Natural Earth layer must record its dataset version, license, transformation, and attribution before publication.
