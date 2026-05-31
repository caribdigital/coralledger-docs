---
sidebar_position: 6
title: Carve-Outs
description: Hard-refusal scenarios where Section 32 attestation cannot proceed
---

# Carve-Outs

In the §32 pathway, "carve-out" means a **hard-refusal scenario** where attestation cannot proceed. These are not abbreviated confirmation flows, and there is no override route inside the product.

When a carve-out condition is detected, CoralLedger blocks filing in the attestation flow and records the refusal in the [Attestation Audit Trail](/docs/attestation/audit-trail).

## Hard-Refusal Carve-Out Scenarios

### 1. Real-estate developers with pre-sale deposits

Where a registrant is filing in a real-estate development context involving pre-sale deposits, the standard attestation pathway is not available.

### 2. Rate-spanning continuous supplies

Where a supply period spans a VAT rate boundary under a continuous-supply context, the standard attestation pathway is not available.

## Control Behavior

For both carve-out scenarios:

- The filer is blocked from proceeding in the §32 attestation flow
- The UI presents a carve-out refusal message
- No manual or certificate-upload override is offered
- An audit event is recorded with carve-out type and timestamp

## Audit Requirements

Every carve-out refusal is recorded in the [Attestation Audit Trail](/docs/attestation/audit-trail) with:

| Field | Description |
|------|-------------|
| **Carve-Out Type** | Which hard-refusal carve-out scenario was detected |
| **Detection Source** | Rule-based system detection source |
| **Blocked By** | Control gate that enforced the refusal |
| **Timestamp** | UTC timestamp of the refusal |

## Next Steps

- [Qualifying Screen](/docs/attestation/qualifying-screen)
- [Standard Declaration Variant](/docs/attestation/variant-standard)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
