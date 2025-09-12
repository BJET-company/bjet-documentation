---
id: api-reference
title: API Reference
sidebar_label: API Reference
description: Complete API reference for BJET API Synchronization Module
---

# API Reference

Complete reference documentation for the BJET API Synchronization Module's REST API endpoints, data models, and integration capabilities.

## Base Configuration

### API Endpoint Structure

All API endpoints follow this structure:

```
https://your-odoo-instance.com/api/sync/v1/{resource}
```

### Authentication

All API requests require authentication. See [Authentication Setup](../configuration/authentication) for detailed configuration.

```http
Authorization: Bearer your-api-token
Content-Type: application/json
```

## Inbound API Endpoints

### Create Record

Create a new record in Odoo from external data.

**Endpoint:** `POST /api/sync/v1/{model}`

**Request:**
```json
{
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "custom_field": "value"
  },
  "options": {
    "skip_validation": false,
    "return_fields": ["id", "name", "create_date"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "id": 42,
  "data": {
    "id": 42,
    "name": "John Doe",
    "create_date": "2024-01-15T10:30:00Z"
  }
}
```

### Update Record

Update an existing record in Odoo.

**Endpoint:** `PUT /api/sync/v1/{model}/{id}`

**Request:**
```json
{
  "data": {
    "email": "newemail@example.com",
    "phone": "+9876543210"
  },
  "options": {
    "partial_update": true,
    "trigger_workflow": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "id": 42,
  "updated_fields": ["email", "phone"],
  "write_date": "2024-01-15T11:00:00Z"
}
```

### Delete Record

Delete a record from Odoo.

**Endpoint:** `DELETE /api/sync/v1/{model}/{id}`

**Request:**
```json
{
  "options": {
    "cascade": false,
    "archive_instead": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Record archived successfully",
  "id": 42
}
```

### Search Records

Search for records matching criteria.

**Endpoint:** `GET /api/sync/v1/{model}/search`

**Query Parameters:**
- `domain`: Search domain (Odoo format)
- `fields`: Fields to return
- `limit`: Maximum records to return
- `offset`: Skip first N records
- `order`: Sort order

**Example:**
```http
GET /api/sync/v1/res.partner/search?domain=[["customer_rank",">",0]]&fields=name,email&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 150,
  "records": [
    {
      "id": 1,
      "name": "Azure Interior",
      "email": "azure@example.com"
    },
    {
      "id": 2,
      "name": "Deco Addict",
      "email": "deco@example.com"
    }
  ]
}
```

### Batch Operations

Process multiple records in a single request.

**Endpoint:** `POST /api/sync/v1/{model}/batch`

**Request:**
```json
{
  "operations": [
    {
      "method": "create",
      "data": {
        "name": "Customer 1",
        "email": "customer1@example.com"
      }
    },
    {
      "method": "update",
      "id": 42,
      "data": {
        "phone": "+1234567890"
      }
    }
  ],
  "options": {
    "transaction": true,
    "continue_on_error": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "index": 0,
      "success": true,
      "id": 100
    },
    {
      "index": 1,
      "success": true,
      "id": 42
    }
  ]
}
```

## Outbound API Configuration

### Webhook Registration

Register webhooks for outbound notifications.

**Endpoint:** `POST /api/sync/v1/webhooks`

**Request:**
```json
{
  "url": "https://external-api.com/webhook",
  "events": ["create", "update", "delete"],
  "model": "res.partner",
  "fields": ["name", "email", "phone"],
  "conditions": [
    ["customer_rank", ">", 0]
  ],
  "authentication": {
    "type": "bearer",
    "token": "external-api-token"
  }
}
```

**Response:**
```json
{
  "success": true,
  "webhook_id": "wh_123456",
  "status": "active"
}
```

### Webhook Payload Format

Standard payload sent to registered webhooks:

```json
{
  "event": "update",
  "timestamp": "2024-01-15T12:00:00Z",
  "model": "res.partner",
  "record_id": 42,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "changed_fields": ["email", "phone"],
  "metadata": {
    "user_id": 2,
    "company_id": 1,
    "database": "production"
  }
}
```

## Data Models

### Partner (Customer/Vendor)

```typescript
interface Partner {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  mobile?: string;
  is_company: boolean;
  customer_rank: number;
  supplier_rank: number;
  street?: string;
  street2?: string;
  city?: string;
  state_id?: number;
  zip?: string;
  country_id?: number;
  vat?: string;
  website?: string;
  create_date: string;
  write_date: string;
}
```

### Product

```typescript
interface Product {
  id: number;
  name: string;
  default_code?: string;  // SKU
  barcode?: string;
  type: 'consu' | 'service' | 'product';
  categ_id: number;
  list_price: number;
  standard_price: number;
  qty_available?: number;
  virtual_available?: number;
  uom_id: number;
  description?: string;
  description_sale?: string;
  active: boolean;
}
```

### Sale Order

