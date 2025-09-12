---
id: field-mapping
title: Посібник з мапування полів
sidebar_label: Мапування полів
description: Комплексний посібник з мапування полів між моделями Odoo та зовнішніми API
---

# Посібник з мапування полів

Мапування полів є основою синхронізації API, визначаючи як дані проходять між Odoo та зовнішніми системами. Цей посібник надає всебічні інструкції для ефективного налаштування мапування полів.

## Огляд

Мапування полів визначає зв'язок між:
- **Полями Odoo** - Поля у ваших моделях Odoo (наприклад, `res.partner.name`)
- **Полями API** - Поля у запитах/відповідях зовнішнього API (наприклад, `customer_name`)
- **Трансформаціями** - Обробка даних під час синхронізації

## Базове мапування полів

### Просте взаємно-однозначне мапування

Найпоширеніший сценарій - пряме мапування полів:

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
   - Протестуйте з демо-даними
   - Перевірте мапування у логах

## Розширені типи полів

### Many2one поля

Мапування реляційних полів вимагає спеціальної обробки:

```python
# Мапування країни за кодом
def map_country(data):
    country_code = data.get('country_code')
    if country_code:
        country = env['res.country'].search([
            ('code', '=', country_code)
        ], limit=1)
        return country.id
    return False
```

### One2many поля

Обробка кількох пов'язаних записів:

```python
def map_order_lines(order_data):
    """Мапування рядків замовлення з API до формату Odoo"""
    lines = []
    for item in order_data.get('items', []):
        lines.append((0, 0, {
            'product_id': find_product(item['sku']),
            'quantity': item['qty'],
            'price_unit': item['price']
        }))
    return lines
```

### Many2many поля

Мапування множинних зв'язків:

```python
def map_tags(tag_names):
    """Мапування назв тегів у ID тегів"""
    tags = env['product.tag'].search([
        ('name', 'in', tag_names)
    ])
    return [(6, 0, tags.ids)]
```

## Трансформація даних

### Використання Python скриптів

Трансформація даних під час синхронізації:

```python
def transform_inbound(data):
    """Трансформація вхідних API даних у формат Odoo"""
    
    # Форматування номера телефону
    phone = data.get('phone', '')
    if phone and not phone.startswith('+'):
        phone = '+1' + phone.replace('-', '')
    
    # Розбір адреси
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

```python
from datetime import datetime

def convert_date_format(date_string):
    """Конвертація формату дати API у формат Odoo"""
    if not date_string:
        return False
    
    # Розбір різних форматів
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

#### Конвертація валюти

```python
def convert_currency(amount, from_currency, to_currency):
    """Конвертація суми між валютами"""
    if from_currency == to_currency:
        return amount
    
    # Отримання курсу обміну
    rate = env['res.currency'].search([
        ('name', '=', from_currency)
    ]).rate
    
    base_amount = amount / rate
    
    target_rate = env['res.currency'].search([
        ('name', '=', to_currency)
    ]).rate
    
    return base_amount * target_rate
```

## Умовне мапування

### Динамічний вибір полів

Мапування полів на основі умов:

```python
def conditional_mapping(record, api_data):
    """Застосування різних мапувань на основі умов"""
    
    mapping = {}
    
    # Мапування на основі типу клієнта
    if api_data.get('customer_type') == 'B2B':
        mapping.update({
            'is_company': True,
            'partner_type': 'company',
            'vat': api_data.get('tax_id')
        })
    else:
        mapping.update({
            'is_company': False,
            'partner_type': 'individual',
            'first_name': api_data.get('first_name'),
            'last_name': api_data.get('last_name')
        })
    
    # Мапування на основі країни
    country = api_data.get('country')
    if country == 'US':
        mapping['state_id'] = find_us_state(api_data.get('state'))
    
    return mapping
```

### Правила валідації

Реалізація валідації полів:

```python
def validate_field_mapping(field_name, value):
    """Валідація значень полів перед мапуванням"""
    
    validations = {
        'email': lambda v: '@' in v and '.' in v,
        'phone': lambda v: len(v.replace('-', '')) >= 10,
        'vat': lambda v: v.isalnum(),
        'zip': lambda v: v.isdigit() and len(v) == 5
    }
    
    validator = validations.get(field_name)
    if validator and not validator(value):
        raise ValueError(f"Недійсне {field_name}: {value}")
    
    return value
```

## Мапування вкладеного JSON

### Обробка складних структур

Мапування вкладених JSON даних:

```python
def map_nested_json(json_data):
    """Мапування складного вкладеного JSON до полів Odoo"""
    
    result = {}
    
    # Витяг з вкладеної структури
    customer = json_data.get('customer', {})
    result['name'] = customer.get('name')
    
    # Обробка вкладеної адреси
    address = customer.get('address', {})
    result['street'] = address.get('line1')
    result['street2'] = address.get('line2')
    result['city'] = address.get('city')
    result['zip'] = address.get('postal_code')
    
    # Обробка вкладеної контактної інформації
    contact = customer.get('contact_info', {})
    result['email'] = contact.get('email')
    result['phone'] = contact.get('primary_phone')
    result['mobile'] = contact.get('mobile_phone')
    
    # Обробка масивів
    result['tag_ids'] = [(6, 0, [
        find_or_create_tag(tag) 
        for tag in customer.get('tags', [])
    ])]
    
    return result
```

