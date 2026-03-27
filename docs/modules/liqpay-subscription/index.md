---
sidebar_position: 9
title: "LiqPay Odoo Subscription Payments"
sidebar_label: "LiqPay Odoo Subscription Payments"
---

# LiqPay Odoo Subscription Payments

**Technical module name:** `bjet_liqpay_subscription`

## What is this module for?

The **LiqPay Odoo Subscription Payments** module allows you to configure **recurring charges** from a customer's card via the **LiqPay** payment system:
- when a subscription is created on the Odoo website;
- when a subscription is created via a **Payment Link** from an Invoice or **Sales Order**.

After the first successful payment (prepayment), the system:
- registers the subscription in LiqPay with the following parameters:
  - start date (SO/Invoice date);
  - recurring charge amount;
  - charge frequency (month, year);
  - subscription end date;
- automatically creates and links in Odoo:
  - Invoice (for the first subscription period);
  - Payment Transaction;
  - Payment.

For each subsequent subscription charge, Odoo again creates:

- a new Invoice;
- a new Payment;
- a new Payment Transaction.

The **unique LiqPay payment ID is stored in the payment transaction and payment, and can be used for bank statement reconciliation.

## Quick Links

- [Installation and Activation](./installation.md)
- [Configuration](./configuration.md)
- [Module Usage](./usage.md)
- [Troubleshooting](./troubleshooting.md)