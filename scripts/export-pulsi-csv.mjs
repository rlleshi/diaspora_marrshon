// Writes the published Pulsi series to crowd-analysis/data/protest_days.csv.
// Run after every change to data/participation.ts:  node scripts/export-pulsi-csv.mjs
//
// Node 20 can't import .ts files, so the two sources are transpiled in memory with
// the project's own TypeScript and loaded from a temporary directory. Neither file
// has a runtime import, which keeps this to two self-contained modules.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const root = new URL("..", import.meta.url);
const out = new URL("crowd-analysis/data/protest_days.csv", root);
const dir = mkdtempSync(join(tmpdir(), "pulsi-csv-"));

async function load(relative) {
  const source = readFileSync(new URL(relative, root), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  const file = join(dir, relative.replace(/[/.]/g, "_") + ".mjs");
  writeFileSync(file, outputText);
  return import(pathToFileURL(file).href);
}

try {
  const { participation } = await load("data/participation.ts");
  const { pulsiCsv } = await load("lib/pulsi-csv.ts");
  writeFileSync(out, pulsiCsv(participation));
  const last = participation[participation.length - 1];
  console.log(`Wrote ${participation.length} days through ${last.date} to crowd-analysis/data/protest_days.csv`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
