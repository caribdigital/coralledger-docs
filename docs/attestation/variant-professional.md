---
sidebar_position: 5
title: Professional Accountant Variant
description: Section 32 attestation for BICA-registered accountants preparing VAT returns
---

# Professional Accountant Variant

The Professional Accountant Variant applies when a **BICA-registered accountant** prepares and files a VAT return on behalf of a client. This variant corresponds to the `SignatoryCapacity.BicaLicensedPractitioner` enum value in the platform, and includes an additional declaration step — the [BICA Licence Declaration](/docs/attestation/bica-licence-declaration) — which records the practitioner's self-declared BICA licence as part of the attestation.

Within this signatory capacity, the practitioner additionally selects one of seven **`AttestationVariant`** bodies that identify the practice-area scope being attested. See [Attestation Body Selection](#attestation-body-selection) below.

## Who Uses This Variant

This variant is presented when the [Qualifying Screen](/docs/attestation/qualifying-screen) identifies the filer's signatory capacity as **`BicaLicensedPractitioner`**. It is distinct from the [Authorized Agent Variant](/docs/attestation/variant-agent) (`AuthorisedAgent`) because it carries an enhanced duty of care under BICA's professional standards and includes additional accountability requirements.

BICA stands for the **Bahamas Institute of Chartered Accountants**. Members are bound by BICA's Code of Professional Conduct, which includes obligations around accuracy, integrity, and due diligence in tax return preparation.

## Attestation Body Selection {#attestation-body-selection}

A BICA practitioner attests under one of seven attestation bodies (`AttestationVariant` in the platform). Each body is a **practice-area declaration** of what the practitioner is attesting to, made under the [Value Added Tax Act, 2014 (as amended)](https://laws.bahamas.gov.bs/) and applicable BICA professional standards:

| Code | Declaration scope |
|---|---|
| **Variant A** | **General VAT Compliance Attestation** — the business is in compliance with its general VAT obligations |
| **Variant B** | **VAT Return Preparation Attestation** — the practitioner prepared or reviewed the VAT return(s) for the period(s) stated |
| **Variant C** | **VAT Advisory Services Attestation** — VAT advisory services were rendered in accordance with BICA professional standards |
| **Variant A+B** | General compliance + return preparation |
| **Variant A+C** | General compliance + advisory services |
| **Variant B+C** | Return preparation + advisory services |
| **Variant A+B+C** | Full-scope declaration covering all three practice areas |

The practitioner selects the variant whose scope accurately reflects the services rendered for the client. The declaration text shown at submission time is determined by the selected variant body. Variants A, B, C, and A+B+C have ratified declaration bodies; the remaining combinations (A+B, A+C, B+C) carry placeholder body text and require selection of one of the four ratified variants until ratification is complete.

## BICA Licence Declaration Requirement

Before the professional declaration is presented, the accountant records their [BICA Licence Declaration](/docs/attestation/bica-licence-declaration):

1. Enter your **name as listed with BICA** when prompted
2. The entry is stored as self-attested — the surface states plainly that it is not checked against the BICA registry during beta
3. Proceed to the professional declaration and sign

See the [BICA Licence Declaration](/docs/attestation/bica-licence-declaration) page for what is recorded and whose responsibility the declaration is.

## Declaration Text

Once the attestation record is written, the practitioner signs the following declaration:

> *I declare that I am a member in good standing of the Bahamas Institute of Chartered Accountants (BICA Membership No: [XXXX]), that I have prepared this VAT return in my professional capacity on behalf of the registered person named herein, and that the information provided is, to the best of my professional knowledge and belief, true, correct, and complete. I acknowledge my professional obligations under BICA's Code of Professional Conduct and understand that submitting a false or misleading return is an offence under the [Value Added Tax Act, 2014 (as amended)](https://laws.bahamas.gov.bs/).*

The exact declaration body presented depends on the selected `AttestationVariant` (A, B, C, A+B+C, etc.). See [Attestation Body Selection](#attestation-body-selection) above.

The accountant must confirm this declaration by:

1. Reviewing the return summary displayed alongside the declaration
2. Confirming the pre-populated BICA membership number is correct
3. Checking the **I confirm the above declaration** checkbox
4. Entering their current account password
5. Clicking **Submit Return**

## Validation Checks

| Check | Condition |
|-------|-----------|
| **BICA licence declaration** | The practitioner has recorded their self-declared BICA licence |
| **User role** | The logged-in user holds Accountant or Owner role for this business |
| **Return completeness** | All mandatory return fields are populated |
| **Period lock** | The tax period is open and not previously submitted |
| **Session validity** | The attestation session has not expired |
| **Password match** | The entered password matches the accountant's credentials |

## After Submission

Once the Professional Accountant Declaration is accepted:

- The return status changes from **Draft** to **Submitted**
- The attestation record identifies the filer as **Professional** and records the practitioner's self-declared BICA licence
- A submission receipt is sent to the accountant and the business owner
- The self-declared BICA licence details are written to the [Attestation Audit Trail](/docs/attestation/audit-trail)

## Responsibility and Liability

The Professional Accountant Variant carries an explicit professional liability acknowledgment. By using this variant, the accountant confirms that:

- They have exercised reasonable professional care in preparing the return
- They have reviewed the underlying transactions and supporting records
- They are not aware of any material misstatement or omission

This does not transfer legal liability from the registrant to the accountant — the registrant remains ultimately responsible for the accuracy of the return and for any resulting penalties, interest, and assessment exposure under the [Value Added Tax Act, 2014 (as amended)](https://laws.bahamas.gov.bs/) — but it does establish the accountant's professional accountability under BICA standards.

## Next Steps

- [BICA Licence Declaration](/docs/attestation/bica-licence-declaration)
- [Session Affirmation](/docs/attestation/session-affirmation)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
- [Submit your VAT return](/docs/vat-returns/submit-return)
