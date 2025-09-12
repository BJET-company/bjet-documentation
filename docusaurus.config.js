// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BJET Odoo Modules Documentation',
  tagline: 'Comprehensive Documentation for BJET Odoo Modules',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://bjet.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/bjet-documentation/',

  // GitHub pages deployment config.
  organizationName: 'bjet', // Usually your GitHub org/user name.
  projectName: 'bjet-documentation', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      uk: {
        label: 'Українська',
        direction: 'ltr',
        htmlLang: 'uk-UA',
        path: 'uk',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Edit link removed - no community contributions needed
        },
        blog: false, // Disable blog feature
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: "/docs",
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],
  
  markdown: {
    mermaid: true,
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'module_version',
        content:
          '<b>API Synchronization Module v18.0.1.0.2</b> - Now available for Odoo 18.0 <a href="/bjet-documentation/docs/modules/api-sync/quick-start">Get Started →</a>',
        backgroundColor: '#2116e6',
        textColor: '#ffffff',
        isCloseable: true,
      },
      navbar: {
        title: 'BJET Odoo Modules',
        logo: {
          alt: 'BJET Logo',
          src: 'img/bjet-logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'dropdown',
            label: 'Modules',
            position: 'left',
            items: [
              {
                label: 'API Synchronization',
                to: '/docs/modules/api-sync',
              },
              // Add more modules here as they become available
            ],
          },
          {
            href: '/postman',
            label: 'Downloads',
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
          {
            type: 'localeDropdown',
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
                label: 'All Modules',
                to: '/docs/',
              },
              {
                label: 'API Sync Module',
                to: '/docs/modules/api-sync',
              },
              {
                label: 'Configuration Guide',
                to: '/docs/modules/api-sync/configuration/overview',
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
                to: '/docs/modules/api-sync/python-scripts/context-variables',
              },
              {
                label: 'Troubleshooting',
                to: '/docs/modules/api-sync/troubleshooting',
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
        copyright: `Copyright © ${new Date().getFullYear()} BJET. Documentation for Odoo 18.0 Modules`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'json'],
      },
    }),
};

export default config;