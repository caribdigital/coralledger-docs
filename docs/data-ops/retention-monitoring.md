---
sidebar_position: 4
title: Retention Monitoring
description: Data retention policies, enforcement preview, and violation detection in CoralLedger Comply
---

# Retention Monitoring

CoralLedger Comply enforces per-business data retention policies through scheduled enforcement runs. The default retention period is **7 years** (5-year statutory minimum under [Value Added Tax Act, 2014, Part X §79–80](https://laws.bahamas.gov.bs/); CoralLedger extends this to 7 years as platform policy). Operators can review retention schedules, preview upcoming enforcement actions, and investigate detected violations before data is affected.

## Accessing Retention Monitoring

Navigate to **Platform Ops > Data Operations > Retention**. This feature requires PlatformAdmin access.

## Default Retention Policy

All businesses are subject to the platform-wide default:

| Setting | Value | Basis |
|---------|-------|-------|
| **Minimum retention period** | 7 years (CoralLedger policy; 5-year statutory minimum extended) | [Value Added Tax Act, 2014, Part X §79–80](https://laws.bahamas.gov.bs/) |
| **Applies to** | Transactions, VAT returns, audit records, uploaded files | — |
| **Enforcement** | Scheduled; runs on a scheduled basis | — |

Records that are within their retention window cannot be permanently deleted, regardless of operator action or approved deletion requests.

### Why "five years" appears multiple times in the VAT Act 2014

The 5-year retention period (which CoralLedger Comply extends to 7 years) is set by **§79(2)** of the VAT Act 2014, within **Part X — Record Keeping and Accounts**. Readers familiar with the Act may encounter two other "five years" that are **not** the retention obligation — distinguishing them prevents the citation confusion that has crept into Bahamian VAT documentation in the past:

1. **Part VIII — Assessments.** The Comptroller has five years after a VAT return is filed to make a tax assessment. This is the *Comptroller's assessment window*, not the taxpayer's record-retention obligation. The two clocks run independently — retaining records under §79(2) is a separate obligation from the Comptroller's right to assess under Part VIII.
2. **§50 — Input tax deduction.** §50 requires that documentation supporting an input-tax-deduction claim exist *at the time the return is filed*, but §50 itself sets **no retention period**. The retention obligation is in §79(2); §50 governs *allowability*, not *retention*. (A propagated mis-citation of §50 as the retention authority was corrected across CoralLedger documentation on 2026-05-31; see [`CASS-VAT-ACT-RETENTION-VERIFICATION-2026-05-31.md`](https://github.com/caribdigital/coralledgercomply/blob/master/tasks/comply/CASS-VAT-ACT-RETENTION-VERIFICATION-2026-05-31.md) for the verification bundle.)

CoralLedger Comply's retention enforcement is grounded in §79(2). Operators citing the legal basis to clients or auditors should cite **VAT Act, 2014, Part X, §§79–80**.

Verbatim §79(2):

> Accounting records maintained pursuant to this section must be kept for a period of **five years** after —
>
> (a) the end of the tax period to which such records relate, in the case of a registrant; or
>
> (b) the occurrence of the taxable transaction to which such records relate.

## Per-Business Retention Policies

Operators can configure a custom retention policy for each business:

1. Navigate to **Platform Ops > Data Operations > Retention > Policies**
2. Select the business
3. Adjust the retention period (minimum 7 years; longer periods are permitted)
4. Click **Save Policy**

:::info
Custom policies can only extend the retention period beyond the 7-year minimum. Reducing a business's retention period below 7 years is not permitted.
:::

## Policy Summary

The **Policy Summary** table lists all businesses with their configured retention settings:

| Column | Description |
|--------|-------------|
| **Business** | Business name |
| **Policy** | Custom or Default |
| **Retention Period** | Configured retention window |
| **Records in Window** | Count of records currently within retention |
| **Upcoming Purges** | Records scheduled for purge in the next 90 days |
| **Violations** | Count of active policy violations |

## Enforcement Preview

Before retention enforcement runs, operators can preview which records are scheduled to be purged:

1. Navigate to **Platform Ops > Data Operations > Retention > Preview**
2. Select the business (or view all)
3. Set the preview window (e.g., next 30, 60, or 90 days)
4. Click **Run Preview**

The preview shows:
- **Record Type** — Transaction, return, file, etc.
- **Record ID** — Unique identifier
- **Created Date** — When the record was created
- **Retention Expiry** — When the record is eligible for purge
- **Legal Hold** — Whether a legal hold is blocking purge

:::tip
Use enforcement preview before each scheduled purge run to ensure no unexpectedly critical records are about to be removed.
:::

## Violation Detection

The system continuously monitors for retention policy violations — records that should have been retained but were prematurely deleted, or records past their retention window that have not yet been purged.

### Viewing Violations

The retention monitor surface exposes a **HasViolations** indicator on each business's policy summary card. The full per-violation drill-down with the columns below is **planned functionality** — the violation count is computed today via `RetentionMonitorSummary.HasViolations`, but a dedicated violations page is not yet implemented in the Comply UI:

| Column | Description |
|--------|-------------|
| **Violation ID** | Unique identifier |
| **Business** | Affected business |
| **Record Type** | Type of affected record |
| **Record ID** | Affected record identifier |
| **Violation Type** | Premature deletion or retention overrun |
| **Detected On** | When the violation was flagged |
| **Severity** | Low, Medium, or High |

When a non-zero violation count appears on a business, contact the security team for the underlying detail until the dedicated UI ships.

### Resolving Violations

1. Review the violation details to understand the cause
2. For premature deletion violations, check the [Audit Trail](/docs/audit) for the deletion event
3. Mark the violation as reviewed once investigated
4. If data recovery is required, contact support

## Enforcement Run

When the enforcement schedule triggers (or an operator manually initiates a run):

1. Records past their retention window are identified
2. Records under a [legal hold](/docs/data-ops/legal-holds) are skipped
3. Records within an active deletion grace period are skipped
4. Eligible records are permanently purged
5. A summary report is written to the Audit Trail

To manually trigger an enforcement run:

1. Navigate to **Platform Ops > Data Operations > Retention > Enforce**
2. Select the scope (single business or all)
3. Review the enforcement preview
4. Click **Run Enforcement**

:::warning
Enforcement purges are permanent and cannot be undone. Always run and review an enforcement preview first.
:::

## Best Practices

1. **Review the enforcement preview monthly** — Avoid unexpected purges of important records
2. **Set longer retention for high-risk businesses** — Businesses under audit or with litigation should have extended periods
3. **Resolve violations promptly** — Unresolved violations may indicate a compliance gap
4. **Coordinate with legal holds** — Ensure that any records subject to litigation are held before enforcement runs
5. **Export before purge** — Use [Business Data Export](/docs/data-ops/data-export) to archive records before they are purged if needed

## By Statute References

- [Record Keeping and Retention](/docs/statutes/record-keeping-retention)

## Next Steps

- [Deletion requests](/docs/data-ops/deletion-requests)
- [Legal holds](/docs/data-ops/legal-holds)
- [Business data export](/docs/data-ops/data-export)
- [Audit trail](/docs/audit)
- [VAT Act compliance reference](/docs/compliance/vat-2025-reforms)
