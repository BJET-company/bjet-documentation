---
id: field-mapping
title: Посібник з мапування полів
sidebar_label: Мапування полів
description: Комплексний посібник з мапування полів між моделями Odoo та зовнішніми API
---

# Посібник з мапування полів

Мапування полів є основою синхронізації API, визначаючи, як дані переходять між Odoo та зовнішніми системами. Цей посібник надає детальні інструкції для ефективного налаштування мапувань.

## Огляд

Мапування полів визначає взаємозв'язок між:
- **Полями Odoo** — технічні назви полів у ваших моделях (наприклад, `res.partner.name`)
- **Параметрами API** — ключі у запитах та відповідях зовнішніх сервісів (наприклад, `customer_name`)
- **Трансформаціями** — обробкою даних під час синхронізації

## Базове мапування полів

### Просте один-до-одного мапування

Найпоширеніший сценарій — пряме зіставлення полів:

```python
# Поле Odoo → Поле API
partner.name → customer_name
partner.email → contact_email
partner.phone → phone_number
```

### Кроки конфігурації

1. **Перехід до мапування полів**
   - Перейдіть до **Налаштування → Технічні → Конфігурації API синхронізації**
   - Виберіть вашу конфігурацію
   - Натисніть на вкладку **Мапування полів**

2. **Додавання нового мапування**
   ```
   Поле Odoo: name
   Поле API: customer_name
   Напрямок: Обидва (Вхідний і Вихідний)
   Обов'язкове: Так
   ```

3. **Збереження та тестування**
   - Збережіть конфігурацію
   - Перевірте синхронізацію на тестових даних
   - Переконайтеся в коректності логів

## Розширені типи полів

Наш конектор підтримує **реляційне мапування полів** безпосередньо з інтерфейсу конфігурації.  
Це прибирає потребу у власних Python-скриптах — достатньо обрати на формі конфігурації значення **Value Calculation Type → Relational with Mapping Model** та вказати відповідну модель мапування.

---

### Many2one поля

Для зв'язків «багато-до-одного» (наприклад, `field_id` у моделі):

#### Приклад: Продукт → Одиниця виміру

**Конфігурація створення продукту**

| Field                       | Value Calculation Type         | External API Key | Mapping Model | Is Record Identifier |
|-----------------------------|--------------------------------|------------------|---------------|----------------------|
| Unit of Measure (Product)   | Relational with Mapping Model  | `uom_id`         | `uom`         | False                |

**Конфігурація одиниць виміру**

| Field                                  | Value Calculation Type | External API Key | Is Record Identifier |
|----------------------------------------|------------------------|------------------|----------------------|
| Display Name (Product Unit of Measure) | Plain                  | `name`           | False                |
| ID (Product Unit of Measure)           | Plain                  | `id`             | True                 |

💡 Під час створення продукту через API система автоматично зіставить `uom_id` з відповідним записом `uom.uom` у Odoo.

---

### One2many поля

Для дочірніх записів (наприклад, рядки замовлення) налаштовується окрема модель мапування.

**Конфігурація замовлення**

| Field       | Value Calculation Type        | External API Key | Mapping Model |
|-------------|-------------------------------|------------------|---------------|
| Order Lines | Relational with Mapping Model | `items`          | order_line    |

**Конфігурація рядка замовлення**

| Field    | Value Calculation Type        | External API Key | Mapping Model |
|----------|-------------------------------|------------------|---------------|
| Product  | Relational with Mapping Model | `sku`            | product       |
| Quantity | Plain                         | `qty`            | —             |
| Unit Price | Plain                        | `price`          | —             |

Конектор автоматично генерує кортежі `(0, 0, {...})` для кожного дочірнього запису.

---

### Many2many поля

Для зв'язків «багато-до-багатьох» (наприклад, теги) використовуйте модель мапування, що перетворює зовнішні значення в ID Odoo.

**Конфігурація продукту**

