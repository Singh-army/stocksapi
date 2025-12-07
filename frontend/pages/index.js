import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://globalmarketpulse.net';

export default function Home() {
  const [apiStatus, setApiStatus] = useState('Loading...');
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/hello`, { signal: controller.signal })
      .then(async (res) => {
        const data = await res.json();
        setApiData(data);
        setApiStatus(`Connected to backend at ${API_BASE}`);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setApiStatus(`Unable to reach backend at ${API_BASE}`);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="page">
      <main className="card">
        <div className="badge">Frontend · Cloudflare</div>
        <h1>Welcome to Global Market Pulse</h1>
        <p>
          This Next.js frontend is ready to fetch data from the PHP backend deployed at
          <code className="code">{API_BASE}</code>.
        </p>
        <p className="muted">{apiStatus}</p>
        {apiData && (
          <pre className="payload" aria-label="API payload">
            {JSON.stringify(apiData, null, 2)}
          </pre>
        )}
        <div className="actions">
          <a href={`${API_BASE}/api/hello`} target="_blank" rel="noreferrer" className="button">
            Open backend /api/hello
          </a>
          <a href="https://developers.cloudflare.com/pages" target="_blank" rel="noreferrer" className="secondary">
            View Cloudflare Pages guide
          </a>
        </div>
      </main>
    </div>
  );
}
