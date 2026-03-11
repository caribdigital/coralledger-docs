---
sidebar_position: 5
title: Kill Switch
description: Emergency fraud detection control in CoralLedger Comply
---

# Kill Switch

The kill switch is an emergency control for administrators to immediately disable or override the fraud detection system during security incidents or maintenance.

## Accessing the Kill Switch

Navigate to **Admin > Kill Switch**. This feature requires Administrator access with 2FA enabled.

## Status Display

The kill switch dashboard shows:
- **Current state** — Active or Inactive
- **Circuit breaker status** — System health indicator
- **Consecutive failures** — Count of sequential fraud detection failures
- **False positive count** — Incorrect fraud detections
- **Total activations** — Historical activation count

## Activating the Kill Switch

When the fraud detection system needs to be disabled:

1. Click **Activate Kill Switch**
2. Select a reason:
   - Manual activation
   - High false positive rate
   - System failure
   - Security threat
   - Maintenance
3. Confirm the activation

:::warning
Activating the kill switch disables fraud detection. Only use in genuine emergencies.
:::

## Deactivating the Kill Switch

1. Click **Deactivate Kill Switch**
2. Enter a reason for deactivation
3. Fraud detection resumes immediately

## Emergency Override

Super administrators can perform an emergency override:
- Enter override reason
- Set duration (1-60 minutes)
- System automatically reverts after the duration expires

## Activation History

A timeline of all kill switch events is displayed, showing:
- Activation and deactivation timestamps
- Reasons provided
- Who performed each action

## Next Steps

- [View fraud alerts](/docs/security/fraud-alerts)
- [Review IP blocking](/docs/security/ip-blocking)
- [Security overview](/docs/security)
