# GitHub validation attempt 1 — 2026-11-10

Run: https://github.com/axell726-cp/devops-cicd-monitoring-module05/actions/runs/42861163543

GitHub Actions passed dependency installation, lint, Wrangler dry-run build, local D1 migration, local integration smoke tests, Compose validation and Docker image build. The Docker runtime step then failed because its host port 8787 was still occupied by the Wrangler child process from the preceding step. The job's scoped Compose cleanup completed. The workflow now starts Wrangler directly so the trap can stop it, maps Docker to 8878, and includes hidden `.wrangler` files in the artifact upload.
