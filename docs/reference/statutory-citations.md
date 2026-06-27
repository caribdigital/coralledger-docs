---
sidebar_position: 2
title: Statutory Citation Style
description: Canonical citation pattern for versioned statutory references in CoralLedger docs
---

# Statutory Citation Style

All statutory references in this documentation should follow this canonical format:

`[Statute Name, Year (as amended by Amendment Name, Year)](OfficialLink), s. SectionNumber`

Example (s. 32 was substantively changed by the 2021 Act and is a canonical example for the 2021 chain):
`[Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32`

## Required Elements

1. **Statute name** (full official name)
2. **Version/amendment information** (original year and amendment context)
3. **Hyperlink** to an official source for the statute text (default to the statute page; use section-deep links only if an official source provides stable section anchors)
4. **Section/subsection reference** in `s. N`, `s. N(1)`, or `s. N(1)(a)` format

## Canonical Examples

- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 26
- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 44
- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), Part X, §§79–80
- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 47A(3)(a)
- [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 47(1)(a)
- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 32(8)
- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 32(11)
- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 53(3)

### Part-and-section citation format

When citing a record-keeping or accounts provision (Part X, §§79–80) or any other multi-section topic anchored to a Part heading, use the `Part X, §§79–80` form (Part roman numeral, sections joined with `§§`). This preserves the canonical hyperlinked citation pattern while making the Part-level grouping explicit.

## Subsection and Paragraph Rules

- Keep the same `s.` prefix, then append subsection/paragraph markers immediately after the section number: `s. 47(1)(a)`.
- Do not add spaces inside subsection markers (`s. 32 (2)` is incorrect).
- Use the exact nested level required by the source text (for example `s. 47A(3)(a)` vs `s. 47A(4)`).

## Amendment Chain Rules

- Omit the amendment chain when citing a section that has not been amended since the original Act: `[Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 26`.
- Use the **2021 chain** when citing a provision whose substance was changed by the VAT (Amendment) (No. 2) Act, 2021 (e.g., provisions updated as part of the rate reduction to 10% or the redefined international-service definitions).
- Use the **2025 chain** when citing provisions introduced or updated by the VAT (Amendment) (No. 2) Act, 2025 (for example, the licensed food-store reduced-rate provision).
- If more than one amending Act is material to the cited provision, list each in chronological order using `and`.

### Sections verified as unamended since 2014

The following sections were confirmed as unamended since the original Value Added Tax Act, 2014, and must **not** carry any amendment-chain qualifier:

| Section | Topic |
|---------|-------|
| s. 26 | Record keeping obligations (citation pending re-verification per CASS-VAT-ACT-RETENTION-VERIFICATION-2026-05-31) |
| s. 41(3) | Record-keeping requirements and good-faith reliance (citation pending re-verification) |
| s. 44 | Partial exemption and input-tax apportionment |
| Part X, §§79–80 | Record-keeping and accounts (5-year statutory retention floor in §79(2); record-types enumeration in §80) |
| s. 61 | Assessment as evidence in proceedings (**not** a penalty section — no "% of unpaid VAT" multiplier) |

:::warning Citation re-verification in progress
The `s. 26` and `s. 41(3)` entries above are carried forward from an earlier in-house verification (May 2026) but have **not** been re-verified at source. The `s. 50` citation that appeared in this table was verified at source on 2026-05-31 and found to be incorrect: §50 of the VAT Act 2014 is "Rules relating to a claim for input tax deduction", not the retention period. The canonical retention authority is **Part X, §§79–80** (§79(2) sets the 5-year statutory minimum). A follow-up verification of §26 and §41(3) is scheduled — both may need similar correction.
:::

Canonical amendment-chain examples:

- [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32
- [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2025)](https://laws.bahamas.gov.bs/), s. 12A
- [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) Act, 2018 and the VAT (Amendment) (No. 2) Act, 2025)](https://laws.bahamas.gov.bs/), s. 12A

## Notes

- Do not cite only "VAT Act Section X" without version and amendment context.
- Prefer official government legal repositories for hyperlinks.
- Default to linking the Act page (`https://laws.bahamas.gov.bs/`) instead of deep section links unless link stability is explicitly verified.

### Deep-Link Stability (Current Default)

| URL pattern | Stability status | Citation guidance |
| --- | --- | --- |
| `https://laws.bahamas.gov.bs/` (Act page/search landing) | Stable for current documentation usage | Preferred default |
| Deep section links (for example section-specific path, query, or fragment URLs) | Not yet confirmed as consistently stable over time | Do not use in canonical citations until stability is verified |
