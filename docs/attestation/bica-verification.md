---
sidebar_position: 7
title: BICA Verification
description: How CoralLedger Comply verifies BICA membership for the Professional Accountant attestation variant
---

# BICA Verification

BICA Verification is the automated step within the [Professional Accountant Variant](/docs/attestation/variant-professional) that confirms a filing accountant's membership in the **Bahamas Institute of Chartered Accountants** is current and in good standing at the time of attestation.

## Why BICA Verification Is Required

The Professional Accountant Variant carries an enhanced professional duty of care. To ensure that this variant is used only by qualified professionals, CoralLedger Comply verifies membership status in real time. A lapsed, suspended, or unrecognized membership number prevents the professional declaration from being presented.

## How Verification Works

When an accountant selects the Professional Accountant pathway on the [Qualifying Screen](/docs/attestation/qualifying-screen), they are prompted to enter their BICA membership number before proceeding to the declaration:

1. Enter your **BICA membership number** in the field provided
2. Click **Verify**
3. CoralLedger Comply queries the BICA membership registry
4. The result is displayed within approximately five seconds

## Verification Outcomes

| Result | Meaning | Next Step |
|--------|---------|-----------|
| **Verified — Active** | Membership is current and in good standing | Proceed to the Professional Accountant declaration |
| **Verified — Renewal Pending** | Membership is within 30 days of renewal; still valid | A warning is shown; you may proceed |
| **Not Verified — Lapsed** | Membership has expired | Contact BICA to renew before filing |
| **Not Verified — Suspended** | Membership is currently suspended | You cannot use this variant; use [Authorized Agent Variant](/docs/attestation/variant-agent) or arrange for a colleague to file |
| **Not Verified — Not Found** | Number not found in registry | Check for typos; contact BICA if the issue persists |
| **Service Unavailable** | BICA registry is temporarily unreachable | See [Fallback Procedure](#fallback-procedure) below |

## Renewal Pending Warning

If your membership is within 30 days of its renewal date, a warning banner is shown before the declaration:

:::warning BICA Renewal Due Soon
Your BICA membership (No: XXXX) is due for renewal on [date]. Your attestation is valid today, but you must renew before that date to continue using the Professional Accountant Variant for future filings.
:::

You may proceed with the attestation despite this warning. The renewal reminder is also written to the [Attestation Audit Trail](/docs/attestation/audit-trail) for record-keeping purposes.

## Fallback Procedure

If the BICA registry service is unavailable at the time of filing, CoralLedger Comply activates a **manual fallback** mode:

1. A notice is displayed explaining that automated verification is temporarily unavailable
2. You are asked to upload a copy of your **current BICA membership certificate** (PDF, JPG, or PNG, maximum 5 MB)
3. Enter your membership number and the certificate expiry date
4. Check the **I confirm this certificate is current and authentic** declaration
5. Click **Proceed with Manual Verification**

The uploaded certificate is stored against the attestation record. Platform administrators are notified and will review the manual verification within one business day. The return can be submitted immediately — the fallback attestation is treated as valid pending review.

:::info Manual Fallback Audit Logging
Manual fallback events are flagged in the [Attestation Audit Trail](/docs/attestation/audit-trail) with a `BICA_MANUAL_FALLBACK` marker, allowing operators to identify and follow up on returns that used this procedure.
:::

## Verification Record

Every verification attempt — whether successful or not — is recorded in the attestation session data:

| Field | Contents |
|-------|----------|
| **Membership Number** | As entered by the accountant |
| **Verification Method** | Automated or Manual Fallback |
| **Verification Result** | Verified / Not Verified / Fallback |
| **Timestamp** | UTC date and time of the check |
| **Registry Response** | Status code returned by the BICA registry |

This record is included in the [Attestation Audit Trail](/docs/attestation/audit-trail) entry for the submission.

## Next Steps

- [Professional Accountant Variant](/docs/attestation/variant-professional)
- [Session Affirmation](/docs/attestation/session-affirmation)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
