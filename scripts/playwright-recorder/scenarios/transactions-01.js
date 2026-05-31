// transactions-01: Transactions — Quick Entry and Advanced Mode
//
// Target docs page: docs/transactions/manual-entry.mdx
// CDN target: cdn.coralledger.com/demos/transactions-01.mp4
// Scope: open Add Transaction dialog, hover fields, then CANCEL — no real txn created.

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'transactions-01',
  title: 'Transactions — Quick Entry and Advanced Mode',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating as etienne (BusinessOwner) — warmup.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/transactions',
    });
    await page.waitForLoadState('networkidle');
    await wait(2500);
  },

  async record({ page, log }) {
    log('Navigating to /transactions with warm session.');
    await page.goto(`${BASE}/transactions`, { waitUntil: 'networkidle' });
    await wait(2500);

    const addButton = page.getByRole('button', { name: /add.*(transaction|entry)|new.*transaction|\+\s*transaction/i }).first();
    if (await addButton.count() > 0) {
      await addButton.scrollIntoViewIfNeeded();
      await addButton.hover();
      await wait(1200);
      await addButton.click({ force: true });
      log('Dialog opened.');
      await wait(2500);

      for (const labelPattern of [/amount/i, /description/i, /vat.*(rate|category)/i, /date/i]) {
        const field = page.getByLabel(labelPattern).first();
        if (await field.count() > 0) {
          await field.hover();
          await wait(900);
        }
      }

      log('Closing the dialog without saving.');
      const cancelBtn = page.getByRole('button', { name: /cancel|close|discard/i }).first();
      if (await cancelBtn.count() > 0) {
        await cancelBtn.click({ force: true });
      } else {
        await page.keyboard.press('Escape');
      }
      await wait(1500);
    } else {
      log('Add Transaction button not found — scrolling the list instead.');
      await page.evaluate(async () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        for (let i = 0; i < 10; i++) {
          window.scrollBy({ top: total / 10, behavior: 'smooth' });
          await new Promise((r) => setTimeout(r, 300));
        }
      });
      await wait(1500);
    }

    log('Recording complete.');
  },
};
