#!/usr/bin/env node
// ── REQ-MSG-001 vocabulary gate (enforced) ───────────────────────────────────────────
// Converts the manual audit grep (docs/reference/audit-verification-2026-05-30.md:26)
// into an enforced check, mirroring the Comply repo's BannedClaimLanguageInvariantTests
// (Class-2 capability overclaims) and the Iron-Dome/M01 lodgement-language regression.
// Two banned classes:
//   1. Capability overclaims — AI / machine-learning / smart / intelligent / automatic
//      framing for what is a deterministic, rule-based, user-confirmed product.
//   2. Lodgement misstatements — anything implying the platform files with / is accepted
//      by the DIR. Canon: the platform PREPARES artifacts; the practitioner LODGES.
// "handle/handles" from the original audit grep is deliberately NOT enforced here (too
// broad for CI; it stays an audit-time grep). Allowlist entries are value-anchored
// (file suffix + snippet regex + reason) so they cannot mask new violations.
//
// Usage: node tools/check-vocab.mjs [--self-test]
// Scans docs/**/*.{md,mdx}, src/pages/**/*.{md,mdx,tsx}, and video/captions/**/*.json
// (caption text is customer-facing copy). Fenced/inline code stripped from markdown.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const bannedPatterns = [
  // Class 1 — capability overclaims
  { re: /\bAI\b/g, label: "bare 'AI'" },
  { re: /\bA\.I\.\b/gi, label: "'A.I.'" },
  { re: /\bai[- ]powered\b/gi, label: "'AI-powered'" },
  { re: /\bartificial[- ]intelligence\b/gi, label: "'artificial intelligence'" },
  { re: /\bmachine[- ]learning\b/gi, label: "'machine learning'" },
  { re: /\bsmart\b/gi, label: "'smart'" },
  { re: /\bintelligent\b/gi, label: "'intelligent'" },
  { re: /\bautomatic(?:ally)?\b/gi, label: "'automatic/automatically'" },
  { re: /\bautomated\b/gi, label: "'automated'" },
  { re: /\bauto[- ]?(?:detect|detects|detected|detection|fix|fixes|fixed|categoriz\w+|categoris\w+)\b/gi, label: "'auto-detect/auto-fix/auto-categorize'" },
  { re: /\bclassifies every\b/gi, label: "'classifies every'" },
  // Class 2 — lodgement misstatements (platform-as-filer)
  { re: /\bsubmitted on your behalf\b/gi, label: "'submitted on your behalf'" },
  { re: /\bDIR has accepted\b/gi, label: "'DIR has accepted'" },
  { re: /\bautomatically files?\b/gi, label: "'automatically file(s)'" },
  { re: /\bfiles for you\b/gi, label: "'files for you'" },
  { re: /\be-filed\b/gi, label: "'e-filed'" },
  { re: /\bsuccessfully filed\b/gi, label: "'successfully filed'" },
];

// Global negation allowance: a banned term inside an explicit negation or honest
// roadmap disclosure is the CORRECT copy ("no automated re-classification", "is not
// surfaced", "is a planned capability"). These patterns must contain the negation, so
// they cannot mask a positive overclaim.
const globalNegations = [
  /\bno automated\b/i,
  /\bnot automated?\b/i,
  /\bis (a )?planned capability\b/i,
  /\b(is|are) not surfaced\b/i,
  /\bnot automatic(ally)?\b/i,
  /\bno automatic\b/i,
  /\bAutomatic blocking [^.]{0,80}is not\b/i,
];

// Value-anchored allowlist: (fileSuffix, snippetPattern, reason). An entry matches when
// the file path ends with fileSuffix AND the offending line matches snippetPattern.
// Add entries ONLY for claims that are TRUE of the product; never to silence a real
// overclaim (fix the copy instead).
const allowlist = [
  // VR-STATE-001: credit/zero returns genuinely auto-advance Lodged → Lodged & Paid, and
  // cumulative payment genuinely triggers the final transition — a TRUE deterministic
  // state-machine behavior (Comply VATReturns state machine), same class as the Comply
  // help allowlist's "automatic penalties" truth.
  {
    fileSuffix: "docs/reference/glossary.md",
    pattern: /reach(es)? this state automatically|state is\s+after pay/i,
    reason: "VR-STATE-001 auto-advance is real state-machine behavior",
  },
  {
    fileSuffix: "docs/vat-returns/index.md",
    pattern: /returns reach this state autom/i,
    reason: "VR-STATE-001 auto-advance is real state-machine behavior",
  },
  {
    fileSuffix: "docs/vat-returns/record-dir-acknowledgement.md",
    pattern: /transitions happen automatically|transitions the return to\s+automatically|automatically via the VR-STATE-001/i,
    reason: "VR-STATE-001 auto-advance is real state-machine behavior",
  },
  {
    fileSuffix: "docs/vat-returns/submit-return.md",
    pattern: /automatically for credit\/zero returns/i,
    reason: "VR-STATE-001 auto-advance is real state-machine behavior",
  },
  {
    fileSuffix: "docs/attestation/carve-outs.md",
    pattern: /detected automatically when the filing facts unambiguously match/i,
    reason: "carve-out refusals genuinely fire deterministically on matching facts (smoke F1-F6)",
  },
  {
    fileSuffix: "docs/reference/audit-verification-2026-05-30.md",
    pattern: /AI Intelligence card \| 0 hits|"Monitor AI insights" line/i,
    reason: "historical audit memo REPORTING the banned term (original row + 2026-07-17 addendum documenting its removal), not using it",
  },
];

