---
sidebar_position: 8
title: Archived Records
description: Access and understand archived transaction data in CoralLedger Comply
---

# Archived Records

Archived Records is the long-term store for transaction data that is no longer part of an active filing workflow but must be retained for regulatory compliance. CoralLedger Comply retains all transaction data for **7 years** in accordance with VAT Act Section 50.

## Accessing Archived Records

Navigate to **VAT Management → Archived Records** in the sidebar.

## What Gets Archived

A transaction record is moved to Archived Records when:

1. **The VAT return it belongs to is filed and the retention window has passed the active threshold** — filed returns older than the current and two preceding periods are moved out of the standard Transaction History view and into Archives.
2. **The business account is closed or suspended** — all transactions are archived immediately.
3. **A data retention policy applies** — records scheduled for archiving by an administrator or compliance rule.

Archived records are **read-only**. They cannot be edited, recategorized, or deleted (unless a formal deletion request is raised via [Data Operations](/docs/data-ops/deletion-requests)).

## Browsing Archived Records

The Archived Records page works similarly to [Transaction History](/docs/transactions/transaction-history) but spans all archived periods.

### Search and Filters

- **Keyword search** — Matches description, vendor/customer name, and reference number
- **Date range** — Filter by transaction date
- **Transaction type** — Sales, Purchases, Imports, Exports, Credit Notes, Debit Notes
- **VAT category** — Filter by rate
- **Archive date** — When the record was moved to archive

### Results Table

| Column | Description |
|--------|-------------|
| **Date** | Original transaction date |
| **Type** | Transaction type |
| **Description** | Transaction description |
| **Vendor / Customer** | Counter-party name |
| **Net Amount** | Amount before VAT |
| **VAT Rate** | VAT category at the time of filing |
| **VAT Amount** | VAT amount |
| **Total** | Gross amount |
| **Return Period** | The VAT return this transaction was filed under |
| **Archived On** | Date the record entered the archive |

## Viewing a Record

Click any row to open the full record detail. The detail view includes:

- All original transaction fields
- The complete audit trail (category changes, manual edits, filing events)
- The filed VAT return reference number

## Retention Policy

CoralLedger Comply enforces the following retention schedule:

| Retention Stage | Duration | Status |
|-----------------|----------|--------|
| Active | Current + 2 prior periods | Editable (unfiled); read-only (filed) |
| Transaction History | Up to 7 years from transaction date | Read-only |
| Archived Records | 7-year minimum, configurable longer | Read-only |
| Scheduled Deletion | After retention expiry | Requires deletion request approval |

:::warning Legal Holds
Records under an active legal hold are never deleted regardless of the retention schedule. See [Legal Holds](/docs/data-ops/legal-holds) for details.
:::

## Exporting Archived Data

Click **Export CSV** to download records matching your current filters. Exports are processed asynchronously and delivered via an in-app notification.

For bulk data exports covering an entire period or full account history, use [Data Export](/docs/data-ops/data-export) in the Data Operations section.

## Next Steps

- [Transaction History](/docs/transactions/transaction-history)
- [Data retention monitoring](/docs/data-ops/retention-monitoring)
- [Deletion requests](/docs/data-ops/deletion-requests)
- [Legal holds](/docs/data-ops/legal-holds)
