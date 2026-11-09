# Repository Profiles

Repository profiles add requirements that depend on what a project does or how it is distributed. They complement the shared [Repository Standards](repository-standards.md); they do not make every repository follow the same layout or technology choices.

## Choosing profiles

Select one or more profiles that match the repository's purpose. A profile adds only relevant guidance. For example, a project that publishes both a reusable package and an application may apply both profiles.

| Profile | Additional concerns to document and validate |
| --- | --- |
| Application or service | Runtime and configuration, setup and operation, user data, deployment, and recovery where applicable. |
| Library or package | Supported runtimes, public API, compatibility policy, packaging, and consumer-facing examples. |
| Command-line or developer tool | Installation, supported environments, command usage, exit behavior, and safe handling of local files. |
| Documentation or content | Intended audience, source format, contribution workflow, publication process, and link or content checks. |
| Automation or CI | Trigger conditions, permissions, secrets, side effects, failure reporting, and safe reruns. |
| Plugin, extension, or integration | Host compatibility, permissions, external interfaces, installation, and version constraints. |
| Data or media collection | Provenance, format, licensing, privacy, integrity, and regeneration or update procedures. |

These profiles are starting points, not exhaustive checklists. Add only the requirements needed to make a particular project understandable, safe, and maintainable.

## Project-specific decisions and exceptions

Each repository SHOULD record its selected profiles and any important deviations in its contributor guidance or project documentation.

An exception MUST:

1. Identify the requirement being adjusted and the affected scope.
2. Explain why the default does not fit the project.
3. Describe any alternative safeguard or workflow.
4. Be reviewed when the project's purpose or constraints change.

Keep exceptions as narrow as possible. A project-specific decision may add stronger requirements, but should not silently weaken unrelated baseline expectations.

## Adoption

When applying these standards to an existing repository, first identify its purpose, users, ecosystem, and release model. Adopt applicable baseline practices and profiles incrementally; preserve valid project-specific workflows and document any intentional differences. Do not copy irrelevant files or tooling solely to make repositories look alike.
