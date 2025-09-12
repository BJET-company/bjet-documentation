---
id: base-automation
title: Base Automation Configuration
sidebar_label: Base Automation
description: Guide to setting up automated API synchronization using Odoo's base automation
---

# Base Automation Configuration

Base automation enables automatic API synchronization triggered by specific events in Odoo. This guide explains how to configure automated workflows for seamless data synchronization.

## Overview

Base automation allows you to:
- **Trigger API calls** when records are created, updated, or deleted
- **Schedule periodic synchronization** for batch processing
- **React to field changes** with immediate API updates
- **Chain multiple automations** for complex workflows

## Setting Up Base Automation

### Prerequisites

1. **API Configuration** must be completed
2. **Field mappings** must be defined
3. User must have **Technical Features** enabled
4. **Base Automation** module must be installed

### Step-by-Step Configuration

#### 1. Access Automation Rules

Navigate to: **Settings → Technical → Automation → Automation Rules**

*Base Automation configuration interface*

#### 2. Create New Rule

Click **Create** and configure:

```python
Name: Sync Customer to External API
Model: Contact (res.partner)
Trigger: On Creation & Update
Active: Yes
```

#### 3. Configure Trigger Conditions

Define when the automation should run:

```python
# Trigger Conditions
Trigger: On Creation & Update
Before Update Domain: [('is_company', '=', True)]
Apply on: [('customer_rank', '>', 0)]
Watch Fields: name, email, phone, vat
```

## Trigger Types

### On Creation

Sync new records immediately:

```python
# Automation Rule
Name: Sync New Customers
Model: res.partner
Trigger: On Creation
Action: Execute Python Code

# Python Code
if record.customer_rank > 0:
    api_config = env['api.sync.config'].search([
        ('model_name', '=', 'res.partner'),
        ('active', '=', True)
    ], limit=1)
    if api_config:
        api_config.sync_record(record, 'create')
```

### On Update

Sync when specific fields change:

```python
# Automation Rule
Name: Update Customer Changes
Model: res.partner
Trigger: On Update
Watch Fields: ['name', 'email', 'phone', 'street']

# Python Code
if record.customer_rank > 0:
    changed_fields = []
    for field in ['name', 'email', 'phone', 'street']:
        if getattr(record, field) != getattr(old_values, field):
            changed_fields.append(field)
    
    if changed_fields:
        api_config.sync_record(record, 'update', changed_fields)
```

### On Deletion

Notify external system of deletions:

```python
# Automation Rule
Name: Sync Customer Deletion
Model: res.partner
Trigger: On Deletion

# Python Code
api_config = env['api.sync.config'].search([
    ('model_name', '=', 'res.partner'),
    ('active', '=', True)
], limit=1)

if api_config:
    # Send deletion notification
    api_config.send_deletion_notice(record.id, record.name)
```

### Scheduled Actions

Configure periodic synchronization:

```python
# Scheduled Action
Name: Daily Customer Sync
Model: ir.cron
Active: Yes
Interval: 1 Day
Next Execution: 2024-01-01 02:00:00

# Python Code
def run_daily_sync():
    """Sync all modified customers daily"""
    yesterday = datetime.now() - timedelta(days=1)
    
    customers = env['res.partner'].search([
        ('write_date', '>=', yesterday),
        ('customer_rank', '>', 0)
    ])
    
    api_config = env['api.sync.config'].search([
        ('model_name', '=', 'res.partner')
    ], limit=1)
    
    for customer in customers:
        api_config.sync_record(customer, 'update')
```

## Advanced Automation Patterns

### Conditional Synchronization

Sync based on complex conditions:

```python
def should_sync_customer(record):
    """Determine if customer should be synced"""
    
    # Check multiple conditions
    conditions = [
        record.customer_rank > 0,
        record.email and '@' in record.email,
        record.country_id.code in ['US', 'CA', 'MX'],
        not record.is_blacklisted
    ]
    
    return all(conditions)

# In automation rule
if should_sync_customer(record):
    api_config.sync_record(record, 'update')
```

### Batch Processing

Process multiple records efficiently:

```python
def batch_sync_customers():
    """Sync customers in batches"""
    
    batch_size = 100
    customers = env['res.partner'].search([
        ('sync_status', '=', 'pending'),
        ('customer_rank', '>', 0)
    ], limit=batch_size)
    
    if customers:
        api_config = env['api.sync.config'].search([
            ('model_name', '=', 'res.partner')
        ], limit=1)
        
        # Prepare batch data
        batch_data = []
        for customer in customers:
            batch_data.append({
                'id': customer.id,
                'data': api_config.prepare_outbound_data(customer)
            })
        
        # Send batch
        response = api_config.send_batch(batch_data)
        
        # Update sync status
        if response.get('success'):
            customers.write({'sync_status': 'synced'})
```

### Error Handling

Implement robust error handling:

```python
def sync_with_retry(record, max_retries=3):
    """Sync with automatic retry on failure"""
    
    for attempt in range(max_retries):
        try:
            api_config = env['api.sync.config'].search([
                ('model_name', '=', record._name)
            ], limit=1)
            
            result = api_config.sync_record(record, 'update')
            
            if result.get('success'):
                record.write({
                    'sync_status': 'success',
                    'last_sync': fields.Datetime.now()
                })
                return True
            
        except Exception as e:
            if attempt == max_retries - 1:
                record.write({
                    'sync_status': 'failed',
                    'sync_error': str(e)
                })
                # Send notification
                record.message_post(
                    body=f"API Sync Failed: {str(e)}"
                )
            else:
                time.sleep(2 ** attempt)  # Exponential backoff
    
    return False
```

## Workflow Integration

### Multi-Step Workflows

Chain automations for complex processes:

