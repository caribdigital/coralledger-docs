// share-links-01: Shared Reports — Creating and Managing Secure Share Links
//
// Target docs page: docs/reports/shared-reports.mdx
// CDN target: cdn.coralledger.com/demos/share-links-01.mp4
// Scope: navigate to the shared-reports surface, show the create-link UI if available.
// Does NOT actually create a share link.

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'share-links-01',
  title: 'Shared Reports — Creating and Managing Secure Share Links',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    // NOTE: /reports/shared/{ShareToken} is the public recipient view (requires a token).
    // There's no "manage share links" landing page — sharing originates from individual
    // report surfaces. Drive from /reports/cashflow which has a Share button.
    log('Authenticating as BusinessOwner.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/reports/cashflow',
    });

    await page.waitForLoadState('networkidle');
    await wait(3000);

    log('Scrolling through the report to surface the share affordance.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 12;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 300));
      }
    });
    await wait(1500);

    log('Locating a Create Share Link button (best-effort).');
    const createBtn = page.getByRole('button', { name: /create.*(share|link)|new.*(share|link)|share/i }).first();
    if (await createBtn.count() > 0) {
      await createBtn.scrollIntoViewIfNeeded();
      await createBtn.hover();
      await wait(2000);
      await createBtn.click({ force: true });
      await wait(2500);

      log('Closing the create-link dialog without committing.');
      const cancelBtn = page.getByRole('button', { name: /cancel|close|discard/i }).first();
      if (await cancelBtn.count() > 0) {
        await cancelBtn.click({ force: true });
      } else {
        await page.keyboard.press('Escape');
      }
      await wait(1200);
    } else {
      log('No Create Share Link control matched.');
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1500);
    log('Recording complete.');
  },
};
