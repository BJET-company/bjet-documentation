---
sidebar_position: 20
title: Glossary
description: Key terms and definitions for BJET API Synchronization Module
keywords: [glossary, terms, definitions, api, synchronization]
---

# Glossary

<span className="version-badge">v18.0.1.0.2</span>

Key terms and definitions used throughout the BJET API Synchronization Module documentation.

## A

### API (Application Programming Interface)
A set of protocols and tools for building software applications. Defines how software components should interact.

### API Endpoint
A specific URL where an API can be accessed. Example: `/bj_api_sync/v1/customers`

### Authentication
The process of verifying the identity of a user or system before granting access to resources.

### Authorization Type
The method used to authenticate API requests (No Auth, Basic Auth, Bearer Token).

## B

### Base Automation
Odoo's built-in feature for triggering actions based on record events (create, write, delete).

### Basic Authentication
Authentication method using username and password, typically encoded in Base64.

### Batch Processing
Processing multiple records together in a single operation for improved efficiency.

### Bearer Token
An authentication token sent in the Authorization header of HTTP requests.

## C

### Configuration Lines
Field mapping definitions that specify how Odoo fields correspond to external API keys.

### Connection Timeout
Maximum time allowed to establish a connection to an external API (default: 5 seconds).

### Controller
The component (`BjApiSyncConfigController`) that manages all inbound API requests.

### Cron Job
Scheduled task that runs automatically at specified intervals.

## D

### Data Mapping
The process of matching fields between Odoo models and external API data structures.

### Data Transformation
Converting data from one format to another using field mappings or Python scripts.

## E

### Endpoint
The specific path in an API URL that identifies a resource or operation.

### Error Handling
Mechanisms for detecting, logging, and recovering from errors during synchronization.

### External API Key
The field name used by the external system that corresponds to an Odoo field.

## F

### Field Mapping
Configuration that defines how Odoo fields relate to external API fields.

### Filter Domain
Odoo domain expression that determines which records are included in synchronization.

## H

### HTTP Headers
Key-value pairs sent with HTTP requests to provide additional information.

### HTTP Methods
Standard operations for APIs: GET (retrieve), POST (create), PUT (update), DELETE (remove).

## I

### Inbound Synchronization
Receiving data from external systems into Odoo.

### Integration
The process of connecting Odoo with external systems for data exchange.

## J

### JSON (JavaScript Object Notation)
A lightweight data format commonly used for API communication.

## L

### Logging
Recording details of API operations for debugging and audit purposes.

## M

### Model
An Odoo database table/object (e.g., `res.partner` for contacts).

### Mapping Model
Configuration used for relational field synchronization between related records.

## O

### Odoo Environment
The `env` object providing access to Odoo models and system functions.

### Outbound Synchronization
Sending data from Odoo to external systems.

## P

### Pagination
Dividing large datasets into smaller pages for efficient processing.

### Payload
The data sent in the body of an HTTP request or response.

### Python Script
Custom code for complex data transformations beyond simple field mapping.

## R

### Read Timeout
Maximum time to wait for a response after connection is established (default: 15 seconds).

### Record Identifier
A field marked as the unique identifier for records in synchronization.

### Request Type
Direction of synchronization: Inbound (receiving) or Outbound (sending).

### RESTful API
API design following REST (Representational State Transfer) principles.

## S

### Server Action
Manual trigger for synchronization available through Odoo's interface.

### Status Code
HTTP response codes indicating the result of an API request (e.g., 200 for success).

### Synchronization
The process of keeping data consistent between Odoo and external systems.

## T

### Timeout
Maximum time allowed for an operation before it's considered failed.

### Token
A string used for authentication, often replacing username/password.

### Transformation
Converting data from one format to another during synchronization.

### Trigger
An event that initiates synchronization (manual, scheduled, or event-driven).

## U

### URL (Uniform Resource Locator)
The web address of an API endpoint.

### URL Parameters
Query string parameters added to URLs for filtering or configuration.

## V

### Validation
Checking data for correctness before processing.

### Value Calculation Type
Method for determining field values: Plain, Relational, or Python Script.

## W

### Webhook
An HTTP callback that sends data to a URL when an event occurs.

## Common Acronyms

| Acronym | Full Form |
|---------|-----------|
| **API** | Application Programming Interface |
| **CRUD** | Create, Read, Update, Delete |
| **HTTP** | HyperText Transfer Protocol |
| **HTTPS** | HTTP Secure |
| **JSON** | JavaScript Object Notation |
| **REST** | Representational State Transfer |
| **URL** | Uniform Resource Locator |
| **XML** | eXtensible Markup Language |

## Technical Terms

### ACID Compliance
Database properties ensuring reliable transactions: Atomicity, Consistency, Isolation, Durability.

### Idempotent
An operation that produces the same result regardless of how many times it's performed.

### Rate Limiting
Restricting the number of API requests within a time period.

### Stateless
Each API request contains all information needed, without relying on server-stored context.

### Throttling
Controlling the rate of API requests to prevent overload.

## Need More Help?

- 📚 Return to [Documentation Home](/docs/modules/api-sync)
- 🚀 Check the [Quick Start Guide](quick-start)
- ❓ Visit our [FAQ](faq)
- 🔧 See [Troubleshooting](troubleshooting) for common issues