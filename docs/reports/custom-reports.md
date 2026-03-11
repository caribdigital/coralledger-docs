---
sidebar_position: 4
title: Custom Report Builder
description: Build custom reports with configurable columns and filters
---

# Custom Report Builder

Create tailored reports with the columns, filters, date ranges, and formats you need. Save configurations for quick reuse.

## Accessing the Builder

Navigate to **Reports > Custom Report Builder**.

## Building a Report

The report builder uses a three-panel layout:

### Left Panel — Configuration

**Report Name**: Give your report a descriptive name.

**Report Type**: Choose from:
- Transaction List
- VAT Summary
- Category Breakdown
- Vendor Analysis
- Period Comparison

**Date Range**: Select start and end dates, or use quick presets:
- This Month
- Last Month
- This Quarter
- Year to Date

**Filters**:
- **Transaction Direction** — All, Sales Only, or Purchases Only
- **VAT Categories** — Multi-select: Standard, Zero-Rated, Exempt, Standard Import
- **Minimum Amount** — Filter out small transactions

**Output Format**: Choose export format:
- CSV
- Excel
- PDF
- JSON

### Middle Panel — Column Selection

Select which columns to include in your report:
- Date
- Description
- Customer/Vendor
- Net Amount
- VAT Amount
- Gross Amount
- Direction (Sale/Purchase)
- VAT Category
- VAT Rate
- Invoice Number
- Category
- Import Batch
- Status
- Notes

Use **Select All**, **Clear All**, or **Reset** to quickly manage columns. Drag columns to reorder them.

### Right Panel — Preview

Click **Load Preview** to see a sample of your report (top 5 rows, first 4 columns) before generating the full report.

## Generating the Report

1. Configure your settings in the left panel
2. Select columns in the middle panel
3. Preview to verify the output
4. Click **Generate & Download**

## Saving Configurations

Save your report setup for future use:
1. Configure the report as needed
2. Click **Save Configuration**
3. To reuse, click **Load Saved** and select a saved configuration

## Next Steps

- [Cash flow reports](/docs/reports/cash-flow)
- [Variance analysis](/docs/reports/variance-analysis)
- [Shared reports](/docs/reports/shared-reports)
