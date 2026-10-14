// sync-docs.mjs — copy skills/*/SKILL.md + references/ vào website/docs (VI) và i18n/en (EN)
// Chạy trước khi build: node website/sync-docs.mjs
import {existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, readdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = process.env.SKILLS_DIR || join(root, 'skills');
const docsDir = join(root, 'website', 'docs');
const enDir = join(root, 'website', 'i18n', 'en', 'docusaurus-plugin-content-docs');

const SKILL_POS = {'report-skill': 2, web: 3, doc: 4, media: 5, report: 6, diagram: 7};

rmSync(join(docsDir, 'doc'), {recursive: true, force: true});
rmSync(join(docsDir, 'report'), {recursive: true, force: true});
rmSync(join(enDir, 'doc'), {recursive: true, force: true});
rmSync(join(enDir, 'report'), {recursive: true, force: true});

function convert(srcPath, {isEn, skill, position}) {
  let text = readFileSync(srcPath, 'utf8');
  // bỏ frontmatter skill (name/description/license/metadata)
  text = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  // bỏ dòng cross-link song ngữ (không tồn tại trên site)
  text = text.replace(/^> (Bản tiếng Anh|Vietnamese version):.*\n/gm, '');
  // link references/... → /docs/<skill>/...
  text = text.replaceAll('](references/', `](${skill}/`);
  // link SKILL.en.md/SKILL.md song ngữ → bỏ (site tự có switcher)
  text = text.replaceAll('[SKILL.en.md](SKILL.en.md)', 'bản EN (switch ngôn ngữ trên thanh navbar)')
    .replaceAll('[SKILL.md](SKILL.md)', 'bản VI (switch ngôn ngữ trên thanh navbar)');
  const fm = `---\nsidebar_position: ${position}\n---\n\n`;
  return fm + text.trimStart();
}

mkdirSync(join(docsDir, 'doc'), {recursive: true});
mkdirSync(join(docsDir, 'report'), {recursive: true});
mkdirSync(join(enDir, 'doc'), {recursive: true});
mkdirSync(join(enDir, 'report'), {recursive: true});

for (const skill of readdirSync(skillsDir)) {
  const pos = SKILL_POS[skill];
  if (!pos) continue;
  const dir = join(skillsDir, skill);
  writeFileSync(join(docsDir, `${skill}.md`), convert(join(dir, 'SKILL.md'), {isEn: false, skill, position: pos}));
  writeFileSync(join(enDir, `${skill}.md`), convert(join(dir, 'SKILL.en.md'), {isEn: true, skill, position: pos}));
  const refDir = join(dir, 'references');
  if (!existsSync(refDir)) continue;
  let refPos = 1;
  for (const f of readdirSync(refDir).sort()) {
    if (f.endsWith('.en.md')) continue;
    const en = `${f.slice(0, -3)}.en.md`;
    writeFileSync(join(docsDir, skill, f), convert(join(dir, 'references', f), {isEn: false, skill, position: refPos}));
    writeFileSync(join(enDir, skill, f), convert(join(dir, 'references', en), {isEn: true, skill, position: refPos}));
    refPos++;
  }
}
console.log('sync-docs OK');
