---
sidebar_position: 1
title: Audit Trail Overview
description: Immutable audit trail and compliance logging in CoralLedger Comply
---

# Audit Trail

CoralLedger Comply maintains an immutable audit trail of all data modifications, providing full traceability for regulatory compliance and internal accountability.

## Why Audit Trails Matter

The Bahamas VAT Act requires businesses to maintain records for 7 years. CoralLedger Comply's audit trail ensures:
- **Regulatory compliance** — Complete record of all data changes
- **Accountability** — Every action is attributed to a specific user
- **Integrity** — Hash-chain verification prevents tampering
- **Recovery** — Ability to trace and understand any data change

## Key Features

### Immutable Hash-Chain
Each audit entry includes a cryptographic hash of the previous entry, creating an unbreakable chain. Any attempt to modify or delete entries breaks the chain and is immediately detectable.

### WORM Compliance
Write Once Read Many (WORM) compliance ensures that audit entries cannot be modified or deleted after creation. This meets regulatory requirements for tamper-proof record keeping.

### 7-Year Retention
All audit data is retained for a minimum of 7 years, in compliance with VAT Act Section 50.

### Chain Integrity Verification
Administrators can verify the integrity of the entire audit chain at any time, detecting any broken links or tampering attempts.

## What Gets Logged

| Event Category | Examples |
|----------------|----------|
| **Transactions** | Created, modified, deleted, imported |
| **VAT Returns** | Generated, submitted, amended |
| **User Actions** | Login, logout, password change, 2FA events |
| **Settings Changes** | Business profile updates, permission changes |
| **Security Events** | Failed logins, IP blocks, fraud alerts |
| **Client Management** | Client added, modified, deactivated |

## Audit Entry Details

Each audit entry records:
- **Timestamp** — Exact UTC time of the action
- **Event Type** — Category of the action
- **Action** — Specific action performed
- **User** — Who performed the action
- **Details** — Before/after values where applicable
- **Severity** — Normal, Warning, or Critical
- **IP Address** — Source IP of the action

## Accessing the Audit Trail

Navigate to **Reports > Audit Logs** to view the audit trail.

## Next Steps

- [View audit reports](/docs/audit/audit-reports)
- [Security overview](/docs/security)
- [Data retention policy](/docs/billing)
