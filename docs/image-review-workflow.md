# Image review workflow

Image metadata is reviewed before publication and stored in `src/content/images.ts`. The application does not discover rights or attribution at runtime.

An image moves through these states:

```text
pending → human rights/species review → approved → published
                      └──────────────→ rejected
```

Only `approved` records may be referenced by a published profile. A reviewer must verify the individual source page, external provider URL, license compatibility, creator, category, alt text, and any modifications. Changes to an image record require rerunning validation and should include the reason in the pull request.

The current initial records use externally hosted Wikimedia Commons files. No third-party photograph is copied into `public/` or `src/assets/`.
