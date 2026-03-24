---
sidebar_position: 2
title: Configuration
sidebar_label: Configuration
---

# Configuration

## LiqPay Website Payments

### Initial setup

Before using the module:

1. In **General Settings → Website**, enable the **Automatic Invoice** option to automatically create invoices when orders are placed from the website

![Website settings — enabling automatic invoice](/img/liqpay-payment/en-website-settings-automatic-invoice.png)

2. In **General Settings → Accounting (Invoicing)**, enable the **Invoice Online Payment** option to allow creating payment links from **Sales Orders** and **Invoices**.

![Accounting settings — enabling invoice online payment](/img/liqpay-payment/en-accounting-settings-online-payment.png)

### LiqPay payment provider configuration

1. **Automatic creation of the provider when the module is installed**

After the **LiqPay Website Payments** module is installed, a payment provider in the **"Disabled"** state is automatically added in the database for each existing company

![LiqPay provider in "Disabled" state](/img/liqpay-payment/en-liqpay-provider-disabled.png)

**How to find a provider:**

- Go to the menu **Accounting (Invoicing) → Configuration → Payment Providers**
- or **Sales → Configuration → Payment Providers**

For each active company:

- a separate provider record with code = liqpay is created;
- the initial state of the provider is **Disabled**;
- the provider is **not available** on the website and in the Payment Link until it is configured and activated.

2. **Working in a multi-company environment**


In a database with multiple companies:

- when the module is installed, the LiqPay provider is created separately for each company;
- LiqPay settings (keys, journals, etc.) are **company specific** — unique for each company;
- when switching the active company (Company A → Company B), the **Payment Providers** list shows the LiqPay provider of the currently active company with its own settings.

3. **LiqPay key fields**

To activate **LiqPay**, go to: **Accounting (Invoicing) → Configuration → Payment Providers** or **Sales → Configuration → Payment Providers**

In the LiqPay provider form, on the **Credentials** tab, you must fill in the fields:

- LiqPay Public Key
- LiqPay Private Key

![Credentials tab with empty key fields](/img/liqpay-payment/en-liqpay-credentials-empty.png)

To obtain the keys, log in to your LiqPay account, go to **Settings → API → API keys → Live keys**, and copy the values from the **“Public”** and **“Private”** fields.

![LiqPay merchant dashboard — API keys page](/img/liqpay-payment/en-liqpay-merchant-api-keys.png)

Paste the copied values into the LiqPay provider form in Odoo and click **Enable**.

![LiqPay provider in "Enabled" state with filled keys](/img/liqpay-payment/en-liqpay-provider-enabled.png)

After that, the provider status will change to **Published**.

Go to the **Configuration** tab and find the **Payment Methods** field. It is automatically populated with the **LiqPay** payment method.

If this field is empty, open the list of all payment methods and activate **LiqPay**.

![Configuration tab — availability, currencies and payment journal](/img/liqpay-payment/en-liqpay-configuration-payment-form.png)

Additionally, you need to configure the bank journal in the **Payment Journal** field.

![Configuration tab — payment method and journal](/img/liqpay-payment/en-liqpay-configuration-tab.png)

Open the required bank journal, go to the **Incoming Payments** tab, and specify the accounting account for the **LiqPay** payment method.
This account will then be used to generate accounting entries for payments made via LiqPay.

![Bank journal — incoming payments with LiqPay method](/img/liqpay-payment/en-bank-journal-incoming-payments.png)

**Please note**: for each new company created **after** the installation of the **LiqPay Website Payments** module, the LiqPay payment provider must be added **manually** by duplicating the provider record from another company.
