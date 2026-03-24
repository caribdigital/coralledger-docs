---
sidebar_position: 6
title: Impersonation
description: Read-only operator sessions for support and debugging in CoralLedger Comply
---

# Impersonation

Impersonation allows **PlatformAdmin** operators to sign in as any user in a read-only capacity for support and debugging purposes. Because the feature grants broad visibility into user data, it is security-sensitive and subject to strict controls.

## Prerequisites

- Operator must hold the **PlatformAdmin** role
- **Two-factor authentication (2FA)** must be active on the operator's account

## How Impersonation Works

### Starting a Session

1. The operator navigates to the platform admin area and selects the target user.
2. The system creates a short-lived session cookie containing an `impersonated_by` claim that identifies the operator.
3. The browser is signed in under the target user's identity while the original operator cookie is preserved in a separate secure cookie.
4. The session automatically expires after **30 minutes** via cookie expiry.

### Read-Only Enforcement

`ImpersonationReadOnlyMiddleware` intercepts every request during an active impersonation session:

- **Blocked methods**: `POST`, `PUT`, `DELETE`, `PATCH` — any write operation returns **HTTP 403** with a JSON error body.
- **Exempt paths**: Blazor/SignalR infrastructure (`_blazor/*` and hub endpoints) and the impersonation exit endpoint are whitelisted so the UI remains functional and the operator can end the session at any time.

:::warning
Impersonation is strictly read-only. Attempting any write operation while impersonating a user will be blocked and logged.
:::

## Visual Indicator

While an impersonation session is active, a **red banner** is displayed inside the OpsLayout to clearly indicate the read-only state to the operator and any bystander.

## Ending a Session

Click the **Exit Impersonation** button in the red banner or navigate to the designated exit endpoint. The system then:

1. Removes the impersonation cookie.
2. Restores the operator's original session from the preserved secure cookie.

:::note Fail-Safe
If the operator's original cookie cannot be restored, the system signs out entirely to prevent unintended access.
:::

## Audit Trail

Every impersonation event is recorded in the immutable audit log:

| Event | Description |
|-------|-------------|
| `PLATFORM_OPS_IMPERSONATION_START` | Logged when a session begins, recording the operator ID and target user |
| `PLATFORM_OPS_IMPERSONATION_END` | Logged when the session ends, recording the operator ID and target user |

All actions performed during the session are attributed to the operator via the `impersonated_by` claim, ensuring full accountability.

## Security Summary

| Control | Detail |
|---------|--------|
| **Access requirement** | PlatformAdmin role + active 2FA |
| **Session duration** | 30 minutes (cookie expiry) |
| **Write protection** | POST/PUT/DELETE/PATCH blocked; returns 403 JSON |
| **Attribution** | All actions attributed to operator via `impersonated_by` claim |
| **Operator identity** | Preserved in a separate secure cookie; restored on exit |
| **Fail-safe** | Full sign-out if operator cookie restoration fails |
| **Audit events** | `PLATFORM_OPS_IMPERSONATION_START` and `PLATFORM_OPS_IMPERSONATION_END` |

## Next Steps

- [Review the audit trail](/docs/audit)
- [Manage two-factor authentication](/docs/security/two-factor-auth)
- [Security overview](/docs/security)
