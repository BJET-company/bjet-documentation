---
id: api-reference
title: API Reference
sidebar_label: API Reference
description: Basic API patterns for BJET API Synchronization Module
---

# API Reference

<span className="version-badge">v18.0.1.0.2</span>

Basic API patterns and examples for the BJET API Synchronization Module.

## Endpoint Structure

API endpoints follow this pattern:

```
/bj_api_sync/v1/{endpoint_name}
```

## Authentication Methods

Supported authentication types:

- **No Authentication** - For internal/trusted networks
- **Basic Authentication** - Username and password
- **Bearer Token** - Token-based authentication

See [Authentication Setup](../configuration/authentication) for configuration details.

## Basic HTTP Methods

The module supports standard HTTP methods:

### GET - Retrieve Data
```http
GET /bj_api_sync/v1/customers
```

### POST - Create Records
```http
POST /bj_api_sync/v1/customers
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### PUT - Update Records
```http
PUT /bj_api_sync/v1/customers
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

### DELETE - Remove Records
```http
DELETE /bj_api_sync/v1/customers
```

## Request/Response Format

### Basic Request Format
```json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "+1234567890"
}
```

### Basic Response Format
```json
{
  "success": true,
  "message": "Record processed successfully",
  "id": 123
}
```

## Configuration

API endpoints are configured through:
- Settings → Technical → API Sync Configurations
- Field mappings define data transformations
- Authentication settings control access

## Error Handling

Common HTTP status codes:
- **200** - Success
- **400** - Bad Request (invalid data)
- **401** - Unauthorized (authentication failed)
- **404** - Not Found (invalid endpoint)
- **500** - Server Error

## Testing

Test your API endpoints using:
- Postman collection: [Download here](/postman)
- Built-in test connection button in configuration
- cURL commands for manual testing

## Related Documentation

- [Authentication Setup](../configuration/authentication)
- [Field Mapping](../configuration/field-mapping)
- [Troubleshooting](../troubleshooting)
- [FAQ](../faq)