| Field | Value Calculation Type        | External API Key | Mapping Model |
|-------|-------------------------------|------------------|---------------|
| Tags  | Relational with Mapping Model | `tags`           | product_tag   |

**Конфігурація тегів**

| Field       | Value Calculation Type | External API Key | Is Record Identifier |
|-------------|------------------------|------------------|----------------------|
| Tag Name    | Plain                  | `name`           | True                 |
| External ID | Plain                  | `id`             | False                |

Конектор автоматично формує список `(6, 0, ids)` для Many2many-полів.

---

### Чому цей підхід працює

- **UI-first**: Усі мапування налаштовуються з інтерфейсу конфігурації без коду
- **Повторне використання**: Моделі мапування (наприклад, `uom`, `order_line`, `product_tag`) можна прив'язувати до різних конфігурацій
- **Послідовність**: Єдина схема працює для `Many2one`, `One2many` та `Many2many`
- **Розширюваність**: За потреби розробники можуть додати додаткову логіку у моделі мапування

---

## Трансформація даних

### Використання Python-скриптів

Виконуйте обробку даних під час синхронізації:

```python
def transform_inbound(data):
    """Transform incoming API data to Odoo format"""
    
    # Format phone number
    phone = data.get('phone', '')
    if phone and not phone.startswith('+'):
        phone = '+1' + phone.replace('-', '')
    
    # Parse address
    address_parts = data.get('address', '').split(',')
    
    return {
        'name': data.get('customer_name'),
        'phone': phone,
        'street': address_parts[0] if address_parts else '',
        'city': address_parts[1].strip() if len(address_parts) > 1 else '',
        'email': data.get('email', '').lower(),
        'customer_rank': 1
    }
```

### Поширені трансформації

#### Конвертація формату дати

Якщо у вас є метод `convert_date_format`:

```python
from datetime import datetime

def convert_date_format(date_string):
    """Convert API date format to Odoo format"""
    if not date_string:
        return False
    
    formats = [
        '%Y-%m-%d',
        '%m/%d/%Y',
        '%d-%m-%Y',
        '%Y-%m-%dT%H:%M:%S'
    ]
    
    for fmt in formats:
        try:
            dt = datetime.strptime(date_string, fmt)
            return dt.strftime('%Y-%m-%d')
        except ValueError:
            continue
    
    return False
```

Скрипт можна викликати у режимі **Evaluate**:

```python
record.convert_date_format(request_data.get('date_string'))
```

#### Конвертація валюти

```python
def convert_currency(amount, from_currency, to_currency):
    """Convert amount between currencies"""
    if from_currency == to_currency:
        return amount
    
    rate = env['res.currency'].search([
        ('name', '=', from_currency)
    ]).rate
    
    base_amount = amount / rate
    
    target_rate = env['res.currency'].search([
        ('name', '=', to_currency)
    ]).rate
    
    return base_amount * target_rate
```

Приклад виклику в режимі **Evaluate**:

```python
record.convert_currency(request_data.get('amount'), 'UAH', 'USD')
```

## Умовне мапування

### Динамічний вибір полів

Мапуйте поля залежно від умов (режим **Execute**):

```python
mapping = {}

# Map based on customer type
if request_data.get('customer_type') == 'B2B':
    mapping.update({
        'is_company': True,
        'partner_type': 'company',
        'vat': request_data.get('tax_id')
    })
else:
    mapping.update({
        'is_company': False,
        'partner_type': 'individual',
        'first_name': request_data.get('first_name'),
        'last_name': request_data.get('last_name')
    })

# Map based on country
country = request_data.get('country')
if country == 'US':
    mapping['state_id'] = find_us_state(request_data.get('state'))

env['res.partner'].create(mapping)
```

### Правила валідації

Перевіряйте значення перед мапуванням (режим **Execute**):

```python
validations = {
    'email': lambda v: '@' in v and '.' in v,
    'phone': lambda v: len(v.replace('-', '')) >= 10,
    'vat': lambda v: v.isalnum(),
    'zip': lambda v: v.isdigit() and len(v) == 5
}

validator = validations.get('email')  # як приклад
for k in validations.keys():
    if validator and not validator(request_data.get(k)):
        raise ValueError(f"Invalid {field_name}: {value}")
```

