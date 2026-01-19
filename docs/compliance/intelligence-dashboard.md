---
sidebar_position: 3
title: Intelligence Dashboard
description: AI-powered compliance insights and analytics
---

# Intelligence Dashboard

The Intelligence Dashboard provides AI-powered analysis of your VAT compliance, offering deep insights into your business patterns and potential risks.

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
- Data Quality (30%)
- Timeliness (25%)
- Accuracy (25%)
- Completeness (20%)

### Penalty Risk Assessment

Calculates your exposure under VAT Act Section 61:
- Current penalty exposure amount
- Risk factors contributing to exposure
- Recommended actions to reduce risk

:::warning Penalty Rates
The Bahamas VAT Act allows penalties up to 200% of unpaid VAT, plus 5% monthly interest.
:::

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
