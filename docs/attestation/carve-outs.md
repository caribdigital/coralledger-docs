---
sidebar_position: 10
title: Carve-Outs
description: Hard-refusal scenarios that cannot proceed through the standard Section 32 Attestation Pathway
---

# Carve-Outs

In this section, **carve-outs** are the limited filing scenarios that cannot proceed through the standard Section 32 Attestation Pathway at all. When a carve-out applies, CoralLedger Comply refuses the pathway and requires the filer to stop and resolve the filing outside the standard attestation flow.

:::warning Carve-Outs Are Hard Refusals
A carve-out does **not** open a simplified declaration path. It is a hard stop: the filer cannot override the warning, cannot continue to variant selection, and cannot submit the return through the standard Section 32 pathway until the carve-out condition is cleared or the filing is handled through the appropriate regulated process.
:::

## Qualifying for a Carve-Out

During the [Qualifying Screen](/docs/attestation/qualifying-screen), Question 3 asks whether any carve-out scenario applies. If the filer answers **Yes**, CoralLedger Comply identifies the scenario and blocks continuation into the attestation variants.

A carve-out may also be detected automatically when the filing facts unambiguously match a blocked scenario. Detected carve-outs still surface an explicit refusal message; they are not silently applied.

## Carve-Out Scenarios

### 1. Real-estate developers with pre-sale deposits

Returns involving **real-estate development with pre-sale deposits** are carved out of the standard §32 attestation path. The deposit timing and later completion events create a regulated timing profile that is handled outside the normal variant-selection flow.

**Blocked filing facts:**
- The registrant is acting as a real-estate developer
- The filing period includes pre-sale deposits or related receipts before completion
- The return would otherwise be routed through the standard §32 attestation flow

---

### 2. Rate-spanning continuous supplies

Returns involving **continuous supplies that span a VAT rate change** are also carved out. Where a single supply period crosses statutory timing points or rate transitions, the standard variant flow is not available.

**Blocked filing facts:**
- The supply is a continuous supply rather than a one-off taxable event
- The covered period spans a VAT rate change
- The return would require the standard §32 variant flow to proceed

:::info Out of Scope for Carve-Outs
Nil returns, amended returns, Comptroller-approved filing arrangements, and PlatformAdmin test returns are not treated as §32 carve-outs on this page. They may have their own operational handling elsewhere, but they are not the hard-refusal carve-outs defined for the attestation pathway.
:::

---

## Carve-Out Confirmation Screen

When a carve-out applies, the filer sees a refusal screen instead of the standard pathway:

1. The applicable carve-out scenario is displayed with a brief explanation
2. The statutory reason for refusal is shown
3. The filer is told that the standard §32 pathway is unavailable for this return
4. The screen provides the next operational step (for example, escalate for manual/regulatory handling)
5. No override, confirmation checkbox, or submit action is available on this screen

## Carve-Out Audit Record

All carve-out refusals are recorded in the [Attestation Audit Trail](/docs/attestation/audit-trail) with:

| Field | Contents |
|-------|----------|
| **Carve-Out Type** | Real-estate pre-sale deposit / Rate-spanning continuous supply |
| **Detection Source** | Whether the carve-out was detected by Comply or surfaced from filer input |
| **Refusal Reason** | The blocking rule presented to the filer |
| **Declarant** | User ID and name of the blocked party |
| **Timestamp** | UTC timestamp of the carve-out refusal |

## Next Steps

- [Qualifying Screen](/docs/attestation/qualifying-screen)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
- [Submit your VAT return](/docs/vat-returns/submit-return)
