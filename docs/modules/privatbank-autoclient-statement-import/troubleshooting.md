---
sidebar_position: 3
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

## Common Issues and Solutions

### Issue: PrivatBank API Authentication Error

**Symptoms:** During statement import, an error appears: "PrivatBank API authentication failed" or "Access forbidden"

**Possible Causes:**
- Incorrect PrivatBank24 Autoclient Token or ID
- Token is not activated or has expired
- Invalid credentials format

**Solution:**
1. Use the official instructions for creating an Autoclient profile: [https://docs.google.com/document/d/e/2PACX-1vTtKvGa3P4E-lDqLg3bHRF6Wi9S7GIjSMFEFxII5qQZBGxuTXs25hQNiUU1hMZQhOyx6BNvIZ1bVKSr/pub](https://docs.google.com/document/d/e/2PACX-1vTtKvGa3P4E-lDqLg3bHRF6Wi9S7GIjSMFEFxII5qQZBGxuTXs25hQNiUU1hMZQhOyx6BNvIZ1bVKSr/pub)
2. Copy both the **Token** and **Client ID** from your PrivatBank business account
3. Paste them into the corresponding fields on the PrivatBank tab
4. Save the journal and try importing again

:::warning Important
Both parameters – Token AND Client ID – are mandatory. The module will not work if either is missing or incorrect.
:::

### Issue: PrivatBank Tab Does Not Appear

**Symptoms:** After selecting "Autoclient PrivatBank24" in the Bank Feeds field, the tab does not appear.

**Possible Causes:**
- Module is not installed
- Journal type is not "Bank"

**Solution:**
1. Make sure the PrivatBank statement import module is installed
2. Verify that the journal type = "Bank"
3. Refresh the page and repeat the selection

### Issue: Transaction Duplication

**Symptoms:** The same transactions are imported repeatedly.

**Solution:**
The module automatically prevents transaction duplication. If the problem persists:
1. Verify that the account number in the journal matches the number in PrivatBank
2. Contact technical support


## Support Contacts

If the issue is not resolved:

- **Website:** [https://bjetpro.com/](https://bjetpro.com/)
- **Email:** [support@bjetpro.com](mailto:support@bjetpro.com)
