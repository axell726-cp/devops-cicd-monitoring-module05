# TaskFlow — Module 05: DevOps, CI/CD & Monitoring

An independent Module 05 delivery for the Codomax Digital Solutions internship. It reuses a copy of TaskFlow from Module 03, with a separate Cloudflare Worker and D1 database. It does not edit or replace Module 03 or any other project.

## Live delivery

- **Application:** [TaskFlow on workers.dev](https://devops-cicd-monitoring-module05.cloud-webapp-module03.workers.dev)
- **Repository:** https://github.com/axell726-cp/devops-cicd-monitoring-module05
- **GitHub Actions:** https://github.com/axell726-cp/devops-cicd-monitoring-module05/actions

The public HTTPS URL, D1 health endpoint and task CRUD flow were verified. The workflow validates on pushes and pull requests; after validation, only a push to `main` can deploy. GitHub Actions uses concurrency cancellation to prevent duplicate runs. The CI deployment uses a repository secret and variable; no credentials are stored in source.

## Delivery flow

```text
GitHub push / pull request
  -> npm ci, lint, Wrangler dry-run build
  -> local D1 migration and TaskFlow integration smoke tests
  -> Docker image build
  -> Compose health check and container smoke tests

Push to main after validation
  -> migrate the isolated remote D1 database
  -> deploy the existing Module 05 Worker with Wrangler
  -> HTTPS CRUD smoke test and sanitized Worker log/metric capture
```

Docker is a separate validation stage. Cloudflare Workers does not run the traditional Dockerfile; Wrangler deploys the Worker source after Docker passes.

## Architecture

- **Application:** TaskFlow static HTML/CSS/JavaScript plus a Cloudflare Worker REST API.
- **Data:** a new D1 database named `taskflow-module05`, bound as `DB`; migration file `migrations/0001_create_tasks.sql`.
- **Assets:** Worker static assets binding.
- **Hosting and network:** HTTPS on `workers.dev`, Cloudflare edge routing, `/api/*` endpoints.
- **Observability:** structured request logs, exception handling, Worker observability, and sanitized tail metrics. This does not create a VPC; Cloudflare edge networking is not a traditional VPC.
- **CI/CD:** GitHub Actions with Node.js 22, Wrangler and Docker Compose.

## Local run

Requirements: Node.js 22+, Docker Desktop and Docker Compose.

```powershell
npm ci
npm run lint
npm run build
npm run db:migrate:local
npm run dev -- --ip 127.0.0.1
```

In a second terminal, run `npm run test:smoke`. To run the Docker path instead:

```powershell
docker compose config --quiet
docker compose build
docker compose up -d --wait
$env:BASE_URL='http://127.0.0.1:8787'; npm run test:smoke
docker compose logs --tail 50 worker
docker compose down -v
```

If port `8787` is occupied, set `$env:HOST_PORT='8878'` before `docker compose up` and use `http://127.0.0.1:8878` for the smoke test. `docker compose down -v` removes only this project's local validation container, network and named volume.

## CI/CD setup

Add these repository settings before a `main` push:

- Actions secret `CLOUDFLARE_API_TOKEN`: a least-privilege token scoped to the existing Module 05 Worker for deployment and monitoring. Application database queries use the Worker D1 binding.
- Actions variable `CLOUDFLARE_ACCOUNT_ID`: the account ID; it is configuration, not a secret.

The `main` workflow runs validation and Docker first, then deploys the existing Worker, runs public HTTPS CRUD tests, and captures sanitized request logs and metrics. Pull requests validate but do not deploy. The initial D1 schema was migrated separately during provisioning; future schema migrations use `npm run db:migrate:remote` with an authenticated maintainer session before deployment. CI does not receive direct D1 API access; the running Worker accesses D1 through its binding.

## Monitoring and security

- JSON application logs include request ID, method, route, status and duration; they omit task content and client IP.
- `GET /api/health` checks D1 connectivity.
- The log sanitizer removes client IP, request headers, URL, geolocation and TLS fingerprints before evidence is uploaded.
- GitHub Actions run history and short-retention artifacts record each validation and deployment. Cloudflare Observability provides request, CPU and error metrics.
- Use only fictional task content in this public demo; do not enter personal data or secrets.
- Do not commit `.env`, `.dev.vars`, API tokens, key files or local Wrangler state.

## Verified results

Evidence files are listed in [evidence/README.md](evidence/README.md). On 2026-11-10:

- Static validation, Worker dry-run build, local migration and the 13-check local smoke test passed.
- Docker image build passed. The container became healthy, all 13 smoke checks passed over HTTP, JSON request logs were captured, and the project-scoped container, network, volume and temporary local image were removed.
- The isolated remote D1 database was created and its first migration applied successfully. The production Worker was initially bootstrapped with Wrangler. The GitHub repository secret `CLOUDFLARE_API_TOKEN` and variable `CLOUDFLARE_ACCOUNT_ID` are configured; this verified revision is being published to `main` to run the CI/CD deployment. The secret value is not stored in source or evidence.
- Wrangler deployed the distinct Worker. The public HTTPS smoke test passed all 13 checks; a live tail captured one health request with HTTP 200, 208 ms edge wall time and 2 ms CPU. The saved monitoring evidence is sanitized.
- Cloudflare dashboard preflight showed Workers Free active and no payment method. This run used Workers Free, D1 Free and public GitHub-hosted runners; no paid plan, domain, card, AWS, Azure, OCI or container registry was used. Expected spend is USD 0; this is not a final billing statement.
- GitHub Actions validation on `codex/module05-bootstrap` passed in run [42861600357](https://github.com/axell726-cp/devops-cicd-monitoring-module05/actions/runs/42861600357), including both local and Docker smoke suites. Its artifacts are saved under `evidence/github-actions-local/`. The deploy job was intentionally skipped on this non-main branch. The first run hit a port collision; the fix and successful rerun are documented in `evidence/github-validation-attempt1.md`.

## Git workflow

Create a focused branch such as `feature/health-check`, commit a small change, open a pull request to `main`, and merge after validation passes. Deployments run only from `main` after the same validation job succeeds.
