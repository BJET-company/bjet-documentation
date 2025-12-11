---
sidebar_position: 4
title: Monobank Statement Import
sidebar_label: Monobank Statement Import
---

# BJet Monobank Statement Import

## Module Description

The Monobank Statement Import module provides direct integration between Monobank and Odoo 18 (Community and Enterprise).

It automatically imports bank statements into the standard Odoo models: `account.bank.statement` and `account.bank.statement.line`.

## Import Methods

Statement import can be performed in two ways:

- **Manually** — by the user from the bank journal form or journal dashboard;
- **Automatically** — via a scheduled action (cron) that is created for each Monobank bank journal.

## Primary Purpose

The primary purpose of the module is to load Monobank data into Odoo.

Further processing (reconciliation, matching with documents, file-based import, etc.) is handled by standard Odoo modules or OCA modules.

## Module Version

**Version:** 18.0.1.0.8

**Supported Odoo Versions:** 18.0 Community/Enterprise

## Quick Links

- [Installation and Activation](./installation.md)
- [Configuration](./configuration.md)
- [Troubleshooting](./troubleshooting.md)
