// src/components/content-blocks/ListBlock.tsx
import type { BulletBlock, NumberedBlock } from '@/types/curriculum';
import { parseMarkdownLite } from '@/utils/markdown-lite';

interface ListBlockProps {
  block: BulletBlock | NumberedBlock;
}

export function ListBlock({ block }: ListBlockProps) {
  if (block.type === 'bullets') {
    return (
      <ul className="list-none pl-1 flex flex-col gap-2 mb-4 animate-fade-in">
        {block.items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
            <span className="text-accent font-bold mt-0.5">•</span>
            <span dangerouslySetInnerHTML={{ __html: parseMarkdownLite(item) }} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ol className="list-none pl-1 flex flex-col gap-2.5 mb-4 animate-fade-in">
      {block.items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
          <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded bg-bg-secondary text-text-secondary border border-border font-mono text-[10px] font-bold">
            {idx + 1}
          </span>
          <span className="mt-0.5" dangerouslySetInnerHTML={{ __html: parseMarkdownLite(item) }} />
        </li>
      ))}
    </ol>
  );
}
