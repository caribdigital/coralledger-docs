---
sidebar_position: 4
title: Filing Wizard
description: The 5-step filing wizard that captures the regulated artefacts of your VAT return before lodgement
---

# Filing Wizard

The Filing Wizard guides you through the regulated capture and finalisation steps that happen between **Draft** and **Awaiting Lodgement**. It is the surface where the Section 61 acknowledgement, the signatory declaration, and the artifact generation all happen, in a strict order, with named audit-trail entries at every transition.

You enter the wizard from the **Filing** page in CoralLedger Comply, after you have generated a draft return for the period.

## The five steps

Comply renders the wizard as a numbered timeline:

| # | Step | What happens | Audit event(s) written |
|---|---|---|---|
| **1** | Transaction Review | You confirm that every transaction for the period is imported, categorised, and accounted for. | _(no audit write)_ |
| **2** | VAT Validation | The [10-point validation](/docs/vat-returns/return-preview) runs; you address blocking issues. | _(no audit write)_ |
| **3** | Document Generation | Pre-flight check that the artifacts can be generated cleanly. | _(no audit write)_ |
| **4** | **Approval** | You complete the [Section 61 acknowledgement](#step-4-approval-section-61-acknowledgement) and the [signatory capture](#step-4-approval-signatory-capture). The return transitions **Draft → Ready to File**. | `ACK_SECTION61`, then `RETURN_APPROVED_BY_SIGNATORY` |
| **5** | **Submission** | Comply generates the PDF, XML, Excel, and Form 301 artifacts atomically and transitions **Ready to File → Filing in Progress → Awaiting Lodgement**. | `FILING_INITIATED`, `FILING_ARTIFACTS_GENERATED` |

After step 5 you are presented with a **Filing Artifacts Ready** success card — described below in [What "Filing Artifacts Ready" means](#what-filing-artifacts-ready-means).

## Step 4: Approval — Section 61 acknowledgement {#step-4-approval-section-61-acknowledgement}

When you click **Approve** at step 4, Comply opens the Approve Filing dialog. The first panel is the Section 61 Penalty Acknowledgement.

The dialog quotes the relevant rule from the [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 61, and tells you the **maximum penalty exposure for this specific return**:

> Under Bahamas VAT Act 2014, Section 61, the maximum penalty for an incorrect return is **up to 200% of the understated or over-claimed VAT** — **up to B$X on this return**.

The dollar figure is calculated as `|Net VAT due| × 2`. The absolute value is used so credit and zero-balance returns also display a meaningful exposure (the figure represents what the penalty *could* be if the return were later found to be materially incorrect).

You must tick the acknowledgement checkbox to proceed. When you do, Comply writes an `ACK_SECTION61` audit-ledger entry **before** it transitions the return state. This ordering matters — see [Audit-before-lock](#audit-before-lock).

## Step 4: Approval — Signatory capture {#step-4-approval-signatory-capture}

Below the §61 panel is the Authorised Signatory panel. Comply captures three things:

- **Full Name** — the natural-person name of the individual signing for this return, up to 200 characters.
- **Capacity** — a drop-down listing the four [Signatory Capacities](#signatory-capacities) recognised by Bahamian VAT practice.
- **"I confirm I am authorised…" checkbox** — a separate declaration distinct from the §61 acknowledgement.

When you click **Approve** to close the dialog, Comply writes a `RETURN_APPROVED_BY_SIGNATORY` audit-ledger entry capturing the name and capacity, then transitions the return state to **Ready to File**.

### §32 attestation prefill

If your CoralLedger account has an active **§32 attestation** for this client business (you are the BICA-licensed practitioner of record), Comply will pre-fill your name and set Capacity to `BICA-Licensed Practitioner`. The prefill is checked at the moment the dialog opens via a single correlated existence query against both your active client assignment and your active attestation record — see [Section 32 Attestation Overview](/docs/attestation/) for how that determination is made.

You can override the prefilled values if a different signatory is signing this specific return.

:::warning Is a §32 attestation also required for this return?
The Signatory Capacity Declaration captured here is a **per-return** artefact — it is required on every return regardless of client type. It is **not** the same as a §32 attestation in the firm-admin lifecycle.

- If your client is in a **§3 restricted segment** (per Julian's CLR memorandum §3 — construction with retention, retainer-billed services, SaaS subscription, real-estate developers, and similar regulated categories), the firm must **also** have an `Active` persistent §32 attestation for this `(client, practitioner)` pair before the return can be lodged. See [§32 Attestation Lifecycle (Firm Admin)](/docs/attestation/).
- If your client is **not** in a restricted segment, the Signatory Capacity Declaration captured here is sufficient on its own.

If you are unsure whether your client is in a restricted segment, see [Carve-Outs](/docs/attestation/carve-outs).
:::

## Signatory capacities

The four capacities recognised by Bahamian VAT practice are:

| Capacity | Who this is | When to pick it |
|---|---|---|
| **Registered Taxpayer** | The registered business owner or director, signing personally. | The most common capacity for sole traders and small businesses filing their own returns. |
| **BICA-Licensed Practitioner** | A practising accountant licensed by the Bahamas Institute of Chartered Accountants, signing under their §32 attestation authority for the client. | When you are a firm staff member of record under a §32 attestation. Prefill defaults to this when applicable. |
| **Authorised Employee** | An employee of the registered taxpayer with written internal authority to sign returns on the taxpayer's behalf. | Use when an internal finance officer or controller signs for the registrant. The internal authorisation is the registrant's record-keeping responsibility, not Comply's. |
| **Authorised Agent** | A third-party agent who is not a BICA-licensed practitioner, signing under a separate written authorisation from the registrant. | Less common; used by registered tax-return preparers who are not licensed accountants. |

The capacity value is recorded on the `RETURN_APPROVED_BY_SIGNATORY` audit entry and is durable for the 7-year retention period.

## Audit-before-lock

A subtle but important design choice: the two audit entries from step 4 — `ACK_SECTION61` and `RETURN_APPROVED_BY_SIGNATORY` — are written **before** the return is locked from edits.

If the audit ledger is briefly unavailable (a backend transient), Comply will surface the error and **leave the return unlocked** so you can retry. The alternative — locking first, then attempting the audit write — would risk a state where the return is locked but no attestation evidence exists. That outcome would be regulatorily worse than leaving the return unlocked.

You will not normally notice this behaviour because audit writes are fast. It matters during incident recovery.

## Step 5: Submission

When you click the Submit Filing button at step 5, Comply runs the finalisation routine, which:

1. **Locks** the return for concurrent modification using a database-level compare-and-swap. A second concurrent caller (e.g. a duplicate browser tab) sees an error and does not duplicate work.
2. **Generates** the PDF, XML, Excel, and Form 301 artifacts inside a single retry-safe transaction. Either all four are produced or none are persisted.
3. **Writes** two audit-ledger entries: `FILING_INITIATED` (the start-of-finalisation marker) and `FILING_ARTIFACTS_GENERATED` (the end-of-finalisation marker, carrying the artifact set's identifiers).
4. **Transitions** the return through Ready to File → Filing in Progress → **Awaiting Lodgement**.

If finalisation fails partway, Comply rolls the return back to Ready to File so you can retry without re-doing the approval step.

## What "Filing Artifacts Ready" means

After step 5 completes, Comply displays a card titled **Filing Artifacts Ready**. The wording is deliberate — Comply has prepared everything you need to submit to the DIR, but **Comply itself has not submitted anything**. The actual submission to the Department of Inland Revenue happens externally:

- via the [DIR's OTAS online portal](https://otas.revenue.gov.bs),
- by walking the artifacts into a DIR office (Nassau or Freeport), or
- via an authorised agent.

The Filing Artifacts Ready card offers three actions:

- **Download PDF** — a human-readable summary for your records and for in-person filings.
- **Download XML** — the DIR-accepted submission format for upload via OTAS.
- **Record DIR Acknowledgement** — the in-app capture you complete after the DIR confirms receipt of your submission. See [Record DIR Acknowledgement](/docs/vat-returns/record-dir-acknowledgement) for the full flow.

While the return sits in **Awaiting Lodgement**, no further audit-ledger writes happen — the next lifecycle event is when you record the lodgement.

## Why the wizard exists

The five-step structure encodes three regulatory facts:

1. **The §61 penalty is not a hidden term in a generic ToS** — Comply quotes the rule, calculates the specific dollar exposure, and asks for an explicit acknowledgement.
2. **The signatory declaration is captured per-return**, with the name and capacity persisted to the audit ledger. There is no "signed once, applies forever" shortcut.
3. **Comply does not file on your behalf with the DIR.** The artifacts-ready / submitted distinction is enforced in the UI wording so a reader cannot confuse the two.

These choices align with the principle from the [§32 Attestation Pathway](/docs/attestation/) that the regulatorily binding act happens in person between the registrant (or their authorised signatory) and the DIR — not silently inside the platform.

## Next steps

- [Record DIR Acknowledgement](/docs/vat-returns/record-dir-acknowledgement) — the post-wizard step
- [VAT Returns Overview](/docs/vat-returns/) — the canonical state machine
- [Submit VAT Return](/docs/vat-returns/submit-return) — the external-submission workflow
- [Section 32 Attestation Pathway](/docs/attestation/) — how the BICA-licensed practitioner prefill works
- [Audit Trail](/docs/audit/) — where the audit-ledger entries surface
