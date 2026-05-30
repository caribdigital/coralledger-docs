---
sidebar_position: 5
title: Record DIR Acknowledgement
description: The in-app capture that transitions a return from Awaiting Lodgement to Lodged, including retraction and payment recording
---

# Record DIR Acknowledgement

After the [Filing Wizard](/docs/vat-returns/filing-wizard) generates your return's artifacts and transitions the state to **Awaiting Lodgement**, you submit those artifacts externally to the Department of Inland Revenue. When the DIR confirms receipt — by issuing a reference number, stamping your paper return, or simply acknowledging the OTAS upload — you return to Comply and **Record DIR Acknowledgement**.

This in-app capture is the regulatorily significant transition from Awaiting Lodgement to **Lodged**.

## Why Comply does not auto-mark "Lodged"

Comply does **not** receive direct confirmation from the DIR. There is no integration today between CoralLedger Comply and the OTAS portal that posts an acknowledgement back. Because the DIR-side confirmation is the regulatorily binding event, Comply requires you to capture it manually. This is the same principle as the [§32 attestation](/docs/attestation/): the regulatorily binding act happens between you and the DIR, and Comply's job is to record the evidence.

## The dialog

You open the Record DIR Acknowledgement dialog from the **Filing Artifacts Ready** card (immediately after the wizard) or from the row actions on a return that is in Awaiting Lodgement.

The dialog captures five things:

