# Main workflow run: 42864925787

[GitHub Actions run](https://github.com/axell726-cp/devops-cicd-monitoring-module05/actions/runs/42864925787)

This workflow-dispatch run targeted `main` after the main branch was created.

- The validation job passed lint, Worker build, local D1 migration, local smoke checks, Docker build, container smoke checks, and cleanup.
- The deploy job stopped at the remote D1 migration step. Cloudflare returned API error `7403` (service authorization failure); the secret value was masked in the Actions log.
- The Worker deployment and public smoke-test steps did not run in this attempt.
- The CI workflow was adjusted to keep D1 migration outside the narrowly scoped deployment token. The initial schema had already been applied during project provisioning; the Worker continues to access D1 through its binding.

This record documents the failed attempt and is not evidence of a successful deployment.