// src/components/content-blocks/CalloutBlock.tsx
import { Info, AlertTriangle, Lightbulb, AlertOctagon, Bookmark } from 'lucide-react';
import type { CalloutBlock as CalloutBlockType } from '@/types/curriculum';
import { parseMarkdownLite } from '@/utils/markdown-lite';

interface CalloutBlockProps {
  block: CalloutBlockType;
}

export function CalloutBlock({ block }: CalloutBlockProps) {
  const variantStyles = {
    info: {
      bg: 'bg-blue-50/40 dark:bg-blue-950/10',
      border: 'border-blue-500 dark:border-blue-600',
      text: 'text-blue-800 dark:text-blue-400',
      icon: <Info className="w-4 h-4 text-blue-500" />,
      defaultTitle: 'Thông tin'
    },
    warning: {
      bg: 'bg-amber-50/40 dark:bg-amber-950/10',
      border: 'border-amber-500 dark:border-amber-600',
      text: 'text-amber-800 dark:text-amber-400',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      defaultTitle: 'Cảnh báo'
    },
    tip: {
      bg: 'bg-emerald-50/40 dark:bg-emerald-950/10',
      border: 'border-emerald-500 dark:border-emerald-600',
      text: 'text-emerald-800 dark:text-emerald-400',
      icon: <Lightbulb className="w-4 h-4 text-emerald-500" />,
      defaultTitle: 'Mẹo hữu ích'
    },
    important: {
      bg: 'bg-rose-50/40 dark:bg-rose-950/10',
      border: 'border-rose-500 dark:border-rose-600',
      text: 'text-rose-800 dark:text-rose-400',
      icon: <AlertOctagon className="w-4 h-4 text-rose-500" />,
      defaultTitle: 'Quan trọng'
    },
    example: {
      bg: 'bg-purple-50/40 dark:bg-purple-950/10',
      border: 'border-purple-500 dark:border-purple-600',
      text: 'text-purple-800 dark:text-purple-400',
      icon: <Bookmark className="w-4 h-4 text-purple-500" />,
      defaultTitle: 'Ví dụ thực tiễn'
    }
  };

  const style = variantStyles[block.variant] || variantStyles.info;

  return (
    <div className={`p-4 my-4 rounded-r-xl border-l-4 ${style.bg} ${style.border} text-xs sm:text-sm animate-fade-in shadow-xs`}>
      <span className={`font-bold flex items-center gap-1.5 mb-1.5 uppercase tracking-wide text-xs ${style.text}`}>
        {style.icon}
        {block.title || style.defaultTitle}
      </span>
      <p 
        className="text-text-secondary leading-relaxed"
        dangerouslySetInnerHTML={{ __html: parseMarkdownLite(block.content) }}
      />
    </div>
  );
}
