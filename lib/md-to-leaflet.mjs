/**
 * Converts markdown textContent to Leaflet block format (pub.leaflet.content)
 * 
 * Handles: paragraphs, headings, code blocks, blockquotes, lists, 
 * horizontal rules, images, links, bold, italic, inline code, 
 * wiki links [[Page]], highlights ==text==
 */

import { marked } from 'marked';

// --- Wiki link and highlight pre-processing ---

function preprocessMarkdown(md) {
  // Convert [[Wiki Link|display text]] to markdown links
  md = md.replace(/\[\[([^\]]+?)\|([^\]]+?)\]\]/g, (_, page, text) => {
    const slug = slugify(page);
    return `[${text}](https://meri.garden/notes/${slug})`;
  });
  // Convert [[Wiki Link]] to markdown links
  md = md.replace(/\[\[([^\]]+?)\]\]/g, (_, page) => {
    const slug = slugify(page);
    return `[${page}](https://meri.garden/notes/${slug})`;
  });
  // Convert ==highlight== to <mark> tags (marked doesn't support this natively)
  md = md.replace(/==([^=]+)==/g, '<mark>$1</mark>');
  return md;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// --- Inline token to facets conversion ---

function buildPlaintextAndFacets(inlineTokens) {
  let plaintext = '';
  const facets = [];
  let highlightStart = -1;

  function walk(tokens, baseOffset = 0) {
    for (const token of tokens) {
      if (token.type === 'text') {
        plaintext += token.text;
        baseOffset += Buffer.byteLength(token.text, 'utf-8');
      } else if (token.type === 'strong') {
        const start = baseOffset;
        walk(token.tokens, baseOffset);
        const end = Buffer.byteLength(plaintext, 'utf-8');
        facets.push({
          index: { byteStart: start, byteEnd: end },
          features: [{ $type: 'pub.leaflet.richtext.facet#bold' }],
        });
        baseOffset = end;
      } else if (token.type === 'em') {
        const start = baseOffset;
        walk(token.tokens, baseOffset);
        const end = Buffer.byteLength(plaintext, 'utf-8');
        facets.push({
          index: { byteStart: start, byteEnd: end },
          features: [{ $type: 'pub.leaflet.richtext.facet#italic' }],
        });
        baseOffset = end;
      } else if (token.type === 'link') {
        const start = baseOffset;
        plaintext += token.text;
        const end = Buffer.byteLength(plaintext, 'utf-8');
        facets.push({
          index: { byteStart: start, byteEnd: end },
          features: [{ $type: 'pub.leaflet.richtext.facet#link', uri: token.href }],
        });
        baseOffset = end;
      } else if (token.type === 'codespan') {
        const start = baseOffset;
        plaintext += token.text;
        const end = Buffer.byteLength(plaintext, 'utf-8');
        facets.push({
          index: { byteStart: start, byteEnd: end },
          features: [{ $type: 'pub.leaflet.richtext.facet#code' }],
        });
        baseOffset = end;
      } else if (token.type === 'image') {
        const start = baseOffset;
        const altText = token.text || token.alt || 'image';
        plaintext += altText;
        const end = Buffer.byteLength(plaintext, 'utf-8');
        facets.push({
          index: { byteStart: start, byteEnd: end },
          features: [{ $type: 'pub.leaflet.richtext.facet#link', uri: token.href }],
        });
        baseOffset = end;
      } else if (token.type === 'del') {
        const start = baseOffset;
        walk(token.tokens, baseOffset);
        const end = Buffer.byteLength(plaintext, 'utf-8');
        facets.push({
          index: { byteStart: start, byteEnd: end },
          features: [{ $type: 'pub.leaflet.richtext.facet#strikethrough' }],
        });
        baseOffset = end;
      } else if (token.type === 'html') {
        if (token.text === '<mark>') {
          highlightStart = baseOffset;
        } else if (token.text === '</mark>') {
          if (highlightStart >= 0) {
            const end = Buffer.byteLength(plaintext, 'utf-8');
            facets.push({
              index: { byteStart: highlightStart, byteEnd: end },
              features: [{ $type: 'pub.leaflet.richtext.facet#highlight' }],
            });
            highlightStart = -1;
          }
        }
        // Other HTML is silently dropped
      } else if (token.type === 'br') {
        plaintext += '\n';
        baseOffset += 1;
      }
    }
  }

  walk(inlineTokens);
  return { plaintext, facets };
}

// --- Block conversion ---

