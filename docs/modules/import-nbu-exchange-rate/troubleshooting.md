---
sidebar_position: 3
title: Troubleshooting
---

# Troubleshooting

## Problem: Currency import is not executed

### Possible causes:

1. **Currency rate service not selected**
   - Check that the "Currency Rate Service" field is filled in the company settings
   - By default, "NBU" should be selected

2. **No internet connection**
   - Make sure the Odoo server has internet access
   - Check firewall and proxy settings

3. **NBU API unavailable**
   - Check NBU service availability
   - Try importing later

## Problem: Exchange rates are not updated automatically

### Solution:

1. **Check cron job**
   - Enter developer mode
   - Go to company settings
   - Check scheduler status in the "Automatic Import" field
   - Activate cron if it is inactive

2. **Check scheduler settings**
   - Go to Settings → Technical → Automation → Scheduled Actions
   - Find the action for currency import
   - Check execution interval and status

## Problem: Import error

### Solution:

1. **Check error message**
   - The system displays error message directly in the interface
   - Read the error text to understand the cause

2. **Check access rights**
   - Make sure the user has "Accounting/Invoicing" group rights

3. **Check currency settings**
   - Go to Accounting → Configuration → Currencies
   - Make sure the required currencies are activated in the system

4. **Check server logs** (for administrators only)
   - The module writes errors to Odoo server logs
   - Review the log file for detailed error information

## Additional Support

If the problem is not resolved, contact support:
- **Email**: support@bjetpro.com
- **Website**: https://bjetpro.com