# The Penguin Project

[![CI](https://github.com/tsc221645/the_penguin_project/actions/workflows/ci.yml/badge.svg)](https://github.com/tsc221645/the_penguin_project/actions/workflows/ci.yml)

# Highlights


# Overview
This is the official repo for The Penguin Project, a personal project about penguin with many different features to learn and appreciate penguins. This project allows you to browse through different penguin species, interact with a habitat map, visualize a beautiful collection of photos about penguins and compare and discover penguins. 

# Author
+ [Ana Laura Tschen](https://github.com/tsc221645) - I am a 5th year Computer Engineering student that loves building side projects on my free time. 


# Development

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck          # Vue and TypeScript type checking
npm run lint               # ESLint
npm run test               # Validator unit tests
npm run validate:content   # Publishing metadata gate
npm run check              # All checks above
npm run build              # Checks plus production build
```

The production preview is available with `npm run preview` after building.

## DevOps and CI/CD

Current application version: `0.1.0` (not yet published as a release).

[View GitHub Releases](https://github.com/tsc221645/the_penguin_project/releases)

The project uses GitHub Actions with two workflows:

- **CI** runs on every pull request and on pushes to `main` or `master`.
- **Deployment** runs only after CI succeeds on `main` or `master` and publishes the static bundle to GitHub Pages.

The CI quality gate runs:

```text
npm ci
npm run check
npm run build
npm run test:smoke
```

`npm run check` includes:

- content and attribution validation;
- TypeScript/Vue typechecking;
- ESLint with zero warnings allowed;
- unit and component tests.

`npm run build` creates the production bundle in `dist/`. The smoke test verifies that the generated bundle contains the application entry point and required build output.

The deployment workflow:

1. Checks out the exact commit that passed CI.
2. Installs dependencies with `npm ci`.
3. Builds with the repository-specific `VITE_BASE` path.
4. Uploads `dist/` as a Pages artifact.
5. Deploys through the GitHub Pages environment.

### GitHub repository setup

To enable deployment:

1. Open **Settings → Pages**.
2. Set the source to **GitHub Actions**.
3. Ensure the `github-pages` environment is available.
4. Protect `main` with pull requests and require the CI workflow to pass before merging.

The application is static-first. It has no backend deployment, database migration, runtime content API, or server-side release step. External images remain externally hosted and are validated through their local provenance records before deployment.

### Useful release commands

```bash
npm run check        # full local quality gate
npm run build        # quality gate plus production bundle
npm run test:smoke   # verify the existing dist/ output
npm run test:e2e     # browser tests against the production preview
npm run preview      # preview the production bundle locally
```

## License decision

Recommended approach:

- License the source code under the MIT License.
- Keep project-created illustrations under a separate, explicit content license (for example, CC BY 4.0 if reuse is desired).
- Do not assume the code license covers third-party photographs, scientific source text, logos, maps, or datasets. Each asset keeps its own attribution and license metadata.

No license file has been added yet so the copyright holder can confirm the preferred name and whether the original illustrations should be reusable.

# Feedback and Contributing
