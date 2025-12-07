## Workflow
- Work locally with secrets in env files only; commit sample envs, never real credentials.
- Manage PHP deps with `composer install`/`composer update`; commit `composer.json` and `composer.lock`.
- Run lint/tests before push (e.g., `php -l`, `composer test` or project suite).
- Push to git to deploy (host auto-pulls within ~10s); verify at `https://globalmarketpulse.net/`.
- Use SSH only for major server tasks (logs, manual SQL, on-server composer); do not rely on SSH for deploys.
- Apply DB changes via versioned migrations/SQL scripts stored in repo; avoid ad-hoc schema edits.
- Keep API contracts documented and versioned; review security/performance/error handling before merge.

## Project Rules
- PHP: target 8+; `declare(strict_types=1);` where possible; PSR-12 formatting; use namespaces.
- Security: prepared statements/ORM only; validate & sanitize inputs; escape outputs; keep secrets in env vars, not git.
- Errors: no raw `echo` of errors—return structured JSON with proper HTTP codes; centralize logging without sensitive data.
- Database: host `srv1422.hstgr.io` (or `193.203.168.79`), DB `u649968175_global`, user `u649968175_datanow`; configure via env, never hardcode.
- API: consistent JSON envelope (e.g., `{ data, error, meta }`), stable status codes, pagination for lists, explicit CORS rules; document breaking changes.
- Dependencies: pin versions, audit regularly, remove unused packages; avoid risky extensions.
- Observability: add request/DB timing metrics and trace IDs where practical; keep logs lightweight.
- Performance: avoid N+1 queries, cache hot reads when safe, paginate large datasets.
- Deploy discipline: no force-push to main; use branches + PRs; main stays releasable; back up DB before destructive migrations and store rollback scripts alongside.
- Access: store SSH/MySQL creds securely; rotate on suspicion; never place creds in issues/PRs/docs in git.
