/**
 * Dry-run: fetch textContent records from PDS, convert to Leaflet format, show preview.
 * Does NOT write anything back.
 */

import { markdownToLeaflet } from './lib/md-to-leaflet.mjs';

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

async function main() {
  const docs = await listCollection('site.standard.document');
  
  const toConvert = docs.filter(r => {
    const val = r.value;
    return val.textContent && val.textContent.length > 0 && (!val.content || val.content.$type !== 'pub.leaflet.content');
  });

  console.log(`Found ${toConvert.length} records to convert out of ${docs.length} total\n`);

  for (const record of toConvert) {
    const uri = record.uri;
    const rkey = uri.split('/').pop();
    const val = record.value;
    
    console.log(`=== "${val.title}" (${rkey}) ===`);
    console.log(`  site: ${val.site}`);
    console.log(`  path: ${val.path}`);
    console.log(`  publishedAt: ${val.publishedAt}`);
    console.log(`  description: ${val.description}`);
    console.log(`  textContent: ${val.textContent.length} chars`);
    
    // Convert
    const content = markdownToLeaflet(val.textContent);
    const page = content.pages[0];
    console.log(`  → ${page.blocks.length} blocks`);
    
    // Show block type summary
    const typeCounts = {};
    for (const wrapper of page.blocks) {
      const type = wrapper.block.$type;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    }
    for (const [type, count] of Object.entries(typeCounts)) {
      const short = type.replace('pub.leaflet.blocks.', '');
      console.log(`    ${short}: ${count}`);
    }
    
    // Show first 3 blocks as preview
    console.log(`  Preview (first 3 blocks):`);
    for (let i = 0; i < Math.min(3, page.blocks.length); i++) {
      const b = page.blocks[i].block;
      const type = b.$type.replace('pub.leaflet.blocks.', '');
      const text = b.plaintext || b.text || '';
      console.log(`    [${type}] ${text.substring(0, 80)}${text.length > 80 ? '...' : ''}`);
    }
    console.log();
  }
}

main().catch(console.error);
