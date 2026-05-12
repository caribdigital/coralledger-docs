---
sidebar_position: 9
title: Handover
description: Transferring attestation responsibility between parties within the Section 32 Attestation Pathway
---

# Handover

:::warning Coming Soon — not yet available
The Handover feature described on this page is **planned functionality** and is not yet available in the production platform. No handover button is present on the attestation screen, no 24-hour expiring link is generated, and no `ATT_HANDOVER_*` audit events are emitted in the current build. This page is published in advance so firms can plan their preparer→owner workflow against the intended behavior; the implementation date will be announced separately. Until launch, use a fresh login by the owner or director to complete attestation — never share a session.
:::

A Handover transfers the active attestation session from one responsible party to another — for example, from a preparer who built the return to the business owner who must ultimately sign it, or from one firm accountant to a senior colleague who will attest the filing.

## When to Use Handover

Use Handover when:

- A **preparer** has completed the return but cannot attest it (e.g., they are an agent without attestation authority)
- The **business owner** or director must personally complete the attestation but the return was prepared by a third party
- A **senior accountant** needs to review and attest a return that was assembled by a junior colleague
- The original attesting party is **unavailable** and the attestation needs to be completed before the filing deadline

:::warning Do Not Share Sessions
Never share your login credentials or browser session to allow a colleague to complete your attestation. Always use the Handover feature to formally transfer responsibility. Shared sessions violate the identity integrity requirements of Section 32 and are flagged as anomalies in the audit trail.
:::

## How Handover Works

### Initiating a Handover

1. Open the return that is in the attestation pathway
2. On the attestation screen, click **Handover to Another Party**
3. Select the recipient from the list of users with access to this business, or enter their email address if they are not yet a user
4. Choose the **handover reason** from the dropdown:
   - Preparer to Owner
   - Agent to Business Owner
   - Junior to Senior Accountant
   - Deadline Coverage
   - Other (requires a note)
5. Add an optional note for the recipient
6. Click **Initiate Handover**

CoralLedger Comply sends the recipient an email notification containing a secure handover link. The link expires after **24 hours** or at the filing deadline, whichever comes first.

### Recipient Completing the Handover

When the recipient clicks the handover link:

1. They are directed to the CoralLedger Comply login page (or the return directly, if already logged in)
2. After login, the return is pre-loaded in the attestation pathway
3. A [Session Affirmation](/docs/attestation/session-affirmation) is required — the recipient must confirm their identity before proceeding
4. The [Qualifying Screen](/docs/attestation/qualifying-screen) is presented fresh for the new responsible party
5. The attestation continues as normal from the qualifying step onward

## Handover Rules

| Rule | Detail |
|------|--------|
| **One active handover at a time** | A second handover cannot be initiated while one is pending |
| **Sender cannot complete** | Once a handover is initiated, the original sender's attestation access is suspended until the handover expires or is recalled |
| **Expiry** | If the recipient does not act within 24 hours (or before the deadline), the handover expires and the return reverts to **Draft** |
| **Recall** | The sender can recall a pending handover at any time before the recipient acts on it |
| **Role requirement** | The recipient must hold the Accountant or Owner role for the business |

## Recalling a Handover

To recall a pending handover:

1. Open the return
2. Click **Recall Handover**
3. Confirm the recall

The pending handover link is immediately invalidated. The attestation session is returned to the original sender, who must re-enter the qualifying screen.

## Handover Audit Record

Every handover event is recorded in the [Attestation Audit Trail](/docs/attestation/audit-trail), including:

| Field | Contents |
|-------|----------|
| **Sender** | User ID and name of the party who initiated the handover |
| **Recipient** | User ID and name of the intended recipient |
| **Handover Reason** | Selected reason and any additional note |
| **Initiated At** | UTC timestamp of handover initiation |
| **Accepted At** | UTC timestamp when the recipient completed the affirmation step |
| **Expiry** | UTC expiry timestamp of the handover link |
| **Outcome** | Accepted / Expired / Recalled |

## Next Steps

- [Session Affirmation](/docs/attestation/session-affirmation)
- [Qualifying Screen](/docs/attestation/qualifying-screen)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
