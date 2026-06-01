// src/components/content-blocks/QuizBlock.tsx
import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import type { QuizBlock as QuizBlockType } from '@/types/curriculum';

interface QuizBlockProps {
  block: QuizBlockType;
  quizIndex: number;
  savedAnswer?: number;
  onSelectAnswer?: (selectedOption: number) => void;
}

export function QuizBlock({ block, quizIndex, savedAnswer, onSelectAnswer }: QuizBlockProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(
    savedAnswer !== undefined ? savedAnswer : null
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(savedAnswer !== undefined);

  // Sync state if savedAnswer changes from prop
  useEffect(() => {
    if (savedAnswer !== undefined) {
      setSelectedOption(savedAnswer);
      setIsSubmitted(true);
    } else {
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  }, [savedAnswer]);

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return; // Cannot change selection after submitting
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (onSelectAnswer) {
      onSelectAnswer(selectedOption);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (onSelectAnswer) {
      // Clear saved progress for this question
      onSelectAnswer(-1); // -1 triggers clear/retry
    }
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const isCorrect = selectedOption === block.correct;

  return (
    <div className="flex flex-col my-6 p-5 bg-bg-card border border-border rounded-xl shadow-xs transition-all duration-300 animate-fade-in">
      {/* Quiz Title & Header */}
      <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-border-light">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 border border-accent/25 text-[10px] font-bold text-accent font-mono">
          Q{quizIndex + 1}
        </span>
        <h4 className="text-xs font-bold uppercase tracking-wider text-text-sec">
          Câu Hỏi Ôn Tập
        </h4>
      </div>

      {/* Question Text */}
      <p className="text-sm font-semibold text-text-pri leading-relaxed mb-4">
        {block.question}
      </p>

      {/* Options List */}
      <div className="flex flex-col gap-2.5 mb-4">
        {block.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isOptionCorrect = idx === block.correct;

          // Determine option styling classes based on state
          let optionStyle = 'border-border bg-bg-secondary/40 text-text-pri hover:border-accent/40 hover:bg-accent/5';
          let badgeStyle = 'bg-bg-secondary text-text-sec border-border';

          if (isSelected) {
            optionStyle = 'border-accent bg-accent/10 text-text-pri font-semibold shadow-glow-cyan-sm';
            badgeStyle = 'bg-accent text-black border-accent';
          }

          if (isSubmitted) {
            if (isOptionCorrect) {
              // Highlight correct answer in green
              optionStyle = 'border-mika-success bg-mika-success/10 text-text-pri';
              badgeStyle = 'bg-mika-success text-black border-mika-success';
            } else if (isSelected && !isOptionCorrect) {
              // Highlight incorrect user choice in red
              optionStyle = 'border-mika-error bg-mika-error/10 text-text-pri';
              badgeStyle = 'bg-mika-error text-white border-mika-error';
            } else {
              // Non-selected incorrect options are muted/disabled
              optionStyle = 'border-border bg-bg-secondary/20 text-text-muted opacity-60';
              badgeStyle = 'bg-bg-secondary/40 text-text-muted border-border-light';
            }
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleSelectOption(idx)}
              className={`flex items-center gap-3 w-full p-3 text-left text-xs font-medium border rounded-lg transition-all active:scale-[0.99] group ${optionStyle}`}
            >
              <span className={`w-6 h-6 rounded-md border flex items-center justify-center font-mono font-bold text-xs transition-colors ${badgeStyle}`}>
                {optionLabels[idx]}
              </span>
              <span className="flex-1 leading-relaxed">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Actions and Explanation */}
      <div className="flex flex-col gap-4">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              selectedOption === null
                ? 'bg-bg-secondary text-text-muted border border-border cursor-not-allowed opacity-60'
                : 'bg-accent hover:bg-accent-hover text-black shadow-glow-cyan'
            }`}
          >
            Kiểm tra đáp án
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Answer Feedback Banner */}
            <div className={`flex items-start gap-3 p-3.5 rounded-lg border text-xs leading-relaxed ${
              isCorrect
                ? 'bg-mika-success/10 border-mika-success/30 text-text-primary'
                : 'bg-mika-error/10 border-mika-error/30 text-text-primary'
            }`}>
              <div className="flex-shrink-0 mt-0.5">
                {isCorrect ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-mika-success" />
                ) : (
                  <XCircle className="w-4.5 h-4.5 text-mika-error" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className={`font-bold ${isCorrect ? 'text-mika-success dark:text-mika-success' : 'text-mika-error dark:text-mika-error'}`}>
                  {isCorrect ? 'Chính xác! Đáp án đúng.' : 'Chưa chính xác rồi!'}
                </span>
                <span className="text-text-sec text-[11px] leading-relaxed">
                  {block.explanation}
                </span>
              </div>
            </div>

            {/* Retry option button */}
            <button
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 py-2 w-full rounded-lg text-xs font-semibold text-text-sec border border-border bg-bg-secondary/40 hover:bg-bg-secondary transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Thử lại câu này</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
