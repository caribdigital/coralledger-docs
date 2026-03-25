---
sidebar_position: 1
title: Platform Operations Portal
description: Overview of the CoralLedger Comply Platform Operations Portal for internal platform administration
---

# Platform Operations Portal

The Platform Operations Portal (`/ops/*`) is the internal administration interface for CoralLedger Comply platform staff. It provides cross-tenant visibility and control over all businesses, users, firms, and platform data.

:::warning Restricted Access
The Ops Portal is restricted to users with the **PlatformAdmin** role. Two-factor authentication (2FA) must be active before access is granted. All actions taken inside the portal are immutably recorded under the `PLATFORM_OPS_*` audit event family.
:::

## Who Can Access the Ops Portal?

| Requirement | Details |
|-------------|---------|
| **Role** | `PlatformAdmin` — separate from the business-level `Admin` role |
| **2FA** | Must be enrolled and verified at each session |
| **Network** | Platform-internal access only (no public sign-up) |

The `PlatformAdmin` role is assigned directly in the platform identity store and cannot be self-granted or delegated through the standard user-management UI.

## Key Concepts

### Cross-Tenant Access

Platform admins can view and act on data that belongs to any tenant. Every cross-tenant read or write automatically generates a mandatory audit entry so there is a complete record of who accessed what and when.

### PLATFORM_OPS_* Audit Events

All ops-portal actions emit immutable audit events with the `PLATFORM_OPS_` prefix, for example:

| Event Type | Trigger |
|------------|---------|
| `PLATFORM_OPS_TENANT_VIEWED` | Admin opens a tenant detail page |
| `PLATFORM_OPS_USER_LOCKED` | Admin locks a user account |
| `PLATFORM_OPS_IMPERSONATION_STARTED` | Admin begins a support impersonation session |
| `PLATFORM_OPS_DELETION_APPROVED` | Admin approves a deletion request |
| `PLATFORM_OPS_LEGAL_HOLD_SET` | Admin places a legal hold on tenant data |

These events cannot be edited or deleted and are visible in both the Ops Audit Log and the standard tenant audit trail.

### Health Indicators

Throughout the portal, tenants and users are colour-coded by health status:

| Colour | Meaning |
|--------|---------|
| 🟢 **Green** | Healthy — no issues detected |
| 🟡 **Yellow** | Warning — attention recommended |
| 🔴 **Red** | Critical — immediate action required |

### 30-Day DPA Grace Period

When a deletion request is raised under data-protection rules, a **30-day grace period** begins. During this window the data is soft-deleted and recoverable. After 30 days, a hard-delete job permanently removes the data unless a legal hold is in place.

## Portal Sections

| Section | URL Pattern | Purpose |
|---------|-------------|---------|
| [Dashboard](/docs/ops-portal/dashboard) | `/ops` | Platform health overview |
| [Tenant Management](/docs/ops-portal/tenants) | `/ops/tenants` | Cross-tenant business administration |
| [User Administration](/docs/ops-portal/users) | `/ops/users` | Platform-wide user management |
| [Firm Management](/docs/ops-portal/firms) | `/ops/firms` | Accounting firm oversight |
| [Audit Log Viewer](/docs/ops-portal/audit) | `/ops/audit` | Unified cross-tenant audit log |
| [Data Operations](/docs/ops-portal/data-ops) | `/ops/data` | Deletion requests, legal holds, retention |
| [Support Operations](/docs/ops-portal/support) | `/ops/support` | Impersonation, announcements, password management |

## Next Steps

- [Dashboard overview](/docs/ops-portal/dashboard)
- [Manage tenants](/docs/ops-portal/tenants)
- [Administer users](/docs/ops-portal/users)
- [View the audit log](/docs/ops-portal/audit)
