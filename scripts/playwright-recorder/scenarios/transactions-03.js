// transactions-03: Transactions — CSV Import and Column Mapping
//
// Target docs page: docs/transactions/import-csv.mdx
// CDN target: cdn.coralledger.com/demos/transactions-03.mp4
// Scope: navigate the CSV import landing; no file actually uploaded.

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'transactions-03',
  title: 'Transactions — CSV Import and Column Mapping',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating as etienne — warmup.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/transactions/import',
    });
    await page.waitForLoadState('networkidle');
    await wait(2500);
  },

  async record({ page, log }) {
    log('Navigating to /transactions/import with warm session.');
    await page.goto(`${BASE}/transactions/import`, { waitUntil: 'networkidle' });
    await wait(2500);

    log('Scrolling through format guidance.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 14;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 320));
      }
    });
    await wait(1500);

    log('Highlighting the visible upload-zone wrapper (skipping hidden file input).');
    const dropZone = page.locator('.mud-file-upload, [class*="upload-zone"]:not(input)').first();
    if (await dropZone.count() > 0) {
      await dropZone.scrollIntoViewIfNeeded();
      await dropZone.hover();
      await wait(2500);
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1200);
    log('Recording complete.');
  },
};
