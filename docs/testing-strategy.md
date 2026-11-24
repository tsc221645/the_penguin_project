# Testing strategy

The project uses a small layered test suite so content failures are caught early without requiring a browser for every change.

## Local commands

```bash
npm run validate:content  # provenance, cross-reference, and publishing gate
npm run typecheck         # Vue and TypeScript correctness
npm run lint              # source and component rules
npm run test              # Vitest unit/component tests
npm run build             # all checks plus production bundle
npm run test:smoke        # checks the already-built dist/ output
npm run test:e2e           # browser smoke tests against the production preview
```

## What is covered

- Content validation rejects unapproved images, missing attribution, unsupported licenses, broken references, and incomplete conservation context.
- Directory tests verify 18 unique species slugs, URL lookup, and the boundary between 3 published profiles and 15 directory entries.
- Exploration tests verify accent-insensitive search, filters, random selection, comparison values, and honest `Not available` output.
- Component tests verify published external artwork and safe placeholders for entries without approved imagery.
- Route tests verify the public routes, including `/compare`, are registered.
- Gallery and fact data use the same central image/source IDs as the profile and credits pages.
- The production smoke test verifies the build contains the app entry point and required local artwork.
- Playwright browser tests verify directory search, comparison source links, and the IUCN guide in a real browser.
- Geography tests verify GBIF occurrence IDs, accepted licenses, coordinate bounds, uncertainty preservation, and the `/habitats` browser route.

## CI policy

Every pull request and push to the main branch runs validation, typecheck, lint, unit tests, and a production build. Deployment should only happen after this workflow succeeds.

## Future browser tests

The initial Playwright suite covers the core Phase 2 flows. Extend it when URL-driven comparison, keyboard navigation, responsive layouts, or the deployed GitHub Pages fallback become part of the product contract. Keep browser tests separate from the faster Vitest suite, but require both in CI and release validation.
