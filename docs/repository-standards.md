# Repository Standards

## Purpose and scope

This document defines a reusable baseline for software and non-software repositories. It is intentionally technology- and project-agnostic. Apply the relevant project profiles in [Repository Profiles](repository-profiles.md) for additional requirements; do not apply irrelevant requirements by default.

The terms **MUST**, **SHOULD**, and **MAY** indicate requirements, recommendations, and optional practices, respectively. A documented, justified project-specific exception may adjust a recommendation or requirement where the baseline does not fit.

## Repository identity and documentation

- A repository MUST have a clear, maintained README that explains its purpose and current status.
- The README SHOULD cover the intended audience, principal capabilities or contents, prerequisites, setup or usage, validation steps, and links to deeper documentation where relevant.
- Setup and usage instructions MUST be reproducible and MUST NOT depend on undocumented local state.
- Badges and status claims MUST be accurate and kept current; remove them when they are no longer maintained.
- Documentation SHOULD live close to the feature or workflow it describes. Avoid duplicating instructions; link to a single source of truth.
- A repository MUST declare an appropriate license when it is intended to be reused or distributed. Do not imply permissions that the license does not grant.
- Contribution, support, and security-reporting guidance SHOULD be provided when a project accepts external users or contributions.

## Structure and maintainability

- Keep the repository focused on a coherent purpose, and organize files so contributors can locate source, tests, documentation, and automation.
- Prefer conventional, descriptive names and the established conventions of the relevant ecosystem.
- Include only files needed to build, use, distribute, or maintain the project. Exclude generated output, local state, credentials, and unrelated artifacts unless the project has a documented reason to version them.
- Track the source of generated or vendored content and document how it is updated.
- Keep configuration and automation understandable, repeatable, and consistent with documented workflows.

## Quality and validation

- Document the commands needed to install, build, run, and validate the project, as applicable.
- Changes SHOULD be validated with the narrowest relevant checks and with broader checks when the change affects shared behavior.
- Projects with automated checks SHOULD run them in CI on relevant changes. CI MUST report failures clearly and SHOULD use least-privilege permissions.
- Tests and checks MUST verify behavior that matters to users; avoid presenting skipped or unavailable checks as successful.
- Changes that affect user-facing behavior, setup, compatibility, or operations MUST update the corresponding documentation.

## Security, privacy, and dependencies

- Never commit credentials, private keys, access tokens, personal data, or other secrets. Use an appropriate secret-management mechanism.
- Request only the permissions and data necessary for the project's purpose. Avoid collecting, logging, or retaining sensitive data without a documented need.
- Use dependencies from trustworthy sources, keep them and their licenses visible, and update them through a reviewable process.
- Validate untrusted input at relevant boundaries and handle failures explicitly; do not silently convert errors into success.
- Document a way to report security issues privately when the project is distributed or accepts external reports.

## Changes and maintenance

- Keep each change focused, reviewable, and consistent with the project's stated purpose.
- Preserve existing behavior unless a change is intentional and documented.
- Do not rewrite published history or remove user data as routine maintenance.
- Record user-visible changes and follow the project's applicable release conventions in [Commit and Release Conventions](commit-release-conventions.md).
- Revisit outdated setup steps, links, dependencies, and automated workflows as part of ongoing maintenance.

## Applying the baseline

This baseline is not a mandate to make every repository identical. Select relevant profiles, document project-specific decisions, and keep any exceptions narrow and explicit. See [Repository Profiles](repository-profiles.md).
