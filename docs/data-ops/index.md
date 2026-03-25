---
sidebar_position: 1
title: Data Operations Overview
description: Data lifecycle management in CoralLedger Comply
---

# Data Operations

CoralLedger Comply gives operators full control over the data lifecycle — from user-initiated deletion requests and legal holds through to automated retention enforcement and full business data export.

## Features

### Deletion Requests
Users may submit a request to have their data permanently deleted. Operators review each request and either approve or reject it. Approved requests follow a 30-day Data Protection Act (DPA) grace period before irreversible execution, and a typed confirmation is required at the point of execution.

[Learn more about deletion requests](/docs/data-ops/deletion-requests)

### Legal Holds
Files and tombstone records can be placed under a legal hold to prevent deletion or modification during litigation or regulatory investigations. Every hold placement and release is recorded in the audit trail.

[Learn more about legal holds](/docs/data-ops/legal-holds)

### Retention Monitoring
Per-business retention policies are enforced automatically. The system defaults to the 7-year minimum required by the VAT Act (s. 26). Operators can preview enforcement and review detected policy violations before taking action.

[Learn more about retention monitoring](/docs/data-ops/retention-monitoring)

### Business Data Export
Operators can export a complete JSON snapshot of all data belonging to a business. This includes transactions, returns, audit logs, and settings.

[Learn more about business data export](/docs/data-ops/data-export)

## Access Requirements

All Data Operations features are accessible only to users with the **PlatformAdmin** role. Standard business users can submit deletion requests but cannot approve, execute, or configure any data operations.

| Feature | Minimum Role |
|---------|-------------|
| Submit deletion request | Any authenticated user |
| Approve / reject deletion request | PlatformAdmin |
| Execute approved deletion | PlatformAdmin |
| Place / release legal hold | PlatformAdmin |
| Configure retention policies | PlatformAdmin |
| Preview & enforce retention | PlatformAdmin |
| Export business data | PlatformAdmin |

## Next Steps

- [Deletion requests](/docs/data-ops/deletion-requests)
- [Legal holds](/docs/data-ops/legal-holds)
- [Retention monitoring](/docs/data-ops/retention-monitoring)
- [Business data export](/docs/data-ops/data-export)
- [Audit trail](/docs/audit)
