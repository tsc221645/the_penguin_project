# ADR-001: Initial architecture and delivery model

- Status: Accepted
- Date: 2026-11-23
- Scope: Phase 1 MVP and the foundation for Phase 2

## Context

The Penguin Project is a public, educational penguin encyclopedia. It needs to be easy to deploy, usable without a backend, and transparent about the sources and rights behind its content. The first release should favor a small, maintainable system over premature infrastructure.

## Decisions

### 1. Static-first Vue application

The frontend uses Vue 3, TypeScript, Vite, and Vue Router. The site is built as a static bundle for GitHub Pages or another static host. There is no runtime database, CMS, authentication, or required external API.

Content is imported from version-controlled TypeScript modules in `src/content/`, so the encyclopedia remains usable without third-party metadata services.

### 2. Lightweight local styling

The project uses a local CSS design system in `src/styles.css` rather than a large UI framework. The visual direction is calm, editorial, and coastal: deep ocean blue, ice blue, charcoal, warm accent color, generous whitespace, and responsive layouts.

### 3. Separate content records from UI components

Species, image provenance, and source bibliography are separate typed records. Components reference stable IDs instead of duplicating attribution details.

```text
src/content/       species, images, and sources
src/components/    reusable cards, credits, and source lists
src/pages/         route-level views
src/lib/           content lookup helpers
src/types/         shared TypeScript models
scripts/           publishing and build smoke checks
tests/             unit and component tests
```

### 4. Attribution as a publishing gate

Every displayed third-party image must have local metadata for creator, source URL, license, attribution text, modifications, review status, verification date, and alt text. Only approved images with recognized licenses pass `npm run validate:content`.

The initial release uses original project-owned SVG illustrations. Third-party photography can be added only after manual rights review. A public image search result is never treated as permission to republish an image.

### 5. Staged species directory

The directory follows the 18 extant species recognized by the chosen IOC taxonomy reference. Adélie, emperor, and gentoo have complete editorial profiles and approved local artwork. The remaining 15 species are directory entries with accepted name, broad range, conservation category, and sources, and are marked `directory` until their full profiles and imagery are reviewed.

This keeps the full directory discoverable without presenting incomplete or invented measurements, facts, or images as finished profiles.

### 6. Dated and sourced scientific claims

Species records include source IDs, review dates, and dated conservation context. The Wikipedia penguin list is used as a directory and taxonomy reference, not as a substitute for final scientific or conservation source review. Expanded profiles should use authoritative sources such as BirdLife, IUCN, peer-reviewed research, or the IOC list.

### 7. Layered automated checks

The quality gate consists of:

- content validation for provenance and cross-references;
- `vue-tsc` typechecking;
- ESLint for TypeScript and Vue files;
- Vitest tests for content validation, directory invariants, routes, and species-card behavior;
- a production build;
- a smoke test for the generated `dist/` entry point and required local assets.

These are composed into `npm run check` and `npm run build`. Browser automation is deferred until search/filter behavior, comparison, keyboard flows, or deployed routing become substantial enough to justify Playwright.

### 8. GitHub Actions CI and static deployment

Pull requests and pushes to `main` or `master` run the quality checks and production build. A separate GitHub Pages workflow deploys only after CI succeeds. The Vite base path is configurable through `VITE_BASE` so the same build works locally and under a repository-based Pages URL.

### 9. License decision remains pending

The recommended model is MIT for source code and a separate explicit license for project-created illustrations, such as CC BY 4.0 if reuse is desired. Third-party images, maps, datasets, logos, and source text retain their own terms and attribution records.

The repository does not yet include a `LICENSE` file because the copyright holder should confirm the name and whether project artwork is intended to be reusable.

## Consequences

### Positive

- Low operational complexity and inexpensive static hosting.
- Content changes are reviewable in normal pull requests.
- Attribution and scientific review are enforced before build.
- The directory can grow without requiring a backend or rewriting the UI.
- CI catches broken content references and common regressions before deployment.

### Trade-offs

- Content updates require code changes and a deployment.
- Fifteen directory-only species do not yet provide complete profiles.
- Static hosting does not provide a built-in editorial interface.
- Browser-level behavior is not covered until a later testing phase.
- Taxonomy and conservation information must be reviewed periodically.

## Future decisions

- Add a formal `LICENSE` file and choose the artwork license.
- Select authoritative sources for each expanded species profile.
- Add Playwright browser tests when Phase 2 interactions are implemented.
- Select geographic datasets and a tile provider for the habitat map.
