---
sidebar_position: 2
title: Audit Reports
description: View and export audit reports in CoralLedger Comply
---

# Audit Reports

Access detailed audit reports to review all system activity, verify data integrity, and export records for compliance purposes.

## Accessing Audit Reports

Navigate to **Reports > Audit Logs**. Some features require 2FA to be enabled.

## Dashboard Overview

The audit reports page displays summary cards:
- **Total Entries** — Total audit entries in the system
- **Today's Activity** — Actions recorded today
- **Critical Events** — High-severity events requiring attention
- **Compliance %** — Overall audit chain integrity percentage

## Filtering Audit Entries

### By Event Type
Filter by specific categories such as:
- Transaction events
- Return filing events
- User authentication events
- Settings changes
- Security events

### By Date Range
- **Start Date** — Beginning of the reporting period
- **End Date** — End of the reporting period

## Audit Entry Table

Each row in the audit table shows:

| Column | Description |
|--------|-------------|
| **Timestamp** | When the action occurred (UTC) |
| **Event Type** | Category badge (color-coded) |
| **Action** | What was done |
| **User** | Who performed the action |
| **Details** | Summary of changes |
| **Severity** | Normal, Warning, or Critical |
| **IP Address** | Source IP address |

## Hash Chain Verification

Verify the integrity of your audit trail:

1. Click **Verify Chain Integrity**
2. The system checks each entry's hash against the previous entry
3. Results show:
   - Total entries verified
   - Chain status (Intact or Broken)
   - Location of any broken links

:::warning Chain Integrity
If broken links are detected, this may indicate unauthorized data modification. Contact support immediately.
:::

## Reverting Changes

For manual overrides and corrections, administrators can revert specific audit entries:

1. Find the entry to revert
2. Click the **Revert** button
3. Confirm the reversion in the dialog
4. A new audit entry is created recording the reversion

## Exporting Audit Data

Export your audit trail for external review or compliance documentation:

1. Apply your desired filters (date range, event type)
2. Click **Download as CSV**
3. The export includes all visible columns

## Best Practices

1. **Review critical events daily** — Check for unexpected security or data events
2. **Verify chain integrity monthly** — Run the hash verification to confirm no tampering
3. **Export quarterly** — Keep external backups of audit data for your records
4. **Investigate anomalies** — Follow up on any unexpected entries

## Next Steps

- [Audit trail overview](/docs/audit)
- [Security features](/docs/security)
- [Compliance dashboard](/docs/compliance)
