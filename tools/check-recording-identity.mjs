#!/usr/bin/env node
// ── Recording identity guard (enforced) ──────────────────────────────────────────────
// Demo recordings are captured from a live application and published to a PUBLIC CDN.
// They may therefore only ever be recorded as a FIXTURE identity.
//
// Until 2026-09-13 this recorder defaulted to a real customer account and named it in
// four places: lib/auth.js, the README, and two scenarios. Anything recorded through it
// captured that customer's live tenant and was uploaded for anyone to watch. Comply
// removed the same identity on 2026-09-04 after the KSA incident, and its evidence
// manifest now fails closed on a non-fixture persona — this repository was missed,
// because a sweep of one repo is not a sweep of a system.
//
// The asymmetry is what makes this worth a guard rather than a comment: a leak here is a
// CDN purge and a conversation with a customer, not a git revert.
//
// Fixture identities end in @coralledger.test. Anything else in these files is a defect,
// and a free-text address is exactly what a well-meaning author adds when a scenario
// needs "a real-looking account".
//
// Usage: node tools/check-recording-identity.mjs [--self-test]

import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const RECORDER = path.join("scripts", "playwright-recorder");
const FIXTURE_DOMAIN = "@coralledger.test";
// Any e-mail-shaped literal. Deliberately broad: the failure is a REAL address appearing
// here, and we cannot enumerate the addresses that would be wrong.
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
// Addresses that are not fixture identities but are also not a real person's.
//
// @example.com is reserved by RFC 2606 and can never belong to a real customer, so a seeded staging
// user there is a different risk class from the customer account this guard was written for: the
// first is untidy, the second was a live tenant on a public CDN. Seven scenarios use
// etienne.mckenzie@example.com and are permitted here rather than blanket-rewritten, because they
// may depend on that persona's taxpayer-side permissions and changing them unread would trade a
// tidy identity for broken recordings.
//
// That is a deliberate narrowing, not a clearance: moving them onto registry fixtures is follow-up,
// and the residual question - whether the staging dataset those recordings capture contains real
// customer data at all - is bigger than this guard and belongs with whoever owns the KSA
// remediation.
const ALLOWED_DOMAINS = ["@example.com"];
const ALLOWED = new Set(["noreply@anthropic.com"]);
const permitted = (a) =>
  a.endsWith(FIXTURE_DOMAIN) || ALLOWED.has(a) || ALLOWED_DOMAINS.some((d) => a.endsWith(d));

if (process.argv.includes("--self-test")) {
  const offending = 'const email = opts.email ?? "somecustomer@gmail.com";';
  const found = (offending.match(EMAIL) || []).filter((e) => !permitted(e));
  if (found.length !== 1) {
    console.error("SELF-TEST FAILED: a real customer address was not detected as off-fixture");
    process.exit(1);
  }
  const fixture = 'email: "reef.firm.owner@coralledger.test"';
  if ((fixture.match(EMAIL) || []).some((e) => !e.endsWith(FIXTURE_DOMAIN))) {
    console.error("SELF-TEST FAILED: a fixture address was wrongly flagged");
    process.exit(1);
  }
  console.log("self-test ok: the guard detects a non-fixture recording identity and passes a fixture one");
  process.exit(0);
}

const problems = [];

if (!existsSync(path.join(root, RECORDER))) {
  console.log(`check-recording-identity: ${RECORDER} not present; nothing to check.`);
  process.exit(0);
}

// Walk the recorder, skipping installed dependencies and build output.
const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist") continue;
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(rel);
    else if (/\.(js|mjs|ts|md|json)$/.test(entry.name)) files.push(rel);
  }
};
walk(RECORDER);

for (const rel of files) {
  const text = readFileSync(path.join(root, rel), "utf8");
  for (const address of new Set(text.match(EMAIL) || [])) {
    if (permitted(address)) continue;
    problems.push(
      `${rel} names '${address}', which is not a fixture identity (${FIXTURE_DOMAIN}). ` +
        `These recordings are published to a public CDN, so they may only be captured as a ` +
        `fixture persona. Use reef.firm.owner@coralledger.test (SmokeTestConfig.FirmOwnerEmail ` +
        `in caribdigital/coralledgercomply, overridable via SMOKE_FIRM_OWNER_EMAIL). If this ` +
        `address is genuinely not a sign-in identity, add it to ALLOWED with the reason.`,
    );
  }
}

// PRESENCE: the fixture identity must actually be the default. An empty recorder would pass
// the absence rule above while teaching nobody which identity to use.
const authPath = path.join(RECORDER, "lib", "auth.js");
if (existsSync(path.join(root, authPath))) {
  const auth = readFileSync(path.join(root, authPath), "utf8");
  if (!auth.includes(FIXTURE_DOMAIN)) {
    problems.push(
      `${authPath} no longer names a fixture identity at all. The default must be the fixture ` +
        `firm owner — removing it does not make the recorder safe, it makes the next caller guess.`,
    );
  }
}

if (problems.length) {
  console.error("Recording identity guard FAILED:\n");
  for (const p of problems) console.error(`  - ${p}\n`);
  process.exit(1);
}

console.log(`check-recording-identity: ok — ${files.length} recorder file(s), fixture identities only.`);
