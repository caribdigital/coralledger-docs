---
sidebar_position: 7
title: BICA Verification
description: Validate professional filer status before permitting Section 32 professional attestation
---

# BICA Verification

The Professional Accountant Variant requires validation that the filer holds an eligible BICA registration at filing time. CoralLedger Comply checks this before the declaration can be accepted.

## Verification Outcomes

BICA checks return one of the following outcomes:

| Outcome | Meaning | Action |
|---|---|---|
| **Verified** | Membership is active and in good standing | Proceed to declaration confirmation |
| **Not Found** | Membership could not be matched | Filing blocked |
| **Expired** | Membership is found but expired | Filing blocked; renewal required |
| **Unreachable** | Registry is unreachable | Filing blocked |

## Why Verification Is Mandatory

Without successful BICA verification, professional declarations cannot be relied on for regulatory assurance. This control protects both the filer and the registrant from invalid submissions.

## No-Skip Enforcement

If BICA registry access is unavailable, CoralLedger does not permit manual fallback in the attestation path. The filing remains blocked until the verification service can be reached and a non-blocking verification state is returned.

## Audit Fields Captured

Every BICA verification event stores:

- Practitioner identity
- Verification outcome
- BICA lookup timestamp
- Verification source (`RegistryLookup`)
- Related attestation and return IDs

## Next Steps

- [Professional Accountant Variant](/docs/attestation/variant-professional)
- [Practitioner Revocation](/docs/attestation/practitioner-revocation)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
