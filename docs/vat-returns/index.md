---
sidebar_position: 1
title: VAT Returns Overview
description: Generate and submit VAT returns with CoralLedger Comply
---

# VAT Returns

CoralLedger Comply simplifies VAT return preparation for Bahamian businesses.

## Filing Schedule

VAT returns in The Bahamas are filed:
- **Monthly** - For businesses with annual turnover > $5 million
- **Quarterly** - For most registered businesses

:::info Filing Deadline
VAT returns are due 21 days after the end of the tax period (e.g., Q1 ending March 31 → due April 21).
:::

## Return Components

Each VAT return includes:

### Output VAT (Sales)
- Total taxable supplies at 10%
- Total taxable supplies at 5%
- Total zero-rated supplies
- VAT collected from customers

### Input VAT (Purchases)
- VAT paid on business purchases
- Eligible input tax credits
- [Input tax apportionment](/docs/vat-returns/input-tax-apportionment) for businesses with mixed taxable and exempt supplies

### Net Position
- VAT payable (if output > input)
- VAT refundable (if input > output)

## Return Lifecycle

| Status | Description |
|--------|-------------|
| **Draft** | Return generated but not finalized — can be edited |
| **Ready** | All validations passed, ready for submission |
| **Filed** | Return marked as filed after you submit via OTAS |
| **Amended** | A correction has been submitted for a previously filed return |

:::note
The "Filed" status is manually marked by you after submitting via the DIR's Online Tax Administration System (OTAS). CoralLedger Comply does not currently receive automated confirmation from the DIR.
:::

## DIR Form Fields (L1-L31)

Your return includes all standard Bahamas VAT return lines:
- **L1-L5**: Sales and output tax
- **L6-L10**: Purchases and input tax
- **L11-L15**: Import VAT
- **L16-L20**: Adjustments and credits
- **L21-L25**: Net tax calculations
- **L26-L31**: Summary and payment details

## CoralLedger Comply Features

- **One-Click Generation** - Generate returns from your imported transactions
- **Automatic Calculations** - All L1-L31 fields computed automatically
- **Return Preview** - Review totals and validation before filing
- **10-Point Validation** - Comprehensive pre-flight checks
- **Export Formats** - PDF, XML, Excel, and CSV for electronic filing
- **Amendment Support** - Correct filed returns with change tracking
- **Multi-Format Export** - Download as PDF, XML, Excel, or CSV

## Return Preview & Validation

Before submitting, preview your return with:
- Period summary and totals
- Output VAT, Input VAT, Net VAT breakdown
- Transaction count verification
- 10 validation checks (blocking and warning)

Learn more about [Return Preview & Validation](/docs/vat-returns/return-preview).

## Filing Modes

CoralLedger Comply supports two filing modes:

- **Self-Filing** — You manage and submit your own VAT returns directly to the DIR. See [Self-Filing Mode](/docs/getting-started/self-filing).
- **Firm-Managed** — An accounting firm handles filing on your behalf through the [Firm Portal](/docs/firm-portal/).

## Next Steps

- [Generate your VAT return](/docs/vat-returns/generate-return)
- [Preview and validate](/docs/vat-returns/return-preview)
- [Submit to the Comptroller](/docs/vat-returns/submit-return)
- [Claim Bad Debt Relief (L16 adjustment)](/docs/compliance/bad-debt-relief)
- [Input Tax Apportionment](/docs/vat-returns/input-tax-apportionment)
- [Self-Filing Mode guide](/docs/getting-started/self-filing)