const stripCode = (content) =>
  content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/`[^`]*`/g, " ");

const isAllowlisted = (relFile, lineText) =>
  globalNegations.some((pattern) => pattern.test(lineText)) ||
  allowlist.some(
    (entry) =>
      relFile.replaceAll("\\", "/").endsWith(entry.fileSuffix) &&
      entry.pattern.test(lineText),
  );

const collectVocabViolations = (rawContent, relFile) => {
  const isMarkdown = relFile.endsWith(".md") || relFile.endsWith(".mdx");
  const text = isMarkdown ? stripCode(rawContent) : rawContent;
  const violations = [];
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    for (const { re, label } of bannedPatterns) {
      re.lastIndex = 0;
      if (re.test(line) && !isAllowlisted(relFile, line)) {
        violations.push({ file: relFile, line: i + 1, label, snippet: line.trim().slice(0, 160) });
      }
    }
  });
  return violations;
};

const collectFiles = (dir, exts) => {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full, exts));
    } else if (exts.some((ext) => entry.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
};

if (process.argv.includes("--self-test")) {
  const cases = [
    { name: "bare AI flagged", input: "Monitor AI insights on the dashboard.", shouldFlag: true },
    { name: "automatically flagged", input: "Comply automatically files your return.", shouldFlag: true },
    { name: "lodgement misstatement flagged", input: "Your return was submitted on your behalf.", shouldFlag: true },
    { name: "smart flagged", input: "Smart categorization sorts everything.", shouldFlag: true },
    { name: "AIRLINE not flagged (word boundary)", input: "AIRLINE tickets are Zero-Rated.", shouldFlag: false },
    { name: "said not flagged", input: "The Comptroller said the period is monthly.", shouldFlag: false },
    { name: "code fence stripped", input: "Event constant:\n```\nAI_INSIGHTS_PANEL_REMOVED\n```\n", shouldFlag: false },
    { name: "lodgement canon passes", input: "Comply prepares the return; you lodge it with the DIR.", shouldFlag: false },
  ];
  const failures = [];
  for (const testCase of cases) {
    const flagged = collectVocabViolations(testCase.input, "self-test.md").length > 0;
    if (flagged !== testCase.shouldFlag) {
      failures.push(`${testCase.name}: flagged=${flagged}, expected=${testCase.shouldFlag}`);
    }
  }
  if (failures.length > 0) {
    console.error("Vocab gate self-test FAILED:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`Vocab gate self-test passed (${cases.length} cases).`);
  process.exit(0);
}

const targets = [
  ...collectFiles(path.join(repoRoot, "docs"), [".md", ".mdx"]),
  ...collectFiles(path.join(repoRoot, "src", "pages"), [".md", ".mdx", ".tsx"]),
  ...collectFiles(path.join(repoRoot, "video", "captions"), [".json"]),
];

const violations = [];
for (const file of targets) {
  const content = readFileSync(file, "utf8");
  violations.push(...collectVocabViolations(content, path.relative(repoRoot, file)));
}

if (violations.length > 0) {
  console.error(
    "REQ-MSG-001 vocabulary violations (capability overclaims / lodgement misstatements).\n" +
    "Fix the copy — the product is deterministic and rule-based, and it never files with the DIR.\n" +
    "Allowlist entries are for TRUE claims only:",
  );
  for (const v of violations) {
    console.error(`- ${v.file}:${v.line} [${v.label}]`);
    console.error(`    ${v.snippet}`);
  }
  process.exit(1);
}

console.log(`Vocab gate passed across ${targets.length} file(s).`);
