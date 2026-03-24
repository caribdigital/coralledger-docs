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

## Authentication & Dashboard Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_LOGIN` | Platform operator logged in to the operator portal |
| `PLATFORM_OPS_DASHBOARD_ACCESSED` | Platform operator opened the operator dashboard |
| `PLATFORM_OPS_DASHBOARD_VIEWED` | Platform operator viewed the operator dashboard |
| `PLATFORM_OPS_AUDIT_VIEWED` | Platform operator opened the cross-tenant audit viewer |
| `PLATFORM_OPS_AUDIT_LOG_VIEWED` | Platform operator viewed an individual audit log entry |
| `PLATFORM_OPS_AUDIT_EXPORTED` | Platform operator exported audit records (CSV or JSON) |

## User Management Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_USER_LIST_VIEWED` | Platform operator listed users |
| `PLATFORM_OPS_USER_VIEWED` | Platform operator viewed a specific user's profile or details |
| `PLATFORM_OPS_USER_MODIFIED` | Platform operator modified a user's account details |
| `PLATFORM_OPS_USER_LOCKED` | Platform operator locked a user account |
| `PLATFORM_OPS_USER_UNLOCKED` | Platform operator unlocked a previously locked user account |
| `PLATFORM_OPS_USER_PASSWORD_RESET` | Platform operator triggered a password reset for a user |
| `PLATFORM_OPS_FORCE_PASSWORD_CHANGE` | Platform operator forced a user to change their password on next login |
| `PLATFORM_OPS_USER_EMAIL_CONFIRMED` | Platform operator manually confirmed a user's email address |
| `PLATFORM_OPS_USER_2FA_ENABLED` | Platform operator enabled 2FA for a user |
| `PLATFORM_OPS_USER_2FA_DISABLED` | Platform operator disabled 2FA for a user |
| `PLATFORM_OPS_USER_SESSIONS_REVOKED` | Platform operator revoked all active sessions for a user |
| `PLATFORM_OPS_USER_REMOVED_FROM_BUSINESS` | Platform operator removed a user from a business |
| `PLATFORM_OPS_USER_REASSIGNED` | Platform operator reassigned a user to a different business or role |
| `PLATFORM_OPS_USER_BULK_LOCKED` | Platform operator bulk-locked multiple user accounts |
| `PLATFORM_OPS_USER_BULK_UNLOCKED` | Platform operator bulk-unlocked multiple user accounts |
| `PLATFORM_OPS_USER_BULK_EMAIL_CONFIRMED` | Platform operator bulk-confirmed email addresses for multiple users |
| `PLATFORM_OPS_USER_DELETED` | Platform operator deleted a user account |
| `PLATFORM_OPS_INVITATION_CREATED` | Platform operator created a new user invitation |
| `PLATFORM_OPS_INVITATION_RESENT` | Platform operator resent a pending user invitation |
| `PLATFORM_OPS_INVITE_SENT` | Platform operator sent an invite to join a business |

## Tenant Management Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_TENANT_LIST_VIEWED` | Platform operator listed tenants |
| `PLATFORM_OPS_TENANT_VIEWED` | Platform operator viewed a tenant's details |
| `PLATFORM_OPS_TENANT_ACTIVATED` | Platform operator activated a tenant |
| `PLATFORM_OPS_TENANT_DEACTIVATED` | Platform operator deactivated a tenant |

## Business Management Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_BUSINESS_MODIFIED` | Platform operator modified a business's details |
| `PLATFORM_OPS_BUSINESS_DEACTIVATED` | Platform operator deactivated a business |
| `PLATFORM_OPS_BUSINESS_REACTIVATED` | Platform operator reactivated a previously deactivated business |
| `PLATFORM_OPS_BUSINESS_DELETION_SCHEDULED` | Platform operator scheduled a business for data deletion |
| `PLATFORM_OPS_BUSINESS_DELETION_CANCELLED` | Platform operator cancelled a previously scheduled data deletion |
| `PLATFORM_OPS_BUSINESS_OWNERSHIP_TRANSFERRED` | Platform operator transferred ownership of a business to a different user |
| `PLATFORM_OPS_BUSINESS_MERGED` | Platform operator merged two business records |
| `PLATFORM_OPS_FIRM_MODIFIED` | Platform operator modified a firm's details |

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
| `PLATFORM_OPS_DELETION_REQUEST_PROCESSED` | A data deletion request was processed (outcome captured in event details) |
| `PLATFORM_OPS_DATA_DELETION_PROCESSED` | Data deletion was executed by the system |

## Platform Administration Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_FEATURE_FLAG_CHANGED` | Platform operator changed a feature flag |
| `PLATFORM_OPS_VAT_RATE_CHANGED` | Platform operator updated a VAT rate |
| `PLATFORM_OPS_SUPPORT_ACTION` | Platform operator performed a general support action |
| `PLATFORM_OPS_DATA_CORRECTION` | Platform operator applied a data correction |
| `PLATFORM_OPS_ANNOUNCEMENT_CREATED` | Platform operator created a system announcement |
| `PLATFORM_OPS_ANNOUNCEMENT_DELETED` | Platform operator deleted a system announcement |

## Chain & Scope Events

| Event Type | Description |
|------------|-------------|
| `PLATFORM_OPS_CHAIN_VERIFIED` | Platform operator ran a chain integrity verification (per-business or platform-wide) |
| `PLATFORM_OPS_CROSS_TENANT_SCOPE_OPENED` | Platform operator opened a cross-tenant scope to view data across multiple businesses |
| `PLATFORM_OPS_CROSS_TENANT_SCOPE_CLOSED` | Platform operator closed an active cross-tenant scope |

:::note Scope Event Availability
`PLATFORM_OPS_CROSS_TENANT_SCOPE_OPENED` and `PLATFORM_OPS_CROSS_TENANT_SCOPE_CLOSED` are defined as constants but may not be actively fired in all deployments. Check with your platform team if you need to rely on these events for audit queries.
:::

## Audit Entry Fields

`PLATFORM_OPS_*` entries use the same structure as all other audit entries. The fields most relevant to platform ops events are:

- **ActorId** — Identifies the platform staff member who performed the action. During an active impersonation session this reflects the operator, not the impersonated user.
- **TargetType / TargetId** — Identify the resource that was acted upon (e.g., a user, business, or tenant).

## Next Steps

- [Cross-Tenant Audit Viewer](/docs/audit/cross-tenant-audit-viewer)
- [Audit Trail Overview](/docs/audit)
- [Audit Reports](/docs/audit/audit-reports)
