import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/">
            📚 Browse Documentation
          </Link>
          <Link
            className="button button--primary button--lg margin-left--md"
            to="/docs/modules/api-sync/quick-start">
            🚀 Quick Start Guide
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Comprehensive documentation for BJET Odoo modules including API Synchronization, automation, and integration guides">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl">
          <div className="row">
            <div className="col col--12">
              <h2 className="text--center margin-bottom--lg">Available Modules</h2>
            </div>
          </div>
          <div className="row">
            <div className="col col--4">
              <div className="card shadow--md">
                <div className="card__header">
                  <h3>🔄 API Synchronization Module</h3>
                </div>
                <div className="card__body">
                  <p>
                    Version 18.0.1.0.2 - Comprehensive bidirectional API integration for Odoo 18.0
                  </p>
                  <ul>
                    <li>Inbound & Outbound APIs</li>
                    <li>Multiple Authentication Methods</li>
                    <li>Python Script Transformations</li>
                    <li>Field Mapping & Automation</li>
                  </ul>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--primary button--block"
                    to="/docs/modules/api-sync/">
                    View Documentation
                  </Link>
                </div>
              </div>
            </div>
            <div className="col col--4">
              <div className="card shadow--md">
                <div className="card__header">
                  <h3>📊 Coming Soon</h3>
                </div>
                <div className="card__body">
                  <p>
                    More BJET modules documentation will be added here as they become available.
                  </p>
                  <p className="margin-top--md">
                    Check back regularly for updates on new module documentation and features.
                  </p>
                </div>
                <div className="card__footer">
                  <button className="button button--secondary button--block" disabled>
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
            <div className="col col--4">
              <div className="card shadow--md">
                <div className="card__header">
                  <h3>🛠️ Resources</h3>
                </div>
                <div className="card__body">
                  <p>
                    Essential tools and resources for working with BJET modules.
                  </p>
                  <ul>
                    <li><Link to="/postman">Postman Collections</Link></li>
                    <li><Link to="/docs/modules/api-sync/troubleshooting">Troubleshooting</Link></li>
                    <li><Link to="/docs/modules/api-sync/faq">FAQ</Link></li>
                    <li><a href="https://bjetpro.com" target="_blank">BJET Website</a></li>
                  </ul>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--outline button--primary button--block"
                    to="/postman">
                    Download Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row margin-top--xl">
            <div className="col col--12 text--center">
              <h2>Need Help?</h2>
              <p className="hero__subtitle">
                Our support team is here to assist you with any questions about BJET modules.
              </p>
              <div className={styles.buttons}>
                <a
                  className="button button--primary button--lg"
                  href="mailto:support@bjetpro.com">
                  📧 Contact Support
                </a>
                <a
                  className="button button--outline button--primary button--lg margin-left--md"
                  href="https://bjetpro.com"
                  target="_blank">
                  🌐 Visit BJET Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}