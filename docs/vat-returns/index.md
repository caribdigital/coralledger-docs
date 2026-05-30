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
VAT returns are due within **21 days** after the end of the tax period (14 days for large taxpayers with annual turnover ≥ $5M). The deadline varies by period — it is not a fixed calendar date.
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

Comply tracks every VAT return through a structured eight-state lifecycle. Each transition is recorded in the [audit trail](/docs/audit/) with a named event so the regulatory record is reproducible.

| State | Displayed label | Description |
|---|---|---|
| **Draft** | Draft | Return created from the period's transactions; can still be edited |
| **Ready to File** | Ready to File | All validations passed and the Section 61 acknowledgement + signatory have been captured. The return is locked from edits |
| **Filing in Progress** | Filing in Progress | Artifacts (PDF / XML / Excel / Form 301) are being generated. Brief — usually seconds |
| **Awaiting Lodgement** | Awaiting Lodgement | Artifacts are ready. You now submit externally to the DIR via OTAS / a DIR office / an authorised agent, then return to Comply to record the lodgement |
| **Lodged** | Lodged | You have recorded the DIR lodgement using **Record DIR Acknowledgement**. The `RETURN_LODGED_WITH_DIR` audit entry has been written. Payable returns wait here until payment is recorded |
| **Lodged & Paid** | Lodged & Paid | Final state for payable returns once cumulative payments cover the net VAT due. Credit/zero returns reach this state automatically immediately after Lodged |
| **Amendment Draft** | Amendment Draft | A correction to a previously-lodged return is being composed. When lodged, the amendment goes through the same lifecycle and ends at Lodged / Lodged & Paid — there is no separate "Amended" final state |
| **Disputed** | Disputed | A previously-lodged return is under DIR dispute. Used when the DIR challenges the return; tracking-only state |

:::note Lodgement, not "filing"
The regulatorily significant transition is **lodgement** — recorded by you in Comply when you have submitted the return to the DIR. "Filed" is not a state name in Comply; the displayed labels are **Awaiting Lodgement**, **Lodged**, and **Lodged & Paid**. Comply does not currently receive direct confirmation from the DIR.
:::

:::info Every return passes through Lodged first (VR-STATE-001)
Even **credit and zero-balance returns** transition through `Lodged` before reaching `Lodged & Paid`, so the `RETURN_LODGED_WITH_DIR` audit entry always has a clean lodgement timestamp. Credit/zero returns auto-advance to `Lodged & Paid` immediately after the audit entry has been written. This is a deliberate regulatory invariant — see [Record DIR Acknowledgement](/docs/vat-returns/record-dir-acknowledgement#vr-state-001-every-return-passes-through-lodged-first) for the full state-transition table.
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
- **Calculated Fields** - All L1-L31 fields computed from your transaction data
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
- **Firm-Managed** — An accounting firm manages filing on your behalf through the [Firm Portal](/docs/firm-portal/).

## Next Steps

- [Generate your VAT return](/docs/vat-returns/generate-return)
- [Preview and validate](/docs/vat-returns/return-preview)
- [Filing Wizard](/docs/vat-returns/filing-wizard) — §61 acknowledgement, signatory capture, and artifact generation
- [Record DIR Acknowledgement](/docs/vat-returns/record-dir-acknowledgement) — capture the DIR-side lodgement; retract and record payment
- [Submit to the Comptroller](/docs/vat-returns/submit-return) — the external submission workflow
- [Claim Bad Debt Relief (L16 adjustment)](/docs/compliance/bad-debt-relief)
- [Input Tax Apportionment](/docs/vat-returns/input-tax-apportionment)
- [Self-Filing Mode guide](/docs/getting-started/self-filing)
