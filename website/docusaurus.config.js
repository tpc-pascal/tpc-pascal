// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import {readFileSync} from 'node:fs';

// Pinned repos for the navbar: fetched at build time by the Pages workflow
// (website/pinned.json, gitignored); this fallback covers local builds.
let pinned = [
  {name: 'folio', url: 'https://github.com/tpc-pascal/folio'},
  {name: 'skillsmith', url: 'https://github.com/tpc-pascal/skillsmith'},
];
try {
  const parsed = JSON.parse(readFileSync(new URL('./pinned.json', import.meta.url), 'utf8'));
  if (Array.isArray(parsed) && parsed.length > 0) pinned = parsed;
} catch {
  // keep the fallback
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'tpc-pascal',
  tagline: "I'm a tech developer",
  favicon: 'img/favicon.ico',

  url: 'https://tpc-pascal.github.io',
  baseUrl: '/tpc-pascal/',
  organizationName: 'tpc-pascal',
  projectName: 'tpc-pascal',

  onBrokenLinks: 'throw',
  markdown: {
    format: 'md',
  },

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: {
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'tpc-pascal',
        items: [
          {type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Docs'},
          ...pinned.map(({name, url}) => ({
            href: url,
            label: name,
            position: 'right',
            target: '_blank',
          })),
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Giới thiệu', to: '/docs/intro'},
              {label: 'Dự án', to: '/docs/projects'},
            ],
          },
          {
            title: 'Repo',
            items: [
              {label: 'GitHub', href: 'https://github.com/tpc-pascal'},
              {label: 'Skillsmith', href: 'https://github.com/tpc-pascal/skillsmith'},
            ],
          },
        ],
        copyright: `Bản quyền tpc-pascal. Xây dựng bằng Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
  },
};

export default config;
