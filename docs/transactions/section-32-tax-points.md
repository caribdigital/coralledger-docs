---
sidebar_position: 9
title: Section 32 Tax-Point Scenarios
description: Five sub-clauses of VAT Act Section 32 that govern when VAT becomes due on a transaction
---

# Section 32 Tax-Point Scenarios

The **tax point** of a transaction is the moment VAT becomes due — not necessarily the moment the goods or services were delivered. For most transactions the two coincide; for advance payments, continuous supplies, retentions, and goods supplied on approval, [Section 32 of the Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), specifically [s. 32(3)–(6)](https://laws.bahamas.gov.bs/), defines a different timing rule.

When you enter a transaction in CoralLedger Comply you can expand the **§32 Section Supply Type** panel and select the sub-clause that governs the tax point. The selection is captured on the transaction record and forms part of the [audit-trail reproducibility evidence](/docs/audit/) for the seven-year retention period.

Most entries do not need a non-default selection. The selector exists for the regulated minority where it does.

## The five sub-clauses

| Sub-clause | Comply enum value | Tax-point trigger |
|---|---|---|
| Default (`s. 32(1)`) | `SimpleSupply` | The standard supply timing — VAT due when the supply is made (the delivery/invoice date in most cases). |
| `s. 32(3)` | `AdvancePayment` | VAT due **when the advance payment is received** — even if delivery happens later. |
| `s. 32(4)` | `ContinuousSupply` | VAT due **on each invoice issued** for a continuous service (utilities, leases, retainers). |
| `s. 32(5)` | `RetentionPayment` | VAT on the retained portion of a payment becomes due **when the retention is released**, not when the original invoice was issued. |
| `s. 32(6)` | `GoodsOnApproval` | VAT due **when the customer confirms acceptance**, not when goods were dispatched. |

## When to pick a non-default value

### `s. 32(3)` — Advance Payment

You took a deposit before performing the work. The deposit is a taxable consideration in its own right — VAT on the deposit is due in the period the deposit was received, even if the final invoice and delivery happen later.

> **Example.** You issue an estimate for a B$10,000 project. The customer pays a 50% advance deposit of B$5,000 in March 2026. The remaining B$5,000 is invoiced and paid in April 2026 when work completes.
>
> The March deposit is a `s. 32(3)` advance payment — output VAT on B$5,000 belongs in the March VAT return. The April invoice represents the remaining B$5,000 of the supply and belongs in the April return.

Misclassifying the advance as a normal sale (defaulting to `SimpleSupply`) would defer the entire B$10,000 of output VAT to April, which is incorrect under s. 32(3).

### `s. 32(4)` — Continuous Supply

A continuous supply is a service or supply that does not have a discrete delivery point — utilities (electricity, water), leases, monthly retainers, subscriptions, ongoing professional services on a fixed monthly fee.

> **Example.** You provide a monthly compliance-advisory retainer at B$2,000/month. Each month you issue a separate invoice for that month's service.
>
> Each invoice is a `s. 32(4)` continuous-supply tax point — output VAT is due on each invoice in the period it was issued. You do not aggregate the year and treat it as one taxable event.

If your continuous supply has a single contract term (e.g. an annual subscription invoiced once up-front), it is **not** a `s. 32(4)` continuous supply — it is either a `s. 32(1)` simple supply (if billed in full at the start) or a `s. 32(3)` advance payment (if the payment precedes the supply).

### `s. 32(5)` — Retention Payment

In construction and similar contracts the customer commonly withholds 5–10% of each progress payment until practical completion or a defect-liability period expires. That retained portion does not trigger VAT until it is actually released.

> **Example.** You complete B$50,000 of certified work on a construction contract. The customer pays you B$45,000 and retains B$5,000 against defects, releasable on practical completion in six months.
>
> Output VAT on the B$45,000 is due now under `s. 32(1)`. Output VAT on the B$5,000 retention is **not yet due** — record it as a `s. 32(5)` retention payment. When the retention is released, you record the release transaction and Comply triggers the VAT on the B$5,000 in that period's return.

If you treat the retention as immediately taxable (`SimpleSupply`), you have over-declared output VAT and will have to claim it back as a correction. If you forget to record the release when it happens, you will under-declare in the release period.

### `s. 32(6)` — Goods on Approval

You ship goods to a customer for a trial / approval period — they have the right to return them. The supply does not legally take place until the customer either confirms acceptance or the return window expires.

> **Example.** You ship B$3,000 of demonstration equipment to a customer with a 30-day approval window. On day 25 the customer confirms they will keep the equipment and the invoice is issued.
>
> The taxable supply happened on day 25, not on the dispatch date — record the transaction as `s. 32(6)` Goods on Approval. Output VAT belongs in the period containing day 25.

If you had dispatched on the last day of one month and the customer confirmed on the first day of the next month, the difference between `SimpleSupply` and `s. 32(6)` is which VAT return the entry belongs in — a one-period misclassification on the boundary.

## How Comply uses the selection

The selected sub-clause is:

1. **Persisted on the transaction record** alongside the amount, date, and VAT classification.
2. **Captured in the `VATCalculationProof`** — the immutable per-transaction evidence record that backs the [audit trail](/docs/audit/) and supports the seven-year retention requirement under [Value Added Tax Act, 2014, Part X, §§79–80](https://laws.bahamas.gov.bs/).
3. **Used by the calculation engine** to apply the correct period assignment when the tax-point date differs from the invoice or delivery date.

There is no automated re-classification — once you have entered a transaction with a sub-clause, Comply trusts that selection. Picking the wrong sub-clause is a defensible practitioner decision documented in the audit trail; failing to record a non-default sub-clause when one applies is a regulated misstatement risk.

## What about §32(2)?

[Section 32(2)](https://laws.bahamas.gov.bs/) governs the timing of input-tax recovery — it is about *purchases*, not *sales*. Comply applies §32(2) automatically when you record purchase-side transactions; there is no user-facing selector for it. The five user-facing supply types above are §32(1) (default) and §32(3)–(6).

## Next steps

- [Manual VAT Entry](/docs/transactions/manual-entry) — where the §32 selector appears
- [Time of Supply and Period Assignment (By Statute)](/docs/statutes/time-of-supply-period-assignment)
- [Audit Trail](/docs/audit/) — where the §32 selection becomes part of the durable record
- [§32 Attestation Pathway](/docs/attestation/) — the related but distinct attestation regime under the same Section
