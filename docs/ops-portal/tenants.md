---
sidebar_position: 3
title: Tenant Management
description: Cross-tenant business administration in the CoralLedger Comply Ops Portal
---

# Tenant Management

The Tenant Management section (`/ops/tenants`) provides platform administrators with a cross-tenant view of all business accounts on the platform, along with detailed management capabilities for each tenant.

## Tenant List

The tenant list page (`/ops/tenants`) displays every business registered on the platform in a searchable, filterable table.

### Columns

| Column | Description |
|--------|-------------|
| **Business Name** | Registered business name |
| **TIN** | Tax Identification Number |
| **Plan** | Subscription plan |
| **Health** | Green / Yellow / Red indicator |
| **Users** | Active user count |
| **Last Activity** | Timestamp of the last recorded event |
| **Status** | Active, Deactivated, or Pending Deletion |

### Filtering and Search

- **Search** — Filter by business name, TIN, or owner email
- **Status** — All / Active / Deactivated / Pending Deletion
- **Health** — All / Green / Yellow / Red
- **Plan** — Filter by subscription tier

## Tenant Detail Page

Click any row to open the Tenant Detail page (`/ops/tenants/{id}`). The detail page is divided into four tabs.

### Tab 1 — Overview

- **Business profile** — Name, TIN, VAT number, registration date
- **Health indicators** — Individual scores for billing, compliance, and activity
- **Contact information** — Primary owner name and email
- **Subscription** — Current plan, next billing date, usage stats

### Tab 2 — Users

Lists all users attached to this tenant with their role, last login, 2FA status, and lock status. Admins can lock/unlock accounts and initiate password resets directly from this tab. See [User Administration](/docs/ops-portal/users) for details.

### Tab 3 — Audit Log

A filtered view of the platform-wide audit log scoped to this tenant. Shows all `PLATFORM_OPS_*` events that reference this tenant alongside the tenant's own audit entries. See [Audit Log Viewer](/docs/ops-portal/audit) for details.

### Tab 4 — Data & Retention

Shows data volume, retention settings, active legal holds, and any pending deletion requests for this tenant. See [Data Operations](/docs/ops-portal/data-ops) for details.

## Health Indicators

Each tenant's health is determined by three independent sub-scores:

| Indicator | Green | Yellow | Red |
|-----------|-------|--------|-----|
| **Billing** | Paid and current | Overdue < 14 days | Overdue ≥ 14 days |
| **Compliance** | Score ≥ 80% | Score 50–79% | Score < 50% |
| **Activity** | Active in last 30 days | Active in last 90 days | No activity in 90+ days |

The overall health badge is the worst of the three sub-scores.

## Tenant Actions

### Deactivating a Tenant

Deactivation suspends all logins and API access for the tenant while preserving all data.

1. Open the Tenant Detail page
2. Click **⋮ Actions > Deactivate Tenant**
3. Enter a reason (stored in the audit log)
4. Click **Confirm Deactivation**

A `PLATFORM_OPS_TENANT_DEACTIVATED` audit event is created. The tenant's users receive an email notification. Reactivation follows the same flow using **⋮ Actions > Reactivate Tenant**.

### Initiating Deletion

Deletion follows the 30-day DPA grace period process:

1. Open the Tenant Detail page
2. Click **⋮ Actions > Request Deletion**
3. Confirm the request and enter the legal basis
4. The tenant enters **Pending Deletion** status and the 30-day clock starts

Hard deletion is performed automatically after 30 days unless a legal hold is placed or the request is cancelled. See [Data Operations](/docs/ops-portal/data-ops) for details.

### Transferring a Tenant

Tenant ownership can be transferred to another platform account (for example, when a business changes accounting firms):

1. Open the Tenant Detail page
2. Click **⋮ Actions > Transfer Tenant**
3. Search for the receiving firm or admin account
4. Review the transfer summary and click **Confirm Transfer**

A `PLATFORM_OPS_TENANT_TRANSFERRED` audit event is created and both parties are notified by email.

## Next Steps

- [Administer users for a tenant](/docs/ops-portal/users)
- [View tenant audit entries](/docs/ops-portal/audit)
- [Manage deletion requests](/docs/ops-portal/data-ops)
