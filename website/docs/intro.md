---
sidebar_position: 1
---

# agent-skills

Bộ skill agent cho OpenCode/Claude/Cursor: **agent-skills** (điều phối + cổng câu hỏi), **web** (đọc web/mạng xã hội/tìm kiếm), **doc** (PDF/DOCX/XLSX), **media** (video/audio/ảnh), **report** (báo cáo song ngữ/học thuật), **diagram** (sơ đồ/biểu đồ).

## Cài đặt

```bash
npx skills add tpc-pascal/agent-skills --all
```

Cài từng skill: `--skill doc`, `--list` để xem danh sách, `-g --all` cho global.

## Các skill

| Skill | Dùng khi | Bên thứ ba |
|---|---|---|
| [orchestrator](./orchestrator.md) | Điều phối các skill khác + cổng câu hỏi trước báo cáo | — |
| [web](./web.md) | Web/mạng xã hội/tìm kiếm: đọc URL, bài báo, exa | `Panniantong/Agent-Reach` |
| [doc](./doc.md) | PDF/DOCX/XLSX: lấy text, OCR, chuyển đổi, tách/ghép | `timelapsetech/mediaskills` (`inspect`), `docling-project/docling` (`docling`) |
| [media](./media.md) | video/audio/ảnh: tóm tắt, phụ đề, cắt ghép, frame, tải | `timelapsetech/mediaskills`, `bradautomates/claude-video` (`watch`), `Iroli007/Aliceloop` (`music-listener`) |
| [report](./paper.md) | Báo cáo song ngữ/học thuật, xuất `.report.docx` | `anthropics/skills` (`docx`, `pdf`) |
| [diagram](./diagram.md) | Sơ đồ Mermaid / biểu đồ matplotlib cho báo cáo | kroki.io |

## Nét độc đáo

- **6 skill tự chứa, route theo tên** — cài `--all` hoặc từng skill riêng.
- **Skill bên thứ ba theo phiên**: `fetch-session.sh` ghim SHA, tải về temp, không bao giờ cài vĩnh viễn.
- **Song ngữ 100%**: mọi `.md` đều có `.en.md`, CI kiểm tự động.
- **Offline-first**: trích xuất/OCR/chuyển đổi bằng CLI local, không cần mạng.
- **Báo cáo `.report.docx` có verify**: `pdfinfo` + `pdftotext`, chống bịa.