| Field | Required | Notes |
|---|---|---|
| **Lodgement Date** | Yes | Must be on or after the date your artifacts were generated, and not in the future. Comply enforces this — you cannot record a lodgement before the artifacts existed. |
| **Lodgement Method** | Yes | One of four enum values — see [Lodgement methods](#lodgement-methods). |
| **Other Details** | When method = Other | Free text up to 500 characters, required only when method = Other. |
| **DIR Reference Number** | **No (explicit)** | The helper text reads "Leave blank if DIR did not issue a reference number." Some lodgement methods do not produce a reference number — that is normal. |
| **Acknowledgement checkbox** | Yes | "I confirm that I have lodged this return with the Department of Inland Revenue." |

When you click **Confirm**, Comply runs the lodgement transition described below.

## Lodgement methods

The four methods Comply recognises:

| Method | When to use it | DIR reference behaviour |
|---|---|---|
| **DIR Online Portal** | You uploaded the XML artifact through [OTAS](https://otas.revenue.gov.bs). | OTAS usually returns a transaction reference number; record it if it does. |
| **Walked into DIR Office** | You took a printed copy to a DIR office in Nassau or Freeport. | DIR offices typically stamp and number a paper acknowledgement — record the stamp number. |
| **Submitted via Authorised Agent** | A third-party agent submitted the return on your registrant's behalf. | The agent should report any reference number issued; if none, leave blank. |
| **Other** | Anything that doesn't fit the three above (e.g., during a DIR system outage you submit via email to a DIR officer). | Required free-text explanation. Record any reference if issued. |

The choice is persisted on the return and surfaced on the [View Filed Return](/docs/vat-returns/) read-only page, so the audit history records *how* the lodgement was made, not only that it happened.

## What happens after you click Confirm

Comply runs the transition inside a single retry-safe transaction:

1. Validates the lodgement date is within bounds.
2. Persists the lodgement date, method (and other-details if applicable), and reference number.
3. Sets `FilingState = Lodged`.
4. Best-effort syncs the corresponding **Filing Period** row so any late-filing banner clears.
5. Writes the `RETURN_LODGED_WITH_DIR` audit-ledger entry. This entry carries an **artifact checksum dictionary** — SHA-checksums of the exact PDF / XML / Excel / Form 301 files you submitted — so the audit trail can later prove which specific artifacts were lodged.

For credit and zero-balance returns, Comply then **auto-advances** the state to **Lodged & Paid** and writes a `NO_PAYMENT_DUE` audit-ledger entry. This second transition is part of the regulatory invariant — see [VR-STATE-001](#vr-state-001-every-return-passes-through-lodged-first) below.

### State transition table

| Return type | Result after Confirm |
|---|---|
| **Payable return** (Net VAT due > 0) | `Awaiting Lodgement` → **`Lodged`**. Stays at Lodged until you [record payment](#recording-payment). |
| **Credit or zero return** (Net VAT due ≤ 0) | `Awaiting Lodgement` → `Lodged` → **`Lodged & Paid`**. Both transitions happen automatically; you do not need to record payment because none is due. |

## VR-STATE-001: every return passes through Lodged first

A deliberate regulatory invariant: **every** return, including credit and zero-balance ones, transitions through `Lodged` before it can reach `Lodged & Paid`. The auto-advance for credit/zero happens **after** the `RETURN_LODGED_WITH_DIR` audit entry has been written.

Why this matters: the `RETURN_LODGED_WITH_DIR` audit entry carries the lodgement date, method, reference, and artifact checksums. Skipping `Lodged` for credit returns would mean the lodgement event never produces a clean audit row — which would break audit reproducibility for ~30% of returns over a financial year. The invariant exists so the DIR-side audit story is complete for every return type.

## Retracting a lodgement

If you discover an error in the lodgement capture (you recorded the wrong date or the wrong method, or the DIR rejected the submission and you need to re-do it), you can retract.

### When retract is appropriate

- You picked the wrong lodgement method or wrong date by accident.
- The DIR-side process rejected the submission and you must re-lodge.
- An authorised agent reports a different reference number than the one you recorded.

It is **not** appropriate to retract simply because you noticed a return contains an error — for that you create an [amendment](/docs/vat-returns/submit-return#amendments), not a retraction.

### How retraction works

Retracting moves the return from `Lodged` back to `Awaiting Lodgement` and clears the lodgement date, method, other-details, and reference number. The original `RETURN_LODGED_WITH_DIR` audit entry is **not deleted** — instead, Comply writes a new `RETURN_LODGEMENT_RETRACTED` audit entry with your mandatory reason for the retraction. The audit history therefore records both the original lodgement and the retraction.

### Constraints

- **A reason is mandatory.** Comply will not accept a blank reason — the reason is persisted to the audit ledger.
- **Rate limit: 3 retractions per rolling 24-hour window per return.** If you hit the limit, Comply surfaces a clear error explaining when you'll be able to retract again. The limit exists to prevent runaway retract/re-lodge cycles that would damage audit clarity.

After retraction the return is back at Awaiting Lodgement and you can re-open the Record DIR Acknowledgement dialog to capture the corrected lodgement.

## Recording payment

For payable returns (Net VAT due > 0), the lifecycle does not end at `Lodged` — it ends at `Lodged & Paid`. You record the payment back into Comply after you have paid the DIR (via the OTAS portal, bank transfer to the Comptroller's account, or cheque at a DIR office).

### Cumulative payments

Comply accepts payments cumulatively. A return moves to `Lodged & Paid` only when the cumulative payment total **meets or exceeds the Net VAT due**. Partial payments keep the return at `Lodged` with a `Partially Paid` payment-status flag.

### What gets written

Each payment you record produces:

- A `Payment` row on the return, capturing the amount, date, and method.
- A `PAYMENT_RECORDED` audit-ledger entry.

When the cumulative total catches up with Net VAT due, Comply transitions the return to `Lodged & Paid` automatically.

### Why credit/zero returns don't appear here

Credit and zero-balance returns reach `Lodged & Paid` automatically via the VR-STATE-001 auto-advance immediately after `RETURN_LODGED_WITH_DIR`. There is no payment to record because none is due (a credit return means the DIR owes you; recording the DIR refund when it arrives is a separate workflow tracked outside this dialog).

## What you'll see on the View Filed Return page

Once you have recorded lodgement, the return becomes read-only and is visible at `/vatreturns/{Id}/view`. The DIR Lodgement Details card on that page surfaces:

- Lodgement Date
- Lodgement Method (in plain-English form)
- DIR Reference Number (if you recorded one)
- Current Filing State (Lodged or Lodged & Paid)

Plus a paginated **Audit Trail** timeline showing every audit-ledger entry for the return — including `ACK_SECTION61`, `RETURN_APPROVED_BY_SIGNATORY`, `FILING_INITIATED`, `FILING_ARTIFACTS_GENERATED`, `RETURN_LODGED_WITH_DIR`, `PAYMENT_RECORDED` (or `NO_PAYMENT_DUE`), and any `RETURN_LODGEMENT_RETRACTED` events from corrections.

## Next steps

- [VAT Returns Overview](/docs/vat-returns/) — the canonical 8-state machine
- [Filing Wizard](/docs/vat-returns/filing-wizard) — the prior step
- [Submit VAT Return](/docs/vat-returns/submit-return) — the external-submission workflow
- [Audit Trail](/docs/audit/) — where every lodgement event surfaces
