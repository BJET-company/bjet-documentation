---
sidebar_position: 1
title: API Synchronization Module
sidebar_label: Overview
---

# API Synchronization Module

**Version:** 18.0.1.0.2  
**License:** OPL-1  
**Author:** BJET  
**Compatibility:** Odoo 18.0

## Module Overview

The API Synchronization Module is a comprehensive solution that enables seamless bidirectional data integration between Odoo and external systems through RESTful APIs. This enterprise-grade module offers advanced configuration options for virtually any integration scenario.

## Core Features

### 🔄 Bidirectional Synchronization
- **Inbound Processing** – Receive data from external systems into Odoo
- **Outbound Processing** – Send Odoo data to external systems

### ⚡ Integration Modes
- **Real-Time Integration** – Synchronize data immediately as changes occur
- **Scheduled Operations** – Automated synchronization through cron jobs

### 🔐 Authentication Support
- **No Authentication** – For public or internal APIs
- **Basic Authentication** – Username and password access
- **Bearer Token** – API key or token authentication
- **Custom Headers** – Additional authentication headers

### 🌐 HTTP Protocol Support
- **Full REST Support** – GET, POST, PUT, and DELETE methods
- **Custom Endpoints** – Configurable API endpoint definitions
- **Parameter Handling** – URL parameters and query strings
- **Header Management** – Custom HTTP headers configuration

### 🔧 Data Transformation
- **Field Mapping** – Visual alignment between Odoo fields and API keys
- **Python Scripting** – Advanced data transformations
- **Value Calculation** – Multiple methods for computing values
- **Relational Data** – Support for Many2one, One2many, Many2many

### 🤖 Automation Integration
- **Cron Jobs** – Schedule-based automatic synchronization
- **Server Actions** – Manual triggers via Odoo interface
- **Base Automation** – Event-driven synchronization
- **Trigger Configuration** – Flexible synchronization rules

### 📊 Monitoring and Debugging
- **Request Logging** – Complete audit trail of API communications
- **Error Tracking** – Detailed error messages with status codes
- **Performance Settings** – Configurable timeouts
- **Debug Support** – Comprehensive troubleshooting logs

## Quick Start Guide

### Step 1: Access Configuration
Navigate to **Settings > Technical > BJ API > API Configurations**

### Step 2: Create Configuration
Click **Create** and choose between:
- **Inbound** - Receive data from external systems
- **Outbound** - Send data to external systems

### Step 3: Configure Authentication
Select your authentication method:
- No Auth
- Basic Auth (username/password)
- Bearer Token (API key)

### Step 4: Set Up Field Mappings
Map Odoo fields to external API keys:
- Select Odoo field
- Enter corresponding API key
- Choose value calculation type
- Mark one field as record identifier

### Step 5: Test and Deploy
- Save configuration
- Test with sample data
- Monitor logs for results
- Deploy to production

## Module Components

| Component | Purpose |
|-----------|---------|
| `bj.api.sync.config` | Main synchronization configuration |
| `bj.api.sync.config.line` | Field-to-API key mappings |
| `bj.api.sync.header` | Custom HTTP headers |
| `bj.api.sync.param` | URL parameters |
| `bj.api.log` | Request/response audit trail |

## API Endpoint Pattern

For inbound configurations, endpoints follow this pattern:
```
/bj_api_sync/v1/<endpoint_name>
/bj_api_sync/v1/<endpoint_name>/<record_id>
```

## Documentation Sections

📚 **[Configuration Guide](./configuration/overview)**  
Step-by-step guides for setting up inbound and outbound APIs

🐍 **[Python Scripts](./python-scripts/context-variables)**  
Reference for data transformation scripts and available context variables

❓ **[Troubleshooting](./troubleshooting)**  
Common issues, solutions, and best practices

📮 **[Postman Collection](/postman)**  
Download pre-configured API testing collection

## Version History

| Version | Release Date | Notes |
|---------|--------------|-------|
| 18.0.1.0.2 | Current | Latest stable release for Odoo 18.0 |

## Support Information

- **Website:** [https://bjetpro.com/](https://bjetpro.com/)
- **Support Email:** [support@bjetpro.com](mailto:support@bjetpro.com)
- **Commercial Support:** Available for enterprise deployments
- **Dependencies:** `bj_api_log`, `base_automation`

---

*For detailed configuration instructions, please refer to the [Configuration Guide](./configuration/overview).*