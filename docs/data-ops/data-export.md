---
sidebar_position: 5
title: Business Data Export
description: Export a complete JSON snapshot of business data in CoralLedger Comply
---

# Business Data Export

Operators can export a complete snapshot of all data belonging to a business as a structured JSON file. This is useful for regulatory submissions, legal discovery, off-platform archiving, and migrations.

## Accessing Business Data Export

Navigate to **Platform Ops > Data Operations > Export**. This feature requires PlatformAdmin access.

## What Is Included in the Export

A full business data export contains:

| Data Category | Contents |
|---------------|---------|
| **Transactions** | All transaction records including amounts, categories, VAT, and attachments metadata |
| **VAT Returns** | All generated and submitted returns with line-item detail |
| **Compliance Scores** | Historical compliance score snapshots for the business |
| **Import Batches** | Records of all CSV and bulk import operations |
| **Privacy Settings** | The business's data privacy configuration and consent records |

:::info
File attachments (binary content) are not included in the JSON export. The export contains attachment metadata — file name, type, size, and storage reference. Contact support if you require raw file exports.
:::

## Running an Export

1. Navigate to **Platform Ops > Data Operations > Export**
2. Select the target business from the dropdown
3. Optionally filter by date range to limit the export scope
4. Click **Export Business Data**
5. The system queues the export job; a progress indicator is displayed
6. When complete, click **Download** to save the JSON file

For large businesses, export generation may take several minutes. You will receive an in-app notification and an email when the export is ready.

## Export File Format

The export is delivered as a single `.json` file named:

```
coralledger-export-{businessId}-{YYYY-MM-DD}.json
```

The top-level structure is:

```json
{
  "exportedAt": "2025-08-15T10:30:00Z",
  "exportedBy": "operator@example.com",
  "transactions": [ ... ],
  "vatReturns": [ ... ],
  "complianceScores": [ ... ],
  "importBatches": [ ... ],
  "privacySettings": { ... }
}
```

## Export History

Each export is recorded in the Export History table with:

- **Export ID** — Unique identifier
- **Business** — Name of the exported business
- **Requested By** — Operator who triggered the export
- **Requested At** — Date and time of the request
- **Status** — Queued, Processing, Complete, or Failed
- **Download** — Link to download the completed export

## Security Considerations

- Exports are generated server-side and stored in access-controlled storage
- Only the requesting operator can download the export file
- Each export download is recorded in the [Audit Trail](/docs/audit)
- Exports should be stored securely and in compliance with your data handling obligations

## Use Cases

| Scenario | Notes |
|----------|-------|
| **Regulatory audit** | Provide the full JSON export to DIR or other authorities |
| **Legal discovery** | Export before or alongside legal hold placement |
| **Business migration** | Export data before moving to another system |
| **Off-platform archive** | Retain a copy outside CoralLedger for long-term storage |
| **Data subject request** | Fulfil a data subject access request (DSAR) |

## Next Steps

- [Deletion requests](/docs/data-ops/deletion-requests)
- [Legal holds](/docs/data-ops/legal-holds)
- [Retention monitoring](/docs/data-ops/retention-monitoring)
- [Audit trail](/docs/audit)
