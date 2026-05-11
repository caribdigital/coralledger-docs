---
sidebar_position: 8
title: Session Affirmation
description: Mid-session identity confirmation step in the Section 32 Attestation Pathway
---

# Session Affirmation

Session Affirmation is a mid-pathway identity confirmation step that occurs after the qualifying variant has been selected but before the final declaration is presented. Its purpose is to confirm that the person actively completing the attestation is the same authenticated user who initiated the session — protecting against unattended browser sessions and unauthorized completion.

## When Session Affirmation Is Triggered

Session Affirmation is required in the following circumstances:

| Trigger | Description |
|---------|-------------|
| **Inactivity** | The browser has been idle for more than **10 minutes** since the [Qualifying Screen](/docs/attestation/qualifying-screen) was completed |
| **Session age** | More than **20 minutes** have elapsed since the attestation session was started, regardless of activity |
| **Role change detected** | The user's role or business context changed during the attestation session |
| **Handover received** | A [Handover](/docs/attestation/handover) was initiated and the new responsible party is completing the attestation |
| **Security flag** | The platform's fraud detection has flagged an anomaly in the current session |

## What Session Affirmation Looks Like

When affirmation is required, the attestation flow pauses and a modal dialog is displayed:

> **Confirm Your Identity**
> To protect the integrity of this attestation, please confirm your identity before proceeding.

The user must complete one of the following confirmation methods, in order of preference:

1. **Password confirmation** — Enter the current account password
2. **2FA code** — Enter a valid TOTP code from the registered authenticator app
3. **Email OTP** — Request a one-time passcode sent to the registered email address (available if both password and 2FA fail)

:::info Why Both Password and 2FA Are Listed
The platform prefers password confirmation for speed, but if the user has been away from the computer and their password manager is not available, the 2FA or email OTP paths provide a secure alternative. All three methods satisfy the affirmation requirement.
:::

## Affirmation Outcome

| Outcome | Result |
|---------|--------|
| **Successful** | The attestation session is refreshed; the 30-minute submission window restarts |
| **Failed — wrong password** | An error is shown; up to 3 attempts are permitted before the session is invalidated |
| **Failed — wrong 2FA code** | An error is shown; up to 3 attempts are permitted |
| **Abandoned** | The user closes the dialog or navigates away; the attestation session is terminated and the return reverts to **Draft** |
| **Locked out** | After 3 consecutive failures, the session is invalidated and the user is logged out |

## Session Affirmation and the Audit Trail

Every affirmation event is recorded in the [Attestation Audit Trail](/docs/attestation/audit-trail), including:

- The trigger reason (inactivity, session age, handover, security flag)
- The confirmation method used (password, 2FA, email OTP)
- Whether affirmation succeeded or failed
- The number of attempts made
- The UTC timestamp of each attempt

This provides a full record of who confirmed their identity and when during the attestation session.

## Preventing Unnecessary Affirmations

To avoid interruptions during attestation:

- Keep the browser tab active and complete the attestation within **10 minutes** of answering the Qualifying Screen
- Ensure your authenticator app is accessible before starting the process
- If you are handing over an attestation to a colleague, use the formal [Handover](/docs/attestation/handover) process rather than sharing your session

## Next Steps

- [Handover](/docs/attestation/handover)
- [Standard Declaration Variant](/docs/attestation/variant-standard)
- [Authorized Agent Variant](/docs/attestation/variant-agent)
- [Professional Accountant Variant](/docs/attestation/variant-professional)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
