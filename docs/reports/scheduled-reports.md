---
sidebar_position: 6
title: Scheduled Reports
description: Automate report delivery on a recurring daily, weekly, or monthly schedule
---

# Scheduled Reports

Scheduled Reports let you automate report generation and delivery on a recurring basis — daily, weekly, or monthly — so you always have the latest data in your inbox without manual intervention.

## What Are Scheduled Reports?

A scheduled report is any supported report (Cash Flow, Variance Analysis, Custom Report, VAT Summary) configured to run automatically at a set frequency. Each run generates the report for the relevant period and delivers it via your chosen method.

Schedules are independent of manual report runs — you can still generate reports on demand at any time while a schedule is active.

## Creating a Schedule

Navigate to **Reports > Scheduled Reports**, then click **New Schedule**.

### Step 1 — Choose a Report Type

Select the report to schedule:

| Report | Supported Frequencies |
|--------|----------------------|
| Cash Flow | Daily, Weekly, Monthly |
| Variance Analysis | Weekly, Monthly |
| Custom Report | Daily, Weekly, Monthly |
| VAT Summary | Monthly |

### Step 2 — Configure the Frequency

**Daily** — The report runs every day at a set time (UTC).

**Weekly** — Choose the day of the week (e.g., every Monday at 08:00 UTC).

**Monthly** — Choose the day of the month (e.g., the 1st or the last day). Runs on that day at 08:00 UTC.

### Step 3 — Set the Reporting Period

Each run can cover a rolling window relative to the execution date:

- **Yesterday / Last 7 days / Last 30 days** — rolling windows
- **Current month to date** — from the 1st of the current month to today
- **Previous month** — the full calendar month before the run date
- **Previous quarter** — the full calendar quarter before the run date

### Step 4 — Choose a Delivery Method

Select how the generated report is delivered:

| Method | Details |
|--------|---------|
| **Email** | Delivered as an attachment to one or more email addresses |
| **Download** | A download link is placed in the Schedule History for manual retrieval |
| **Shared Link** | A new share link is generated for each run (see [Delivery Options](#delivery-options)) |

### Step 5 — Select the Output Format

Choose the export format for the report:

- **PDF** — Formatted for sharing and archival
- **CSV** — For spreadsheet import and data analysis
- **Excel** — Formatted spreadsheet with formulas
- **JSON** — For custom integrations

### Step 6 — Name and Save

Give the schedule a descriptive name (e.g., *Monthly VAT Summary — Email to Accountant*), then click **Save Schedule**. The schedule becomes active immediately and will run at its next scheduled time.

## Managing Schedules

View all schedules from **Reports > Scheduled Reports**. The list shows each schedule's name, report type, frequency, last run time, next run time, and status.

### Editing a Schedule

1. Click the schedule name or the **Edit** (pencil) icon
2. Modify any settings — report type, frequency, period, delivery method, or format
3. Click **Save Changes**

Changes take effect on the next scheduled run.

### Pausing a Schedule

To temporarily stop a schedule without deleting it:

1. Click the **⋮** menu next to the schedule
2. Select **Pause**

The schedule status changes to **Paused** and no further runs occur until it is resumed. Click **Resume** to reactivate.

### Deleting a Schedule

1. Click the **⋮** menu next to the schedule
2. Select **Delete**
3. Confirm the deletion

Deleting a schedule does not remove previously generated reports from the Schedule History.

### Viewing Schedule History

Each schedule has a **History** tab listing every run:

| Column | Description |
|--------|-------------|
| Run Date | When the report was generated |
| Period Covered | The reporting period included in that run |
| Status | Succeeded, Failed, or Skipped |
| Delivery | Email sent, download available, or share link generated |
| Actions | Download report or copy share link (where applicable) |

Failed runs display an error message to help diagnose delivery issues (e.g., invalid email address, format error).

## Delivery Options

### Email Delivery

Enter one or more recipient email addresses separated by commas. Each run sends the report as an attachment. The email subject includes the schedule name, report type, and period covered.

### Download Delivery

The generated file is stored securely and listed in the Schedule History. Click **Download** next to any history entry to retrieve the file. Download links expire after 30 days.

### Shared Link Delivery

Each run generates a new [Shared Report](/docs/reports/shared-reports) link. The link is listed in the Schedule History and can be copied and forwarded. You can apply the same security options available for manual share links — password protection, download limits, and expiration date — which are configured once on the schedule and applied to every generated link.

## Relation to Shared Reports

Scheduled Reports with the **Shared Link** delivery method use the same share-link mechanism as [Shared Reports](/docs/reports/shared-reports). Each scheduled run creates a new share token with its own access controls. Recipients receive a unique link per run; previous run links remain accessible until they expire or hit their download limit.

## Limitations

- A maximum of **20 active schedules** per business account
- Delivery via email requires a verified sender domain (configured in **Settings > Notifications**)
- Schedule history is retained for **90 days**
- VAT Summary schedules always use the **previous month** period regardless of the period setting

## Next Steps

- [Shared reports](/docs/reports/shared-reports)
- [Custom report builder](/docs/reports/custom-reports)
- [Reports overview](/docs/reports)
