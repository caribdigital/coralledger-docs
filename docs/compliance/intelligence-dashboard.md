---
sidebar_position: 3
title: Intelligence Dashboard
description: Compliance insights and analytics
---

# Intelligence Dashboard

The Intelligence Dashboard provides detailed analysis of your VAT compliance, offering deep insights into your business patterns and potential risks.

## Accessing the Dashboard

Navigate to **Compliance > Intelligence** from the main menu.

## Period Selection

Analyze your compliance across different time periods:

| Period | Description |
|--------|-------------|
| **Current Period** | Your active filing period |
| **Previous Period** | Last completed period |
| **Year to Date** | From January 1st to today |
| **Full Year** | Complete calendar year |
| **Custom Range** | Select specific dates |
| **Compare** | Side-by-side period comparison |

## Dashboard Sections

### Compliance Grade

Your overall compliance health displayed as a letter grade (A+ to F):

- **A+ / A** - Excellent compliance, minimal risk
- **B+ / B** - Good compliance, minor improvements needed
- **C+ / C** - Fair compliance, attention required
- **D** - Poor compliance, significant issues
- **F** - Critical, immediate action needed

**Grade Factors:**
- Filing Compliance (30%)
- Data Quality (25%)
- Rate Accuracy (25%)
- Documentation (20%)

### Penalty Risk Assessment

Calculates your exposure to the late-filing and late-payment fines set out in [Value Added Tax Act, 2014, s. 47A](https://laws.bahamas.gov.bs/):
- Current penalty exposure amount
- Risk factors contributing to exposure
- Recommended actions to reduce risk

:::warning Penalty Rates
Late filing is fined at the **greater of $100 or 2% of the tax payable**, and late payment at **10% of the tax owed**, with **interest on outstanding tax at the Central Bank of The Bahamas prime lending rate plus 1%** ([Value Added Tax Act, 2014, s. 47A](https://laws.bahamas.gov.bs/)). Section 61 of the Act is an evidentiary provision (*"Assessment as evidence in proceedings"*), **not** a penalty section — there is no "200% of unpaid VAT" multiplier.
:::

### Risk Indicators

Each risk indicator is shown as a **level and a direction** — a current value against a threshold, with a status of **Normal**, **Warning**, or **Critical**. Indicators describe where a metric stands and which way it is trending; they are not a prediction that a figure will reach zero.

### Provisional figures and pending review

Money figures are presented **neutrally** — Net VAT can be a payable or a refund, and is never coloured as "good" or "bad". When a period still has transactions awaiting review, the dashboard marks the Net VAT figure as **provisional** ("Provisional — N pending review; promote before filing") and shows how the figure would change once those items are promoted. Promote pending items before relying on the number for filing.

### Data Quality Score

Measures the quality of your transaction data:
- Completeness of required fields
- Consistency of categorization
- Vendor name normalization
- Description quality

### Entropy Analysis

Analyzes consistency in your data:

- **Vendor Entropy** - How consistent are vendor names?
- **Description Entropy** - How varied are transaction descriptions?

Lower entropy indicates more consistent data, which improves categorization accuracy.

### Vendor Intelligence

Insights into your vendor relationships:
- Top vendors by transaction volume
- Vendor VAT category patterns
- Anomalous vendor transactions
- New vendor detection

### Period Comparison

Compare metrics across two periods:
- Transaction volume changes
- VAT liability trends
- Compliance score movement
- Category distribution shifts

## Using Intelligence Insights

### Weekly Review
- Check your compliance grade
- Review new anomalies
- Address data quality issues

### Monthly Analysis
- Compare with previous month
- Identify vendor patterns
- Plan for upcoming filing

### Quarterly Planning
- Analyze YTD trends
- Forecast next quarter
- Prepare for filing deadline

## API Access

For advanced users, the Intelligence API provides programmatic access:

```
GET /api/intelligence/context
GET /api/intelligence/summary
GET /api/intelligence/compliance-grade
GET /api/intelligence/penalty-risk
GET /api/intelligence/data-quality
GET /api/intelligence/entropy
GET /api/intelligence/vendors
GET /api/intelligence/compare
```

Contact support for API documentation.

## Next Steps

- [Understand compliance scoring](/docs/compliance/compliance-score)
- [Learn about 2025 VAT reforms](/docs/compliance/vat-2025-reforms)
