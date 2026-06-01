// share-links-01: Shared Reports — Creating and Managing Secure Share Links
//
// Target docs page: docs/reports/shared-reports.mdx
// CDN target: cdn.coralledger.com/demos/share-links-01.mp4
// Surface: the "Manage Shared Links" button on /vatreturns (VATReturns.razor:125 calls
// OpenManageSharedLinksDialog → opens a real dialog). The Cash Flow Report surface has
// no share affordance, so drive from /vatreturns instead.

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'share-links-01',
  title: 'Shared Reports — Creating and Managing Secure Share Links',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating (default firm user) — warmup.');
    await authenticateViaTestAuth(page, { redirectTo: '/vatreturns' });
    await page.waitForLoadState('networkidle');
    await wait(3000);
  },

  async record({ page, log }) {
    log('Navigating to /vatreturns with warm session.');
    await page.goto(`${BASE}/vatreturns`, { waitUntil: 'networkidle' });
    await wait(3500);

    log('Locating "Manage Shared Links" action button.');
    const shareBtn = page.getByRole('button', { name: /manage.*shared.*link|shared.*link/i }).first();
    if (await shareBtn.count() > 0) {
      await shareBtn.scrollIntoViewIfNeeded();
      await shareBtn.hover();
      await wait(2500);
      await shareBtn.click({ force: true });

      log('Manage Shared Links dialog opened — dwelling.');
      await wait(5000);

      // Optional: scroll within the dialog if it has content.
      const dialog = page.locator('.mud-dialog').first();
      if (await dialog.count() > 0) {
        await dialog.hover();
        await wait(2000);
      }

      log('Closing the dialog without changes.');
      const cancelBtn = page.getByRole('button', { name: /cancel|close|done/i }).first();
      if (await cancelBtn.count() > 0) {
        await cancelBtn.click({ force: true });
      } else {
        await page.keyboard.press('Escape');
      }
      await wait(2500);
    } else {
      log('Manage Shared Links button not found — scrolling /vatreturns as fallback.');
      await page.evaluate(async () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        for (let i = 0; i < 14; i++) {
          window.scrollBy({ top: total / 14, behavior: 'smooth' });
          await new Promise((r) => setTimeout(r, 380));
        }
      });
      await wait(2500);
    }

    log('Final dwell on the page.');
    await wait(3000);
    log('Recording complete.');
  },
};
