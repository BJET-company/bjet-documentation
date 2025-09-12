---
title: Postman Collection
description: Download the BJET API Synchronization Module Postman collection
---

# Postman Collections

## API Synchronization Module Collection

Download the pre-configured Postman collection for testing the API Synchronization Module endpoints.

<a href="/bjet-documentation/postman/bjet-api-sync-collection.json" download className="postman-button">
  📦 Download Postman Collection
</a>

## What's Included

The collection includes:

### Authentication Examples
- No Authentication (public endpoints)
- Basic Authentication (username/password)
- Bearer Token Authentication

### Partner API Endpoints
- GET all partners
- GET single partner by ID
- POST create new partner
- PUT update existing partner
- DELETE remove partner

### Generic Endpoints
- Configurable endpoint examples
- Custom field mapping templates

### Error Scenarios
- 401 Unauthorized
- 404 Not Found
- 405 Method Not Allowed
- 400 Bad Request

## Environment Variables

Configure these variables in your Postman environment:

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `base_url` | `http://localhost:8069` | Your Odoo instance URL |
| `bearer_token` | (empty) | Your API bearer token |
| `basic_auth_user` | `admin` | Basic auth username |
| `basic_auth_password` | `admin` | Basic auth password |
| `endpoint_name` | `partners` | Your configured endpoint name |

## How to Import

1. Download the collection file above
2. Open Postman
3. Click **Import** in the top left
4. Select the downloaded JSON file
5. Configure your environment variables
6. Start testing!

## Testing Tips

### 1. Set Up Authentication
First, configure your authentication method in the Odoo API configuration and update the corresponding Postman environment variables.

### 2. Test Connection
Start with a simple GET request to verify your connection and authentication are working.

### 3. Create Test Data
Use the POST endpoints to create test records, then verify with GET requests.

### 4. Test Error Handling
Use the error scenario examples to ensure your API configuration handles errors gracefully.

## Pre-request Scripts

The collection includes pre-request scripts that:
- Log request details for debugging
- Set dynamic timestamps
- Handle authentication tokens

## Test Scripts

Automated tests validate:
- Response status codes
- JSON response format
- Response time performance
- Required fields presence

## Support

If you encounter issues with the Postman collection:

1. Verify your Odoo instance is running
2. Check your authentication credentials
3. Ensure the API endpoints are configured in Odoo
4. Review the [API Reference](/docs/modules/api-sync/api-reference/) documentation

For additional support, contact [support@bjetpro.com](mailto:support@bjetpro.com)