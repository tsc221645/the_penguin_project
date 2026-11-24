# Release process

Releases are tag-driven. Pull requests and pushes to `main` run CI only; they do not publish to GitHub Pages. A valid version tag triggers validation, builds the exact tagged commit, deploys that artifact, and creates a GitHub Release only after deployment succeeds.

## Prerequisites

- All changes are merged into `main`.
- `package.json` contains the intended `MAJOR.MINOR.PATCH` version.
- `CHANGELOG.md` has the relevant unreleased notes.
- CI is green on the commit to be released.
- GitHub Pages is configured with **GitHub Actions** as its source.
- The `github-pages` environment has any required protection rules configured.

## Version policy

Tags must be annotated and match `vMAJOR.MINOR.PATCH` exactly. The tag must equal the `package.json` version.

- `0.x.y` is pre-1.0 development: minor versions may add substantial features and patch versions fix defects.
- `1.0.0` is the first stable public release.
- A new feature normally increments MINOR for `0.x` releases.
- A backward-compatible fix increments PATCH.
- A breaking change increments MAJOR once the project is stable.

The roadmap is guidance, not a set of tags to create automatically: `v0.1.0` profiles, `v0.2.0` discovery/comparison, `v0.3.0` habitats, `v0.4.0` quiz, and `v1.0.0` stable public release.

Published tags are immutable. Never move, delete, or overwrite one. A correction is a new PATCH tag.

## Create a release

These are documentary examples. Do not run them without maintainer authorization:

```bash
git switch main
git pull --ff-only origin main
# Update package.json and CHANGELOG.md first.
npm run check
npm run build
git tag -a v0.1.0 -m "The Penguin Project v0.1.0"
git push origin v0.1.0
```

The tag workflow checks that the tag is valid, matches `package.json`, and points to a commit contained in `origin/main`.

## What the release workflow does

1. Checks out the tagged commit with full history.
2. Installs dependencies with `npm ci`.
3. Runs the release-tag validator and main-history check.
4. Runs content validation, typecheck, lint, unit/component tests, and the production build.
5. Injects `VITE_APP_VERSION` and the Pages base path into the tagged build.
6. Deploys that exact artifact to GitHub Pages.
7. Creates the GitHub Release with generated notes after deployment succeeds.

If the release already exists, the workflow leaves it unchanged so retries do not duplicate releases.

## Failure handling and rollback

- If validation or build fails, deployment and release creation do not run.
- If Pages deployment fails, no GitHub Release is created. Fix the cause and rerun the same tag workflow only after reviewing the logs.
- If release creation fails after Pages succeeds, the site may be published without a GitHub Release. Rerun the workflow or create the release manually for the same immutable tag; do not move the tag.
- For a production rollback, deploy a reviewed prior commit through a new controlled release procedure. Do not rewrite an existing tag. Prefer a new PATCH release that contains the correction.

## Verification

After a successful run, verify:

- the Actions run used the expected tag and commit;
- the Pages deployment environment shows the expected URL;
- the footer displays the tag version;
- the GitHub Release exists and points to the same tag;
- the Pages site and credits page load correctly.
