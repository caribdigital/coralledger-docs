---
sidebar_position: 4
title: Cross-Tenant Audit Viewer
description: Unified audit log viewer for platform operators in CoralLedger Comply
---

# Cross-Tenant Audit Viewer

The Cross-Tenant Audit Viewer is a platform-level tool that gives CoralLedger operators a unified view of audit activity across all businesses and tenants. It merges records from both `ImmutableAuditEntry` and `SecurityAuditLog` sources into a single, searchable, paginated log.

:::info Platform Operators Only
The Cross-Tenant Audit Viewer is only accessible to CoralLedger platform staff with operator-level permissions. Business owners and firm portal users cannot access this view.
:::

## Overview

### Unified Data Sources

The viewer merges two audit record sources using a server-side fan-out merge:

| Source | Content |
|--------|---------|
| **ImmutableAuditEntry** | All business data events — transactions, returns, settings, user actions |
| **SecurityAuditLog** | Authentication and security events — logins, IP blocks, fraud alerts, 2FA events |

Entries from both sources are combined and ordered chronologically. The **Source** column in the table indicates which log each entry originates from.

### Server-Side Pagination

The viewer uses server-side pagination to handle the large volume of cross-tenant data efficiently. Page size and cursor are managed on the server, and the fan-out merge is performed before results are returned to the client.

## Accessing the Viewer

1. Log in with platform operator credentials
2. Navigate to **Platform > Audit Viewer**
3. The `PLATFORM_OPS_AUDIT_VIEWED` event is logged when the viewer is opened

## Filtering

All filters are applied server-side for performance and accuracy.

### By Event Type

Filter entries by one or more event type categories, including:
- All standard business audit event categories
- `PLATFORM_OPS_*` events (see [Platform Ops Event Types](/docs/audit/platform-ops-events))

### By Business

Select a specific business to scope the view to a single tenant, or leave unset to view records across all businesses.

### By Date Range

- **Start Date** — Beginning of the period (inclusive)
- **End Date** — End of the period (inclusive)

### By Actor Email

Filter entries by the email address of the person who performed the action. Matching is performed server-side against the `NormalizedEmail` field to ensure consistent case-insensitive lookups. A minimum of 3 characters is required to trigger the search.

## Audit Entry Table

Each row in the cross-tenant viewer displays:

| Column | Description |
|--------|-------------|
| **Timestamp** | When the action occurred (UTC) |
| **Business** | The business or tenant the action applies to |
| **Event Type** | Category badge (color-coded) |
| **Action** | Specific action performed |
| **Actor** | Who performed the action (user email or operator ID) |
| **Details** | Summary of changes or affected resources |
| **Source** | `ImmutableAuditEntry` or `SecurityAuditLog` |
| **IP Address** | Source IP address |

## Chain Integrity Verification

The viewer supports two modes of chain verification:

### Per-Business Verification

1. Filter the view to a single business
2. Click **Verify Chain Integrity**
3. The system verifies the hash chain for all `ImmutableAuditEntry` records belonging to that business
4. Results show:
   - Total entries verified
   - Chain status (Intact or Broken)
   - Location of any broken links

### Platform-Wide Verification

1. Leave the business filter unset (all businesses selected)
2. Click **Verify Chain Integrity**
3. The system performs a full platform-wide sweep, checking the chain for every business independently
4. Results include a per-business breakdown of integrity status

A `PLATFORM_OPS_CHAIN_VERIFIED` event is recorded after each verification run, capturing the scope (per-business or platform-wide) and the result.

:::warning Chain Integrity Failures
If broken links are detected in any business's chain, this may indicate unauthorized data modification. Contact the security team immediately.
:::

## Exporting Audit Data

Exports can be initiated from the viewer toolbar:

1. Apply your desired filters (date range, event type, business, actor email)
2. Click **Export**
3. Choose the export format:

| Format | Description |
|--------|-------------|
| **CSV** | Comma-separated values, compatible with Excel and most BI tools |
| **JSON** | Structured JSON array, suitable for programmatic processing |

:::note Export Row Cap
Exports are capped at **10,000 rows** per export. If your filtered result set exceeds 10,000 rows, narrow your filters (e.g., reduce the date range or filter by a single business) and export in multiple batches.
:::

A `PLATFORM_OPS_AUDIT_EXPORTED` event is recorded after each export, capturing the applied filters, row count, and selected format.

## Cross-Tenant Scope

When the viewer is open with no business filter applied, the operator is in **cross-tenant scope**. This is tracked with scope events:

| Event | When It Fires |
|-------|--------------|
| `PLATFORM_OPS_CROSS_TENANT_SCOPE_OPENED` | Operator opens the viewer or clears the business filter |
| `PLATFORM_OPS_CROSS_TENANT_SCOPE_CLOSED` | Operator applies a single-business filter or closes the viewer |

These events provide a complete audit trail of when platform staff had visibility across multiple businesses.

## Best Practices for Operators

1. **Scope to a single business when possible** — Narrowing the scope reduces load time and makes exports more manageable.
2. **Filter by actor email for investigations** — Use the actor email filter to trace all actions performed by a specific user.
3. **Run chain verification after anomalies** — If unexpected entries appear, run per-business chain verification immediately.
4. **Export in smaller batches** — Stay well under the 10,000-row cap by applying tight date ranges.
5. **End impersonation sessions promptly** — Always close impersonation sessions as soon as support tasks are complete to minimize the window of elevated access.

## Related Events

See [Platform Ops Event Types](/docs/audit/platform-ops-events) for the full list of `PLATFORM_OPS_*` events that the viewer itself generates.

## Next Steps

- [Platform Ops Event Types](/docs/audit/platform-ops-events)
- [Audit Trail Overview](/docs/audit)
- [Audit Reports](/docs/audit/audit-reports)
