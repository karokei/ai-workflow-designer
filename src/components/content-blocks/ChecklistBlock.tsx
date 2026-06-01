// src/components/content-blocks/ChecklistBlock.tsx
import { CheckSquare, Square } from 'lucide-react';
import type { ChecklistBlock as ChecklistBlockType } from '@/types/curriculum';
import { parseMarkdownLite } from '@/utils/markdown-lite';

interface ChecklistBlockProps {
  block: ChecklistBlockType;
  savedChecklistState?: boolean[];
  onSelectChecklistItem?: (index: number) => void;
}

export function ChecklistBlock({
  block,
  savedChecklistState = [],
  onSelectChecklistItem,
}: ChecklistBlockProps) {
  return (
    <div className="flex flex-col my-5 bg-bg-secondary/40 border border-border rounded-xl p-4 sm:p-5 animate-fade-in">
      {block.title && (
        <h4 className="text-xs sm:text-sm font-bold text-text-primary mb-3 pb-1 border-b border-border">
          {block.title}
        </h4>
      )}
      <div className="flex flex-col gap-3">
        {block.items.map((item, idx) => {
          const isChecked = savedChecklistState[idx] || false;
          return (
            <button
              key={idx}
              onClick={() => onSelectChecklistItem && onSelectChecklistItem(idx)}
              className="flex items-start gap-3 text-left w-full hover:bg-bg-secondary/50 p-2 rounded-lg transition-colors cursor-pointer select-none"
            >
              <span className="flex-shrink-0 mt-0.5 text-accent">
                {isChecked ? (
                  <CheckSquare className="w-4.5 h-4.5 text-mika-success" />
                ) : (
                  <Square className="w-4.5 h-4.5 text-text-muted" />
                )}
              </span>
              <span
                className={`text-xs sm:text-sm leading-relaxed transition-all ${
                  isChecked ? 'text-text-muted line-through opacity-70' : 'text-text-secondary font-medium'
                }`}
                dangerouslySetInnerHTML={{ __html: parseMarkdownLite(item) }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
