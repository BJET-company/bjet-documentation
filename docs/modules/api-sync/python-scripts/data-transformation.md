---
sidebar_position: 1
title: Data Transformation Scripts
description: Use Python scripts for complex data transformations
---

# Python Scripts for Data Transformation

Python scripts enable complex data transformations that go beyond simple field mapping.

## Script Editor Interface

![Python Script Editor](/img/api-sync/python-script-editor.png)
*Python Script editor with context variables and examples*

### Script Manual and Documentation

![Python Script Manual](/img/api-sync/python-script-manual.png)
*Built-in manual showing available variables and usage examples*

## Available Context Variables

When writing Python scripts, you have access to these variables:

### Core Objects
```python
env          # Odoo environment for database access
model        # Target Odoo model being synchronized
records      # Current recordset being processed
request_data # JSON payload from external API
```

### Utility Libraries
```python
# Date/Time Operations
time, datetime, dateutil, timezone

# Encoding Utilities
b64encode, b64decode  # Base64 encoding/decoding

# Error Handling
UserError  # User-facing error exceptions

# Record Manipulation
Command  # Record manipulation commands
```

## Script Execution Modes

### Evaluate Mode
Returns computed values for field assignment:
```python
# Return a calculated value
record.price * 1.2  # Add 20% markup
```

### Execute Mode
Performs complex operations without return values:
```python
# Create related records
env['product.pricelist.item'].create({
    'product_id': record.id,
    'price': request_data.get('special_price')
})
```

## Common Use Cases

### 1. Data Validation

Validate incoming data before processing:

```python
# Validate email format
import re

email = request_data.get('email', '')
if email and not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
    raise UserError(f"Invalid email format: {email}")

# Validate required fields
required_fields = ['name', 'email', 'phone']
missing = [f for f in required_fields if not request_data.get(f)]
if missing:
    raise UserError(f"Missing required fields: {', '.join(missing)}")
```

### 2. Format Conversion

Convert between different data formats:

```python
# Date format conversion
from datetime import datetime

# Convert from MM/DD/YYYY to YYYY-MM-DD
datetime.strptime(request_data.get('birth_date', ''), '%m/%d/%Y').strftime('%Y-%m-%d')

# Phone number formatting
''.join(filter(str.isdigit, request_data.get('phone', '')))
```

### 3. Conditional Logic

Apply business rules based on data values:

```python
# Customer categorization based on order value
total_orders = request_data.get('total_orders', 0)

if total_orders > 100000:
    category = 'platinum'
    discount = 0.20
elif total_orders > 50000:
    category = 'gold'
    discount = 0.15
elif total_orders > 10000:
    category = 'silver'
    discount = 0.10
else:
    category = 'bronze'
    discount = 0.05

# Update customer record
record.write({
    'customer_category': category,
    'discount_percentage': discount * 100
})
```

### 4. Relational Processing

Handle complex relationships between records:

```python
# Find or create related partner
partner_data = request_data.get('company', {})
if partner_data:
    # Search for existing partner
    partner = env['res.partner'].search([
        ('name', '=', partner_data.get('name')),
        ('is_company', '=', True)
    ], limit=1)
    
    if not partner:
        # Create new partner
        partner = env['res.partner'].create({
            'name': partner_data.get('name'),
            'is_company': True,
            'email': partner_data.get('email'),
            'phone': partner_data.get('phone'),
        })
```

### 5. Data Aggregation

Calculate summary values from multiple sources:

```python
# Calculate total from line items
line_items = request_data.get('items', [])
total = 0
tax_total = 0

for item in line_items:
    quantity = item.get('quantity', 0)
    price = item.get('price', 0)
    tax_rate = item.get('tax_rate', 0)
    
    subtotal = quantity * price
    tax = subtotal * (tax_rate / 100)
    
    total += subtotal
    tax_total += tax

# Create invoice lines
for item in line_items:
    env['account.move.line'].create({
        'move_id': record.id,
        'product_id': item.get('product_id'),
        'quantity': item.get('quantity'),
        'price_unit': item.get('price'),
    })

record.write({'amount': total + tax_total})
```

## Advanced Techniques

### Error Handling

```python
try:
    # Risky operation
    value = int(request_data.get('quantity'))
    if value < 0:
        raise ValueError("Quantity cannot be negative")
except ValueError as e:
    # Log error and use default
    env['bj.api.log'].create({
        'name': f"Data transformation error: {str(e)}",
        'request_data': str(request_data),
    })
```

### Logging and Debugging

```python
# Debug logging
import logging
_logger = logging.getLogger(__name__)

_logger.info(f"Processing record: {record.id}")
_logger.debug(f"Request data: {request_data}")

# Create audit log
env['bj.api.log'].create({
    'config_id': config.id,
    'record_id': record.id,
    'action': 'transform',
    'details': f"Transformed {len(request_data)} fields",
})
```

### Performance Optimization

```python
# Batch operations for better performance
record_ids = request_data.get('record_ids', [])

# Bad: Individual queries
# for rid in record_ids:
#     rec = env['model'].browse(rid)
#     rec.write({'field': value})

# Good: Batch operation
if record_ids:
    records = env['model'].browse(record_ids)
    records.write({'field': value})
```

## Best Practices

1. **Always validate input data** before processing
2. **Use try-except blocks** for error handling
3. **Log important operations** for debugging
4. **Optimize database queries** with batch operations
5. **Document complex logic** with comments
6. **Test scripts thoroughly** before production
7. **Handle None/null values** gracefully
8. **Use type conversion** carefully

## Common Pitfalls

### Avoid These Mistakes

```python
# ❌ Bad: Modifying request_data directly
request_data['field'] = 'value'  # Don't do this

# ✅ Good: Create new variables
modified_value = request_data.get('field', '') + '_suffix'

# ❌ Bad: Using undefined variables
undefined_variable  # Will cause error

# ✅ Good: Check variable existence
locals().get('variable_name', default_value)

# ❌ Bad: Infinite loops
while True:  # Dangerous
    process_data()

# ✅ Good: Bounded loops
for i in range(max_iterations):
    if condition_met:
        break
    process_data()
```

## Testing Your Scripts

### Test Data Examples

```python
# Test with various input scenarios
test_cases = [
    {'name': 'Test Customer', 'email': 'test@example.com'},  # Valid
    {'name': 'No Email'},  # Missing email
    {'email': 'invalid-email'},  # Invalid format
    {},  # Empty data
]

for test_data in test_cases:
    try:
        # Your script logic here
        result = transform_data(test_data)
        print(f"Success: {result}")
    except Exception as e:
        print(f"Error with {test_data}: {str(e)}")
```

## Related Documentation

- [Context Variables Reference](context-variables)
- [API Configuration](../configuration/overview)
- [Error Handling](../troubleshooting)
- [Performance Optimization](../performance-optimization)