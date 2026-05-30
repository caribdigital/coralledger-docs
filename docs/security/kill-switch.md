---
sidebar_position: 5
title: Kill Switch
description: Emergency fraud detection control in CoralLedger Comply
---

# Kill Switch

The kill switch is an emergency control for administrators to immediately disable the **fraud detection** subsystem during security incidents, high-false-positive periods, or maintenance.

:::warning Scope is fraud detection only
The kill switch toggles the **fraud detection engine** (`KillSwitchScopes.FraudDetection`). It does **not**:

- Disable the platform as a whole (there is no platform-wide kill switch)
- Lock individual user accounts (those are managed through `PLATFORM_OPS_USER_LOCKED` actions on the Users admin page, not from this surface)
- Stop authentication, billing, or any other subsystem

If you need to lock specific accounts during an incident, use the **Ops Portal → Users** admin page and lock the affected accounts there. The kill switch itself is narrowly scoped.
:::

## Accessing the Kill Switch

Navigate to **Admin > Kill Switch** (route: `/admin/kill-switch`). This page requires Administrator access with 2FA enabled.

:::info Ops Portal access
PlatformAdmin operators can also reach kill-switch state through Ops Portal surfaces. All Ops Portal actions require the `RequirePlatformAdmin` policy (role + completed 2FA challenge) and are recorded in the platform-level audit log.

See [Security Overview](/docs/security/) for details on the PlatformAdmin role and self-operation guards.
:::

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
- System reverts after the duration expires

## Activation History

A timeline of all kill switch events is displayed, showing:
- Activation and deactivation timestamps
- Reasons provided
- Who performed each action

## Next Steps

- [View fraud alerts](/docs/security/fraud-alerts)
- [Review IP blocking](/docs/security/ip-blocking)
- [Security overview](/docs/security)
