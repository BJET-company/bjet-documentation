---
sidebar_position: 1
title: Welcome
slug: /
---

# BJET Odoo Modules Documentation

Welcome to the comprehensive documentation hub for BJET's Odoo modules. This knowledge base provides detailed guides, API references, and configuration instructions for all BJET Odoo modules.

## Available Modules

import Link from '@docusaurus/Link';

<div className="row margin-bottom--lg">
  <div className="col col--4">
    <div className="card shadow--md">
      <div className="card__header">
        <h3>📦 API Synchronization</h3>
      </div>
      <div className="card__body">
        <p><strong>Version:</strong> 18.0.1.0.4</p>
        <p>Synchronize Odoo models with external APIs through RESTful interfaces.</p>
        <ul style={{fontSize: '0.9em'}}>
          <li>Bidirectional sync</li>
          <li>Multiple auth methods</li>
          <li>Python transformations</li>
        </ul>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to="/docs/modules/api-sync">
          View Documentation
        </Link>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card shadow--md">
      <div className="card__header">
        <h3>📝 Print Form Builder</h3>
      </div>
      <div className="card__body">
        <p><strong>Version:</strong> Coming Soon</p>
        <p>Create and customize professional print forms for your Odoo reports.</p>
        <ul style={{fontSize: '0.9em'}}>
          <li>Custom templates</li>
          <li>Drag & drop builder</li>
          <li>Professional layouts</li>
        </ul>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to="/docs/modules/print-form-builder">
          View Documentation
        </Link>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card shadow--md">
      <div className="card__header">
        <h3>💱 Import NBU Exchange Rate</h3>
      </div>
      <div className="card__body">
        <p><strong>Version:</strong> 18.0.1.0.2</p>
        <p>Automatic and manual import of exchange rates from the National Bank of Ukraine.</p>
        <ul style={{fontSize: '0.9em'}}>
          <li>Automatic rate updates</li>
          <li>Manual import by period</li>
          <li>Scheduler configuration</li>
        </ul>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to="/docs/modules/import-nbu-exchange-rate">
          View Documentation
        </Link>
      </div>
    </div>
  </div>
</div>

<div className="row margin-bottom--lg">
  <div className="col col--4">
    <div className="card shadow--md">
      <div className="card__header">
        <h3>🏦 Monobank Statement Import</h3>
      </div>
      <div className="card__body">
        <p><strong>Version:</strong> 18.0.1.0.1</p>
        <p>Direct integration between Monobank and Odoo for automatic bank statement import.</p>
        <ul style={{fontSize: '0.9em'}}>
          <li>Automatic statement import</li>
          <li>Manual import by date range</li>
          <li>Duplicate transaction prevention</li>
        </ul>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to="/docs/modules/monobank-statement-import">
          View Documentation
        </Link>
      </div>
    </div>
  </div>

  <div className="col col--4">
     <div className="card shadow--md">
       <div className="card__header">
         <h3>🏦 PrivatBank 24 business: import of bank statement </h3>
       </div>
       <div className="card__body">
         <p><strong>Version:</strong> 18.0.1.0.4</p>
         <p>Importing bank statements from PrivatBank</p>
         <ul style={{fontSize: '0.9em'}}>
           <li>Automatic statement import</li>
           <li>Manual import by date range</li>
           <li>Duplicate transaction prevention</li>
          </ul>
       </div>
       <div className="card__footer">
         <Link
           className="button button--primary button--block"
           to="/docs/modules/privatbank-autoclient-statement-import">
           View Documentation
         </Link>
       </div>
     </div>
  </div>
</div>

  

## Quick Links

- 📚 [API Sync Configuration Guide](/docs/modules/api-sync/configuration/overview)
- 🔧 [Python Scripts Reference](/docs/modules/api-sync/python-scripts/context-variables)
- 📮 [Download Postman Collection](/postman)
- ❓ [Troubleshooting Guide](/docs/modules/api-sync/troubleshooting)

## Support & Resources

### Professional Support
- **Website:** [https://bjetpro.com/](https://bjetpro.com/)
- **Email:** [support@bjetpro.com](mailto:support@bjetpro.com)
- **Commercial Support:** Available for enterprise deployments

### Module Compatibility
All modules are designed for **Odoo 18.0** and follow BJET's quality standards for enterprise deployment.

## How to Use This Documentation

1. **Select a Module** - Choose the Odoo module you want to learn about
2. **Follow the Guides** - Each module has step-by-step configuration guides
3. **Reference the API** - Use the API documentation for integration
4. **Download Tools** - Get Postman collections and other resources
5. **Get Support** - Contact BJET for professional assistance

---

*This documentation is continuously updated as new modules and features are released.*