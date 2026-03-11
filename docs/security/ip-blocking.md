---
sidebar_position: 3
title: IP Blocking
description: Manage IP address blocking in CoralLedger Comply
---

# IP Blocking

IP blocking prevents unauthorized access attempts by blocking suspicious IP addresses after repeated failed login attempts.

## Accessing IP Blocking

Navigate to **Admin > IP Blocking**. This feature requires Administrator access with 2FA enabled.

## How It Works

When multiple failed login attempts are detected from the same IP address, the system automatically blocks that IP. Administrators can also manually block IPs.

## Blocking an IP Address

1. Go to **Admin > IP Blocking**
2. Click **Block New IP**
3. Enter the details:
   - **IP Address** — The IP to block
   - **Reason** — Why this IP is being blocked
   - **Expiration** — Optional expiration date and time (leave empty for permanent block)
   - **Notes** — Additional context
4. Click **Block**

## Viewing Blocked IPs

The IP blocking dashboard shows:
- **Active blocks** — Currently blocked IPs
- **Expired blocks** — Previously blocked IPs whose block period has ended
- **Statistics** — Active count, expired count, total blocked attempts, permanent blocks

## Unblocking an IP

1. Find the active block in the list
2. Click **Unblock**
3. The IP is immediately removed from the block list

## Statistics

The dashboard displays key metrics:
- **Active** — Number of currently blocked IPs
- **Expired** — Blocks that have expired
- **Total Blocked Attempts** — Cumulative login attempts prevented
- **Permanent Blocks** — IPs blocked indefinitely

## Next Steps

- [View fraud alerts](/docs/security/fraud-alerts)
- [Review audit trail](/docs/audit)
- [Security overview](/docs/security)
