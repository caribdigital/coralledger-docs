// client-management-02: Firm Portal — Adding and Managing Clients
//
// Target docs page: docs/firm-portal/index.mdx
// CDN target: cdn.coralledger.com/demos/client-management-02.mp4
// Flow: start at /firm/clients (the rich list view), hover + click "+ Add Client" which
// navigates to /firm/clients/onboard, dwell on the onboarding wizard. End there — don't
// navigate back to the list (that would make the wizard be the BULK of the video while
// the final frame is the list, mismatching the docs page).

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
      redirectTo: '/firm/clients',
    });
    await page.waitForLoadState('networkidle');
    await wait(3000);
  },

  async record({ page, log }) {
    log('Starting on /firm/clients (client list with KPI cards).');
    await page.goto(`${BASE}/firm/clients`, { waitUntil: 'networkidle' });
    await wait(3500);

    log('Hovering the "+ Add Client" primary action.');
    const addBtn = page.getByRole('button', { name: /add.*client|invite.*client/i }).first();
    if (await addBtn.count() > 0) {
      await addBtn.scrollIntoViewIfNeeded();
      await addBtn.hover();
      await wait(2500);

      log('Clicking Add Client → /firm/clients/onboard.');
      await addBtn.click({ force: true });
      await page.waitForLoadState('networkidle');
      await wait(3500);
    } else {
      // Fallback: direct nav.
      log('Add Client button not found by name; navigating directly to /firm/clients/onboard.');
      await page.goto(`${BASE}/firm/clients/onboard`, { waitUntil: 'networkidle' });
      await wait(3500);
    }

    log('Scrolling through the onboarding wizard form.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 18;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 380));
      }
    });
    await wait(2000);

    log('Hovering wizard fields one at a time (no typing).');
    for (const labelPattern of [/business.*name|company.*name/i, /trn|tax.*number/i, /address|street/i, /email|contact/i, /phone/i]) {
      const field = page.getByLabel(labelPattern).first();
      if (await field.count() > 0) {
        await field.scrollIntoViewIfNeeded();
        await field.hover();
        await wait(1400);
      }
    }

    log('Final dwell on the onboarding wizard.');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(3500);
    log('Recording complete (wizard remains on-screen — never submitted).');
  },
};
