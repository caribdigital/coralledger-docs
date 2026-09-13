#!/usr/bin/env node
// ── CLC-DES-044 brand-logo guard (enforced) ──────────────────────────────────────────
// The docs navbar must serve the CLC-DES-027 canon fan-coral mark — coral pill #FF6B4A,
// Deep Ocean #1E3A5F on the light navbar and cream #EBE5D5 on the dark navbar (Docusaurus
// srcDark) — never the stock Docusaurus mascot (green #3ECC5F/#44D860). docs was the last
// property still on the default logo; this fails CI if it drifts back. Mirrors the marketing
// repo's logo-canon-guard. Weakening it to go green re-opens the split identity.
//
// Usage: node tools/check-brand-logo.mjs [--self-test]

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (...p) => readFileSync(path.join(root, ...p), "utf8");
const CORAL_PILL = "#FF6B4A";
const DOCUSAURUS_GREEN = /#3ECC5F|#44D860/i; // the stock mascot palette

if (process.argv.includes("--self-test")) {
  const stockMascot = '<svg><path fill="#3ECC5F"/><path fill="#44D860"/></svg>';
  if (!DOCUSAURUS_GREEN.test(stockMascot)) {
    console.error("SELF-TEST FAILED: the stock Docusaurus green was not detected as off-canon");
    process.exit(1);
  }
  console.log("self-test ok: the guard detects the stock Docusaurus mascot as off-canon");
  process.exit(0);
}

const problems = [];
const must = (cond, msg) => { if (!cond) problems.push(msg); };

for (const [file, tone] of [["static/img/logo.svg", "#1E3A5F"], ["static/img/logo-dark.svg", "#EBE5D5"]]) {
  if (!existsSync(path.join(root, file))) { problems.push(`${file} must exist (canon ${tone} variant)`); continue; }
  const svg = read(file);
  must(svg.includes('viewBox="0 0 200 200"'), `${file} must use the canon 200x200 viewBox`);
  must(svg.includes(CORAL_PILL), `${file} must carry the unrecoloured coral pill ${CORAL_PILL}`);
  must(svg.includes(tone), `${file} must render the mark in ${tone}`);
  must(!DOCUSAURUS_GREEN.test(svg), `${file} still carries the stock Docusaurus green — swap to the canon mark`);
}

const cfg = read("docusaurus.config.ts");
must(/src:\s*'img\/logo\.svg'/.test(cfg), "navbar logo src must be img/logo.svg");
must(/srcDark:\s*'img\/logo-dark\.svg'/.test(cfg), "navbar logo srcDark must be img/logo-dark.svg (dark-theme cream mark)");

if (problems.length) {
  console.error("Brand-logo guard failed (CLC-DES-044):\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log("Brand-logo guard passed: docs serves the canon fan-coral (light + dark).");
