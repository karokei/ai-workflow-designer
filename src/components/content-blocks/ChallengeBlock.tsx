// src/components/content-blocks/ChallengeBlock.tsx
import { useState, useEffect } from 'react';
import type { ChallengeBlock as ChallengeBlockType } from '@/types/curriculum';
import type { ChallengeResult } from '@/types/progress';
import { parseMarkdownLite } from '@/utils/markdown-lite';
import { gradeChallenge } from '@/services/ai';
import { 
  Play, 
  Sparkles, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  Code
} from 'lucide-react';
import { useMikaDialog } from '@/hooks/useMikaDialog';

interface ChallengeBlockProps {
  block: ChallengeBlockType;
  savedResult: ChallengeResult | undefined;
  onSaveResult: (result: ChallengeResult) => Promise<void>;
}

export function ChallengeBlock({
  block,
  savedResult,
  onSaveResult,
}: ChallengeBlockProps) {
  const { showMikaConfirm, showMikaAlert } = useMikaDialog();
  const [code, setCode] = useState<string>(block.initialCode);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showReference, setShowReference] = useState<boolean>(false);

  // Sync state if savedResult changes
  useEffect(() => {
    if (savedResult) {
      setCode(savedResult.codeAnswer);
    } else {
      setCode(block.initialCode);
    }
  }, [savedResult, block.initialCode]);

  const handleReset = async () => {
    const approved = await showMikaConfirm(
      "Đặt lại mã nguồn",
      "Bạn có chắc chắn muốn đặt lại mã nguồn về trạng thái ban đầu?"
    );
    if (approved) {
      setCode(block.initialCode);
    }
  };

  const handleGrade = async () => {
    if (!code.trim()) {
      await showMikaAlert(
        "Nhập lời giải",
        "Vui lòng nhập lời giải trước khi gửi chấm điểm!"
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await gradeChallenge(code, block);
      await onSaveResult(result);
    } catch (err: any) {
      await showMikaAlert(
        "Lỗi chấm điểm",
        err instanceof Error ? err.message : "Có lỗi xảy ra khi chấm điểm AI."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getLanguageLabel = (lang: string) => {
    const labels: Record<string, string> = {
      prompt: 'System Prompt Template',
      javascript: 'n8n JavaScript Node',
      python: 'Python Scripting',
      sql: 'PostgreSQL Query',
    };
    return labels[lang] || lang.toUpperCase();
  };

  return (
    <div className="flex flex-col gap-4 bg-bg-card border border-border p-5 rounded-2xl shadow-xs mt-3 select-text">
      {/* Challenge Title Banner */}
      <div className="flex items-center justify-between border-b border-border-light pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <h4 className="text-xs font-bold text-text-primary tracking-tight">
            Thách thức thực chiến: {block.title}
          </h4>
        </div>
        <span className="text-[9px] font-bold font-mono px-2 py-0.5 border border-accent/20 bg-accent/5 text-accent rounded">
          {getLanguageLabel(block.language)}
        </span>
      </div>

      {/* Challenge Question Prompt */}
      <div 
        className="text-xs leading-relaxed text-text-secondary select-text overflow-y-auto max-h-[250px] bg-bg-secondary/20 p-4 border border-border-light rounded-xl font-sans"
        dangerouslySetInnerHTML={{ __html: parseMarkdownLite(block.question) }}
      />

      {/* Interactive Editor Window */}
      <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-slate-900 shadow-sm relative group">
        {/* Editor Top Control Header */}
        <div className="h-9 bg-slate-950 px-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] font-mono text-slate-400 font-semibold ml-2 flex items-center gap-1">
              <Code className="w-3.5 h-3.5 text-slate-500" />
              solution.{block.language === "prompt" ? "txt" : block.language === "javascript" ? "js" : block.language === "python" ? "py" : "sql"}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[9px] font-bold font-mono text-slate-400 hover:text-rose-400 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
        </div>

        {/* Text Area Code Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={block.language === "prompt" ? "Hãy soạn thảo System Prompt của bạn tại đây..." : "Hãy viết mã nguồn giải thuật tại đây..."}
          rows={7}
          className="w-full p-4 bg-slate-900 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none border-none resize-y selection:bg-accent/20 selection:text-white"
        />
      </div>

      {/* Editor Action Buttons */}
      <div className="flex items-center justify-between border-t border-border-light pt-3 mt-1">
        <div className="flex gap-2">
          {savedResult && (
            <button
              onClick={() => setShowReference(!showReference)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-card hover:bg-bg-secondary text-[11px] font-semibold text-text-primary transition-all active:scale-95 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-text-muted" />
              <span>{showReference ? "Ẩn đáp án" : "Xem đáp án mẫu"}</span>
            </button>
          )}
        </div>

        <button
          disabled={isLoading}
          onClick={handleGrade}
          className={`flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-bold active:scale-95 transition-all focus:outline-none ${
            isLoading 
              ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed border-none' 
              : 'bg-accent hover:bg-accent-hover text-black shadow-glow-cyan'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-slate-400/40 border-t-slate-400 rounded-full animate-spin" />
              <span>AI đang chấm bài...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-black stroke-none animate-pulse" />
              <span>Chạy thử & Chấm điểm</span>
            </>
          )}
        </button>
      </div>

      {/* AI Judge Loading Neon Overlay (Premium UX) */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-accent/20 bg-accent/5 rounded-xl animate-pulse mt-2 transition-all">
          <div className="relative w-12 h-12 mb-3">
            <div className="absolute inset-0 rounded-full border-3 border-t-transparent animate-spin" style={{ borderColor: 'var(--mika-cyan-glow)', borderTopColor: 'var(--mika-cyan)' }} />
          </div>
          <span className="text-[10px] font-bold font-mono tracking-widest text-accent uppercase">
            AI Agent is Auditing your work...
          </span>
        </div>
      )}

      {/* Reference Answer Drawer */}
      {showReference && savedResult && (
        <div className="flex flex-col gap-2 p-4 bg-bg-secondary/40 border border-border rounded-xl animate-fade-in mt-1 select-text">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">💡 Lời giải tham khảo chuyên gia:</span>
          <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-[10px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap select-text">
            {block.referenceAnswer}
          </pre>
        </div>
      )}

      {/* AI Critique feedback Card Result */}
      {savedResult && !isLoading && (
        <div className={`p-5 border rounded-xl flex flex-col md:flex-row gap-5 items-start justify-between mt-2 shadow-xs transition-all animate-fade-in ${
          savedResult.status === "pass"
            ? 'border-emerald-600/20 bg-emerald-500/5 dark:bg-emerald-950/5'
            : 'border-amber-600/20 bg-amber-500/5 dark:bg-amber-950/5'
        }`}>
          {/* Critique content blocks */}
          <div className="flex-1 min-w-0">
            <div 
              className="text-xs leading-relaxed text-text-secondary select-text font-sans"
              dangerouslySetInnerHTML={{ __html: parseMarkdownLite(savedResult.feedback) }}
            />
            <span className="text-[9px] text-text-muted font-mono block mt-3.5">
              Đánh giá lần cuối lúc: {new Date(savedResult.gradedAt).toLocaleTimeString()} hằng ngày
            </span>
          </div>

          {/* Score Badge */}
          <div className="flex flex-col items-center justify-center bg-bg-card border border-border p-4.5 rounded-2xl w-full md:w-32 flex-shrink-0 text-center shadow-xs">
            <span className="text-[9px] font-bold uppercase text-text-muted tracking-wider block mb-1">Kết Quả</span>
            {savedResult.status === "pass" ? (
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>ĐẠT</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>CẢI THIỆN</span>
              </div>
            )}
            
            {/* Glowing gauge style circle */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="absolute w-full h-full rotate-270">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  className="stroke-border fill-transparent"
                  strokeWidth="4"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  className="fill-transparent transition-all duration-1000"
                  strokeWidth="4"
                  strokeDasharray="163"
                  strokeDashoffset={163 - (163 * savedResult.score) / 100}
                  style={{ stroke: savedResult.status === "pass" ? "#10b981" : "#f59e0b" }}
                />
              </svg>
              <span className="text-sm font-extrabold font-mono text-text-primary z-10">{savedResult.score}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
