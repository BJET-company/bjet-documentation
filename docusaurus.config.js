// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BJET API Synchronization Module',
  tagline: 'Comprehensive Odoo API Integration Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-github-username.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/bjet-documentation/',

  // GitHub pages deployment config.
  organizationName: 'your-github-username', // Usually your GitHub org/user name.
  projectName: 'bjet-documentation', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          editUrl:
            'https://github.com/your-github-username/bjet-documentation/tree/main/',
        },
        blog: false, // Disable blog feature
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'BJET API Sync',
        logo: {
          alt: 'BJET Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: '/postman',
            label: 'Postman Collection',
            position: 'left',
          },
          {
            href: 'https://bjetpro.com',
            label: 'BJET Website',
            position: 'right',
          },
          {
            href: 'mailto:support@bjetpro.com',
            label: 'Support',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'Configuration Guide',
                to: '/docs/configuration/overview',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Postman Collection',
                href: '/postman',
              },
              {
                label: 'Python Scripts',
                to: '/docs/python-scripts/context-variables',
              },
              {
                label: 'Troubleshooting',
                to: '/docs/troubleshooting',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'BJET Website',
                href: 'https://bjetpro.com',
              },
              {
                label: 'Email Support',
                href: 'mailto:support@bjetpro.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BJET. Version 18.0.1.0.2 | License: OPL-1`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'json'],
      },
    }),
};

export default config;