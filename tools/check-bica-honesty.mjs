#!/usr/bin/env node
// ── BICA live-verification honesty gate (#3945, Cass ruling 2026-07-02) ──────────────
// Live BICA registry verification (bica.bs) is STUBBED (coralledgercomply#3938); the
// product captures a disclosed SELF-DECLARATION, not a verification. No docs surface may
// describe or claim a live BICA registry check until the integration ships. This is a
// PROXIMITY rule (verification vocabulary near the BICA register), not a flat phrase
// list, so it catches "verifies ... BICA licence" / "Verified ... against the Listing of
// Licencees" while the honest disclosure ("self-declared; not verified against the BICA
// registry") passes. The claim returns only at the GA flip that restores the product's
// Verified badge. Mirrors the coralledger-marketing REQ-MSG-001 BICA gate.
//
// Usage:  node tools/check-bica-honesty.mjs [--self-test]
// Scans docs/**/*.{md,mdx} source (frontmatter + prose; fenced code stripped).

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const docsDir = path.join(repoRoot, "docs");

const bicaAnchorPattern = /\b(bica|listing of licen[cs]ees)\b/gi;
const bicaVerificationTerms = [
  "verify",
  "verifies",
  "verified",
  "verifying",
  "verification",
  "registry-checked",
  "registry check",
  "real-time check",
  "real-time checking",
  "authoritative source",
];
// Honest-disclosure allowlist: a window that ASSERTS WE DO NOT verify is the correct
// beta copy and must pass. Matched as a lowercased substring within the proximity window.
const bicaProximityAllowlist = [
  "not verified against the bica registry",
  "not verified against the bica",
  "self-declared",
  "self-attested",
  "does not verify",
  "do not verify",
  "cannot verify",
  "cannot currently verify",
  "not registry-verified",
  "no registry verification",
  // M1 (Marcus): roadmap framing lives in docs only, clearly labelled — a "planned capability"
  // section that says verification does NOT exist yet is the honest exception, not a claim.
  "planned capability",
  "is a planned",
];
const BICA_PROXIMITY_WINDOW = 90;
const escapeRegex = (term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Strip fenced + inline code so code samples (event-type constants, JSON payloads) do not
// count as customer-facing claims. Frontmatter + prose are kept (both are surfaced).
const stripCode = (content) =>
  content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/`[^`]*`/g, " ");

const collectBicaViolations = (rawContent, file) => {
  const normalized = stripCode(rawContent).replace(/\s+/g, " ");
  const violations = [];
  bicaAnchorPattern.lastIndex = 0;
  let anchor;
  while ((anchor = bicaAnchorPattern.exec(normalized)) !== null) {
    const start = Math.max(0, anchor.index - BICA_PROXIMITY_WINDOW);
    const end = Math.min(
      normalized.length,
      anchor.index + anchor[0].length + BICA_PROXIMITY_WINDOW,
    );
    const windowText = normalized.slice(start, end);
    const windowLower = windowText.toLowerCase();
    if (bicaProximityAllowlist.some((allowed) => windowLower.includes(allowed))) {
      continue;
    }
    const offendingTerm = bicaVerificationTerms.find((term) =>
      new RegExp(`\\b${escapeRegex(term)}\\b`, "i").test(windowText),
    );
    if (offendingTerm) {
      violations.push({
        file,
        term: `${anchor[0]} ~ ${offendingTerm}`,
        snippet: windowText.trim(),
      });
    }
  }
  return violations;
};

const collectMarkdownFiles = (dir) => {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectMarkdownFiles(full));
    } else if (entry.endsWith(".md") || entry.endsWith(".mdx")) {
      files.push(full);
    }
  }
  return files;
};

if (process.argv.includes("--self-test")) {
  const cases = [
    {
      name: "BICA verification claim",
      input: "CoralLedger verifies BICA membership at attestation.",
      shouldFlag: true,
    },
    {
      name: "Verified against the Listing of Licencees",
      input: "The outcome is Verified against the Listing of Licensees.",
      shouldFlag: true,
    },
    {
      name: "honest self-declared disclosure",
      input: "The licence is self-declared and not verified against the BICA registry.",
      shouldFlag: false,
    },
    {
      name: "neutral capacity label",
      input: "This variant corresponds to the BICA-Licensed Practitioner capacity.",
      shouldFlag: false,
    },
    {
      name: "clearly-labelled planned-capability roadmap section",
      input:
        "Planned Capability: Registry Verification. Automated verification of practitioner licences against the BICA register is a planned capability.",
      shouldFlag: false,
    },
    {
      name: "code constant is stripped (fenced)",
      input: "See the audit event:\n```\nBICA_VERIFICATION_ATTEMPTED\n```\n",
      shouldFlag: false,
    },
  ];
  const failures = [];
  for (const testCase of cases) {
    const flagged = collectBicaViolations(testCase.input, "self-test").length > 0;
    if (flagged !== testCase.shouldFlag) {
      failures.push(
        `${testCase.name}: flagged=${flagged}, expected=${testCase.shouldFlag}`,
      );
    }
  }
  if (failures.length > 0) {
    console.error("BICA honesty self-test FAILED:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`BICA honesty self-test passed (${cases.length} cases).`);
  process.exit(0);
}

const files = collectMarkdownFiles(docsDir);
const violations = [];
for (const file of files) {
  const content = readFileSync(file, "utf8");
  violations.push(...collectBicaViolations(content, path.relative(repoRoot, file)));
}

if (violations.length > 0) {
  console.error(
    "BICA live-verification claims found in docs source (#3945 — no live-check claim while bica.bs is stubbed):",
  );
  for (const v of violations) {
    console.error(`- ${v.file}: ${v.term}`);
    console.error(`  ...${v.snippet}...`);
  }
  process.exit(1);
}

console.log(`BICA honesty check passed across ${files.length} docs page(s).`);
