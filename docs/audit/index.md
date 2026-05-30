---
sidebar_position: 1
title: Audit Trail Overview
description: Immutable audit trail and compliance logging in CoralLedger Comply
---

# Audit Trail

CoralLedger Comply maintains an immutable audit trail of all data modifications, providing full traceability for regulatory compliance and internal accountability.

## Why Audit Trails Matter

[Value Added Tax Act, 2014, s. 50](https://laws.bahamas.gov.bs/) requires businesses to maintain records for 7 years. CoralLedger Comply's audit trail ensures:
- **Regulatory compliance** — Complete record of all data changes
- **Accountability** — Every action is attributed to a specific user
- **Integrity** — Hash-chain verification prevents tampering
- **Recovery** — Ability to trace and understand any data change

## Key Features

### Immutable Hash-Chain
Each audit entry includes a cryptographic hash of the previous entry, creating an unbreakable chain. Any attempt to modify or delete entries breaks the chain and is immediately detectable.

### Append-only at the application layer
The `ImmutableAuditEntry` table is treated as append-only by application code — no `UPDATE` or `DELETE` operation runs against it from the service layer. Combined with the hash chain (above), modifications are detectable. Database-level Write-Once-Read-Many enforcement depends on operator configuration (PostgreSQL row-level security and operator privilege separation) and is not a guarantee from the application alone.

### 7-Year Retention
All audit data is retained for a minimum of 7 years, in compliance with [Value Added Tax Act, 2014, s. 50](https://laws.bahamas.gov.bs/).

### Chain Integrity Verification
Administrators can verify the integrity of the entire audit chain at any time, detecting any broken links or tampering attempts.

## What Gets Logged

| Event Category | Examples |
|----------------|----------|
| **Transactions** | Created, modified, deleted, imported |
| **VAT Returns lifecycle** | `FILING_INITIATED`, `FILING_ARTIFACTS_GENERATED`, `RETURN_APPROVED_BY_SIGNATORY`, `ACK_SECTION61`, `RETURN_LODGED_WITH_DIR` (with artifact checksums), `RETURN_LODGEMENT_RETRACTED`, `PAYMENT_RECORDED`, `NO_PAYMENT_DUE` — see [VAT Returns lifecycle](/docs/vat-returns/) |
| **§32 Attestation lifecycle** | `ATTESTATION_CREATED`, `ATTESTATION_SUPERSEDED`, `ATTESTATION_VOIDED_BY_ASSIGNMENT_CHANGE`, `ATTESTATION_RE_ATTEST_REQUIRED`, `ATTESTATION_MODAL_CANCELLED` — see [§32 Attestation Overview](/docs/attestation/) |
| **User Actions** | Login, logout, password change, 2FA events |
| **Settings Changes** | Business profile updates, permission changes |
| **Security Events** | Failed logins, IP blocks, fraud alerts |
| **Client Management** | Client added, modified, deactivated |
| **Platform Ops** | Operator dashboard access, user/tenant/business management, impersonation, data deletion, cross-tenant scope |

See [Platform Ops Event Types](/docs/audit/platform-ops-events) for a full reference of all `PLATFORM_OPS_*` events.

:::warning Filter dropdown does not yet expose the lodgement events
The per-business audit viewer's event-type filter dropdown is hard-coded today and does not include the VAT Returns lifecycle events (`FILING_INITIATED`, `RETURN_LODGED_WITH_DIR`, etc.). The events are still written to the ledger and appear under the "All Events" filter — they just cannot be filtered for explicitly. Tracked as a Comply repo follow-up.
:::

## Audit Entry Details

Each audit entry records:
- **Timestamp** — Exact UTC time of the action
- **Event Type** — Category of the action
- **Action** — Specific action performed
- **User** — Who performed the action
- **Details** — Before/after values where applicable
- **Severity** — Normal, Warning, or Critical
- **IP Address** — Source IP of the action

## Accessing the Audit Trail

The per-business audit log lives at `/reports/audit` (also reachable as `/reports/audit-logs` — both routes bind the same page). Navigate via **Reports > Audit Logs** in the sidebar.

The page exposes filters by event type, actor, entity type, start/end date; a server-paginated grid; chain-integrity verification; and a filtered export (see [Audit Reports](/docs/audit/audit-reports)). For platform operators, the [Cross-Tenant Audit Viewer](/docs/audit/cross-tenant-audit-viewer) at `/ops/audit` provides a unified cross-business view.

## Cross-Tenant Audit Viewer

Platform operators can access a unified view of audit activity across all businesses and tenants using the [Cross-Tenant Audit Viewer](/docs/audit/cross-tenant-audit-viewer). This viewer merges `ImmutableAuditEntry` and `SecurityAuditLog` sources, supports server-side filtering and pagination, and allows CSV/JSON export up to 10,000 rows.

## Next Steps

- [View audit reports](/docs/audit/audit-reports)
- [Platform Ops event types](/docs/audit/platform-ops-events)
- [Cross-Tenant Audit Viewer](/docs/audit/cross-tenant-audit-viewer)
- [Security overview](/docs/security)
- [Data retention policy](/docs/billing)
