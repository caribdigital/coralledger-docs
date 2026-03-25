---
sidebar_position: 2
title: Ops Dashboard
description: Platform health, activity, and attention metrics in the CoralLedger Comply Ops Portal
---

# Ops Dashboard

The Ops Dashboard (`/ops`) is the landing page of the Platform Operations Portal. It gives platform administrators an at-a-glance view of platform health, recent activity, and items that need immediate attention.

## Summary Metrics

The top row of the dashboard displays four headline cards:

| Card | Description |
|------|-------------|
| **Total Tenants** | Number of active business tenants on the platform |
| **Active Users (24 h)** | Unique users who have authenticated in the last 24 hours |
| **Pending Attention** | Sum of items in the Attention Required feed |
| **Platform Health** | Overall health indicator (Green / Yellow / Red) |

Platform Health is calculated from a weighted combination of: error rate, deletion backlog age, broken audit-chain entries, and any tenants in a Red health state.

## Health Overview Panel

Below the headline cards, the Health Overview panel shows each monitored subsystem and its current status:

| Subsystem | Healthy When |
|-----------|-------------|
| **Audit Chain** | Zero broken links in the last 24 hours |
| **Deletion Queue** | No requests older than 30 days awaiting approval |
| **Legal Hold Monitor** | No expired holds awaiting renewal |
| **User Lock Queue** | No accounts locked for > 7 days without review |
| **Firm Invitation Queue** | No pending invitations older than 14 days |

Click any subsystem row to navigate directly to the relevant portal section.

## Recent Platform Activity

The Recent Activity feed lists the last 50 `PLATFORM_OPS_*` audit events across all tenants. Each row shows:

- **Timestamp** — UTC time of the event
- **Event Type** — Color-coded `PLATFORM_OPS_` badge
- **Actor** — Platform admin who performed the action
- **Target** — Affected tenant, user, or firm
- **Summary** — Human-readable description

The feed refreshes automatically every 60 seconds. Click any row to open the full audit entry in the [Audit Log Viewer](/docs/ops-portal/audit).

## Attention Required Feed

The Attention Required feed surfaces items that need a platform admin to take action:

| Item Type | Trigger |
|-----------|---------|
| **Deletion Request Expiring** | A 30-day DPA grace period expires within 48 hours |
| **Legal Hold Expired** | A legal hold reached its end date and must be renewed or released |
| **Tenant Health Critical** | A tenant has moved to a Red health state |
| **Audit Chain Break** | A broken audit-chain link has been detected |
| **Locked User > 7 Days** | A user account has been locked for more than 7 days without review |

Each attention item links directly to the relevant record for quick resolution.

## Next Steps

- [Manage tenants](/docs/ops-portal/tenants)
- [Review the audit log](/docs/ops-portal/audit)
- [Process deletion requests](/docs/ops-portal/data-ops)
