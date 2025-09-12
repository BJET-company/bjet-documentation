---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
description: Common questions and answers about the BJET API Synchronization Module
---

# Frequently Asked Questions

Quick answers to common questions about the BJET API Synchronization Module.

## General Questions

### What is the BJET API Synchronization Module?

The BJET API Synchronization Module is a comprehensive solution for bidirectional data synchronization between Odoo 18.0 and external systems via REST APIs. It supports both inbound (receiving data) and outbound (sending data) synchronization with flexible authentication and field mapping options.

### Which Odoo versions are supported?

The current version (18.0.1.0.2) is specifically designed for Odoo 18.0. Previous versions are available for Odoo 15.0, 16.0, and 17.0.

### What authentication methods are supported?

The module supports three authentication methods:
- **No Authentication** - For internal/trusted networks only
- **Basic Authentication** - Username and password
- **Bearer Token** - Token-based authentication

## Installation & Setup

### How do I install the module?

1. Download the module from BJET
2. Place it in your Odoo addons directory
3. Update the app list in Odoo
4. Install "BJET API Synchronization" from the Apps menu
5. Configure your API endpoints

### What permissions are required?

Users need:
- **Technical Features** enabled for configuration
- **API Sync Manager** group for full access
- Appropriate model permissions for synchronized data

### Can I use this module in a multi-company environment?

Yes, the module fully supports multi-company setups. Each company can have its own API configurations and synchronization rules.

## Configuration

### How do I map fields between Odoo and my external API?

Navigate to **Settings → Technical → API Sync Configurations** and use the Field Mappings tab. You can:
1. Create simple one-to-one mappings
2. Use Python scripts for complex transformations
3. Handle relational fields (Many2one, One2many, Many2many)

See the [Field Mapping Guide](./configuration/field-mapping) for detailed instructions.

### Can I transform data during synchronization?

Yes! Use Python scripts in the transformation fields to:
- Format dates and phone numbers
- Convert currencies
- Map relational fields
- Validate and clean data
- Apply business logic

### How do I handle different date formats?

Use Python transformation scripts to convert between formats:

```python
from datetime import datetime

def convert_date(date_string):
    # Parse MM/DD/YYYY format
    dt = datetime.strptime(date_string, '%m/%d/%Y')
    # Return Odoo format YYYY-MM-DD
    return dt.strftime('%Y-%m-%d')
```

## API Integration

### What's the difference between inbound and outbound APIs?

- **Inbound API**: Receives data from external systems into Odoo
  - External system calls Odoo's webhook endpoint
  - Data is created/updated in Odoo

- **Outbound API**: Sends data from Odoo to external systems
  - Triggered by Odoo events (create, update, delete)
  - Odoo calls external API endpoints

### How do I test my API configuration?

1. Use the **Test Connection** button in the configuration
2. Check the Odoo logs for detailed information
3. Use tools like Postman with our [provided collection](/postman)
4. Start with simple test data before production use

### What happens if the external API is unavailable?

The module includes:
- Automatic retry logic with exponential backoff
- Error logging for debugging
- Optional queue system for failed requests
- Notification system for critical failures

## Performance

### How many records can be synchronized?

The module can handle:
- Single record operations for real-time sync
- Batch operations for bulk updates (recommended: 100-500 records per batch)
- Scheduled synchronization for large datasets

### How can I optimize synchronization performance?

1. **Use batch operations** for multiple records
2. **Implement caching** in Python scripts
3. **Schedule synchronization** during off-peak hours
4. **Limit field mappings** to necessary fields only
5. **Use indexed fields** for lookups

### Does synchronization affect Odoo performance?

The module is designed to minimize impact:
- Asynchronous processing available
- Configurable rate limiting
- Batch processing options
- Queue management for large operations

## Troubleshooting

### Why am I getting 401 Unauthorized errors?

Common causes:
1. Invalid or expired credentials
2. Incorrect authentication type selected
3. Missing or malformed Authorization header
4. User lacks necessary permissions

See [Authentication Setup](./configuration/authentication) for configuration details.

### Why aren't my records syncing?

