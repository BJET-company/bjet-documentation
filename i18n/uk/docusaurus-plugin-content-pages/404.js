import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound() {
  return (
    <Layout
      title="Сторінку не знайдено"
      description="Сторінку, яку ви шукаєте, не вдалося знайти.">
      <main>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: '8rem',
            margin: '0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            404
          </h1>
          <h2 style={{
            fontSize: '2rem',
            marginTop: '1rem',
            marginBottom: '2rem',
          }}>
            Сторінку не знайдено
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '2rem',
            maxWidth: '600px',
          }}>
            Ми не змогли знайти сторінку, яку ви шукаєте. Можливо, сторінку було переміщено, видалено або URL-адреса може бути неправильною.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <Link
              className="button button--primary button--lg"
              to="/">
              Перейти на головну
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/modules/api-sync">
              Переглянути документацію API
            </Link>
          </div>
          <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            background: '#f6f8fa',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '100%',
          }}>
            <h3 style={{ marginTop: 0 }}>Корисні посилання</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              textAlign: 'left',
            }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/docs/">📚 Вся документація</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/docs/modules/api-sync/quick-start">🚀 Швидкий старт</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/docs/modules/api-sync/troubleshooting">🔧 Виправлення неполадок</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/docs/downloads/postman">📮 Колекція Postman</Link>
              </li>
            </ul>
          </div>
          <div style={{
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: '#999',
          }}>
            <p>
              Потрібна допомога? Зв'яжіться з нами за адресою{' '}
              <a href="mailto:support@bjetpro.com">support@bjetpro.com</a>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}