// Per-scenario recording driver.
//
// Each scenario module exports:
//   - id          (string)  - matches the target .mp4 name in cdn.coralledger.com/demos/<id>.mp4
//   - title       (string)  - human-readable; used in run logs
//   - viewport    (object)  - { width, height }
//   - record      (async fn) - receives { page, log } and drives the workflow
//
// The recorder wraps each scenario in a fresh BrowserContext with `recordVideo`. The .webm
// file is finalised when the context closes. The downstream conversion to .mp4 is handled
// by scripts/convert-marketing-videos.sh (existing).

import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const recordingsDir = path.join(projectRoot, 'recordings');

/**
 * @param {object} scenario
 * @param {string} scenario.id
 * @param {string} scenario.title
 * @param {{width:number,height:number}} [scenario.viewport]
 * @param {(ctx:{page:import('playwright').Page, log:(msg:string)=>void}) => Promise<void>} scenario.record
 */
export async function runScenario(scenario) {
  const viewport = scenario.viewport ?? { width: 1280, height: 720 };

  // Ensure recordings/ exists.
  fs.mkdirSync(recordingsDir, { recursive: true });

  const log = (msg) => console.log(`[${scenario.id}] ${msg}`);

  log(`Starting recording — ${scenario.title}`);
  log(`Viewport: ${viewport.width}x${viewport.height}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport,
    recordVideo: {
      dir: recordingsDir,
      size: viewport,
    },
  });
  const page = await context.newPage();

  let outcome = 'failed';
  let videoPath;
  try {
    await scenario.record({ page, log });
    outcome = 'ok';
  } catch (err) {
    log(`ERROR: ${err.message}`);
    throw err;
  } finally {
    // Capture the video object BEFORE context.close() so we can rename the file once it's
    // finalised. Playwright assigns random filenames; we rename to <id>.webm so downstream
    // conversion has a stable input.
    const videoHandle = await page.video();
    await context.close();
    await browser.close();

    if (videoHandle) {
      const rawPath = await videoHandle.path();
      videoPath = path.join(recordingsDir, `${scenario.id}.webm`);
      // Move/rename. Playwright writes to a randomised path under recordings/.
      try {
        if (fs.existsSync(videoPath)) fs.rmSync(videoPath);
        fs.renameSync(rawPath, videoPath);
        log(`Saved → ${path.relative(projectRoot, videoPath)}`);
      } catch (err) {
        log(`WARNING: could not rename ${rawPath} → ${videoPath}: ${err.message}`);
        log(`Raw file may still be present at: ${rawPath}`);
      }
    } else {
      log('WARNING: no video handle returned by Playwright — recording lost.');
    }
  }

  return { outcome, videoPath };
}
