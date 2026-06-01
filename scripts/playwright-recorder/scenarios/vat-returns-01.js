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

    // The toolbar primary action is labeled "New Return" (icon prefix in the visual). The
    // accessibility name doesn't include the icon, so match plain "New Return" / "Create Return".
    const createButton = page.getByRole('button', { name: /^new\s+return$|^create\s+return$|create\s+vat\s+return|new\s+vat\s+return/i }).first();
    if (await createButton.count() > 0) {
      await createButton.scrollIntoViewIfNeeded();
      await createButton.hover();
      await wait(2000);
      await createButton.click({ force: true });
      log('Create-return dialog opened — dwelling on period selectors.');
      await wait(4500);

      for (const labelPattern of [/period/i, /month/i, /year/i, /quarter/i, /tax.*period/i, /filing.*type|return.*type/i]) {
        const field = page.getByLabel(labelPattern).first();
        if (await field.count() > 0) {
          await field.hover();
          await wait(1800);
        }
      }

      log('Holding on the populated dialog.');
      await wait(3500);

      log('Closing dialog without creating a return.');
      const cancelBtn = page.getByRole('button', { name: /cancel|close|discard/i }).first();
      if (await cancelBtn.count() > 0) {
        await cancelBtn.click({ force: true });
      } else {
        await page.keyboard.press('Escape');
      }
      await wait(2000);
    } else {
      // Fallback: dwell on the returns list page if no create button surfaces.
      log('Create return button not found — dwelling on the list view.');
      await page.evaluate(async () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        for (let i = 0; i < 10; i++) {
          window.scrollBy({ top: total / 10, behavior: 'smooth' });
          await new Promise((r) => setTimeout(r, 320));
        }
      });
      await wait(2500);
    }

    log('Recording complete.');
  },
};
