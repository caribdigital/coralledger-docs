---
sidebar_position: 3
title: Return Preview & Validation
description: Review and validate your VAT return before filing
---

# Return Preview & Validation

Before submitting your VAT return, CoralLedger Comply performs comprehensive validation to catch errors and ensure compliance.

## Accessing Return Preview

1. Go to **VAT Returns**
2. Select the period you want to file
3. Click **Preview Return**

## Preview Summary

The preview displays:

### Period Information
- Filing period (e.g., Q3 2024)
- Period start and end dates
- Filing deadline

### VAT Totals
- **Output VAT** - VAT collected on sales
- **Input VAT** - VAT paid on purchases
- **Net VAT** - Amount payable or refundable
- **Transaction Count** - Number of transactions included

## 10-Point Validation

CoralLedger performs 10 validation checks before you can file:

### Blocking Validations (Must Fix)

| Check | What It Validates |
|-------|-------------------|
| **Transaction Processing** | All transactions are fully processed |
| **Missing VAT Rates** | Every transaction has a VAT rate assigned |
| **Required Fields** | All mandatory fields are complete |

### Warning Validations (Review Recommended)

| Check | What It Validates |
|-------|-------------------|
| **VAT Calculation Accuracy** | Calculations match expected totals |
| **Filing Deadline** | Return is being filed on time |
| **Duplicate Detection** | No duplicate transactions found |
| **Category Classifications** | Categories are consistent |
| **Minimum Transaction Count** | Period has sufficient transactions |
| **April 2026 Compliance** | Meets upcoming regulatory changes |
| **Box Balance Verification** | Return boxes balance correctly |

## Validation Results

Each check displays a status:

- **Pass** (Green) - Validation successful
- **Warning** (Yellow) - Review recommended but not blocking
- **Error** (Red) - Must be resolved before filing

## Resolving Validation Issues

### Transaction Processing Errors
- Navigate to the flagged transactions
- Complete any missing data
- Re-run the preview

### Missing VAT Rates
1. Go to **Transactions**
2. Filter by "Uncategorized"
3. Assign appropriate VAT categories
4. Return to preview

### Duplicate Transactions
1. Review the flagged duplicates
2. Delete true duplicates or mark as intentional
3. Re-run validation

## After Validation

Once all blocking validations pass:

1. Review the return summary
2. Click **Proceed to Filing**
3. Follow the submission workflow

## Best Practices

- **Preview weekly** during the period to catch issues early
- **Address warnings** even if not blocking
- **Keep records** of validation results for audit purposes

## Next Steps

- [Submit your VAT return](/docs/vat-returns/submit-return)
- [Understand compliance scoring](/docs/compliance/compliance-score)
