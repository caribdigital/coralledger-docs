import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * CoralLedger Comply Documentation Sidebar
 * Organized by feature area for easy navigation
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
        title: 'Getting Started',
        description: 'Learn how to get started with CoralLedger Comply',
      },
      items: [
        'getting-started/index',
        'getting-started/create-account',
        'getting-started/setup-business',
        'getting-started/dashboard-tour',
      ],
    },
    {
      type: 'category',
      label: 'Transactions',
      link: {
        type: 'generated-index',
        title: 'Transactions',
        description: 'Import and manage your business transactions',
      },
      items: [
        'transactions/index',
        'transactions/import-csv',
        'transactions/categorization',
      ],
    },
    {
      type: 'category',
      label: 'VAT Returns',
      link: {
        type: 'generated-index',
        title: 'VAT Returns',
        description: 'Generate and submit VAT returns',
      },
      items: [
        'vat-returns/index',
        'vat-returns/generate-return',
        'vat-returns/submit-return',
      ],
    },
    {
      type: 'category',
      label: 'Compliance',
      link: {
        type: 'generated-index',
        title: 'Compliance',
        description: 'Stay compliant with Bahamas VAT regulations',
      },
      items: [
        'compliance/index',
        'compliance/compliance-score',
      ],
    },
    {
      type: 'category',
      label: 'Firm Portal',
      link: {
        type: 'generated-index',
        title: 'Firm Portal',
        description: 'Manage multiple client businesses',
      },
      items: [
        'firm-portal/index',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      link: {
        type: 'generated-index',
        title: 'Integrations',
        description: 'Connect with Point POS and other systems',
      },
      items: [
        'integrations/index',
      ],
    },
    {
      type: 'category',
      label: 'Settings',
      link: {
        type: 'generated-index',
        title: 'Settings',
        description: 'Configure your account and preferences',
      },
      items: [
        'settings/index',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      link: {
        type: 'generated-index',
        title: 'Reference',
        description: 'VAT rates, categories, and glossary',
      },
      items: [
        'reference/index',
        'reference/vat-rates',
        'reference/glossary',
      ],
    },
  ],
};

export default sidebars;
