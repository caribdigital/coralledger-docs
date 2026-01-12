import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CoralLedger Comply Documentation',
  tagline: 'VAT Compliance Made Simple for The Bahamas',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.coralledger.com',
  baseUrl: '/',

  organizationName: 'caribdigital',
  projectName: 'coralledger-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/caribdigital/coralledger-docs/tree/main/',
          routeBasePath: 'docs',
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/coralledger-social-card.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Comply Docs',
      logo: {
        alt: 'CoralLedger Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://comply.coralledger.com',
          label: 'Open Comply',
          position: 'right',
        },
        {
          href: 'https://coralledger.com',
          label: 'CoralLedger',
          position: 'right',
        },
        {
          href: 'https://github.com/caribdigital/coralledger-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Transactions',
              to: '/docs/transactions',
            },
            {
              label: 'VAT Returns',
              to: '/docs/vat-returns',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Comply',
              href: 'https://comply.coralledger.com',
            },
            {
              label: 'Point POS',
              href: 'https://point.coralledger.com',
            },
            {
              label: 'Pricing',
              href: 'https://coralledger.com/#pricing',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Contact Us',
              href: 'mailto:support@coralledger.com',
            },
            {
              label: 'System Status',
              href: 'https://status.coralledger.com',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Caribbean Digital Labs. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
