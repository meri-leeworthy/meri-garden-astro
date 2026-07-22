/**
 * Full pipeline: fetch textContent records from PDS, convert to Leaflet format, write back.
 * 
 * Usage: node convert-pds-records.mjs <pds-password>
 * 
 * The PDS password is the app password for the AT Protocol account.
 */

import { AtpAgent } from '@atproto/api';
import { markdownToLeaflet } from './lib/md-to-leaflet.mjs';

const PDS = 'https://shimeji.us-east.host.bsky.network';
const DID = 'did:plc:mmyj7mk7kh3jqhw6zs4prbuk';
const HANDLE = 'meri.garden';

async function main() {
  const password = process.argv[2];
  if (!password) {
    console.error('Usage: node convert-pds-records.mjs <pds-password>');
    console.error('Password is the app password for the AT Protocol account.');
    process.exit(1);
  }

  // Authenticate
  const agent = new AtpAgent({ service: PDS });
  await agent.login({ identifier: HANDLE, password });
  console.log('Authenticated successfully');

  // List all site.standard.document records
  let cursor;
  const records = [];
  do {
    const resp = await agent.api.com.atproto.repo.listRecords({
      repo: DID,
      collection: 'site.standard.document',
      cursor,
      limit: 100,
    });
    records.push(...resp.data.records);
    cursor = resp.data.cursor;
  } while (cursor);

  console.log(`\nFound ${records.length} site.standard.document records`);

  // Identify textContent records needing conversion
  const toConvert = records.filter(r => {
    const val = r.value;
    return val.textContent && val.textContent.length > 0 && (!val.content || val.content.$type !== 'pub.leaflet.content');
  });

  console.log(`Found ${toConvert.length} records with textContent to convert\n`);

  for (const record of toConvert) {
    const uri = record.uri;
    const rkey = uri.split('/').pop();
    const val = record.value;
    
    console.log(`\n--- Converting: "${val.title}" (${rkey}) ---`);
    console.log(`  textContent length: ${val.textContent.length}`);
    
    // Convert markdown to Leaflet blocks
    const content = markdownToLeaflet(val.textContent);
    
    // Build updated record
    const updated = {
      ...val,
      content,
      // Remove textContent since it's now in block format
      textContent: undefined,
    };
    
    // Write back to PDS
    try {
      const resp = await agent.api.com.atproto.repo.putRecord({
        repo: DID,
        collection: 'site.standard.document',
        rkey,
        record: updated,
      });
      console.log(`  ✓ Updated: ${resp.data.uri}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
      if (err.status === 403) {
        console.error('    Auth error - check your app password has write access');
      }
    }
  }

  console.log('\nDone!');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
