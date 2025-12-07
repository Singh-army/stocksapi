# Global Market Pulse

Monorepo with a PHP backend (auto-deployed on your hosting) and a Next.js frontend (deploy via Cloudflare Pages).

## Structure
- `index.php` & `.htaccess` — PHP backend entrypoint with `/api/hello` JSON endpoint and welcome page.
- `frontend/` — Next.js app that calls the backend API using `NEXT_PUBLIC_API_BASE_URL`.
- `PROJECT_RULES.md` — shared workflow and guardrails.

## Backend (PHP hosting)
- Push to git; hosting auto-pulls within ~10s and serves from repo root.
- Test locally with `php -S localhost:8000` (requires PHP 8+). API lives at `/api/hello`.
- Secrets/config should come from env or host settings; never commit credentials.

## Frontend (Cloudflare Pages)
- From `frontend/`, install deps: `npm install`.
- Build locally: `npm run build`; preview: `npm run dev`.
- Cloudflare Pages settings:
  - Framework: Next.js
  - Build command: `npm install && npm run build`
  - Deploy command: `echo "Deploy handled by Cloudflare Pages"`
  - Build output directory: leave empty (Pages handles Next output internally)
  - Root directory: `frontend`
  - Env var: `NEXT_PUBLIC_API_BASE_URL=https://globalmarketpulse.net`
- After linking repo, pushes trigger Cloudflare deploys; verify API calls hit the PHP backend domain.

## API Usage
- Base URL (backend): `https://globalmarketpulse.net`
- Health/demo endpoint: `GET /api/hello`

## Local quickstart
```
php -S localhost:8000
cd frontend && npm install && npm run dev
```
