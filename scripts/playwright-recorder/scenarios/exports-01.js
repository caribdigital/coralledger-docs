// exports-01: Reports — Export Formats and Download Options
//
// Target docs page: docs/reports/index.mdx
// CDN target: cdn.coralledger.com/demos/exports-01.mp4
// Scope: read-only navigation of the Reports section showing the available report types
// and their export formats. Does NOT trigger any actual export download (browser save
// dialogs would interrupt the recording).

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'exports-01',
  title: 'Reports — Export Formats and Download Options',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    log('Authenticating via TestAuth bypass.');
    await authenticateViaTestAuth(page, { redirectTo: '/dashboard' });

    await page.waitForLoadState('networkidle');
    await wait(1500);

    log('Navigating to the Reports landing.');
    // The /reports landing is the canonical entry to multi-report navigation.
    await page.goto('https://stg-comply.coralledger.com/reports', {
      waitUntil: 'networkidle',
    });
    await wait(2500);

    log('Scrolling through the Reports section to show available reports.');
    await page.evaluate(async () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 16;
      const step = totalScroll / steps;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: step, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 250));
      }
    });
    await wait(1500);

    log('Demonstrating the Cash Flow Report surface — Export CSV button.');
    await page.goto('https://stg-comply.coralledger.com/reports/cashflow', {
      waitUntil: 'networkidle',
    });
    await wait(2500);

    // Hover the Export CSV button without clicking (clicking triggers a file download
    // which would interrupt video recording and may bloat the .webm).
    const exportButton = page.getByRole('button', { name: /export.*csv/i }).first();
    if (await exportButton.count() > 0) {
      await exportButton.scrollIntoViewIfNeeded();
      await exportButton.hover();
      await wait(2000);
    } else {
      log('Export CSV button not found by role/name; skipping hover.');
    }

    log('Closing on the Cash Flow Report landing.');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1500);

    log('Recording complete.');
  },
};
