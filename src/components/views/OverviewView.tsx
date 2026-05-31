// src/components/views/OverviewView.tsx
import React from 'react';
import type { UserProgress } from '@/types/progress';
import { CURRICULUM } from '@/data/curriculum';
import { Award, Clock, BookOpen, ChevronRight, CheckCircle } from 'lucide-react';

interface OverviewViewProps {
  progress: UserProgress;
  onSelectPhase: (phaseId: number) => void;
}

export function OverviewView({ progress, onSelectPhase }: OverviewViewProps) {
  // Aggregate stats
  const totalLessons = CURRICULUM.reduce(
    (sum, phase) => sum + phase.modules.reduce((mSum, m) => mSum + m.lessons.length, 0),
    0
  );
  const completedCount = Object.keys(progress.completedLessons).filter(
    (id) => progress.completedLessons[id]
  ).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Format cumulative hours
  const totalSeconds = progress.studyTime.totalSeconds;
  const formatStudyTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    if (hrs === 0) return `${mins} phút`;
    return `${hrs}h ${mins}m`;
  };

  // Helper to check if a Phase is locked
  const isPhaseLocked = (phaseId: number) => {
    if (phaseId === 0) return false;
    // Lock logic: Phase X is locked if Phase X-1 is not 100% completed
    const prevPhase = CURRICULUM.find(p => p.id === phaseId - 1);
    if (!prevPhase) return false;
    
    const prevLessons = prevPhase.modules.reduce((list: string[], m) => {
      m.lessons.forEach(l => list.push(l.id));
      return list;
    }, []);

    const prevCompleted = prevLessons.every(id => progress.completedLessons[id]);
    return !prevCompleted;
  };

  // Helper to calculate single phase progress percent
  const getPhaseProgress = (phaseId: number) => {
    const phase = CURRICULUM.find(p => p.id === phaseId);
    if (!phase) return 0;
    const pLessons = phase.modules.reduce((list: string[], m) => {
      m.lessons.forEach(l => list.push(l.id));
      return list;
    }, []);
    if (pLessons.length === 0) return 0;
    const pCompleted = pLessons.filter(id => progress.completedLessons[id]).length;
    return Math.round((pCompleted / pLessons.length) * 100);
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-8 pb-10 animate-fade-in">
      {/* 1. Stats HUD Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-bg-card p-5 lg:p-6 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-mika-p50 text-mika-p600 dark:bg-mika-p800/20 dark:text-mika-p400 shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Tổng bài học</span>
            <span className="text-xl font-bold text-text-primary font-mono leading-none">{totalLessons}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-mika-a50 text-mika-a600 dark:bg-mika-a700/10 dark:text-mika-a500 shadow-sm">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Đã hoàn thành</span>
            <span className="text-xl font-bold text-text-primary font-mono leading-none">{completedCount} bài</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-mika-v50 text-mika-v600 dark:bg-mika-v600/10 dark:text-mika-v600 shadow-sm">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Thời gian học</span>
            <span className="text-xl font-bold text-text-primary font-mono leading-none">{formatStudyTime(totalSeconds)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-mika-t50 text-mika-t600 dark:bg-mika-t600/10 dark:text-mika-t600 shadow-sm">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Tiến độ tổng</span>
            <span className="text-xl font-bold text-text-primary font-mono leading-none">{progressPercent}%</span>
          </div>
        </div>
      </section>

      {/* 2. Quest Roadmap Main Content */}
      <div className="w-full">
        {/* MOBILE VIEW: Duolingo-style Quest Map */}
        <section className="lg:hidden flex flex-col items-center gap-8 py-8 relative">
          {/* Zigzag Node Connector SVG Track */}
          <div className="absolute top-16 bottom-16 left-1/2 w-[2px] bg-border dark:bg-border/30 -translate-x-1/2 z-0 pointer-events-none" />

          {CURRICULUM.map((phase, idx) => {
            const locked = isPhaseLocked(phase.id);
            const pProgress = getPhaseProgress(phase.id);
            const isCompleted = pProgress === 100;
            
            // Zigzag alignment offsets
            const alignment = idx % 2 === 0 ? 'translate-x-[-30px]' : 'translate-x-[30px]';
            const nodeColor = phase.theme.color;

            return (
              <div
                key={phase.id}
                className={`flex flex-col items-center z-10 transition-all duration-300 relative ${alignment} ${
                  locked ? 'opacity-40' : 'opacity-100 hover:scale-105'
                }`}
              >
                {/* Octagonal Glowing Node Container */}
                <button
                  disabled={locked}
                  onClick={() => onSelectPhase(phase.id)}
                  style={{
                    borderColor: locked ? 'var(--border)' : nodeColor,
                    boxShadow: locked ? 'none' : `0 0 15px ${nodeColor}30`,
                  }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-bg-card border-2 relative focus:outline-none`}
                >
                  <span className="text-2xl">{phase.icon}</span>

                  {/* Circular Radial Progress Border Indicator */}
                  {!locked && (
                    <svg className="absolute -inset-1.5 w-[76px] h-[76px] -rotate-90 pointer-events-none">
                      <circle
                        cx="38"
                        cy="38"
                        r="34"
                        fill="transparent"
                        stroke="var(--border)"
                        strokeWidth="2"
                        className="opacity-30"
                      />
                      <circle
                        cx="38"
                        cy="38"
                        r="34"
                        fill="transparent"
                        stroke={nodeColor}
                        strokeWidth="2"
                        strokeDasharray={213.6}
                        strokeDashoffset={213.6 - (213.6 * pProgress) / 100}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                  )}
                </button>

                {/* Node Text Metadata */}
                <div className="flex flex-col items-center mt-3 bg-bg-card/90 border border-border px-3 py-1 rounded-full shadow-xs">
                  <span className="text-[10px] font-bold text-text-pri tracking-tight">Phase {phase.id}</span>
                  <span className="text-[9px] text-text-sec font-medium font-mono">
                    {isCompleted ? '✓ Hoàn thành' : locked ? '🔒 Khóa' : `${pProgress}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* DESKTOP VIEW: Premium Responsive Cards Grid */}
        <section className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CURRICULUM.map((phase) => {
            const locked = isPhaseLocked(phase.id);
            const pProgress = getPhaseProgress(phase.id);
            const isCompleted = pProgress === 100;
            const activeColor = phase.theme.color;

            return (
              <div
                key={phase.id}
                onClick={() => !locked && onSelectPhase(phase.id)}
                style={{
                  '--phase-color': activeColor,
                  borderColor: locked ? 'var(--border)' : 'transparent',
                } as React.CSSProperties}
                className={`group flex flex-col bg-bg-card border-2 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 relative select-none ${
                  locked
                    ? 'opacity-45 cursor-not-allowed'
                    : 'cursor-pointer hover:shadow-lg hover:-translate-y-1.5'
                }`}
              >
                {/* Top gradient accent bar */}
                <div
                  className="h-2 w-full transition-all duration-300"
                  style={{ background: locked ? 'var(--border)' : `linear-gradient(90deg, ${activeColor}cc, ${activeColor})` }}
                />

                <div className="p-6 flex flex-col gap-4">
                  {/* Title & Icon Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2.5 rounded-xl bg-bg-secondary border border-border shadow-sm">
                      {phase.icon}
                    </span>
                    <span
                      style={{ color: locked ? 'var(--text-muted)' : activeColor, borderColor: locked ? 'var(--border)' : `${activeColor}50` }}
                      className="text-[10px] font-bold uppercase tracking-widest font-mono border px-2.5 py-1 rounded-lg bg-bg-secondary"
                    >
                      PHASE {phase.id}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold text-text-primary leading-snug tracking-tight line-clamp-1">{phase.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 min-h-[40px]">{phase.subtitle}</p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary font-medium">Tiến độ</span>
                      <span className="text-xs font-bold font-mono" style={{ color: locked ? 'var(--text-muted)' : activeColor }}>
                        {locked ? 'Khóa 🔒' : `${pProgress}%`}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-bg-secondary border border-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${locked ? 0 : pProgress}%`,
                          background: `linear-gradient(90deg, ${activeColor}99, ${activeColor})`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="text-xs text-text-secondary border-t border-border pt-4 flex flex-col gap-1.5">
                    <span className="font-semibold text-text-primary flex items-center gap-1">
                      🎯 Outcome:
                    </span>
                    <span className="line-clamp-2 leading-relaxed">{phase.outcome}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                    <span className="text-xs text-text-muted font-mono">{phase.duration} • {phase.totalHours}h</span>
                    <span
                      style={{ color: locked ? 'var(--text-muted)' : activeColor }}
                      className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                    >
                      {locked ? 'Đang khóa' : isCompleted ? 'Xem lại' : 'Học ngay'}
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
