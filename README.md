# The Penguin Project

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

## CI/CD

GitHub Actions runs `npm run check` and `npm run build` on pushes and pull requests. The Pages workflow deploys the production build to GitHub Pages after CI succeeds on `main` or `master`.

To enable deployment, set the repository's Pages source to **GitHub Actions** in GitHub settings.

## License decision

Recommended approach:

- License the source code under the MIT License.
- Keep project-created illustrations under a separate, explicit content license (for example, CC BY 4.0 if reuse is desired).
- Do not assume the code license covers third-party photographs, scientific source text, logos, maps, or datasets. Each asset keeps its own attribution and license metadata.

No license file has been added yet so the copyright holder can confirm the preferred name and whether the original illustrations should be reusable.

# Feedback and Contributing
