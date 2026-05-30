// src/components/curriculum/ContentBlockRenderer.tsx
import { parseMarkdownLite } from '@/utils/markdown-lite';
import { CodeBlock } from '@/components/content-blocks/CodeBlock';
import { QuizBlock } from '@/components/content-blocks/QuizBlock';
import { Info, AlertTriangle, Lightbulb, AlertOctagon, Bookmark, CheckSquare, Square } from 'lucide-react';
import type { ContentBlock } from '@/types/curriculum';

interface ContentBlockRendererProps {
  block: ContentBlock;
  lessonId: string;
  quizIndex?: number;
  savedQuizAnswer?: number;
  onSelectQuizAnswer?: (answerIndex: number) => void;
  savedChecklistState?: boolean[];
  onSelectChecklistItem?: (index: number) => void;
}

export function ContentBlockRenderer({
  block,
  lessonId: _lessonId,
  quizIndex = 0,
  savedQuizAnswer,
  onSelectQuizAnswer,
  savedChecklistState = [],
  onSelectChecklistItem,
}: ContentBlockRendererProps) {
  
  if (block.type === 'text') {
    return (
      <p
        className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: parseMarkdownLite(block.content) }}
      />
    );
  }

  if (block.type === 'heading') {
    if (block.level === 2) {
      return (
        <h3 className="text-sm sm:text-base font-bold text-text-primary mt-6 mb-3 pb-1 border-b border-border">
          {block.content}
        </h3>
      );
    }
    return (
      <h4 className="text-xs sm:text-sm font-semibold text-text-primary mt-4 mb-2">
        {block.content}
      </h4>
    );
  }

  if (block.type === 'bullets') {
    return (
      <ul className="list-none pl-1 flex flex-col gap-2 mb-4">
        {block.items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
            <span className="text-mika-p500 font-bold mt-0.5">•</span>
            <span dangerouslySetInnerHTML={{ __html: parseMarkdownLite(item) }} />
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === 'numbered') {
    return (
      <ol className="list-none pl-1 flex flex-col gap-2.5 mb-4">
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

  if (block.type === 'divider') {
    return <hr className="my-6 border-t border-border" />;
  }

  if (block.type === 'code') {
    return <CodeBlock block={block} />;
  }

  if (block.type === 'quiz') {
    return (
      <QuizBlock
        block={block}
        quizIndex={quizIndex}
        savedAnswer={savedQuizAnswer}
        onSelectAnswer={onSelectQuizAnswer}
      />
    );
  }

  if (block.type === 'callout') {
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
        <p className="text-text-secondary leading-relaxed">{block.content}</p>
      </div>
    );
  }

  if (block.type === 'checklist') {
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
                <span className="flex-shrink-0 mt-0.5 text-mika-p600">
                  {isChecked ? (
                    <CheckSquare className="w-4.5 h-4.5 text-mika-a600" />
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

  if (block.type === 'steps') {
    return (
      <div className="flex flex-col my-6 animate-fade-in">
        {block.title && (
          <h4 className="text-xs sm:text-sm font-bold text-text-primary mb-5">
            {block.title}
          </h4>
        )}
        <div className="flex flex-col relative pl-2">
          {/* Timeline connecting line */}
          <div className="absolute top-4 bottom-4 left-6 w-[2px] bg-dashed border-l-2 border-dashed border-border pointer-events-none" />

          {block.steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 pb-6 last:pb-2 relative z-10 group">
              {/* Step indicator circle */}
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-bg-card border-2 border-mika-p500 text-mika-p600 dark:text-mika-p400 font-mono text-xs font-bold shadow-xs">
                {step.number || idx + 1}
              </div>

              {/* Step content */}
              <div className="flex-1 flex flex-col pt-0.5">
                <h5 className="text-xs sm:text-sm font-bold text-text-primary mb-1">
                  {step.title}
                </h5>
                <p className="text-xs text-text-secondary leading-relaxed mb-3">
                  {step.description}
                </p>

                {step.code && (
                  <CodeBlock
                    block={{
                      type: 'code',
                      language: step.language || 'javascript',
                      content: step.code,
                      filename: step.title
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'table') {
    return (
      <div className="my-5 border border-border rounded-xl overflow-hidden shadow-xs w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-bg-secondary border-b border-border text-[10px] font-bold text-text-primary uppercase tracking-wider">
                {block.headers.map((hdr, idx) => (
                  <th key={idx} className="p-3 sm:p-4 font-semibold">
                    {hdr}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {block.rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-bg-secondary/30 even:bg-bg-secondary/10 transition-colors"
                >
                  {row.map((col, colIdx) => (
                    <td key={colIdx} className="p-3 sm:p-4 text-text-secondary font-medium leading-relaxed">
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <p className="text-xs sm:text-sm text-text-muted italic my-2">
      [Khối nội dung {(block as any).type} chưa được hỗ trợ hiển thị]
    </p>
  );
}
