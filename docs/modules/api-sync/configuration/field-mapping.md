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

### Many2one Fields

Mapping relational fields requires special handling:

```python
# Map country using code
def map_country(data):
    country_code = data.get('country_code')
    if country_code:
        country = env['res.country'].search([
            ('code', '=', country_code)
        ], limit=1)
        return country.id
    return False
```

### One2many Fields

Handle multiple related records:

```python
def map_order_lines(order_data):
    """Map order lines from API to Odoo format"""
    lines = []
    for item in order_data.get('items', []):
        lines.append((0, 0, {
            'product_id': find_product(item['sku']),
            'quantity': item['qty'],
            'price_unit': item['price']
        }))
    return lines
```

### Many2many Fields

Map multiple relationships:

```python
def map_tags(tag_names):
    """Map tag names to tag IDs"""
    tags = env['product.tag'].search([
        ('name', 'in', tag_names)
    ])
    return [(6, 0, tags.ids)]
```

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

## Conditional Mapping

### Dynamic Field Selection

Map fields based on conditions:

```python
def conditional_mapping(record, api_data):
    """Apply different mappings based on conditions"""
    
    mapping = {}
    
    # Map based on customer type
    if api_data.get('customer_type') == 'B2B':
        mapping.update({
            'is_company': True,
            'partner_type': 'company',
            'vat': api_data.get('tax_id')
        })
    else:
        mapping.update({
            'is_company': False,
            'partner_type': 'individual',
            'first_name': api_data.get('first_name'),
            'last_name': api_data.get('last_name')
        })
    
    # Map based on country
    country = api_data.get('country')
    if country == 'US':
        mapping['state_id'] = find_us_state(api_data.get('state'))
    
    return mapping
```

### Validation Rules

Implement field validation:

```python
def validate_field_mapping(field_name, value):
    """Validate field values before mapping"""
    
    validations = {
        'email': lambda v: '@' in v and '.' in v,
        'phone': lambda v: len(v.replace('-', '')) >= 10,
        'vat': lambda v: v.isalnum(),
        'zip': lambda v: v.isdigit() and len(v) == 5
    }
    
    validator = validations.get(field_name)
    if validator and not validator(value):
        raise ValueError(f"Invalid {field_name}: {value}")
    
    return value
```

## Nested JSON Mapping

### Handling Complex Structures

Map nested JSON data:

```python
def map_nested_json(json_data):
    """Map complex nested JSON to Odoo fields"""
    
    result = {}
    
    # Extract from nested structure
    customer = json_data.get('customer', {})
    result['name'] = customer.get('name')
    
    # Handle nested address
    address = customer.get('address', {})
    result['street'] = address.get('line1')
    result['street2'] = address.get('line2')
    result['city'] = address.get('city')
    result['zip'] = address.get('postal_code')
    
    # Handle nested contact info
    contact = customer.get('contact_info', {})
    result['email'] = contact.get('email')
    result['phone'] = contact.get('primary_phone')
    result['mobile'] = contact.get('mobile_phone')
    
    # Handle arrays
    result['tag_ids'] = [(6, 0, [
        find_or_create_tag(tag) 
        for tag in customer.get('tags', [])
    ])]
    
    return result
```

### Flattening Nested Data

```python
def flatten_json(nested_json, parent_key='', separator='_'):
    """Flatten nested JSON structure"""
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
```

## Bi-directional Mapping

### Synchronizing Both Ways

Configure mappings for both inbound and outbound:

```python
class BidirectionalMapper:
    """Handle bi-directional field mapping"""
    
    def to_odoo(self, api_data):
        """Map from API to Odoo"""
        return {
            'name': api_data.get('customer_name'),
            'email': api_data.get('contact_email'),
            'phone': self.format_phone(api_data.get('phone'))
        }
    
    def to_api(self, odoo_record):
        """Map from Odoo to API"""
        return {
            'customer_name': odoo_record.name,
            'contact_email': odoo_record.email,
            'phone': self.clean_phone(odoo_record.phone),
            'customer_id': odoo_record.id,
            'last_updated': odoo_record.write_date.isoformat()
        }
    
    def format_phone(self, phone):
        """Format phone for Odoo"""
        if phone:
            return '+' + ''.join(filter(str.isdigit, phone))
        return ''
    
    def clean_phone(self, phone):
        """Format phone for API"""
        if phone:
            return phone.replace('+', '').replace('-', '')
        return ''
```

## Performance Optimization

### Batch Processing

Process multiple records efficiently:

```python
def batch_map_records(records, batch_size=100):
    """Map records in batches for better performance"""
    
    mapped_records = []
    
    for i in range(0, len(records), batch_size):
        batch = records[i:i + batch_size]
        
        # Preload related data
        product_ids = [r.get('product_id') for r in batch]
        products = env['product.product'].browse(product_ids)
        product_map = {p.id: p for p in products}
        
        # Map batch
        for record in batch:
            mapped = map_single_record(record)
            mapped['product'] = product_map.get(record['product_id'])
            mapped_records.append(mapped)
    
    return mapped_records
```

### Caching Lookups

```python
class MappingCache:
    """Cache frequently looked up values"""
    
    def __init__(self):
        self._cache = {}
    
    def get_country(self, code):
        """Get country with caching"""
        if code not in self._cache:
            country = env['res.country'].search([
                ('code', '=', code)
            ], limit=1)
            self._cache[code] = country.id if country else False
        return self._cache[code]
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