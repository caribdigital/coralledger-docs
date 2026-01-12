---
sidebar_position: 3
title: VAT Categorization
description: How CoralLedger Comply categorizes transactions for VAT
---

# VAT Categorization

Understanding how transactions are categorized for VAT compliance in The Bahamas.

## VAT Rates in The Bahamas

As of 2025, The Bahamas applies these VAT rates:

| Rate | Name | Applies To |
|------|------|------------|
| 10% | Standard Rate | Most goods and services |
| 5% | Reduced Rate | Breadbasket items at licensed food stores |
| 0% | Zero-Rated | Exports, inter-island shipping |
| Exempt | VAT Exempt | Financial services, education, healthcare |

## Automatic Categorization

CoralLedger Comply uses intelligent categorization based on:

### Description Analysis
Keywords in transaction descriptions trigger automatic categorization:
- "bread", "rice", "flour" → 5% (if from licensed food store)
- "export", "shipping to" → 0%
- "insurance premium" → Exempt

### Vendor Matching
Previously categorized transactions from the same vendor inform new categorizations.

### Industry Rules
Your business industry setting applies sector-specific rules.

## Manual Override

You can always override automatic categorization:

1. Go to **Transactions**
2. Select the transaction
3. Click **Edit Category**
4. Choose the correct VAT rate
5. Optionally add a note explaining the change

## Category Review

We recommend reviewing categorizations:
- Weekly during your first month
- Monthly once patterns are established
- Before generating each VAT return

## Next Steps

- [Generate your VAT return](/docs/vat-returns/generate-return)
- [View VAT rate reference](/docs/reference/vat-rates)
