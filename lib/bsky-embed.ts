/**
 * Bluesky post embeds.
 *
 * `loadBskyPostEmbeds` fetches post views from the public AppView
 * (app.bsky.feed.getPosts, no auth needed) and renders them as HTML cards.
 * Build-time static: `[slug].astro` collects the URIs of every
 * `bskyPost` block, batches the fetches, and passes the rendered embeds
 * into `renderDocumentContent`.
 *
 * The public API is unauthenticated; the PDS does not expose getPosts.
 * If the network is unreachable, embeds degrade to an empty block.
 */

import { renderFacetedText, escapeHtml, escapeAttr } from "./richtext";
import type { LeafletFacet, LeafletFacetFeature } from "./pds";

const PUBLIC_APPVIEW = "https://public.api.bsky.app";
const MAX_URIS_PER_REQUEST = 25;

// --- AppView response shapes (app.bsky.feed.getPosts) ---

interface BskyPostView {
  uri: string;
  cid: string;
  author: BskyAuthorView;
  record: {
    text: string;
    facets?: BskyFacet[];
    createdAt?: string;
  };
  embed?: unknown;
  likeCount?: number;
  replyCount?: number;
  repostCount?: number;
  indexedAt?: string;
}

interface BskyAuthorView {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

interface BskyFacet {
  index: { byteStart: number; byteEnd: number };
  features: BskyFacetFeature[];
}

type BskyFacetFeature =
  | { $type: "app.bsky.richtext.facet#link"; uri: string }
  | { $type: "app.bsky.richtext.facet#mention"; did: string }
  | { $type: "app.bsky.richtext.facet#tag"; tag: string };

// --- Narrowing helpers for untrusted API data ---

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPostView(value: unknown): value is BskyPostView {
  if (!isRecord(value)) return false;
  if (typeof value.uri !== "string") return false;
  const author = value.author;
  if (!isRecord(author) || typeof author.handle !== "string") return false;
  const record = value.record;
  return isRecord(record) && typeof record.text === "string";
}

function isAuthorView(value: unknown): value is BskyAuthorView {
  return isRecord(value) && typeof value.handle === "string";
}

function isFacetFeature(value: unknown): value is BskyFacetFeature {
  if (!isRecord(value)) return false;
  const type = value.$type;
  if (type === "app.bsky.richtext.facet#link") return typeof value.uri === "string";
  if (type === "app.bsky.richtext.facet#mention") return typeof value.did === "string";
  if (type === "app.bsky.richtext.facet#tag") return typeof value.tag === "string";
  return false;
}

function isFacet(value: unknown): value is BskyFacet {
  if (!isRecord(value)) return false;
  const index = value.index;
  if (!isRecord(index)) return false;
  if (typeof index.byteStart !== "number" || typeof index.byteEnd !== "number") return false;
  return Array.isArray(value.features) && value.features.every(isFacetFeature);
}

function isFacetArray(value: unknown): value is BskyFacet[] {
  return Array.isArray(value) && value.every(isFacet);
}

function isEmbedWithImages(value: unknown): value is { images: unknown[] } {
  if (!isRecord(value)) return false;
  return Array.isArray(value.images);
}

function isEmbedWithExternal(value: unknown): value is { external: Record<string, unknown> } {
  if (!isRecord(value)) return false;
  return isRecord(value.external);
}

function isEmbedWithRecord(value: unknown): value is { record: Record<string, unknown> } {
  if (!isRecord(value)) return false;
  return isRecord(value.record);
}

function isEmbedWithMedia(value: unknown): value is { media: Record<string, unknown> } {
  if (!isRecord(value)) return false;
  return isRecord(value.media);
}

// --- Facet conversion: Bluesky feature types -> Leaflet shapes ---

function toLeafletFacet(facet: BskyFacet): LeafletFacet {
  const features: LeafletFacetFeature[] = [];
  for (const feature of facet.features) {
    if (feature.$type === "app.bsky.richtext.facet#link") {
      features.push({ $type: "pub.leaflet.richtext.facet#link", uri: feature.uri });
    } else if (feature.$type === "app.bsky.richtext.facet#mention") {
      features.push({ $type: "pub.leaflet.richtext.facet#didMention", did: feature.did });
    } else if (feature.$type === "app.bsky.richtext.facet#tag") {
      features.push({
        $type: "pub.leaflet.richtext.facet#link",
        uri: `https://bsky.app/hashtag/${encodeURIComponent(feature.tag)}`,
      });
    }
  }
  return { index: facet.index, features };
}

function renderPostText(record: BskyPostView["record"]): string {
  const facets = isFacetArray(record.facets) ? record.facets.map(toLeafletFacet) : undefined;
  return renderFacetedText(record.text, facets);
}

// --- Embed view rendering ---

function renderMedia(embed: unknown, depth: number): string {
  if (!isRecord(embed)) return "";

  const $type = typeof embed.$type === "string" ? embed.$type : "";

  if (isEmbedWithImages(embed) && $type === "app.bsky.embed.images#view") {
    const imgs = embed.images
      .map((img) => {
        if (!isRecord(img)) return "";
        const thumb = typeof img.thumb === "string" ? img.thumb : "";
        if (!thumb) return "";
        const alt = typeof img.alt === "string" ? img.alt : "";
        return `<img src="${escapeAttr(thumb)}" alt="${escapeAttr(alt)}" loading="lazy" />`;
      })
      .filter(Boolean)
      .join("");
    return imgs ? `<div class="bsky-embed-images">${imgs}</div>` : "";
  }

  if (isEmbedWithExternal(embed) && $type === "app.bsky.embed.external#view") {
    const ext = embed.external;
    const title = typeof ext.title === "string" ? ext.title : "";
    const desc = typeof ext.description === "string" ? ext.description : "";
    const uri = typeof ext.uri === "string" ? ext.uri : "";
    const thumb = typeof ext.thumb === "string" ? ext.thumb : "";
    const thumbHtml = thumb
      ? `<img class="bsky-embed-ext-thumb" src="${escapeAttr(thumb)}" alt="" loading="lazy" />`
      : "";
    if (!uri) return "";
    return `<a class="bsky-embed-external" href="${escapeAttr(uri)}" target="_blank" rel="noopener noreferrer">${thumbHtml}<span class="bsky-embed-ext-text"><span class="bsky-embed-ext-title">${escapeHtml(title)}</span><span class="bsky-embed-ext-desc">${escapeHtml(desc)}</span></span></a>`;
  }

  if (isEmbedWithRecord(embed) && $type === "app.bsky.embed.record#view") {
    return renderQuoteCard(embed.record, depth);
  }

  if (isEmbedWithMedia(embed) && $type === "app.bsky.embed.recordWithMedia#view") {
    const recordPart = isEmbedWithRecord(embed) ? renderQuoteCard(embed.record, depth) : "";
    const mediaPart = renderMedia(embed.media, depth);
    return `${recordPart}${mediaPart}`;
  }

  return "";
}

function renderQuoteCard(recordView: Record<string, unknown>, depth: number): string {
  if (depth >= 2) return "";
  if (!isAuthorView(recordView.author)) return "";
  const author = recordView.author;
  const name = typeof author.displayName === "string" && author.displayName ? author.displayName : author.handle;
  const avatar = typeof author.avatar === "string" ? author.avatar : "";
  const value = recordView.value;
  let text = "";
  let facets: unknown;
  if (isRecord(value)) {
    if (typeof value.text === "string") text = value.text;
    facets = value.facets;
  }
  const uri = typeof recordView.uri === "string" ? recordView.uri : "";
  const postHref = bskyPostHref(uri, author.handle);
  const avatarHtml = avatar ? `<img class="bsky-embed-avatar" src="${escapeAttr(avatar)}" alt="" loading="lazy" />` : "";
  const leafletFacets = isFacetArray(facets) ? facets.map(toLeafletFacet) : undefined;
  const body = text ? `<p>${renderFacetedText(text, leafletFacets)}</p>` : "";
  const media = renderMedia(recordView.embed, depth + 1);
  return `<div class="bsky-embed-quote"><a class="bsky-embed-header" href="${escapeAttr(postHref)}" target="_blank" rel="noopener noreferrer">${avatarHtml}<span class="bsky-embed-author"><span class="bsky-embed-name">${escapeHtml(name)}</span><span class="bsky-embed-handle">@${escapeHtml(author.handle)}</span></span></a>${body}${media}</div>`;
}

// --- Top-level post card ---

function bskyPostHref(uri: string, handle: string): string {
  const rkey = uri.split("/").pop() ?? "";
  return `https://bsky.app/profile/${encodeURIComponent(handle)}/post/${encodeURIComponent(rkey)}`;
}

function renderDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

function renderCounts(post: BskyPostView): string {
  const like = typeof post.likeCount === "number" ? post.likeCount : 0;
  const repost = typeof post.repostCount === "number" ? post.repostCount : 0;
  const reply = typeof post.replyCount === "number" ? post.replyCount : 0;
  return `<span class="bsky-embed-count">${like} likes</span><span class="bsky-embed-count">${repost} reposts</span><span class="bsky-embed-count">${reply} replies</span>`;
}

function renderPostCard(post: BskyPostView): string {
  const author = post.author;
  const name = typeof author.displayName === "string" && author.displayName ? author.displayName : author.handle;
  const avatar = typeof author.avatar === "string" ? author.avatar : "";
  const avatarHtml = avatar ? `<img class="bsky-embed-avatar" src="${escapeAttr(avatar)}" alt="" loading="lazy" />` : "";
  const date = renderDate(post.indexedAt);
  const dateHtml = date ? `<span class="bsky-embed-date">${date}</span>` : "";
  const media = renderMedia(post.embed, 0);
  return `<div class="bsky-embed-card"><a class="bsky-embed-header" href="${escapeAttr(bskyPostHref(post.uri, author.handle))}" target="_blank" rel="noopener noreferrer">${avatarHtml}<span class="bsky-embed-author"><span class="bsky-embed-name">${escapeHtml(name)}</span><span class="bsky-embed-handle">@${escapeHtml(author.handle)}</span></span></a><div class="bsky-embed-body"><p>${renderPostText(post.record)}</p>${media}</div><div class="bsky-embed-meta">${renderCounts(post)}${dateHtml}</div></div>`;
}

// --- Public API ---

/**
 * Fetch post views from the public AppView in batches and render each
 * post as an embed card. Returns a map of post URI -> HTML.
 */
export async function loadBskyPostEmbeds(uris: string[]): Promise<Map<string, string>> {
  const embeds = new Map<string, string>();
  if (uris.length === 0) return embeds;

  const batches: string[][] = [];
  for (let i = 0; i < uris.length; i += MAX_URIS_PER_REQUEST) {
    batches.push(uris.slice(i, i + MAX_URIS_PER_REQUEST));
  }

  const results = await Promise.allSettled(
    batches.map(async (batch) => {
      const url = new URL("/xrpc/app.bsky.feed.getPosts", PUBLIC_APPVIEW);
      for (const uri of batch) {
        url.searchParams.append("uris", uri);
      }
      const resp = await fetch(url.toString(), { signal: AbortSignal.timeout(30_000) });
      if (!resp.ok) throw new Error(`AppView returned HTTP ${resp.status}`);
      return resp.json() as Promise<{ posts?: unknown }>;
    }),
  );

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    const posts = result.value.posts;
    if (!Array.isArray(posts)) continue;
    for (const post of posts) {
      if (!isPostView(post)) continue;
      embeds.set(post.uri, renderPostCard(post));
    }
  }
  return embeds;
}

/**
 * Render the embed card for a single post URI from a previously loaded
 * batch. Returns "" if the post was not fetched.
 */
export function renderBskyPostEmbed(uri: string, embeds: Map<string, string> | undefined): string {
  return embeds?.get(uri) ?? "";
}