## Мапування вкладеного JSON

### Обробка складних структур

Для глибоко вкладених об'єктів (наприклад, клієнт → адреса → теги) використовуйте **реляційні моделі мапування**:

- **Батьківська конфігурація (наприклад, Customer)** — визначте верхньорівневі поля та зв'яжіть реляційні поля з підлеглими моделями.
- **Дочірня конфігурація (наприклад, Address, Tags)** — окрема модель для кожної вкладеної структури, що розкладає JSON на поля Odoo (`street`, `city`, `zip`, тощо).

### Вирівнювання вкладених даних

Для динамічних або непередбачуваних структур можна попередньо «розпластати» JSON у режимі **Execute**.

```python
def flatten_json(nested_json, parent_key='', separator='_'):
    """Flatten nested JSON structure into simple key/value pairs"""
    items = []
    
    for key, value in nested_json.items():
        new_key = f"{parent_key}{separator}{key}" if parent_key else key
        
        if isinstance(value, dict):
            items.extend(
                flatten_json(value, new_key, separator).items()
            )
        elif isinstance(value, list):
            items.append((new_key, ','.join(map(str, value))))
        else:
            items.append((new_key, value))
    
    return dict(items)

record.flattened = flatten_json(request_data)
```

## Двонаправлене мапування

### Синхронізація в обох напрямках

Налаштовуйте мапування і для вхідних, і для вихідних потоків (режим **Evaluate**):

```python
record.format_phone(request_data.get('phone'))
# OR
record.clean_phone(request_data.get('phone'))
# OR
record.write_date.isoformat()
```

## Усунення несправностей мапувань

### Поширені проблеми

| Проблема | Причина | Рішення |
|----------|---------|---------|
| Поле не знайдено | Неправильна технічна назва | Перевірте технічне ім'я поля |
| Невідповідність типу | Невірний тип даних | Застосуйте коректну конвертацію |
| Відсутнє обов'язкове поле | Немає відповідного мапування | Додайте мапування для обов'язкового поля |
| Помилка реляційного поля | Недійсне посилання на ID | Реалізуйте коректний пошук запису |

### Поради з налагодження

1. **Увімкніть логування налагодження**
   ```python
   import logging
   _logger = logging.getLogger(__name__)
   
   def debug_mapping(data):
       _logger.info(f"Input data: {data}")
       mapped = perform_mapping(data)
       _logger.info(f"Mapped result: {mapped}")
       return mapped
   ```

2. **Валідуйте конфігурацію мапувань**
   ```python
   def validate_mapping_config(mapping_config):
       """Validate field mapping configuration"""
       errors = []
       
       for mapping in mapping_config:
           model = env[mapping['model']]
           if mapping['odoo_field'] not in model._fields:
               errors.append(f"Field {mapping['odoo_field']} not found")
       
       return errors
   ```

## Найкращі практики

1. **Тримайте мапування простими**
   - Використовуйте прямі відповідності, коли це можливо
   - Виносьте складні трансформації у функції чи моделі мапування

2. **Документуйте логіку**
   - Додавайте пояснення до незвичних трансформацій
   - Фіксуйте бізнес-вимоги у README або внутрішній вікі

3. **Обробляйте крайові випадки**
   - Перевіряйте `null`-значення, порожні рядки, типи даних

4. **Тестуйте кожен сценарій**
   - Пишіть модульні тести для Python-функцій
   - Використовуйте реальні дані для валідації
   - Переконуйтеся, що двонаправлена синхронізація працює коректно

## Наступні кроки

- [Налаштування автентифікації](./authentication) — керування доступом до API
- [Приклади Python-скриптів](../python-scripts/context-variables) — розширені трансформації
- [Усунення несправностей](../troubleshooting) — діагностика проблем синхронізації
