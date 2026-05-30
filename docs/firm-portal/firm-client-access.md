---
sidebar_position: 2
title: How Firm-to-Client Access Works
description: The access traversal model that determines which clients a firm user can see and act on
---

# How Firm-to-Client Access Works

When you sign in to the Firm Portal you see a grid of client businesses. This page explains the model behind which businesses appear in your grid — and why some clients you might expect to see may not be visible.

The model matters because it is the foundation that every other Firm Portal capability builds on: client search, batch filing, reassignment, analytics, and the §32 attestation gates all read from the same access set.

## The two ways you have access to a client

CoralLedger Comply resolves your client list from two independent inputs:

1. **Direct access** — you have a `UserBusinessAccess` row pointing at the client business. This is the explicit grant created when, for example, a client invites you to manage their books.
2. **Firm self-business access** — you have access to your firm's "self-business" (the house account that represents the firm itself in Comply), and that firm self-business shares a `ManagingOrgId` with the client.

The portal computes the union of both sets. A client appears in your grid if either path resolves to it.

## The `ManagingOrgId` contract

Every business in Comply has a `ManagingOrgId`. For a firm self-business and the firm's client businesses, the `ManagingOrgId` is the same. This is what links a firm to its clients without requiring an explicit grant on every client.

| Business type | `ManagingOrgId` |
|---|---|
| Firm self-business (the house account) | The firm's own organisation id |
| Each client business managed by that firm | Same as the firm self-business |
| A standalone business with no firm | Its own organisation id (or null, depending on provisioning) |

So when you have access to a firm self-business — by being on the firm's staff with a `UserBusinessAccess` row pointing at it — you implicitly gain visibility of every active client that shares its `ManagingOrgId`.

## Walking the resolution

When the Firm Portal loads your client grid:

1. Comply looks up the `UserBusinessAccess` rows where `UserId == you`.
2. From that set, it identifies any rows where the linked business has `IsFirmSelfBusiness = true` and `IsActive = true`.
3. It collects those firm self-businesses' `ManagingOrgId` values.
4. It pulls every active business whose `ManagingOrgId` is in that set — these are the "linked clients."
5. It returns the union of (direct access businesses) ∪ (linked clients), restricted to active businesses, with their managing-org context for display.

The same traversal runs on every per-business access check (e.g. "is this user allowed to open client X?"). Direct grants are checked first; if absent, the firm self-business traversal runs.

## What this means in practice

### When you're added to a firm

A firm administrator grants you `UserBusinessAccess` to the firm self-business. From the next time you load the portal, every active client of that firm appears in your grid — no per-client grant required.

### When you're removed from a firm

Your `UserBusinessAccess` row pointing at the firm self-business is revoked. From the next portal load, every client of that firm disappears from your grid — again, without needing per-client revocation.

### When a client is archived or deactivated

`IsActive` flips to false. The traversal excludes inactive businesses, so the client immediately drops out of your grid (and out of analytics, batch filing, etc.).

### When a firm's clients are reassigned across staff

Per-staff assignment lives on the `ClientAssignment` entity (workload distribution) — a layer above access. You can have firm-portal access to a client (and see it in the grid) without being its currently-assigned practitioner. See [User Management](/docs/firm-portal/user-management) for the workload-assignment surface and §32 Attestation Entry Pathway _(documentation coming in Wave 2.2)_ for how attestation interacts with reassignment.

## Access vs §32 attestation — different gates

This page is about **access control** — what you can see and act on at the Firm Portal level. It is distinct from the **§32 attestation scope gate** that runs on attestation-sensitive surfaces (transaction posting, signatory prefill).

| Gate | Question it answers | Where it lives |
|---|---|---|
| **Firm-to-client access** (this page) | Can this user see and act on this client at the firm-portal level? | `BusinessService.ValidateUserAccess` / `GetUserBusinesses` |
| **§32 attestation scope** | Is this user the regulated practitioner-of-record for this client? (Active `ClientAssignment` AND Active `Attestation`.) | `ClientAssignmentLookupService.LookupAsync` |

Having Firm Portal access to a client does **not** make you the practitioner-of-record for that client. The reverse is also true — being the practitioner-of-record assumes you have Firm Portal access (otherwise you couldn't navigate to the client), but the two are evaluated independently. The [Practitioner Revocation Gate](/docs/attestation/practitioner-revocation) covers what users see when the attestation gate fires.

## Multi-tenant safety properties

The traversal is enforced server-side, not in the UI:

- `IsActive` gate excludes archived businesses from both the firm self-business set and the linked clients set.
- `ManagingOrgId` match enforces the firm boundary — a user with access to firm A's self-business cannot see firm B's clients, even if both firms exist in the same Comply tenant.
- Queries run as `AsNoTracking()` reads — no inadvertent change-tracker capture, no cross-request entity state.

These properties match the project's mandatory rule that every database query filters by the multi-tenant boundary.

## Next steps

- [Firm Portal Landing](/docs/firm-portal) — what the resolved client set looks like in the dashboard
- §32 Attestation Entry Pathway _(documentation coming in Wave 2.2)_ — the regulatory-authority gate that runs *in addition to* access control
- [Practitioner Revocation Gate](/docs/attestation/practitioner-revocation) — runtime enforcement when the §32 gate fires
- [User Management](/docs/firm-portal/user-management) — how `UserBusinessAccess` rows are created and revoked
