---
sidebar_position: 2
title: Контекстні змінні скрипту
---

# Контекстні змінні Python скрипту

При використанні Python скриптів для трансформації даних, наступні змінні доступні у вашому контексті скрипту:

## Основні об'єкти Odoo

### `env`
Об'єкт середовища Odoo для доступу до бази даних.
```python
# Доступ до будь-якої моделі Odoo
partners = env['res.partner'].search([('customer_rank', '>', 0)])
products = env['product.product'].browse([1, 2, 3])
```

### `model`
Цільова модель Odoo, що синхронізується.
```python
# Отримати назву моделі
model_name = model._name  # наприклад, 'res.partner'

# Доступ до полів моделі
field_names = model._fields.keys()
```

### `records`
Поточний набір записів, що обробляється.
```python
# Доступ до даних запису
for record in records:
    print(record.name)
    print(record.email)
    
# Використання mapped для значень полів
emails = records.mapped('email')
total = sum(records.mapped('amount_total'))
```

## Дані запиту

### `request_data`
JSON навантаження з зовнішнього API (вхідні) або дані для відправки (вихідні).
```python
# Вхідні: Розбір вхідних даних
customer_name = request_data.get('name', '')
email = request_data.get('email_address', '')

# Вихідні: Змінити дані, що надсилаються
request_data['timestamp'] = datetime.now().isoformat()
request_data['source'] = 'odoo'
```

## Службові бібліотеки

### Операції з датою/часом
```python
# Доступні імпорти
import time
from datetime import datetime, timedelta
import dateutil
from dateutil import timezone

# Приклад: Розбір рядка дати
date_str = request_data.get('date')
parsed_date = datetime.strptime(date_str, '%Y-%m-%d')

# Приклад: Додавання часової зони
utc_time = datetime.now(timezone.utc)
```

### Кодування Base64
```python
from base64 import b64encode, b64decode

# Кодування бінарних даних
encoded = b64encode(binary_data).decode('utf-8')

# Декодування рядка base64
decoded = b64decode(encoded_string)
```

### Обробка помилок
```python
from odoo.exceptions import UserError

# Підняти зручну для користувача помилку
if not request_data.get('required_field'):
    raise UserError('Обов\'язкове поле відсутнє!')
```

### Команди маніпулювання записами
```python
from odoo.fields import Command

# Створити новий запис
Command.create({'name': 'Новий запис'})

# Оновити запис
Command.update(record_id, {'name': 'Оновлено'})

# Видалити запис
Command.delete(record_id)

# Прив'язати існуючий запис (для many2many)
Command.link(record_id)

# Відв'язати запис
Command.unlink(record_id)
```

## Режими виконання скрипту

### Режим оцінки
Повернути обчислені значення для присвоєння полю:
```python
# Скрипт повинен повернути значення
partner_name = request_data.get('customer', {}).get('name', '')
result = partner_name.upper()  # Це значення буде присвоєно полю
```

### Режим виконання
Виконати складні операції без повернення значень:
```python
# Повернення значення не потрібне
for item in request_data.get('items', []):
    env['product.product'].create({
        'name': item['name'],
        'list_price': item['price']
    })
# Змінна result не потрібна
```

## Повні приклади скриптів

### Приклад 1: Валідація даних
```python
# Перевірити вхідні дані перед обробкою
email = request_data.get('email', '')
import re

if email and not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
    raise UserError(f'Невірний формат email: {email}')

# Очистити номер телефону
phone = request_data.get('phone', '')
result = re.sub(r'[^0-9+]', '', phone)
```

### Приклад 2: Конвертація формату
```python
# Конвертувати формат дати
date_str = request_data.get('order_date')
if date_str:
    # Конвертувати з MM/DD/YYYY в YYYY-MM-DD
    dt = datetime.strptime(date_str, '%m/%d/%Y')
    result = dt.strftime('%Y-%m-%d')
else:
    result = False
```

### Приклад 3: Умовна логіка
```python
# Застосувати бізнес-правила на основі значень даних
amount = float(request_data.get('amount', 0))
customer_type = request_data.get('type')

if customer_type == 'VIP' and amount > 1000:
    result = amount * 0.9  # 10% знижка
elif customer_type == 'Regular' and amount > 500:
    result = amount * 0.95  # 5% знижка
else:
    result = amount
```

### Приклад 4: Реляційна обробка
```python
# Обробка складних зв'язків між записами
partner_ref = request_data.get('partner_code')
if partner_ref:
    partner = env['res.partner'].search([('ref', '=', partner_ref)], limit=1)
    if partner:
        result = partner.id
    else:
        # Створити нового партнера, якщо не знайдено
        new_partner = env['res.partner'].create({
            'name': request_data.get('partner_name'),
            'ref': partner_ref,
            'email': request_data.get('partner_email')
        })
        result = new_partner.id
else:
    result = False
```

### Приклад 5: Зовнішні запити
```python
# Отримати додаткові дані з зовнішніх джерел
import requests

product_sku = request_data.get('sku')
if product_sku:
    # Знайти продукт у зовнішньому каталозі
    response = requests.get(f'https://catalog.example.com/api/products/{product_sku}')
    if response.status_code == 200:
        product_data = response.json()
        result = {
            'name': product_data['title'],
            'list_price': product_data['price'],
            'description': product_data['description']
        }
    else:
        raise UserError(f'Продукт {product_sku} не знайдено в каталозі')
```

## Найкращі практики

1. **Завжди перевіряйте вхідні дані** перед обробкою
2. **Використовуйте блоки try-except** для обробки помилок
3. **Логуйте важливі операції** для налагодження
4. **Тримайте скрипти простими та зосередженими** на одному завданні
5. **Ретельно тестуйте скрипти** з різними вхідними сценаріями
6. **Документуйте складну логіку** коментарями
7. **Уникайте жорсткого кодування значень** - використовуйте параметри конфігурації

## Поради з налагодження

```python
# Використовуйте логування для налагодження
import logging
_logger = logging.getLogger(__name__)

_logger.info(f'Обробка запису: {records.id}')
_logger.debug(f'Дані запиту: {request_data}')
_logger.error(f'Помилка обробки: {str(e)}')

# Інструкції print (видимі в логах сервера)
print(f'DEBUG: Поточне значення = {value}')
```