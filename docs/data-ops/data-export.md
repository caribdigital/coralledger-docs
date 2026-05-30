---
sidebar_position: 5
title: Business Data Export
description: Export business data as CSV / Excel / JSON / XML through the tenant Admin surface; the cross-tenant Ops export is service-only today
---

# Business Data Export

CoralLedger Comply exposes business data export through two paths today, with different scopes and constraints.

## Tenant Admin export — the shipped UI

The tenant Admin Data Export surface lets an Administrator export the business's own data in several formats. It is the canonical user-facing export path.

### Accessing the export

Navigate to **Admin > Data Export** (route: `/admin/data-export`). This surface requires Administrator access with 2FA enabled. The current business context applies — exports are scoped to the business you are signed into.

### Supported export categories

| Category | Format(s) |
|---|---|
| **Transactions** | CSV, JSON |
| **VAT Returns** | Excel |
| **Compliance Report** | (formatted output) |
| **VAT XML** | DIR-accepted XML for OTAS submission |
| **Anomaly Report** | (formatted output) |

Each export is generated synchronously — when you click **Export**, the file is generated and offered for download immediately. There is no separate queue or job-status surface.

### What scoping applies

Exports run server-side and are strictly scoped to the current `BusinessId` (enforced via `IBusinessContextService`). Without a business context, the surface throws `UnauthorizedAccessException` — there is no tenant-Admin path to export another business's data.

## Ops Portal full-business JSON export — service only today

For cross-tenant export use cases (regulatory submissions, legal discovery, off-platform archiving), CoralLedger exposes the `IPlatformDataOpsService.ExportBusinessDataAsync` service method. It returns a complete JSON snapshot of a business's data including transactions, VAT returns, compliance scores, import batches, and privacy settings.

:::warning No Ops Portal UI today
A dedicated `/ops/data/export` Razor page is **not yet implemented**. The service method exists and is invoked programmatically by Comply support; an Ops Portal user-facing export page is planned but not built. If you need a cross-tenant export, raise it with the support team.
:::

When the service is invoked, it emits a `PLATFORM_OPS_DATA_DELETION_EXPORT` audit event capturing the requesting operator and the target business.

## What an Ops JSON export contains (when produced)

The cross-tenant JSON export contains:

| Data category | Contents |
|---|---|
| **Transactions** | All transaction records including amounts, categories, VAT, and attachment metadata |
| **VAT Returns** | All generated, lodged, and amended returns with line-item detail |
| **Compliance Scores** | Historical compliance score snapshots |
| **Import Batches** | Records of all CSV and bulk import operations |
| **Privacy Settings** | The business's privacy configuration and consent records |

:::info File attachments not included
File attachments (binary content) are not included in the JSON export. The export contains attachment metadata — file name, type, size, and storage reference. Contact support if you need raw file exports.
:::

## Security considerations

- Tenant Admin exports run synchronously and require Administrator + 2FA; the file is delivered to the requesting operator's browser session and is not stored on the platform.
- Ops Portal service-method exports return bytes to the requesting service; persistence is the support team's responsibility once the export is produced.
- The `PLATFORM_OPS_DATA_DELETION_EXPORT` audit event traces every Ops-driven export.

## Use cases

| Scenario | Path |
|---|---|
| **Regulatory submission to DIR** | Tenant Admin export — VAT XML or PDF artefacts of returns are usually the right surface |
| **Legal discovery** | Coordinate with support; the Ops service-method export is the route until the UI ships |
| **Business migration** | Tenant Admin transactions export (CSV/JSON) is usually sufficient for re-import elsewhere |
| **Data subject request (DSAR)** | Ops service-method export is the right surface; support produces the JSON and delivers it through an authenticated channel |

## Next steps

- [Deletion requests](/docs/data-ops/deletion-requests)
- [Legal holds](/docs/data-ops/legal-holds)
- [Retention monitoring](/docs/data-ops/retention-monitoring)
- [Audit trail](/docs/audit/)
