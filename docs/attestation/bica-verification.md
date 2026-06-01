---
sidebar_position: 7
title: BICA Verification
description: How CoralLedger Comply verifies BICA membership for the Professional Accountant attestation variant
---

# BICA Verification

BICA Verification is the registry-lookup step within the [Professional Accountant Variant](/docs/attestation/variant-professional) that confirms a filing accountant's membership in the **Bahamas Institute of Chartered Accountants** is current and in good standing at the time of attestation.

## Why BICA Verification Is Required

The Professional Accountant Variant carries an enhanced professional duty of care. To ensure that this variant is used only by qualified professionals, CoralLedger Comply verifies membership status in real time. A lapsed, suspended, or unrecognized membership number prevents the professional declaration from being presented.

## How Verification Works

When an accountant selects the Professional Accountant pathway on the [Qualifying Screen](/docs/attestation/qualifying-screen), they are prompted to enter their BICA membership number before proceeding to the declaration:

1. Enter your **BICA membership number** in the field provided
2. Click **Verify**
3. CoralLedger Comply queries the BICA membership registry
4. The result is displayed within approximately five seconds

## Verification Outcomes

CoralLedger Comply consumes the official **BICA Listing of Licensees** PDF and the **Find-a-Member** web surface, then writes the outcome to the [Attestation Audit Trail](/docs/attestation/audit-trail) as a `BICA_VERIFICATION_ATTEMPTED` event. If the registry sources cannot be reached or reconciled, the attempt resolves to `Unreachable`. The outcome resolves to one of four canonical states:

| State | Description (regulator-visible) | Next Step |
|---|---|---|
| **Verified** | BICA licence verified — licence current; expiry date carried from the listing. | Proceed to the Professional Accountant declaration. |
| **NotFound** | BICA licence checked — no record on the BICA register. | Check for typos; contact BICA if the issue persists. |
| **Expired** | BICA licence checked — record found, licence expired (date carried from the listing). | Contact BICA to renew before filing. |
| **Unreachable** | BICA licence check could not be completed — BICA register did not respond. | Stop filing and retry once the BICA register is reachable. |

The four-word state token (`Verified` / `NotFound` / `Expired` / `Unreachable`) is the machine-stable identifier used by audit consumers and regulator inspectors. The prose around each line is editorial and may evolve; the state token is the contract.

There is no skip or manual-upload override on this step. Only `Verified` allows the Professional Accountant Variant to continue.

## Verb Choice (Honest Language)

The Description verb in the audit row reflects what actually happened:

- **verified** — used only when verification succeeded (`Verified` state).
- **checked** — used when the BICA register answered with a definitive negative (`NotFound`, `Expired`).
- **check could not be completed** — used when no check happened (`Unreachable` — the register did not respond).

This honesty discipline is per the regulatory product owner's sign-off (CLR-2026-04-COMPLY-01).

## Verification Record

Every verification attempt — whether successful or not — is recorded in the [Attestation Audit Trail](/docs/attestation/audit-trail) as a `BICA_VERIFICATION_ATTEMPTED` event. The event carries both a regulator-visible **Description** line and a structured **metadata** payload:

### Description (regulator-visible)

The Description line names the **business** being attested for (not the practitioner) and embeds the four-word state token. Example for the `Unreachable` state:

> `BICA licence check could not be completed for Atlantis Hotel Group — Unreachable; BICA register did not respond`

### Metadata payload (machine-readable)

| Field | Contents |
|-------|----------|
| `LicenceNumber` | Normalised BICA identifier as supplied by the practitioner |
| `state` | One of `Verified` / `NotFound` / `Expired` / `Unreachable` |
| `PractitionerName` | Name surfaced from the BICA listing (when present) |
| `ListingDate` | Licence expiry / activity date from the listing (when present) |
| `ListingPublishedAt` | UTC timestamp the listing PDF was published |
| `FromCache` | `true` when the result was served from the 24-hour distributed cache |

The `state=` syntax appears only in the structured metadata, never in the regulator-visible Description.

## Next Steps

- [Professional Accountant Variant](/docs/attestation/variant-professional)
- [Session Affirmation](/docs/attestation/session-affirmation)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
