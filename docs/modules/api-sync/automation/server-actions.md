---
sidebar_position: 2
title: Server Actions
description: Configure server actions for manual and automated triggers
---

# Server Actions Configuration

Configure server actions to trigger API synchronization manually or automatically.

## Creating Server Actions

### Step 1: Access Server Actions

Navigate to **Settings > Technical > Actions > Server Actions**.

![Server Action Configuration](/img/api-sync/server-action-config.png)
*Server Action configuration interface*

### Step 2: Create New Action

1. Click **Create**
2. Set **Action Name** (e.g., "Sync Customer to API")
3. Select **Model** (must match your API configuration model)
4. Choose **Action To Do**: Execute Python Code

### Step 3: Configure Python Code

Add the synchronization code:

```python
# Get the API configuration
config = env['bj.api.sync.config'].search([
    ('name', '=', 'Customer Export API')
], limit=1)
# OR use config_index - should be replaced to your API Configuration index 
# env['bj.api.sync.config']._make_outbound_http_request(record_ids=record.order_line, config_id_ref=config_index)

if config:
    # For selected records (if triggered from list view)
    for record in records:
        try:
            config._make_outbound_http_request(record, config.id, timeout=60)
            # Log success
            env['bj.api.log'].create({
                'config_id': config.id,
                'name': f'Successfully synced {record.name}',
                'status': 'success',
            })
        except Exception as e:
            # Log error
            env['bj.api.log'].create({
                'config_id': config.id,
                'name': f'Error syncing {record.name}: {str(e)}',
                'status': 'error',
            })
```

## Trigger Methods

### Manual Trigger from UI

![Trigger Action Configuration](/img/api-sync/trigger-action-config.png)
*Manual trigger from action menu*

1. Add to **Action** menu
2. Enable **Create More Menu**
3. Users can trigger from:
   - List view (multiple records)
   - Form view (single record)
   - Action menu

### Automated Trigger

Link server actions to:
- Base Automation rules
- Scheduled Actions (Cron)
- Workflow transitions
- Button clicks

## Use Cases

### 1. Bulk Synchronization

Sync multiple records at once:

```python
# Bulk sync with progress tracking
total = len(records)
success = 0
failed = 0

for i, record in enumerate(records):
    try:
        config._make_outbound_http_request(record, config.id)
        success += 1
    except:
        failed += 1
    
    # Update progress (optional)
    if i % 10 == 0:
        env.cr.commit()  # Commit every 10 records

# Summary notification
message = f"Sync complete: {success} success, {failed} failed out of {total}"
```

### 2. Conditional Sync

Only sync records meeting criteria:

```python
# Only sync approved customers
for record in records:
    if record.state == 'approved' and record.sync_enabled:
        config._make_outbound_http_request(record, config.id)
    else:
        env['bj.api.log'].create({
            'name': f'Skipped {record.name}: Not approved or sync disabled',
            'status': 'skipped',
        })
```

### 3. Sync with Validation

Validate before syncing:

```python
def validate_record(record):
    """Validate record before sync"""
    errors = []
    
    if not record.email:
        errors.append("Email is required")
    if not record.phone:
        errors.append("Phone is required")
    if record.credit_limit < 0:
        errors.append("Invalid credit limit")
    
    return errors

# Validate and sync
for record in records:
    errors = validate_record(record)
    
    if errors:
        env['bj.api.log'].create({
            'name': f'Validation failed for {record.name}: {", ".join(errors)}',
            'status': 'error',
        })
    else:
        config._make_outbound_http_request(record, config.id)
```

## Advanced Configuration

### Error Handling

Implement robust error handling:

```python
import json
from odoo.exceptions import UserError

max_retries = 3
retry_delay = 2  # seconds

for record in records:
    for attempt in range(max_retries):
        try:
            response = config._make_outbound_http_request(record, config.id)
            
            # Check response
            if response.status_code == 200:
                break
            elif response.status_code == 429:  # Rate limited
                time.sleep(retry_delay * (attempt + 1))
            else:
                raise UserError(f"API error: {response.status_code}")
                
        except Exception as e:
            if attempt == max_retries - 1:
                # Final attempt failed
                raise UserError(f"Failed after {max_retries} attempts: {str(e)}")
            time.sleep(retry_delay)
```

### Performance Optimization

Optimize for large datasets:

```python
# Batch processing
batch_size = 50
record_ids = records.ids

for i in range(0, len(record_ids), batch_size):
    batch_ids = record_ids[i:i + batch_size]
    batch_records = env[model_name].browse(batch_ids)
    
    # Process batch
    for record in batch_records:
        config._make_outbound_http_request(record, config.id)
    
    # Commit after each batch
    env.cr.commit()
```

### Logging and Monitoring

*API Log Viewer - Monitor synchronization logs in Settings > Technical > BJ API > Logs*

Track all synchronization activities:

```python
# Detailed logging
start_time = datetime.now()
log_entries = []

for record in records:
    record_start = datetime.now()
    
    try:
        response = config._make_outbound_http_request(record, config.id)
        duration = (datetime.now() - record_start).total_seconds()
        
        log_entries.append({
            'config_id': config.id,
            'record_id': record.id,
            'model': record._name,
            'status': 'success',
            'response_code': response.status_code,
            'duration': duration,
            'timestamp': record_start,
        })
    except Exception as e:
        log_entries.append({
            'config_id': config.id,
            'record_id': record.id,
            'model': record._name,
            'status': 'error',
            'error_message': str(e),
            'timestamp': record_start,
        })

# Create log entries
env['bj.api.log'].create(log_entries)

total_duration = (datetime.now() - start_time).total_seconds()
```

## Security Considerations

### Access Rights

- Server actions inherit model permissions
- Users need write access to trigger sync
- Configure group restrictions as needed

### Data Validation

Always validate sensitive data:

```python
# Sanitize data before sending
sensitive_fields = ['password', 'api_key', 'token']

for field in sensitive_fields:
    if field in record._fields:
        # Don't sync sensitive fields
        data.pop(field, None)
```

## Best Practices

1. **Always include error handling** in server actions
2. **Log all synchronization attempts** for audit trail
3. **Implement retry logic** for transient failures
4. **Use batch processing** for large datasets
5. **Add progress indicators** for long-running operations
6. **Validate data** before synchronization
7. **Test thoroughly** in staging environment
8. **Monitor performance** and optimize as needed

## Related Documentation

- [Base Automation](base-automation)
- [API Configuration](../configuration/overview)
- [Field Mapping](../configuration/field-mapping)
- [Troubleshooting](../troubleshooting)