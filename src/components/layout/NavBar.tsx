// src/components/layout/NavBar.tsx — Mika Design System v1.0
// NavBar: Space Mono logo · Cyan accent · Near-black glassmorphism
import { Sun, Moon, Play, Pause, RotateCcw, Award } from 'lucide-react';
import type { UserProgress } from '@/types/progress';
import { CURRICULUM } from '@/data/curriculum';

interface NavBarProps {
  currentView: 'curriculum' | 'overview' | 'search' | 'sandbox';
  setCurrentView: (view: 'curriculum' | 'overview' | 'search' | 'sandbox') => void;
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
  const totalLessons = CURRICULUM.reduce(
    (sum, phase) => sum + phase.modules.reduce((mSum, m) => mSum + m.lessons.length, 0),
    0
  );
  const completedCount = Object.keys(progress.completedLessons).filter(
    (id) => progress.completedLessons[id]
  ).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const tabs = [
    { id: 'overview',    label: '🗺 Lộ trình' },
    { id: 'curriculum',  label: '📚 Học tập' },
    { id: 'search',      label: '🔍 Tìm kiếm' },
    { id: 'sandbox',     label: '⚡ Giả lập' },
  ] as const;

  return (
    /**
     * Mika NavBar spec:
     * - height: 60px  (using 64px for touch target)
     * - background: rgba(10, 10, 15, 0.85) + backdrop-blur
     * - border-bottom: 1px solid var(--mika-border) = #1E1E2E
     * - sticky top-0 z-100
     */
    <nav className="hidden lg:flex sticky top-0 z-50 w-full h-[60px] px-8 items-center justify-between border-b border-[var(--border)] transition-colors duration-300"
      style={{
        background: isDark
          ? 'rgba(10, 10, 15, 0.88)'
          : 'rgba(244, 246, 250, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* ── Mika Brand Logo ──
          Spec: Space Mono Bold · Cyan #00D4FF · letter-spacing 2px
      */}
      <div className="flex items-center gap-3 select-none">
        {/* Icon Mark [AI] — cyan glow on dark */}
        <div
          className="flex items-center justify-center w-9 h-9 rounded-r-md rounded-l-sm border pulse-glow"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(65,105,225,0.15))',
            borderColor: 'var(--mika-cyan)',
            boxShadow: isDark ? '0 0 12px rgba(0,212,255,0.3)' : 'none',
          }}
        >
          <span
            className="text-xs font-bold"
            style={{ fontFamily: '"Space Mono", monospace', color: 'var(--mika-cyan)', letterSpacing: '1px' }}
          >
            AI
          </span>
        </div>

        {/* Brand name — Space Mono */}
        <div className="flex flex-col">
          <span
            className="text-sm font-bold leading-tight"
            style={{
              fontFamily: '"Space Mono", monospace',
              color: isDark ? '#00D4FF' : '#008099',
              letterSpacing: '1px',
            }}
          >
            AI WORKFLOW
          </span>
          <span className="text-[9px] text-text-muted tracking-widest uppercase font-semibold">
            Interactive Academy
          </span>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div
        className="flex items-center gap-0.5 p-1 rounded-r-md rounded-l-sm border"
        style={{
          background: isDark ? 'rgba(17, 17, 24, 0.8)' : 'rgba(238, 241, 248, 0.8)',
          borderColor: 'var(--border)',
        }}
      >
        {tabs.map(({ id, label }) => {
          const active = currentView === id;
          return (
            <button
              key={id}
              onClick={() => setCurrentView(id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-r-sm rounded-l-xs text-xs font-semibold transition-all duration-200"
              style={active ? {
                background: 'var(--mika-cyan)',
                color: '#000',                        /* Mika spec: dark text on cyan */
                boxShadow: '0 0 12px rgba(0, 212, 255, 0.35)',
                fontFamily: '"Be Vietnam Pro", Inter, sans-serif',
              } : {
                color: 'var(--text-secondary)',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                  (e.currentTarget as HTMLButtonElement).style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Widgets & Controls ── */}
      <div className="flex items-center gap-3">
        {/* Progress pill */}
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full text-xs border"
          style={{
            background: isDark ? 'rgba(17,17,24,0.6)' : 'rgba(238,241,248,0.6)',
            borderColor: 'var(--border)',
          }}
        >
          <Award className="w-3.5 h-3.5" style={{ color: 'var(--mika-cyan)' }} />
          <span className="font-semibold text-text-secondary">{progressPercent}% Hoàn thành</span>
          {/* Mika: cyan progress bar */}
          <div className="w-14 h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, var(--mika-cyan-hover), var(--mika-cyan))',
              }}
            />
          </div>
        </div>

        {/* Study Timer */}
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full border"
          style={{
            background: isDark ? 'rgba(17,17,24,0.6)' : 'rgba(238,241,248,0.6)',
            borderColor: 'var(--border)',
          }}
        >
          <span
            className="font-mono text-xs"
            style={{ color: timerRunning ? 'var(--mika-cyan)' : 'var(--text-secondary)', fontWeight: timerRunning ? 600 : 400 }}
          >
            ⏱ {timerFormatted}
          </span>
          <div className="flex items-center gap-0.5 border-l pl-2" style={{ borderColor: 'var(--border)' }}>
            {timerRunning ? (
              <button
                onClick={pauseTimer}
                title="Tạm dừng"
                className="p-1 rounded transition-colors text-text-secondary hover:text-text-primary"
                style={{ ['--tw-hover-bg' as string]: 'var(--bg-secondary)' }}
              >
                <Pause className="w-3 h-3" />
              </button>
            ) : (
              <button
                onClick={startTimer}
                title="Bắt đầu học"
                className="p-1 rounded transition-colors text-text-secondary"
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--mika-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Play className="w-3 h-3" />
              </button>
            )}
            {timerSeconds > 0 && (
              <button
                onClick={resetTimer}
                title="Đặt lại"
                className="p-1 rounded transition-colors text-text-secondary"
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--mika-error)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-r-md rounded-l-sm border transition-all duration-200 text-text-secondary"
          aria-label="Chuyển chế độ giao diện"
          style={{ borderColor: 'var(--border)', background: 'transparent' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-secondary)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
          }}
        >
          {isDark
            ? <Sun className="w-4 h-4" style={{ color: 'var(--mika-warning)' }} />
            : <Moon className="w-4 h-4" style={{ color: 'var(--mika-blue)' }} />
          }
        </button>
      </div>
    </nav>
  );
}
