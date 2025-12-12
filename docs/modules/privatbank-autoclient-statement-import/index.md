---
sidebar_position: 2
title: "PrivatBank24 Business: Bank Statement Import"
sidebar_label: "PrivatBank24 Business: Bank Statement Import"
---

# BJet PrivatBank Autoclient Statement Import

## Module Description

The PrivatBank Autoclient Statement Import module provides direct integration between PrivatBank and Odoo 18 (Community and Enterprise).

It automatically imports bank statements into standard Odoo models: `account.bank.statement` and `account.bank.statement.line`

## Import Methods

Statement import can be performed:

- **Manually** — by the user from the bank journal form or journal dashboard

- **Automatically** — using a scheduler (cron), which is created for each PrivatBank bank journal.

## Main Purpose

The main purpose of the module is to load PrivatBank data into Odoo with automatic avoidance of transaction duplication

Then they are processed (reconciled, verified with documents, imported through files, etc.) by standard Odoo modules or OCA modules.

## Quick Links

- [Installation and Activation](./installation.md)
- [Configuration](./configuration.md)
- [Troubleshooting](./troubleshooting.md)