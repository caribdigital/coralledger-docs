// transactions-01: Transactions — Quick Entry and Advanced Mode
//
// Target docs page: docs/transactions/manual-entry.mdx
// CDN target: cdn.coralledger.com/demos/transactions-01.mp4
// Scope: open the Add Transaction dialog, hover fields, then CANCEL (no real transaction
// created — the staging dataset must not be polluted).

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'transactions-01',
  title: 'Transactions — Quick Entry and Advanced Mode',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    log('Authenticating as BusinessOwner.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/transactions',
    });

    await page.waitForLoadState('networkidle');
    await wait(3000);

    log('Locating the Add Transaction (or similar) primary action.');
    const addButton = page.getByRole('button', { name: /add.*(transaction|entry)|new.*transaction|\+\s*transaction/i }).first();
    if (await addButton.count() > 0) {
      await addButton.scrollIntoViewIfNeeded();
      await addButton.hover();
      await wait(1500);
      await addButton.click({ force: true });
      log('Dialog opened — letting fields render.');
      await wait(2500);

      // Hover a few key fields without typing — keeps the recording clean and avoids any
      // accidental form submission.
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
      log('Add Transaction button not found; scrolling the transactions list instead.');
      await page.evaluate(async () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const steps = 10;
        for (let i = 0; i < steps; i++) {
          window.scrollBy({ top: total / steps, behavior: 'smooth' });
          await new Promise((r) => setTimeout(r, 300));
        }
      });
      await wait(1500);
    }

    log('Recording complete.');
  },
};
