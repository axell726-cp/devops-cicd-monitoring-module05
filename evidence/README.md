# Evidence index

Evidence is genuine output from the local Module 05 Worker, Docker Desktop, Wrangler and Cloudflare. The log summary removes client IP, request headers, geolocation, TLS details and task content.

- `free-tier-preflight.md` — Cloudflare Workers Free/D1 Free and public GitHub runner checks, with official limit references.
- `local-build.txt`, `local-d1-migration.txt`, `local-smoke.txt` — local Worker bundle, D1 migration and 13 HTTP/integration checks.
- `local-observability.json` — spans emitted by the local Worker during those requests.
- `docker-build-retry.txt`, `docker-runtime.txt`, `docker-validation.txt` — actual Docker builds and runtime attempts, including the fixes, final healthy container, smoke checks, logs and cleanup.
- `d1-create.txt`, `d1-remote-migration.txt` — creation and migration of the isolated Module 05 D1 database.
- `cloudflare-bootstrap-deploy.txt`, `worker-url.txt` — first deployment of the new Worker using the already-authenticated Wrangler session.
- `cloudflare-public-smoke.txt`, `cloudflare-live-health.txt` — public HTTPS response and CRUD/API smoke tests.
- `cloudflare-live-monitoring.json` — sanitized live Worker invocation metrics and structured `/api/health` log.
- `github-validation-attempt1.md`, `github-actions-validation.md`, `github-actions-local/` — failed first run and the successful Actions validation run with downloaded local/Docker logs. The deploy job was skipped because validation ran on a non-main branch.

Account identifiers, credentials and pre-existing resource names are omitted. The D1 database ID in the project's Wrangler configuration is the binding identifier required by Wrangler, not a credential.
