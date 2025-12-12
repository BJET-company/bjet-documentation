---
sidebar_position: 2
title: Налаштування
sidebar_label: Налаштування
---

# Налаштування

## Налаштування журналу Монобанку

### Крок 1: Створення або відкриття журналу

1. Створіть або відкрийте банківський журнал (Тип журналу = **Банк** (Bank)).
2. Вкажіть номер банківського рахунку.
3. На вкладці **Journal Entries** знайдіть поле **Bank Feeds**.
4. Оберіть **Autoclient PrivatBank24**.

![Вибір PrivatBank API у полі Bank Feeds](/img/privatbank-autoclient-statement-import/journal-setup-autoclient-selection-ua.png)

5. З'явиться нова вкладка **ПриватБанк**.


:::info Примітка
Якщо пізніше вибрати інший варіант Bank Feeds — вкладка ПриватБанк приховається.
:::

### Крок 2: Налаштування вкладки PrivatBank

У вкладці **ПриватБанк** заповніть такі поля:

- **Токен Автоклієнт ПриватБанк24**

- **Ідентифікатор Автоклієнт ПриватБанк24**

Щоб отримати авторизаційні дані перейдіть за посиланням https://docs.google.com/document/d/e/2PACX-1vTtKvGa3P4E-lDqLg3bHRF6Wi9S7GIjSMFEFxII5qQZBGxuTXs25hQNiUU1hMZQhOyx6BNvIZ1bVKSr/pub
та виконайте усі кроки описані у пункті **Створення профілю та отримання даних для авторизації**

Скопіюйте отриманий Токен та ID

![Авторизаційні дані для роботи з API](/img/privatbank-autoclient-statement-import/api-authorization-token-display-ua.png)

та вставте у поля Токен Автоклієнт ПриватБанк24 та Ідентифікатор Автоклієнт ПриватБанк24

![Авторизаційні дані для роботи з API в Odoo](/img/privatbank-autoclient-statement-import/privatbank-tab-authentication-setup-ua.png)

#### Період імпорту (дні)

Тут вказується за скільки останніх днів завантажувати виписки.

**Значення за замовчуванням:** - 1 день.

- Після збереження Журналу із заповненим токеном створюється cron, який виконується щоденно. Якщо Autoclient PrivatBank24 перестає бути джерелом Bank Feeds → cron автоматично видаляється.

![Журнал з налаштованим cron](/img/privatbank-autoclient-statement-import/privatbank-tab-automation-setup-ua.png)

## Завантаження виписок вручну

### Спосіб 1: З дашборду журналів

Перейдіть у меню **Accounting/Invoicing** → **Дашборди журналів** → натисніть **Імпорт виписок**.

![Кнопка імпорту на дашборді](/img/privatbank-autoclient-statement-import/dashboard-privatbank-widget-ua.png)

### Спосіб 2: З форми журналу

Відкрийте банківський журнал та перейдіть на закладку **Monobank** → натисніть **Імпорт виписок**.

![Кнопка імпорту в журналі](/img/privatbank-autoclient-statement-import/journal-privatbank-tab-overview-ua.png)

### Вибір періоду імпорту

З'явиться вікно з полем **Дата**. Ви можете:

- Залишити значення за замовчуванням:
  - **Дата початку** = поточна дата − кількість днів вказана у полі "Період імпорту (дні)"
  - **Дата кінця** = поточна дата

- Або встановити власний період завантаження виписок.

![Вікно вибору періоду імпорту](/img/privatbank-autoclient-statement-import/bank-statement-import-wizard-ua.png)
