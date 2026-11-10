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
- `github-validation-attempt1.md`, `github-actions-validation.md`, `github-actions-local/` — initial failure and successful local/Docker Actions validation with downloaded logs. The initial `main` attempt and its D1 authorization blocker are recorded in `github-actions-run-42864925787.md`.
- `github-actions-run-42864925787.md` — initial main deployment blocker, not a successful deployment.
- `github-actions-deployment.md`, `github-actions-main-validation/`, `github-actions-deployment/` — successful main run 42865935108 with actual lint, build, local/Docker smoke, deployment, remote HTTPS checks and sanitized monitoring metrics.
- public-health-check.txt — independent post-deployment HTTPS health request returned HTTP 200 with D1 connected.

Account identifiers, credentials and pre-existing resource names are omitted. The D1 database ID in the project's Wrangler configuration is the binding identifier required by Wrangler, not a credential.
