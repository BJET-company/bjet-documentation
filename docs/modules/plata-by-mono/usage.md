---
sidebar_position: 3
title: Module Usage
sidebar_label: Usage
---

# Module Usage

## Payment from the Odoo website

### Steps to make a payment

1. Open the Odoo website.
2. Add a product to the cart.
3. Proceed to checkout.
4. At the payment method step, choose **Plata by Mono**.

![Choose Plata by Mono at checkout](/img/plata-by-mono/en/checkout-select-plata.png)

5. Confirm the order — the system redirects the user to the secure monobank page.

![Redirect to the secure monobank page](/img/plata-by-mono/en/redirect-monobank.png)

6. The customer pays by card on the monobank side.

![Card payment on the monobank side](/img/plata-by-mono/en/monobank-card-payment.png)

### Payment result

#### Payment result when the Accounting module is installed (Enterprise)

If the **Accounting (accountant)** module is installed, after a successful payment:

1. A **Sales Order (SO)** is created in Odoo in the "Sales Order" status.

![Sales Order created in the Sales Order status](/img/plata-by-mono/en/sales-order-created.png)

2. An **Invoice** is created automatically.
3. The invoice payment status is **In Payment**.

![Invoice in the In Payment status](/img/plata-by-mono/en/invoice-in-payment.png)

4. A linked **Payment** for the full amount is created with the **In Process** status.

![Linked Payment in the In Process status](/img/plata-by-mono/en/payment-in-process.png)

5. A **Payment Transaction** is also created automatically; it is reachable from the invoice via the **Smart Buttons**, as is the linked Payment.

![Payment Transaction reachable via smart buttons](/img/plata-by-mono/en/payment-transaction-smart-buttons.png)

In the **Memo** field, the system stores the unique Plata by Mono **invoiceId**. This information is passed to the accounting entries (Journal Items) and is used to reconcile bank statements with Plata by Mono payments.

To complete the operation, you must **post the bank statement** and reconcile it with this payment. After reconciliation, the Invoice and Payment status changes to **Paid**.

:::tip To simplify reconciliation
- in the **Payment Transaction**, the unique Plata by Mono invoiceId is stored in the **Payment Reference / Provider Reference** field;
- in the linked **Payment**, the same invoiceId is recorded in the **Memo** field.
:::

#### Payment result when the Accounting module is not installed (Community)

If the **Accounting (accountant)** module is not installed, after a successful payment:

1. A **Sales Order (SO)** is created in Odoo in the "Sales Order" status.
2. An **Invoice** is created automatically with the **Paid** payment status.
3. A linked **Payment** for the full amount is created with the **Paid** status.
4. A **Payment Transaction** is created, reachable from the invoice via smart buttons, with the Plata by Mono payment details.
5. The sales operation is considered complete; there is no separate bank statement posting process.

## Payment via Payment Link

### Creating a payment link from a Sales Order or Invoice

A payment link can be created from either a Sales Order or an Invoice.

1. Open the relevant Sales Order or Invoice.
2. Click the settings icon (⚙️) and choose the **Create a Payment Link** action.

![Create a Payment Link action](/img/plata-by-mono/en/create-payment-link-action.png)

3. The system generates a unique payment link.
4. Copy the link by clicking **Generate and Copy Payment Link** and send it to the customer.

![Generate and Copy Payment Link](/img/plata-by-mono/en/generate-copy-payment-link.png)

### Paying via the Payment Link

1. The customer opens the received link.
2. On the payment page, the customer selects **Plata by Mono**.

![Payment page with Plata by Mono selected](/img/plata-by-mono/en/payment-link-customer.png)

3. The customer clicks **Pay** — the system redirects to the monobank page.
4. The customer pays by card on the monobank side.

The subsequent steps in Odoo (creating the Invoice, Payment, document statuses) are the same as the **Payment from the Odoo website** section above and depend on whether the accountant module is installed.

## Refunds

The module uses the **standard Odoo refund mechanism** — funds are returned to the same customer card via the monobank API, **without logging into the merchant cabinet** and without requesting card details.

### Full refund

1. Open the **Payment** (account.payment) made via Plata by Mono.
2. Click the **Refund** button.

![Refund button on the Payment form](/img/plata-by-mono/en/refund-button.png)

3. In the dialog, the refund amount already equals the full payment amount.

![Refund dialog with the full amount](/img/plata-by-mono/en/refund-full-dialog.png)

4. Click **Refund** — the funds are returned to the customer's card.

### Partial refund

1. Open the Payment and click **Refund**.
2. In the **Refund Amount** field, enter the required (smaller) amount, e.g. 50 UAH out of 150 UAH.
3. Confirm. The "Maximum Refund Allowed" decreases by the refunded amount for subsequent refunds.

**Notes:**

- Odoo will not allow entering an amount greater than the "Maximum Refund Allowed".
- For a **full** refund on an Invoice, a Credit Note is created (standard Odoo flow).
- If the Mono API returns an error, the system shows the reason and the original Payment status remains unchanged.

## Bank statement reconciliation

- The unique Mono **invoiceId** is stored:
  - in the Payment Transaction — the **Payment Reference / Provider Reference** field;
  - in the linked Payment — the **Memo** field (passed to Journal Items).
- Use this invoiceId to match bank statement lines with payments.
