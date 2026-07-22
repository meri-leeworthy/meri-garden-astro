/**
 * Upload the locally-converted records (with fixed image blocks) to the PDS.
 * Overwrites existing records that already have content.
 *
 * Usage: node upload-converted.mjs <app-password>
 */

import { AtpAgent } from '@atproto/api';
import fs from 'fs';
import path from 'path';

const PDS = 'https://shimeji.us-east.host.bsky.network';
const DID = 'did:plc:mmyj7mk7kh3jqhw6zs4prbuk';
const HANDLE = 'meri.garden';

async function main() {
  const password = process.argv[2];
  if (!password) {
    console.error('Usage: node upload-converted.mjs <app-password>');
    process.exit(1);
  }

  const agent = new AtpAgent({ service: PDS });
  await agent.login({ identifier: HANDLE, password });
  console.log('Authenticated\n');

  const convertedDir = path.join(process.cwd(), 'pds-records', 'converted');
  const files = fs.readdirSync(convertedDir).filter(f => f.endsWith('.json'));

  console.log(`Uploading ${files.length} converted records to PDS...\n`);

  for (const file of files) {
    const record = JSON.parse(fs.readFileSync(path.join(convertedDir, file), 'utf-8'));
    const rkey = file.split('_')[0];
    const title = record.title || 'untitled';

    // Count images in this record
    const imgCount = record.content?.pages?.[0]?.blocks?.filter(
      (b: any) => b.block?.$type === 'pub.leaflet.blocks.image'
    ).length || 0;

    console.log(`  ${title.substring(0, 50)} (${rkey}) — ${imgCount} images`);

    try {
      const resp = await agent.api.com.atproto.repo.putRecord({
        repo: DID,
        collection: 'site.standard.document',
        rkey,
        record,
      });
      console.log(`    ✓ ${resp.data.uri}`);
    } catch (err: any) {
      console.error(`    ✗ ${err.message}`);
    }
  }

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
