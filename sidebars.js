/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Main documentation sidebar
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: 'Modules',
      link: {
        type: 'generated-index',
        title: 'BJET Odoo Modules',
        description: 'Documentation for all BJET Odoo modules',
        keywords: ['modules', 'odoo', 'bjet'],
      },
      items: [
        {
          type: 'category',
          label: 'API Synchronization Module',
          link: {
            type: 'doc',
            id: 'modules/api-sync/index',
          },
          items: [
            'modules/api-sync/quick-start',
            {
              type: 'category',
              label: 'Configuration',
              items: [
                'modules/api-sync/configuration/overview',
                'modules/api-sync/configuration/authentication',
                'modules/api-sync/configuration/field-mapping',
                'modules/api-sync/configuration/inbound-api',
                'modules/api-sync/configuration/outbound-api',
              ],
            },
            {
              type: 'category',
              label: 'Automation',
              items: [
                'modules/api-sync/automation/base-automation',
              ],
            },
            {
              type: 'category',
              label: 'API Reference',
              items: [
                'modules/api-sync/api-reference/index',
              ],
            },
            {
              type: 'category',
              label: 'Python Scripts',
              items: [
                'modules/api-sync/python-scripts/context-variables',
              ],
            },
            'modules/api-sync/technical-architecture',
            'modules/api-sync/performance-optimization',
            'modules/api-sync/faq',
            'modules/api-sync/troubleshooting',
            'modules/api-sync/glossary',
          ],
        },
        // Future modules will be added here
        // {
        //   type: 'category',
        //   label: 'Another Module',
        //   items: [...]
        // },
      ],
    },
  ],
};

export default sidebars;