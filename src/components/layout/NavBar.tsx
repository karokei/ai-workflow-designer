// src/components/layout/NavBar.tsx
import { Sun, Moon, Play, Pause, RotateCcw, Award } from 'lucide-react';
import type { UserProgress } from '@/types/progress';
import { CURRICULUM } from '@/data/curriculum';

interface NavBarProps {
  currentView: 'curriculum' | 'overview' | 'search';
  setCurrentView: (view: 'curriculum' | 'overview' | 'search') => void;
  isDark: boolean;
  toggleTheme: () => void;
  progress: UserProgress;
  timerSeconds: number;
  timerFormatted: string;
  timerRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export function NavBar({
  currentView,
  setCurrentView,
  isDark,
  toggleTheme,
  progress,
  timerSeconds,
  timerFormatted,
  timerRunning,
  startTimer,
  pauseTimer,
  resetTimer,
}: NavBarProps) {
  // Calculate global progress percent
  const totalLessons = CURRICULUM.reduce(
    (sum, phase) => sum + phase.modules.reduce((mSum, m) => mSum + m.lessons.length, 0),
    0
  );
  const completedCount = Object.keys(progress.completedLessons).filter(
    (id) => progress.completedLessons[id]
  ).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <nav className="hidden lg:flex sticky top-0 z-50 w-full h-[60px] px-6 items-center justify-between bg-bg-card/85 backdrop-blur-md border-b border-border shadow-xs transition-colors duration-300">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-mika-p600 text-white font-mono font-bold shadow-[0_0_12px_rgba(79,70,229,0.3)] pulse-glow">
          AI
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-text-pri tracking-tight">AI Workflow Designer</span>
          <span className="text-[10px] text-text-sec">Interactive Academy</span>
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="flex items-center gap-1 bg-bg-secondary p-1 rounded-r-md border border-border-light">
        <button
          onClick={() => setCurrentView('overview')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-r-sm text-xs font-medium transition-all duration-200 ${
            currentView === 'overview'
              ? 'bg-mika-p600 text-white shadow-sm'
              : 'text-text-sec hover:text-text-pri hover:bg-bg-card/50'
          }`}
        >
          🗺 Lộ trình
        </button>
        <button
          onClick={() => setCurrentView('curriculum')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-r-sm text-xs font-medium transition-all duration-200 ${
            currentView === 'curriculum'
              ? 'bg-mika-p600 text-white shadow-sm'
              : 'text-text-sec hover:text-text-pri hover:bg-bg-card/50'
          }`}
        >
          📚 Học tập
        </button>
        <button
          onClick={() => setCurrentView('search')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-r-sm text-xs font-medium transition-all duration-200 ${
            currentView === 'search'
              ? 'bg-mika-p600 text-white shadow-sm'
              : 'text-text-sec hover:text-text-pri hover:bg-bg-card/50'
          }`}
        >
          🔍 Tìm kiếm
        </button>
      </div>

      {/* Widgets & Controls */}
      <div className="flex items-center gap-4">
        {/* Progress Pill */}
        <div className="flex items-center gap-2 bg-bg-secondary/60 border border-border-light px-3 py-1 rounded-full text-xs">
          <Award className="w-3.5 h-3.5 text-mika-a600" />
          <span className="font-semibold text-text-pri">{progressPercent}% Hoàn thành</span>
          <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-mika-a600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Study Timer widget */}
        <div className="flex items-center gap-2 bg-bg-secondary/60 border border-border-light px-3 py-1 rounded-full">
          <span className={`font-mono text-xs ${timerRunning ? 'text-mika-p600 font-semibold' : 'text-text-sec'}`}>
            ⏱ {timerFormatted}
          </span>
          <div className="flex items-center gap-1 border-l border-border-light pl-2">
            {timerRunning ? (
              <button
                onClick={pauseTimer}
                title="Tạm dừng"
                className="p-1 hover:bg-bg-secondary rounded text-text-sec hover:text-text-pri transition-colors"
              >
                <Pause className="w-3 h-3" />
              </button>
            ) : (
              <button
                onClick={startTimer}
                title="Bắt đầu học"
                className="p-1 hover:bg-bg-secondary rounded text-text-sec hover:text-mika-p600 transition-colors"
              >
                <Play className="w-3 h-3" />
              </button>
            )}
            {timerSeconds > 0 && (
              <button
                onClick={resetTimer}
                title="Đặt lại"
                className="p-1 hover:bg-bg-secondary rounded text-text-sec hover:text-mika-r600 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-r-md border border-border hover:bg-bg-secondary text-text-sec hover:text-text-pri transition-all duration-200"
          aria-label="Chuyển chế độ giao diện"
        >
          {isDark ? <Sun className="w-4 h-4 text-mika-am600" /> : <Moon className="w-4 h-4 text-mika-p600" />}
        </button>
      </div>
    </nav>
  );
}
