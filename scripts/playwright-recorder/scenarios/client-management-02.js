// client-management-02: Firm Portal — Adding and Managing Clients
//
// Target docs page: docs/firm-portal/index.mdx
// CDN target: cdn.coralledger.com/demos/client-management-02.mp4
// Scope: walk through onboarding wizard, CANCEL — no client business created.

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'client-management-02',
  title: 'Firm Portal — Adding and Managing Clients',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating as Firm Owner — warmup.');
    await authenticateViaTestAuth(page, {
      email: 'ksaconsultantsltd@gmail.com',
      redirectTo: '/firm/clients/onboard',
    });
    await page.waitForLoadState('networkidle');
    await wait(3000);
  },

  async record({ page, log }) {
    log('Navigating to /firm/clients/onboard with warm session.');
    await page.goto(`${BASE}/firm/clients/onboard`, { waitUntil: 'networkidle' });
    await wait(3000);

    log('Scrolling the onboarding wizard.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 14;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 320));
      }
    });
    await wait(1500);

    log('Hovering key onboarding fields (no typing).');
    for (const labelPattern of [/business.*name/i, /trn|tax.*number/i, /address/i, /email/i]) {
      const field = page.getByLabel(labelPattern).first();
      if (await field.count() > 0) {
        await field.scrollIntoViewIfNeeded();
        await field.hover();
        await wait(1100);
      }
    }

    log('Navigating back to /firm/clients without submitting.');
    await page.goto(`${BASE}/firm/clients`, { waitUntil: 'networkidle' });
    await wait(1800);
    log('Recording complete.');
  },
};
