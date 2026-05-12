import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * CoralLedger Comply Documentation Sidebar
 * Organized by navigation axis: By Topic and By Statute
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'By Topic',
      link: {
        type: 'generated-index',
        title: 'By Topic',
        description: 'Product-first navigation organized by feature area',
      },
      items: [
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
        'getting-started/self-filing',
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
        'transactions/category-analytics',
        'transactions/transaction-history',
        'transactions/archived-records',
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
        'vat-returns/input-tax-apportionment',
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
        'compliance/bad-debt-relief',
        'compliance/rate-transitions',
      ],
    },
    {
      type: 'category',
      label: 'Section 32 Attestation',
      link: {
        type: 'generated-index',
        title: 'Section 32 Attestation Pathway',
        description: 'Formal attestation process for VAT return submissions under Section 32 of the Bahamas VAT Act',
      },
      items: [
        'attestation/index',
        'attestation/qualifying-screen',
        'attestation/variant-standard',
        'attestation/variant-agent',
        'attestation/variant-professional',
        'attestation/variant-digital',
        'attestation/bica-verification',
        'attestation/session-affirmation',
        'attestation/handover',
        'attestation/carve-outs',
        'attestation/audit-trail',
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
        'reports/scheduled-reports',
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
        description: 'Connect CoralLedger with your existing business systems via CSV, Excel, and upcoming direct integrations',
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
      ],
    },
    {
      type: 'category',
      label: 'By Statute',
      link: {
        type: 'generated-index',
        title: 'By Statute',
        description: 'Statute-first compliance navigation mapped to product workflows',
      },
      items: [
        'statutes/index',
        'statutes/registration-obligation-threshold',
        'statutes/tax-invoices-credit-notes',
        'statutes/time-of-supply-period-assignment',
        'statutes/output-tax-calculation-declaration',
        'statutes/input-tax-deduction-eligibility',
        'statutes/partial-exemption-apportionment',
        'statutes/bad-debt-relief',
        'statutes/filing-payment-deadlines',
        'statutes/record-keeping-retention',
        'statutes/assessments-interest-penalties',
        'statutes/audit-information-powers',
        'statutes/refunds-repayments',
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
        'reference/statutory-citations',
        'reference/vat-rates',
        'reference/glossary',
        'reference/second-pass-audit-memo',
      ],
    },
  ],
};

export default sidebars;
