---
sidebar_position: 3
title: Notification Settings
description: Configure your email and in-app notification preferences
---

# Notification Settings

Stay informed about your VAT compliance without being overwhelmed. Configure exactly what notifications you receive and when.

## Accessing Notification Settings

Navigate to **Settings > Notifications** from the main menu.

## Email Notifications

### Filing Reminders

| Reminder | Timing | Default |
|----------|--------|---------|
| Filing deadline approaching | 7 days before | On |
| Filing deadline approaching | 3 days before | On |
| Filing deadline approaching | 1 day before | On |
| Return filed confirmation | Immediately | On |
| Payment due reminder | 3 days before | On |

### Compliance Alerts

| Alert | Trigger | Default |
|-------|---------|---------|
| Score dropped | Grade decreases | On |
| New anomaly detected | High severity | On |
| Validation errors | Blocking errors found | On |
| Data quality issues | Score below threshold | Off |

### Transaction Notifications

| Notification | Trigger | Default |
|--------------|---------|---------|
| Import completed | Batch import finishes | On |
| Sync completed | Point POS sync finishes | Off |
| Categorization needed | Uncategorized transactions | On |
| Large transaction | Above threshold | On |

### Security Alerts

| Alert | Trigger | Default |
|-------|---------|---------|
| New login detected | New device/location | On |
| Password changed | Password updated | On |
| 2FA changes | 2FA enabled/disabled | On |
| Failed login attempts | Multiple failures | On |

### Weekly Digest

Receive a weekly summary including:
- Transaction summary
- Compliance score trend
- Upcoming deadlines
- Action items

**Schedule:** Sent Monday mornings at 9 AM (your timezone)

## In-App Notifications

Control notifications that appear in the dashboard notification center.

### Real-Time Alerts
- New transactions synced
- Categorization suggestions
- System maintenance notices
- Feature announcements

### Team Activity (Firm Portal)
- Client added/removed
- Returns filed by team members
- Comments and mentions
- Assignment changes

## Quiet Hours

Silence non-urgent notifications during specific times.

### Configuration

1. Enable Quiet Hours toggle
2. Set Start Time (e.g., 6:00 PM)
3. Set End Time (e.g., 8:00 AM)
4. Select Days (e.g., every day, weekends only)

### What's Affected
- All non-critical email notifications are held
- Critical security alerts still sent immediately
- Filing deadline reminders on due date still sent
- Notifications delivered after quiet hours end

### What's Not Affected
- Critical security alerts (always immediate)
- Final deadline reminders (day-of)
- System outage notifications

## Notification Channels

### Primary Email
Your account email receives all notifications unless specified otherwise.

### Secondary Email
Add a backup email for:
- Critical compliance alerts
- Security notifications
- Billing communications

### Mobile (Coming Soon)
Push notifications for the CoralLedger mobile app:
- Real-time alerts
- Quick actions
- Deadline reminders

## Managing Notification Overload

### Recommended Settings for Busy Users

1. **Enable weekly digest** - Get a summary instead of individual emails
2. **Turn off sync notifications** - If you sync frequently
3. **Set quiet hours** - Protect personal time
4. **Enable only high-severity anomalies** - Reduce noise

### Recommended Settings for Compliance Focus

1. **Enable all deadline reminders** - Never miss a deadline
2. **Enable all anomaly alerts** - Catch issues early
3. **Enable score change alerts** - Track compliance health
4. **Enable validation errors** - Fix issues promptly

## Unsubscribe Options

### Individual Emails
Each email includes an unsubscribe link for that notification type.

### Bulk Management
Use this settings page to manage all notification preferences at once.

### Mandatory Notifications
Some notifications cannot be disabled:
- Critical security alerts
- Legal/regulatory communications
- Billing and subscription changes

## Next Steps

- [Configure account settings](/docs/settings/account)
- [Set up your business profile](/docs/getting-started/setup-business)
