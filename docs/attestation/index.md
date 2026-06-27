---
sidebar_position: 1
title: Section 32 Attestation Overview
description: Two distinct §32 artefacts — the persistent firm-admin attestation lifecycle, and the per-return signatory capacity declaration
---

# Section 32 Attestation Overview

CoralLedger Comply implements two distinct artefacts under the umbrella term "Section 32 attestation," and the distinction matters. Conflating them is the most common source of confusion when navigating this section.

| Artefact | What it is | Where it lives | Lifecycle |
|---|---|---|---|
| **§32 Attestation Lifecycle (Firm Admin)** | A persistent practitioner statement, scoped to `(client, practitioner)`, that the practitioner has read the relevant variant body text and confirms understanding of the §32 sub-rules applicable to that client. | Created and managed through the firm-admin pathway. The persistent record sits behind `AttestationService`. | Create → potentially Supersede or Void. Persists across sessions until explicitly superseded. |
| **Signatory Capacity Declaration (per return)** | A per-return declaration of who is signing the specific return being finalised, and in what authorised capacity. Backed by the `SignatoryCapacity` enum. | Captured in the **[Filing Wizard](/docs/vat-returns/filing-wizard) step 4** Approve Filing dialog, alongside the [Section 61 acknowledgement](/docs/vat-returns/filing-wizard#step-4-approval-section-61-acknowledgement). | A new declaration on every return. Recorded in the `RETURN_APPROVED_BY_SIGNATORY` audit event. |

**The Signatory Capacity Declaration is not a §32 attestation.** It is a per-return capability declaration. Both artefacts can exist independently — and for some client/return combinations, both are required.

:::info Which one do I need for this return?
- If your client is in a **§3 restricted segment** (per Julian's CLR memorandum §3 — construction with retention, retainer-billed services, SaaS subscription, real-estate developers, and similar regulated categories), **you need both**: an `Active` §32 attestation in the persistent lifecycle, *and* the per-return Signatory Capacity Declaration at filing time.
- If your client is **not** in a restricted segment, the per-return Signatory Capacity Declaration at filing time is sufficient on its own — no admin attestation is required.

If you are unsure, see [Carve-Outs](/docs/attestation/carve-outs) for the restricted-segment determination.
:::

## Legal basis

> [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32, requires that every VAT return be accompanied by a signed declaration that the information provided is true, correct, and complete to the best of the declarant's knowledge and belief.

CoralLedger Comply satisfies this regulatory requirement through the combination of the two artefacts above: the persistent admin attestation lifecycle (where applicable) and the per-return Signatory Capacity Declaration (always).

A VAT return submitted without the relevant artefact(s) for that client is treated as incomplete by the Comptroller of Revenue. Consequences include non-compliant filing status, personal liability for the declarant, criminal and civil penalty exposure under the VAT Act, and increased Comptroller scrutiny.

## The §32 Attestation Lifecycle (Firm Admin)

This is the section's main subject. It covers the persistent attestation record that a firm captures for a client business in a restricted segment.

### When the lifecycle applies

A firm captures a §32 attestation for a client when:

- The client is in a §3 restricted segment (so an attestation is required).
- A BICA-licensed practitioner at the firm assumes responsibility for that client.

The attestation is then persisted against `(BusinessId, PractitionerUserId)` with `AttestationStatus = Active`. Until that record is superseded or voided, it governs all subsequent filings for that client.

### Lifecycle operations

- **Create** — A new attestation row is written when a practitioner first attests for a client. If a prior attestation exists, it is superseded in the same transaction (one Active record per pair).
- **Supersede** — A new attestation replaces an existing one — for example, when the practitioner re-attests against an updated variant body text. The prior record's status moves to `Superseded` and a `SupersededAt` / `SupersededByAttestationId` link is recorded.
- **Void** — An attestation is voided when the underlying client assignment changes, breaking the `(client, practitioner)` binding. The status moves to `VoidedByAssignmentChange`.
- **Re-attestation required** — If the canonical body text drifts (detected via a `TextVersionHash` comparison), the existing attestation is considered insufficient and the practitioner is prompted to re-attest against the current text before they can post.

Each operation writes a corresponding audit event (`ATTESTATION_CREATED`, `ATTESTATION_SUPERSEDED`, `ATTESTATION_VOIDED_BY_ASSIGNMENT_CHANGE`, `ATTESTATION_RE_ATTEST_REQUIRED`).

### Attestation bodies — Variants A / B / C and their combinations

Within the firm-admin lifecycle, a BICA-licensed practitioner attests under one of seven `AttestationVariant` bodies. Each variant is a **practice-area declaration** — what the practitioner is attesting to for the client — made under the [Value Added Tax Act, 2014 (as amended)](https://laws.bahamas.gov.bs/) and applicable BICA professional standards:

| Code | Declaration scope |
|---|---|
| **Variant A** | **General VAT Compliance Attestation** — the business is in compliance with its general VAT obligations |
| **Variant B** | **VAT Return Preparation Attestation** — the practitioner prepared or reviewed the VAT return(s) for the period(s) stated |
| **Variant C** | **VAT Advisory Services Attestation** — VAT advisory services were rendered in accordance with BICA professional standards |
| **Variant A+B** | General compliance + return preparation |
| **Variant A+C** | General compliance + advisory services |
| **Variant B+C** | Return preparation + advisory services |
| **Variant A+B+C** | Full-scope declaration covering all three practice areas |

Variants A, B, C, and A+B+C have ratified declaration bodies; the remaining three combinations (A+B, A+C, B+C) carry placeholder body text and require the practitioner to select one of the four ratified variants until ratification of the combinations is complete.

The selected variant's body text is stored on the attestation record verbatim, along with the version hash, so the exact declaration is reproducible for the seven-year retention period.

### Lifecycle sub-pages

The pages below cover the firm-admin lifecycle in detail. They describe the structured declaration capture flow as originally specified.

- [Qualifying Screen](/docs/attestation/qualifying-screen) — determining the applicable attestation variant
- [Standard Variant](/docs/attestation/variant-standard), [Agent Variant](/docs/attestation/variant-agent), [Professional Variant](/docs/attestation/variant-professional) — the three primary variants
- [Digital Variant](/docs/attestation/variant-digital) — see the page itself for current implementation status
- [BICA Verification](/docs/attestation/bica-verification) — the BICA membership check that gates the Professional Variant
- [Session Affirmation](/docs/attestation/session-affirmation) — identity re-confirmation mid-session
- [Handover](/docs/attestation/handover) — transferring attestation responsibility (planned functionality)
- [Practitioner Revocation Gate](/docs/attestation/practitioner-revocation) — what happens when the attestation or its underlying client assignment is revoked at run time
- [Carve-Outs](/docs/attestation/carve-outs) — which client types fall outside the standard pathway
- [Attestation Audit Trail](/docs/attestation/audit-trail) — the durable record of every lifecycle event

## The Signatory Capacity Declaration (per return)

This is the artefact that fires on every VAT return at the moment of finalisation, regardless of whether the client is in a restricted segment.

The capture is documented in full at [Filing Wizard — Step 4 Approval](/docs/vat-returns/filing-wizard#step-4-approval-signatory-capture). In summary:

- Captures **Full Name**, **Signatory Capacity** (from a 4-value enum), and a confirmation checkbox.
- The four `SignatoryCapacity` values are `RegisteredTaxpayer`, `BicaLicensedPractitioner`, `AuthorisedEmployee`, and `AuthorisedAgent`. See the [filing wizard signatory section](/docs/vat-returns/filing-wizard#step-4-approval-signatory-capture) for plain-English guidance on when to pick each.
- If the current user has an `Active` §32 attestation for this client business (per the admin lifecycle), the capture is **prefilled** with their name and `BicaLicensedPractitioner` capacity — an integration point between the two artefacts.
- The result is persisted in the `RETURN_APPROVED_BY_SIGNATORY` audit event.

A return cannot be finalised without a Signatory Capacity Declaration. For clients in a restricted segment, it cannot be finalised without an `Active` attestation either.

## How the two artefacts relate

The integration points between the firm-admin attestation lifecycle and the per-return Signatory Capacity Declaration are:

1. **Prefill at filing time.** If the current user has an `Active` attestation for the client business, the Signatory Capacity Declaration prefills their name and capacity.
2. **Posting gate at entry time.** The [Practitioner Revocation Gate](/docs/attestation/practitioner-revocation) blocks new transaction posting on a client when the user does not have both an active client assignment *and* an `Active` attestation — independent of any specific return.
3. **Restricted-segment requirement.** For clients in a §3 restricted segment, both artefacts must be in place for a return to be lodged. For other clients, only the per-return Signatory Capacity Declaration is required.

## Next steps

- [Filing Wizard — Step 4 Approval](/docs/vat-returns/filing-wizard#step-4-approval-signatory-capture) — the per-return Signatory Capacity Declaration
- [Qualifying Screen](/docs/attestation/qualifying-screen) — start of the firm-admin lifecycle
- [Practitioner Revocation Gate](/docs/attestation/practitioner-revocation) — runtime enforcement
- [Attestation Audit Trail](/docs/attestation/audit-trail) — durable record of lifecycle events
