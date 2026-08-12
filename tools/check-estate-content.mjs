#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const extensions = new Set(['.md', '.mdx', '.ts', '.tsx']);

function filesUnder(directory) {
  if (!existsSync(directory)) return [];
  const result = [];
  for (const entry of readdirSync(directory)) {
    const full = path.join(directory, entry);
    if (statSync(full).isDirectory()) result.push(...filesUnder(full));
    else if (extensions.has(path.extname(entry))) result.push(full);
  }
  return result;
}

function authoredCopy(source) {
  return source
    .replace(/<!--\s*statutory-quotation\s*-->[\s\S]*?<!--\s*\/statutory-quotation\s*-->/gi, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/<!--(?!\s*statutory-quotation)[\s\S]*?-->/g, ' ')
    .replace(/^\s*\/\/.*$/gm, ' ');
}

const retiredForms = [
  [/0%\s*exempt/i, '#4201: Exempt is not a 0% rate label'],
  [/exempt\s*\/\s*zero-?rated/i, '#4201: Exempt and Zero-Rated are distinct treatments'],
  [/2025\s+reforms/i, 'Cass A10: use “as amended through 2026”'],
  [/Batch\s+VAT\s+filing/i, 'Cass A10: use “Batch return preparation”'],
  [/File\s+multi-rate\s+VAT\s+returns/i, 'Cass A10: use “Prepare multi-rate VAT returns”'],
  [/Form\s+301/i, '#4202 / RDF-1: quarantined export token'],
  [/\bOTAS\b/i, '#4202 / RDF-1: unverified external portal token'],
  [/(?:DIR|Department of Inland Revenue)[- ](?:accepted|approved|recognised|recognized)|(?:accepted|approved|recognised|recognized)\s+by\s+(?:the\s+)?(?:DIR|Department of Inland Revenue)|certified[- ]by\s+(?:the\s+)?(?:DIR|Department of Inland Revenue)/i, 'Cass C3: never characterise what the DIR does with product output'],
];

function violationsFor(source, label = 'self-test') {
  const violations = [];
  let copy = authoredCopy(source);
  for (const [pattern, ruling] of retiredForms) {
    if (pattern.test(copy)) violations.push(`${label}: ${ruling}`);
  }
  copy = copy.replace(/§{1,2}\s*\d+[A-Za-z]?(?:\([^)]*\))?\s*(?:–|&ndash;|&#8211;)\s*\d+[A-Za-z]?(?:\([^)]*\))?/g, '');
  if (/(?:—|–|&mdash;|&ndash;|&#8212;|&#8211;)/i.test(copy)) violations.push(`${label}: authored prose em/en dash`);
  if (/\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+[0-3]?\d,\s+20\d{2}\b/.test(copy)) violations.push(`${label}: display date must use “14 Aug 2026” order`);
  return violations;
}

function attestationCitationCounts(source) {
  const counts = { symbol: 0, word: 0 };
  const context = /(?:attest|signator|practitioner|prefill|licen[cs])/i;
  for (const [form, pattern] of [
    ['symbol', /§\s*32/gi],
    ['word', /section\s+32/gi],
  ]) {
    let match;
    while ((match = pattern.exec(source)) !== null) {
      const window = source.slice(Math.max(0, match.index - 140), match.index + match[0].length + 140);
      if (context.test(window)) counts[form]++;
    }
  }
  return counts;
}

if (process.argv.includes('--self-test')) {
  const cases = [
    ['Form 301 is rejected', 'Use Form 301.', true],
    ['OTAS is rejected', 'Submit through OTAS.', true],
    ['month-first date is rejected', 'Updated Aug 14, 2026.', true],
    ['canonical copy passes', 'Updated 14 Aug 2026.', false],
    ['DIR acceptance family is rejected', 'Output approved by the DIR.', true],
    ['statutory quotation is allowed', '<!-- statutory-quotation -->approved by the DIR<!-- /statutory-quotation -->', false],
  ];
  const failures = cases.filter(([, input, expected]) => (violationsFor(input).length > 0) !== expected);
  const rendered = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date('2026-08-14T09:30:00Z'));
  if (rendered !== '14 Aug 2026') failures.push(['rendered date sample', rendered, '14 Aug 2026']);
  if (attestationCitationCounts('§ 32 attestation').symbol !== 1) failures.push(['symbol citation form', 'not detected', 'detected']);
  if (attestationCitationCounts('Section 32 practitioner').word !== 1) failures.push(['word citation form', 'not detected', 'detected']);
  if (failures.length) {
    console.error('Estate content self-test FAILED:', failures);
    process.exit(1);
  }
  console.log(`Estate content self-test passed (${cases.length} guard cases + rendered date sample).`);
  process.exit(0);
}

const files = ['docs', 'src'].flatMap((target) => filesUnder(path.join(repoRoot, target)));
const violations = [];
const attestationCitationBaseline = { symbol: 83, word: 29 };
const attestationCitationActual = { symbol: 0, word: 0 };
for (const file of files) {
  const relative = path.relative(repoRoot, file).replaceAll('\\', '/');
  violations.push(...violationsFor(readFileSync(file, 'utf8'), relative));
  const counts = attestationCitationCounts(authoredCopy(readFileSync(file, 'utf8')));
  attestationCitationActual.symbol += counts.symbol;
  attestationCitationActual.word += counts.word;
}
if (attestationCitationActual.symbol !== attestationCitationBaseline.symbol ||
    attestationCitationActual.word !== attestationCitationBaseline.word) {
  violations.push(`attestation-anchored §32/Section 32 baseline changed: expected ${JSON.stringify(attestationCitationBaseline)}, got ${JSON.stringify(attestationCitationActual)}. Reduce the baseline with a ruled fix; never increase it.`);
}

if (violations.length) {
  console.error('Estate content invariant violations:');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}
console.log(`Estate content gate passed across ${files.length} file(s).`);
