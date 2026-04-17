---
sidebar_position: 7
title: Transaction History
description: Search and filter historical transactions in CoralLedger Comply
---

# Transaction History

Transaction History provides a complete, searchable record of every transaction ever processed in your account — including transactions from periods that have already been filed. This is distinct from the active **Transactions** view, which focuses on the current unfiled period.

## Accessing Transaction History

Navigate to **VAT Management → Transaction History** in the sidebar.

## Difference from the Active Transactions View

| Feature | Active Transactions | Transaction History |
|---------|--------------------|--------------------|
| **Scope** | Current unfiled period | All periods, including filed |
| **Edit** | Yes | Read-only (filed periods are locked) |
| **Delete** | Yes (compliance rules apply) | Not available |
| **Purpose** | Day-to-day data entry and review | Audit, research, and reporting |

:::info Read-Only for Filed Periods
Transactions that belong to a submitted VAT return are shown in read-only mode in Transaction History. To correct a filed transaction, use an amendment on the relevant VAT return.
:::

## Searching and Filtering

Use the search and filter bar to locate specific transactions:

- **Keyword search** — Matches against description, vendor/customer name, and reference number
- **Date range** — Filter by transaction date or import date
- **Transaction type** — Sales, Purchases, Imports, Exports, Credit Notes, Debit Notes
- **VAT category** — Filter to a specific rate (0%, 5%, 10%, Exempt)
- **Filing status** — Filed, Unfiled, or All
- **Amount range** — Set minimum and maximum net or gross amounts

Combine multiple filters to narrow results. Active filters are shown as removable chips below the search bar.

## Results Table

The results table shows:

| Column | Description |
|--------|-------------|
| **Date** | Transaction date |
| **Type** | Sales, Purchase, Import, Export, etc. |
| **Description** | Transaction description |
| **Vendor / Customer** | Counter-party name |
| **Net Amount** | Amount before VAT |
| **VAT Rate** | Assigned VAT category |
| **VAT Amount** | Calculated VAT |
| **Total** | Gross amount |
| **Period** | VAT return period the transaction belongs to |
| **Status** | Filed or Unfiled |

Click any row to view the full transaction detail, including its complete audit trail.

## Audit Trail per Transaction

Each transaction detail page includes a **History** tab that shows:

- Original import data (if imported via CSV)
- Every category change with the user who made it and a timestamp
- Any manual edits and the reason provided
- Which VAT return (if any) included this transaction

## Exporting History

Click **Export CSV** to download all transactions matching your current filters. Large exports are queued and delivered via an in-app notification with a download link.

## Next Steps

- [Analyze transactions by category](/docs/transactions/category-analytics)
- [View archived records](/docs/transactions/archived-records)
- [Understand the audit trail](/docs/audit)
- [Generate your VAT return](/docs/vat-returns/generate-return)
