---
sidebar_position: 1
title: Section 32 Attestation Overview
description: Overview of the Section 32 Attestation Pathway in CoralLedger Comply
---

# Section 32 Attestation Pathway

The Section 32 Attestation Pathway is a structured declaration process built into CoralLedger Comply that satisfies the formal attestation requirements under [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32. Before a VAT return can be submitted, the responsible party must pass through this pathway and confirm — under penalty of law — that the return is accurate and complete.

:::info Legal Basis
[Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32 requires that every VAT return be accompanied by a signed declaration that the information provided is true, correct, and complete to the best of the declarant's knowledge and belief. CoralLedger Comply implements this requirement as a guided digital pathway.
:::

## Why Attestation Matters

A VAT return submitted without a valid attestation is treated as incomplete by the Comptroller of Revenue. Consequences of an invalid or absent attestation include:

- **Non-compliant filing status** — The return may be rejected or flagged
- **Personal liability** — The declarant is personally accountable for the declaration
- **Penalty exposure** — False declarations carry criminal and civil penalties under the VAT Act
- **Audit risk** — Unsigned or improperly attested returns attract increased Comptroller scrutiny

## Who Attests — Signatory Capacity

The attestation is completed by exactly one party per submission, identified by their **signatory capacity**. Comply recognizes four capacities, each backed by an enum value in the platform (`SignatoryCapacity`):

| Signatory capacity | Variant page | Who this is |
|---|---|---|
| **`RegisteredTaxpayer`** | [Standard Variant](/docs/attestation/variant-standard) | The registered business owner or director, attesting personally |
| **`AuthorisedAgent`** | [Agent Variant](/docs/attestation/variant-agent) | A third-party agent acting on the registrant's behalf with a written authorization |
| **`BicaLicensedPractitioner`** | [Professional Variant](/docs/attestation/variant-professional) | A BICA-licensed accountant attesting under one of the practice-area attestation bodies (Variants A / B / C / combinations — see Professional page) |
| **`AuthorisedEmployee`** | [Digital Variant](/docs/attestation/variant-digital) *(coming soon)* | An authorized employee submitting with a qualified electronic signature; documented in advance for integrator planning, not yet available in the production platform |

The [Qualifying Screen](/docs/attestation/qualifying-screen) determines which capacity applies based on the filer's role and the business's filing arrangement.

:::note Variant vs Signatory Capacity
The four variant pages map to the `SignatoryCapacity` enum. Within the Professional variant, the BICA-licensed practitioner additionally selects one of seven `AttestationVariant` bodies (Variant A — General VAT Compliance; Variant B — Return Preparation; Variant C — Advisory Services; and the four practice-area combinations A+B, A+C, B+C, A+B+C). See the [Professional Variant](/docs/attestation/variant-professional) page for details.
:::

## Pathway Structure

The attestation process flows through the following stages:

1. **Qualifying Screen** — Identifies the attestation variant applicable to the filer
2. **Variant-Specific Declaration** — Presents the relevant declaration form based on the qualifier result
3. **BICA Verification** *(where applicable)* — Confirms professional registration
4. **Session Affirmation** — Confirms the current user's identity and intent mid-session
5. **Handover** *(where applicable)* — Transfers attestation responsibility between parties
6. **Submission** — Locks the return and records the attested event in the audit trail

## Carve-Outs

Certain filings are exempt from the standard attestation pathway. See [Carve-Outs](/docs/attestation/carve-outs) for qualifying scenarios.

## Audit Trail

Every attestation event — including the variant selected, the declarant identity, timestamp, and session details — is recorded in an immutable audit log. See [Attestation Audit Trail](/docs/attestation/audit-trail) for details.

## Next Steps

- [Qualifying Screen](/docs/attestation/qualifying-screen)
- [Standard Declaration Variant](/docs/attestation/variant-standard)
- [Authorized Agent Variant](/docs/attestation/variant-agent)
- [Professional Accountant Variant](/docs/attestation/variant-professional)
- [Digital Filing Variant](/docs/attestation/variant-digital)
- [BICA Verification](/docs/attestation/bica-verification)
- [Session Affirmation](/docs/attestation/session-affirmation)
- [Handover](/docs/attestation/handover)
- [Practitioner Revocation Gate](/docs/attestation/practitioner-revocation) — what users see when attestation or assignment is revoked
- [Carve-Outs](/docs/attestation/carve-outs)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
