---
sidebar_position: 1
title: Security Overview
description: Security features in CoralLedger Comply
---

# Security & Access Control

CoralLedger Comply implements multiple layers of security to protect your financial data and ensure regulatory compliance.

## Authentication

### Two-Factor Authentication (2FA)
All users are required to set up 2FA on first login. This adds a second verification step using an authenticator app.

- **Required for**: All users, all sensitive operations
- **Supported apps**: Google Authenticator, Microsoft Authenticator, Authy, 1Password
- **Backup codes**: Generated during setup for emergency access

[Learn more about 2FA setup](/docs/security/two-factor-auth)

### Password Security
- Minimum 8 characters with complexity requirements (uppercase, lowercase, number, special character)
- PBKDF2 hashing with industry-standard iterations
- Password change history tracked

### Session Management
- Secure cookie-based authentication
- Session timeout for inactive users
- View and revoke active sessions from Account Settings
- Login history with IP address and device tracking

## Threat Protection

### IP Blocking
Automatically blocks IP addresses after repeated failed login attempts. Administrators can manually block suspicious IPs.

[Learn more about IP blocking](/docs/security/ip-blocking)

### Fraud Detection
Real-time monitoring flags suspicious activity including:
- Unusual transaction patterns
- Statistical outliers
- Rapid repeated actions
- Cross-tenant access attempts

[Learn more about fraud alerts](/docs/security/fraud-alerts)

### Kill Switch
Emergency control to immediately disable fraud detection or lock down specific accounts during security incidents.

[Learn more about kill switch](/docs/security/kill-switch)

## Data Protection

### Multi-Tenant Isolation
Every database query is filtered by Business ID at query execution time, ensuring complete data isolation between businesses. Cross-tenant access is prevented at the application and database level.

The EF Core global query filter re-evaluates the current `BusinessId` on every query, so switching tenants mid-session — including via the `?bid=` query parameter in Blazor Server — takes effect immediately without requiring a page reload or new database connection.

[Learn more about the tenant filter architecture](/docs/security/tenant-isolation)

### Audit Trail
All data modifications are recorded in an immutable, hash-chain verified audit log. See [Audit Trail](/docs/audit) for details.

### Data Retention
- Active accounts: Unlimited retention
- Closed accounts: 7-year retention per VAT Act Section 50
- WORM (Write Once Read Many) compliance for audit entries

### Encryption
- TLS 1.2+ for all data in transit
- Database-level encryption for data at rest
- Secure cookie flags (HttpOnly, Secure, SameSite)

## Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **Owner** | Full access to all features and settings |
| **Accountant** | Manage transactions, returns, and reports |
| **User** | View-only access to data and reports |

Granular permissions can be configured per user for: Transactions, Reports, Compliance, Settings, User Management, and Security.

## Best Practices

1. **Enable 2FA immediately** — Required for all users
2. **Use strong, unique passwords** — Don't reuse passwords from other services
3. **Review login history regularly** — Check for unrecognized access
4. **Limit user permissions** — Grant only the access each team member needs
5. **Monitor fraud alerts** — Act on security notifications promptly

## Next Steps

- [Set up 2FA](/docs/security/two-factor-auth)
- [Configure IP blocking](/docs/security/ip-blocking)
- [Review audit trail](/docs/audit)
- [Manage users](/docs/firm-portal/user-management)
