// src/utils/markdown-lite.ts
import DOMPurify from 'dompurify';

/**
 * Simple parser for custom Markdown-lite syntax:
 * - **bold** -> <strong>
 * - *italic* -> <em>
 * - `code` -> <code class="mika-code">
 * Uses DOMPurify to prevent XSS attacks when rendering.
 */
export function parseMarkdownLite(text: string): string {
  if (!text) return '';

  // 1. Escape basic HTML characters to prevent XSS before parsing custom markdown
  let parsed = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2. Parse bold **text**
  parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 3. Parse italic *text*
  parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 4. Parse inline code `code`
  parsed = parsed.replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-bg-secondary text-text-primary font-mono text-xs border border-border">$1</code>');

  // 5. Clean parsed HTML using DOMPurify
  return DOMPurify.sanitize(parsed, {
    ALLOWED_TAGS: ['strong', 'em', 'code'],
    ALLOWED_ATTR: ['class'],
  });
}
