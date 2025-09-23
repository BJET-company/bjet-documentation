---
sidebar_position: 1
title: API Reference
description: Complete reference for the BJET API Synchronization Module endpoints and functionality
---

# API Reference

Complete reference documentation for the BJET API Synchronization Module's RESTful API endpoints and configuration options.

## Overview

The API Synchronization Module provides RESTful endpoints for bidirectional data synchronization between Odoo and external systems.

## Base URL

```
https://your-odoo-instance.com/bj_api_sync/v1/
```

## Available Endpoints

### Core Endpoints

- **GET** `/[endpoint]` - Retrieve records
- **GET** `/[endpoint]/{id}` - Retrieve a single record by ID
- **POST** `/[endpoint]` - Create new records
- **PUT** `/[endpoint]/{id}` - Update existing records
- **DELETE** `/[endpoint]/{id}` - Delete records

Where `[endpoint]` is your configured endpoint name (e.g., `partners`, `products`, etc.)

## Authentication Methods

The module supports three authentication methods:

### 1. No Authentication
For internal or development use only.

### 2. Basic Authentication
```http
Authorization: Basic base64(username:password)
```

### 3. Bearer Token
```http
Authorization: Bearer your_token_here
```

## Request Headers

### Required Headers
```http
Content-Type: application/json
Accept: application/json
```

### Optional Headers
```http
X-Request-ID: unique-request-id
X-API-Version: 1.0
```

## Response Formats

### Success Response
```json
{
    // Response data
}
```

### Error Response
```json
{
    "error": "Error description",
    "line_id": "Config line where error except",
    "status_code": "ERROR_CODE"
}
```
```json
{
    "message": "Error description"
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 500 | Internal Server Error |

## Rate Limiting

Odoo does not provide built-in API rate limiting.  
It is strongly recommended to configure rate limiting at the reverse proxy (e.g., Nginx, HAProxy, or Cloudflare) or firewall level, especially for on-premise VM deployments.

Suggested defaults:
- **100 requests per minute per IP**
- **1000 requests per hour per API key**

## Pagination

For GET requests returning multiple records:

```http
GET /[endpoint]?limit=100&offset=0
```

### Parameters
- `limit`: Number of records to return (default: 100)
- `offset`: Number of records to skip (default: 0)

## Filtering

Use domain syntax for filtering:
```http
GET /[endpoint]?active=true
```
```http
GET /[endpoint]?active=true&state=draft
```

## Detailed Documentation

For detailed information about specific topics, see:

- [Authentication Guide](../configuration/authentication) - Setting up authentication
- [Field Mapping](../configuration/field-mapping) - Configuring field mappings
- [Python Scripts](../python-scripts/context-variables) - Advanced transformations
- [Troubleshooting](../troubleshooting) - Common issues and solutions

## Postman Collection

Download our pre-configured [Postman Collection](/postman) for easy API testing and exploration.

## Support

For API support and questions:
- Email: support@bjetpro.com
- Documentation: https://bjetpro.com/docs