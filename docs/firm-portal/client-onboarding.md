---
sidebar_position: 3
title: Client Onboarding
description: The six-section wizard for adding a new client business to the firm — Owner-only, with explicit framing of what onboarding does and does not do
---

# Client Onboarding

Client Onboarding is the firm-side wizard at `/firm/clients/onboard` that creates a new client business under the firm's management. You reach it from the **Add Client** quick action on the [Firm Portal](/docs/firm-portal/) landing or from the **Add Client** button on the Clients grid.

The wizard takes a few minutes per client and runs through six structured sections. The single most important framing point is at the bottom of this page: **onboarding does not create a §32 attestation** — for restricted-segment clients, that is a separate subsequent step.

## Who can onboard a client

Onboarding is gated to **firm Owners only**. The check runs against the firm's `UserBusinessAccess` row for the current user; either `PermissionLevel == "Owner"` or `Role == "Owner"` is sufficient.

Non-Owner staff who navigate to `/firm/clients/onboard` see:

> Only firm owners can onboard new clients.

A separate check runs against the firm's subscription tier. If the firm has reached its maximum-clients limit (25 for Founding Member and Accounting Firm tiers; unlimited for Enterprise), the wizard refuses to proceed and surfaces an upgrade prompt.

## The six sections

The wizard walks through these sections in order. Each section's required fields must be valid before you can advance.

### 1. Business identification

- **Business name** — required; how the client will appear in your firm grid
- **Trading name** — optional; surfaced on outputs that show DBA / trading style
- **TIN** — required; 9 digits, **MOD-11 validated** server-side via `OnboardingService.ValidateTINAsync`. An invalid TIN is rejected at this step
- **Industry category** — required; selects from a controlled list. Some categories (food-related) enable the conditional Food Store License section in step 6.

### 2. VAT configuration

- **VAT number** — required for registered businesses
- **VAT registration date** — required; cross-field paired with the VAT number (must be a real registration date, not a placeholder)
- **Annual turnover** — required; the value auto-computes the **filing frequency** via `FilingFrequencyHelper`: turnover ≥ $5M assigns **Monthly** filing, otherwise **Quarterly**. The auto-computed value is shown to you before commit.
- **Fiscal year end** — required; drives period generation in step 6 of the post-submit flow.

### 3. Contact + Billing contact

- **Primary contact name, email, phone**
- **Billing contact** — defaults to primary contact; can be set independently

### 4. Address

- **Address line 1**, **Address line 2** (optional)
- **Island** — selects from the `BahamasIsland` enum (New Providence, Grand Bahama, Abaco, etc.)
- **PO Box** (optional)

### 5. Engagement

- **Engagement start date**
- **Engagement type** — `FullService` / `FilingOnly` / `AdvisoryOnly`. This is a firm-internal classification that does not affect Comply's filing behaviour but is surfaced on workload reports

### 6. Food Store Licence (conditional)

This section appears only if the industry category in section 1 was food-related.

- **Licence number**
- **Expiry date**

The licence is referenced by the VAT rate engine when the client posts transactions: certain reduced-rate categories require an active food-store licence at the transaction date. See [VAT Rates Reference](/docs/reference/vat-rates) for the rate engine's licence-fallback behaviour.

## What happens after submit

When you click **Add Client** at the end of the wizard, `ClientOnboardingService.OnboardClientAsync` runs inside a single EF execution-strategy transaction:

1. A new `Business` row is created with `ManagingOrgId = your firm's id`, `Status = "Active"`, `IsActive = true`. This is what makes the new client appear in your Firm Portal grid via the [firm-to-client access traversal](/docs/firm-portal/firm-client-access).
2. `UserBusinessAccess` rows are granted to every firm-business owner with `PermissionLevel = "Owner"` and `Role = "Owner"`. This ensures Owner-level staff can immediately work on the new client without separate per-user grants.
3. The transaction commits.
4. **After commit**, `FilingPeriodService.GeneratePeriodsForBusinessAsync(yearsAhead: 2)` runs — Comply pre-creates two years of filing periods (monthly or quarterly per the assigned frequency) so the client's filing calendar is populated.
5. A `BusinessCreated` audit event is written best-effort (try/catch). A ledger-write failure does not roll back the client creation — the persisted business is the source of truth; the ledger entry is the audit-trail evidence.

You return to the Firm Portal landing with the new client visible in the grid.

## What onboarding does NOT do

Two regulatory-clarity points that catch every new firm onboarding a §3 restricted-segment client for the first time:

### Onboarding does NOT create a §32 attestation

The wizard creates the `Business` row and the access grants — that's it. No `Attestation` row is persisted. For a non-restricted-segment client this is sufficient: the per-return [Signatory Capacity Declaration](/docs/vat-returns/filing-wizard#step-4-approval-signatory-capture) at filing time satisfies §32 on its own.

For a **§3 restricted-segment client**, you must subsequently run the §32 Attestation Entry Pathway (Wave 2.2 deliverable — `attestation-entry-pathway`) from the client's record before any return can be lodged. The Firm Portal landing's [`Pending Re-attestations` KPI card](/docs/firm-portal/#the-dashboard-at-a-glance) surfaces this requirement; new clients in restricted segments appear there immediately after onboarding.

### Onboarding does NOT send a client invitation

The wizard creates the client business under your firm's management; it does not send an invitation email to the client's owner or staff to log in to Comply themselves. To grant the client direct access to their own business, use the separate **Invite Client** flow on the Clients grid — see [Client Invitation Lifecycle](/docs/firm-portal/user-management#client-invitation-lifecycle).

## Bulk import — for large client books

For firms migrating an existing book of clients into Comply, the **Bulk Client Import** flow at `/firm/clients/bulk-import` accepts a CSV file with the same fields as the wizard, validated row-by-row before any row commits. The Bulk Client Import surface is the CSV-driven analog to this wizard and runs through the same `ClientOnboardingService` per row.

## Next steps

- [How Firm-to-Client Access Works](/docs/firm-portal/firm-client-access) — why your newly-onboarded client appears in your grid
- [Firm Portal](/docs/firm-portal/) — landing page + dashboard
- [User Management](/docs/firm-portal/user-management) — granting access to additional firm staff + client-side invitations
- [Filing Wizard](/docs/vat-returns/filing-wizard) — what happens at filing time for non-restricted-segment clients
