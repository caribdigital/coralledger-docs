---
sidebar_position: 3
title: Platform Ops Event Types
description: Reference for all PLATFORM_OPS_* audit event types in CoralLedger Comply
---

# Platform Ops Event Types

Platform Operations (`PLATFORM_OPS_*`) events are generated when CoralLedger platform staff interact with the system through the operator tooling. These events appear in the [Cross-Tenant Audit Viewer](/docs/audit/cross-tenant-audit-viewer) and are also included in per-business audit logs where relevant.

:::info Platform Staff Only
`PLATFORM_OPS_*` events are produced exclusively by CoralLedger platform-level tooling. Regular business users and firm portal users will not generate these events.
:::

## Dashboard & Audit Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_DASHBOARD_ACCESSED` | A platform operator opened the operator dashboard |
| `PLATFORM_OPS_AUDIT_VIEWED` | A platform operator opened the cross-tenant audit viewer |
| `PLATFORM_OPS_AUDIT_EXPORTED` | A platform operator exported audit records (CSV or JSON) |

## User Management Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_USER_VIEWED` | Platform operator viewed a specific user's profile or details |
| `PLATFORM_OPS_USER_LOCKED` | Platform operator locked a user account |
| `PLATFORM_OPS_USER_UNLOCKED` | Platform operator unlocked a previously locked user account |
| `PLATFORM_OPS_USER_PASSWORD_RESET` | Platform operator triggered a password reset for a user |
| `PLATFORM_OPS_USER_DELETED` | Platform operator deleted a user account |

## Tenant Management Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_TENANT_VIEWED` | Platform operator viewed a tenant's details |
| `PLATFORM_OPS_TENANT_ACTIVATED` | Platform operator activated a tenant |
| `PLATFORM_OPS_TENANT_DEACTIVATED` | Platform operator deactivated a tenant |

## Business Management Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_BUSINESS_DEACTIVATED` | Platform operator deactivated a business |
| `PLATFORM_OPS_BUSINESS_REACTIVATED` | Platform operator reactivated a previously deactivated business |
| `PLATFORM_OPS_BUSINESS_DELETION_SCHEDULED` | Platform operator scheduled a business for data deletion |
| `PLATFORM_OPS_BUSINESS_DELETION_CANCELLED` | Platform operator cancelled a previously scheduled data deletion |
| `PLATFORM_OPS_BUSINESS_OWNERSHIP_TRANSFERRED` | Platform operator transferred ownership of a business to a different user |

## Impersonation Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_IMPERSONATION_START` | Platform operator began impersonating a user (support access) |
| `PLATFORM_OPS_IMPERSONATION_END` | Platform operator ended an impersonation session |

:::warning Impersonation Audit
Every impersonation session is bookended by `PLATFORM_OPS_IMPERSONATION_START` and `PLATFORM_OPS_IMPERSONATION_END` events. Any actions taken during an active impersonation session are additionally attributed to the operator in the audit log.
:::

## Data Deletion Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_DATA_DELETION_APPROVED` | Platform operator approved a pending data deletion request |
| `PLATFORM_OPS_DATA_DELETION_REJECTED` | Platform operator rejected a pending data deletion request |
| `PLATFORM_OPS_DATA_DELETION_CANCELLED` | Platform operator cancelled an approved or in-progress data deletion |
| `PLATFORM_OPS_DATA_DELETION_EXECUTED` | System completed the execution of an approved data deletion |

## Chain & Scope Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_CHAIN_VERIFIED` | Platform operator ran a chain integrity verification (per-business or platform-wide) |
| `CROSS_TENANT_SCOPE_OPENED` | Platform operator opened a cross-tenant scope to view data across multiple businesses |
| `CROSS_TENANT_SCOPE_CLOSED` | Platform operator closed an active cross-tenant scope |

## Event Severity Levels

| Severity | Event Examples |
|----------|----------------|
| **Critical** | `IMPERSONATION_START`, `IMPERSONATION_END`, `USER_DELETED`, `DATA_DELETION_EXECUTED`, `BUSINESS_DELETION_SCHEDULED` |
| **Warning** | `USER_LOCKED`, `USER_PASSWORD_RESET`, `TENANT_DEACTIVATED`, `BUSINESS_DEACTIVATED`, `DATA_DELETION_APPROVED` |
| **Normal** | `DASHBOARD_ACCESSED`, `AUDIT_VIEWED`, `USER_VIEWED`, `TENANT_VIEWED`, `CHAIN_VERIFIED`, `CROSS_TENANT_SCOPE_OPENED` |

## Audit Entry Fields

In addition to the [standard audit entry fields](/docs/audit#audit-entry-details), `PLATFORM_OPS_*` entries always include:

- **Operator** — The platform staff member who performed the action (distinct from the regular **User** field for impersonation events)
- **Target** — The user, business, or tenant that was acted upon
- **Scope** — Whether the action was performed in a cross-tenant scope or a single-business scope

## Next Steps

- [Cross-Tenant Audit Viewer](/docs/audit/cross-tenant-audit-viewer)
- [Audit Trail Overview](/docs/audit)
- [Audit Reports](/docs/audit/audit-reports)
