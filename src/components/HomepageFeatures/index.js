import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy Integration',
    description: (
      <>
        BJET modules are designed to integrate seamlessly with your existing Odoo installation,
        providing powerful API capabilities without disrupting your workflow.
      </>
    ),
  },
  {
    title: 'Comprehensive Documentation',
    description: (
      <>
        Every feature is thoroughly documented with examples, best practices, and troubleshooting
        guides to help you get the most out of BJET modules.
      </>
    ),
  },
  {
    title: 'Enterprise Ready',
    description: (
      <>
        Built for scale and reliability, BJET modules support enterprise-grade deployments with
        advanced security, performance optimization, and monitoring capabilities.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}