// src/components/content-blocks/StepsBlock.tsx
import type { StepsBlock as StepsBlockType } from '@/types/curriculum';
import { CodeBlock } from './CodeBlock';

interface StepsBlockProps {
  block: StepsBlockType;
}

export function StepsBlock({ block }: StepsBlockProps) {
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
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-bg-card border-2 border-accent text-accent font-mono text-xs font-bold shadow-glow-cyan-sm">
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
