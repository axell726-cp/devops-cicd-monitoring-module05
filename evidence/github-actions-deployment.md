# Successful main CI/CD deployment

[GitHub Actions run 42865935108](https://github.com/axell726-cp/devops-cicd-monitoring-module05/actions/runs/42865935108)

- Commit: `c8e6195d7415d14ae9ace47454d5b09e93738856`.
- The validation job passed lint, Worker dry-run build, local D1 migration, local HTTP smoke checks, Docker build, container smoke checks, and container cleanup.
- The deployment job published the existing Worker at https://devops-cicd-monitoring-module05.cloud-webapp-module03.workers.dev.
- The external HTTPS smoke test passed all 13 checks: health/D1 connection, static page, validation and abuse cases, task create/read/complete/filter/stats/delete, and missing-task handling.
- Wrangler tail captured 13 invocations: 13 successful, 0 error invocations, 0 HTTP 5xx, average wall time 41.77 ms, average CPU 1.62 ms, and average application duration 39.23 ms. Expected validation responses include 400, 403, 404 and 413.
- Downloaded deployment logs and sanitized metrics are preserved beside this report. They contain no API token, client IP, request headers, or task content.

The CI token deploys the existing Worker and captures monitoring data. D1 schema migrations remain an authenticated maintainer operation; the deployed Worker accesses D1 through its binding. Expected cloud cost remains USD 0 under the verified Free plan; this is not a final billing statement.