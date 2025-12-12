---
sidebar_position: 2
title: Configuration
sidebar_label: Configuration
---

# Configuration

## PrivatBank Journal Configuration

### Step 1: Creating or Opening a Journal

1. Create or open a bank journal (Journal Type = **Bank**).
2. Specify the bank account number.
3. On the **Journal Entries** tab, find the **Bank Feeds** field.
4. Select **Autoclient PrivatBank24**.

![Selecting PrivatBank API in the Bank Feeds field](/img/privatbank-autoclient-statement-import/journal-setup-autoclient-selection-en.png)

5. A new **PrivatBank** tab will appear.


:::info Note
If you later select a different Bank Feeds option — the PrivatBank tab will be hidden.
:::

### Step 2: Configuring the PrivatBank Tab

On the **PrivatBank** tab, fill in the following fields:

- **PrivatBank24 Autoclient Token**

- **PrivatBank24 Autoclient ID**

To obtain authorization credentials, follow the link https://docs.google.com/document/d/e/2PACX-1vTtKvGa3P4E-lDqLg3bHRF6Wi9S7GIjSMFEFxII5qQZBGxuTXs25hQNiUU1hMZQhOyx6BNvIZ1bVKSr/pub
and complete all the steps described in the section **Creating a profile and obtaining authorization data**

Copy the obtained Token and ID

![Authorization credentials for API operation](/img/privatbank-autoclient-statement-import/api-authorization-token-display-en.png)

and paste them into the PrivatBank24 Autoclient Token and PrivatBank24 Autoclient ID fields

![Authorization credentials for API operation in Odoo](/img/privatbank-autoclient-statement-import/privatbank-tab-authentication-setup-en.png)

#### Import Period (days)

This specifies how many recent days to load statements for.

**Default value:** - 1 day.

- After saving the Journal with a filled token, a cron is created that runs daily. If Autoclient PrivatBank24 stops being the Bank Feeds source → the cron is automatically deleted.

![Journal with configured cron](/img/privatbank-autoclient-statement-import/privatbank-tab-automation-setup-en.png)

## Manual Statement Import

### Method 1: From the Journal Dashboard

Go to the **Accounting/Invoicing** menu → **Journal Dashboards** → click **Import Statements**.

![Import button on dashboard](/img/privatbank-autoclient-statement-import/dashboard-privatbank-widget-en.png)

### Method 2: From the Journal Form

Open the bank journal and go to the **PrivatBank** tab → click **Import Statements**.

![Import button in journal](/img/privatbank-autoclient-statement-import/journal-privatbank-tab-overview-en.png)

### Selecting the Import Period

A window with a **Date** field will appear. You can:

- Leave the default value:
  - **Start Date** = current date − number of days specified in the "Import Period (days)" field
  - **End Date** = current date

- Or set your own statement loading period.

![Import period selection window](/img/privatbank-autoclient-statement-import/bank-statement-import-wizard-en.png)
