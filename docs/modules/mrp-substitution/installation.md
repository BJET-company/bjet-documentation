---
sidebar_position: 1
title: Installation and Access Rights
sidebar_label: Installation
---

# Installation and Access Rights

## Module Installation

1. Go to the **Apps** menu.

2. Find the **MRP Component Substitution with Priority Levels** module.

3. Click **Install**.

:::info Note
If the Manufacturing [mrp] module is not yet installed — it will be installed automatically.
:::

## Access Rights

To work with substitutes, a user must have:
- the **"Allow Substitute Products (MRP)"** permission
- and standard Odoo **"Product Creation"** extra rights

Without these rights, the substitutes tab will not be visible in the product form.

### How to Grant Access (for Administrator)

1. Go to: **Settings → Users & Companies → Users**
2. Open the required user
3. In the **Access Rights** tab, enable the checkbox: **Allow Substitute Products (MRP)**
4. Save the changes

![User access rights with Allow Substitute Products (MRP) permission](/img/mrp-substitution/user-access-rights-en.png)

## Next Steps

After installing the module, proceed to [Configuration](./configuration.md) to set up substitutes on products.
