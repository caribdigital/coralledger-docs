---
sidebar_position: 2
title: Current product surface
description: Route inventory and documentation map for the current CoralLedger Comply release
---

# Current product surface

This page is the release-level map of the customer-facing Comply application. It is checked against the route declarations in `src/CoralComply.Web/Components/Pages` in the application repository. A route being listed here means the surface exists; it does not mean that a user is authorised to open it or that every workflow is available to every subscription or role.

## Business and transaction workflows

| Surface | Route | Documentation |
|---|---|---|
| Client dashboard | `/client` | [Dashboard tour](/docs/getting-started/dashboard-tour) |
| Business setup and profile | `/account/business-setup`, `/settings/company-profile`, `/settings/business` | [Set up your business](/docs/getting-started/setup-business) |
| Transactions | `/transactions`, `/vat/entry` | [Transactions](/docs/transactions/) |
| Import and categorisation | `/transactions/import`, `/categorization`, `/categorization/review` | [Import CSV](/docs/transactions/import-csv), [Categorisation](/docs/transactions/categorization) |
| Review and approved queues | `/transactions/review`, `/transactions/approved` | [Transaction history](/docs/transactions/transaction-history) |
| Credit notes | `/credit-notes` | [Credit notes](/docs/transactions/credit-notes) |
| Recoveries and locations | `/transactions/recovery-review`, `/locations` | Availability depends on the transaction state and business configuration. |

## VAT and reporting

| Surface | Route | Documentation |
|---|---|---|
| VAT return preparation | `/vatreturns`, `/filing` | [VAT returns](/docs/vat-returns/), [Filing wizard](/docs/vat-returns/filing-wizard) |
| Filed-return read view | `/vatreturns/{id}/view` | [Return preview](/docs/vat-returns/return-preview) |
| Payments and payment history | `/payments` | [Filing and payment deadlines](/docs/statutes/filing-payment-deadlines) |
| VAT analytics | `/analytics`, `/business/analytics` | [Analytics dashboard](/docs/reports/analytics-dashboard) |
| Financial and cash-flow reports | `/reports/financial-impact`, `/reports/cashflow`, `/reports/vat-payment-cash-flow` | [Reports](/docs/reports/) |
| Variance, comparison, and outstanding VAT | `/reports/variance-analysis`, `/reports/comparison`, `/reports/outstanding-vat` | [Variance analysis](/docs/reports/variance-analysis) |
| Custom, shared, and scheduled reports | `/reports/builder`, `/reports/shared/{token}`, `/reports/schedules` | [Custom reports](/docs/reports/custom-reports), [Shared reports](/docs/reports/shared-reports), [Scheduled reports](/docs/reports/scheduled-reports) |

## Compliance and firm workflows

| Surface | Route | Documentation |
|---|---|---|
| Compliance intelligence and score | `/compliance/intelligence`, `/intelligence` | [Compliance intelligence](/docs/compliance/intelligence-dashboard), [Compliance score](/docs/compliance/compliance-score) |
| Refund and overpayment review | `/compliance/refund-eligibility` | [Refunds and repayments](/docs/statutes/refunds-repayments) |
| Bad-debt relief | `/compliance/bad-debt` | [Bad-debt relief](/docs/compliance/bad-debt-relief) |
| Tax-savings review | `/compliance/tax-savings` | Results are review prompts; confirm treatment against the applicable statute before acting. |
| Real-estate VAT | `/compliance/real-estate` | [VAT reform guidance](/docs/compliance/vat-2025-reforms) |
| Firm portal and client access | `/firm/portal`, `/firm/clients` | [Firm portal](/docs/firm-portal/) |
| Client onboarding and batch filing | `/firm/clients/onboard`, `/firm/batch-filing` | [Client onboarding](/docs/firm-portal/client-onboarding), [Batch filing](/docs/firm-portal/batch-filing) |
| VAT-group application | `/firm/vat-group/apply` | The application records the group's request and supporting information; it is not a determination by the Department of Inland Revenue. |

## Account, security, and data operations

| Surface | Route | Documentation |
|---|---|---|
| Account, profile, and business switching | `/account/profile`, `/account/settings`, `/Account/SwitchBusiness` | [Account settings](/docs/settings/account) |
| Two-factor authentication | `/Account/TwoFactorSetup`, `/Account/TwoFactor` | [Two-factor authentication](/docs/security/two-factor-auth) |
| Notifications and filing preferences | `/account/notifications`, `/settings/notifications`, `/settings/filing` | [Notifications](/docs/settings/notifications) |
| API keys, webhooks, and integrations | `/settings/api-keys`, `/settings/webhooks`, `/settings/integrations/manager` | [Integrations](/docs/integrations/) |
| Privacy, retention, export, and deletion requests | `/settings/privacy`, `/settings/retention`, `/admin/data-export` | [Data operations](/docs/data-ops/) |

## Boundaries

Comply prepares records, calculations, evidence, and exportable artifacts. The registrant remains responsible for confirming legal eligibility, signing where required, using the applicable filing channel, and paying by the statutory deadline. Documentation must not describe Comply as filing for a registrant or as conferring any government status unless a separately verified integration and evidence record exists.

Platform-operations routes under `/ops` and `/admin` are restricted operational surfaces. They are documented in the security, audit, and data-operations sections where an operator procedure is appropriate; they are not product capabilities available to ordinary business users.
