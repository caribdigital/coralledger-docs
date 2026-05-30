---
sidebar_position: 4
title: Dashboard Tour
description: Where /dashboard routes you, what the Client Dashboard renders, and how to navigate the app
---

# Dashboard Tour

When you log in to CoralLedger Comply you land at `/dashboard`. This page is a **router** — it inspects your account context and redirects you to the actual dashboard for your role:

| Your context | You land at |
|---|---|
| Single business (self-filing) or client view | **Client Dashboard** at `/client` |
| Accounting firm without a self-filing business | **Firm Portal** at `/firm/portal` — see [Firm Portal](/docs/firm-portal/) |
| No business context | Setup-required page at `/Account/BusinessSetupRequired` — see [Set Up Your Business](/docs/getting-started/setup-business) |

This page covers the **Client Dashboard** (`/client`) — the canonical landing for individual business users.

## The Client Dashboard

The Client Dashboard is a live overview of your current period's VAT position, your compliance health, and the actions most likely to be useful next. The page updates in real time over a SignalR connection to `/dashboardHub`, so changes (transaction imports, compliance score moves, alerts) reflect without you needing to refresh.

The page renders the following components, in this order:

### 1. Compliance Weather

A large card at the top of the page showing your overall **compliance score** as a letter grade (A+ through F) with a weather-style metaphor — sunny for a clean A, cloudy for compliance issues to attend to, stormy for blocking problems. The grade rolls up data-quality, timeliness, accuracy, and completeness signals.

### 2. Tide Timer

A countdown to your **next filing deadline**, prominently displayed. The deadline accounts for your filing frequency (Monthly or Quarterly) plus the 21-day standard (or 14-day Large Taxpayer) window per the VAT Act.

### 3. Compliance Alert Bar

A horizontal bar showing **status / deadline / Net VAT Payable** at a glance. Click through any of the three for the underlying detail surface.

### 4. Quick Actions

Four large action cards for the most common next steps:

| Action | Goes to | When to use |
|---|---|---|
| **Import Data** | CSV import / connectors | Bringing in transactions for the period |
| **Review** | Data Quality surface | Reviewing categorisation suggestions, fixing issues |
| **Prepare Return** | VAT Returns | Generating the return for the current period |
| **Pay** | Payment surface | Recording payment back into Comply after lodgement |

These are the same four named actions the app renders — not generic "Import / Enter / Generate / Alerts".

### 5. VAT Summary Metric Card

A compact card with the period's headline figures: **Sales**, **VAT Out**, **Purchases**, **VAT In**, **Net Due**. Updates live as transactions are imported.

### 6. Network Graph (VAT-Flow Visualisation)

A larger card (1000×400) showing the flow of VAT for the current period as a network diagram — sales contributing to Output VAT, purchases contributing to Input VAT, the net position. Useful for spotting outliers visually.

### 7. Current Period Summary + Data Health

Two paired smaller cards:

- **Current Period Summary** — totals by VAT category (Standard / Reduced / Zero-Rated / Exempt)
- **Data Health Indicator** — share of transactions with complete metadata vs flagged ones

### 8. Conditional: Tax Recovery + Bad Debt Relief

If your business has activity that qualifies for tax-recovery treatment or bad-debt-relief adjustments under the VAT Act, additional cards appear here. They are conditional — businesses without qualifying activity won't see them.

See [Bad Debt Relief](/docs/compliance/bad-debt-relief) for the bad-debt-relief workflow.

### 9. Recent Activity Feed

A vertical feed of recent actions on the business — transactions imported, categories applied, returns generated, settings changes. Time-ordered, newest first.

### 10. Recent Transactions

A table at the bottom of the dashboard showing the most recent 6 transactions with their ID, Date, Type, Amount, VAT, and Status. Click any row to open the transaction.

## Real-time updates

The dashboard maintains a SignalR connection to `/dashboardHub`. Updates pushed to the connection include:

- Compliance score recalculations after categorisation changes
- New transactions imported by team members
- Status changes on returns (e.g. Awaiting Lodgement → Lodged)
- Compliance alerts firing or clearing

You don't need to refresh — these surface live as they happen.

## Navigation

### Sidebar menu

Your sidebar typically includes:

- **Dashboard** — the router that brought you here
- **Transactions** — view, enter, and manage transactions
- **VAT Returns** — generate, view, and submit returns
- **Compliance** — intelligence dashboard, anomaly detection, scoring
- **Reports** — cash flow, variance analysis, custom reports
- **Firm Portal** — multi-client management (firm accounts only)
- **Audit Trail** — immutable history of activity
- **Settings** — account, business, appearance, integrations
- **Help** — in-app help links

What you see varies with your role and granular permissions.

### Top bar

- **Business Switcher** — switch between client businesses (visible if you have access to multiple)
- **Notifications** — bell icon with unread count
- **Account Menu** — profile, settings, logout

### Business Switcher

If you manage multiple businesses (e.g. you are a firm staff member with access to several clients), click the business name in the top bar to switch context. Every dashboard, list, and report below the top bar reflects the selected business.

For the firm-administrator view of the same access model, see [How Firm-to-Client Access Works](/docs/firm-portal/firm-client-access).

## What you see after first login depends on your account type

| Account type | Lands at |
|---|---|
| New Business | Client Dashboard (`/client`) — described on this page |
| Accounting Firm | Firm Portal (`/firm/portal`) — see [Firm Portal](/docs/firm-portal/) |
| Join Existing | Whichever dashboard is canonical for the business you joined |

## Next steps

- [Import your transactions](/docs/transactions/import-csv) — feed the dashboard with data
- [Understand VAT categories](/docs/transactions/categorization)
- [View your compliance score](/docs/compliance/compliance-score)
- [Firm Portal](/docs/firm-portal/) — if you are an accounting firm
