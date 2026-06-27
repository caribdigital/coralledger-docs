---
sidebar_position: 9
title: Section 32 Tax-Point Scenarios
description: Five sub-clauses of VAT Act Section 32 that govern when VAT becomes due on a transaction
---

# Section 32 Tax-Point Scenarios

The **tax point** of a transaction is the moment VAT becomes due — not necessarily the moment the goods or services were delivered. For most transactions the two coincide; for advance payments, continuous supplies, retentions, and goods supplied on approval, [Section 32 of the Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/) defines a different timing rule under sub-sections **(8)**, **(11)**, **(15)**, and **(17)**.

When you enter a transaction in CoralLedger Comply you can expand the **§32 Section Supply Type** panel and select the sub-clause that governs the tax point. The selection is captured on the transaction record and forms part of the [audit-trail reproducibility evidence](/docs/audit/) for the seven-year retention period.

Most entries do not need a non-default selection. The selector exists for the regulated minority where it does.

## The five supply types

| Comply enum value | Sub-section | Tax-point trigger |
|---|---|---|
| `SimpleSupply` | Default (no Section 32 adjustment) | The standard supply timing — VAT due when the supply is made (the delivery/invoice date in most cases). |
| `ContinuousSupply` | `s. 32(8)` | VAT due **at the end of each billing period** (or earlier, if a payment is received before the period ends) for a continuous service such as utilities, leases, or retainers. |
| `AdvancePayment` | `s. 32(11)` | VAT due **when the advance payment is received** — even if delivery happens later. |
| `GoodsOnApproval` | `s. 32(15)` | VAT due **when the customer adopts the goods, or 12 months after delivery, whichever is earlier** — not when goods were dispatched. |
| `RetentionPayment` | `s. 32(17)` | VAT on the held-back consideration becomes due on the **earlier of when it falls due or is received**, not when the original invoice was issued. |

## When to pick a non-default value

### `s. 32(11)` — Advance Payment

You took a deposit before performing the work. The deposit is a taxable consideration in its own right — VAT on the deposit is due in the period the deposit was received, even if the final invoice and delivery happen later.

> **Example.** You issue an estimate for a B$10,000 project. The customer pays a 50% advance deposit of B$5,000 in March 2026. The remaining B$5,000 is invoiced and paid in April 2026 when work completes.
>
> The March deposit is a `s. 32(11)` advance payment — output VAT on B$5,000 belongs in the March VAT return. The April invoice represents the remaining B$5,000 of the supply and belongs in the April return.

Misclassifying the advance as a normal sale (defaulting to `SimpleSupply`) would defer the entire B$10,000 of output VAT to April, which is incorrect under s. 32(11).

### `s. 32(8)` — Continuous Supply

A continuous supply is a service or supply that does not have a discrete delivery point — utilities (electricity, water), leases, monthly retainers, subscriptions, ongoing professional services on a fixed monthly fee.

> **Example.** You provide a monthly compliance-advisory retainer at B$2,000/month, billed at the end of each month.
>
> Each billing period is a `s. 32(8)` continuous-supply tax point — output VAT is due at the end of the period (or earlier, if the customer pays before the period ends). You do not aggregate the year and treat it as one taxable event.

If your continuous supply has a single contract term (e.g. an annual subscription invoiced once up-front), it is **not** a `s. 32(8)` continuous supply — it is either a `SimpleSupply` (if billed in full at the start) or a `s. 32(11)` advance payment (if the payment precedes the supply).

### `s. 32(17)` — Retention Payment

In construction and similar contracts the customer commonly withholds 5–10% of each progress payment until practical completion or a defect-liability period expires. That retained portion does not trigger VAT until the held-back consideration falls due or is received.

> **Example.** You complete B$50,000 of certified work on a construction contract. The customer pays you B$45,000 and retains B$5,000 against defects, releasable on practical completion in six months.
>
> Output VAT on the B$45,000 is due now. Output VAT on the B$5,000 retention is **not yet due** — record it as a `s. 32(17)` retention payment. When the retention falls due or is released, you record the release transaction and Comply triggers the VAT on the B$5,000 in that period's return.

If you treat the retention as immediately taxable (`SimpleSupply`), you have over-declared output VAT and will have to claim it back as a correction. If you forget to record the release when it happens, you will under-declare in the release period.

### `s. 32(15)` — Goods on Approval

You ship goods to a customer for a trial / approval period — they have the right to return them. The supply does not legally take place until the customer adopts the goods, or 12 months pass from delivery, whichever is earlier.

> **Example.** You ship B$3,000 of demonstration equipment to a customer with a 30-day approval window. On day 25 the customer confirms they will keep the equipment and the invoice is issued.
>
> The taxable supply happened on day 25 (adoption), not on the dispatch date — record the transaction as `s. 32(15)` Goods on Approval. Output VAT belongs in the period containing day 25. Had the customer neither adopted nor returned the goods, the tax point would fall 12 months after delivery.

If you had dispatched on the last day of one month and the customer confirmed on the first day of the next month, the difference between `SimpleSupply` and `s. 32(15)` is which VAT return the entry belongs in — a one-period misclassification on the boundary.

## How Comply uses the selection

The selected sub-clause is:

1. **Persisted on the transaction record** alongside the amount, date, and VAT classification.
2. **Captured in the `VATCalculationProof`** — the immutable per-transaction evidence record that backs the [audit trail](/docs/audit/) and supports the seven-year retention requirement under [Value Added Tax Act, 2014, Part X, §§79–80](https://laws.bahamas.gov.bs/).
3. **Used by the calculation engine** to apply the correct period assignment when the tax-point date differs from the invoice or delivery date.

There is no automated re-classification — once you have entered a transaction with a sub-clause, Comply trusts that selection. Picking the wrong sub-clause is a defensible practitioner decision documented in the audit trail; failing to record a non-default sub-clause when one applies is a regulated misstatement risk.

## Other Section 32 sub-sections

Section 32 contains further sub-sections beyond the supply types above. Comply exposes a user-facing selector only for the sales-side tax-point scenarios that a practitioner needs to choose between — the default simple supply plus the continuous-supply, advance-payment, goods-on-approval, and retention scenarios listed above. Other Section 32 sub-sections are applied by the calculation engine where they are relevant and do not require a selection.

## Next steps

- [Manual VAT Entry](/docs/transactions/manual-entry) — where the §32 selector appears
- [Time of Supply and Period Assignment (By Statute)](/docs/statutes/time-of-supply-period-assignment)
- [Audit Trail](/docs/audit/) — where the §32 selection becomes part of the durable record
- [§32 Attestation Pathway](/docs/attestation/) — the related but distinct attestation regime under the same Section
