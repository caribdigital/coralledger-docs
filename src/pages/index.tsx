import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const complyUrl = siteConfig.customFields?.complyUrl as string;
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            style={{marginLeft: '1rem', color: 'white', borderColor: 'white'}}
            to={complyUrl}>
            Open Comply App
          </Link>
        </div>
      </div>
    </header>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <div className="row">
          <div className="col col--3">
            <div className={styles.quickLinkCard}>
              <h3>Quick Start</h3>
              <p>Get up and running in 5 minutes</p>
              <Link to="/docs/getting-started">Start Here →</Link>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.quickLinkCard}>
              <h3>Import Data</h3>
              <p>Upload transactions from CSV or Excel</p>
              <Link to="/docs/transactions/import-csv">Learn How →</Link>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.quickLinkCard}>
              <h3>VAT Returns</h3>
              <p>Generate returns with one click</p>
              <Link to="/docs/vat-returns">View Guide →</Link>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.quickLinkCard}>
              <h3>VAT Rates</h3>
              <p>10%, 5%, 0%, and exempt rates</p>
              <Link to="/docs/reference/vat-rates">Reference →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="VAT Compliance Documentation"
      description="Documentation for CoralLedger Comply - VAT compliance for Bahamian businesses">
      <HomepageHeader />
      <main>
        <QuickLinks />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
