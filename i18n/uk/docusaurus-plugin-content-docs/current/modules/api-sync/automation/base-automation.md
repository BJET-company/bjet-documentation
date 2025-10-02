---
id: base-automation
title: Налаштування базової автоматизації
sidebar_label: Базова автоматизація
description: Посібник з налаштування автоматичної синхронізації API за допомогою базової автоматизації Odoo
---

# Налаштування базової автоматизації

Базова автоматизація дозволяє автоматичну синхронізацію API, що запускається конкретними подіями в Odoo. Цей посібник пояснює, як налаштувати автоматизовані робочі процеси для безперебійної синхронізації даних.

## Огляд

Базова автоматизація дозволяє вам:
- **Запускати API виклики** при створенні, оновленні або видаленні записів
- **Планувати періодичну синхронізацію** для пакетної обробки
- **Реагувати на зміни полів** з негайними оновленнями API
- **Ланцюжити кілька автоматизацій** для складних робочих процесів

## Налаштування базової автоматизації

### Передумови

1. **Конфігурація API** має бути завершена
2. **Зіставлення полів** мають бути визначені
3. Користувач повинен мати увімкнені **Технічні функції**
4. Модуль **Базова автоматизація** має бути встановлений

### Покрокове налаштування

#### 1. Доступ до правил автоматизації

Перейдіть до: **Налаштування → Технічні → Автоматизація → Правила автоматизації**

*Інтерфейс налаштування базової автоматизації*

#### 2. Створення нового правила

Натисніть **Створити** та налаштуйте:

```python
Name: Синхронізувати клієнта з зовнішнім API
Model: Контакт (res.partner)
Trigger: При створенні та оновленні
Active: Так
```

#### 3. Налаштування умов тригера

Визначте, коли має запускатися автоматизація:

```python
# Умови тригера
Trigger: При створенні та оновленні
Before Update Domain: [('is_company', '=', True)]
Apply on: [('customer_rank', '>', 0)]
Watch Fields: name, email, phone, vat
```

## Типи тригерів

### При створенні

Синхронізувати нові записи негайно:

```python
# Правило автоматизації
Name: Синхронізувати нових клієнтів
Model: res.partner
Trigger: При створенні
Action: Виконати код Python

# Код Python
# config_index - замініть на свій індекс конфігурації API
env['bj.api.sync.config']._make_outbound_http_request(record_ids=records, config_id_ref=config_index)
```

### При оновленні

Синхронізувати при зміні конкретних полів:

```python
# Правило автоматизації
Name: Оновити зміни клієнта
Model: res.partner
Trigger: При оновленні
Watch Fields: ['name', 'email', 'phone', 'street']

# Код Python
# config_index - замініть на свій індекс конфігурації API
env['bj.api.sync.config']._make_outbound_http_request(record_ids=records, config_id_ref=config_index)
```

### При видаленні

Повідомити зовнішню систему про видалення:

```python
# Правило автоматизації
Name: Синхронізувати видалення клієнта
Model: res.partner
Trigger: При видаленні

# Код Python
# config_index - замініть на свій індекс конфігурації API
env['bj.api.sync.config']._make_outbound_http_request(record_ids=records, config_id_ref=config_index)
```

### Заплановані дії

Налаштувати періодичну синхронізацію:

```python
# Запланована дія
Name: Щоденна синхронізація клієнтів
Model: ir.cron
Active: Так
Interval: 1 День
Next Execution: 2024-01-01 02:00:00

# Код Python
def run_daily_sync():
    """Синхронізувати всіх змінених клієнтів щодня"""
    yesterday = datetime.now() - timedelta(days=1)
    
    customers = env['res.partner'].search([
        ('write_date', '>=', yesterday),
        ('customer_rank', '>', 0)
    ])
    
    # config_index - замініть на свій індекс конфігурації API
    env['bj.api.sync.config']._make_outbound_http_request(record_ids=customers, config_id_ref=config_index)
```

## Розширені шаблони автоматизації

### Умовна синхронізація

Синхронізація на основі складних умов:

```python
def should_sync_customer(record):
    """Визначити, чи повинен клієнт бути синхронізований"""
    
    # Перевірити кілька умов
    conditions = [
        record.customer_rank > 0,
        record.email and '@' in record.email,
        record.country_id.code in ['US', 'CA', 'MX'],
        not record.is_blacklisted
    ]
    
    return all(conditions)

# У правилі автоматизації
if should_sync_customer(record):
    # config_index - замініть на свій індекс конфігурації API
    env['bj.api.sync.config']._make_outbound_http_request(record_ids=record, config_id_ref=config_index)
```

### Пакетна обробка

Ефективна обробка кількох записів:

```python
def batch_sync_customers():
    """Синхронізувати клієнтів пакетами"""
    
    batch_size = 100
    customers = env['res.partner'].search([
        ('sync_status', '=', 'pending'),
        ('customer_rank', '>', 0)
    ], limit=batch_size)
    
    if customers:
        # config_index - замініть на свій індекс конфігурації API
        response = env['bj.api.sync.config']._make_outbound_http_request(record_ids=customers, config_id_ref=config_index)
        
        # Оновити статус синхронізації
        if response.get('success'):
            customers.write({'sync_status': 'synced'})
```

### Обробка помилок

Впровадити надійну обробку помилок:

```python
def sync_with_retry(record, max_retries=3):
    """Синхронізація з автоматичною повторною спробою при збої"""
    
    for attempt in range(max_retries):
        try:
            # config_index - замініть на свій індекс конфігурації API
            result = env['bj.api.sync.config']._make_outbound_http_request(record_ids=record, config_id_ref=config_index)
            
            if result.get('success'):
                record.write({
                    'sync_status': 'success',
                    'last_sync': fields.Datetime.now()
                })
                return True
            
        except Exception as e:
            if attempt == max_retries - 1:
                record.write({
                    'sync_status': 'failed',
                    'sync_error': str(e)
                })
                # Надіслати сповіщення
                record.message_post(
                    body=f"Синхронізація API не вдалася: {str(e)}"
                )
            else:
                time.sleep(2 ** attempt)  # Експоненційна затримка
    
    return False
```

