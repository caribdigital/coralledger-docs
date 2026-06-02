---
sidebar_position: 4
title: Time of Supply and Period Assignment
description: How transaction date controls VAT treatment and return period placement
---

# Time of Supply and Period Assignment

Statutory Basis: [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32

## What statute says

[Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32 governs **time of supply** — the rule that determines when tax becomes due and which filing period includes the transaction. Even when an invoice is uploaded later, the legal treatment usually follows the transaction or tax-point date rather than the data entry date.

Section 32 includes sub-rules for specific supply types:

- **§32(2) — Continuous Supply** — supplies that do not have a single discrete tax point (e.g., utility services, subscriptions)
- **§32(3) — Advance Payment** — supplies for which payment precedes delivery (deposits, retainer fees)
- **§32 read with §52** — retention payments (held back amounts released after acceptance)

Transaction dating is reinforced by [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 15 (transaction dating requirements) and the amended s. 15A (effective April 1, 2025).

This is especially important during law changes and rate transitions. A transaction that falls before an effective date may be treated differently from an otherwise identical transaction after that date.

## What platform does

CoralLedger Comply uses transaction dates to assign rate logic and return period inclusion. Transition guidance appears for dates near major reforms so users can confirm period and category choices before filing.

Return generation and preview workflows carry these date-based assignments through to summary totals and line-level reporting. Historical entries retain the rate logic that applied at the transaction date to preserve audit consistency.

## Customer responsibility

You remain responsible for entering correct transaction dates and reviewing exceptions where legal tax points differ from a default commercial date. If source documents are late or corrected, your team must update entries and regenerate returns as required.

For complex timing cases (advance payments, partial supplies, staged contracts), confirm treatment with your advisor and then reflect that decision in Comply.

## Related by-topic guides

- [Rate Transition Handling](/docs/compliance/rate-transitions)
- [Import from CSV](/docs/transactions/import-csv)
