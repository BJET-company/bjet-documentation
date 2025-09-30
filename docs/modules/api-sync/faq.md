---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
description: Common questions and answers about the BJET API Synchronization Module
---

# Frequently Asked Questions

<span className="version-badge">v18.0.1.0.4</span>

Common questions about the BJET API Synchronization Module.

## General Questions

### What is the BJET API Synchronization Module?

The BJET API Synchronization Module enables bidirectional data synchronization between Odoo 18.0 and external systems via REST APIs. It supports both inbound (receiving data) and outbound (sending data) synchronization.

### Which Odoo versions are supported?

This version (18.0.1.0.4) is designed for Odoo 18.0.

### What authentication methods are supported?

The module supports:
- **No Authentication** - For internal/trusted networks
- **Basic Authentication** - Username and password
- **Bearer Token** - Token-based authentication

## Installation & Setup

### How do I install the module?

1. Place the module in your Odoo addons directory
2. Update the app list in Odoo
3. Install from the Apps menu
4. Configure your API endpoints

### What permissions are required?

Users need Technical Features enabled and appropriate model permissions for synchronized data.

## Configuration

### How do I configure field mappings?

Navigate to **Settings → Technical → API Sync Configurations**. Create field mappings to define how external API fields correspond to Odoo fields.

### Can I transform data during synchronization?

Yes, use Python scripts for data transformation:
- Format dates and numbers
- Map relational fields
- Apply validation rules

### How do I handle different data formats?

Use Python transformation scripts in the field mapping configuration to convert between formats as needed.

## API Integration

### What's the difference between inbound and outbound synchronization?

- **Inbound**: Receives data from external systems into Odoo
- **Outbound**: Sends data from Odoo to external systems

### How do I test my configuration?

1. Use the **Test Connection** button
2. Check Odoo logs for errors
3. Start with simple test data

### What if the external API is unavailable?

The module includes error logging and retry mechanisms.

## Performance

### How can I optimize performance?

- Use appropriate batch sizes for your data volume
- Apply domain filters to reduce processing
- Schedule synchronization during off-peak hours
- Process records in smaller chunks for large datasets

## Troubleshooting

### Why am I getting authentication errors?

Check:
1. Credentials are correct
2. Authentication type matches configuration
3. User has necessary permissions

### Why aren't records synchronizing?

Verify:
1. Configuration is active
2. Field mappings are correct
3. Required fields are mapped
4. Check Odoo logs for errors

### How do I debug issues?

1. Check Odoo server logs
2. Use the Test Connection feature
3. Verify field names in database structure
4. Test with simple data first

## Security

### Is API communication secure?

Yes, when configured properly:
- Use HTTPS for external endpoints
- Credentials are encrypted in database
- Authentication prevents unauthorized access

### How should I handle credentials?

- Store securely in Odoo configuration
- Use strong passwords/tokens
- Regular credential rotation recommended

## Multiple Systems

### Can I sync with multiple external systems?

Yes, create separate API configurations for each external system with independent authentication and field mappings.

### How do I handle custom fields?

Custom fields are supported - map them in the field configuration and handle in transformation scripts if needed.

## Best Practices

### What sync frequency should I use?

Choose based on your data needs:
- Real-time for critical data
- Scheduled intervals for bulk data

### How should I handle errors?

1. Monitor sync logs regularly
2. Set up error notifications
3. Have manual fallback procedures
4. Test configurations thoroughly

## Support & Resources

### Where can I find more documentation?

- [Quick Start Guide](./quick-start)
- [Configuration Guides](./configuration/authentication)
- [Troubleshooting](./troubleshooting)

### How do I get support?

Contact BJET support for assistance with configuration and troubleshooting.

---

**Need more help?** Check our [Troubleshooting Guide](./troubleshooting) for common issues and solutions.