Check:
1. API configuration is active
2. Field mappings are correct
3. Required fields are mapped
4. Transformation scripts have no errors
5. Check Odoo logs for specific error messages

### How do I debug transformation scripts?

1. Enable debug logging in Odoo
2. Add logging to your Python scripts:
   ```python
   import logging
   _logger = logging.getLogger(__name__)
   _logger.info(f"Processing data: {data}")
   ```
3. Test scripts with sample data first
4. Check the sync logs in the module

### What does "Field not found" error mean?

This indicates:
- Incorrect field technical name in mapping
- Field doesn't exist in the model
- Missing module dependency
- Incorrect model name

Verify field names using **Settings → Technical → Database Structure → Models**.

## Security

### Is the API communication secure?

Yes, when properly configured:
- Always use HTTPS for API endpoints
- Credentials are encrypted in the database
- Support for OAuth 2.0 and token-based auth
- IP whitelisting available
- Rate limiting to prevent abuse

### How are credentials stored?

- Passwords and tokens are encrypted in the database
- Use environment variables for sensitive data
- Never commit credentials to version control
- Regular credential rotation recommended

### Can I restrict API access by IP?

Yes, you can:
1. Configure Odoo's web server (nginx/Apache) for IP filtering
2. Use firewall rules
3. Implement custom validation in Python scripts

## Advanced Features

### Can I sync with multiple external systems?

Yes! Create multiple API configurations:
- Each configuration is independent
- Different authentication per system
- Custom field mappings for each
- Separate scheduling and triggers

### How do I handle custom fields?

Custom fields are fully supported:
1. Add them to your Odoo model
2. Map them in field configuration
3. Handle in transformation scripts if needed

### Can I trigger custom workflows?

Yes, using:
- Base automation rules
- Python scripts in transformations
- Webhook responses
- Custom server actions

### Is there support for webhooks?

Yes, the module supports:
- Inbound webhooks to receive data
- Outbound webhooks to notify external systems
- Configurable webhook endpoints
- Custom webhook payload formatting

## Best Practices

### What's the recommended sync frequency?

Depends on your use case:
- **Real-time**: Critical data (orders, inventory)
- **Hourly**: Frequently changing data
- **Daily**: Master data (products, customers)
- **Weekly**: Historical data, reports

### Should I use synchronous or asynchronous sync?

- **Synchronous**: For critical, real-time data
- **Asynchronous**: For bulk operations, non-critical data

### How should I handle errors?

1. Implement comprehensive logging
2. Set up email notifications for critical errors
3. Use retry logic with exponential backoff
4. Monitor sync logs regularly
5. Have a manual fallback process

## Support & Resources

### Where can I find more documentation?

- [Complete Documentation](/docs/intro)
- [API Reference](./api-reference)
- [Configuration Guides](./configuration/overview)
- [Python Script Examples](./python-scripts/context-variables)

### How do I get support?

- **Email**: support@bjetpro.com
- **Website**: [bjetpro.com](https://bjetpro.com)
- **Documentation**: This site
- **Postman Collection**: [Download here](/postman)

### Are there any known limitations?

Current limitations:
- Binary fields require special handling
- Very large attachments (>10MB) need chunking
- Some computed fields cannot be directly synced
- Rate limits depend on external API restrictions

### Can I contribute to the module?

For feature requests and bug reports, please contact BJET support. Custom development services are available for specific requirements.

## Migration & Upgrades

### How do I upgrade from a previous version?

1. Backup your database
2. Test in a staging environment
3. Review the changelog for breaking changes
4. Update the module
5. Run database migrations if required
6. Test all configurations

### Will my configurations be preserved during upgrade?

Yes, configurations are preserved. However:
- Always backup before upgrading
- Test in staging first
- Review new features that might improve your setup

### Can I migrate from other sync modules?

Migration paths are available. Contact BJET support for:
- Assessment of current setup
- Migration planning
- Data mapping assistance
- Custom migration scripts

---

**Still have questions?** Contact our support team at support@bjetpro.com or check our [comprehensive troubleshooting guide](./troubleshooting).