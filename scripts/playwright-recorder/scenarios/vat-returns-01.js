// vat-returns-01: VAT Returns — Selecting a Period and Reviewing Summary
//
// Target docs page: docs/vat-returns/generate-return.mdx
// CDN target: cdn.coralledger.com/demos/vat-returns-01.mp4
// Scope: open Create VAT Return dialog, hover period fields, CANCEL.

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'vat-returns-01',
  title: 'VAT Returns — Selecting a Period and Reviewing Summary',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating as etienne — warmup.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/vatreturns',
    });
    await page.waitForLoadState('networkidle');
    await wait(2500);
  },

  async record({ page, log }) {
    log('Navigating to /vatreturns with warm session.');
    await page.goto(`${BASE}/vatreturns`, { waitUntil: 'networkidle' });
    await wait(2500);

    const createButton = page.getByRole('button', { name: /create.*(return|vat)|new.*(return|vat)|\+\s*return/i }).first();
    if (await createButton.count() > 0) {
      await createButton.scrollIntoViewIfNeeded();
      await createButton.hover();
      await wait(1200);
      await createButton.click({ force: true });
      log('Create-return dialog opened.');
      await wait(2500);

      for (const labelPattern of [/period/i, /month/i, /year/i, /quarter/i]) {
        const field = page.getByLabel(labelPattern).first();
        if (await field.count() > 0) {
          await field.hover();
          await wait(900);
        }
      }

      log('Closing dialog without creating a return.');
      const cancelBtn = page.getByRole('button', { name: /cancel|close|discard/i }).first();
      if (await cancelBtn.count() > 0) {
        await cancelBtn.click({ force: true });
      } else {
        await page.keyboard.press('Escape');
      }
      await wait(1500);
    }

    log('Recording complete.');
  },
};
