---
sidebar_position: 2
title: Generate VAT Return
description: Create your VAT return in CoralLedger Comply
---

# Generate VAT Return

Create your VAT return with a single click using your imported transactions. The system calculates all L1-L31 DIR form fields automatically.

## Prerequisites

Before generating a return:
- All transactions for the period are imported and categorized
- Categories have been reviewed for accuracy
- No unresolved critical compliance alerts

## Step-by-Step Guide

### Step 1: Select Period
1. Go to **VAT Returns**
2. Click **Generate New Return** or select a period
3. Choose the return period (month or quarter based on your filing frequency)
4. Review the date range

### Step 2: Review Summary
The system displays:
- Total sales by VAT rate (Standard, Reduced, Zero-Rated, Exempt)
- Total purchases with input VAT claimed
- Calculated output VAT
- Calculated input VAT
- Net VAT position (payable or refundable)

### Step 3: Validate
CoralLedger Comply checks for:
- Uncategorized transactions
- Unusual patterns or anomalies
- Missing documentation
- Mathematical accuracy
- Consistency with prior periods

:::warning Compliance Alerts
Address any compliance alerts before finalizing your return. Critical alerts will prevent submission.
:::

### Step 4: Generate Return
1. Review the final summary including all L1-L31 line items
2. Click **Generate Return**
3. The return is created in **Draft** status

### Step 5: Export
Download your return in multiple formats:
- **PDF** — For your records and client presentations
- **XML** — DIR submission format
- **Excel** — For detailed analysis
- **CSV** — For data import into other systems

## Making Corrections

### Before Submission
If you find errors in a Draft return:
1. Correct the underlying transactions
2. Delete the draft return
3. Generate a new return

### After Submission (Amendment)
If errors are found after filing:
1. Navigate to the submitted return
2. Click **Amend**
3. Make corrections to the affected line items
4. Submit the amendment
5. The return status changes to **Amended**

## Next Steps

- [Preview and validate](/docs/vat-returns/return-preview)
- [Submit your return](/docs/vat-returns/submit-return)
- [Understand compliance scoring](/docs/compliance/compliance-score)
