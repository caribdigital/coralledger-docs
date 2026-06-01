---
sidebar_position: 10
title: Record Keeping and Retention
description: VAT record retention obligations and platform enforcement controls
---

# Record Keeping and Retention

<<<<<<< HEAD
Statutory Basis: VAT Act Part X, §§79–80
=======
Statutory Basis: [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 26 and s. 50
>>>>>>> 0869e9a (docs: refresh DS-012 audit record)

## What statute says

[Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), **Part X, §§79–80** is the canonical statutory authority for record retention. **§79(1)** requires every taxable person to keep accounts and records in English in relation to all sums received and expended in taxable transactions, and input/output tax and deduction-claim entitlements. **§79(2)** sets the statutory retention floor at **five years** after either the end of the tax period to which the records relate (for registrants) or the occurrence of the taxable transaction. **§80** enumerates the record types that must be kept (tax accounts, purchase/sales ledgers, invoices, debit/credit notes, bank statements, customs documentation, point-of-sale data for taxpayers above the $250,000 turnover threshold, etc.).

CoralLedger Comply extends the statutory 5-year minimum to **7 years** as a policy choice — providing a defensibility margin against late-filed amended returns, audit triggers raised near the 5-year boundary, and the Comptroller's 5-year assessment-time-limit under Part VIII (which is a separate clock from the §79(2) retention obligation).

Records must remain accessible and complete enough for inspection. Retention duties usually apply across transactions, returns, adjustments, and supporting evidence. Deleting records too early can weaken audit defensibility and may itself be non-compliant.

## What platform does

CoralLedger Comply enforces a minimum retention baseline and provides retention monitoring, enforcement previews, legal hold integration, and audit logging for retention actions.

These controls help prevent accidental premature deletion and provide visibility into upcoming purges or policy violations.

## Customer responsibility

You remain responsible for preserving external source documents and ensuring policies align with legal obligations for your entity. If your risk profile requires longer retention, customer teams must configure and govern those extended policies.

Before any purge activity, your team should verify legal hold status, export needs, and downstream audit requirements.

## Related by-topic guides

- [Retention Monitoring](/docs/data-ops/retention-monitoring)
- [Legal Holds](/docs/data-ops/legal-holds)
