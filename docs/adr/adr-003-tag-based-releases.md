# ADR-003: Tag-based releases and production deployment

- Status: Accepted
- Date: 2026-11-24

## Context

The project previously had a Pages workflow triggered by successful CI runs on `main`. That made every merge a production deployment and did not provide a clear immutable version or GitHub Release boundary. The release specification requires CI and production publication to be separate.

## Decision

Keep `ci.yml` responsible for pull requests and pushes to `main`/`master`; it validates code and creates no deployment. Replace the merge-driven Pages workflow with one `release.yml` workflow triggered by `v*.*.*` tags.

The release workflow performs strict SemVer and `package.json` version validation, verifies that the tagged commit is contained in `main`, runs the same quality gate as CI, builds the exact tagged commit, and deploys the resulting artifact to GitHub Pages. A dependent job creates a GitHub Release only after deployment succeeds. Existing releases are not duplicated on retry.

Production deployments use one concurrency group, `production-pages`, with cancellation disabled so a running release is not interrupted by another release.

## Alternatives considered

- Deploy on every merge to `main`: rejected because it couples review merges to production publication and provides weak release traceability.
- Keep both merge-driven and tag-driven deployments: rejected because it creates duplicate and competing production workflows.
- Build `main` after a tag event: rejected because the release must reproduce the exact tagged commit.
- Move an existing tag during rollback: rejected because published tags are immutable; corrections use a new PATCH release.

## Consequences

### Positive

- Published Pages artifacts, commits, tags, and GitHub Releases are traceable.
- Pull requests remain safe and cannot publish production.
- Release retries do not duplicate GitHub Releases.
- Production permissions are limited to the deploy and release jobs.

### Trade-offs

- A maintainer must intentionally create and push an annotated tag.
- A Pages deployment can succeed before GitHub Release creation; this operational inconsistency is documented and recoverable without moving the tag.
- GitHub Pages and environment protection still require manual repository configuration.
