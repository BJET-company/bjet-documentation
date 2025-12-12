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
        {
          type: 'category',
          label: 'Print Form Builder',
          link: {
            type: 'doc',
            id: 'modules/print-form-builder/index',
          },
          items: [
            'modules/print-form-builder/installation',
            'modules/print-form-builder/creating-forms',
            'modules/print-form-builder/gpt-integration',
            'modules/print-form-builder/template-variables',
            'modules/print-form-builder/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'Import NBU Exchange Rate',
          link: {
            type: 'doc',
            id: 'modules/import-nbu-exchange-rate/index',
          },
          items: [
            'modules/import-nbu-exchange-rate/installation',
            'modules/import-nbu-exchange-rate/configuration',
            'modules/import-nbu-exchange-rate/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'Monobank Statement Import',
          link: {
            type: 'doc',
            id: 'modules/monobank-statement-import/index',
          },
          items: [
            'modules/monobank-statement-import/installation',
            'modules/monobank-statement-import/configuration',
            'modules/monobank-statement-import/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'PrivatBank 24 business: import of bank statement',
          link: {
            type: 'doc',
            id: 'modules/privatbank-autoclient-statement-import/index',
          },
          items: [
            'modules/privatbank-autoclient-statement-import/installation',
            'modules/privatbank-autoclient-statement-import/configuration',
            'modules/privatbank-autoclient-statement-import/troubleshooting',
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
    {
      type: 'category',
      label: 'Instructions',
      items: [
        {
          type: 'category',
          label: 'Getting Started in Odoo 18 Community',
          link: {
            type: 'doc',
            id: 'instructions/getting-started-in-odoo-18-community/index',
          },
          items: [
            'instructions/getting-started-in-odoo-18-community/interface-basics',
            'instructions/getting-started-in-odoo-18-community/system-configuration',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Downloads',
      items: [
        'downloads/postman',
      ],
    },
  ],
};

export default sidebars;
