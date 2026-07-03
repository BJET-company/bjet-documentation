---
sidebar_position: 11
title: "Plata by Mono Payments on the Odoo Website"
sidebar_label: "Plata by Mono Website Payments"
---

# Plata by Mono Payments on the Odoo Website

**Technical module name:** `bjet_plata_by_mono`  
**Platform:** Odoo 19 (Community and Enterprise)

## What is this module for?

The **Plata by Mono Payments on the Odoo Website** module adds Plata by Mono (monobank) as a payment provider in Odoo for online card payments:

- at website / eCommerce checkout;
- via Payment Link from Invoices and Sales Orders;
- through the customer portal (paying an Invoice / Sales Order directly).

After a successful payment, Odoo automatically creates and links together:

- the Invoice;
- the Payment Transaction;
- the Payment.

The unique Plata by Mono **invoiceId** is stored in the payment transaction and the payment document for later bank statement reconciliation.

In addition, the module supports **full and partial refunds** to the customer's card directly from the Payment form — without logging into the merchant cabinet.

## Quick Links

- [Installation and Activation](./installation.md)
- [Configuration](./configuration.md)
- [Module Usage](./usage.md)
- [Troubleshooting](./troubleshooting.md)
