---
sidebar_position: 6
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

## Common Issues and Solutions

### Issue: Nova Poshta is not displayed as a delivery method on the website

**Symptoms:** When placing an order on the website, Nova Poshta is not available among the delivery methods.

**Possible Causes:**
- The Nova Poshta delivery method is not published or is in the unpublished state
- Sender City, Warehouse, or API Key are not filled in
- Cart weight/volume exceeds the limits set on the **Content** tab
- Product tags do not match the **Must Have / Excluded Tags** configured on the method

**Solution:**
1. Go to **Sales** or **Website** ➔ **Configuration** ➔ **Shipping Methods**.
2. Open the **Nova Poshta** method and verify the **Settings** tab — **Api Key**, **Sender City**, **Warehouse**, and **Sender phone number** (format `380XXXXXXXXX`) must all be filled.
3. On the **Content** tab, ensure **Max Weight / Max Volume** are either `0.00` or above the cart value, and that tag rules allow the current products.
4. Publish the method and refresh the website cart.

### Issue: "COD Payout Account is required when COD is enabled."

**Symptoms:** A validation error appears when saving the delivery method with Cash on Delivery turned on.

**Possible Causes:**
- **Enable Cash on Delivery** is checked, but **COD Payout Account** is empty.

**Solution:**
1. In **Sales** ➔ **Configuration** ➔ **Shipping Methods**, open the Nova Poshta method.
2. In the **CASH ON DELIVERY (COD)** block, fill in the **COD Payout Account** with your company's IBAN bank account.
3. If no account exists yet, create it first in **Contacts** ➔ your company ➔ **Accounting** tab, then return to the delivery method.

:::info Phone format
The sender phone is validated as `380XXXXXXXXX` — exactly 12 digits starting with `380`. Any other format triggers: *Phone number must be in format 380XXXXXXXXX (12 digits). Example: 380441234567*.
:::

### Issue: "Nova Post shipping requires both sender type and recipient type to be configured."

**Symptoms:** Clicking **Get Rate** in the shipping wizard (**Add shipping**) raises this validation error.

**Possible Causes:**
- **Sender type** is not selected on the delivery method.
- **Recipient type** is not selected on the delivery contact (Warehouse/Postomat).

**Solution:**
1. Open the Nova Poshta delivery method and ensure **Sender type** is set on the **Settings** tab.
2. Open the delivery address contact on the sales order and set the **Recipient type** field (Warehouse/Postomat).
3. Return to the wizard and click **Get Rate** again.

### Issue: Express Waybill (TTN) is not created on Validate

**Symptoms:** Clicking **Validate** on the Delivery Order does not generate a TTN, and a validation error is shown.

**Possible Causes:**
- *Nova Post shipping requires a related sales order with a shipping date.* — the sale order has no **Shipping Date**.
- *Nova Post carrier … has no sender type configured.* — sender type missing on the carrier.
- *Delivery address … has no recipient type configured.* — recipient type missing on the partner.
- *Cargo type is incompatible between the main record and its lines.* — package option lines don't match the chosen **Cargo Type** (Documents/Cargo/Parcel/Pallet).
- *Need at least one seat option* — no seat/package lines were added in the wizard.
- API error returned by Nova Poshta (invalid address reference, API key issue, etc.).

**Solution:**
1. Open the Sale Order and set the **Shipping Date**.
2. Verify **Sender type** on the delivery method and **Recipient type** on the delivery contact.
3. In the shipping wizard, add at least one package/seat option and make sure its type matches **Cargo Type**.
4. If the error references an API message, open **Inventory** ➔ **Nova Post** ➔ **API Error Codes** to see the resolved description from Nova Poshta and correct the underlying data.

### Issue: Manual TTN entry is rejected — "TTN number must be unique" or "Each picking can have only one TTN"

**Symptoms:** Entering a 14-digit tracking number in the **Tracking Reference** field fails with one of these errors.

**Possible Causes:**
- The same TTN has already been registered in Odoo on another picking.
- The current picking already has a Consignment Note attached; entering a second TTN is not allowed.

**Solution:**
1. Open **Nova Post** ➔ **Consignment Notes** and search for the TTN number.
2. If it already exists, link to the existing record or remove/replace the TTN on the original picking first.
3. To replace a TTN on the current picking, clear the **Tracking Reference** field and save — the system removes the previous Consignment Note — then enter the new number.

### Issue: Cities or warehouses are missing from the selector

**Symptoms:** A city or branch cannot be found when choosing the recipient address.

**Possible Causes:**
- The daily CRON that syncs Nova Poshta reference data has not run yet or failed.
- The city/branch was added on Nova Poshta's side after the last sync.

**Solution:**
1. Go to **Inventory** ➔ **Operations** ➔ **Nova Post** and check **Cities** / **Warehouses** lists.
2. Trigger the scheduled action manually: **Settings** ➔ **Technical** ➔ **Scheduled Actions**, find the Nova Poshta sync action, and click **Run Manually**.
3. If the sync keeps failing, verify the **Api Key** on the delivery method is valid and not expired.

## Support Contacts

If the issue is not resolved:

- **Website:** [https://bjetpro.com/](https://bjetpro.com/)
- **Email:** [support@bjetpro.com](mailto:support@bjetpro.com)
