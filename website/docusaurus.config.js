// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'tpc-pascal',
  tagline: 'Bộ skill agent: report-skill / web / doc / media / report / diagram',
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
          {href: 'https://github.com/tpc-pascal/report-skill', label: 'Skills', position: 'right'},
          {href: 'https://github.com/tpc-pascal', label: 'GitHub', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Kỹ năng',
            items: [
              {label: 'report-skill', to: '/docs/report-skill'},
              {label: 'web', to: '/docs/web'},
              {label: 'doc', to: '/docs/doc'},
              {label: 'media', to: '/docs/media'},
              {label: 'report', to: '/docs/report'},
              {label: 'diagram', to: '/docs/diagram'},
            ],
          },
          {
            title: 'Repo',
            items: [
              {label: 'GitHub', href: 'https://github.com/tpc-pascal/report-skill'},
              {label: 'Cài đặt', to: '/docs/intro'},
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
