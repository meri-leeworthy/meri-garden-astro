/**
 * Prebuild: fetch PDS records, then process markdown.
 * Falls back to local cache, then to generating from markdown files.
 * In the markdown fallback, also converts to Leaflet blocks.
 */

import { fetchDocuments, writeCache, readCache, type PdsDocument } from "./pds";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

function generateFromMarkdown(): PdsDocument[] {
  const postsDir = path.join(process.cwd(), "src", "posts");
  if (!fs.existsSync(postsDir)) return [];

  const docs: PdsDocument[] = [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const titleMatch = content.match(/^---\n[\s\S]*?\ntitle: '([^']+)'/);
    const dateMatch = content.match(/^---\n[\s\S]*?\ndate: '([^']+)'/);
    const descMatch = content.match(/^---\n[\s\S]*?\ndescription: '([^']+)'/);
    const slug = path.basename(file, ".md")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    docs.push({
      uri: `at://did:plc:mmyj7mk7kh3jqhw6zs4prbuk/site.standard.document/local-${slug}`,
      rkey: `local-${slug}`,
      title: titleMatch?.[1] ?? path.basename(file, ".md"),
      slug: `posts/${slug}`,
      publishedAt: dateMatch?.[1] ?? "",
      description: descMatch?.[1],
      textContent: content.replace(/^---\n[\s\S]*?\n---\n\n/, ""),
    });
  }

  return docs;
}

async function main() {
  let docs: PdsDocument[];

  // Try PDS first
  try {
    console.log("Fetching PDS records...");
    docs = await fetchDocuments();
    writeCache(docs);
    console.log(`Fetched ${docs.length} documents from PDS`);
  } catch {
    // Fall back to local cache
    docs = readCache();
    if (docs.length > 0) {
      console.log(`Loaded ${docs.length} documents from cache`);
    } else {
      // Last resort: generate from markdown files
      docs = generateFromMarkdown();
      if (docs.length > 0) {
        writeCache(docs);
        console.log(`Generated ${docs.length} documents from markdown files`);
      } else {
        console.warn("No PDS, cache, or markdown files found");
      }
    }
  }

  // Run markdown processing
  execSync("tsx lib/process-md.ts", { stdio: "inherit" });
}

main().catch((err) => {
  console.error("Prebuild failed:", err);
  process.exit(1);
});
