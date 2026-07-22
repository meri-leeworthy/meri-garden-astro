/**
 * Restore original records from pds-records/originals/ back to the PDS.
 * 
 * Usage: node restore-pds-records.mjs <app-password>
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
    console.error('Usage: node restore-pds-records.mjs <app-password>');
    process.exit(1);
  }

  const agent = new AtpAgent({ service: PDS });
  await agent.login({ identifier: HANDLE, password });
  console.log('Authenticated\n');

  const originalsDir = path.join(process.cwd(), 'pds-records', 'originals');
  if (!fs.existsSync(originalsDir)) {
    console.error('No originals directory found at pds-records/originals/');
    process.exit(1);
  }

  const files = fs.readdirSync(originalsDir).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} original records to restore\n`);

  for (const file of files) {
    const filePath = path.join(originalsDir, file);
    const record = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Extract rkey from filename (format: <rkey>_<slug>.json)
    const rkey = file.split('_')[0];
    
    console.log(`Restoring: ${record.title || 'untitled'} (${rkey})`);

    try {
      const resp = await agent.api.com.atproto.repo.putRecord({
        repo: DID,
        collection: 'site.standard.document',
        rkey,
        record,
      });
      console.log(`  ✓ ${resp.data.uri}`);
    } catch (err) {
      console.error(`  ✗ ${err.message}`);
    }
  }

  console.log('\nRestore complete.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
