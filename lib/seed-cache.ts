/**
 * Seed the PDS cache from the local pds-records/converted/ files.
 * This lets us develop and test without hitting the PDS.
 */

import fs from "fs";
import path from "path";
import { writeCache, type PdsDocument } from "./pds";

const convertedDir = path.join(process.cwd(), "pds-records", "converted");
const originalsDir = path.join(process.cwd(), "pds-records", "originals");

function loadDir(dir: string): PdsDocument[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
      const rkey = f.split("_")[0];
      const pathVal = raw.path as string | undefined;
      const isBareRkey = pathVal ? /^\/[a-z0-9]+$/.test(pathVal) : false;
      const slug = pathVal && !isBareRkey
        ? pathVal.replace(/^\//, "")
        : (raw.title as string ?? "Untitled")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .replace(/^[0-9]+-/, "");

      return {
        uri: `at://did:plc:mmyj7mk7kh3jqhw6zs4prbuk/site.standard.document/${rkey}`,
        rkey,
        title: raw.title ?? "Untitled",
        slug,
        publishedAt: raw.publishedAt ?? "",
        description: raw.description,
        tags: raw.tags,
        coverImage: raw.coverImage,
        bskyPostRef: raw.bskyPostRef,
        content: raw.content,
        textContent: raw.textContent,
      } satisfies PdsDocument;
    });
}

// Prefer converted (has Leaflet content), fall back to originals
const docs = loadDir(convertedDir);
const originals = loadDir(originalsDir);

// Merge: converted overrides originals, but keep any records only in originals
const seen = new Set(docs.map((d) => d.rkey));
for (const orig of originals) {
  if (!seen.has(orig.rkey)) {
    docs.push(orig);
  }
}

writeCache(docs);
console.log(`Seeded ${docs.length} documents to .pds-cache/documents.json`);
