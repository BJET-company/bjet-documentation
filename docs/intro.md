---
sidebar_position: 1
title: Introduction
---

# BJET API Synchronization Module

**Version:** 18.0.1.0.2  
**License:** OPL-1  
**Author:** BJET  

A comprehensive and flexible module that synchronizes Odoo models with external APIs, enabling seamless bidirectional data integration through RESTful interfaces.

## Overview

The API Synchronization module offers enterprise-grade synchronization with advanced configuration options, enabling organizations to integrate Odoo with virtually any external system that supports REST APIs.

## Core Features

### Bidirectional Synchronization
- **Inbound Processing** – receive data from external systems into Odoo
- **Outbound Processing** – send Odoo data from Odoo to external systems

### Integration Modes
- **Real-Time Integration** – synchronize data immediately as changes occur
- **Scheduled Operations** – perform automated synchronization through cron jobs

### Authentication Support
- **No Authentication** – suitable for public or internal APIs
- **Basic Authentication** – access with username and password
- **Bearer Token** – authentication via API key or token
- **Custom Headers** – support for additional authentication headers

### HTTP Protocol Support
- **Full REST Support** – includes GET, POST, PUT, and DELETE methods
- **Custom Endpoints** – configurable definitions for API endpoints
- **Parameter Handling** – support for URL parameters and query strings
- **Header Management** – configuration of custom HTTP headers

### Data Transformation
- **Field Mapping** – visual alignment between Odoo fields and external API keys
- **Python Scripting** – advanced data transformations using Python code
- **Value Calculation** – multiple methods for computing field values
- **Relational Data** – support for Many2one, One2many, and Many2many relationships

## Quick Start

To get started with the API Synchronization module:

1. Navigate to **Settings > Technical > BJ API > API Configurations**
2. Click **Create** to start a new API synchronization configuration
3. Choose between **Inbound** or **Outbound** synchronization
4. Configure your authentication method
5. Set up field mappings
6. Test and deploy your configuration

:::tip
Use our step-by-step [Configuration Guide](/docs/configuration/overview) to set up your first API integration!
:::

## Support

- **Website:** [https://bjetpro.com/](https://bjetpro.com/)
- **Support Email:** [support@bjetpro.com](mailto:support@bjetpro.com)
- **Commercial Support:** Available for enterprise deployments