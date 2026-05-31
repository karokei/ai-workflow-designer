// src/components/curriculum/ContentBlockRenderer.tsx
import { CodeBlock } from '@/components/content-blocks/CodeBlock';
import { QuizBlock } from '@/components/content-blocks/QuizBlock';
import { CalloutBlock } from '@/components/content-blocks/CalloutBlock';
import { ChecklistBlock } from '@/components/content-blocks/ChecklistBlock';
import { StepsBlock } from '@/components/content-blocks/StepsBlock';
import { TableBlock } from '@/components/content-blocks/TableBlock';
import { ListBlock } from '@/components/content-blocks/ListBlock';
import { parseMarkdownLite } from '@/utils/markdown-lite';
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

  if (block.type === 'bullets' || block.type === 'numbered') {
    return <ListBlock block={block} />;
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
    return <CalloutBlock block={block} />;
  }

  if (block.type === 'checklist') {
    return (
      <ChecklistBlock
        block={block}
        savedChecklistState={savedChecklistState}
        onSelectChecklistItem={onSelectChecklistItem}
      />
    );
  }

  if (block.type === 'steps') {
    return <StepsBlock block={block} />;
  }

  if (block.type === 'table') {
    return <TableBlock block={block} />;
  }

  return (
    <p className="text-xs sm:text-sm text-text-muted italic my-2">
      [Khối nội dung {(block as any).type} chưa được hỗ trợ hiển thị]
    </p>
  );
}