```typescript
interface SaleOrder {
  id: number;
  name: string;  // Order number
  partner_id: number;
  date_order: string;
  state: 'draft' | 'sent' | 'sale' | 'done' | 'cancel';
  amount_total: number;
  amount_tax: number;
  amount_untaxed: number;
  currency_id: number;
  order_line: OrderLine[];
  invoice_status: string;
  delivery_status?: string;
}

interface OrderLine {
  id: number;
  product_id: number;
  name: string;
  product_uom_qty: number;
  price_unit: number;
  price_subtotal: number;
  price_total: number;
  tax_id?: number[];
  discount?: number;
}
```

## Error Responses

All API errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email field is required",
    "details": {
      "field": "email",
      "value": null,
      "constraint": "required"
    },
    "trace_id": "req_abc123"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `AUTHENTICATION_ERROR` | 401 | Invalid or missing authentication |
| `PERMISSION_DENIED` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Record or endpoint not found |
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `DUPLICATE_RECORD` | 409 | Record already exists |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Rate Limiting

API requests are rate-limited to ensure system stability:

- **Default Limit**: 1000 requests per hour
- **Burst Limit**: 100 requests per minute
- **Headers Returned**:
  ```http
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 950
  X-RateLimit-Reset: 1642248000
  ```

## Pagination

For endpoints returning multiple records:

```json
{
  "data": [...],
  "pagination": {
    "total": 500,
    "page": 1,
    "per_page": 50,
    "pages": 10,
    "next": "/api/sync/v1/res.partner?page=2",
    "previous": null
  }
}
```

## Field Transformations

### Date/DateTime Fields

- **Input Format**: ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`)
- **Output Format**: ISO 8601 with timezone
- **Example**: `"2024-01-15T10:30:00Z"`

### Relational Fields

#### Many2one
```json
{
  "country_id": 235,  // United States
  // or
  "country_id": {
    "id": 235,
    "name": "United States"
  }
}
```

#### One2many
```json
{
  "order_line": [
    [0, 0, {"product_id": 1, "quantity": 10}],  // Create
    [1, 42, {"quantity": 20}],  // Update
    [2, 43, false]  // Delete
  ]
}
```

#### Many2many
```json
{
  "tag_ids": [
    [6, 0, [1, 2, 3]]  // Replace all
  ]
}
```

## Webhooks & Events

### Available Events

| Event | Trigger | Payload |
|-------|---------|---------|
| `record.created` | New record created | Full record data |
| `record.updated` | Record modified | Changed fields only |
| `record.deleted` | Record deleted | Record ID |
| `state.changed` | Workflow state change | Old/new state |
| `batch.completed` | Batch operation done | Operation summary |

### Event Subscription

```python
# Subscribe to events via API
POST /api/sync/v1/events/subscribe
{
  "events": ["record.created", "record.updated"],
  "model": "res.partner",
  "callback_url": "https://your-app.com/webhook",
  "filters": {
    "customer_rank": [">", 0]
  }
}
```

## SDK Examples

### Python

```python
import requests

class OdooAPIClient:
    def __init__(self, base_url, token):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    
    def create_record(self, model, data):
        url = f"{self.base_url}/api/sync/v1/{model}"
        response = requests.post(url, json={'data': data}, headers=self.headers)
        return response.json()
    
    def search_records(self, model, domain=None, fields=None):
        url = f"{self.base_url}/api/sync/v1/{model}/search"
        params = {
            'domain': domain or [],
            'fields': ','.join(fields) if fields else None
        }
        response = requests.get(url, params=params, headers=self.headers)
        return response.json()

# Usage
client = OdooAPIClient('https://odoo.example.com', 'your-token')
result = client.create_record('res.partner', {
    'name': 'New Customer',
    'email': 'customer@example.com'
})
```

### JavaScript

```javascript
class OdooAPI {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async createRecord(model, data) {
    const response = await fetch(`${this.baseUrl}/api/sync/v1/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    });
    return response.json();
  }

  async searchRecords(model, domain = [], fields = []) {
    const params = new URLSearchParams({
      domain: JSON.stringify(domain),
      fields: fields.join(',')
    });
    
    const response = await fetch(
      `${this.baseUrl}/api/sync/v1/${model}/search?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    );
    return response.json();
  }
}

// Usage
const api = new OdooAPI('https://odoo.example.com', 'your-token');
const result = await api.createRecord('res.partner', {
  name: 'New Customer',
  email: 'customer@example.com'
});
```

## Testing

### Postman Collection

Download our [Postman Collection](/postman) for ready-to-use API examples.

### cURL Examples

```bash
# Create customer
curl -X POST https://odoo.example.com/api/sync/v1/res.partner \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{"data":{"name":"Test Customer","email":"test@example.com"}}'

# Search products
curl -G https://odoo.example.com/api/sync/v1/product.product/search \
  -H "Authorization: Bearer your-token" \
  --data-urlencode 'domain=[["qty_available",">",0]]' \
  --data-urlencode 'fields=name,default_code,list_price'
```

## Next Steps

- [Authentication Setup](../configuration/authentication) - Configure API authentication
- [Field Mapping](../configuration/field-mapping) - Map API fields to Odoo
- [Python Scripts](../python-scripts/context-variables) - Advanced transformations
- [Troubleshooting](../troubleshooting) - Debug API issues