---
sidebar_position: 4
title: Змінні шаблонів
---

# Корисні змінні для шаблонів

| Модель&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Змінна&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Опис&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
|--------|--------|------|
| account.move | o.partner_id.name | Назва клієнта |
| 〃 | o.name | Номер рахунку |
| 〃 | o.invoice_line_ids | Список позицій |
| 〃 | o.amount_total | Загальна сума |
| 〃 | o.amount_tax | Сума ПДВ |
| 〃 | o.amount_untaxed | Сума без ПДВ |
| 〃 | o.invoice_date | Дата рахунку |
