---
sidebar_position: 4
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

## Common Issues and Solutions

### Issue: LiqPay is not displayed as a payment method on the website

**Symptoms:** When placing an order on the website, LiqPay is not available among the payment methods.

**Possible causes:**
- The LiqPay provider is in the "Disabled" state
- API credentials are not filled in (public or private key)
- The order currency is not supported (only UAH, USD, EUR are supported)

**Solution:**
1. Go to **Invoicing → Configuration → Payment Providers**
2. Open the **LiqPay** provider
3. Make sure the provider state is **"Enabled"** or **"Test Mode"**
4. Verify that the **Public Key** and **Private Key** fields are filled in on the **Credentials** tab
5. Make sure the order currency is UAH, USD, or EUR

### Issue: Authentication error during payment

**Symptoms:** After being redirected to the LiqPay payment page, an error or blank page is displayed.

**Possible causes:**
- Incorrect public or private key
- Keys from a different environment (test keys in production mode or vice versa)

**Solution:**
1. Log in to the LiqPay merchant dashboard: [https://www.liqpay.ua/](https://www.liqpay.ua/)
2. Go to the **API** section and copy the current **Public key** and **Private key**
3. Paste the keys into the corresponding provider fields in Odoo
4. Save the settings and retry the payment

:::warning Attention
For test mode, use LiqPay test keys (sandbox). For production mode, use real keys. Mixing keys will cause signature errors.
:::

### Issue: Subscription is processed as a regular payment instead of recurring

**Symptoms:** After payment on the website, a regular sales order is created without a subscription. The Odoo log shows a warning: `Subscription order has no plan, using regular payment` or `Unsupported periodicity, using regular payment`.

**Possible causes:**
- The sales order does not have a subscription plan (`plan_id`) assigned
- The subscription plan periodicity is not supported (only `month` and `year` are supported)

**Solution:**
1. Verify that the subscription product has a correctly configured **recurring plan**
2. Make sure the plan periodicity is **"Month"** or **"Year"**. The periodicities "Day", "Week", and "Quarter" are **not supported** by LiqPay
3. If an unsupported periodicity is required, contact support to discuss alternatives

:::info Supported Periodicities
LiqPay API supports only two options: `month` and `year`. When other periodicities are used, the module automatically creates a regular one-time payment.
:::

## Support Contacts

If the issue is not resolved:

- **Website:** [https://bjetpro.com/](https://bjetpro.com/)
- **Email:** [support@bjetpro.com](mailto:support@bjetpro.com)