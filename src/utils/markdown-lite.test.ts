// src/utils/markdown-lite.test.ts
// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { parseMarkdownLite } from './markdown-lite';

describe('parseMarkdownLite', () => {
  it('should parse bold syntax correctly', () => {
    const input = 'This is **bold** text';
    const expected = 'This is <strong>bold</strong> text';
    expect(parseMarkdownLite(input)).toBe(expected);
  });

  it('should parse italic syntax correctly', () => {
    const input = 'This is *italic* text';
    const expected = 'This is <em>italic</em> text';
    expect(parseMarkdownLite(input)).toBe(expected);
  });

  it('should parse inline code correctly', () => {
    const input = 'Use `console.log` to print';
    const expected = 'Use <code class="px-1.5 py-0.5 rounded bg-bg-secondary text-text-primary font-mono text-xs border border-border">console.log</code> to print';
    expect(parseMarkdownLite(input)).toBe(expected);
  });

  it('should parse markdown links to safe HTML anchors', () => {
    const input = 'Check out [Google](https://google.com) now';
    const expected = 'Check out <a href="https://google.com" class="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Google</a> now';
    expect(parseMarkdownLite(input)).toBe(expected);
  });

  it('should sanitize and strip malicious javascript protocols from links', () => {
    const input = 'Click [here](javascript:alert(1)) to play';
    const result = parseMarkdownLite(input);
    expect(result).not.toContain('javascript:');
    expect(result).toContain('here');
  });
});
