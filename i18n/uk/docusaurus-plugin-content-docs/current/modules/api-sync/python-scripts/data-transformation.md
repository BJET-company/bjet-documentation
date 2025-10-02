---
sidebar_position: 1
title: Скрипти трансформації даних
description: Використовуйте Python-скрипти для складних трансформацій
---

# Python-скрипти для трансформації даних

Python-скрипти дозволяють виконувати складні трансформації даних, які неможливо реалізувати лише мапуванням полів.

## Інтерфейс редактора скриптів

![Python Script Editor](/img/api-sync/python-script-editor.png)
*Редактор скриптів із доступними змінними та прикладами*

### Посібник і довідка в інтерфейсі

![Python Script Manual](/img/api-sync/python-script-manual.png)
*Вбудований посібник із переліком змінних та прикладів використання*

## Доступні контекстні змінні

Під час написання скриптів ви маєте доступ до таких змінних:

### Основні об'єкти
```python
env          # Середовище Odoo для доступу до БД
model        # Модель Odoo, що синхронізується
records      # Поточний набір записів
request_data # JSON-повідомлення від/до зовнішнього API
```

### Службові бібліотеки
```python
# Операції з датою/часом
time, datetime, dateutil, timezone

# Кодування
b64encode, b64decode  # Base64 кодування/декодування

# Обробка помилок
UserError  # Виключення з повідомленням для користувача

# Робота з записами
Command  # Стандартні команди для створення/оновлення зв'язків
```

## Режими виконання скриптів

### Evaluate Mode
Повертає обчислене значення, яке буде записане в поле:
```python
# Повернення розрахованого значення
record.price * 1.2  # Надбавка 20%
```

### Execute Mode
Виконує складні дії без повернення результату:
```python
# Створення пов'язаних записів
env['product.pricelist.item'].create({
    'product_id': record.id,
    'price': request_data.get('special_price')
})
```

## Типові сценарії

### 1. Валідація даних
Перевіряйте дані перед тим, як Odoo їх обробляє:

```python
# Перевірка формату email
import re

email = request_data.get('email', '')
if email and not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
    raise UserError(f"Invalid email format: {email}")

# Контроль обов'язкових полів
required_fields = ['name', 'email', 'phone']
missing = [f for f in required_fields if not request_data.get(f)]
if missing:
    raise UserError(f"Missing required fields: {', '.join(missing)}")
```

### 2. Конвертація форматів
Перетворюйте дані у формат, який очікує Odoo:

```python
# Конвертація дати
from datetime import datetime

datetime.strptime(
    request_data.get('birth_date', ''),
    '%m/%d/%Y'
).strftime('%Y-%m-%d')

# Нормалізація телефону
''.join(filter(str.isdigit, request_data.get('phone', '')))
```

### 3. Умовна логіка
Застосовуйте бізнес-правила, виходячи зі значень даних:

```python
# Категоризація клієнтів за сумою замовлень
total_orders = request_data.get('total_orders', 0)

if total_orders > 100000:
    category = 'platinum'
    discount = 0.20
elif total_orders > 50000:
    category = 'gold'
    discount = 0.15
elif total_orders > 10000:
    category = 'silver'
    discount = 0.10
else:
    category = 'bronze'
    discount = 0.05

record.write({
    'customer_category': category,
    'discount_percentage': discount * 100,
})
```

### 4. Робота з реляційними зв'язками
Створюйте або знаходьте пов'язані записи:

```python
partner_data = request_data.get('company', {})
if partner_data:
    partner = env['res.partner'].search([
        ('name', '=', partner_data.get('name')),
        ('is_company', '=', True)
    ], limit=1)

    if not partner:
        partner = env['res.partner'].create({
            'name': partner_data.get('name'),
            'is_company': True,
            'email': partner_data.get('email'),
            'phone': partner_data.get('phone'),
        })
```

### 5. Агрегація даних
Рахуйте підсумки або формуйте нові записи на основі вхідних масивів:

```python
line_items = request_data.get('items', [])
total = 0
tax_total = 0

for item in line_items:
    quantity = item.get('quantity', 0)
    price = item.get('price', 0)
    tax_rate = item.get('tax_rate', 0)

    subtotal = quantity * price
    tax = subtotal * (tax_rate / 100)

    total += subtotal
    tax_total += tax

for item in line_items:
    env['account.move.line'].create({
        'move_id': record.id,
        'product_id': item.get('product_id'),
        'quantity': item.get('quantity'),
        'price_unit': item.get('price'),
    })

record.write({'amount': total + tax_total})
```

## Розширені прийоми

### Обробка помилок
```python
try:
    value = int(request_data.get('quantity'))
    if value < 0:
        raise ValueError('Quantity cannot be negative')
except ValueError as e:
    env['bj.api.log'].create({
        'name': f'Data transformation error: {str(e)}',
        'request_data': str(request_data),
    })
```

### Логування та налагодження
```python
import logging
_logger = logging.getLogger(__name__)

_logger.info(f'Processing record: {record.id}')
_logger.debug(f'Request data: {request_data}')

env['bj.api.log'].create({
    'config_id': config.id,
    'record_id': record.id,
    'action': 'transform',
    'details': f'Transformed {len(request_data)} fields',
})
```

### Оптимізація продуктивності
```python
record_ids = request_data.get('record_ids', [])

# Погано: послідовні запити до БД
# for rid in record_ids:
#     env['model'].browse(rid).write({'field': value})

# Добре: пакетне оновлення
if record_ids:
    env['model'].browse(record_ids).write({'field': value})
```

## Найкращі практики

1. Перевіряйте дані перед обробкою.
2. Використовуйте `try-except` для контрольованих помилок.
3. Логуйте ключові кроки трансформації.
4. Оптимізуйте запити до БД через пакетні операції.
5. Документуйте складну логіку коментарями.
6. Тестуйте скрипти перед використанням у продакшені.
7. Обробляйте `None` та порожні значення.
8. Обережно конвертуйте типи даних.

## Типові помилки

```python
# ❌ Не змінюйте request_data напряму
request_data['field'] = 'value'

# ✅ Створюйте окремі змінні
modified_value = request_data.get('field', '') + '_suffix'

# ❌ Використання невизначених змінних
undefined_variable

# ✅ Перевіряйте наявність значень
locals().get('variable_name', default_value)

# ❌ Безкінечні цикли
while True:
    process_data()

# ✅ Обмежені цикли
for i in range(max_iterations):
    if condition_met:
        break
    process_data()
```

## Тестування скриптів

```python
# Тестуйте на різних наборах даних
test_cases = [
    {'name': 'Test Customer', 'email': 'test@example.com'},
    {'name': 'No Email'},
    {'email': 'invalid-email'},
    {},
]

for test_data in test_cases:
    try:
        result = transform_data(test_data)
        print(f'Success: {result}')
    except Exception as e:
        print(f'Error with {test_data}: {str(e)}')
```

## Пов’язана документація

- [Контекстні змінні](context-variables)
- [Конфігурація API](../configuration/overview)
- [Усунення помилок](../troubleshooting)
- [Оптимізація продуктивності](../performance-optimization)
