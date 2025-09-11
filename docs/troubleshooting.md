---
sidebar_position: 10
title: Troubleshooting
---

# Troubleshooting Guide

Common issues and solutions for the BJET API Synchronization Module.

## Authentication Issues

### 401 Unauthorized Error

**Symptoms:**
- API returns 401 status code
- "Authentication failed" message

**Solutions:**
1. **Verify Credentials**
   - Check username and password for Basic Auth
   - Confirm Bearer Token is valid and not expired
   - Ensure credentials match those configured in Odoo

2. **Check Headers Format**
   ```bash
   # Basic Auth - Correct format
   Authorization: Basic dXNlcjpwYXNz
   
   # Bearer Token - Correct format
   Authorization: Bearer your_token_here
   ```

3. **Verify Configuration**
   - Ensure authentication type is set correctly in API configuration
   - Check that the user has proper permissions in Odoo

### Token Expiration

**Solution:**
Generate a new token or implement token refresh logic in your application.

## Connection Issues

### Timeout Errors

**Symptoms:**
- 408 Request Timeout
- Connection timeout exceeded

**Solutions:**
1. **Increase Timeout Values**
   ```python
   Connection Timeout: 10  # Increase from default 5
   Read Timeout: 30        # Increase from default 15
   ```

2. **Check Network Connectivity**
   - Verify firewall rules allow connection
   - Test connectivity with ping or curl
   - Check proxy settings if applicable

3. **Optimize Query Performance**
   - Add domain filters to reduce data
   - Use pagination for large datasets
   - Index database fields used in filters

### 404 Not Found

**Symptoms:**
- Endpoint not found
- Configuration not found

**Solutions:**
1. Verify endpoint name matches configuration
2. Check URL format: `/bj_api_sync/v1/<endpoint_name>`
3. Ensure configuration is active and saved

## Data Issues

### Field Mapping Problems

**Symptoms:**
- Fields not syncing correctly
- Data type mismatches
- Missing required fields

**Solutions:**
1. **Validate Field Names**
   - Check exact field names in Odoo model
   - Verify external API key names
   - Case sensitivity matters

2. **Check Data Types**
   ```python
   # Example: Convert string to float
   amount = float(request_data.get('amount', 0))
   ```

3. **Required Fields**
   - Ensure all required Odoo fields are mapped
   - Mark exactly one field as Record Identifier

### Python Script Errors

**Symptoms:**
- Script execution fails
- Unexpected data transformations

**Solutions:**
1. **Test Scripts Independently**
   ```python
   # Test in Odoo shell
   python odoo-bin shell
   >>> env = self.env
   >>> request_data = {'test': 'data'}
   >>> # Your script here
   ```

2. **Add Error Handling**
   ```python
   try:
       result = complex_operation()
   except Exception as e:
       raise UserError(f'Script error: {str(e)}')
   ```

3. **Use Logging**
   ```python
   import logging
   _logger = logging.getLogger(__name__)
   _logger.info(f'Processing: {request_data}')
   ```

## Performance Issues

### Slow Response Times

**Solutions:**
1. **Optimize Batch Size**
   - Reduce page size for complex operations
   - Default: 100, try 50 or 25

2. **Add Indexes**
   ```sql
   CREATE INDEX idx_partner_ref ON res_partner(ref);
   ```

3. **Use Efficient Filters**
   ```python
   # Good - specific filter
   [('active', '=', True), ('customer_rank', '>', 0)]
   
   # Bad - no filter
   []
   ```

### Memory Issues

**Solutions:**
1. Enable pagination
2. Process records in batches
3. Clear cache periodically

## HTTP Method Issues

### 405 Method Not Allowed

**Symptoms:**
- Specific HTTP method rejected

**Solutions:**
1. Enable the method in configuration
2. For outbound, select exactly one method
3. Verify method is supported by external API

## Logging and Debugging

### Enable Debug Logging

1. **In Odoo Configuration**
   ```ini
   [options]
   log_level = debug
   log_handler = bj.api:DEBUG
   ```

2. **Check Logs Location**
   ```bash
   tail -f /var/log/odoo/odoo.log
   ```

3. **View API Logs**
   - Navigate to: **Settings > Technical > BJ API > Logs**
   - Filter by configuration or date
   - Check request and response details

## Common Error Codes

| Code | Description | Common Cause | Solution |
|------|-------------|--------------|----------|
| 400 | Bad Request | Invalid JSON | Validate JSON format |
| 401 | Unauthorized | Invalid credentials | Check authentication |
| 403 | Forbidden | No permissions | Check user access rights |
| 404 | Not Found | Wrong endpoint | Verify configuration |
| 405 | Method Not Allowed | Method not enabled | Enable in config |
| 408 | Request Timeout | Slow response | Increase timeout |
| 500 | Server Error | Odoo error | Check server logs |

## Best Practices for Troubleshooting

1. **Start Simple**
   - Test with minimal configuration
   - Add complexity gradually
   - Verify each step works

2. **Use Test Data**
   - Create test records
   - Use non-production environment
   - Keep backups

3. **Monitor Logs**
   - Enable debug logging during setup
   - Check both Odoo and external API logs
   - Look for patterns in errors

4. **Document Issues**
   - Keep track of errors and solutions
   - Note configuration changes
   - Share knowledge with team

## Getting Help

If you continue to experience issues:

1. **Check Documentation**
   - Review configuration guides
   - Check API reference
   - Read Python script examples

2. **Gather Information**
   - Error messages and codes
   - Configuration screenshots
   - Log excerpts
   - Steps to reproduce

3. **Contact Support**
   - Email: [support@bjetpro.com](mailto:support@bjetpro.com)
   - Include Odoo version and module version
   - Provide detailed issue description

## Quick Fixes Checklist

- [ ] Authentication credentials correct?
- [ ] Endpoint URL properly formatted?
- [ ] HTTP method enabled in configuration?
- [ ] Required fields mapped?
- [ ] Record identifier set?
- [ ] Network connectivity working?
- [ ] Timeout values sufficient?
- [ ] User has proper permissions?
- [ ] JSON format valid?
- [ ] Python scripts tested?