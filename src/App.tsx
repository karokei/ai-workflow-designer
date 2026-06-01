// src/App.tsx
import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useTheme } from '@/hooks/useTheme';
import { useTimer } from '@/hooks/useTimer';
import { NavBar } from '@/components/layout/NavBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { HUDFloatingTimer } from '@/components/shared/HUDFloatingTimer';
import { OverviewView } from '@/components/views/OverviewView';
import { CurriculumView } from '@/components/views/CurriculumView';
import { SearchView } from '@/components/views/SearchView';
import { SandboxView } from '@/components/views/SandboxView';
import { CURRICULUM } from '@/data/curriculum';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Award, Clock, Moon, Sun, Trash2 } from 'lucide-react';

export function App() {
  const {
    progress,
    isLoading,
    resetProgress,
    toggleLesson,
    saveNote,
    saveQuizResult,
    saveChecklist,
    saveChallengeResult,
  } = useProgress();

  const { toggleTheme, isDark } = useTheme();
  const {
    seconds: timerSeconds,
    isRunning: timerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    formattedTime: timerFormatted,
  } = useTimer();

  // Selected view: 'overview' (Lộ trình), 'curriculum' (Học tập), 'search' (Tìm kiếm), 'profile' (Cá nhân - chỉ cho mobile), 'sandbox' (Giả lập)
  const [currentView, setCurrentView] = useState<'overview' | 'curriculum' | 'search' | 'profile' | 'sandbox'>('overview');

  // Active Phase and Lesson states
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(0);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Sync selectedPhaseId with progress.lastActivePhase when loaded
  useEffect(() => {
    if (!isLoading && progress && progress.lastActivePhase !== undefined) {
      setSelectedPhaseId(progress.lastActivePhase);
    }
  }, [isLoading, progress.lastActivePhase]);

  // Total seconds cumulative (saved total + active timer)
  const cumulativeSeconds = progress.studyTime.totalSeconds + (timerRunning ? timerSeconds : 0);
  const formatTotalTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    return `${hrs} giờ ${mins} phút`;
  };

  // Global counts
  const totalLessons = CURRICULUM.reduce(
    (sum, phase) => sum + phase.modules.reduce((mSum, m) => mSum + m.lessons.length, 0),
    0
  );
  const completedCount = Object.keys(progress.completedLessons).filter(
    (id) => progress.completedLessons[id]
  ).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Handles responsive redirection for the profile tab
  // If view is profile but screen size becomes desktop, fallback to overview
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && currentView === 'profile') {
        setCurrentView('overview');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentView]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100svh] bg-bg-base text-text-pri font-mono">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs text-text-sec">Đang tải học viện AI Workflow...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100svh] bg-bg-base text-text-primary transition-colors duration-300">
      {/* Desktop Sticky Header */}
      <NavBar
        currentView={currentView === 'profile' ? 'overview' : currentView}
        setCurrentView={setCurrentView}
        isDark={isDark}
        toggleTheme={toggleTheme}
        progress={progress}
        timerSeconds={timerSeconds}
        timerFormatted={timerFormatted}
        timerRunning={timerRunning}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 pb-20 lg:pb-6 max-w-7xl w-full mx-auto px-4 lg:px-6 mt-4">
        <ErrorBoundary>
          {currentView === 'overview' && (
            <OverviewView
              progress={progress}
              onSelectPhase={(phaseId) => {
                setSelectedPhaseId(phaseId);
                setSelectedLessonId(null);
                setCurrentView('curriculum');
              }}
            />
          )}
          {currentView === 'curriculum' && (
            <CurriculumView
              progress={progress}
              selectedPhaseId={selectedPhaseId}
              selectedLessonId={selectedLessonId}
              onSelectPhase={setSelectedPhaseId}
              onSelectLesson={setSelectedLessonId}
              toggleLesson={toggleLesson}
              saveNote={saveNote}
              saveQuizResult={saveQuizResult}
              saveChecklist={saveChecklist}
              saveChallengeResult={saveChallengeResult}
            />
          )}
          {currentView === 'search' && (
            <SearchView
              progress={progress}
              onSelectLesson={(phaseId, lessonId) => {
                setSelectedPhaseId(phaseId);
                setSelectedLessonId(lessonId);
                setCurrentView('curriculum');
              }}
            />
          )}
          {currentView === 'sandbox' && (
            <SandboxView />
          )}
          
          {/* Mobile Profile View Tab */}
          {currentView === 'profile' && (
            <div className="lg:hidden flex flex-col gap-6 animate-fade-in">
              {/* User Bio Header */}
              <div className="flex items-center gap-4 bg-bg-card p-4 rounded-xl border border-border">
                <div className="w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center font-mono font-bold text-lg shadow-glow-cyan-sm">
                  AI
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-text-primary">Học Viên AI Workflow</span>
                  <span className="text-xs text-text-secondary">Lộ trình 12-18 tháng tự chủ</span>
                </div>
              </div>
  
              {/* Mobile Stats Dashboard */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-card p-4 rounded-xl border border-border flex flex-col gap-1">
                  <Award className="w-5 h-5 text-mika-success" />
                  <span className="text-xs text-text-secondary">Tiến độ tổng</span>
                  <span className="text-lg font-bold text-text-primary font-mono">{progressPercent}%</span>
                  <span className="text-[10px] text-text-muted">{completedCount}/{totalLessons} bài học</span>
                </div>
   
                <div className="bg-bg-card p-4 rounded-xl border border-border flex flex-col gap-1">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-xs text-text-secondary">Giờ học tích lũy</span>
                  <span className="text-base font-bold text-text-primary font-mono truncate">
                    {formatTotalTime(cumulativeSeconds)}
                  </span>
                  <span className="text-[10px] text-text-muted">Đang theo dõi</span>
                </div>
              </div>
  
              {/* Application Configuration Options */}
              <div className="bg-bg-card rounded-xl border border-border divide-y divide-border">
                {/* Theme Selector */}
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm font-medium text-text-primary">Chế độ giao diện (Dark Mode)</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg border border-border bg-bg-secondary text-text-secondary hover:text-text-primary"
                  >
                    {isDark ? <Sun className="w-4 h-4 text-mika-warning" /> : <Moon className="w-4 h-4 text-mika-blue" />}
                  </button>
                </div>
  
                {/* Data Reset Option */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">Khởi động lại khóa học</span>
                    <span className="text-[10px] text-text-muted">Xóa toàn bộ tiến trình học tập & ghi chú</span>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("Bạn có chắc chắn muốn xóa toàn bộ tiến độ học tập và ghi chú? Hành động này không thể hoàn tác.")) {
                        void resetProgress();
                        resetTimer();
                        alert("Đã xóa toàn bộ tiến trình thành công!");
                      }
                    }}
                    className="p-2 rounded-lg border border-mika-r600/30 bg-mika-r50 text-mika-r600 hover:bg-mika-r50/85 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </main>

      {/* Mobile Floating HUD Timer FAB widget */}
      {currentView !== 'profile' && (
        <HUDFloatingTimer
          timerFormatted={timerFormatted}
          timerRunning={timerRunning}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          resetTimer={resetTimer}
        />
      )}

      {/* Mobile HUD Bottom Navigation Bar */}
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}

export default App;
