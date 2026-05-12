---
sidebar_position: 5
title: Output Tax Calculation and Declaration
description: Output VAT computation duties and return declaration workflow
---

# Output Tax Calculation and Declaration

## What statute says

[Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 10 establishes the **Standard rate** of VAT. Registered persons must calculate output VAT on taxable supplies and declare those amounts in the correct return period.

The Bahamas VAT system applies four categories:

- **Standard** (10%) — most goods and services, per s. 10
- **Reduced** (5%) — hygiene products and medications at licensed food stores, per [VAT (Amendment) Act 2024, s. 12A](https://laws.bahamas.gov.bs/)
- **Zero-Rated** (0%) — qualifying exports (per s. 22) and specified essentials
- **Exempt** — services where no VAT is charged and no input tax is recoverable (financial services, residential rent, etc.); also unprepared food at licensed food stores from April 1, 2026 per [VAT (Amendment) (No. 2) Act, 2025](https://laws.bahamas.gov.bs/), s. 2 (JR-007)

Output tax is not just a single total. It is a structured declaration that depends on correct categorization, timing, and adjustment handling across all sales-related activity.

### JR-008 — Seller-axis rule for unprepared food

The April 2026 food exemption applies on a **seller axis**:

| Seller type | Unprepared food | Prepared food |
|---|---|---|
| **Licensed food store** | **Exempt** | Standard 10% |
| **Non-licensed seller** (e.g., convenience store, fast-food outlet, hotel) | **Zero-Rated 0%** | Standard 10% |

The matrix is intentional. Licensed food stores can already absorb VAT on inputs through their pricing — the exemption pushes the relief direct to consumers. Non-licensed sellers cannot, so zero-rating preserves their input-tax recovery while still removing the tax from the consumer's basket. Comply applies the correct treatment by combining the **seller's licensing status** with the **food preparation state** captured during transaction entry.

## What platform does

CoralLedger Comply aggregates categorized transactions into return-period summaries and populates DIR-oriented return outputs. It highlights missing categories, unusual values, and validation issues before finalization.

The Generate Return flow makes output tax transparent by showing category-level totals and the resulting net VAT position. Users can inspect and correct source data before creating a finalized return export.

## Customer responsibility

You remain accountable for the correctness of category decisions and supporting records behind each output figure. Comply calculates based on the data you approve; it does not replace management review.

Before submission, your team should confirm completeness (all taxable supplies included), correctness (rates and category treatment), and adjustments (credit notes, write-offs, corrections) for the filing period.

## Related by-topic guides

- [Generate VAT Return](/docs/vat-returns/generate-return)
- [VAT Categorization](/docs/transactions/categorization)
