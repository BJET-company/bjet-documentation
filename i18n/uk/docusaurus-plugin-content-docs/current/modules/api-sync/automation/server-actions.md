---
sidebar_position: 2
title: Дії сервера
description: Налаштування дій сервера для ручних та автоматичних тригерів
---

# Налаштування дій сервера

Налаштуйте дії сервера, щоб запускати синхронізацію API вручну або автоматично.

## Створення дій сервера

### Крок 1: Перейти до дій сервера

Перейдіть до **Налаштування > Технічні > Дії > Дії сервера**.

![Конфігурація дії сервера](/img/api-sync/server-action-config.png)
*Інтерфейс налаштування дії сервера*

### Крок 2: Створення нової дії

1. Натисніть **Створити**
2. Вкажіть **Назву дії** (наприклад, «Синхронізувати клієнта в API»)
3. Оберіть **Модель** (має відповідати моделі вашої конфігурації API)
4. В полі **Дія, яку потрібно виконати** виберіть *Виконати код Python*

### Крок 3: Налаштування коду Python

Додайте код синхронізації:

```python
# Отримати конфігурацію API
config = env['bj.api.sync.config'].search([
    ('name', '=', 'Customer Export API')
], limit=1)
# АБО використати config_index - замініть на свій індекс конфігурації API
# env['bj.api.sync.config']._make_outbound_http_request(record_ids=record.order_line, config_id_ref=config_index)

if config:
    # Для вибраних записів (коли виконується зі списку)
    for record in records:
        try:
            config._make_outbound_http_request(record, config.id, timeout=60)
            # Зафіксувати успіх
            env['bj.api.log'].create({
                'config_id': config.id,
                'name': f'Successfully synced {record.name}',
                'status': 'success',
            })
        except Exception as e:
            # Зафіксувати помилку
            env['bj.api.log'].create({
                'config_id': config.id,
                'name': f'Error syncing {record.name}: {str(e)}',
                'status': 'error',
            })
```

## Методи запуску

### Ручний запуск у інтерфейсі

![Налаштування запуску дії](/img/api-sync/trigger-action-config.png)
*Ручний запуск з меню дій*

1. Додайте до меню **Дії**
2. Увімкніть **Створити в меню «Ще»**
3. Користувачі можуть запускати дію з:
   - Представлення списку (декілька записів)
   - Представлення форми (окремий запис)
   - Меню дій

### Автоматичний запуск

Пов’яжіть дії сервера з:
- Правилами базової автоматизації
- Запланованими діями (Cron)
- Переходами робочих процесів
- Кнопками на формах

## Приклади використання

### 1. Масова синхронізація

Синхронізація декількох записів одночасно:

```python
# Масова синхронізація з відстеженням прогресу
total = len(records)
success = 0
failed = 0

for i, record in enumerate(records):
    try:
        config._make_outbound_http_request(record, config.id)
        success += 1
    except:
        failed += 1
    
    # Оновлювати прогрес (необов'язково)
    if i % 10 == 0:
        env.cr.commit()  # Фіксація кожних 10 записів

# Підсумкове повідомлення
message = f"Sync complete: {success} success, {failed} failed out of {total}"
```

### 2. Умовна синхронізація

Синхронізація лише записів, що відповідають критеріям:

```python
# Синхронізувати тільки затверджених клієнтів
for record in records:
    if record.state == 'approved' and record.sync_enabled:
        config._make_outbound_http_request(record, config.id)
    else:
        env['bj.api.log'].create({
            'name': f'Skipped {record.name}: Not approved or sync disabled',
            'status': 'skipped',
        })
```

### 3. Синхронізація з валідацією

Перевірка даних перед синхронізацією:

