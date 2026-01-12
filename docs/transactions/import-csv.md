---
sidebar_position: 2
title: Import from CSV
description: Import transactions from CSV files into CoralLedger Comply
---

# Import from CSV

Upload your transaction data from any accounting system using CSV files.

## Supported Formats

CoralLedger Comply accepts CSV files with the following columns:

| Column | Required | Description |
|--------|----------|-------------|
| Date | Yes | Transaction date (YYYY-MM-DD or DD/MM/YYYY) |
| Description | Yes | Transaction description |
| Amount | Yes | Transaction amount in BSD |
| Type | No | "Sale" or "Purchase" |
| Category | No | VAT category if known |

## Step-by-Step Import

### Step 1: Prepare Your File
- Export transactions from your accounting system
- Ensure the file is saved as .csv format
- Remove any summary rows or totals

### Step 2: Upload the File
1. Navigate to **Transactions > Import**
2. Click **Choose File** and select your CSV
3. Click **Upload**

### Step 3: Map Columns
- Match your CSV columns to CoralLedger fields
- Preview the first 10 rows
- Adjust date format if needed

### Step 4: Review and Confirm
- Review the import summary
- Check for any validation errors
- Click **Import** to complete

## Common Issues

### Date Format Errors
Ensure dates are in a consistent format. Supported formats:
- `2024-01-15`
- `15/01/2024`
- `01/15/2024`

### Amount Formatting
- Use decimal point (not comma) for cents
- Do not include currency symbols
- Negative amounts for refunds

## Next Steps

- [Review automatic categorization](/docs/transactions/categorization)
