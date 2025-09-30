import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <Translate id="homepage.title">BJET Odoo Modules Documentation</Translate>
        </h1>
        <p className="hero__subtitle">
          <Translate id="homepage.tagline">Comprehensive Documentation for BJET Odoo Modules</Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/">
            <Translate id="homepage.button.documentation">📚 Browse Documentation</Translate>
          </Link>
          <Link
            className="button button--primary button--lg margin-left--md"
            to="/docs/modules/api-sync/quick-start">
            <Translate id="homepage.button.quickstart">🚀 Quick Start Guide</Translate>
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
              <h2 className="text--center margin-bottom--lg"><Translate id="homepage.availableModules">Available Modules</Translate></h2>
            </div>
          </div>
          <div className="row">
            <div className="col col--4">
              <div className="card shadow--md">
                <div className="card__header">
                  <h3><Translate id="homepage.apiSync.title">🔄 API Synchronization Module</Translate></h3>
                </div>
                <div className="card__body">
                  <p>
                    <Translate id="homepage.apiSync.description">Version 18.0.1.0.4 - Comprehensive bidirectional API integration for Odoo 18.0</Translate>
                  </p>
                  <ul>
                    <li><Translate id="homepage.apiSync.features.inbound">Inbound & Outbound APIs</Translate></li>
                    <li><Translate id="homepage.apiSync.features.auth">Multiple Authentication Methods</Translate></li>
                    <li><Translate id="homepage.apiSync.features.python">Python Script Transformations</Translate></li>
                    <li><Translate id="homepage.apiSync.features.mapping">Field Mapping & Automation</Translate></li>
                  </ul>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--primary button--block"
                    to="/docs/modules/api-sync/">
                    <Translate id="homepage.apiSync.button">View Documentation</Translate>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col col--4">
              <div className="card shadow--md">
                <div className="card__header">
                  <h3><Translate id="homepage.comingSoon.title">📊 Coming Soon</Translate></h3>
                </div>
                <div className="card__body">
                  <p>
                    <Translate id="homepage.comingSoon.description1">More BJET modules documentation will be added here as they become available.</Translate>
                  </p>
                  <p className="margin-top--md">
                    <Translate id="homepage.comingSoon.description2">Check back regularly for updates on new module documentation and features.</Translate>
                  </p>
                </div>
                <div className="card__footer">
                  <button className="button button--secondary button--block" disabled>
                    <Translate id="homepage.comingSoon.button">Coming Soon</Translate>
                  </button>
                </div>
              </div>
            </div>
            <div className="col col--4">
              <div className="card shadow--md">
                <div className="card__header">
                  <h3><Translate id="homepage.resources.title">🛠️ Resources</Translate></h3>
                </div>
                <div className="card__body">
                  <p>
                    <Translate id="homepage.resources.description">Essential tools and resources for working with BJET modules.</Translate>
                  </p>
                  <ul>
                    <li><Link to="/postman"><Translate id="homepage.resources.postman">Postman Collections</Translate></Link></li>
                    <li><Link to="/docs/modules/api-sync/troubleshooting"><Translate id="homepage.resources.troubleshooting">Troubleshooting</Translate></Link></li>
                    <li><Link to="/docs/modules/api-sync/faq"><Translate id="homepage.resources.faq">FAQ</Translate></Link></li>
                    <li><a href="https://bjetpro.com" target="_blank"><Translate id="homepage.resources.website">BJET Website</Translate></a></li>
                  </ul>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--outline button--primary button--block"
                    to="/postman">
                    <Translate id="homepage.resources.button">Download Tools</Translate>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row margin-top--xl">
            <div className="col col--12 text--center">
              <h2><Translate id="homepage.help.title">Need Help?</Translate></h2>
              <p className="hero__subtitle">
                <Translate id="homepage.help.description">Our support team is here to assist you with any questions about BJET modules.</Translate>
              </p>
              <div className={styles.buttons}>
                <a
                  className="button button--primary button--lg"
                  href="mailto:support@bjetpro.com">
                  <Translate id="homepage.help.contact">📧 Contact Support</Translate>
                </a>
                <a
                  className="button button--outline button--primary button--lg margin-left--md"
                  href="https://bjetpro.com"
                  target="_blank">
                  <Translate id="homepage.help.website">🌐 Visit BJET Website</Translate>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}