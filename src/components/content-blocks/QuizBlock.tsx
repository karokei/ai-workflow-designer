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
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-mika-p50 dark:bg-mika-p800/10 text-[10px] font-bold text-mika-p600 dark:text-mika-p400 font-mono">
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
          let optionStyle = 'border-border bg-bg-secondary/40 text-text-pri hover:border-mika-p300 hover:bg-bg-secondary/80';
          let badgeStyle = 'bg-bg-secondary text-text-sec border-border';

          if (isSelected) {
            optionStyle = 'border-mika-p500 bg-mika-p50/30 text-text-pri';
            badgeStyle = 'bg-mika-p600 text-white border-mika-p600';
          }

          if (isSubmitted) {
            if (isOptionCorrect) {
              // Highlight correct answer in green
              optionStyle = 'border-mika-a600 bg-mika-a50/30 text-text-pri';
              badgeStyle = 'bg-mika-a600 text-white border-mika-a600';
            } else if (isSelected && !isOptionCorrect) {
              // Highlight incorrect user choice in red
              optionStyle = 'border-mika-r600 bg-mika-r50/30 text-text-pri';
              badgeStyle = 'bg-mika-r600 text-white border-mika-r600';
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
            className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
              selectedOption === null
                ? 'bg-bg-secondary text-text-muted border border-border cursor-not-allowed opacity-60'
                : 'bg-mika-p600 hover:bg-mika-p700 text-white'
            }`}
          >
            Kiểm tra đáp án
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Answer Feedback Banner */}
            <div className={`flex items-start gap-3 p-3.5 rounded-lg border text-xs leading-relaxed ${
              isCorrect
                ? 'bg-mika-a50/40 border-mika-a600/30 text-text-primary'
                : 'bg-mika-r50/40 border-mika-r600/30 text-text-primary'
            }`}>
              <div className="flex-shrink-0 mt-0.5">
                {isCorrect ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-mika-a600" />
                ) : (
                  <XCircle className="w-4.5 h-4.5 text-mika-r600" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className={`font-bold ${isCorrect ? 'text-mika-a700 dark:text-mika-a500' : 'text-mika-r700 dark:text-mika-r600'}`}>
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
