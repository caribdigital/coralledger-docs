---
sidebar_position: 3
title: VAT Categorization
description: How CoralLedger Comply supports VAT categorization decisions
---

# VAT Categorization

Understanding how to categorize transactions for VAT compliance in The Bahamas.

## VAT Categories in The Bahamas

As of 2025, The Bahamas applies these VAT categories:

| Category | Name | Applies To |
|------|------|------------|
| Standard (10%) | Standard Rate | Most goods and services |
| Reduced (5%) | Reduced Rate | Hygiene products and medications at licensed food stores (narrow scope — not a general food rate) |
| Zero-Rated (0%) | Zero-Rated | Exports, inter-island shipping |
| Exempt | VAT Exempt | Financial services, education, healthcare, **unprepared food at licensed food stores (from April 1, 2026)** |

:::info April 2026 Change — Unprepared Food is Now Exempt
As of **April 1, 2026**, unprepared food sold at licensed food stores moved from a reduced/breadbasket rate to **VAT Exempt** status. This means:
- **No VAT is charged** on the sale
- **No input tax credits** can be claimed on related purchases (unlike Zero-Rated supplies)

This affects apportionment calculations for businesses that sell a mix of taxable and exempt supplies. See [2025 VAT Reforms — April 2026 Food Exemption](/docs/compliance/vat-2025-reforms#april-2026-food-exemption-transition) for details.
:::

## Categorization Suggestions

CoralLedger Comply provides guided categorization suggestions based on:

### Description Analysis
Keywords in transaction descriptions can suggest likely categories:
- "bread", "rice", "flour", "produce", "groceries" → Exempt (if from licensed food store, dated April 1, 2026 or later)
- "hygiene", "soap", "medication", "toothpaste" → 5% (if from licensed food store)
- "export", "shipping to" → 0%
- "insurance premium" → Exempt

### Vendor Matching
Previously categorized transactions from the same vendor inform future suggestions.

### Industry Rules
Your business industry setting applies sector-specific rules.

:::info Your Responsibility
CoralLedger Comply provides categorization support, but you remain responsible for the final VAT treatment applied to each transaction, including [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021), s. 32](https://laws.bahamas.gov.bs/) determinations where relevant.
:::

## Review and Edit Categories

You can always review and change suggested categories:

1. Go to **Transactions**
2. Select the transaction
3. Click **Edit Category**
4. Choose the correct VAT category
5. Optionally add a note explaining the change

## Category Review

We recommend reviewing categorizations:
- Weekly during your first month
- Monthly once patterns are established
- Before generating each VAT return

## By Statute Reference

- [Output Tax Calculation and Declaration](/docs/statutes/output-tax-calculation-declaration)

## Next Steps

- [Generate your VAT return](/docs/vat-returns/generate-return)
- [View VAT category reference](/docs/reference/vat-rates)
