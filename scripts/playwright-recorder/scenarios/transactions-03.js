// transactions-03: Transactions — CSV Import and Column Mapping
//
// Target docs page: docs/transactions/import-csv.mdx
// CDN target: cdn.coralledger.com/demos/transactions-03.mp4
// Scope: navigate to the CSV import landing, show the upload UI + format requirements. No
// actual file upload occurs — clicking the upload control would open a native file dialog
// that interrupts recording.

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'transactions-03',
  title: 'Transactions — CSV Import and Column Mapping',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    log('Authenticating as BusinessOwner.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/transactions/import',
    });

    await page.waitForLoadState('networkidle');
    await wait(3000);

    log('Letting the import page settle, then scrolling through the format guidance.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 14;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 320));
      }
    });
    await wait(1500);

    log('Highlighting the visible upload zone — skipping the underlying hidden file input.');
    // MudFileUpload renders a visible MudPaper/MudButton wrapper around a hidden
    // <input type="file">. Target the wrapper (visible) and avoid the hidden input.
    const dropZone = page.locator('.mud-file-upload, [class*="upload-zone"]:not(input)').first();
    if (await dropZone.count() > 0) {
      await dropZone.scrollIntoViewIfNeeded();
      await dropZone.hover();
      await wait(2500);
    } else {
      log('No visible upload-zone wrapper matched — leaving the page settled.');
    }

    log('Returning to top.');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1500);

    log('Recording complete.');
  },
};
