// Per-scenario runner.
//
// Usage:
//   STAGING_TEST_AUTH_SECRET=... node run.js compliance-01
//   STAGING_TEST_AUTH_SECRET=... node run.js --all
//
// Each scenario produces recordings/<id>.webm. Convert the directory to .mp4 with:
//   ../convert-marketing-videos.sh recordings ../../dist/videos

import { runScenario } from './lib/recorder.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scenariosDir = path.join(__dirname, 'scenarios');

async function listScenarios() {
  return fs
    .readdirSync(scenariosDir)
    .filter((f) => f.endsWith('.js'))
    .map((f) => f.replace(/\.js$/, ''));
}

async function loadScenario(id) {
  const file = path.join(scenariosDir, `${id}.js`);
  if (!fs.existsSync(file)) {
    throw new Error(`Scenario '${id}' not found at ${file}.`);
  }
  // dynamic import; need file:// URL on Windows
  const url = 'file://' + file.replace(/\\/g, '/');
  const mod = await import(url);
  if (!mod.default || typeof mod.default.record !== 'function') {
    throw new Error(`Scenario '${id}' must export a default with a record() function.`);
  }
  return mod.default;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage:  node run.js <scenario-id>  |  node run.js --all');
    console.error('Available scenarios:');
    for (const id of await listScenarios()) console.error(`  - ${id}`);
    process.exit(1);
  }

  let ids;
  if (args[0] === '--all') {
    ids = await listScenarios();
  } else {
    ids = args;
  }

  const results = [];
  for (const id of ids) {
    const scenario = await loadScenario(id);
    try {
      const result = await runScenario(scenario);
      results.push({ id, ...result });
    } catch (err) {
      results.push({ id, outcome: 'failed', error: err.message });
    }
  }

  console.log('\n=== Summary ===');
  for (const r of results) {
    const status = r.outcome === 'ok' ? 'OK' : 'FAILED';
    console.log(`  ${status.padEnd(6)} ${r.id}${r.error ? '  — ' + r.error : ''}`);
  }
  const anyFailed = results.some((r) => r.outcome !== 'ok');
  process.exit(anyFailed ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
