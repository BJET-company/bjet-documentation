---
id: field-mapping
title: Field Mapping Guide
sidebar_label: Field Mapping
description: Comprehensive guide to mapping fields between Odoo models and external APIs
---

# Field Mapping Guide

Field mapping is the core of API synchronization, defining how data flows between Odoo and external systems. This guide provides comprehensive instructions for configuring field mappings effectively.

## Overview

Field mapping defines the relationship between:
- **Odoo Fields** - Fields in your Odoo models (e.g., `res.partner.name`)
- **API Fields** - Fields in external API requests/responses (e.g., `customer_name`)
- **Transformations** - Data processing during synchronization

## Basic Field Mapping

### Simple One-to-One Mapping

The most common scenario is direct field mapping:

```python
# Odoo Field → API Field
partner.name → customer_name
partner.email → contact_email
partner.phone → phone_number
```

### Configuration Steps

1. **Navigate to Field Mapping**
   - Go to **Settings → Technical → API Sync Configurations**
   - Select your configuration
   - Click on **Field Mappings** tab

2. **Add New Mapping**
   ```
   Odoo Field: name
   API Field: customer_name
   Direction: Both (Inbound & Outbound)
   Required: Yes
   ```

3. **Save and Test**
   - Save the configuration
   - Test with sample data
   - Verify mapping in logs

## Advanced Field Types

Our API connector supports **relational field mapping** directly from the configuration UI.  
This eliminates the need for custom Python functions — instead, users can configure mappings in the **API Configuration** screen by choosing **Value Calculation Type → Relational with Mapping Model** and linking to the correct mapping model.

---

### Many2one Fields

For single-value relations (e.g. `filed_id` on Model):

#### Example: Product → Unit of Measure

**Product Creation config**

| Field                       | Value Calculation Type         | External API Key | Mapping Model | Is Record Identifier |
|------------------------------|--------------------------------|-----------------|---------------|----------------------|
| Unit of Measure (Product)    | Relational with Mapping Model  | `uom_id`        | `uom`         | False                |

**UoM config**

| Field                                   | Value Calculation Type | External API Key | Is Record Identifier |
|-----------------------------------------|------------------------|-----------------|----------------------|
| Display Name (Product Unit of Measure)  | Plain                  | `name`          | False                |
| ID (Product Unit of Measure)            | Plain                  | `id`            | True                 |

💡 When the product is created via API, the system automatically resolves the `uom_id` from the external payload to the correct Odoo `uom.uom` record.

---

### One2many Fields

For child records (e.g. order lines), configure a separate mapping model for the child object.

**Order config**

| Field        | Value Calculation Type        | External API Key | Mapping Model |
|--------------|-------------------------------|-----------------|---------------|
| Order Lines  | Relational with Mapping Model | `items`         | order_line    |

**Order Line config**

| Field              | Value Calculation Type        | External API Key | Mapping Model   |
|--------------------|-------------------------------|-----------------|-----------------|
| Product            | Relational with Mapping Model | `sku`           | product         |
| Quantity           | Plain                         | `qty`           | —               |
| Unit Price         | Plain                         | `price`         | —               |

The connector generates `(0, 0, {...})` tuples automatically from each child record.

---

### Many2many Fields

For multiple relationships (e.g. tags), define a mapping model that resolves external values into Odoo IDs.

**Product config**

| Field   | Value Calculation Type        | External API Key | Mapping Model  |
|---------|-------------------------------|-----------------|----------------|
| Tags    | Relational with Mapping Model | `tags`          | product_tag    |

**Product Tag config**

| Field        | Value Calculation Type | External API Key | Is Record Identifier |
|--------------|------------------------|-----------------|----------------------|
| Tag Name     | Plain                  | `name`          | True                 |
| External ID  | Plain                  | `id`            | False                |

The connector builds the `(6, 0, ids)` list automatically.

---

### Why This Flow Works

- **UI-first**: Users configure mapping entirely through the API Configuration screen — no coding required.  
- **Reusable**: Each relational mapping model (e.g. `uom`, `order_line`, `product_tag`) can be linked to multiple parent configurations.  
- **Consistent**: The same pattern works for `Many2one`, `One2many`, and `Many2many`.  
- **Extensible**: Developers can still extend mapping models if special business logic is required.

---


## Data Transformation

### Using Python Scripts

Transform data during synchronization:

```python
def transform_inbound(data):
    """Transform incoming API data to Odoo format"""
    
    # Format phone number
    phone = data.get('phone', '')
    if phone and not phone.startswith('+'):
        phone = '+1' + phone.replace('-', '')
    
    # Parse address
    address_parts = data.get('address', '').split(',')
    
    return {
        'name': data.get('customer_name'),
        'phone': phone,
        'street': address_parts[0] if address_parts else '',
        'city': address_parts[1].strip() if len(address_parts) > 1 else '',
        'email': data.get('email', '').lower(),
        'customer_rank': 1
    }
```

### Common Transformations

#### Date Format Conversion

if you have method 'convert_date_format'
```python
from datetime import datetime

def convert_date_format(date_string):
    """Convert API date format to Odoo format"""
    if not date_string:
        return False
    
    # Parse various formats
    formats = [
        '%Y-%m-%d',
        '%m/%d/%Y',
        '%d-%m-%Y',
        '%Y-%m-%dT%H:%M:%S'
    ]
    
    for fmt in formats:
        try:
            dt = datetime.strptime(date_string, fmt)
            return dt.strftime('%Y-%m-%d')
        except ValueError:
            continue
    
    return False
```
you can use this as a script by mode 'Evaluate'

