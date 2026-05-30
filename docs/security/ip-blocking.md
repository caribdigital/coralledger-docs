---
sidebar_position: 3
title: IP Blocking
description: Manage IP address blocking in CoralLedger Comply
---

# IP Blocking

IP blocking prevents access from specific IP addresses identified by an Administrator as suspicious or hostile. Blocks operate at the middleware layer — once an IP is blocked, every request from that address is rejected before reaching application logic, not only login attempts.

## Accessing IP Blocking

Navigate to **Admin > IP Blocking** (route: `/admin/ip-blocking`). This feature requires Administrator access with 2FA enabled.

## How It Works

Administrators manually add IPs to the block list — for example after a [Fraud Alert](/docs/security/fraud-alerts) surfaces suspicious activity from a specific address. There is no automatic IP-block on repeated failed logins today; the operator triages alerts and decides whether to block. Blocks are cached for 30 seconds at the middleware layer for performance.

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
