// src/components/views/OverviewView.tsx
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
    <div className="flex flex-col gap-6 lg:gap-8 pb-10">
      {/* 1. Stats HUD Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-bg-card p-4 rounded-xl border border-border shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-mika-p50 text-mika-p600 dark:bg-mika-p800/20 dark:text-mika-p400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-text-sec uppercase tracking-wider font-semibold">Tổng bài học</span>
            <span className="text-base font-bold text-text-pri font-mono">{totalLessons}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-mika-a50 text-mika-a600 dark:bg-mika-a700/10 dark:text-mika-a500">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-text-sec uppercase tracking-wider font-semibold">Đã hoàn thành</span>
            <span className="text-base font-bold text-text-pri font-mono">{completedCount} bài</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-mika-v50 text-mika-v600 dark:bg-mika-v600/10 dark:text-mika-v600">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-text-sec uppercase tracking-wider font-semibold">Thời gian học</span>
            <span className="text-base font-bold text-text-pri font-mono">{formatStudyTime(totalSeconds)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-mika-t50 text-mika-t600 dark:bg-mika-t600/10 dark:text-mika-t600">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-text-sec uppercase tracking-wider font-semibold">Tiến độ tổng</span>
            <span className="text-base font-bold text-text-pri font-mono">{progressPercent}%</span>
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
        <section className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  borderColor: locked ? 'var(--border)' : 'transparent',
                }}
                className={`flex flex-col bg-bg-card border rounded-xl overflow-hidden shadow-xs transition-all duration-300 relative select-none ${
                  locked
                    ? 'opacity-40 cursor-not-allowed'
                    : 'cursor-pointer hover:border-acc border-border hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Header Banner colored with Phase color */}
                <div
                  className="h-1.5 w-full transition-all duration-300"
                  style={{ backgroundColor: locked ? 'var(--text-muted)' : activeColor }}
                />

                <div className="p-5 flex flex-col gap-3">
                  {/* Title & Icon Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2 rounded-lg bg-bg-secondary border border-border-light shadow-xs">
                      {phase.icon}
                    </span>
                    <span
                      style={{ color: locked ? 'var(--text-muted)' : activeColor }}
                      className="text-[10px] font-bold uppercase tracking-wider font-mono border border-current px-2 py-0.5 rounded"
                    >
                      Phase {phase.id}
                    </span>
                  </div>

                  {/* Description Metadata */}
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-text-pri line-clamp-1">{phase.title}</h3>
                    <p className="text-xs text-text-sec mt-1 line-clamp-2 min-h-[32px]">{phase.subtitle}</p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono font-medium text-text-sec">
                      <span>Tiến độ</span>
                      <span>{locked ? 'Khóa 🔒' : `${pProgress}%`}</span>
                    </div>
                    <div className="w-full h-1.5 bg-bg-secondary border border-border-light rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${locked ? 0 : pProgress}%`,
                          backgroundColor: activeColor,
                        }}
                      />
                    </div>
                  </div>

                  {/* Phase Outcome Summary */}
                  <div className="text-[10px] text-text-sec border-t border-border-light pt-3 mt-1 flex flex-col gap-1">
                    <span className="font-semibold text-text-pri">🎯 Outcome:</span>
                    <span className="line-clamp-2">{phase.outcome}</span>
                  </div>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between text-[10px] font-semibold mt-2 pt-2 border-t border-border-light">
                    <span className="text-text-muted">{phase.duration} • {phase.totalHours}h</span>
                    <span
                      style={{ color: locked ? 'var(--text-muted)' : activeColor }}
                      className="flex items-center gap-0.5 hover:underline"
                    >
                      {locked ? 'Đang khóa' : isCompleted ? 'Xem lại' : 'Học ngay'} <ChevronRight className="w-3.5 h-3.5" />
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