### Вирівнювання вкладених даних

```python
def flatten_json(nested_json, parent_key='', separator='_'):
    """Вирівнювання вкладеної JSON структури"""
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
```

## Двонаправлене мапування

### Синхронізація в обох напрямках

Конфігурація мапувань для вхідних та вихідних:

```python
class BidirectionalMapper:
    """Обробка двонаправленого мапування полів"""
    
    def to_odoo(self, api_data):
        """Мапування з API до Odoo"""
        return {
            'name': api_data.get('customer_name'),
            'email': api_data.get('contact_email'),
            'phone': self.format_phone(api_data.get('phone'))
        }
    
    def to_api(self, odoo_record):
        """Мапування з Odoo до API"""
        return {
            'customer_name': odoo_record.name,
            'contact_email': odoo_record.email,
            'phone': self.clean_phone(odoo_record.phone),
            'customer_id': odoo_record.id,
            'last_updated': odoo_record.write_date.isoformat()
        }
    
    def format_phone(self, phone):
        """Форматування телефону для Odoo"""
        if phone:
            return '+' + ''.join(filter(str.isdigit, phone))
        return ''
    
    def clean_phone(self, phone):
        """Форматування телефону для API"""
        if phone:
            return phone.replace('+', '').replace('-', '')
        return ''
```

## Оптимізація продуктивності

### Пакетна обробка

Ефективна обробка кількох записів:

```python
def batch_map_records(records, batch_size=100):
    """Мапування записів пакетами для кращої продуктивності"""
    
    mapped_records = []
    
    for i in range(0, len(records), batch_size):
        batch = records[i:i + batch_size]
        
        # Попереднє завантаження пов'язаних даних
        product_ids = [r.get('product_id') for r in batch]
        products = env['product.product'].browse(product_ids)
        product_map = {p.id: p for p in products}
        
        # Мапування пакету
        for record in batch:
            mapped = map_single_record(record)
            mapped['product'] = product_map.get(record['product_id'])
            mapped_records.append(mapped)
    
    return mapped_records
```

### Кешування пошуків

```python
class MappingCache:
    """Кешування часто шуканих значень"""
    
    def __init__(self):
        self._cache = {}
    
    def get_country(self, code):
        """Отримання країни з кешуванням"""
        if code not in self._cache:
            country = env['res.country'].search([
                ('code', '=', code)
            ], limit=1)
            self._cache[code] = country.id if country else False
        return self._cache[code]
```

## Усунення несправностей мапування полів

### Поширені проблеми

| Проблема | Причина | Рішення |
|----------|---------|---------|
| Поле не знайдено | Неправильна назва поля | Перевірте технічну назву поля |
| Невідповідність типу | Неправильний тип даних | Застосуйте правильну конвертацію типу |
| Відсутнє обов'язкове поле | Відсутнє мапування | Додайте мапування обов'язкового поля |
| Помилка реляційного поля | Недійсне ID посилання | Реалізуйте правильний пошук |

### Поради з налагодження

1. **Увімкнення логування налагодження**
   ```python
   import logging
   _logger = logging.getLogger(__name__)
   
   def debug_mapping(data):
       _logger.info(f"Вхідні дані: {data}")
       mapped = perform_mapping(data)
       _logger.info(f"Результат мапування: {mapped}")
       return mapped
   ```

2. **Валідація мапувань**
   ```python
   def validate_mapping_config(mapping_config):
       """Валідація конфігурації мапування полів"""
       errors = []
       
       for mapping in mapping_config:
           # Перевірка існування поля Odoo
           model = env[mapping['model']]
           if mapping['odoo_field'] not in model._fields:
               errors.append(f"Поле {mapping['odoo_field']} не знайдено")
       
       return errors
   ```

## Найкращі практики

1. **Тримайте мапування простими**
   - Використовуйте пряме мапування коли це можливо
   - Складні трансформації в окремих функціях

2. **Документуйте мапування**
   - Додавайте коментарі, що пояснюють трансформації
   - Документуйте бізнес-логіку

3. **Обробляйте крайні випадки**
   - Null значення
   - Пусті рядки
   - Недійсні типи даних

4. **Ретельно тестуйте**
   - Модульні тести функцій трансформації
   - Тестування з реальними даними
   - Перевірка двонаправленої синхронізації

## Наступні кроки

- [Налаштування автентифікації](./authentication) - Налаштування автентифікації API
- [Приклади Python скриптів](../python-scripts/context-variables) - Розширені трансформації
- [Усунення несправностей](../troubleshooting) - Налагодження проблем мапування