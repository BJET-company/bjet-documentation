---
sidebar_position: 3
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

## Common Issues and Solutions

### Issue: Connection Error with Monobank API

**Symptoms:** An error appears when clicking the "Test Connection" button.

**Possible causes:**
- Invalid API token
- Token not activated
- Token expired

**Solution:**
1. Go to [https://api.monobank.ua/](https://api.monobank.ua/)
2. Check the token status
3. Activate a new token if necessary
4. Copy and paste the token into the "Monobank API Token" field
5. Save the journal and test the connection again

### Issue: Monobank Tab Does Not Appear

**Symptoms:** After selecting Monobank API in the Bank Feeds field, the tab does not appear.

**Possible causes:**
- Module not installed
- Journal type is not "Bank"

**Solution:**
1. Verify that the Monobank: Bank Statements Import module is installed
2. Ensure that the journal type = "Bank"
3. Refresh the page and repeat the selection

### Issue: Duplicate Transactions

**Symptoms:** The same transactions are imported repeatedly.

**Solution:**
The module automatically prevents duplicate transactions. If the issue persists:
1. Verify that the account number in the journal matches the one in Monobank
2. Contact technical support

### Issue: "API limitation" Error During Import

**Symptoms:** An API limitation error appears when importing statements.

**Possible causes:**
- Selected period exceeds 31 days
- Too frequent API requests (Monobank allows only **1 request per 60 seconds**)

**Solution:**
1. Select an import period of no more than 31 days
2. Wait at least 60 seconds before retrying the import
3. If importing multiple accounts, allow 60 seconds between each account import

:::info Monobank API Rate Limits
Monobank API has strict rate limiting:
- **1 request per 60 seconds** per token
- **Maximum period**: 31 days per request
- **Historical data**: Available for the last 12 months

If you need to import a longer period, split it into 31-day chunks and wait 60 seconds between each import request.
:::

## Support Contacts

If the issue is not resolved:

- **Website:** [https://bjetpro.com/](https://bjetpro.com/)
- **Email:** [support@bjetpro.com](mailto:support@bjetpro.com)
