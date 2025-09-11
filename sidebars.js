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
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'configuration/overview',
        'configuration/inbound-api',
        'configuration/outbound-api',
      ],
    },
    {
      type: 'category',
      label: 'Python Scripts',
      items: [
        'python-scripts/context-variables',
      ],
    },
    'troubleshooting',
  ],
};

export default sidebars;