## Інтеграція робочого процесу

### Багатокрокові робочі процеси

Ланцюжити автоматизації для складних процесів:

```python
# Крок 1: Перевірити дані клієнта
def validate_customer_data(record):
    """Перший крок: Перевірити повноту даних"""
    required_fields = ['name', 'email', 'phone']
    
    missing = [f for f in required_fields if not getattr(record, f)]
    if missing:
        record.message_post(
            body=f"Відсутні обов'язкові поля: {', '.join(missing)}"
        )
        return False
    
    record.write({'validation_status': 'validated'})
    return True

# Крок 2: Збагатити дані клієнта
def enrich_customer_data(record):
    """Другий крок: Збагатити зовнішніми даними"""
    if record.validation_status != 'validated':
        return False
    
    # Викликати API збагачення
    enrichment_data = call_enrichment_api(record.email)
    record.write({
        'industry': enrichment_data.get('industry'),
        'company_size': enrichment_data.get('size'),
        'enrichment_status': 'enriched'
    })
    return True

# Крок 3: Синхронізувати з зовнішньою системою
def sync_enriched_customer(record):
    """Фінальний крок: Синхронізувати збагачені дані"""
    if record.enrichment_status != 'enriched':
        return False
    
    # config_index - замініть на свій індекс конфігурації API
    env['bj.api.sync.config']._make_outbound_http_request(record_ids=record, config_id_ref=config_index)
    record.write({'workflow_status': 'completed'})
```

### Автоматизація на основі стану

Тригер на основі змін стану:

```python
# Правило автоматизації для змін стану
Name: Синхронізація при зміні стану
Model: sale.order
Trigger: При оновленні
Watch Fields: ['state']

# Код Python
if record.state == 'sale' and old_values.get('state') != 'sale':
    # config_index - замініть на свій індекс конфігурації API
    env['bj.api.sync.config']._make_outbound_http_request(record_ids=record.order_line, config_id_ref=config_index)
```

## Оптимізація продуктивності

### Асинхронна обробка

Використовуйте чергу завдань для кращої продуктивності:

```python
from odoo.addons.queue_job.job import job

@job(default_channel='root.api_sync')
def async_sync_record(record_id, model_name, operation):
    """Асинхронна синхронізація запису"""
    
    env = api.Environment(cr, uid, context)
    record = env[model_name].browse(record_id)
    
    api_config = env['bj.api.sync.config'].search([
        ('model_name', '=', model_name)
    ], limit=1)
    
    return api_config._make_outbound_http_request(record)

# У правилі автоматизації
record.with_delay().async_sync_record(
    record.id,
    record._name,
)
```

## Моніторинг та логування

### Логування активності

Відстеження виконання автоматизації:

```python
def log_automation_activity(record, action, result):
    """Логувати активність автоматизації для моніторингу"""
    
    env['api.sync.log'].create({
        'model': record._name,
        'record_id': record.id,
        'record_name': record.display_name,
        'action': action,
        'status': 'success' if result else 'failed',
        'timestamp': fields.Datetime.now(),
        'details': json.dumps(result) if result else ''
    })
    
    # Оновити запис
    record.write({
        'last_sync': fields.Datetime.now(),
        'sync_count': record.sync_count + 1
    })
```

## Усунення несправностей автоматизації

### Поширені проблеми

| Проблема | Причина | Рішення |
|----------|---------|---------|
| Автоматизація не запускається | Неправильні умови тригера | Перегляньте та протестуйте умови |
| Дублювання синхронізації | Спрацьовує кілька правил | Додайте блокування mutex |
| Погіршення продуктивності | Синхронна обробка | Впровадьте асинхронну обробку |
| Відсутні оновлення | Поле не в списку спостереження | Додайте поле до списку спостереження |

### Налагодження автоматизації

```python
def debug_automation_rule(record):
    """Налагодження виконання автоматизації"""
    
    import logging
    _logger = logging.getLogger(__name__)
    
    _logger.info(f"Автоматизація запущена для {record._name}:{record.id}")
    _logger.info(f"Дані запису: {record.read()[0]}")
    
    try:
        # Ваша логіка автоматизації
        result = api_config.sync_record(record, 'update')
        _logger.info(f"Результат синхронізації: {result}")
    except Exception as e:
        _logger.error(f"Автоматизація не вдалася: {str(e)}", exc_info=True)
        raise
```

## Найкращі практики

1. **Використовуйте відповідні тригери**
   - Виберіть правильний тригер для вашого випадку використання
   - Уникайте правил, що перекриваються

2. **Впровадьте обробку помилок**
   - Завжди обробляйте винятки
   - Логуйте помилки для налагодження

3. **Оптимізуйте продуктивність**
   - Використовуйте асинхронну обробку для важких операцій
   - Пакетуйте операції, коли можливо

4. **Моніторте виконання**
   - Логуйте активності автоматизації
   - Відстежуйте метрики продуктивності

5. **Ретельно тестуйте**
   - Тестуйте з різними сценаріями
   - Перевіряйте обробку помилок

## Наступні кроки

- [Налаштування зіставлення полів](../configuration/field-mapping) - Налаштування зіставлення полів
- [Python скрипти](../python-scripts/context-variables) - Розширене скриптування
- [Усунення несправностей](../troubleshooting) - Налагодження проблем автоматизації
