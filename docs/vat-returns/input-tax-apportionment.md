---
sidebar_position: 5
title: Input Tax Apportionment
description: How CoralLedger Comply calculates recoverable input VAT when a business makes both taxable and exempt supplies
---

# Input Tax Apportionment

When a business makes both **taxable** and **exempt supplies**, not all input VAT can be recovered in full. Input tax apportionment is the process of determining what fraction of the residual input VAT is deductible for each return period.

CoralLedger Comply calculates apportionment automatically using the taxable/exempt supply ratio method required under Bahamas VAT legislation.

## Why Apportionment Is Required

Under the Bahamas VAT Act, input tax credit is only available for VAT incurred in making **taxable** supplies. Businesses that also make exempt supplies must restrict their input tax claim to the portion that relates to taxable activity.

Examples of businesses affected:

- Financial services firms that also sell taxable goods or services
- Mixed-use property businesses (residential = exempt; commercial = taxable)
- Insurance providers with taxable ancillary services

If your business makes **only** taxable (or zero-rated) supplies, apportionment does not apply and all input VAT is fully recoverable.

## The Apportionment Formula

Comply uses the following formula to determine the deductible fraction of residual input VAT for each period:

```
Deductible Fraction = Taxable Supplies ÷ (Taxable Supplies + Exempt Supplies)
```

| Term | Definition |
|------|------------|
| **Taxable Supplies** | The value of standard-rated, reduced-rated, and zero-rated supplies made in the period |
| **Exempt Supplies** | The value of VAT-exempt supplies made in the period |
| **Deductible Fraction** | The proportion of residual input VAT that can be claimed |

### Example Calculation

| Period | Taxable Supplies | Exempt Supplies | Deductible Fraction |
|--------|-----------------|-----------------|---------------------|
| Q3 2024 | $800,000 | $200,000 | 800,000 ÷ 1,000,000 = **80%** |

In this example, 80% of the residual input VAT for Q3 2024 is recoverable.

## Direct Attribution vs. Residual Input VAT

Not all input VAT goes through the apportionment ratio. Comply separates input VAT into two categories:

### Directly Attributed Input VAT

Input VAT that can be **directly linked** to a specific type of supply is attributed first, before any ratio is applied:

- VAT on costs **exclusively used for taxable supplies** is claimed **in full**
- VAT on costs **exclusively used for exempt supplies** is **blocked entirely**

### Residual Input VAT

Input VAT on costs that are **shared** between taxable and exempt activities (such as general overhead, rent, and utilities) cannot be directly attributed. This residual input VAT is then multiplied by the deductible fraction to arrive at the recoverable amount.

```
Recoverable Input VAT =
  (Directly Attributed — Taxable) +
  (Residual Input VAT × Deductible Fraction)
```

## Per-Period Recalculation

The deductible fraction is **recalculated fresh for each return period** using that period's actual supply values. It is not carried forward from previous periods.

This means:

- A change in your business mix (e.g., more exempt activity one quarter) is automatically reflected in that period's return
- You do not need to make prior-period adjustments for changes in the ratio
- Each period stands independently for apportionment purposes

:::info Annual Adjustment
Bahamas VAT legislation requires businesses to calculate apportionment on a period-by-period basis. If you believe an annual true-up adjustment may apply to your specific situation, consult your VAT advisor.
:::

## Where to Find It in Comply

The apportionment calculation is integrated directly into the VAT return workflow:

1. Go to **VAT Returns**
2. Select or generate a return for the relevant period
3. Navigate to the **Input Tax** section of the return preview
4. The apportionment schedule shows:
   - Total taxable and exempt supply values for the period
   - Calculated deductible fraction
   - Directly attributed input VAT (taxable and exempt)
   - Residual input VAT and the recoverable portion
   - Final recoverable input VAT carried to the return

:::tip VAT Advisors
The apportionment schedule is fully visible in the return preview and export, providing the working that VAT advisors and auditors require.
:::

## Exporting the Apportionment Schedule

The full apportionment schedule is included in every return export:

1. Open the VAT return for the relevant period
2. Click **Export**
3. Choose your preferred format: **PDF**, **Excel**, or **CSV**
4. The export includes the apportionment schedule:
   - **PDF** — displayed as a clearly labelled section within the return document
   - **Excel** — included as a dedicated **Input Tax Apportionment** worksheet
   - **CSV** — included as separate rows with an `Apportionment` category label

The exported schedule contains:

- Period supply totals (taxable and exempt)
- Deductible fraction
- Directly attributed VAT breakdown
- Residual VAT and recovery calculation
- Final input tax credit figure used in the return

This provides a complete audit trail and supports any review by the Department of Inland Revenue (DIR).

## Compliance Considerations

- **Record keeping** — Maintain clear records distinguishing costs directly attributable to taxable vs. exempt activities from shared costs
- **Category accuracy** — Correct VAT categorization of your supplies (taxable vs. exempt) directly affects the deductible fraction; errors will over- or under-state recoverable input VAT
- **Partial exemption review** — If your business mix changes significantly, review your apportionment methodology with a VAT advisor

## Next Steps

- [Generate your VAT return](/docs/vat-returns/generate-return)
- [Preview and validate your return](/docs/vat-returns/return-preview)
- [Submit your return](/docs/vat-returns/submit-return)
- [Understand your compliance score](/docs/compliance/compliance-score)
- [VAT rates reference](/docs/reference/vat-rates)
