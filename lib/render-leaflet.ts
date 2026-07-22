/**
 * Renders Leaflet block content to HTML.
 *
 * Handles all block types and facet annotations (bold, italic, code,
 * links, strikethrough, highlight, underline, mentions).
 */

import type {
  LeafletBlock,
  LeafletFacet,
  LeafletFacetFeature,
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
} from "./pds";

// --- Facet rendering ---

function renderFacetedText(plaintext: string, facets?: LeafletFacet[]): string {
  if (!facets || facets.length === 0) {
    return escapeHtml(plaintext);
  }

  const textBytes = Buffer.byteLength(plaintext, "utf-8");
  const starts: Record<number, LeafletFacetFeature[]> = {};
  const ends: Record<number, LeafletFacetFeature[]> = {};
  for (const facet of facets) {
    const { byteStart, byteEnd } = facet.index;
    for (const feature of facet.features) {
      (starts[byteStart] ??= []).push(feature);
      (ends[byteEnd] ??= []).push(feature);
    }
  }

  const pointSet: Record<number, true> = { 0: true, [textBytes]: true };
  for (const f of facets) {
    pointSet[f.index.byteStart] = true;
    pointSet[f.index.byteEnd] = true;
  }
  const sortedPoints = Object.keys(pointSet).map(Number).sort((a, b) => a - b);

  const activeFeatures: LeafletFacetFeature[] = [];
  const parts: string[] = [];

  for (let i = 0; i < sortedPoints.length - 1; i++) {
    const segStart = sortedPoints[i];
    const segEnd = sortedPoints[i + 1];
    if (segStart === segEnd) continue;

    const ending = ends[segStart];
    if (ending) {
      for (const f of ending) {
        const idx = activeFeatures.lastIndexOf(f);
        if (idx >= 0) activeFeatures.splice(idx, 1);
      }
    }

    const starting = starts[segStart];
    if (starting) {
      activeFeatures.push(...starting);
    }

    const isAscii = Buffer.byteLength(plaintext, "utf-8") === plaintext.length;
    const segText = plaintext.slice(
      isAscii ? segStart : Buffer.from(plaintext, "utf-8").subarray(0, segStart).toString("utf-8").length,
      isAscii ? segEnd : Buffer.from(plaintext, "utf-8").subarray(0, segEnd).toString("utf-8").length,
    );
    if (!segText) continue;

    let content = escapeHtml(segText);
    for (const feature of activeFeatures) {
      content = wrapFeature(content, feature);
    }
    parts.push(content);
  }

  return parts.join("");
}

function wrapFeature(content: string, feature: LeafletFacetFeature): string {
  switch (feature.$type) {
    case "pub.leaflet.richtext.facet#bold":
      return `<strong>${content}</strong>`;
    case "pub.leaflet.richtext.facet#italic":
      return `<em>${content}</em>`;
    case "pub.leaflet.richtext.facet#code":
      return `<code>${content}</code>`;
    case "pub.leaflet.richtext.facet#strikethrough":
      return `<del>${content}</del>`;
    case "pub.leaflet.richtext.facet#highlight":
      return `<mark>${content}</mark>`;
    case "pub.leaflet.richtext.facet#underline":
      return `<u>${content}</u>`;
    case "pub.leaflet.richtext.facet#link":
      return `<a href="${escapeAttr(feature.uri)}">${content}</a>`;
    case "pub.leaflet.richtext.facet#didMention":
      return `<a href="https://bsky.app/profile/${feature.did}">${content}</a>`;
    case "pub.leaflet.richtext.facet#atMention":
      return `<a href="${escapeAttr(feature.atURI)}">${content}</a>`;
    default:
      return content;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --- Block rendering ---

function renderBlock(block: LeafletBlock): string {
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
      return renderUnorderedList(block);
    case "pub.leaflet.blocks.orderedList":
      return renderOrderedList(block);
    case "pub.leaflet.blocks.horizontalRule":
      return '<hr class="my-8 border-slate-300" />';
    case "pub.leaflet.blocks.image":
      return renderImageBlock(block);
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

function renderUnorderedList(block: LeafletUnorderedListBlock): string {
  const items = block.children.map(renderUnorderedListItem).join("");
  return `<ul>${items}</ul>`;
}

function renderUnorderedListItem(item: LeafletListItem): string {
  const content = renderBlock(item.content);
  let nested = "";
  if (item.children && item.children.length > 0) {
    nested = `<ul>${item.children.map(renderUnorderedListItem).join("")}</ul>`;
  }
  if (item.orderedListChildren) {
    nested = `<ol>${item.orderedListChildren.children.map(renderOrderedListItem).join("")}</ol>`;
  }
  const checkbox = item.checked !== undefined
    ? `<input type="checkbox" ${item.checked ? "checked" : ""} disabled /> `
    : "";
  return `<li>${checkbox}${content}${nested}</li>`;
}

function renderOrderedList(block: LeafletOrderedListBlock): string {
  const start = block.startIndex && block.startIndex !== 1 ? ` start="${block.startIndex}"` : "";
  const items = block.children.map(renderOrderedListItem).join("");
  return `<ol${start}>${items}</ol>`;
}

function renderOrderedListItem(item: LeafletOrderedListItem): string {
  const content = renderBlock(item.content);
  let nested = "";
  if (item.children && item.children.length > 0) {
    nested = `<ol>${item.children.map(renderOrderedListItem).join("")}</ol>`;
  }
  if (item.unorderedListChildren) {
    nested = `<ul>${item.unorderedListChildren.children.map(renderUnorderedListItem).join("")}</ul>`;
  }
  const checkbox = item.checked !== undefined
    ? `<input type="checkbox" ${item.checked ? "checked" : ""} disabled /> `
    : "";
  return `<li>${checkbox}${content}${nested}</li>`;
}

function renderImageBlock(block: LeafletImageBlock): string {
  const alt = block.alt ? escapeAttr(block.alt) : "";
  const ref = block.image?.ref as { $link?: string } | undefined;
  const src = ref?.$link;
  if (src) {
    return `<p><img src="${escapeAttr(src)}" alt="${alt}" loading="lazy" /></p>`;
  }
  if (alt) {
    return `<p class="text-sm text-slate-500 italic">[Image: ${alt}]</p>`;
  }
  return "";
}

// --- Public API ---

export function renderLeafletPage(page: LeafletPage): string {
  return page.blocks
    .map((wrapper) => renderBlock(wrapper.block))
    .filter(Boolean)
    .join("\n");
}

export function renderDocumentContent(doc: PdsDocument): string {
  if (!doc.content?.pages?.[0]) return "";
  return renderLeafletPage(doc.content.pages[0]);
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
