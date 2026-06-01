---
sidebar_position: 2
title: Qualifying Screen
description: How CoralLedger Comply determines which Section 32 attestation variant applies
---

# Qualifying Screen

The Qualifying Screen is the first step in the Section 32 Attestation Pathway. It presents a short set of questions to determine which **signatory capacity** applies to the current filer and filing context — mapping to one of the four variants (Standard `RegisteredTaxpayer`, Agent `AuthorisedAgent`, Professional `BicaLicensedPractitioner`, or Digital `AuthorisedEmployee` *coming soon*).

## When the Qualifying Screen Appears

The Qualifying Screen is displayed when:

- You initiate the final submission step of a VAT return
- A VAT return that was previously started has its submission resumed
- A return is handed over to a new responsible party (see [Handover](/docs/attestation/handover))

You cannot bypass the Qualifying Screen. If a prior attestation session has expired, the screen is re-presented for a fresh qualification.

## Qualifying Questions

The screen presents up to four questions, shown in sequence. Later questions appear only if earlier answers require further qualification.

### Question 1 — Filer Role

> **Who is completing this attestation?**

| Option | Result |
|--------|--------|
| I am the registered business owner or director | Proceeds to Question 2 |
| I am filing as an authorized agent on behalf of the registrant | Routes to [Authorized Agent Variant](/docs/attestation/variant-agent) |
| I am a BICA-registered accountant preparing this return | Routes to [Professional Accountant Variant](/docs/attestation/variant-professional) |

### Question 2 — Signature Method

> **How will you sign this return?**

| Option | Result |
|--------|--------|
| Electronic confirmation in this session | Routes to [Standard Declaration Variant](/docs/attestation/variant-standard) |
| Qualified electronic signature (digital certificate) | *(Coming soon)* Routes to [Digital Filing Variant](/docs/attestation/variant-digital) — disabled in current build |

### Question 3 — Carve-Out Check

If either Question 1 or Question 2 results indicate a potential carve-out scenario, a third question is shown:

> **Does any of the following apply to this return?**

- The return includes real-estate developer pre-sale deposits
- The return involves a continuous supply that spans a VAT rate change

A **Yes** answer routes the filer to the [Carve-Outs](/docs/attestation/carve-outs) refusal guidance and blocks the standard pathway. A **No** answer continues the standard pathway.

## What Happens After Qualification

Once the qualifying questions are answered, CoralLedger Comply:

1. Determines and records the attestation variant for the session
2. Displays the relevant declaration text for the identified variant
3. Locks the qualification result to the current session — answers cannot be changed without abandoning and restarting the submission

:::warning Restarting Qualification
If you select the wrong qualifying option, you must abandon the current attestation session and restart the submission process. Any answers already given are discarded and the return remains in **Draft** status.
:::

## Qualification Result Summary

After completing the screen, a summary banner displays the selected pathway:

| Field | Value |
|-------|-------|
| **Signatory Capacity / Variant** | `RegisteredTaxpayer` (Standard) / `AuthorisedAgent` (Agent) / `BicaLicensedPractitioner` (Professional) / `AuthorisedEmployee` (Digital, coming soon) |
| **Qualifying Session ID** | Unique identifier for the current attestation session |
| **Timestamp** | UTC date and time of qualification |
| **Filer** | Logged-in user who completed the qualifying screen |

This summary is included in the [Attestation Audit Trail](/docs/attestation/audit-trail).

## Next Steps

- [Standard Declaration Variant](/docs/attestation/variant-standard)
- [Authorized Agent Variant](/docs/attestation/variant-agent)
- [Professional Accountant Variant](/docs/attestation/variant-professional)
- [Digital Filing Variant](/docs/attestation/variant-digital)
- [Carve-Outs](/docs/attestation/carve-outs)
