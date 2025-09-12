---
sidebar_position: 3
title: Налаштування вихідного API
---

# Налаштування вихідного API

Налаштуйте Odoo для автоматичного надсилання даних до зовнішніх систем на основі тригерів та подій.

## Покрокове налаштування

### Крок 1: Створення базової конфігурації

1. Перейдіть до **Налаштування > Технічні > BJ API > Конфігурації API**

![API Settings Menu](/img/api-sync/api-settings-menu.png)
*Меню конфігурацій API в технічних налаштуваннях*

2. Натисніть **Створити**

![API Configuration Form](/img/api-sync/api-configuration-form.png)
*Форма нової конфігурації API*

3. Встановіть **Тип запиту** на **"Out"** для вихідної синхронізації

![Outbound Configuration](/img/api-sync/outbound-configuration.png)
*Виберіть "Out" для вихідної синхронізації даних*

### Крок 2: Налаштування зовнішнього API

#### URL запиту

![Request URL Configuration](/img/api-sync/request-url-config.png)
*Налаштування URL кінцевої точки зовнішнього API*

Введіть повну кінцеву точку зовнішнього API:
```
https://api.example.com/partners
```

#### HTTP метод
Виберіть **один** HTTP метод (обов'язково для вихідних):
- **GET**: Запит зовнішніх даних
- **POST**: Надсилання нових даних
- **PUT**: Оновлення існуючих даних
- **DELETE**: Видалення даних

:::warning
Вихідні конфігурації вимагають вибору рівно одного HTTP методу.
:::

### Крок 3: Встановлення параметрів таймауту

Налаштуйте таймаути для запобігання зависанню запитів:

![Timeout Settings](/img/api-sync/timeout-settings.png)
*Налаштування таймауту*

- **Таймаут з'єднання**: Максимальний час для встановлення з'єднання (за замовчуванням: 5 секунд)
- **Таймаут читання**: Максимальний час очікування відповіді (за замовчуванням: 15 секунд)

Приклад конфігурації:
```python
Connection Timeout: 10  # секунд
Read Timeout: 30        # секунд
```

### Крок 4: Налаштування автентифікації

#### Базова автентифікація

![Basic Authentication](/img/api-sync/basic-auth-config.png)
*Налаштування базової автентифікації*

```python
Authorization Type: Basic Auth
Login: api_user
Password: secure_password
```

Згенерований заголовок:
```
Authorization: Basic dXNlcjpwYXNz
```

#### Bearer токен

![Bearer Token Authentication](/img/api-sync/bearer-token-config.png)
*Налаштування Bearer токена*

```python
Authorization Type: Bearer Token
Bearer Token: sk_live_abc123xyz789
```

Згенерований заголовок:
```
Authorization: Bearer sk_live_abc123xyz789
```

### Крок 5: Визначення вихідної моделі та фільтрів

![Model Settings](/img/api-sync/model-settings.png)
*Налаштування моделі та фільтрів*

#### Вибір моделі
Виберіть модель Odoo для синхронізації:
- `res.partner` - Контакти
- `product.product` - Продукти
- `sale.order` - Замовлення продажу
- `account.move` - Рахунки-фактури

#### Домен фільтра
Застосуйте умови для вибору конкретних записів:
```python
# Синхронізувати лише активних клієнтів
[('active', '=', True), ('customer_rank', '>', 0)]

# Синхронізувати замовлення за останні 7 днів
[('create_date', '>=', (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d'))]
```

### Крок 6: Створення зіставлення полів

![Field Mapping Configuration](/img/api-sync/field-mapping.png)
*Налаштування зіставлення полів*

Зіставте поля Odoo зі структурою зовнішнього API:

| Поле Odoo | Ключ зовнішнього API | Тип значення | Примітки |
|-----------|---------------------|--------------|----------|
| name | full_name | Звичайний | Ім'я клієнта |
| email | email_address | Звичайний | Поле email |
| phone | contact_number | Звичайний | Номер телефону |
| id | external_id | Звичайний | Унікальний ідентифікатор |
| partner_id.name | company_name | Реляційний | Посилання на компанію |

### Крок 7: Додавання користувацьких заголовків

![Headers Configuration](/img/api-sync/headers-config.png)
*Налаштування користувацьких HTTP заголовків*

Налаштуйте додаткові HTTP заголовки:

```python
# Вкладка заголовків
Content-Type: application/json
X-API-Version: 2.0
X-Client-Id: odoo-integration
```

### Крок 8: Налаштування тригерів автоматизації

#### Ручне виконання
Викликайте метод безпосередньо в серверних діях:
```python
record = self.env['res.partner'].browse(partner_id)
config = self.env.ref('module.api_config_xml_id')
config._make_outbound_http_request(record, config.id, timeout=60)
```

#### Cron завдання

*Планування автоматичної синхронізації*

Налаштуйте регулярну синхронізацію:
1. Створіть заплановану дію
2. Встановіть модель на `bj.api.sync.config`
3. Налаштуйте код Python:
```python
# Синхронізувати всіх змінених партнерів щогодини
partners = env['res.partner'].search([
    ('write_date', '>=', datetime.now() - timedelta(hours=1))
])
config = env.ref('module.outbound_partner_config')
for partner in partners:
    config._make_outbound_http_request(partner, config.id)
```

#### Базова автоматизація
Тригер на події запису:
1. Створіть автоматизовану дію
2. Встановіть модель (наприклад, `res.partner`)
3. Виберіть тригер: При створенні, При оновленні, При видаленні
4. Додайте серверну дію для виклику API

## Потік вихідного запиту

```
Подія тригера → Вибір запису → Зіставлення полів → Конструювання HTTP запиту 
→ Виклик зовнішнього API → Обробка відповіді → Логування
```

## Приклади конфігурацій

### Приклад 1: Надсилання нових клієнтів до CRM
```python
Name: Синхронізація клієнтів з CRM
Request Type: Out
Model: res.partner
HTTP Method: POST
Request URL: https://crm.example.com/api/customers
Filter Domain: [('customer_rank', '>', 0)]
```

### Приклад 2: Оновлення інвентаря продуктів
```python
Name: Оновлення інвентаря
Request Type: Out
Model: product.product
HTTP Method: PUT
Request URL: https://inventory.system.com/api/products
Filter Domain: [('type', '=', 'product')]
```

### Приклад 3: Видалення скасованих замовлень
```python
Name: Видалення скасованих замовлень
Request Type: Out
Model: sale.order
HTTP Method: DELETE
Request URL: https://orders.api.com/remove
Filter Domain: [('state', '=', 'cancel')]
```

## Python скрипт для складних трансформацій

Використовуйте Python скрипти, коли простого зіставлення полів недостатньо:

```python
# Доступні змінні:
# env - Середовище Odoo
# model - Поточна модель
# records - Записи, що обробляються
# request_data - Дані, що надсилаються

# Приклад: Форматування номера телефону
phone = records.phone or ''
if phone.startswith('+'):
    result = phone
else:
    result = '+1' + phone.replace('-', '').replace(' ', '')

# Приклад: Обчислення загальної вартості
total = sum(records.mapped('amount_total'))
result = {'total_revenue': total, 'order_count': len(records)}

# Приклад: Додавання мітки часу
from datetime import datetime
result = {
    'data': request_data,
    'timestamp': datetime.now().isoformat(),
    'source': 'odoo'
}
```

## Пакетна обробка

Для великих наборів даних налаштуйте пакетну обробку:

```python
# Налаштування пагінації
Is Paginated: ✓
Page Size: 100
```

Це надсилає записи пакетами по 100 для оптимізації продуктивності.

## Обробка помилок

Модуль забезпечує автоматичну обробку помилок:

- **Автоматична повторна спроба**: Невдалі запити повторюються з експоненційною затримкою
- **Детальне логування**: Всі помилки записуються в `bj.api.log`
- **Граціозна деградація**: Часткові збої не блокують систему
- **Обробка кодів статусу**: Різна обробка на основі HTTP статусу

## Оптимізація продуктивності

1. **Використовуйте відповідні розміри пакетів** (50-200 записів)
2. **Застосовуйте ефективні доменні фільтри** для зменшення розміру набору даних
3. **Моніторте обмеження швидкості API** для уникнення дроселювання
4. **Кешуйте часто використовувані дані** коли можливо
5. **Використовуйте пул з'єднань** для синхронізації великих обсягів

## Тестування вашої конфігурації

1. **Створіть тестовий запис** у вашій моделі Odoo
2. **Вручну запустіть** синхронізацію
3. **Перевірте журнали** в BJ API > Журнали
4. **Переконайтеся, що зовнішня система** отримала дані
5. **Протестуйте сценарії помилок** (неправильний URL, недійсна автентифікація)

## Наступні кроки

- [Налаштування автоматизації](/docs/modules/api-sync/automation/base-automation)
- [Налаштування Python скриптів](/docs/modules/api-sync/python-scripts/data-transformation)
- [Моніторинг журналів API](/docs/modules/api-sync/troubleshooting)