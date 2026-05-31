// client-management-02: Firm Portal — Adding and Managing Clients
//
// Target docs page: docs/firm-portal/index.mdx
// CDN target: cdn.coralledger.com/demos/client-management-02.mp4
// Scope: open the firm-portal client onboarding wizard and walk the first step or two,
// then CANCEL. No real client business is created — staging dataset must not be polluted.

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'client-management-02',
  title: 'Firm Portal — Adding and Managing Clients',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    log('Authenticating as Firm Owner.');
    await authenticateViaTestAuth(page, {
      email: 'ksaconsultantsltd@gmail.com',
      redirectTo: '/firm/clients/onboard',
    });

    await page.waitForLoadState('networkidle');
    await wait(3500);

    log('Scrolling the onboarding wizard to surface the form sections.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 14;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 320));
      }
    });
    await wait(1800);

    log('Hovering key onboarding fields (no typing — keeps the form clean).');
    for (const labelPattern of [/business.*name/i, /trn|tax.*number/i, /address/i, /email/i]) {
      const field = page.getByLabel(labelPattern).first();
      if (await field.count() > 0) {
        await field.scrollIntoViewIfNeeded();
        await field.hover();
        await wait(1100);
      }
    }

    log('Navigating back to /firm/clients without submitting.');
    await page.goto('https://stg-comply.coralledger.com/firm/clients', {
      waitUntil: 'networkidle',
    });
    await wait(2000);
    log('Recording complete.');
  },
};
