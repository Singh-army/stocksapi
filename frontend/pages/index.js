import { useEffect, useState } from 'react';
import Head from 'next/head';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://globalmarketpulse.net';

export default function Home() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/webapp/config`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch config');
        return res.json();
      })
      .then((payload) => {
        if (payload.data) {
          setConfig(payload.data);
        } else {
          throw new Error('Invalid config format');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><main className="card"><p>Loading configuration...</p></main></div>;
  if (error) return <div className="page"><main className="card"><p className="error">Error loading site: {error}</p></main></div>;
  if (!config) return null;

  const { meta, home } = config;

  return (
    <div className="page">
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>

      <main className="card">
        <div className="badge">Frontend · Config Driven</div>
        <h1>{home.hero.title}</h1>
        <p>{home.hero.subtitle}</p>

        <div className="features">
          {home.features && home.features.map((feature, idx) => (
            <div key={idx} className="feature-item">
              <strong>{feature.title}</strong>
            </div>
          ))}
        </div>

        <div className="actions">
          <a href={home.hero.ctaLink} className="button">
            {home.hero.ctaText}
          </a>
          <a href={`${API_BASE}/api/webapp/config`} target="_blank" rel="noreferrer" className="secondary">
            View Raw Config
          </a>
        </div>
      </main>

      <style jsx>{`
        .features {
            display: flex;
            gap: 1rem;
            margin: 2rem 0;
            flex-wrap: wrap;
        }
        .feature-item {
            background: #f1f5f9;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
