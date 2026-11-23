# Image attribution and licensing policy

The Penguin Project does not download or bundle third-party penguin photographs. Approved photographs are delivered from an external provider, primarily Wikimedia Commons, using an individual file page as the authoritative rights record.

## Accepted normal-pipeline licenses

- CC0 or verified public domain
- CC BY 4.0
- CC BY-SA 4.0

Unknown, all-rights-reserved, NC, ND, or unclear licenses are rejected unless a separate written-permission review is recorded.

Every published image record must include the title, author, source/file page, license and license URL, TASL attribution text, modifications, category, alt text, provider URL, review status, and verification date. Credits remain visible near the image and are included on `/credits`.

## Review workflow

1. Open the individual source/file page, not only a search result.
2. Confirm the species identification, author, source, exact license, and reuse conditions.
3. Record the approved provider URL and a supported thumbnail URL when available.
4. Write descriptive alt text based on the visible image.
5. Mark the record `approved` only after manual review.
6. Run `npm run validate:content` before opening a pull request.

The validator checks metadata completeness and allowed categories. It cannot replace human legal review.
