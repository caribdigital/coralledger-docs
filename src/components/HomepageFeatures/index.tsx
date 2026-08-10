import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: 'landmark' | 'shield' | 'clipboard' | 'check' | 'building' | 'transfer';
  description: ReactNode;
};

const iconPaths: Record<FeatureItem['icon'], ReactNode> = {
  landmark: <><path d="M3 10h18"/><path d="M5 10V20M9 10V20M15 10V20M19 10V20M2 20h20M12 3 3 8h18z"/></>,
  shield: <path d="M12 3 4 6v5c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6z"/>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4a3 3 0 0 1 6 0v2H9zM9 11h6M9 15h6"/></>,
  check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
  building: <><path d="M4 21V5h10v16M14 9h6v12M8 9h2M8 13h2M8 17h2M17 13h1M17 17h1"/></>,
  transfer: <><path d="M7 7h13l-3-3M17 17H4l3 3"/><path d="m20 7-3 3M4 17l3-3"/></>,
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Built for The Bahamas',
    icon: 'landmark',
    description: (
      <>
        Designed specifically for VAT compliance under The Bahamas VAT Act 2014
        as amended through 2026. Supports standard (10%), reduced (5%), zero-rated, and
        exempt supplies with dedicated compliance dashboards.
      </>
    ),
  },
  {
    title: 'Audit Defense',
    icon: 'shield',
    description: (
      <>
        Immutable hash-chain verified audit trail with 7-year retention.
        Export a complete audit defense package - transaction log, rate
        classifications, and apportionment workings - in one click.
      </>
    ),
  },
  {
    title: 'Validated Returns',
    icon: 'clipboard',
    description: (
      <>
        Generate VAT returns with 10-point pre-flight validation. Preview totals,
        catch errors before filing, and export in PDF, XML, or Excel formats
        for review and external lodgement.
      </>
    ),
  },
  {
    title: 'Compliance Scoring',
    icon: 'check',
    description: (
      <>
        Real-time compliance score from A to F based on data quality, timeliness,
        accuracy, and completeness. Anomaly detection alerts you to potential issues.
      </>
    ),
  },
  {
    title: 'Firm Portal',
    icon: 'building',
    description: (
      <>
        Perfect for accounting firms. Batch return preparation for multiple clients, firm-wide
        analytics, staff productivity tracking, and centralized deadline management.
      </>
    ),
  },
  {
    title: 'Import & Export',
    icon: 'transfer',
    description: (
      <>
        Import transactions via CSV or Excel from any accounting system. Column
        mappings are proposed for your review based on header text, with manual
        override available. Export returns, audit trails, and reports in PDF,
        CSV, XML, or Excel format.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {iconPaths[icon]}
        </svg>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Why CoralLedger Comply?
        </Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
