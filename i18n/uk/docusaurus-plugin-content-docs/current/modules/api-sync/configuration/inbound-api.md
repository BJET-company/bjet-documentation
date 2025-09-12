---
sidebar_position: 2
title: Налаштування вхідного API
---

# Налаштування вхідного API

Налаштуйте Odoo для отримання даних з зовнішніх систем через RESTful API кінцеві точки.

## Покрокове налаштування

### Крок 1: Доступ до налаштувань

Перейдіть до **Налаштування > Технічні > BJ API > Конфігурації API** у вашому інтерфейсі Odoo.

![API Settings Menu](/img/api-sync/api-settings-menu.png)
*Меню конфігурацій API в технічних налаштуваннях*

### Крок 2: Створення нової конфігурації

Натисніть кнопку **Створити**, щоб розпочати нову конфігурацію синхронізації API.

![API Configuration Form](/img/api-sync/api-configuration-form.png)
*Форма нової конфігурації API*

### Крок 3: Встановлення типу запиту

Виберіть **Тип запиту** як **"In"** для вхідної синхронізації даних.

![Inbound Configuration](/img/api-sync/inbound-configuration.png)
*Виберіть "In" для вхідної синхронізації даних*

### Крок 4: Налаштування основних параметрів

#### Загальні налаштування

![Model Settings](/img/api-sync/model-settings.png)
*Налаштування моделі та фільтрів*

- **Назва**: Введіть описову назву (наприклад, "API імпорту партнерів")
- **Модель**: Виберіть цільову модель Odoo (наприклад, `res.partner`, `product.product`)
- **Домен фільтра**: Додайте умови для фільтрації записів (необов'язково)

![Filter Domain Configuration](/img/api-sync/filter-domain-config.png)
*Налаштування доменних фільтрів для вибору записів*

  ```python
  [('active', '=', True)]
  ```

#### Налаштування кінцевої точки

![Endpoint Configuration](/img/api-sync/endpoint-config.png)
*Налаштування ідентифікатора кінцевої точки API*

- **Кінцева точка**: Визначте унікальний ідентифікатор для вашої кінцевої точки (наприклад, "partners")
- Це створює шлях API: `/bj_api_sync/v1/partners`

#### HTTP методи

![HTTP Methods Configuration](/img/api-sync/http-methods-config.png)
*Виберіть дозволені HTTP операції*

Виберіть дозволені операції:
- **GET**: Отримання записів
- **POST**: Створення нових записів
- **PUT**: Оновлення існуючих записів
- **DELETE**: Видалення записів

### Крок 5: Налаштування автентифікації

Виберіть ваш метод автентифікації:

#### Без автентифікації
Підходить для внутрішніх або публічних API без вимог безпеки.

#### Базова автентифікація
Вимагає ім'я користувача та пароль:

![Basic Authentication](/img/api-sync/basic-auth-config.png)
*Налаштування базової автентифікації*

- **Логін**: Ім'я користувача API
- **Пароль**: Пароль API

#### Bearer токен
Використовує автентифікацію з API ключем:

![Bearer Token Authentication](/img/api-sync/bearer-token-config.png)
*Налаштування Bearer токена*

- **Bearer токен**: Ваш API ключ або токен доступу

Приклад заголовка:
```
Authorization: Bearer your_token_here
```

### Крок 6: Налаштування зіставлення полів

Створіть рядки конфігурації для зіставлення полів Odoo з ключами API:

![Field Mapping Configuration](/img/api-sync/field-mapping.png)
*Налаштування зіставлення полів між Odoo та зовнішнім API*

| Поле Odoo | Ключ зовнішнього API | Ідентифікатор запису | Тип значення |
|-----------|---------------------|---------------------|--------------|
| name | name | ❌ | Звичайний |
| email | email_address | ❌ | Звичайний |
| ref | customer_id | ✅ | Звичайний |
| phone | contact_phone | ❌ | Звичайний |

![Configuration Lines Detail](/img/api-sync/configuration-lines-detail.png)
*Детальний вигляд рядків конфігурації з усіма опціями*

**Важливо**: Рівно одне поле має бути позначене як Ідентифікатор запису.

### Крок 7: Налаштування пагінації (необов'язково)

Для великих наборів даних:

![Pagination Settings](/img/api-sync/pagination-settings.png)
*Налаштування пагінації для великих наборів даних*

- **Пагінація**: Увімкнути пагінацію
- **Розмір сторінки**: Записів на запит (за замовчуванням: 100)

## Шаблони кінцевих точок API

Після налаштування ваша кінцева точка буде доступна за адресою:

```
Базовий шаблон:
/bj_api_sync/v1/<назва_кінцевої_точки>
/bj_api_sync/v1/<назва_кінцевої_точки>/<id_запису>
```

### Приклади запитів

#### GET запит - Отримання всіх записів
```bash
curl -X GET "http://localhost:8069/bj_api_sync/v1/partners" \
  -H "Authorization: Bearer your_token_here"
```

#### GET запит - Отримання одного запису
```bash
curl -X GET "http://localhost:8069/bj_api_sync/v1/partners/123" \
  -H "Authorization: Bearer your_token_here"
```

#### POST запит - Створення нового запису
```bash
curl -X POST "http://localhost:8069/bj_api_sync/v1/partners" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token_here" \
  -d '{
    "name": "Test Partner",
    "email": "test@example.com",
    "phone": "+1234567890"
  }'
```

#### PUT запит - Оновлення запису
```bash
curl -X PUT "http://localhost:8069/bj_api_sync/v1/partners/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token_here" \
  -d '{
    "name": "Updated Partner Name",
    "email": "updated@example.com"
  }'
```

#### DELETE запит - Видалення запису
```bash
curl -X DELETE "http://localhost:8069/bj_api_sync/v1/partners/123" \
  -H "Authorization: Bearer your_token_here"
```

## Конвеєр обробки

Вхідний запит проходить такий потік:

```
HTTP запит → Автентифікація → Перевірка методу → Пошук конфігурації 
→ Трансформація даних → Обробка запису → Генерація відповіді → Логування
```

## Формати відповідей

### Успішна відповідь
```json
{
  "status": "success",
  "data": {
    "id": 123,
    "name": "Test Partner",
    "email": "test@example.com"
  }
}
```

### Відповідь з помилкою
```json
{
  "status": "error",
  "message": "Authentication failed",
  "code": 401
}
```

## Загальні коди помилок

| Код | Опис | Рішення |
|-----|------|---------|
| 401 | Неавторизовано | Перевірте облікові дані автентифікації |
| 404 | Не знайдено | Перевірте конфігурацію кінцевої точки |
| 405 | Метод не дозволено | Увімкніть HTTP метод у конфігурації |
| 400 | Поганий запит | Перевірте формат JSON даних |
| 500 | Внутрішня помилка сервера | Перевірте журнали сервера для деталей |

## Найкращі практики

1. **Використовуйте HTTPS** у продуктивних середовищах
2. **Впровадьте обмеження швидкості** для запобігання зловживанням
3. **Перевіряйте вхідні дані** за допомогою Python скриптів
4. **Логуйте всі запити** для аудиторського сліду
5. **Ретельно тестуйте** перед розгортанням у продакшені

## Наступні кроки

- [Налаштування заголовків та параметрів](/docs/modules/api-sync/configuration/headers-parameters)
- [Налаштування зіставлення полів](/docs/modules/api-sync/configuration/field-mapping)
- [Додавання Python трансформацій](/docs/modules/api-sync/python-scripts/data-transformation)