---
sidebar_position: 20
title: Glossary
description: Key terms and definitions for BJET API Synchronization Module
keywords: [glossary, terms, definitions, api, synchronization]
---

# Glossary

<span className="version-badge">v18.0.1.0.4</span>

Key terms and definitions for the BJET API Synchronization Module.

## A

### API (Application Programming Interface)
A set of protocols and tools for building software applications. Defines how software components should interact.

### API Endpoint
A specific URL path where an API can be accessed. Example: `/bj_api_sync/v1/customers`

### Authentication
The process of verifying the identity of a user or system before granting access to resources.

### Authorization Type
The method used to authenticate API requests (No Auth, Basic Auth, Bearer Token).

## B

### Basic Authentication
Authentication method using username and password, typically encoded in Base64.

### Bearer Token
An authentication token sent in the Authorization header of HTTP requests.

## C

### Configuration
Settings that define how the API synchronization module operates, including endpoints, authentication, and field mappings.

### Controller
The component that manages API requests and responses.

## D

### Data Transformation
Converting data from one format to another using field mappings and Python scripts.

## E

### Endpoint
The specific path in an API URL that identifies a resource or operation.

### External API Key
The field name used by the external system that corresponds to an Odoo field.

## F

### Field Mapping
Configuration that defines how Odoo fields relate to external API fields.

### Filter Domain
Odoo domain expression that determines which records are included in synchronization.

## H

### HTTP Methods
Standard operations for APIs: GET (retrieve), POST (create), PUT (update), DELETE (remove).

## I

### Inbound Synchronization
Receiving data from external systems into Odoo.

### Integration
Connecting Odoo with external systems for data exchange.

## J

### JSON
JavaScript Object Notation - a data format for API communication.

## M

### Model
An Odoo database table/object (e.g., `res.partner` for contacts).

## O

### Outbound Synchronization
Sending data from Odoo to external systems.

## P

### Payload
The data sent in an HTTP request or response.

### Python Script
Custom code for complex data transformations beyond simple field mapping.

## R

### Record Identifier
A field marked as the unique identifier for records.

### Request Type
Direction of synchronization: Inbound (receiving) or Outbound (sending).

## S

### Status Code
HTTP response codes indicating API request results (e.g., 200 for success).

### Synchronization
The process of keeping data consistent between Odoo and external systems.

## T

### Timeout
Maximum time allowed for an operation before failure.

### Token
A string used for authentication instead of username/password.

### Transformation
Converting data from one format to another during synchronization.

## U

### URL (Uniform Resource Locator)
The web address of an API endpoint.

## V

### Validation
Checking data correctness before processing.

### Value Calculation Type
Method for determining field values: Plain, Relational, or Python Script.

## Common Acronyms

| Acronym | Full Form |
|---------|-----------|
| **API** | Application Programming Interface |
| **HTTP** | HyperText Transfer Protocol |
| **HTTPS** | HTTP Secure |
| **JSON** | JavaScript Object Notation |
| **REST** | Representational State Transfer |
| **URL** | Uniform Resource Locator |

## Need More Help?

- [Documentation Home](/)
- [Quick Start Guide](./quick-start)
- [FAQ](./faq)
- [Troubleshooting](./troubleshooting)