---
sidebar_position: 3
title: Module Usage
sidebar_label: Usage
---

# Module Usage

## Creating a subscription on the Odoo website

1. The customer opens the Odoo website.
2. Opens the subscription product page.
3. Clicks **Add to cart**.
4. Proceeds to **Checkout**.
5. Fills in the data (contact details, address, etc. as needed).
6. At the payment method step, selects **LiqPay**.
7. Confirms the order — the system redirects the customer to the **LiqPay** payment page.
8. The customer completes the card payment on the LiqPay side (first payment / prepayment for the subscription).

After the first payment is confirmed:

- in LiqPay, a **subscription payment** is created, with:
  - start date (SO/Invoice date);
  - charge amount;
  - charge frequency;
  - subscription end date (if specified);
- LiqPay returns the result of the first payment and the **payment ID** (payment_id) to Odoo.

### Actions in Odoo

#### If the Accounting (accountant) module is installed:

After a successful payment and response from LiqPay:

1. A **Sales Order (SO)** is created in Odoo with the status **Sales Order** (if it did not exist yet). The LiqPay subscription ID and the current LiqPay subscription status are stored on the Sales Order on the "Other Information" tab, which allows you to quickly see the state of the external subscription directly in Odoo.

![Sales Order with LiqPay subscription ID and subscription status](/img/liqpay-subscription/en-sales-order-liqpay-subscription-id.png)

2. An **Invoice** for the first subscription period is created automatically.
3. The Invoice payment status is **In Payment**.
4. A related **Payment** is created for the full amount, with the status **In Process**.
5. A **Payment Transaction** is created automatically. You can access it from the Invoice via the **smart buttons**, the same way as the related Payment.
6. In the **Memo** field, the system stores the **unique LiqPay payment ID**. This value is propagated to the Journal Items and is used for bank statement reconciliation.

To complete the operation, the accountant:

1. Imports the bank statement.
2. Performs reconciliation of bank statement lines with the corresponding Payments (identified by the **Memo / Payment Reference** with the LiqPay ID).
3. After reconciliation, the **Invoice** and **Payment** statuses change to **Paid**.

#### If the Accounting (accountant) module is not installed:

1. A **Sales Order (SO)** is created in Odoo with the status **Sales Order**. The LiqPay subscription ID and the current LiqPay subscription status are stored on the Sales Order on the "Other Information" tab, which allows you to quickly see the state of the external subscription directly in Odoo.
2. An **Invoice** is automatically created with the payment status **Paid**.
3. A related **Payment** is created for the full amount with the status **Paid**.
4. A **Payment Transaction** is created with LiqPay payment details; it can be opened from the Invoice via the smart buttons.
5. The sales operation is considered completed; there is no separate bank statement reconciliation process in Odoo.

## Recurring subscription charges

### Actions on the LiqPay side

When the next planned charge date arrives:

- LiqPay automatically initiates the **next payment** using the stored card details of the customer;
- a new LiqPay payment is created;
- a notification with the payment result and a new **payment ID** is sent to Odoo.

Card data is stored and processed on the LiqPay side only; Odoo receives only the payment result and stores the payment ID.

### Actions in Odoo when the Accounting module is installed

After Odoo receives a notification from LiqPay about a successful recurring charge:

1. A **new Invoice** for the next subscription period is automatically created in Odoo.
2. A new **Payment** is created for the charged amount with the status **In Process**.
3. A **new Payment Transaction** is created, in which:
   - the **Payment Reference** field stores the LiqPay payment ID;
4. In the related **Payment**, the LiqPay ID is written into the **Memo / Payment Reference** field.
5. After importing the bank statement and reconciliation:
   - the Invoice status changes to **Paid**;
   - the Payment status changes to **Paid**.

These steps are repeated for every period while the subscription remains active.

### Actions in Odoo when the Accounting module is not installed

If the **Accounting** module is not installed:

1. For each recurring charge, a new Invoice is created with the payment status Paid.
2. A related Payment is created with the status Paid.
3. A Payment Transaction is created with the LiqPay payment ID.
4. Bank statement reconciliation in Odoo is not performed.

## Ending or cancelling a subscription

### Automatic subscription end (via cron)

1. In Odoo, the **Sales Order (SO)** with a subscription has a field for the subscription end date.

![Recurring plan details in a Sales Order](/img/liqpay-subscription/en-sales-order-subscription-quotation.png)

2. Odoo has an **automated scheduled action (cron)** "LiqPay: Cancel Expired Subscriptions". This cron runs every day and:

   - selects all Sales Orders where the **subscription end date ≤ current date**;
   - for each such subscription, sends a request to **LiqPay** to close the subscription.

3. **LiqPay** receives the request, **closes the subscription** and stops any further charges.
4. After confirmation from LiqPay, Odoo:

   - changes the status of the corresponding subscription / Sales Order to **"Churned"**;
   - no new payments are **created** for this subscription.

Thus, the subscription end date is set and stored in Odoo; the cron monitors when this date is reached, sends the information to LiqPay, and LiqPay actually stops the charges and closes the subscription.

### Manual subscription close

1. The Odoo user opens the corresponding **Sales Order** with an active subscription.
2. Clicks the **"Close"** button.
3. Odoo immediately sends a request to **LiqPay** to close this subscription.
4. **LiqPay** receives the request, **closes the subscription** and stops further charges.
5. After confirmation from LiqPay, in **Odoo**:

   - the subscription status on the Sales Order is changed to **"Churned"**;
   - no new recurring payments are **initiated** for this subscription.

Both methods (via automatic cron and manually from the Sales Order) ensure synchronized subscription closure in both Odoo and LiqPay, and guarantee that no further payments will be collected.