function convertTokensToBlocks(tokens) {
  const blocks = [];

  for (const token of tokens) {
    switch (token.type) {
      case 'paragraph': {
        const tokens = token.tokens || [];
        // Split at image boundaries
        let currentTokens = [];
        for (const tok of tokens) {
          if (tok.type === 'image') {
            // Flush accumulated text tokens
            if (currentTokens.length > 0) {
              const { plaintext, facets } = buildPlaintextAndFacets(currentTokens);
              if (plaintext.trim()) {
                const block = { $type: 'pub.leaflet.blocks.text', plaintext };
                if (facets.length > 0) block.facets = facets;
                blocks.push(makeBlockWrapper(block));
              }
              currentTokens = [];
            }
            // Emit image block
            const altText = tok.text || tok.alt || '';
            blocks.push(makeBlockWrapper({
              $type: 'pub.leaflet.blocks.image',
              image: { $type: 'blob', ref: { $link: tok.href }, mimeType: 'image/*', size: 0 },
              alt: altText,
              aspectRatio: { width: 16, height: 9 },
            }));
          } else {
            currentTokens.push(tok);
          }
        }
        // Flush remaining text tokens
        if (currentTokens.length > 0) {
          const { plaintext, facets } = buildPlaintextAndFacets(currentTokens);
          if (plaintext.trim()) {
            const block = { $type: 'pub.leaflet.blocks.text', plaintext };
            if (facets.length > 0) block.facets = facets;
            blocks.push(makeBlockWrapper(block));
          }
        }
        break;
      }

      case 'heading': {
        const { plaintext, facets } = buildPlaintextAndFacets(token.tokens || []);
        const block = {
          $type: 'pub.leaflet.blocks.header',
          level: token.depth,
          plaintext,
        };
        if (facets.length > 0) block.facets = facets;
        blocks.push(makeBlockWrapper(block));
        break;
      }

      case 'code': {
        blocks.push(makeBlockWrapper({
          $type: 'pub.leaflet.blocks.code',
          plaintext: token.text,
          ...(token.lang ? { language: token.lang } : {}),
        }));
        break;
      }

      case 'blockquote': {
        const innerTokens = token.tokens || [];
        const allParts = innerTokens.map(t => {
          if (t.type === 'paragraph') {
            return extractText(t.tokens || []);
          }
          return t.text || '';
        });
        const allText = allParts.join('\n\n');
        
        const block = { $type: 'pub.leaflet.blocks.blockquote', plaintext: allText };
        blocks.push(makeBlockWrapper(block));
        break;
      }

      case 'list': {
        if (token.ordered) {
          blocks.push(convertOrderedList(token));
        } else {
          blocks.push(convertUnorderedList(token));
        }
        break;
      }

      case 'image': {
        const altText = token.text || token.alt || '';
        blocks.push(makeBlockWrapper({
          $type: 'pub.leaflet.blocks.image',
          image: { $type: 'blob', ref: { $link: token.href }, mimeType: 'image/*', size: 0 },
          alt: altText,
          aspectRatio: { width: 16, height: 9 },
        }));
        break;
      }

      case 'hr': {
        blocks.push(makeBlockWrapper({
          $type: 'pub.leaflet.blocks.horizontalRule',
        }));
        break;
      }

      case 'html': {
        break;
      }

      case 'space': {
        break;
      }
    }
  }

  return blocks;
}

function extractText(tokens) {
  let text = '';
  for (const t of tokens) {
    if (t.type === 'text') text += t.text;
    else if (t.tokens) text += extractText(t.tokens);
    else if (t.text) text += t.text;
  }
  return text;
}

function makeBlockWrapper(block) {
  return {
    $type: 'pub.leaflet.pages.linearDocument#block',
    block,
  };
}

function getListItemInlineTokens(item) {
  if (!item.tokens || item.tokens.length === 0) return [];
  const first = item.tokens[0];
  if (first.type === 'paragraph' || first.type === 'text') {
    return first.tokens || [];
  }
  return [];
}

function convertListItemContent(item) {
  const tokens = getListItemInlineTokens(item);
  const { plaintext, facets } = buildPlaintextAndFacets(tokens);
  const content = { $type: 'pub.leaflet.blocks.text', plaintext };
  if (facets.length > 0) content.facets = facets;
  return content;
}

function convertUnorderedList(token) {
  const children = token.items.map(item => {
    const listItem = {
      $type: 'pub.leaflet.blocks.unorderedList#listItem',
      content: convertListItemContent(item),
    };
    if (item.tokens) {
      const nestedList = item.tokens.find(t => t.type === 'list');
      if (nestedList) {
        if (nestedList.ordered) {
          listItem.orderedListChildren = { $type: 'pub.leaflet.blocks.orderedList', children: convertOrderedListItems(nestedList) };
        } else {
          listItem.children = convertUnorderedListItems(nestedList);
        }
      }
    }
    return listItem;
  });

  return makeBlockWrapper({
    $type: 'pub.leaflet.blocks.unorderedList',
    children,
  });
}

function convertUnorderedListItems(token) {
  return token.items.map(item => ({
    $type: 'pub.leaflet.blocks.unorderedList#listItem',
    content: convertListItemContent(item),
  }));
}

function convertOrderedList(token) {
  const children = token.items.map(item => {
    const listItem = {
      $type: 'pub.leaflet.blocks.orderedList#listItem',
      content: convertListItemContent(item),
    };
    if (item.tokens) {
      const nestedList = item.tokens.find(t => t.type === 'list');
      if (nestedList) {
        if (nestedList.ordered) {
          listItem.children = convertOrderedListItems(nestedList);
        } else {
          listItem.unorderedListChildren = { $type: 'pub.leaflet.blocks.unorderedList', children: convertUnorderedListItems(nestedList) };
        }
      }
    }
    return listItem;
  });

  return makeBlockWrapper({
    $type: 'pub.leaflet.blocks.orderedList',
    children,
  });
}

function convertOrderedListItems(token) {
  return token.items.map(item => ({
    $type: 'pub.leaflet.blocks.orderedList#listItem',
    content: convertListItemContent(item),
  }));
}

// --- Main conversion function ---

export function markdownToLeaflet(markdown) {
  const processed = preprocessMarkdown(markdown);
  const tokens = marked.lexer(processed);
  const blocks = convertTokensToBlocks(tokens);

  return {
    $type: 'pub.leaflet.content',
    pages: [{
      id: crypto.randomUUID(),
      $type: 'pub.leaflet.pages.linearDocument',
      blocks,
    }],
  };
}
