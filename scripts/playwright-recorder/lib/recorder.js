// Per-scenario recording driver.
//
// Each scenario module exports a default object with:
//   - id          (string)   - matches the target .mp4 name in cdn.coralledger.com/demos/<id>.mp4
//   - title       (string)   - human-readable; used in run logs
//   - viewport    (object)   - { width, height }
//   - warmup      (async fn) - OPTIONAL: runs in a NON-recording context. Use this for
//                              authentication + initial navigation so the recording starts
//                              with the destination already visible (no auth-redirect flicker).
//                              Receives { page, log }.
//   - record      (async fn) - REQUIRED: runs in the recording context with `storageState`
//                              from warmup already applied. The page is fresh but the session
//                              cookies are warm. Receives { page, log }.
//
// Why two contexts?
//   Playwright's recordVideo starts capturing the moment context.newPage() is called. If auth
//   and the initial navigation happen on that page, the first 5-10s of the recording is blank /
//   redirect flicker. By doing auth in a throwaway context first, then opening the real
//   recording context with the saved storageState, the recording begins with the destination
//   already rendering — minimal blank-frame time.

import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const recordingsDir = path.join(projectRoot, 'recordings');

const COOKIE_CONSENT = {
  name: 'cookieConsent',
  value: new Date().toISOString(),
  domain: 'stg-comply.coralledger.com',
  path: '/',
  expires: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
  httpOnly: false,
  secure: true,
  sameSite: 'Lax',
};

/**
 * @param {object} scenario
 * @param {string} scenario.id
 * @param {string} scenario.title
 * @param {{width:number,height:number}} [scenario.viewport]
 * @param {(ctx:{page:import('playwright').Page, log:(msg:string)=>void}) => Promise<void>} [scenario.warmup]
 * @param {(ctx:{page:import('playwright').Page, log:(msg:string)=>void}) => Promise<void>} scenario.record
 */
export async function runScenario(scenario) {
  const viewport = scenario.viewport ?? { width: 1280, height: 720 };

  fs.mkdirSync(recordingsDir, { recursive: true });

  const log = (msg) => console.log(`[${scenario.id}] ${msg}`);

  log(`Starting recording — ${scenario.title}`);
  log(`Viewport: ${viewport.width}x${viewport.height}`);

  const browser = await chromium.launch({ headless: true });
  let storageState;

  try {
    // PHASE 1 — Warmup (throwaway context, no recording).
    if (typeof scenario.warmup === 'function') {
      log('Warmup phase (no recording yet) — establishing session.');
      const warmCtx = await browser.newContext({ viewport });
      await warmCtx.addCookies([COOKIE_CONSENT]);
      const warmPage = await warmCtx.newPage();
      try {
        await scenario.warmup({ page: warmPage, log });
      } finally {
        storageState = await warmCtx.storageState();
        await warmCtx.close();
      }
      log('Warmup complete — session captured.');
    }

    // PHASE 2 — Real recording context.
    const context = await browser.newContext({
      viewport,
      recordVideo: { dir: recordingsDir, size: viewport },
      storageState, // undefined if no warmup — fresh context for public scenarios
    });

    // Belt-and-braces: ensure cookieConsent is set even on the recording context (storageState
    // already includes it if warmup ran, but for unauthenticated scenarios there's no warmup).
    if (!storageState) {
      await context.addCookies([COOKIE_CONSENT]);
    }

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
      const videoHandle = await page.video();
      await context.close();

      if (videoHandle) {
        const rawPath = await videoHandle.path();
        videoPath = path.join(recordingsDir, `${scenario.id}.webm`);
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
  } finally {
    await browser.close();
  }
}
