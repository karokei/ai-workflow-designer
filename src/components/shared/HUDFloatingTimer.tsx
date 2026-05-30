// src/components/shared/HUDFloatingTimer.tsx
import { useState, useRef } from 'react';
import { Timer, Pause } from 'lucide-react';

interface HUDFloatingTimerProps {
  timerFormatted: string;
  timerRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export function HUDFloatingTimer({
  timerFormatted,
  timerRunning,
  startTimer,
  pauseTimer,
  resetTimer,
}: HUDFloatingTimerProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const longPressTimerRef = useRef<number | null>(null);

  const handleTouchStart = () => {
    // Start long press detection
    longPressTimerRef.current = window.setTimeout(() => {
      resetTimer();
      // Simple haptic feedback simulation or visual notification
      alert("Đã đặt lại đồng hồ học tập!");
    }, 1000); // 1 second long press to reset
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current !== null) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
      
      // If it wasn't a long press, toggle play/pause
      if (timerRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    }
  };

  return (
    <div className="lg:hidden fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2">
      {/* Time Tooltip Bubble */}
      {(showTooltip || timerRunning) && (
        <div className="px-3 py-1 text-[11px] font-mono font-bold text-text-pri bg-bg-card/90 border border-mika-p500/30 rounded-lg shadow-[0_0_10px_rgba(99,102,241,0.2)] animate-pulse">
          {timerFormatted}
        </div>
      )}

      {/* Floating HUD Button */}
      <button
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`w-12 h-12 rounded-full flex items-center justify-center bg-bg-card/90 border transition-all duration-300 shadow-md ${
          timerRunning
            ? 'border-mika-p500 text-mika-p500 shadow-[0_0_15px_rgba(99,102,241,0.4)] animate-pulse'
            : 'border-border text-text-sec hover:text-text-pri hover:bg-bg-secondary'
        }`}
        aria-label="Study Timer Floating Control"
      >
        {timerRunning ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Timer className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
