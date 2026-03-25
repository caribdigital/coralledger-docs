---
sidebar_position: 6
title: Tenant Isolation Architecture
description: How CoralLedger Comply enforces per-business data isolation using a dynamic EF Core query filter
---

# Tenant Isolation Architecture

CoralLedger Comply is a multi-tenant application. Every business's data lives in the same database, so strict isolation is critical. This page explains exactly how that isolation is enforced in code — useful for developers extending or auditing the platform.

## Overview

Data isolation is enforced through an EF Core [global query filter](https://learn.microsoft.com/en-us/ef/core/querying/filters) that automatically appends a `WHERE BusinessId = @currentId` predicate to every relevant query. The filter is **dynamic**: it re-evaluates the current business identity on every query execution rather than being baked in at startup.

## VATContext Dynamic Filter

### Why dynamic matters

An earlier implementation used a `readonly` field captured at `DbContext` construction time:

```csharp
// Old approach — BusinessId fixed at construction, wrong for long-lived contexts
private readonly Guid _businessId = businessContext.GetCurrentBusinessId();

modelBuilder.Entity<Transaction>()
    .HasQueryFilter(t => t.BusinessId == _businessId);
```

In Blazor Server, a single `DbContext` instance can outlive a single request. If the user switched tenant context (for example via the `?bid=` query parameter), the captured field would not update and queries would continue returning the old tenant's data.

### Current approach — Expression.Property

`VATContext.CurrentBusinessId` is now a **property** that reads the current context on every call:

```csharp
// New approach — evaluated at query execution time
private Guid CurrentBusinessId => _businessContext.GetCurrentBusinessIdSync();

modelBuilder.Entity<Transaction>()
    .HasQueryFilter(t => t.BusinessId == CurrentBusinessId);
```

Because EF Core builds the filter expression using `Expression.Property` (pointing at the property, not a captured value), the runtime re-evaluates `CurrentBusinessId` each time a query runs. This guarantees the filter always reflects the *current* tenant, regardless of how long the `DbContext` has been alive.

## IBusinessContext Interface

The filter relies on a synchronous accessor added to `IBusinessContext`:

```csharp
public interface IBusinessContext
{
    Task<Guid> GetCurrentBusinessIdAsync();

    /// <summary>
    /// Synchronous version used inside EF Core filter expressions,
    /// which cannot await.
    /// </summary>
    Guid GetCurrentBusinessIdSync();
}
```

Filter expressions are compiled to SQL; they must be synchronous. `GetCurrentBusinessIdSync()` reads from `HttpContext.Items`, which is always available during a Blazor Server circuit.

## CircuitBusinessContext and ?bid= Parameter

`CircuitBusinessContext` is the Blazor Server implementation of `IBusinessContext`. Its `SetCurrentBusinessId()` method writes to both the in-memory circuit state **and** `HttpContext.Items`:

```csharp
public void SetCurrentBusinessId(Guid businessId)
{
    _currentBusinessId = businessId;

    // Write to HttpContext.Items so middleware and EF Core filter
    // both see the same value within the same request pipeline.
    if (_httpContextAccessor.HttpContext is not null)
        _httpContextAccessor.HttpContext.Items[BusinessContextKeys.BusinessId] = businessId;
}
```

The `?bid=` query parameter middleware calls `SetCurrentBusinessId()` early in the pipeline. Because `GetCurrentBusinessIdSync()` reads from `HttpContext.Items`, every subsequent EF Core query within that request automatically targets the correct tenant.

### Switching tenants with ?bid=

Append `?bid=<businessId>` to any Blazor Server URL to switch tenant context:

```
https://your-instance.example.com/transactions?bid=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

The middleware intercepts the parameter, calls `SetCurrentBusinessId()`, and removes `?bid=` from the URL before the page renders. All EF Core queries made during that circuit session will be scoped to the requested business — subject to the usual authorisation checks that verify the current user has access to that business.

:::warning
The `?bid=` parameter is an authorised context-switch, not an access bypass. The authorisation middleware validates that the authenticated user is a member of the target business before the switch takes effect. Attempts to switch to an unauthorised business ID are rejected with a 403.
:::

## Security Properties

| Property | Detail |
|----------|--------|
| **Filter scope** | All EF Core entities with a `BusinessId` column |
| **Evaluated** | At query execution time (per-query) |
| **Bypass protection** | Raw SQL queries that bypass EF Core must explicitly include a `BusinessId` predicate — enforced as a mandatory code-review requirement |
| **Cross-tenant detection** | The EF Core global query filter is the primary control preventing cross-tenant data from being returned; the fraud detection layer monitors for other anomalous cross-business access patterns |

## Next Steps

- [Security overview](/docs/security)
- [Fraud alerts](/docs/security/fraud-alerts)
- [Audit trail](/docs/audit)