```python
def validate_record(record):
    """Перевірити запис перед синхронізацією"""
    errors = []
    
    if not record.email:
        errors.append("Email is required")
    if not record.phone:
        errors.append("Phone is required")
    if record.credit_limit < 0:
        errors.append("Invalid credit limit")
    
    return errors

# Перевіряти та синхронізувати
for record in records:
    errors = validate_record(record)
    
    if errors:
        env['bj.api.log'].create({
            'name': f'Validation failed for {record.name}: {", ".join(errors)}',
            'status': 'error',
        })
    else:
        config._make_outbound_http_request(record, config.id)
```

## Розширене налаштування

### Обробка помилок

Реалізуйте надійну обробку помилок:

```python
import json
from odoo.exceptions import UserError

max_retries = 3
retry_delay = 2  # секунди

for record in records:
    for attempt in range(max_retries):
        try:
            response = config._make_outbound_http_request(record, config.id)
            
            # Перевірити відповідь
            if response.status_code == 200:
                break
            elif response.status_code == 429:  # Ліміт запитів
                time.sleep(retry_delay * (attempt + 1))
            else:
                raise UserError(f"API error: {response.status_code}")
                
        except Exception as e:
            if attempt == max_retries - 1:
                # Остання спроба не вдалася
                raise UserError(f"Failed after {max_retries} attempts: {str(e)}")
            time.sleep(retry_delay)
```

### Оптимізація продуктивності

Оптимізуйте роботу з великими наборами даних:

```python
# Пакетна обробка
batch_size = 50
record_ids = records.ids

for i in range(0, len(record_ids), batch_size):
    batch_ids = record_ids[i:i + batch_size]
    batch_records = env[model_name].browse(batch_ids)
    
    # Обробити пакет
    for record in batch_records:
        config._make_outbound_http_request(record, config.id)
    
    # Фіксувати після кожного пакета
    env.cr.commit()
```

### Логування та моніторинг

*Перегляд логів API — відстежуйте синхронізації в Налаштування > Технічні > BJ API > Логи*

Відстежуйте всі операції синхронізації:

```python
# Детальне логування
start_time = datetime.now()
log_entries = []

for record in records:
    record_start = datetime.now()
    
    try:
        response = config._make_outbound_http_request(record, config.id)
        duration = (datetime.now() - record_start).total_seconds()
        
        log_entries.append({
            'config_id': config.id,
            'record_id': record.id,
            'model': record._name,
            'status': 'success',
            'response_code': response.status_code,
            'duration': duration,
            'timestamp': record_start,
        })
    except Exception as e:
        log_entries.append({
            'config_id': config.id,
            'record_id': record.id,
            'model': record._name,
            'status': 'error',
            'error_message': str(e),
            'timestamp': record_start,
        })

# Створити записи логів
env['bj.api.log'].create(log_entries)

total_duration = (datetime.now() - start_time).total_seconds()
```

## Питання безпеки

### Права доступу

- Дії сервера успадковують права моделі
- Користувачі мають мати права на запис, щоб запускати синхронізацію
- За потреби обмежуйте доступ групами

### Валідація даних

Завжди перевіряйте чутливі дані:

```python
# Санітувати дані перед відправкою
sensitive_fields = ['password', 'api_key', 'token']

for field in sensitive_fields:
    if field in record._fields:
        # Не синхронізувати чутливі поля
        data.pop(field, None)
```

## Найкращі практики

1. **Завжди додавайте обробку помилок** у діях сервера
2. **Фіксуйте всі спроби синхронізації** для аудиту
3. **Реалізуйте повторні спроби** для тимчасових збоїв
4. **Використовуйте пакетну обробку** для великих наборів даних
5. **Додавайте індикатори прогресу** для довгих операцій
6. **Валідуйте дані** перед синхронізацією
7. **Тестуйте у проміжному середовищі** перед продакшеном
8. **Моніторте продуктивність** і оптимізуйте за потреби

## Пов’язана документація

- [Базова автоматизація](base-automation)
- [Конфігурація API](../configuration/overview)
- [Зіставлення полів](../configuration/field-mapping)
- [Усунення несправностей](../troubleshooting)
