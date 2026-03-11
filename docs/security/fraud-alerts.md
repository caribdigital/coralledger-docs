---
sidebar_position: 4
title: Fraud Alerts
description: Monitor fraud detection alerts in CoralLedger Comply
---

# Fraud Alerts

CoralLedger Comply's fraud detection system monitors activity in real-time and generates alerts for suspicious behavior.

## Accessing Fraud Alerts

Navigate to **Admin > Fraud Alerts**. This feature requires Administrator access.

## Dashboard Overview

The fraud alerts dashboard displays:
- **Total Alerts** — All detected alerts in the selected time period
- **Critical** — Highest severity alerts requiring immediate attention
- **High Priority** — Important alerts to investigate
- **Blocked Actions** — Actions automatically prevented by the system

## Filtering Alerts

### By Time Period
- Last 1 hour
- Last 6 hours
- Last 24 hours
- Last 72 hours
- Last 7 days

### By Threat Level
- All levels
- Critical only
- High priority
- Medium
- Low

## Alert Details

Each alert includes:
- **Severity** — Critical, High, Medium, or Low (color-coded)
- **Timestamp** — When the alert was generated (with relative time)
- **Threat Type** — Category of detected threat
- **Source IP** — IP address associated with the activity
- **Action Taken** — What the system did in response
- **Details** — Full description of the detected activity

## Auto-Refresh

Enable the auto-refresh toggle to poll for new alerts every 30 seconds. This is useful for active monitoring during security incidents.

## Alert Types

| Type | Description |
|------|-------------|
| **Failed Login Attempts** | Multiple failed logins from same IP |
| **Unusual Transaction Patterns** | Transactions that deviate from normal behavior |
| **Cross-Tenant Access** | Attempts to access another business's data |
| **Rapid Actions** | Unusually high frequency of operations |
| **Statistical Outliers** | Data points significantly outside normal ranges |

## Responding to Alerts

1. Review the alert details and severity
2. Investigate the source IP and associated activity
3. If warranted, [block the IP address](/docs/security/ip-blocking)
4. For critical threats, consider using the [kill switch](/docs/security/kill-switch)
5. Document your response in the alert notes

## Next Steps

- [Block suspicious IPs](/docs/security/ip-blocking)
- [Review audit trail](/docs/audit)
- [Security overview](/docs/security)
