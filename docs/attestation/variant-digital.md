---
sidebar_position: 6
title: Digital Filing Variant
description: Section 32 attestation for returns submitted with a qualified electronic signature
---

# Digital Filing Variant

The Digital Filing Variant applies when the filer signs the VAT return using a **qualified electronic signature** backed by a recognized digital certificate. This variant meets the heightened signature requirements available to businesses that have provisioned a digital signing credential in CoralLedger Comply.

## Who Uses This Variant

This variant is presented when the [Qualifying Screen](/docs/attestation/qualifying-screen) determines that the filer is the business owner or director **and** has chosen the **qualified electronic signature** method. It may also be used by authorized agents who hold a valid digital certificate.

A qualified electronic signature in this context means a signature produced using:

- An X.509 digital certificate issued by a recognized Certificate Authority (CA)
- A cryptographic private key held exclusively by the signing party
- A signature algorithm supported by CoralLedger Comply (RSA-2048 or higher, ECDSA P-256 or higher)

## Setting Up Digital Signing

Before using this variant, a digital signing credential must be registered in CoralLedger Comply:

1. Navigate to **Settings > Account > Digital Signing**
2. Click **Register Certificate**
3. Upload your X.509 certificate (PEM or DER format)
4. CoralLedger Comply validates the certificate chain and expiry date
5. Click **Confirm** — the certificate is now linked to your account

:::warning Certificate Validity
Certificates that are expired, self-signed, or issued by an unrecognized CA will be rejected at registration time and again at the point of signing. Keep your certificate up to date to avoid submission delays.
:::

## Signing Flow

When this variant is active:

1. CoralLedger Comply generates a **return digest** — a SHA-256 hash of the return data package
2. The return digest is displayed for review
3. You sign the digest using your private key:
   - **Browser-based signing** — Use the CoralLedger signing extension or a PKCS#11-compatible device (hardware token / smart card)
   - **File-based signing** — Download the digest, sign it offline with your certificate toolchain, and upload the signature file
4. CoralLedger Comply verifies the signature against the registered certificate
5. If verification passes, the declaration confirmation screen is shown

## Declaration Text

After the signature is verified, the following declaration is presented:

> *I declare that I have applied my qualified electronic signature to this VAT return, that I am the registered person or an authorized representative of the registered person named herein, and that the information provided in this return is, to the best of my knowledge and belief, true, correct, and complete. I understand that submitting a false or misleading return is an offence under the VAT Act (The Bahamas).*

The filer confirms by checking **I confirm the above declaration** and clicking **Submit Return**. A password re-entry is not required for this variant because the cryptographic signature serves as the identity confirmation.

## Validation Checks

| Check | Condition |
|-------|-----------|
| **Certificate validity** | Certificate is not expired and is issued by a recognized CA |
| **Signature integrity** | Signature matches the return digest and the registered certificate |
| **Certificate binding** | Certificate is registered to the logged-in user account |
| **Return completeness** | All mandatory return fields are populated |
| **Period lock** | The tax period is open and not previously submitted |
| **Session validity** | The attestation session has not expired |

## After Submission

Once the Digital Filing Declaration is accepted:

- The return status changes from **Draft** to **Submitted**
- The attestation record includes the certificate serial number, CA name, and signature hash
- A submission receipt is generated and emailed to the address on file
- The digital signature details are written to the [Attestation Audit Trail](/docs/attestation/audit-trail)

## Advantages of the Digital Variant

| Feature | Standard / Agent Variant | Digital Variant |
|---------|--------------------------|-----------------|
| Password re-entry required | Yes | No |
| Signature verifiable offline | No | Yes |
| Certificate-backed identity | No | Yes |
| Suitable for automated filing pipelines | No | Yes |

## Next Steps

- [Session Affirmation](/docs/attestation/session-affirmation)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
- [Submit your VAT return](/docs/vat-returns/submit-return)
