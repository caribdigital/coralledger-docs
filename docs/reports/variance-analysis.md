---
sidebar_position: 3
title: Variance Analysis
description: Analyze import vs. sales variances for VAT compliance
---

# Variance Analysis

The variance analysis report compares C7 customs import data against sales revenue to identify discrepancies, calculate margins, and flag potential compliance issues.

## Accessing the Report

Navigate to **Reports > Variance Analysis**.

## Running an Analysis

1. Select the **Period Start** date
2. Select the **Period End** date
3. Click **Run Analysis**

## Summary Cards

After running an analysis, three summary cards display:

### C7 Customs Imports
- Total import value
- Number of customs entries
- Import VAT calculated

### Sales Revenue
- Total sales value
- Number of sales transactions
- Output VAT collected

### Gross Margin
- Margin percentage
- Anomaly warning if margin falls outside normal range

## Attention Flags

The system automatically generates severity-based attention flags:
- **Critical** — Issues requiring immediate investigation
- **Review** — Items that should be examined
- **Warning** — Potential concerns to monitor

Each flag shows:
- Description of the issue
- Recommended action
- Number of affected items
- Total value involved

## Category Variance Table

A detailed breakdown by category showing:

| Column | Description |
|--------|-------------|
| **Category** | Transaction category |
| **Import Value** | Total import amount (with entry count) |
| **Sales Value** | Total sales amount (with transaction count) |
| **Variance** | Difference between imports and sales (+/-) |
| **Margin %** | Calculated margin with anomaly badge if unusual |

## VAT Reconciliation

A summary reconciliation showing:
- **Box 14 (Import VAT)** — VAT paid on imports
- **Output VAT (Sales)** — VAT collected on sales
- **Net VAT Position** — Whether you owe VAT or are eligible for a refund

## Next Steps

- [Cash flow reports](/docs/reports/cash-flow)
- [Custom reports](/docs/reports/custom-reports)
- [Compliance dashboard](/docs/compliance)
