/**
 * Renders Leaflet block content to HTML.
 *
 * Handles all block types and facet annotations (bold, italic, code,
 * links, strikethrough, highlight, underline, mentions), plus
 * `bskyPost` blocks which render as Bluesky post embeds.
 */

import type {
  LeafletBlock,
  LeafletPage,
  PdsDocument,
  LeafletTextBlock,
  LeafletHeaderBlock,
  LeafletCodeBlock,
  LeafletBlockquoteBlock,
  LeafletUnorderedListBlock,
  LeafletOrderedListBlock,
  LeafletListItem,
  LeafletOrderedListItem,
  LeafletImageBlock,
  LeafletBskyPostBlock,
} from "./pds";
import { renderFacetedText, escapeHtml, escapeAttr } from "./richtext";
import { renderBskyPostEmbed } from "./bsky-embed";

// --- Block rendering ---

function renderBlock(block: LeafletBlock, embeds?: Map<string, string>): string {
  switch (block.$type) {
    case "pub.leaflet.blocks.text":
      return renderTextBlock(block);
    case "pub.leaflet.blocks.header":
      return renderHeaderBlock(block);
    case "pub.leaflet.blocks.code":
      return renderCodeBlock(block);
    case "pub.leaflet.blocks.blockquote":
      return renderBlockquoteBlock(block);
    case "pub.leaflet.blocks.unorderedList":
      return renderUnorderedList(block, embeds);
    case "pub.leaflet.blocks.orderedList":
      return renderOrderedList(block, embeds);
    case "pub.leaflet.blocks.horizontalRule":
      return '<hr class="my-8 border-slate-300" />';
    case "pub.leaflet.blocks.image":
      return renderImageBlock(block);
    case "pub.leaflet.blocks.bskyPost":
      return renderBskyPostBlock(block, embeds);
    default:
      return "";
  }
}

function renderTextBlock(block: LeafletTextBlock): string {
  const text = renderFacetedText(block.plaintext, block.facets);
  if (!text.trim()) return "";
  return `<p>${text}</p>`;
}

function renderHeaderBlock(block: LeafletHeaderBlock): string {
  const tag = `h${Math.min(Math.max(block.level, 1), 6)}`;
  const text = renderFacetedText(block.plaintext, block.facets);
  return `<${tag}>${text}</${tag}>`;
}

function renderCodeBlock(block: LeafletCodeBlock): string {
  const lang = block.language ? ` class="language-${escapeAttr(block.language)}"` : "";
  return `<pre><code${lang}>${escapeHtml(block.plaintext)}</code></pre>`;
}

function renderBlockquoteBlock(block: LeafletBlockquoteBlock): string {
  const text = renderFacetedText(block.plaintext, block.facets);
  const paragraphs = text
    .split("\n\n")
    .filter((p) => p.trim())
    .map((p) => `<p>${p}</p>`)
    .join("");
  return `<blockquote>${paragraphs}</blockquote>`;
}

function renderUnorderedList(block: LeafletUnorderedListBlock, embeds?: Map<string, string>): string {
  const items = block.children.map((item) => renderUnorderedListItem(item, embeds)).join("");
  return `<ul>${items}</ul>`;
}

function renderUnorderedListItem(item: LeafletListItem, embeds?: Map<string, string>): string {
  const content = renderBlock(item.content, embeds);
  let nested = "";
  if (item.children && item.children.length > 0) {
    nested = `<ul>${item.children.map((child) => renderUnorderedListItem(child, embeds)).join("")}</ul>`;
  }
  if (item.orderedListChildren) {
    nested = `<ol>${item.orderedListChildren.children.map((child) => renderOrderedListItem(child, embeds)).join("")}</ol>`;
  }
  const checkbox = item.checked !== undefined
    ? `<input type="checkbox" ${item.checked ? "checked" : ""} disabled /> `
    : "";
  return `<li>${checkbox}${content}${nested}</li>`;
}

