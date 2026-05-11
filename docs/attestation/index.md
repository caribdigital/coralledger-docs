---
sidebar_position: 1
title: Section 32 Attestation Overview
description: Overview of the Section 32 Attestation Pathway in CoralLedger Comply
---

# Section 32 Attestation Pathway

The Section 32 Attestation Pathway is a structured declaration process built into CoralLedger Comply that satisfies the formal attestation requirements under **Section 32 of the Bahamas VAT Act**. Before a VAT return can be submitted, the responsible party must pass through this pathway and confirm — under penalty of law — that the return is accurate and complete.

:::info Legal Basis
Section 32 of the VAT Act (The Bahamas) requires that every VAT return be accompanied by a signed declaration that the information provided is true, correct, and complete to the best of the declarant's knowledge and belief. CoralLedger Comply implements this requirement as a guided digital pathway.
:::

## Why Attestation Matters

A VAT return submitted without a valid attestation is treated as incomplete by the Comptroller of Revenue. Consequences of an invalid or absent attestation include:

- **Non-compliant filing status** — The return may be rejected or flagged
- **Personal liability** — The declarant is personally accountable for the declaration
- **Penalty exposure** — False declarations carry criminal and civil penalties under the VAT Act
- **Audit risk** — Unsigned or improperly attested returns attract increased Comptroller scrutiny

## Who Attests

The attestation may be completed by any of the following authorized parties depending on the business structure and filing arrangement:

| Party | When Used |
|-------|-----------|
| **Business owner / director** | Standard self-filing |
| **Authorized agent** | Agent filing on behalf of the registrant |
| **BICA-registered accountant** | Professional preparer with verified BICA credentials |
| **Digital filer** | Returns submitted via electronic signature |

The [Qualifying Screen](/docs/attestation/qualifying-screen) determines which pathway applies.

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
- [Carve-Outs](/docs/attestation/carve-outs)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
