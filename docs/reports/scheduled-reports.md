---
sidebar_position: 6
title: Scheduled Reports
description: Schedule recurring report generation with email delivery
---

# Scheduled Reports

Scheduled Reports run a report on a recurring cadence and email the result to your chosen recipients, so regular reporting happens without a manual step.

## What Are Scheduled Reports?

A scheduled report is one of the supported report types configured to run at a set frequency:

| Report Type | What it covers |
|-------------|----------------|
| **VAT Summary** | Output, input, and net VAT for the period |
| **Transaction Export** | The period's transaction data in your chosen format |
| **Cash Flow** | VAT-aware cash-flow view for the period |

Schedules are independent of manual report runs — you can still generate reports on demand at any time while a schedule is active.

## Creating a Schedule

Navigate to **Settings > Report Scheduling**, then click **New Schedule**.

1. **Choose a report type** — VAT Summary, Transaction Export, or Cash Flow
2. **Set the frequency** — Daily, Weekly, Monthly, or Quarterly
3. **Select the output format** — PDF, Excel, CSV, or JSON
4. **Enter recipient email addresses** — one or more, separated by commas
5. **Save** — the schedule becomes active and shows its next run time

## Managing Schedules

The schedule list shows each schedule's report type, next run, last run status, and an active/paused toggle:

- **Active toggle** — switch a schedule off to pause it without deleting it; switch it back on to resume
- **Run Now** — trigger an immediate run of an active schedule
- **Edit** — change the type, frequency, format, or recipients; changes apply from the next run
- **Delete** — remove the schedule

Each run's outcome appears in the **Last Status** column; a failed run shows the failure state so you can correct the configuration (for example, an invalid recipient address).

## Delivery

Delivery is by **email**: each run sends the generated report as an attachment to the configured recipients.

:::note Schedule events vs immutable audit ledger
Schedule lifecycle events and per-run outcomes are recorded on the schedule surface itself, separate from Comply's [immutable audit ledger](/docs/audit/). The two surfaces are tracked together as a Comply repo follow-up so that recurring-report activity is traceable from the same audit trail as filings and lodgements.
:::

## Next Steps

- [Shared reports](/docs/reports/shared-reports)
- [Custom report builder](/docs/reports/custom-reports)
- [Reports overview](/docs/reports)