```python
record.convert_date_format(request_data.get('date_string'))
```

#### Currency Conversion

```python
def convert_currency(amount, from_currency, to_currency):
    """Convert amount between currencies"""
    if from_currency == to_currency:
        return amount
    
    # Get exchange rate
    rate = env['res.currency'].search([
        ('name', '=', from_currency)
    ]).rate
    
    base_amount = amount / rate
    
    target_rate = env['res.currency'].search([
        ('name', '=', to_currency)
    ]).rate
    
    return base_amount * target_rate
```
you can use this as a script by mode 'Evaluate'

```python
record.convert_currency(request_data.get('amount'), 'UAH', 'USD')
```

## Conditional Mapping

### Dynamic Field Selection

Map fields based on conditions:

you can use this as a script by mode 'Execute'

```python
    
mapping = {}

# Map based on customer type
if request_data.get('customer_type') == 'B2B':
    mapping.update({
        'is_company': True,
        'partner_type': 'company',
        'vat': request_data.get('tax_id')
    })
else:
    mapping.update({
        'is_company': False,
        'partner_type': 'individual',
        'first_name': request_data.get('first_name'),
        'last_name': request_data.get('last_name')
    })

# Map based on country
country = request_data.get('country')
if country == 'US':
    mapping['state_id'] = find_us_state(request_data.get('state'))

env['res.partner'].create(mapping)
```

### Validation Rules

Implement field validation:

you can use this as a script by mode 'Execute'

```python
    
validations = {
    'email': lambda v: '@' in v and '.' in v,
    'phone': lambda v: len(v.replace('-', '')) >= 10,
    'vat': lambda v: v.isalnum(),
    'zip': lambda v: v.isdigit() and len(v) == 5
}

validator = validations.get('email') # as example
for k in validations.keys():
    if validator and not validator(request_data.get(k)):
        raise ValueError(f"Invalid {field_name}: {value}")
```

## Nested JSON Mapping

### Handling Complex Structures

For deeply nested objects (e.g. customer → address → tags), configure **relational mapping models**:

- **Parent Config (e.g. Customer)**  
  Define the top-level fields and link relational fields to sub-mapping models.

- **Child Config (e.g. Address, Tags)**  
  Each nested structure (like `address` or `tags`) is represented by its own mapping model.  
  These models resolve the nested JSON into Odoo fields (e.g. `street`, `city`, `zip`, or Many2many tags).


### Flattening Nested Data

For dynamic or unpredictable payloads, you can flatten nested JSON in **Execute mode**.  
This allows you to preprocess the incoming request into a simple key/value format that the connector can then map normally.

#### Example: Flatten Nested JSON

```python
def flatten_json(nested_json, parent_key='', separator='_'):
    """Flatten nested JSON structure into simple key/value pairs"""
    items = []
    
    for key, value in nested_json.items():
        new_key = f"{parent_key}{separator}{key}" if parent_key else key
        
        if isinstance(value, dict):
            items.extend(
                flatten_json(value, new_key, separator).items()
            )
        elif isinstance(value, list):
            items.append((new_key, ','.join(map(str, value))))
        else:
            items.append((new_key, value))
    
    return dict(items)

record.flattened = flatten_json(request_data)
```

## Bi-directional Mapping

### Synchronizing Both Ways

Configure mappings for both inbound and outbound:

you can use this as a script by mode 'Evaluate'

```python
record.format_phone(request_data.get('phone'))
# OR
record.clean_phone(request_data.get('phone'))
# OR
record.write_date.isoformat()
```

## Troubleshooting Field Mapping

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Field not found | Incorrect field name | Verify field technical name |
| Type mismatch | Wrong data type | Apply proper type conversion |
| Required field missing | Missing mapping | Add required field mapping |
| Relational field error | Invalid ID reference | Implement proper lookup |

### Debugging Tips

1. **Enable Debug Logging**
   ```python
   import logging
   _logger = logging.getLogger(__name__)
   
   def debug_mapping(data):
       _logger.info(f"Input data: {data}")
       mapped = perform_mapping(data)
       _logger.info(f"Mapped result: {mapped}")
       return mapped
   ```

2. **Validate Mappings**
   ```python
   def validate_mapping_config(mapping_config):
       """Validate field mapping configuration"""
       errors = []
       
       for mapping in mapping_config:
           # Check Odoo field exists
           model = env[mapping['model']]
           if mapping['odoo_field'] not in model._fields:
               errors.append(f"Field {mapping['odoo_field']} not found")
       
       return errors
   ```

## Best Practices

1. **Keep Mappings Simple**
   - Use direct mappings when possible
   - Complex transformations in separate functions

2. **Document Mappings**
   - Add comments explaining transformations
   - Document business logic

3. **Handle Edge Cases**
   - Null values
   - Empty strings
   - Invalid data types

4. **Test Thoroughly**
   - Unit test transformation functions
   - Test with real data
   - Verify bi-directional sync

## Next Steps

- [Configure Authentication](./authentication) - Set up API authentication
- [Python Script Examples](../python-scripts/context-variables) - Advanced transformations
- [Troubleshooting](../troubleshooting) - Debug mapping issues