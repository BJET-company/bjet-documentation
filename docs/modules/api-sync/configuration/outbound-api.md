---
sidebar_position: 3
title: Outbound API Configuration
---

# Outbound API Configuration

Configure Odoo to send data to external systems automatically based on triggers and events.

## Step-by-Step Configuration

### Step 1: Create Base Configuration

1. Navigate to **Settings > Technical > BJ API > API Configurations**

![API Settings Menu](/img/api-sync/api-settings-menu.png)
*API Configurations menu in Technical Settings*

2. Click **Create**

![API Configuration Form](/img/api-sync/api-configuration-form.png)
*New API Configuration form*

3. Set **Request Type** to **"Out"** for outbound synchronization

![Outbound Configuration](/img/api-sync/outbound-configuration.png)
*Select "Out" for outbound data synchronization*

### Step 2: Configure External API

#### Request URL

![Request URL Configuration](/img/api-sync/request-url-config.png)
*Configure the external API endpoint URL*

Enter the complete external API endpoint:
```
https://api.example.com/partners
```

#### HTTP Method
Select a **single** HTTP method (required for outbound):
- **GET**: Query external data
- **POST**: Send new data
- **PUT**: Update existing data
- **DELETE**: Remove data

:::warning
Outbound configurations require exactly one HTTP method to be selected.
:::

### Step 3: Set Timeout Parameters

Configure timeouts to prevent hanging requests:

![Timeout Settings](/img/api-sync/timeout-settings.png)
*Timeout configuration*

- **Connection Timeout**: Maximum time to establish connection (default: 5 seconds)
- **Read Timeout**: Maximum time to wait for response (default: 15 seconds)

Example configuration:
```python
Connection Timeout: 10  # seconds
Read Timeout: 30        # seconds
```

### Step 4: Configure Authentication

#### Basic Authentication

![Basic Authentication](/img/api-sync/basic-auth-config.png)
*Basic Authentication configuration*

```python
Authorization Type: Basic Auth
Login: api_user
Password: secure_password
```

Generated header:
```
Authorization: Basic dXNlcjpwYXNz
```

#### Bearer Token

![Bearer Token Authentication](/img/api-sync/bearer-token-config.png)
*Bearer Token configuration*

```python
Authorization Type: Bearer Token
Bearer Token: sk_live_abc123xyz789
```

Generated header:
```
Authorization: Bearer sk_live_abc123xyz789
```

### Step 5: Define Source Model and Filters

![Model Settings](/img/api-sync/model-settings.png)
*Model and filter configuration*

#### Model Selection
Choose the Odoo model to synchronize:
- `res.partner` - Contacts
- `product.product` - Products
- `sale.order` - Sales Orders
- `account.move` - Invoices

#### Filter Domain
Apply conditions to select specific records:
```python
# Only sync active customers
[('active', '=', True), ('customer_rank', '>', 0)]

# Sync orders from last 7 days
[('create_date', '>=', (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d'))]
```

### Step 6: Create Field Mappings

![Field Mapping Configuration](/img/api-sync/field-mapping.png)
*Configure field mappings*

Map Odoo fields to external API structure:

| Odoo Field | External API Key | Value Type | Notes |
|------------|------------------|------------|-------|
| name | full_name | Plain | Customer name |
| email | email_address | Plain | Email field |
| phone | contact_number | Plain | Phone number |
| id | external_id | Plain | Unique identifier |
| partner_id.name | company_name | Relational | Company reference |

### Step 7: Add Custom Headers

![Headers Configuration](/img/api-sync/headers-config.png)
*Configure custom HTTP headers*

Configure additional HTTP headers:

```python
# Headers Tab
Content-Type: application/json
X-API-Version: 2.0
X-Client-Id: odoo-integration
```

### Step 8: Configure Automation Triggers

#### Manual Execution
Call the method directly in server actions:
```python
record = self.env['res.partner'].browse(partner_id)
config = self.env.ref('module.api_config_xml_id')
config._make_outbound_http_request(record, config.id, timeout=60)
```

#### Cron Jobs

*Schedule automated synchronization*

Schedule regular synchronization:
1. Create a Scheduled Action
2. Set the model to `bj.api.sync.config`
3. Configure the Python code:
```python
# Sync all modified partners every hour
partners = env['res.partner'].search([
    ('write_date', '>=', datetime.now() - timedelta(hours=1))
])
config = env.ref('module.outbound_partner_config')
for partner in partners:
    config._make_outbound_http_request(partner, config.id)
```

#### Base Automation
Trigger on record events:
1. Create an Automated Action
2. Set the model (e.g., `res.partner`)
3. Choose trigger: On Creation, On Update, On Deletion
4. Add server action to call the API

## Outbound Request Flow

```
Trigger Event → Record Selection → Field Mapping → HTTP Request Construction 
→ External API Call → Response Processing → Logging
```

## Example Configurations

### Example 1: Send New Customers to CRM
```python
Name: Customer to CRM Sync
Request Type: Out
Model: res.partner
HTTP Method: POST
Request URL: https://crm.example.com/api/customers
Filter Domain: [('customer_rank', '>', 0)]
```

### Example 2: Update Product Inventory
```python
Name: Inventory Update
Request Type: Out
Model: product.product
HTTP Method: PUT
Request URL: https://inventory.system.com/api/products
Filter Domain: [('type', '=', 'product')]
```

### Example 3: Delete Cancelled Orders
```python
Name: Remove Cancelled Orders
Request Type: Out
Model: sale.order
HTTP Method: DELETE
Request URL: https://orders.api.com/remove
Filter Domain: [('state', '=', 'cancel')]
```

## Python Script for Complex Transformations

Use Python scripts when simple field mapping isn't enough:

```python
# Available variables:
# env - Odoo environment
# model - Current model
# records - Records being processed
# request_data - Data being sent

# Example: Format phone number
phone = records.phone or ''
if phone.startswith('+'):
    result = phone
else:
    result = '+1' + phone.replace('-', '').replace(' ', '')

# Example: Calculate total value
total = sum(records.mapped('amount_total'))
result = {'total_revenue': total, 'order_count': len(records)}

# Example: Add timestamp
from datetime import datetime
result = {
    'data': request_data,
    'timestamp': datetime.now().isoformat(),
    'source': 'odoo'
}
```

## Batch Processing

For large datasets, configure batch processing:

```python
# Pagination Settings
Is Paginated: ✓
Page Size: 100
```

This sends records in batches of 100 to optimize performance.

## Error Handling

The module provides automatic error handling:

- **Automatic Retry**: Failed requests are retried with exponential backoff
- **Detailed Logging**: All errors logged in `bj.api.log`
- **Graceful Degradation**: Partial failures don't block the system
- **Status Code Handling**: Different handling based on HTTP status

## Performance Optimization

1. **Use appropriate batch sizes** (50-200 records)
2. **Apply efficient domain filters** to reduce dataset size
3. **Monitor API rate limits** to avoid throttling
4. **Cache frequently accessed data** when possible
5. **Use connection pooling** for high-volume synchronization

## Testing Your Configuration

1. **Create a test record** in your Odoo model
2. **Manually trigger** the synchronization
3. **Check the logs** in BJ API > Logs
4. **Verify the external system** received the data
5. **Test error scenarios** (wrong URL, invalid auth)

## Next Steps

- [Set Up Automation](/docs/modules/api-sync/automation/base-automation)
- [Configure Python Scripts](/docs/modules/api-sync/python-scripts/data-transformation)
- [Monitor API Logs](/docs/modules/api-sync/troubleshooting)