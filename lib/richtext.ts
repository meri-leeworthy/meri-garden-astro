/**
 * Rich-text facet rendering, shared between Leaflet documents and
 * Bluesky post embeds.
 *
 * Facets annotate byte ranges of plaintext with features (bold, italic,
 * code, links, mentions, ...). Rendering walks the facet boundaries in
 * order, tracking which features are active at each segment.
 */

import type { LeafletFacet, LeafletFacetFeature } from "./pds";

export function renderFacetedText(plaintext: string, facets?: LeafletFacet[]): string {
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

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
