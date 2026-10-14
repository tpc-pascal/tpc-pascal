---
sidebar_position: 1
---

# agent-skills

Agent skill set for OpenCode/Claude/Cursor: **agent-skills** (orchestration + question gate), **web** (web/social/search reading), **doc** (PDF/DOCX/XLSX), **media** (video/audio/image), **report** (bilingual/academic reports), **diagram** (diagrams/charts).

## Install

```bash
npx skills add tpc-pascal/agent-skills --all
```

Install a single skill: `--skill doc`, use `--list` to see all, `-g --all` for global.

## Skills

| Skill | Use when | Third-party |
|---|---|---|
| [orchestrator](./orchestrator.md) | Dispatching other skills + question gate before reports | — |
| [web](./web.md) | Web/social/search: read URLs, articles, exa | `Panniantong/Agent-Reach` |
| [doc](./doc.md) | PDF/DOCX/XLSX: extract, OCR, convert, merge/split | `timelapsetech/mediaskills` (`inspect`), `docling-project/docling` (`docling`) |
| [media](./media.md) | video/audio/image: summarize, caption, cut, frames, download | `timelapsetech/mediaskills`, `bradautomates/claude-video` (`watch`), `Iroli007/Aliceloop` (`music-listener`) |
| [report](./paper.md) | Bilingual/academic reports, export `.report.docx` | `anthropics/skills` (`docx`, `pdf`) |
| [diagram](./diagram.md) | Mermaid diagrams / matplotlib charts for reports | kroki.io |

## Highlights

- **6 self-contained skills, routed by name** — install `--all` or individually.
- **Session-scoped third-party skills**: `fetch-session.sh` pins SHAs, fetches to temp, never installs permanently.
- **100% bilingual**: every `.md` has an `.en.md`, checked automatically in CI.
- **Offline-first**: extraction/OCR/conversion via local CLIs, no network needed.
- **Verified `.report.docx` export**: `pdfinfo` + `pdftotext`, anti-hallucination.
