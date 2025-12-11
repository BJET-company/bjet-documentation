---
sidebar_position: 2
title: Configuration
sidebar_label: Configuration
---

# Configuration

## Monobank Journal Configuration

### Step 1: Create or Open a Journal

1. Create or open a bank journal (Journal Type = **Bank**).
2. Enter the bank account number.
3. On the **Journal Entries** tab, find the **Bank Feeds** field.
4. Select **Monobank API**.

![Selecting Monobank API in Bank Feeds field](/img/monobank-statement-import/en-journal-bank-feeds-monobank-api.png)

5. A new **Monobank** tab will appear.

:::info Note
If you later select another Bank Feeds option, the Monobank tab will be hidden.
:::

### Step 2: Configure the Monobank Tab

In the **Monobank** tab, fill in the following fields:

![Monobank tab configuration](/img/monobank-statement-import/en-monobank-tab-configuration.png)

#### Monobank API Token

To fill in this field:

1. Go to [https://api.monobank.ua/](https://api.monobank.ua/).

2. Activate the token and copy it.

![Token activation on Monobank API website](/img/monobank-statement-import/en-monobank-api-activate-token.png)

3. Paste the token into the **Monobank API Token** field.

#### Import Period (Days)

This defines how many recent days of statements should be imported.

**Default value:** 1 day.

### Step 3: Save and Create Scheduler

After saving the Journal with a valid token, a **cron** (scheduler) is created that runs daily.

![Journal with configured cron](/img/monobank-statement-import/en-monobank-tab-cron-created.png)

:::warning Important
If Monobank is no longer the Bank Feeds source, the cron will be deleted automatically.
:::

## Verify Connection

Check whether the connection to Monobank is configured correctly:

1. Click the **Test Connection** button.

2. If the data is correct, a confirmation message will appear in the upper-right corner:

![Successful connection to Monobank](/img/monobank-statement-import/en-connection-successful-notification.png)

## Manual Statement Import

### Method 1: From the Journal Dashboard

Go to **Accounting/Invoicing** → **Journal Dashboards** → click **Import Statements**.

![Import button on dashboard](/img/monobank-statement-import/en-dashboard-import-statements-button.png)

### Method 2: From the Journal Form

Open the bank journal and go to the **Monobank** tab → click **Import Statements**.

![Import button in journal](/img/monobank-statement-import/en-journal-import-statements-button.png)

### Select Import Period

A window with a **Date** field will appear. You may:

- Keep the default values:
  - **Start Date** = current date − number of days specified in "Import Period (Days)"
  - **End Date** = current date

- Or set your own date range for importing statements.

![Import period selection window](/img/monobank-statement-import/en-import-wizard-date-range.png)

### Import Result

After clicking **Import Statements**, the loading process will begin.

When the import is completed:
- A success message will appear in the upper-right corner;
- The number of imported transactions to reconcile will be displayed on the Bank Journal dashboard.

![Successful statement import](/img/monobank-statement-import/en-dashboard-import-successful.png)
