---
sidebar_position: 4
title: "Purchase Order Processing (Manager)"
sidebar_label: "Purchase Order Processing (Manager)"
---

# Section 4: Purchase Order Processing (Manager)

This section describes handling incoming shipments from suppliers.

## 4.1. Manual TTN Entry on Receipts

When a supplier provides a waybill number:

1. Open the **Purchase Order** ➔ **Receipt** (or find it in **Inventory** ➔ **Transfers**).
2. Set the **Carrier** to **Nova Post**.
3. Enter the 14-digit TTN in the **Tracking Reference** field. Odoo will create a **Consignment Note** with the direction set to Incoming and fetch the status (e.g., "Heading to recipient city") immediately.

## 4.2. Monitoring and Financials

- **Tree View:** Monitor incoming deliveries via the Purchase Order list view using the same **Tracking Reference** and **Status** columns.
- **COD Enabled:** Shows if Cash on Delivery is required for the shipment, helping accounting prepare funds.
- **Waybill Payment Status:** Displays whether the shipping services have been paid (Paid/Unpaid).

![Purchase orders with tracking columns](/img/nova-post/purchase-tree-en.png)
