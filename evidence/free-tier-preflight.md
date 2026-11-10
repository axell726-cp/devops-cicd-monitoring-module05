# Cloud and runner preflight (2026-11-10, America/Lima)

- Wrangler `whoami` succeeded with the existing operator OAuth session. Credentials were not read, copied, or added to the repository.
- Cloudflare account billing page showed **Workers Free — Active** and **No payment method on file**. No upgrade or billing change was made.
- `wrangler d1 list` returned one pre-existing database; its identifying name and ID are omitted from this evidence. The Free account limit is 10 D1 databases, so a second isolated Module 05 database fits the documented count quota.
- The Cloudflare dashboard showed a payment-method action (`Add`), not a stored payment method. The preflight did not activate billing or add a card.
- Cloudflare Workers Free documented limits: 100,000 requests/day and 10 ms CPU per request.
- D1 Free documented limits: 10 databases, 5 GB total storage, 5 million rows read/day and 100,000 rows written/day. The deployment's migration and smoke test are intentionally small.
- GitHub Actions use standard hosted runners on a public repository; GitHub documents this usage as free. No container registry is needed.

This verifies plan eligibility, not a final billing statement. No paid plan, card, domain, AWS, Azure, OCI, or paid runner was used.

Official sources:
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/d1/platform/limits/
- https://developers.cloudflare.com/d1/platform/pricing/
- https://docs.github.com/en/billing/concepts/product-billing/github-actions

## Deployment result
- A second, isolated D1 database (`taskflow-module05`) was created and migrated; one pre-existing database was left untouched.
- A separate Worker was deployed on the existing workers.dev zone; Module 03 Worker and database were not changed.
- Live test volume was one full 13-check CRUD/API smoke run plus one health request for log sampling; no paid service or billing change was made.
