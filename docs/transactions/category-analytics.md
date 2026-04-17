---
sidebar_position: 6
title: Category Analytics
description: Analyze transaction patterns by VAT category in CoralLedger Comply
---

# Category Analytics

Category Analytics gives you a breakdown of your transactions by VAT category, helping you spot classification trends, validate your VAT rate assignments, and ensure your returns accurately reflect your business activity.

## Accessing Category Analytics

Navigate to **VAT Management → Category Analytics** in the sidebar.

## Overview Panel

The top of the page shows summary statistics across all categories:

| Metric | Description |
|--------|-------------|
| **Total Transactions** | Count of all transactions in the selected period |
| **Total Net Value** | Combined net amount across all categories |
| **Total VAT** | Total VAT collected or paid |
| **Categories Used** | Number of distinct VAT categories present in your data |

## Category Breakdown Table

The main table lists each VAT category with the following columns:

| Column | Description |
|--------|-------------|
| **Category** | VAT rate or exempt category name |
| **Transaction Count** | Number of transactions assigned to this category |
| **Net Amount** | Total net value of transactions in the category |
| **VAT Amount** | Total VAT amount for the category |
| **% of Total** | Share of total transactions this category represents |

Click any row to drill into the individual transactions for that category.

## Filtering and Date Range

Use the controls at the top of the page to narrow the analysis:

- **Date range** — Select a preset (current month, last quarter, last year) or enter a custom start and end date
- **Transaction type** — Filter to Sales, Purchases, Imports, Exports, or All
- **Search** — Find a specific category by name

## Interpreting the Data

### VAT Rate Classification Accuracy

A healthy dataset should match your known business mix. Red flags to investigate:

- A large spike in **Exempt** transactions for a business that typically sells standard-rated goods may indicate mis-categorization.
- Unexpectedly high **0% (Zero-Rated)** volume should correlate with documented export activity.
- Significant **5% (Reduced Rate)** transactions should match your expected breadbasket activity; see the [VAT Categorization](/docs/transactions/categorization) page for eligible items and conditions.

### Trend Comparison

If you have prior period data, a **Period-over-Period** toggle appears when two comparable date ranges are available. Use this to detect sudden shifts in category mix that may warrant review before generating a return.

## Exporting Analytics Data

Click **Export CSV** to download the category summary table for the selected date range. The export includes all columns visible in the table.

## Next Steps

- [Understand how categorization works](/docs/transactions/categorization)
- [Review transaction history](/docs/transactions/transaction-history)
- [Generate your VAT return](/docs/vat-returns/generate-return)
- [View the VAT rates reference](/docs/reference/vat-rates)
