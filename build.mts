// One-shot brand pipeline: generate SVGs (outlining the wordmark), then
// rasterize PNG/ICO derivatives. Usage: node build.mts
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

for (const script of ["gen.ts", "rasterize.ts"]) {
  const p = fileURLToPath(new URL(script, import.meta.url));
  const r = spawnSync(process.execPath, [p, "."], {
    stdio: "inherit",
    cwd: fileURLToPath(new URL(".", import.meta.url)),
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log("brand pipeline complete");
