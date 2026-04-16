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
        'getting-started/mobile',
        'getting-started/performance',
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
        'transactions/manual-entry',
        'transactions/categorization',
        'transactions/credit-notes',
      ],
    },
    {
      type: 'category',
      label: 'VAT Returns',
      link: {
        type: 'generated-index',
        title: 'VAT Returns',
        description: 'Generate, validate, and submit VAT returns',
      },
      items: [
        'vat-returns/index',
        'vat-returns/generate-return',
        'vat-returns/return-preview',
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
        'compliance/intelligence-dashboard',
        'compliance/vat-2025-reforms',
      ],
    },
    {
      type: 'category',
      label: 'Reports',
      link: {
        type: 'generated-index',
        title: 'Reports & Analytics',
        description: 'Financial reports, cash flow, and custom analytics',
      },
      items: [
        'reports/index',
        'reports/analytics-dashboard',
        'reports/cash-flow',
        'reports/variance-analysis',
        'reports/custom-reports',
        'reports/shared-reports',
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
        'firm-portal/batch-filing',
        'firm-portal/analytics',
        'firm-portal/user-management',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      link: {
        type: 'generated-index',
        title: 'Security & Access Control',
        description: 'Authentication, threat protection, and data security',
      },
      items: [
        'security/index',
        'security/two-factor-auth',
        'security/ip-blocking',
        'security/fraud-alerts',
        'security/kill-switch',
        'security/impersonation',
        'security/tenant-isolation',
      ],
    },
    {
      type: 'category',
      label: 'Data Operations',
      link: {
        type: 'generated-index',
        title: 'Data Operations',
        description: 'Deletion requests, legal holds, retention monitoring, and data export',
      },
      items: [
        'data-ops/index',
        'data-ops/deletion-requests',
        'data-ops/legal-holds',
        'data-ops/retention-monitoring',
        'data-ops/data-export',
      ],
    },
    {
      type: 'category',
      label: 'Audit Trail',
      link: {
        type: 'generated-index',
        title: 'Audit Trail',
        description: 'Immutable audit logging and compliance records',
      },
      items: [
        'audit/index',
        'audit/audit-reports',
        'audit/platform-ops-events',
        'audit/cross-tenant-audit-viewer',
      ],
    },
    {
      type: 'category',
      label: 'Billing & Licensing',
      link: {
        type: 'generated-index',
        title: 'Billing & Licensing',
        description: 'Subscription plans, licensing, and the Founders Circle',
      },
      items: [
        'billing/index',
        'billing/licensing',
        'billing/founders-circle',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      link: {
        type: 'generated-index',
        title: 'Integrations',
        description: 'Connect with Point POS, Manager, and other systems',
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
        'settings/account',
        'settings/notifications',
        'settings/appearance',
      ],
    },
    {
      type: 'category',
      label: 'Platform Operations Portal',
      link: {
        type: 'generated-index',
        title: 'Platform Operations Portal',
        description: 'Internal platform administration — PlatformAdmin access required',
      },
      items: [
        'ops-portal/index',
        'ops-portal/dashboard',
        'ops-portal/tenants',
        'ops-portal/users',
        'ops-portal/firms',
        'ops-portal/audit',
        'ops-portal/data-ops',
        'ops-portal/support',
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
