---
sidebar_position: 7
title: BICA Licence Declaration
description: How the practitioner's BICA licence is recorded as a disclosed self-declaration during the Professional Accountant attestation variant
---

# BICA Licence Declaration

The BICA Licence Declaration is the step within the [Professional Accountant Variant](/docs/attestation/variant-professional) where a filing accountant records their licence with the **Bahamas Institute of Chartered Accountants** as part of the attestation. The licence is recorded as the practitioner's **own declaration**. CoralLedger Comply does not check it against the BICA registry during beta, and says so on the surface where it is entered.

## What Happens at Attestation Today

When an accountant selects the Professional Accountant pathway on the [Qualifying Screen](/docs/attestation/qualifying-screen), they are prompted to declare their licence before proceeding to the professional declaration:

1. Enter your **name as listed with BICA** in the field provided
2. Review the declaration step, which states plainly that the entry is stored as self-attested and is not registry-verified
3. Confirm the professional declaration and sign

The attestation surface carries the disclosure line verbatim:

> Self-declared. Not verified against the BICA registry.

There is no verification outcome, no pass/fail gate against the register, and no "Verified" state anywhere in this flow. The practitioner's declaration, and the permanent record of it, is the mechanism.

## What Is Recorded

Every professional attestation writes an immutable, timestamped record to the [Attestation Audit Trail](/docs/attestation/audit-trail) carrying:

- The **self-declared BICA licence detail** exactly as the practitioner entered it
- The **typed capacity** in which the practitioner attests
- The **provenance marker** identifying the licence as self-declared (never a verification claim)
- The **UTC timestamp** and the identity of the signatory

The record is tamper-evident and permanent: if the declaration is ever questioned, the exact text the practitioner signed, and the fact that it was their own declaration, can be reproduced.

## Whose Responsibility It Is

The declaration is the practitioner's. Public practice in The Bahamas requires a current licence under §13 of the BICA Act 2015; by attesting, the practitioner declares that they hold one, and they remain responsible for the accuracy of that declaration. Providing a false attestation may constitute professional misconduct under BICA standards, and the attestation record preserves exactly what was declared and when.

CoralLedger Comply's responsibility is the record: capturing the declaration honestly, labelling it as self-declared, and never presenting it as verified.

## Planned Capability: Registry Verification

Automated verification of practitioner licences against the BICA register is a planned capability. When it ships, the attestation flow will check the declared licence against the official register at attestation time, and this page will be replaced by documentation of the verification flow. Until then, no CoralLedger surface, in the product or in these docs, claims that a live registry check occurs.

## Related

- [Professional Accountant Variant](/docs/attestation/variant-professional)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
- [Qualifying Screen](/docs/attestation/qualifying-screen)
