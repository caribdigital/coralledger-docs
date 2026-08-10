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
];

const files = ['docs', 'src'].flatMap((target) => filesUnder(path.join(repoRoot, target)));
const violations = [];
for (const file of files) {
  const relative = path.relative(repoRoot, file).replaceAll('\\', '/');
  let source = authoredCopy(readFileSync(file, 'utf8'));
  for (const [pattern, ruling] of retiredForms) {
    if (pattern.test(source)) violations.push(`${relative}: ${ruling}`);
  }
  source = source.replace(/§{1,2}\s*\d+[A-Za-z]?(?:\([^)]*\))?\s*(?:–|&ndash;|&#8211;)\s*\d+[A-Za-z]?(?:\([^)]*\))?/g, '');
  if (/(?:—|–|&mdash;|&ndash;|&#8212;|&#8211;)/i.test(source)) violations.push(`${relative}: authored prose em/en dash`);
  if (/\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+[0-3]?\d,\s+20\d{2}\b/.test(source)) violations.push(`${relative}: display date must use “14 Aug 2026” order`);
}

if (violations.length) {
  console.error('Estate content invariant violations:');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}
console.log(`Estate content gate passed across ${files.length} file(s).`);
