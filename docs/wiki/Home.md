# The Penguin Project

## Current status

The Penguin Project is a static-first educational encyclopedia about penguin species, habitats, conservation categories, and scientific sources.

| Area | Status |
| --- | --- |
| Current release | `v0.1.0` |
| Species directory | 18 species |
| Approved images | 21 reviewed, externally hosted images |
| Search and comparison | Complete |
| IUCN category guide | Complete |
| Image carousels | Complete |
| Habitat map | Phase 3 implementation complete |
| Quiz and educational interactions | Initial MVP implemented |
| Hosting | GitHub Pages through GitHub Actions |

Adélie, Emperor, and Gentoo have full editorial profiles. The other 15 species now have reviewed directory profiles with descriptions, habitat, diet, traits, behavior, breeding notes, facts, imagery, taxonomy, conservation status, and generalized habitat information. Measurements remain explicitly unavailable until separately verified.

## Routes

- `/` — 18-species collection and rotating hero carousel.
- `/species` — searchable and filterable directory.
- `/species/:slug` — species profile or directory entry.
- `/compare` — side-by-side comparison with source links.
- `/habitats` — generalized habitat anchors and GBIF observations.
- `/quiz` — sourced knowledge quiz and “Did you know?” facts.
- `/about` — project information and IUCN category guide.
- `/credits` — image provenance and license records.

## Architecture

```text
src/content/       typed species, image, source, and geography records
src/components/    reusable cards, galleries, maps, credits, and source lists
src/pages/         route-level views
src/lib/           content lookup and exploration helpers
src/types/         shared TypeScript models
scripts/           content, release, and smoke validation
tests/             unit and component tests
e2e/               Playwright browser tests
.github/workflows/ CI and tag-based release workflows
```

The application has no backend, database, CMS, authentication layer, or runtime content API. Content is version-controlled and reviewed through Git changes and pull requests.

## Content model

- `SpeciesRecord` stores taxonomy, profile content, measurements, facts, habitat regions, conservation status, and source IDs.
- `ImageRecord` stores image URLs, author, original file page, license, attribution, review status, verification date, modifications, and alt text.
- `SourceRecord` stores bibliography and license notes.
- `OccurrenceRecord` stores individual GBIF records, dates, uncertainty, dataset IDs, and licenses.
- `HabitatAnchorRecord` stores approximate visual habitat references. These are not sightings, colony coordinates, or complete ranges.

Third-party photographs remain externally hosted. Published images must pass content validation and include approved licensing metadata.

## Habitat map

The map keeps geographic layers separate:

1. OpenStreetMap tiles provide the visual basemap with visible attribution.
2. Natural Earth 1:110m land data provides public-domain land context.
3. Blue markers show generalized habitat references for all 18 species.
4. Orange markers show reviewed individual GBIF observations.

The map is not a complete distribution map. Coordinate uncertainty is retained and every species also has an accessible geographic description outside the map.

## UI behavior and accessibility

- The home hero rotates through all 18 approved hero images.
- Profile galleries support autoplay, previous/next controls, category filtering, attribution links, pause-on-interaction, and fallbacks.
- Habitat selection supports all 18 species.
- Transitions respect `prefers-reduced-motion`.
- Geographic descriptions remain available outside the interactive map.

## Quality checks

```bash
npm ci
npm run check
npm run build
npm run test:e2e
```

The quality gate includes content and license validation, TypeScript, ESLint, Vitest, production build checks, smoke tests, and Playwright browser tests.

## CI/CD and releases

Pull requests and pushes to `main` run CI. Production publication is tag-driven:

```bash
git switch main
git pull --ff-only origin main
npm run check
npm run build
git tag -a v0.1.1 -m "The Penguin Project v0.1.1"
git push origin v0.1.1
```

The release workflow validates the annotated tag and package version, checks out the tagged commit, runs the quality gate, builds the exact release, deploys GitHub Pages, and creates the GitHub Release after deployment succeeds. Published tags are immutable; corrections use a new patch release.

See [release process](../engineering/release-process.md), [geographic data policy](../geographic-data-policy.md), [testing strategy](../testing-strategy.md), [image review workflow](../image-review-workflow.md), [attribution policy](../attribution-policy.md), and [editorial policy](../editorial-policy.md).

## Phase roadmap

### Phase 1 — Foundation and initial profiles

Complete. Typed records, policies, three complete profiles, image provenance, validation, tests, and CI are implemented.

### Phase 2 — Exploration

Complete. Search, filters, galleries, comparison, source links, IUCN explanations, and browser tests are implemented.

### Phase 3 — Geographic data and habitat maps

Complete for the current release. Natural Earth land context, OpenStreetMap attribution, 18 generalized habitat anchors, three reviewed GBIF observations, uncertainty preservation, fallback behavior, and accessible descriptions are implemented.

Future geographic work may add more reviewed GBIF records without presenting them as complete ranges.

### Phase 4 — Educational interactions

Initial MVP complete. The current implementation includes:

- a typed question bank based on reviewed facts;
- answers with explanations and source references;
- “Did you know?” fact cards;
- keyboard-accessible answer buttons and restart flow;
- tests for answer logic and source relationships.

Remaining Phase 4 work:

- image-based identification quiz;
- broader accessibility testing and automated keyboard-flow coverage;
- additional reviewed questions for the remaining directory species.

## Contribution guidelines

1. Use stable species IDs and verify taxonomy against the project taxonomy source.
2. Add scientific facts with source IDs and review dates.
3. Verify the individual image page, author, license, source URL, modifications, and alt text.
4. Keep generalized habitat descriptions separate from observations.
5. Run `npm run check` before opening a pull request.
6. Update the relevant ADR or policy when changing architecture or data responsibilities.

## Known limitations

- Only three species currently have full editorial profiles.
- Habitat anchors are visual context, not precise range polygons.
- External photographs and Natural Earth data depend on network availability at runtime.
- The recommended source-code license is documented, but no `LICENSE` file has been added yet.
