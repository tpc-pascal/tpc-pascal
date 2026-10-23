import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const readme = readFileSync(join(root, 'README.md'), 'utf8').trim();
const outDir = join(root, 'website', 'src', 'pages');
mkdirSync(outDir, {recursive: true});
writeFileSync(
  join(outDir, 'index.md'),
  ['---', 'title: tpc-pascal', '---', '', readme, ''].join('\n'),
);
console.log('sync-readme: wrote website/src/pages/index.md');
