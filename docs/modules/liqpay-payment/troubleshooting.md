---
sidebar_position: 4
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

## Common Issues and Solutions

### Issue: LiqPay is not displayed as a payment method on the website

**Symptoms:** When placing an order on the website, LiqPay is not available among the payment methods.

**Possible Causes:**
- The LiqPay provider is in the "Disabled" state
- Credentials are not filled in (public or private key)
- The order currency is not supported (only UAH, USD, EUR are supported)

**Solution:**
1. Go to **Accounting → Configuration → Payment Providers**
2. Open the **LiqPay** provider
3. Make sure the provider state is **"Enabled"** or **"Test Mode"**
4. Verify that the **Public Key** and **Private Key** fields are filled in on the **Credentials** tab
5. Ensure the order currency is UAH, USD, or EUR

### Issue: Authentication error during payment

**Symptoms:** After being redirected to the LiqPay payment page, an error or a blank page is displayed.

**Possible Causes:**
- Incorrect public or private key
- Keys from a different environment (test keys in production mode or vice versa)

**Solution:**
1. Log in to the LiqPay merchant dashboard: [https://www.liqpay.ua/](https://www.liqpay.ua/)
2. Go to the **API** section and copy the current **Public key** and **Private key**
3. Paste the keys into the corresponding fields of the provider in Odoo
4. Save the settings and retry the payment

:::warning Important
For test mode, use LiqPay test keys (sandbox). For production mode, use live keys. Mixing keys will cause signature errors.
:::

### Issue: Payment link does not work

**Symptoms:** When clicking a payment link from an invoice or sales order, an error appears or the payment page does not open.

**Possible Causes:**
- The **Invoice Online Payment** option is not enabled in the accounting settings
- The LiqPay provider is not activated
- The document currency is not supported

**Solution:**
1. Go to **General Settings → Accounting (Invoicing)**
2. Enable the **Invoice Online Payment** option
3. Make sure the LiqPay provider is in the **"Enabled"** or **"Test Mode"** state
4. Verify that the invoice or order currency is UAH, USD, or EUR

## Support Contacts

If the issue is not resolved:

- **Website:** [https://bjetpro.com/](https://bjetpro.com/)
- **Email:** [support@bjetpro.com](mailto:support@bjetpro.com)