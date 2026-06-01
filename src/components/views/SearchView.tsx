// src/components/views/SearchView.tsx
import { useState, useEffect, useRef, useMemo } from 'react';
import type { UserProgress } from '@/types/progress';
import { CURRICULUM } from '@/data/curriculum';
import { Search, ChevronRight, FileText } from 'lucide-react';

interface SearchViewProps {
  progress: UserProgress;
  onSelectLesson: (phaseId: number, lessonId: string) => void;
}

interface SearchResult {
  phaseId: number;
  phaseTitle: string;
  moduleId: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  lessonSummary: string;
  lessonDuration: string;
  lessonType: string;
}

export function SearchView({ progress, onSelectLesson }: SearchViewProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce query input by 200ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(handler);
  }, [query]);

  // Autofocus input on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Compute search results via useMemo to avoid state synchronization side-effects
  const results = useMemo(() => {
    if (debouncedQuery.trim() === '') {
      return [];
    }

    const keyword = debouncedQuery.toLowerCase().trim();
    const matches: SearchResult[] = [];

    CURRICULUM.forEach((phase) => {
      phase.modules.forEach((mod) => {
        mod.lessons.forEach((lesson) => {
          // Check: title, summary, content text blocks, and personal notes
          const noteText = progress.lessonNotes[lesson.id] || '';
          
          const contentText = lesson.content
            .map((b) => {
              if (b.type === 'text' || b.type === 'heading') return b.content;
              if (b.type === 'bullets' || b.type === 'numbered') return b.items.join(' ');
              if (b.type === 'callout') return `${b.title || ''} ${b.content}`;
              if (b.type === 'code') return `${b.filename || ''} ${b.content}`;
              if (b.type === 'quiz') return `${b.question} ${b.options.join(' ')} ${b.explanation}`;
              if (b.type === 'steps') return b.steps.map(s => `${s.title} ${s.description}`).join(' ');
              if (b.type === 'checklist') return b.items.join(' ');
              return '';
            })
            .join(' ');

          const searchTarget = [
            lesson.title,
            lesson.summary,
            contentText,
            noteText
          ].join(' ').toLowerCase();

          if (searchTarget.includes(keyword)) {
            matches.push({
              phaseId: phase.id,
              phaseTitle: phase.title,
              moduleId: mod.id,
              moduleTitle: mod.title,
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              lessonSummary: lesson.summary,
              lessonDuration: lesson.duration,
              lessonType: lesson.type,
            });
          }
        });
      });
    });

    return matches;
  }, [debouncedQuery, progress.lessonNotes]);


  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Search Input Box */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm bài học... (ví dụ: 'API', 'Webhook', 'RAG')"
          className="w-full h-11 pl-11 pr-4 text-sm rounded-lg border border-border bg-bg-card text-text-pri focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent placeholder:text-text-muted transition-all"
        />
      </div>

      {/* Results viewport */}
      <div className="flex flex-col gap-4">
        {debouncedQuery.trim() === '' ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl">
            <span className="text-3xl mb-3">🔍</span>
            <h3 className="text-sm font-semibold text-text-pri">Bắt đầu nhập để tìm kiếm</h3>
            <p className="text-xs text-text-sec mt-1 max-w-sm">
              Tìm kiếm nhanh bài học qua tiêu đề, mô tả, nội dung chi tiết hoặc ghi chú cá nhân của bạn.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl">
            <span className="text-3xl mb-3">📭</span>
            <h3 className="text-sm font-semibold text-text-pri">Không tìm thấy kết quả cho "{debouncedQuery}"</h3>
            <p className="text-xs text-text-sec mt-1 max-w-sm">
              Thử tìm kiếm với các từ khóa khác như "n8n", "Make.com", "RAG", hoặc "prompting".
            </p>
          </div>
        ) : (
          <>
            <span className="text-xs font-semibold text-text-sec px-1">
              Đã tìm thấy {results.length} bài học phù hợp:
            </span>
            <div className="flex flex-col gap-3">
              {results.map((res) => (
                <div
                  key={res.lessonId}
                  onClick={() => onSelectLesson(res.phaseId, res.lessonId)}
                  className="group flex items-center justify-between p-4 bg-bg-card border border-border hover:border-accent rounded-xl transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-bg-secondary border border-border-light flex items-center justify-center text-text-sec group-hover:text-accent transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-bold text-accent bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded">
                          Phase {res.phaseId}
                        </span>
                        <span className="text-[9px] font-semibold text-text-muted">
                          {res.moduleTitle}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-text-pri group-hover:text-accent transition-colors">
                        {res.lessonTitle}
                      </h4>
                      <p className="text-xs text-text-sec line-clamp-1">
                        {res.lessonSummary}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
