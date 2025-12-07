<?php
declare(strict_types=1);

// Basic front controller to serve a welcome page and a simple JSON API.
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

if (str_starts_with($uri, '/api/hello')) {
    header('Content-Type: application/json');
    echo json_encode([
        'message' => 'Welcome to the Global Market Pulse backend API.',
        'timestamp' => gmdate('c'),
        'status' => 'ok',
    ]);
    exit;
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Global Market Pulse</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        :root {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #0f172a;
            background: #f8fafc;
        }
        body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: radial-gradient(circle at 20% 20%, #e0f2fe 0, transparent 35%),
                        radial-gradient(circle at 80% 10%, #c7d2fe 0, transparent 30%),
                        #f8fafc;
        }
        .card {
            max-width: 640px;
            padding: 2.5rem;
            border-radius: 20px;
            background: #ffffff;
            box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
            border: 1px solid #e2e8f0;
        }
        h1 { margin-top: 0; font-size: 2rem; }
        p { line-height: 1.6; }
        code {
            background: #0f172a;
            color: #e2e8f0;
            padding: 0.2rem 0.4rem;
            border-radius: 6px;
        }
        .actions { margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap; }
        a.button {
            text-decoration: none;
            background: #2563eb;
            color: #fff;
            padding: 0.65rem 1.1rem;
            border-radius: 10px;
            font-weight: 600;
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
        }
        .muted { color: #475569; font-size: 0.95rem; }
        @media (max-width: 640px) {
            .card { margin: 1rem; padding: 1.5rem; }
            h1 { font-size: 1.7rem; }
        }
    </style>
</head>
<body>
    <main class="card">
        <h1>Global Market Pulse backend</h1>
        <p class="muted">PHP API entrypoint is live. Frontend calls can point at <code><?= htmlspecialchars($_SERVER['HTTP_HOST'] ?? 'globalmarketpulse.net') ?></code>.</p>
        <p>Test the API endpoint:</p>
        <div class="actions">
            <a class="button" href="/api/hello">View <code>/api/hello</code></a>
        </div>
        <p class="muted">Deploy: push to git and wait ~10s for the PHP host to auto-pull.</p>
    </main>
</body>
</html>
