---
sidebar_position: 8
title: "LiqPay Website Payments"
sidebar_label: "LiqPay Website Payments"
---

# LiqPay Website Payments

**Technical module name:** `bjet_liqpay_payment`

## What is this module for?

The **LiqPay Website Payments** module adds the **LiqPay** payment provider to Odoo for online payments:
- during order checkout on the website (eCommerce checkout);
- via **Payment Links** from **Invoices** and **Sales Orders**.

After a successful payment, Odoo automatically creates and links:
- the **Invoice**;
- the **Payment Transaction**;
- the **Payment**.

The unique **LiqPay payment ID** is stored in the payment transaction and the payment for further reconciliation with bank statements.

## Quick Links

- [Installation and Activation](./installation.md)
- [Configuration](./configuration.md)
- [Module Usage](./usage.md)
- [Troubleshooting](./troubleshooting.md)
