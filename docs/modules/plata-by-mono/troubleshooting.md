---
sidebar_position: 4
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

## Common Issues and Solutions

### Issue: Plata by Mono is not displayed as a payment method on the website

**Possible Causes:**
- The Plata by Mono provider is in the **Disabled** state.
- The **API Token (X-Token)** is not filled in on the **Credentials** tab.
- The provider is not published (is_published = True).

**Solution:**
1. Go to **Accounting (Invoicing) → Configuration → Payment Providers** or **Sales → Configuration → Payment Providers**.
2. Open the **Plata by Mono** provider.
3. On the **Credentials** tab, make sure the **API Token (X-Token)** field is filled in.
4. Click **Enabled** (for production) or **Test Mode** (for testing) so that the provider status changes to **Published**.

### Issue: The provider is not configured for a newly created company

**Cause:** Plata by Mono settings are **company specific**. For each new company created after the module is installed, the provider must be configured separately.

**Solution:**
1. Switch to the relevant company.
2. Open the Plata by Mono provider of that company and configure it (token, journal) as described in [Configuration](./configuration.md).

### Issue: A refund cannot be completed or the amount is rejected

**Possible Causes:**
- The entered amount is greater than the **Maximum Refund Allowed** — Odoo will not allow this.
- The Mono API returned an error.

**Solution:**
- Enter an amount that does not exceed the **Maximum Refund Allowed**.
- If the Mono API returns an error, the system shows the reason and the original Payment status remains unchanged — review the reason and retry.

### Issue: The Invoice and Payment stay in the In Payment / In Process status (Enterprise)

**Cause:** With the Accounting module installed, the operation is completed only after the bank statement is reconciled.

**Solution:**
1. Post the bank statement and reconcile it with this payment.
2. Use the unique Plata by Mono **invoiceId** to match the bank statement line with the payment — it is stored in the **Payment Reference / Provider Reference** field of the Payment Transaction and in the **Memo** field of the linked Payment.
3. After reconciliation, the Invoice and Payment status changes to **Paid**.
