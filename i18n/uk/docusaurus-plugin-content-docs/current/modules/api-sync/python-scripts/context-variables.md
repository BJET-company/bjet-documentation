---
sidebar_position: 2
title: Контекстні змінні скрипту
---

# Контекстні змінні Python-скриптів

Під час використання Python-скриптів для трансформації даних у вашому розпорядженні є такі змінні й бібліотеки.

## Основні об'єкти Odoo

### `env`
Середовище Odoo для доступу до бази даних і моделей.
```python
# Доступ до будь-якої моделі Odoo
partners = env['res.partner'].search([('customer_rank', '>', 0)])
products = env['product.product'].browse([1, 2, 3])
```

### `model`
Модель Odoo, для якої виконується синхронізація.
```python
# Назва моделі
model_name = model._name  # наприклад, 'res.partner'

# Список полів моделі
field_names = model._fields.keys()
```

### `records`
Поточний набір записів, що обробляється скриптом.
```python
for record in records:
    print(record.name)
    print(record.email)

# Швидкий збір значень полів
emails = records.mapped('email')
total = sum(records.mapped('amount_total'))
```

## Дані запиту

### `request_data`
JSON-повідомлення ззовні (вхідний потік) або дані, що відправляються (вихідний).
```python
# Вхідні дані
customer_name = request_data.get('name', '')
email = request_data.get('email_address', '')

# Вихідні дані
request_data['timestamp'] = datetime.now().isoformat()
request_data['source'] = 'odoo'
```

## Службові бібліотеки

### Дата та час
```python
import time
from datetime import datetime, timedelta
import dateutil
from dateutil import timezone

date_str = request_data.get('date')
parsed_date = datetime.strptime(date_str, '%Y-%m-%d')
utc_time = datetime.now(timezone.utc)
```

### Base64
```python
from base64 import b64encode, b64decode

encoded = b64encode(binary_data).decode('utf-8')
decoded = b64decode(encoded_string)
```

### Обробка помилок
```python
from odoo.exceptions import UserError

if not request_data.get('required_field'):
    raise UserError('Обов\'язкове поле відсутнє!')
```

### Команди роботи із записами
```python
from odoo.fields import Command

Command.create({'name': 'Новий запис'})
Command.update(record_id, {'name': 'Оновлено'})
Command.delete(record_id)
Command.link(record_id)
Command.unlink(record_id)
```

## Режими виконання скриптів

### Evaluate Mode (Оцінка)
Повертає обчислене значення, яке буде записане в поле:
```python
request_data.get('customer', {}).get('name', '').upper()
# Результат функції стане значенням поля
```

### Execute Mode (Виконання)
Виконує складні операції без повернення значення:
```python
for item in request_data.get('items', []):
    env['product.product'].create({
        'name': item['name'],
        'list_price': item['price']
    })
# Нічого повертати не потрібно
```

## Приклади скриптів

### 1. Валідація даних
```python
# Очищення номера телефону (Evaluate)
import re
re.sub(r'[^0-9+]', '', request_data.get('phone', ''))

# Перевірка формату email (Execute)
email = request_data.get('email', '')
if email and not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
    raise UserError(f'Невірний формат email: {email}')
```

### 2. Конвертація формату
```python
# Перетворення дати з MM/DD/YYYY у YYYY-MM-DD (Evaluate)
from datetime import datetime

datetime.strptime(
    request_data.get('order_date'),
    '%m/%d/%Y'
).strftime('%Y-%m-%d')
```

### 3. Зовнішні запити
```python
# Отримання даних з зовнішнього каталогу (Execute)
import requests

product_sku = request_data.get('sku')
if product_sku:
    response = requests.get(f'https://catalog.example.com/api/products/{product_sku}')
    if response.status_code == 200:
        product_data = response.json()
        result = {
            'name': product_data['title'],
            'list_price': product_data['price'],
            'description': product_data['description'],
        }
    else:
        raise UserError(f'Product {product_sku} not found in catalog')
```

## Найкращі практики

1. Перевіряйте вхідні дані перед обробкою.
2. Використовуйте `try/except` для передбачуваних помилок.
3. Логуйте ключові операції, щоб спростити налагодження.
4. Пишіть короткі, зрозумілі скрипти під конкретне завдання.
5. Тестуйте скрипти на різних наборах даних.
6. Коментуйте складну бізнес-логіку.
7. Не хардкодуйте значення — зберігайте їх у конфігураціях.

## Поради з налагодження

```python
import logging
_logger = logging.getLogger(__name__)

_logger.info(f'Processing record: {records.id}')
_logger.debug(f'Request data: {request_data}')
_logger.error(f'Error processing: {str(e)}')

print(f'DEBUG: Current value = {value}')
```
