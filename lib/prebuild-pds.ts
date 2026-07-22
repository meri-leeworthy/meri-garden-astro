/**
 * Prebuild script: fetch site.standard.document records from the PDS
 * and cache them locally for use during the Astro build.
 *
 * Run via: tsx lib/prebuild-pds.ts
 */

import { fetchDocuments, writeCache } from "./pds";

async function main() {
  console.log("Fetching PDS records...");
  const docs = await fetchDocuments();
  writeCache(docs);
  console.log(`Cached ${docs.length} documents to .pds-cache/documents.json`);
}

main().catch((err) => {
  console.error("PDS prebuild failed:", err);
  process.exit(1);
});
