---
sidebar_position: 2
title: Script Context Variables
---

# Python Script Context Variables

When using Python scripts for data transformation, the following variables are available in your script context:

## Core Odoo Objects

### `env`
The Odoo environment object for database access.
```python
# Access any Odoo model
partners = env['res.partner'].search([('customer_rank', '>', 0)])
products = env['product.product'].browse([1, 2, 3])
```

### `model`
The target Odoo model being synchronized.
```python
# Get model name
model_name = model._name  # e.g., 'res.partner'

# Access model fields
field_names = model._fields.keys()
```

### `records`
The current recordset being processed.
```python
# Access record data
for record in records:
    print(record.name)
    print(record.email)
    
# Use mapped for field values
emails = records.mapped('email')
total = sum(records.mapped('amount_total'))
```

## Request Data

### `request_data`
JSON payload from external API (inbound) or data to be sent (outbound).
```python
# Inbound: Parse incoming data
customer_name = request_data.get('name', '')
email = request_data.get('email_address', '')

# Outbound: Modify data being sent
request_data['timestamp'] = datetime.now().isoformat()
request_data['source'] = 'odoo'
```

## Utility Libraries

### Date/Time Operations
```python
# Available imports
import time
from datetime import datetime, timedelta
import dateutil
from dateutil import timezone

# Example: Parse date string
date_str = request_data.get('date')
parsed_date = datetime.strptime(date_str, '%Y-%m-%d')

# Example: Add timezone
utc_time = datetime.now(timezone.utc)
```

### Base64 Encoding
```python
from base64 import b64encode, b64decode

# Encode binary data
encoded = b64encode(binary_data).decode('utf-8')

# Decode base64 string
decoded = b64decode(encoded_string)
```

### Error Handling
```python
from odoo.exceptions import UserError

# Raise user-friendly error
if not request_data.get('required_field'):
    raise UserError('Required field is missing!')
```

### Record Manipulation Commands
```python
from odoo.fields import Command

# Create new record
Command.create({'name': 'New Record'})

# Update record
Command.update(record_id, {'name': 'Updated'})

# Delete record
Command.delete(record_id)

# Link existing record (for many2many)
Command.link(record_id)

# Unlink record
Command.unlink(record_id)
```

## Script Execution Modes

### Evaluate Mode
Return computed values for field assignment:
```python
request_data.get('customer', {}).get('name', '').upper()  
# This value will be assigned to the field
```

### Execute Mode
Perform complex operations without return values:
```python
# No return value needed
for item in request_data.get('items', []):
    env['product.product'].create({
        'name': item['name'],
        'list_price': item['price']
    })
# This value will not be assigned to the field, only create in DB
```

## Complete Example Scripts

### Example 1: Data Validation
```python
# Clean phone number Evaluate Mode
re.sub(r'[^0-9+]', '', request_data.get('phone', ''))

# Validate incoming data before processing Execute Mode
email = request_data.get('email', '')
import re

if email and not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
    raise UserError(f'Invalid email format: {email}')
```

### Example 2: Format Conversion
```python
# Convert date format Evaluate Mode
datetime.strptime(request_data.get('order_date'), '%m/%d/%Y').strftime('%Y-%m-%d')
```

### Example 3: External Lookups
```python
# Fetch additional data from external sources Execute Mode
import requests

product_sku = request_data.get('sku')
if product_sku:
    # Look up product in external catalog
    response = requests.get(f'https://catalog.example.com/api/products/{product_sku}')
    if response.status_code == 200:
        product_data = response.json()
        result = {
            'name': product_data['title'],
            'list_price': product_data['price'],
            'description': product_data['description']
        }
    else:
        raise UserError(f'Product {product_sku} not found in catalog')
```

## Best Practices

1. **Always validate input data** before processing
2. **Use try-except blocks** for error handling
3. **Log important operations** for debugging
4. **Keep scripts simple and focused** on one task
5. **Test scripts thoroughly** with various input scenarios
6. **Document complex logic** with comments
7. **Avoid hardcoding values** - use configuration parameters

## Debugging Tips

```python
# Use logging for debugging
import logging
_logger = logging.getLogger(__name__)

_logger.info(f'Processing record: {records.id}')
_logger.debug(f'Request data: {request_data}')
_logger.error(f'Error processing: {str(e)}')

# Print statements (visible in server logs)
print(f'DEBUG: Current value = {value}')
```