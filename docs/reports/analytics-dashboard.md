---
sidebar_position: 2
title: Analytics Dashboard
description: Per-business VAT analytics, trend charts, and category breakdowns
---

# Analytics Dashboard

The Analytics Dashboard gives you a visual overview of your business's VAT position and transaction patterns. Use it to spot trends, compare periods, and understand how your data quality feeds into your compliance score.

## Accessing the Dashboard

Navigate to **Analytics** in the main sidebar under the MAIN section.

The dashboard updates automatically whenever new transactions are imported or categorised. No manual refresh is required.

## Dashboard Overview

The Analytics Dashboard is divided into several panels:

| Panel | Purpose |
|-------|---------|
| **VAT Trend Chart** | Period-over-period output tax, input tax, and net VAT |
| **Output vs Input Breakdown** | Bar chart comparing output and input tax by period |
| **Category Breakdown** | Pie / donut chart of transaction categories by value |
| **Period Summary Cards** | Key figures for the currently selected period |

## VAT Trend Charts

### What the Chart Shows

The VAT Trend Chart plots three lines across the selected date range:

- **Output Tax** — VAT collected on sales (taxable supplies)
- **Input Tax** — VAT paid on purchases (claimable input tax)
- **Net VAT** — Output tax minus input tax (your net liability or refund position)

Each data point represents one filing period (typically one month).

### Reading the Chart

- A rising **Output Tax** line indicates growing sales.
- A rising **Input Tax** line indicates growing business expenditure.
- When **Net VAT** is positive, you owe VAT to the DIR; when negative, you may be owed a refund.
- Gaps or flat lines often indicate periods with no imported transactions — check for missing data.

### Period-over-Period Comparisons

Hover over any point on the chart to see a tooltip with:

- Current period value
- Previous period value
- Percentage change

This makes it easy to identify seasonal patterns or sudden spikes that may require investigation.

## Output vs Input Breakdown

The grouped bar chart displays output and input tax side-by-side for each period in the selected range. Use it to:

- Quickly assess whether your VAT liability is increasing or decreasing.
- Identify periods where input tax is unusually high or low.
- Spot anomalies that may indicate miscategorised transactions.

## Category Breakdowns

The category breakdown visualises how your transactions are distributed across VAT categories:

| Category | Description |
|----------|-------------|
| **Standard Rate (10%)** | Goods and services subject to the standard Bahamas VAT rate |
| **Zero Rate (0%)** | Exports and zero-rated supplies |
| **Exempt** | Supplies exempt from VAT (e.g. residential rent, basic foodstuffs) |
| **Out of Scope** | Transactions outside the VAT system |

### How to Use the Category Chart

- A large **Exempt** or **Out of Scope** slice may indicate uncategorised transactions that need review.
- The percentage shown beside each category reflects its share of total transaction value (not count).
- Click a category slice to filter the transaction list to that category for deeper inspection.

## Date Filtering

Use the date filter controls at the top of the dashboard to change the analysis window.

### Available Presets

| Preset | Covers |
|--------|--------|
| **Last 3 months** | Rolling 90-day window |
| **Last 6 months** | Rolling 180-day window |
| **Last 12 months** | Rolling 365-day window |
| **Current year** | 1 January to today |
| **Custom range** | Any start and end date you specify |

### Custom Date Range

1. Select **Custom range** from the preset dropdown.
2. Click the **Start date** field and choose a date.
3. Click the **End date** field and choose a date.
4. The charts update automatically.

All charts and summary cards on the page reflect the same selected period.

## Period Summary Cards

At the top of the dashboard, four summary cards display key figures for the selected period:

- **Total Output Tax** — Total VAT charged on taxable supplies
- **Total Input Tax** — Total claimable input VAT
- **Net VAT Position** — Liability (positive) or refund entitlement (negative)
- **Transaction Count** — Number of transactions included in the analysis

## Relation to Compliance Scoring

The data visualised in the Analytics Dashboard directly influences your [Compliance Score](/docs/compliance/compliance-score):

| Analytics Indicator | Compliance Impact |
|---------------------|------------------|
| Gaps in VAT trend (missing periods) | Reduces **Data Quality** score component |
| Large **Out of Scope** or **Exempt** slices | May indicate uncategorised transactions, reducing **Rate Accuracy** |
| Sudden unexplained spikes in output or input tax | Triggers anomaly alerts that lower the overall score |
| Consistent period-over-period data | Supports a stable or improving compliance grade |

Reviewing the Analytics Dashboard regularly helps you catch data issues early — before they affect your VAT return or compliance grade.

For a deeper automated analysis of your data patterns, see the [Intelligence Dashboard](/docs/compliance/intelligence-dashboard).

## Next Steps

- [View your compliance score](/docs/compliance/compliance-score)
- [Review the intelligence dashboard](/docs/compliance/intelligence-dashboard)
- [Generate a VAT return](/docs/vat-returns/generate-return)
- [Cash flow report](/docs/reports/cash-flow)
