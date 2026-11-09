# Commit and Release Conventions

These conventions support clear history and predictable releases across projects. A project may document a justified variation where its ecosystem or release model requires one.

## Commit messages

Use a Conventional Commit-style subject:

```text
<type>(<optional-scope>): <imperative summary>
```

Common types include `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, and `revert`. Keep the subject concise, specific, and focused on one logical change. Use a scope when it adds useful context; omit it when it does not.

Each commit MUST include a body with these headings:

```text
Work done
- What changed.

Effect
- The direct effect of the change.

Benefits
- The value or reason for the change.

Files changed
- path/to/file, path/to/another-file
```

`Files changed` MUST list every changed file path exactly once. Do not substitute directory names, wildcards, or a selection of only the main files.

Describe the actual change and its impact; do not claim tests, benefits, or files that are not applicable or were not verified. Keep commits atomic and avoid mixing unrelated changes. When practical, validate a commit before publishing it.

## Change grouping

- Group files by the logical change they implement, not by directory, file type, or a target number of files per commit.
- A commit SHOULD include the source, tests, documentation, and configuration needed to implement and verify one coherent behavior or maintenance task.
- Split independently reviewable changes into separate commits, even when they touch the same area. Keep tightly coupled changes together when separating them would leave a commit incomplete or misleading.
- Do not split edits to one file arbitrarily. Separate them only when each change can be applied and understood independently; otherwise keep those edits together.
- Keep each commit focused; do not enforce a fixed total commit count.

## Change review and history

- Review the complete diff before publishing; include only files related to the intended change.
- Explain behavior changes, compatibility impact, and important validation results in the change description.
- Do not rewrite shared or published history, force-push, or amend a published commit unless explicitly authorized and coordinated.
- Never include secrets, generated noise, or unrelated formatting churn in a change.

## Changelog and versioning

- Projects that publish user-facing releases SHOULD maintain a changelog with concise entries for notable changes, fixes, and compatibility impacts.
- Keep release notes understandable to users; implementation details belong in commit history or technical documentation unless they affect usage.
- When a project uses semantic versioning, follow its compatibility policy: increment the major version for incompatible public changes, the minor version for backward-compatible functionality, and the patch version for backward-compatible fixes.
- Projects that do not publish versioned releases MAY use another documented release model. Do not add versioning ceremony where it provides no value.

## Release process

- Document how to validate, version, tag, package, and publish a release when those steps are part of the project.
- Release artifacts MUST correspond to reviewed source and a clearly identified revision.
- Use stable, traceable tags and release notes. Do not move or replace published release tags without an explicit, documented reason.
- Automate repeatable release steps where appropriate, while keeping credentials out of source and limiting automation permissions.
