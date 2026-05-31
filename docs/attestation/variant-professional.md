---
sidebar_position: 5
title: Professional Accountant Variant
description: Section 32 attestation for BICA-registered accountants preparing VAT returns
---

# Professional Accountant Variant

The Professional Accountant Variant applies when a **BICA-registered accountant** prepares and files a VAT return on behalf of a client. This variant corresponds to the `SignatoryCapacity.BicaLicensedPractitioner` enum value in the platform, and includes an additional verification step — [BICA Verification](/docs/attestation/bica-verification) — to confirm that the accountant's professional registration is current at the time of filing.

Within this signatory capacity, the practitioner additionally selects one of seven **`AttestationVariant`** bodies that describe the scope of the attestation being given. See [Practice-Area Attestation Body Selection](#practice-area-attestation-body-selection) below.

## Who Uses This Variant

This variant is presented when the [Qualifying Screen](/docs/attestation/qualifying-screen) identifies the filer's signatory capacity as **`BicaLicensedPractitioner`**. It is distinct from the [Authorized Agent Variant](/docs/attestation/variant-agent) (`AuthorisedAgent`) because it carries an enhanced duty of care under BICA's professional standards and includes additional accountability requirements.

BICA stands for the **Bahamas Institute of Chartered Accountants**. Members are bound by BICA's Code of Professional Conduct, which includes obligations around accuracy, integrity, and due diligence in tax return preparation.

## Practice-Area Attestation Body Selection

A BICA practitioner attests under one of seven attestation bodies (`AttestationVariant` in the platform), each corresponding to a defined practice area or combination of practice areas:

| Code | Practice area covered |
|---|---|
| **Variant A** | VAT Act s. 32(2) continuous-supply attestation context |
| **Variant B** | VAT Act s. 32(3) advance-payment attestation context |
| **Variant C** | VAT Act s. 32 read with s. 52 retention-payment attestation context |
| **Variant A+B** | Combined s. 32(2) and s. 32(3) attestation context |
| **Variant A+C** | Combined s. 32(2) and s. 32 with s. 52 attestation context |
| **Variant B+C** | Combined s. 32(3) and s. 32 with s. 52 attestation context |
| **Variant A+B+C** | Combined s. 32(2), s. 32(3), and s. 32 with s. 52 context |

The practitioner selects the variant whose scope accurately reflects their engagement with the client. The declaration text shown at submission time is determined by the selected variant body. Variants A, B, C, and A+B+C have ratified declaration bodies; the remaining combinations (A+B, A+C, B+C) carry placeholder body text and require selection of one of the four ratified variants until ratification is complete.

## BICA Verification Requirement

Before the professional declaration is presented, Comply runs the [BICA Verification](/docs/attestation/bica-verification) check against the accountant's membership number. The accountant must:

1. Enter their **BICA membership number** when prompted
2. Wait for verification — the check typically completes in under five seconds
3. Proceed if verification passes; resolve any issues if it fails

See [BICA Verification](/docs/attestation/bica-verification) for full details on how verification works and how to resolve failures.

## Declaration Text

Once BICA Verification passes, the following declaration is presented:

> *I declare that I am a member in good standing of the Bahamas Institute of Chartered Accountants (BICA Membership No: [XXXX]), that I have prepared this VAT return in my professional capacity on behalf of the registered person named herein, and that the information provided is, to the best of my professional knowledge and belief, true, correct, and complete. I acknowledge my professional obligations under BICA's Code of Professional Conduct and understand that submitting a false or misleading return is an offence under the [Value Added Tax Act, 2014 (as amended)](https://laws.bahamas.gov.bs/), including penalty exposure under s. 61 for both me and the registered person named in this return.*

The exact declaration body presented depends on the selected `AttestationVariant` (A, B, C, A+B+C, etc.). See [Practice-Area Attestation Body Selection](#practice-area-attestation-body-selection) above.

The accountant must confirm this declaration by:

1. Reviewing the return summary displayed alongside the declaration
2. Confirming the pre-populated BICA membership number is correct
3. Checking the **I confirm the above declaration** checkbox
4. Entering their current account password
5. Clicking **Submit Return**

## Validation Checks

| Check | Condition |
|-------|-----------|
| **BICA membership** | Membership number passes the BICA Verification check |
| **User role** | The logged-in user holds Accountant or Owner role for this business |
| **Return completeness** | All mandatory return fields are populated |
| **Period lock** | The tax period is open and not previously submitted |
| **Session validity** | The attestation session has not expired |
| **Password match** | The entered password matches the accountant's credentials |

## After Submission

Once the Professional Accountant Declaration is accepted:

- The return status changes from **Draft** to **Submitted**
- The attestation record identifies the filer as **Professional** and includes the verified BICA membership number
- A submission receipt is sent to the accountant and the business owner
- The BICA membership number and verification result are written to the [Attestation Audit Trail](/docs/attestation/audit-trail)

## Responsibility and Liability

The Professional Accountant Variant carries an explicit professional liability acknowledgment. By using this variant, the accountant confirms that:

- They have exercised reasonable professional care in preparing the return
- They have reviewed the underlying transactions and supporting records
- They are not aware of any material misstatement or omission

This does not transfer legal liability from the registrant to the accountant — under [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32, the registrant remains ultimately responsible — but it does establish the accountant's professional accountability under BICA standards.

## Next Steps

- [BICA Verification](/docs/attestation/bica-verification)
- [Session Affirmation](/docs/attestation/session-affirmation)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
- [Submit your VAT return](/docs/vat-returns/submit-return)
