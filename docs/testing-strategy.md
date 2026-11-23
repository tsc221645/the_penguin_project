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
```

## What is covered

- Content validation rejects unapproved images, missing attribution, unsupported licenses, broken references, and incomplete conservation context.
- Directory tests verify 18 unique species slugs, URL lookup, and the boundary between 3 published profiles and 15 directory entries.
- Component tests verify published artwork and safe placeholders for entries without approved imagery.
- Route tests verify the public routes are registered.
- The production smoke test verifies the build contains the app entry point and required local artwork.

## CI policy

Every pull request and push to the main branch runs validation, typecheck, lint, unit tests, and a production build. Deployment should only happen after this workflow succeeds.

## Future browser tests

Add Playwright only when there is meaningful browser behavior to protect, such as search/filter state, comparison, keyboard navigation, or the deployed GitHub Pages fallback. Keep the current fast suite as the required gate and run browser tests as a separate job.
