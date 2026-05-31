// vat-returns-01: VAT Returns — Selecting a Period and Reviewing Summary
//
// Target docs page: docs/vat-returns/generate-return.mdx
// CDN target: cdn.coralledger.com/demos/vat-returns-01.mp4
// Scope: open the Create VAT Return dialog, demonstrate period + year selection, CANCEL.
// No return is created — staging must not be polluted.

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'vat-returns-01',
  title: 'VAT Returns — Selecting a Period and Reviewing Summary',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    log('Authenticating as BusinessOwner.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/vatreturns',
    });

    await page.waitForLoadState('networkidle');
    await wait(3000);

    log('Locating the Create / New VAT Return primary action.');
    const createButton = page.getByRole('button', { name: /create.*(return|vat)|new.*(return|vat)|\+\s*return/i }).first();
    if (await createButton.count() > 0) {
      await createButton.scrollIntoViewIfNeeded();
      await createButton.hover();
      await wait(1500);
      await createButton.click({ force: true });
      log('Create-return dialog opened.');
      await wait(2500);

      // Hover the period dropdown to surface the calendar/period UI without committing.
      for (const labelPattern of [/period/i, /month/i, /year/i, /quarter/i]) {
        const field = page.getByLabel(labelPattern).first();
        if (await field.count() > 0) {
          await field.hover();
          await wait(900);
        }
      }

      log('Closing the dialog without creating a return.');
      const cancelBtn = page.getByRole('button', { name: /cancel|close|discard/i }).first();
      if (await cancelBtn.count() > 0) {
        await cancelBtn.click({ force: true });
      } else {
        await page.keyboard.press('Escape');
      }
      await wait(1500);
    } else {
      log('Create return button not found; scrolling the returns list.');
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
