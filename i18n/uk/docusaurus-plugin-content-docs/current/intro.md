---
sidebar_position: 1
title: Ласкаво просимо
slug: /
---

# Документація модулів BJET Odoo

Ласкаво просимо до всебічного центру документації для модулів Odoo від BJET. Ця база знань надає детальні посібники, довідники API та інструкції з конфігурації для всіх модулів BJET Odoo.

## Доступні модулі

import Link from '@docusaurus/Link';

<div className="row margin-bottom--lg">
  <div className="col col--4">
    <div className="card shadow--md">
      <div className="card__header">
        <h3>📦 API Синхронізація</h3>
      </div>
      <div className="card__body">
        <p><strong>Версія:</strong> 18.0.1.0.8</p>
        <p>Синхронізуйте моделі Odoo з зовнішніми API через RESTful інтерфейси.</p>
        <ul style={{fontSize: '0.9em'}}>
          <li>Двонаправлена синхронізація</li>
          <li>Кілька методів авторизації</li>
          <li>Python перетворення</li>
        </ul>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to="/docs/modules/api-sync">
          Переглянути документацію
        </Link>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card shadow--md">
      <div className="card__header">
        <h3>📝 Конструктор Друкованих Форм</h3>
      </div>
      <div className="card__body">
        <p><strong>Версія:</strong> Незабаром</p>
        <p>Створюйте та налаштовуйте професійні друковані форми для ваших звітів Odoo.</p>
        <ul style={{fontSize: '0.9em'}}>
          <li>Користувацькі шаблони</li>
          <li>Конструктор перетягування</li>
          <li>Професійні макети</li>
        </ul>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to="/docs/modules/print-form-builder">
          Переглянути документацію
        </Link>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card shadow--md">
      <div className="card__header">
        <h3>💱 Курси валют НБУ</h3>
      </div>
      <div className="card__body">
        <p><strong>Версія:</strong> 18.0.1.0.2</p>
        <p>Автоматичний та ручний імпорт курсів валют з Національного банку України.</p>
        <ul style={{fontSize: '0.9em'}}>
          <li>Автоматичне оновлення курсів</li>
          <li>Ручний імпорт за період</li>
          <li>Налаштування планувальника</li>
        </ul>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to="/docs/modules/import-nbu-exchange-rate">
          Переглянути документацію
        </Link>
      </div>
    </div>
  </div>
</div>

<div className="row margin-bottom--lg">
  <div className="col col--4">
    <div className="card shadow--md">
      <div className="card__header">
        <h3>🏦 Монобанк: імпорт банківських виписок</h3>
      </div>
      <div className="card__body">
        <p><strong>Версія:</strong> 18.0.1.0.1</p>
        <p>Пряма інтеграція між Monobank та Odoo для автоматичного імпорту банківських виписок.</p>
        <ul style={{fontSize: '0.9em'}}>
          <li>Автоматичний імпорт виписок</li>
          <li>Ручний імпорт за період</li>
          <li>Запобігання дублюванню транзакцій</li>
        </ul>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to="/docs/modules/monobank-statement-import">
          Переглянути документацію
        </Link>
      </div>
    </div>
  </div>

  <div className="col col--4">
    <div className="card shadow--md">
      <div className="card__header">
        <h3>🏦 ПриватБанк24 бізнес: імпорт банківських виписок</h3>
      </div>
      <div className="card__body">
        <p><strong>Версія:</strong> 18.0.1.0.5</p>
        <p>Імпорт банківських виписок з ПриватБанку</p>
        <ul style={{fontSize: '0.9em'}}>
          <li>Автоматичний імпорт виписок</li>
          <li>Ручний імпорт за період</li>
          <li>Запобігання дублюванню транзакцій</li>
        </ul>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to="/docs/modules/privatbank-autoclient-statement-import">
          Переглянути документацію
        </Link>
      </div>
    </div>
  </div>

  <div className="col col--4">
    <div className="card shadow--md">
      <div className="card__header">
        <h3>🔄 Аналоги компонентів виробництва з пріоритетами</h3>
      </div>
      <div className="card__body">
        <p><strong>Версія:</strong> 18.0.1.0.6</p>
        <p>Автоматична заміна дефіцитних компонентів на аналоги з урахуванням пріоритету.</p>
        <ul style={{fontSize: '0.9em'}}>
          <li>Заміна за пріоритетами</li>
          <li>Коефіцієнт заміни</li>
          <li>Часткова заміна з кількох замінників</li>
        </ul>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to="/docs/modules/mrp-substitution">
          Переглянути документацію
        </Link>
      </div>
    </div>
  </div>
</div>

## Швидкі посилання

- 📚 [Посібник з конфігурації API Sync](/docs/modules/api-sync/configuration/overview)
- 🔧 [Довідник Python-скриптів](/docs/modules/api-sync/python-scripts/context-variables)
- 📮 [Завантажити колекцію Postman](/postman)
- ❓ [Посібник з усунення несправностей](/docs/modules/api-sync/troubleshooting)

## Підтримка та ресурси

### Професійна підтримка
- **Веб-сайт:** [https://bjetpro.com/](https://bjetpro.com/)
- **Електронна пошта:** [support@bjetpro.com](mailto:support@bjetpro.com)
- **Комерційна підтримка:** Доступна для корпоративних впроваджень

### Сумісність модулів
Усі модулі призначені для **Odoo 18.0** і відповідають стандартам якості BJET для корпоративного впровадження.

## Як користуватися цією документацією

1. **Виберіть модуль** - Оберіть модуль Odoo, про який ви хочете дізнатися
2. **Дотримуйтеся посібників** - Кожний модуль має покрокові посібники з конфігурації
3. **Звертайтеся до API** - Використовуйте документацію API для інтеграції
4. **Завантажуйте інструменти** - Отримуйте колекції Postman та інші ресурси
5. **Отримуйте підтримку** - Зв'яжіться з BJET для професійної допомоги

---

*Ця документація постійно оновлюється в міру випуску нових модулів і функцій.*