```python
# Step 1: Validate Customer Data
def validate_customer_data(record):
    """First step: Validate data completeness"""
    required_fields = ['name', 'email', 'phone']
    
    missing = [f for f in required_fields if not getattr(record, f)]
    if missing:
        record.message_post(
            body=f"Missing required fields: {', '.join(missing)}"
        )
        return False
    
    record.write({'validation_status': 'validated'})
    return True

# Step 2: Enrich Customer Data
def enrich_customer_data(record):
    """Second step: Enrich with external data"""
    if record.validation_status != 'validated':
        return False
    
    # Call enrichment API
    enrichment_data = call_enrichment_api(record.email)
    record.write({
        'industry': enrichment_data.get('industry'),
        'company_size': enrichment_data.get('size'),
        'enrichment_status': 'enriched'
    })
    return True

# Step 3: Sync to External System
def sync_enriched_customer(record):
    """Final step: Sync enriched data"""
    if record.enrichment_status != 'enriched':
        return False
    
    api_config.sync_record(record, 'create')
    record.write({'workflow_status': 'completed'})
```

### State-Based Automation

Trigger based on state changes:

```python
# Automation Rule for State Changes
Name: Sync on State Change
Model: sale.order
Trigger: On Update
Watch Fields: ['state']

# Python Code
if record.state == 'sale' and old_values.get('state') != 'sale':
    # Order confirmed - sync to external system
    api_config = env['api.sync.config'].search([
        ('model_name', '=', 'sale.order')
    ], limit=1)
    
    order_data = {
        'order_number': record.name,
        'customer': record.partner_id.name,
        'total': record.amount_total,
        'status': 'confirmed',
        'lines': [
            {
                'product': line.product_id.name,
                'quantity': line.product_uom_qty,
                'price': line.price_unit
            }
            for line in record.order_line
        ]
    }
    
    api_config.send_outbound(order_data)
```

## Performance Optimization

### Asynchronous Processing

Use job queue for better performance:

```python
from odoo.addons.queue_job.job import job

@job(default_channel='root.api_sync')
def async_sync_record(record_id, model_name, operation):
    """Asynchronous record synchronization"""
    
    env = api.Environment(cr, uid, context)
    record = env[model_name].browse(record_id)
    
    api_config = env['api.sync.config'].search([
        ('model_name', '=', model_name)
    ], limit=1)
    
    return api_config.sync_record(record, operation)

# In automation rule
record.with_delay().async_sync_record(
    record.id, 
    record._name, 
    'update'
)
```

### Bulk Operations

Optimize for multiple records:

```python
def bulk_sync_optimization():
    """Optimize synchronization for bulk operations"""
    
    # Collect records to sync
    records_to_sync = env['res.partner'].search([
        ('sync_pending', '=', True)
    ])
    
    if len(records_to_sync) > 10:
        # Use bulk endpoint
        bulk_data = [
            api_config.prepare_outbound_data(r)
            for r in records_to_sync
        ]
        api_config.send_bulk(bulk_data)
    else:
        # Individual sync for small batches
        for record in records_to_sync:
            api_config.sync_record(record, 'update')
```

## Monitoring and Logging

### Activity Logging

Track automation execution:

```python
def log_automation_activity(record, action, result):
    """Log automation activity for monitoring"""
    
    env['api.sync.log'].create({
        'model': record._name,
        'record_id': record.id,
        'record_name': record.display_name,
        'action': action,
        'status': 'success' if result else 'failed',
        'timestamp': fields.Datetime.now(),
        'details': json.dumps(result) if result else ''
    })
    
    # Update record
    record.write({
        'last_sync': fields.Datetime.now(),
        'sync_count': record.sync_count + 1
    })
```

### Performance Metrics

Track synchronization performance:

```python
import time

def track_sync_performance(func):
    """Decorator to track sync performance"""
    
    def wrapper(record, *args, **kwargs):
        start_time = time.time()
        
        result = func(record, *args, **kwargs)
        
        duration = time.time() - start_time
        
        # Log performance
        env['api.performance.log'].create({
            'model': record._name,
            'record_id': record.id,
            'operation': func.__name__,
            'duration': duration,
            'timestamp': fields.Datetime.now()
        })
        
        return result
    
    return wrapper
```

## Troubleshooting Automation

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Automation not triggering | Incorrect trigger conditions | Review and test conditions |
| Duplicate synchronization | Multiple rules firing | Add mutex locks |
| Performance degradation | Synchronous processing | Implement async processing |
| Missing updates | Field not in watch list | Add field to watch list |

### Debugging Automation

```python
def debug_automation_rule(record):
    """Debug automation execution"""
    
    import logging
    _logger = logging.getLogger(__name__)
    
    _logger.info(f"Automation triggered for {record._name}:{record.id}")
    _logger.info(f"Record data: {record.read()[0]}")
    
    try:
        # Your automation logic
        result = api_config.sync_record(record, 'update')
        _logger.info(f"Sync result: {result}")
    except Exception as e:
        _logger.error(f"Automation failed: {str(e)}", exc_info=True)
        raise
```

## Best Practices

1. **Use Appropriate Triggers**
   - Choose the right trigger for your use case
   - Avoid overlapping rules

2. **Implement Error Handling**
   - Always handle exceptions
   - Log errors for debugging

3. **Optimize Performance**
   - Use async processing for heavy operations
   - Batch operations when possible

4. **Monitor Execution**
   - Log automation activities
   - Track performance metrics

5. **Test Thoroughly**
   - Test with various scenarios
   - Verify error handling

## Next Steps

- [Field Mapping Configuration](../configuration/field-mapping) - Set up field mappings
- [Python Scripts](../python-scripts/context-variables) - Advanced scripting
- [Troubleshooting](../troubleshooting) - Debug automation issues