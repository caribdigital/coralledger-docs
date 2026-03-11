---
sidebar_position: 5
title: Credit Notes
description: Manage credit notes and adjustments in CoralLedger Comply
---

# Credit Notes

Issue credit notes to adjust previous sales transactions. Credit notes reduce your output VAT and must be properly recorded for compliance.

## Accessing Credit Notes

Navigate to **Credit Notes** from the main navigation, or go to `/credit-notes`.

## Dashboard Overview

Summary cards display:
- **Total** — All credit notes in the system
- **Draft** — Credit notes not yet issued
- **Issued** — Active credit notes
- **Applied** — Credit notes applied to VAT returns

## Creating a Credit Note

1. Click **Create Credit Note**
2. Select the original sales transaction to credit
3. Enter the credit amount (up to the original transaction amount)
4. Select a reason:
   - Goods Returned
   - Pricing Error
   - Discount
   - Duplicate Invoice
   - Cancelled
   - Quantity Error
   - VAT Rate Error
   - Damaged Goods
   - Other
5. Click **Create**

The credit note is created in **Draft** status.

## Credit Note Lifecycle

| Status | Meaning | Actions Available |
|--------|---------|-------------------|
| **Draft** | Created but not finalized | Issue, Void |
| **Issued** | Finalized and active | Apply to Return, Void, Download PDF |
| **Applied** | Applied to a VAT return | Download PDF |
| **Voided** | Cancelled | None |

## Applying to a VAT Return

Once a credit note is issued, it can be applied to a VAT return:
1. Find the issued credit note in the list
2. Click **Apply to VAT Return**
3. Select the target return period
4. The credit amount reduces your output VAT for that period

## Filtering and Searching

- **Status filter** — Draft, Issued, Applied, Voided
- **Search** — Find by credit note number or customer name

## Downloading PDFs

Click the **Download PDF** button on any issued or applied credit note to generate a PDF document for your records.

## Next Steps

- [Enter transactions manually](/docs/transactions/manual-entry)
- [Generate a VAT return](/docs/vat-returns/generate-return)
- [Transaction overview](/docs/transactions)
