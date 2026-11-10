import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

for (const file of ["src/worker.js", "scripts/smoke.mjs", "scripts/sanitize-worker-tail.mjs", "public/app.js"]) {
  const result = spawnSync(process.execPath, ["--check", file], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`PASS syntax ${file}`);
}
JSON.parse(readFileSync("wrangler.jsonc", "utf8"));
JSON.parse(readFileSync("package.json", "utf8"));
console.log("PASS JSON configuration");
