/**
 * Fetch all site.standard.document records from PDS, save originals,
 * convert textContent records to Leaflet format, save converted versions.
 * 
 * All saved as JSON files in /workspace/pds-records/ for inspection.
 * Originals can be restored from the originals/ subdirectory.
 */

import { markdownToLeaflet } from './lib/md-to-leaflet.mjs';
import fs from 'fs';
import path from 'path';

const PDS = 'https://shimeji.us-east.host.bsky.network';
const DID = 'did:plc:mmyj7mk7kh3jqhw6zs4prbuk';

async function getRecord(collection, rkey) {
  const url = new URL(`/xrpc/com.atproto.repo.getRecord`, PDS);
  url.searchParams.set('repo', DID);
  url.searchParams.set('collection', collection);
  url.searchParams.set('rkey', rkey);
  const resp = await fetch(url.toString());
  return await resp.json();
}

async function listCollection(collection) {
  let cursor;
  const records = [];
  do {
    const url = new URL(`/xrpc/com.atproto.repo.listRecords`, PDS);
    url.searchParams.set('repo', DID);
    url.searchParams.set('collection', collection);
    url.searchParams.set('limit', '100');
    if (cursor) url.searchParams.set('cursor', cursor);
    const resp = await fetch(url.toString());
    const data = await resp.json();
    records.push(...data.records);
    cursor = data.cursor;
  } while (cursor);
  return records;
}

function safeFilename(title, rkey) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
  return `${rkey}_${slug}.json`;
}

async function main() {
  const baseDir = path.join(process.cwd(), 'pds-records');
  const originalsDir = path.join(baseDir, 'originals');
  const convertedDir = path.join(baseDir, 'converted');
  
  fs.mkdirSync(originalsDir, { recursive: true });
  fs.mkdirSync(convertedDir, { recursive: true });

  // Fetch all records
  const docs = await listCollection('site.standard.document');
  console.log(`Fetched ${docs.length} site.standard.document records\n`);

  const results = { total: docs.length, converted: 0, alreadyLeaflet: 0 };

  for (const record of docs) {
    const uri = record.uri;
    const rkey = uri.split('/').pop();
    const val = record.value;
    const title = val.title || 'untitled';
    const fname = safeFilename(title, rkey);

    // Save original
    const originalPath = path.join(originalsDir, fname);
    fs.writeFileSync(originalPath, JSON.stringify(val, null, 2));
    console.log(`  ✓ Saved original: ${fname}`);

    // Check if it has textContent (needs conversion)
    const hasTextContent = val.textContent && val.textContent.length > 0;
    const isAlreadyLeaflet = val.content && val.content.$type === 'pub.leaflet.content';

    if (hasTextContent && !isAlreadyLeaflet) {
      // Convert to Leaflet format
      const content = markdownToLeaflet(val.textContent);
      
      const converted = {
        ...val,
        content,
        textContent: undefined,
      };

      const convertedPath = path.join(convertedDir, fname);
      fs.writeFileSync(convertedPath, JSON.stringify(converted, null, 2));
      console.log(`  ✓ Saved converted: ${fname}`);
      results.converted++;
    } else if (isAlreadyLeaflet) {
      console.log(`  - Already Leaflet format, skipped`);
      results.alreadyLeaflet++;
    } else {
      console.log(`  - No textContent, skipped`);
    }
    console.log();
  }

  // Write a manifest
  const manifest = {
    did: DID,
    pds: PDS,
    fetchedAt: new Date().toISOString(),
    totalRecords: results.total,
    converted: results.converted,
    alreadyLeaflet: results.alreadyLeaflet,
    originalsDir: 'pds-records/originals/',
    convertedDir: 'pds-records/converted/',
    restoreInstructions: 'To restore originals, use the putRecord API with the files in originals/',
  };
  fs.writeFileSync(
    path.join(baseDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('=== Summary ===');
  console.log(`  Total records: ${results.total}`);
  console.log(`  Already Leaflet: ${results.alreadyLeaflet}`);
  console.log(`  Converted: ${results.converted}`);
  console.log(`\nOriginals: pds-records/originals/`);
  console.log(`Converted: pds-records/converted/`);
  console.log(`Manifest:  pds-records/manifest.json`);
  console.log(`\nTo restore originals, use the restore script:`);
  console.log(`  node restore-pds-records.mjs <app-password>`);
}

main().catch(console.error);
