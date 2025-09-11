---
sidebar_position: 1
title: Configuration Overview
---

# Configuration Overview

To configure an API synchronization, you need to create an API Synchronization Configuration record (`bj.api.sync.config`).

## Configuration Types

The API Synchronization module supports two primary configuration types:

### Inbound Configuration
Receive data from external systems into Odoo. External APIs can send data to your Odoo instance through standardized endpoints.

**Use Cases:**
- Receiving orders from e-commerce platforms
- Importing customer data from CRM systems
- Syncing inventory from warehouse management systems

### Outbound Configuration
Send Odoo data to external systems. Automatically push data from Odoo to external APIs based on triggers and events.

**Use Cases:**
- Sending invoices to accounting systems
- Updating product catalogs on e-commerce sites
- Syncing customer data with marketing platforms

## Core Configuration Components

### 1. General Configuration
- **Name** – a descriptive title for the configuration
- **Request Type** – define the synchronization direction (In/Out)
- **Model** – the Odoo model to be synchronized
- **Filter Domain** – conditions to filter which records are synchronized
- **URL** – base URL of the external API
- **Endpoint** – specific API endpoint (used in inbound requests)
- **HTTP Methods** – permitted operations (GET, POST, PUT, DELETE)

### 2. Authentication
Choose from multiple authentication methods:
- No Authentication
- Basic Authentication (username/password)
- Bearer Token (API key)
- Custom Headers

### 3. Data Mapping
Configuration Lines (`bj.api.sync.config.line`) define field mappings:
- **Field** – the Odoo field to be mapped
- **External API Key** – the corresponding key in the external API
- **Record Identifier** – marks the unique identifier
- **Value Calculation Type** – method for computing field values

### 4. Advanced Options
- **Timeout Settings** – connection and read timeouts
- **Headers** – custom HTTP headers
- **Parameters** – URL parameters for GET requests
- **Python Scripts** – custom data transformations

## Configuration Models

The module uses several models to manage configurations:

| Model | Purpose |
|-------|---------|
| `bj.api.sync.config` | Main synchronization configuration |
| `bj.api.sync.config.line` | Field-to-API key mappings |
| `bj.api.sync.header` | Custom HTTP headers |
| `bj.api.sync.param` | URL parameters |
| `bj.api.log` | Request/response audit trail |

## Next Steps

- [Configure Inbound API](/docs/configuration/inbound-api) - Set up receiving data
- [Configure Outbound API](/docs/configuration/outbound-api) - Set up sending data
- [Authentication Setup](/docs/configuration/authentication) - Configure security
- [Field Mapping](/docs/configuration/field-mapping) - Map data fields