---
sidebar_position: 6
title: Firm Analytics
description: Cross-client analytics and per-staff productivity metrics surfaced by the Multi-Client Report and Staff Productivity dashboards
---

# Firm Analytics

CoralLedger Comply exposes firm-level analytics through two dedicated pages and a set of aggregate KPI cards on the Firm Portal landing.

| Surface | Route | What it covers |
|---|---|---|
| Firm Portal landing | `/firm`, `/firm/portal`, `/firm/portfolio` | Real-time KPI cards aggregated across your active client set |
| Multi-Client Report | `/firm/reports` | Date-range filtered cross-client compliance summary with CSV export |
| Staff Productivity | `/firm/productivity` | Per-staff workload, time tracking, and ROI Calculator |

Each surface respects the [firm-to-client access traversal](/docs/firm-portal/firm-client-access) — you only see aggregates over clients you have access to.

## The landing-page KPI cards

The seven KPI cards on the [Firm Portal landing](/docs/firm-portal/#the-dashboard-at-a-glance) — Total Clients, Pending Filings, Pending Re-attestations, Compliance Score, Portfolio Net VAT, Returns Filed This Quarter, and Next Deadline — are the firm-wide at-a-glance view. They refresh on every page load and reflect the current state of your active client set.

For deeper trend analysis and date-range reporting, use the Multi-Client Report surface described below.

## Multi-Client Report (`/firm/reports`)

The Multi-Client Report consolidates cross-client compliance and aggregate VAT data into a single date-range filtered view.

### Controls

- **Report Period** — date range picker (defaults to the current quarter; configurable for any range)
- **Generate Report** — triggers the aggregation across your accessible clients
- **Export CSV** — download the per-client rollup as CSV

### What the report shows

Once generated, the dashboard renders:

- **Firm Analytics Dashboard header** — top-of-page summary banner
- **KPI cards row** — Total Clients, Total Transactions, Total VAT Managed, Average Compliance Score across the selected period
- **Compliance Distribution** — per-grade client counts (A+ through F)
- **Per-client rollup table** — one row per client business showing transaction count, net VAT, compliance score, and last activity

The data is backed by `IFirmAnalyticsService` and rendered server-side. It honors the same access boundary as the Firm Portal landing.

### Export formats

Today the Multi-Client Report exports as **CSV** only. PDF and Excel exports are not currently exposed from this surface — for PDF/Excel of an individual return, use the per-return artefact downloads from the [Filing Wizard](/docs/vat-returns/filing-wizard) or the read-only View Filed Return page.

## Staff Productivity (`/firm/productivity`)

The Staff Productivity dashboard covers per-staff metrics and workload distribution.

### Workload distribution

A grid showing each firm staff member alongside their assigned client count, transaction volume, and average compliance score across their assigned clients. The grid reads from the `ClientAssignment` entity (workload assignment is distinct from access — see [How Firm-to-Client Access Works](/docs/firm-portal/firm-client-access)).

### ROI Calculator

An interactive section that estimates the value Comply delivers based on staff inputs:
- Hours per filing without Comply vs with Comply (per-staff or per-firm aggregates)
- Error-reduction percentage
- Client-retention impact

The calculator is informational — its outputs are not persisted to any audit-ledger entry or report. Use it as a conversation aid for client demos and renewal discussions.

### Pending Re-attestations workload signal

The Staff Productivity surface also indicates per-staff outstanding §32 re-attestations. This bridges the workload view back to the [§32 Attestation Entry Pathway](/docs/firm-portal/attestation-entry-pathway) — a staff member with high pending re-attestation count needs that flow run for each affected client.

## Industry benchmarks

CoralLedger seeds **industry benchmark** reference data (sourced from anonymised cross-tenant aggregates and external industry classifications). The benchmarks surface alongside per-client compliance scores so a practitioner can contextualise whether a B+ score is above or below industry norm for that vertical.

The benchmark seed runs at platform initialisation; firms do not need to upload or maintain it. Benchmarks update as the underlying classifications are revised by the CoralLedger compliance team.

## Multi-tenant safety

Every analytic surface reads through the same access boundary as the rest of the Firm Portal — the [firm-to-client access traversal](/docs/firm-portal/firm-client-access) limits aggregations to clients your account has access to, and the underlying queries are `BusinessId`-scoped per the project's mandatory multi-tenant rule.

This means: the Compliance Distribution table on your dashboard reflects your firm's client set, not platform-wide statistics. Industry benchmarks (anonymised, aggregated) are the only data drawn from beyond your firm's boundary.

## What this page does NOT cover

- **A public analytics API.** There is no `api/firm/analytics/*` REST surface today. The `IFirmAnalyticsService` is internal to the Comply web app. If a firm requires programmatic access, raise that as a feature request — it is not yet built.
- **Custom alert thresholds.** Per-firm configurable thresholds for compliance score drops, transaction volume anomalies, or VAT liability spikes are not surfaced today as a configuration panel. The Firm Portal landing renders some alerts automatically based on built-in heuristics (e.g. overdue deadlines).
- **Per-client side-by-side comparison reports.** The Multi-Client Report aggregates per-client rows but does not render a side-by-side comparison view today. Use CSV export and an external spreadsheet for that.

## Next steps

- [Firm Portal landing](/docs/firm-portal/) — the real-time KPI cards and quick actions
- [How Firm-to-Client Access Works](/docs/firm-portal/firm-client-access) — the access boundary every analytic surface respects
- [Batch Filing](/docs/firm-portal/batch-filing) — the place to act on what the analytics surface
- [User Management](/docs/firm-portal/user-management) — assigning clients to staff (the workload distribution upstream of Staff Productivity)