function renderOrderedList(block: LeafletOrderedListBlock, embeds?: Map<string, string>): string {
  const start = block.startIndex && block.startIndex !== 1 ? ` start="${block.startIndex}"` : "";
  const items = block.children.map((item) => renderOrderedListItem(item, embeds)).join("");
  return `<ol${start}>${items}</ol>`;
}

function renderOrderedListItem(item: LeafletOrderedListItem, embeds?: Map<string, string>): string {
  const content = renderBlock(item.content, embeds);
  let nested = "";
  if (item.children && item.children.length > 0) {
    nested = `<ol>${item.children.map((child) => renderOrderedListItem(child, embeds)).join("")}</ol>`;
  }
  if (item.unorderedListChildren) {
    nested = `<ul>${item.unorderedListChildren.children.map((child) => renderUnorderedListItem(child, embeds)).join("")}</ul>`;
  }
  const checkbox = item.checked !== undefined
    ? `<input type="checkbox" ${item.checked ? "checked" : ""} disabled /> `
    : "";
  return `<li>${checkbox}${content}${nested}</li>`;
}

function renderImageBlock(block: LeafletImageBlock): string {
  const alt = block.alt ? escapeAttr(block.alt) : "";
  const ref = block.image?.ref as { $link?: string } | undefined;
  const cid = ref?.$link;
  if (cid) {
    // Blob refs store a CID; resolve via PDS sync.getBlob endpoint
    const PDS = "https://shimeji.us-east.host.bsky.network";
    const DID = "did:plc:mmyj7mk7kh3jqhw6zs4prbuk";
    const src = `${PDS}/xrpc/com.atproto.sync.getBlob?did=${encodeURIComponent(DID)}&cid=${encodeURIComponent(cid)}`;
    return `<p><img src="${escapeAttr(src)}" alt="${alt}" loading="lazy" /></p>`;
  }
  if (alt) {
    return `<p class="text-sm text-slate-500 italic">[Image: ${alt}]</p>`;
  }
  return "";
}

function renderBskyPostBlock(block: LeafletBskyPostBlock, embeds?: Map<string, string>): string {
  const card = renderBskyPostEmbed(block.postRef.uri, embeds);
  return card ? `<div class="bsky-embed">${card}</div>` : "";
}

// --- Public API ---

export function renderLeafletPage(page: LeafletPage, embeds?: Map<string, string>): string {
  return page.blocks
    .map((wrapper) => renderBlock(wrapper.block, embeds))
    .filter(Boolean)
    .join("\n");
}

export function renderDocumentContent(doc: PdsDocument, embeds?: Map<string, string>): string {
  if (doc.content?.pages?.[0]) {
    return renderLeafletPage(doc.content.pages[0], embeds);
  }
  // Fallback: render textContent as simple paragraphs
  if (doc.textContent) {
    return doc.textContent
      .split("\n\n")
      .filter((p) => p.trim())
      .map((p) => `<p>${escapeHtml(p.trim())}</p>`)
      .join("\n");
  }
  return "";
}

/**
 * Collect the URIs of every bskyPost block in a document, in document order.
 */
export function collectBskyPostUris(doc: PdsDocument): string[] {
  const page = doc.content?.pages?.[0];
  if (!page) return [];
  const uris: string[] = [];
  for (const wrapper of page.blocks) {
    const b = wrapper.block;
    if (b.$type === "pub.leaflet.blocks.bskyPost") {
      uris.push(b.postRef.uri);
    }
  }
  return uris;
}

export function getDocumentSnippet(doc: PdsDocument, maxLength = 200): string {
  if (!doc.content?.pages?.[0]) return doc.description ?? "";

  for (const wrapper of doc.content.pages[0].blocks) {
    const b = wrapper.block;
    if (b.$type === "pub.leaflet.blocks.text" && b.plaintext.trim()) {
      const text = b.plaintext.trim();
      if (text.length > maxLength) return text.slice(0, maxLength - 3) + "...";
      return text;
    }
  }
  return doc.description ?? "";
}
