/**
 * Fix image blocks in converted records: download images, upload to PDS,
 * replace URL refs with blob CIDs, then upload corrected records.
 *
 * Usage: node scripts/fix-image-blobs.mjs <app-password>
 */

import { AtpAgent } from '@atproto/api';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PDS = 'https://shimeji.us-east.host.bsky.network';
const DID = 'did:plc:mmyj7mk7kh3jqhw6zs4prbuk';
const HANDLE = 'meri.garden';

const convertedDir = path.join(process.cwd(), 'pds-records', 'converted');

// Track which URLs we've already uploaded to avoid re-uploading
const urlToBlob = new Map();

async function downloadImage(url) {
  const resp = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!resp.ok) throw new Error(`HTTP ${resp.status} fetching ${url}`);
  const buffer = Buffer.from(await resp.arrayBuffer());
  return buffer;
}

async function uploadBlob(agent, buffer) {
  const resp = await agent.com.atproto.repo.uploadBlob(buffer, {
    encoding: 'application/octet-stream',
  });
  return resp.data.blob;
}

function blobRefToJson(blob) {
  // BlobRef.ref is a CID object; toString() gives the CID string.
  // The PDS expects { $link: "<cid>" } format.
  const cid = blob.ref.toString();
  return {
    $type: 'blob',
    ref: { $link: cid },
    mimeType: blob.mimeType,
    size: blob.size,
  };
}

async function getImageMetadata(buffer) {
  const meta = await sharp(buffer).metadata();
  return {
    mimeType: `image/${meta.format}`,
    size: buffer.length,
    width: meta.width,
    height: meta.height,
  };
}

async function processRecord(agent, file, record) {
  const blocks = record.content?.pages?.[0]?.blocks || [];
  let changed = false;

  for (const wrapper of blocks) {
    const block = wrapper.block;
    if (block?.$type !== 'pub.leaflet.blocks.image') continue;

    const ref = block.image?.ref;
    const url = ref?.$link;
    const ipldCid = ref?.['/'];  // IPLD format { "/": "bafkre..." }

    // Skip if already has proper $link format (and not a URL)
    if (url && !url.startsWith('http')) continue;

    // If it has IPLD format { "/": "cid" }, convert to { $link: "cid" }
    if (ipldCid && !url) {
      block.image.ref = { $link: ipldCid };
      changed = true;
      console.log(`    Fixed ref format: ${ipldCid}`);
      continue;
    }

    // If it's a URL, download and upload
    if (url?.startsWith('http')) {
      console.log(`    Image: ${url.substring(0, 80)}`);

      try {
        let blobData = urlToBlob.get(url);
        if (!blobData) {
          console.log(`      Downloading...`);
          const buffer = await downloadImage(url);
          const meta = await getImageMetadata(buffer);

          console.log(`      Uploading blob (${meta.mimeType}, ${meta.size} bytes, ${meta.width}x${meta.height})...`);
          const blob = await uploadBlob(agent, buffer);

          blobData = { blob, meta };
          urlToBlob.set(url, blobData);
        } else {
          console.log(`      Using cached blob`);
        }

        const blobJson = blobRefToJson(blobData.blob);

        block.image.ref = blobJson.ref;
        block.image.mimeType = blobJson.mimeType;
        block.image.size = blobJson.size;
        block.aspectRatio = {
          width: blobData.meta.width,
          height: blobData.meta.height,
        };

        changed = true;
        console.log(`      -> CID: ${blobJson.ref.$link}`);
      } catch (err) {
        console.error(`      ✗ Failed: ${err.message}`);
      }
    }
  }

  return changed;
}

async function main() {
  const password = process.argv[2];
  if (!password) {
    console.error('Usage: node scripts/fix-image-blobs.mjs <app-password>');
    process.exit(1);
  }

  const agent = new AtpAgent({ service: PDS });
  await agent.login({ identifier: HANDLE, password });
  console.log('Authenticated\n');

  const files = fs.readdirSync(convertedDir).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} converted records\n`);

  let totalImages = 0;
  let fixedRecords = 0;

  for (const file of files) {
    const filePath = path.join(convertedDir, file);
    const record = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const rkey = file.split('_')[0];
    const title = record.title || 'untitled';

    // Count images needing fix (URL refs OR IPLD-format refs)
    const blocks = record.content?.pages?.[0]?.blocks || [];
    const imageBlocks = blocks.filter(
      (w) => w.block?.$type === 'pub.leaflet.blocks.image'
    );
    const needsFix = imageBlocks.filter((w) => {
      const ref = w.block.image?.ref;
      // URL ref that hasn't been uploaded yet
      if (ref?.$link?.startsWith('http')) return true;
      // IPLD format { "/": "cid" } without $link
      if (ref?.['/'] && !ref?.$link) return true;
      return false;
    });

    if (needsFix.length === 0) {
      console.log(`  ${title.substring(0, 50)} — no images need fixing`);
      continue;
    }

    console.log(`\n--- ${title.substring(0, 50)} (${rkey}) — ${needsFix.length} images ---`);

    const changed = await processRecord(agent, file, record);
    if (!changed) {
      console.log(`  No changes needed`);
      continue;
    }

    // Save updated record locally
    fs.writeFileSync(filePath, JSON.stringify(record, null, 2));
    console.log(`  Saved updated record`);

    // Upload to PDS
    try {
      const resp = await agent.api.com.atproto.repo.putRecord({
        repo: DID,
        collection: 'site.standard.document',
        rkey,
        record,
      });
      console.log(`  ✓ Uploaded: ${resp.data.uri}`);
      fixedRecords++;
    } catch (err) {
      console.error(`  ✗ Upload failed: ${err.message}`);
    }

    totalImages += needsFix.length;
  }

  console.log(`\n=== Summary ===`);
  console.log(`  Records with images fixed: ${fixedRecords}`);
  console.log(`  Total images processed: ${totalImages}`);
  console.log(`  Unique blobs uploaded: ${urlToBlob.size}`);
  console.log('Done!');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
