/**
 * Regenerate converted files from the local markdown source files (src/posts/).
 * Uses the fixed converter that produces proper image blocks.
 */

import { markdownToLeaflet } from './lib/md-to-leaflet.mjs';
import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), 'src', 'posts');
const originalsDir = path.join(process.cwd(), 'pds-records', 'originals');
const convertedDir = path.join(process.cwd(), 'pds-records', 'converted');

// Read all original PDS records
const originals = fs.readdirSync(originalsDir)
  .filter(f => f.endsWith('.json'))
  .map(f => ({ file: f, data: JSON.parse(fs.readFileSync(path.join(originalsDir, f), 'utf-8')) }));

// Read all markdown files
const mdFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

// Build a lookup: normalized title -> md file path
function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const mdByNormalized = {};
for (const f of mdFiles) {
  const title = path.basename(f, '.md');
  mdByNormalized[normalize(title)] = path.join(postsDir, f);
}

let converted = 0;

for (const orig of originals) {
  const title = orig.data.title;
  const rkey = orig.file.split('_')[0];
  const norm = normalize(title);

  // Try exact match first, then substring match
  let mdPath = mdByNormalized[norm];
  
  if (!mdPath) {
    // Try matching by significant substring (first 20 chars of normalized)
    const sig = norm.substring(0, 20);
    for (const [key, val] of Object.entries(mdByNormalized)) {
      if (key.includes(sig) || sig.includes(key.substring(0, 20))) {
        mdPath = val;
        break;
      }
    }
  }
  
  if (mdPath) {
    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    
    // Extract body (after frontmatter)
    const bodyMatch = mdContent.match(/^---\n[\s\S]*?\n---\n\n([\s\S]*)$/);
    const body = bodyMatch ? bodyMatch[1] : mdContent;
    
    // Convert using fixed converter
    const content = markdownToLeaflet(body);
    const convertedRecord = { ...orig.data, content, textContent: undefined };
    
    fs.writeFileSync(path.join(convertedDir, orig.file), JSON.stringify(convertedRecord, null, 2));
    converted++;
    console.log(`✓ ${title.substring(0, 50)} (${rkey}) — ${content.pages[0].blocks.length} blocks`);
  } else {
    console.log(`- ${title.substring(0, 50)} — no markdown file found, keeping as-is`);
  }
}

console.log(`\nRegenerated ${converted} converted files`);
