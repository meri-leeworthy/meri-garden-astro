/**
 * PDS data cache — fetches site.standard.document records from the PDS
 * and caches them as JSON for use during the Astro build.
 *
 * The cache file is written by the prebuild script and read by page components.
 */

import fs from "fs";
import path from "path";

export interface PdsDocument {
  uri: string;
  rkey: string;
  title: string;
  slug: string;
  publishedAt: string;
  description?: string;
  tags?: string[];
  coverImage?: unknown;
  bskyPostRef?: unknown;
  /** Leaflet block content, if converted */
  content?: {
    $type: "pub.leaflet.content";
    pages: LeafletPage[];
  };
  /** Raw text content, if not yet converted */
  textContent?: string;
}

export interface LeafletPage {
  id: string;
  $type: "pub.leaflet.pages.linearDocument";
  blocks: LeafletBlockWrapper[];
}

export interface LeafletBlockWrapper {
  $type: "pub.leaflet.pages.linearDocument#block";
  block: LeafletBlock;
}

export type LeafletBlock =
  | LeafletTextBlock
  | LeafletHeaderBlock
  | LeafletCodeBlock
  | LeafletBlockquoteBlock
  | LeafletUnorderedListBlock
  | LeafletOrderedListBlock
  | LeafletHorizontalRuleBlock
  | LeafletImageBlock
  | LeafletBskyPostBlock;

export interface LeafletBskyPostBlock {
  $type: "pub.leaflet.blocks.bskyPost";
  postRef: { cid: string; uri: string };
  clientHost?: string;
}

export interface LeafletTextBlock {
  $type: "pub.leaflet.blocks.text";
  plaintext: string;
  facets?: LeafletFacet[];
  textSize?: string;
}

export interface LeafletHeaderBlock {
  $type: "pub.leaflet.blocks.header";
  level: number;
  plaintext: string;
  facets?: LeafletFacet[];
}

export interface LeafletCodeBlock {
  $type: "pub.leaflet.blocks.code";
  plaintext: string;
  language?: string;
}

export interface LeafletBlockquoteBlock {
  $type: "pub.leaflet.blocks.blockquote";
  plaintext: string;
  facets?: LeafletFacet[];
}

export interface LeafletUnorderedListBlock {
  $type: "pub.leaflet.blocks.unorderedList";
  children: LeafletListItem[];
}

export interface LeafletOrderedListBlock {
  $type: "pub.leaflet.blocks.orderedList";
  children: LeafletOrderedListItem[];
  startIndex?: number;
}

export interface LeafletListItem {
  $type: "pub.leaflet.blocks.unorderedList#listItem";
  content: LeafletTextBlock | LeafletHeaderBlock | LeafletImageBlock;
  children?: LeafletListItem[];
  orderedListChildren?: { $type: "pub.leaflet.blocks.orderedList"; children: LeafletOrderedListItem[] };
  checked?: boolean;
}

export interface LeafletOrderedListItem {
  $type: "pub.leaflet.blocks.orderedList#listItem";
  content: LeafletTextBlock | LeafletHeaderBlock | LeafletImageBlock;
  children?: LeafletOrderedListItem[];
  unorderedListChildren?: { $type: "pub.leaflet.blocks.unorderedList"; children: LeafletListItem[] };
  checked?: boolean;
}

export interface LeafletHorizontalRuleBlock {
  $type: "pub.leaflet.blocks.horizontalRule";
}

export interface LeafletImageBlock {
  $type: "pub.leaflet.blocks.image";
  image: { $type: "blob"; ref: unknown; mimeType: string; size: number };
  alt?: string;
  aspectRatio: { width: number; height: number };
  fullBleed?: boolean;
}

export interface LeafletFacet {
  index: { byteStart: number; byteEnd: number };
  features: LeafletFacetFeature[];
}

export type LeafletFacetFeature =
  | { $type: "pub.leaflet.richtext.facet#link"; uri: string }
  | { $type: "pub.leaflet.richtext.facet#bold" }
  | { $type: "pub.leaflet.richtext.facet#italic" }
  | { $type: "pub.leaflet.richtext.facet#code" }
  | { $type: "pub.leaflet.richtext.facet#strikethrough" }
  | { $type: "pub.leaflet.richtext.facet#highlight" }
  | { $type: "pub.leaflet.richtext.facet#underline" }
  | { $type: "pub.leaflet.richtext.facet#didMention"; did: string }
  | { $type: "pub.leaflet.richtext.facet#atMention"; atURI: string; href?: string };

const CACHE_DIR = path.join(process.cwd(), ".pds-cache");
const CACHE_FILE = path.join(CACHE_DIR, "documents.json");

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/^[0-9]+-/, "");
}

/**
 * Fetch all site.standard.document records from the PDS.
 */
export async function fetchDocuments(): Promise<PdsDocument[]> {
  const PDS = "https://shimeji.us-east.host.bsky.network";
  const DID = "did:plc:mmyj7mk7kh3jqhw6zs4prbuk";

  let cursor: string | undefined;
  const records: PdsDocument[] = [];

  do {
    const url = new URL("/xrpc/com.atproto.repo.listRecords", PDS);
    url.searchParams.set("repo", DID);
    url.searchParams.set("collection", "site.standard.document");
    url.searchParams.set("limit", "100");
    if (cursor) url.searchParams.set("cursor", cursor);

    const resp = await fetch(url.toString());
    const data = await resp.json() as {
      records?: Array<{ uri: string; value: Record<string, unknown> }>;
      cursor?: string;
    };

    for (const r of data.records ?? []) {
      const val = r.value as Record<string, unknown>;
      const uri = r.uri;
      const rkey = uri.split("/").pop() ?? "";
      const pathVal = val.path as string | undefined;
      const isBareRkey = pathVal ? /^\/[a-z0-9]+$/.test(pathVal) : false;
      const slug = pathVal && !isBareRkey
        ? pathVal.replace(/^\//, "")
        : slugifyTitle((val.title as string) ?? "Untitled");

      records.push({
        uri,
        rkey,
        title: (val.title as string) ?? "Untitled",
        slug,
        publishedAt: (val.publishedAt as string) ?? "",
        description: val.description as string | undefined,
        tags: val.tags as string[] | undefined,
        coverImage: val.coverImage,
        bskyPostRef: val.bskyPostRef,
        content: val.content as PdsDocument["content"] | undefined,
        textContent: val.textContent as string | undefined,
      });
    }

    cursor = data.cursor;
  } while (cursor);

  return records;
}

/**
 * Write documents to the cache file.
 */
export function writeCache(documents: PdsDocument[]): void {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(documents, null, 2));
}

/**
 * Read documents from the cache file.
 * Returns empty array if cache doesn't exist.
 */
export function readCache(): PdsDocument[] {
  try {
    if (!fs.existsSync(CACHE_FILE)) return [];
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8")) as PdsDocument[];
  } catch {
    return [];
  }
}

/**
 * Get a single document by slug.
 */
export function getDocumentBySlug(slug: string): PdsDocument | undefined {
  return readCache().find((d) => d.slug === slug);
}
