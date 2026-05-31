// src/components/views/CurriculumView.tsx
import { useState, useEffect, useRef } from 'react';
import type { UserProgress, QuizResult } from '@/types/progress';
import type { Phase } from '@/types/curriculum';
import { CURRICULUM } from '@/data/curriculum';
import { parseMarkdownLite } from '@/utils/markdown-lite';
import { ContentBlockRenderer } from '@/components/curriculum/ContentBlockRenderer';
import { 
  Check, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  ArrowLeft, 
  ArrowRight, 
  X, 
  Edit3, 
  Save, 
  ExternalLink,
  NotebookPen
} from 'lucide-react';

interface CurriculumViewProps {
  progress: UserProgress;
  selectedPhaseId: number;
  selectedLessonId: string | null;
  onSelectPhase: (phaseId: number) => void;
  onSelectLesson: (lessonId: string | null) => void;
  toggleLesson: (lessonId: string) => void;
  saveNote: (lessonId: string, note: string) => void;
  saveQuizResult: (lessonId: string, result: QuizResult) => void;
  saveChecklist: (lessonId: string, checklistState: boolean[]) => void;
}

export function CurriculumView({
  progress,
  selectedPhaseId,
  selectedLessonId,
  onSelectPhase,
  onSelectLesson,
  toggleLesson,
  saveNote,
  saveQuizResult,
  saveChecklist,
}: CurriculumViewProps) {
  // Desktop accordion open states (moduleId -> boolean)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  // Desktop expanded lesson details (lessonId -> boolean)
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({});

  // Note editing states (lessonId -> boolean)
  const [isEditingNote, setIsEditingNote] = useState<Record<string, boolean>>({});
  const [tempNotes, setTempNotes] = useState<Record<string, string>>({});

  // Mobile Slide Card current index
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const slideAreaRef = useRef<HTMLDivElement>(null);

  // Dynamic loading states
  const [loadedPhases, setLoadedPhases] = useState<Record<number, Phase>>({});
  const [loadingPhaseId, setLoadingPhaseId] = useState<number | null>(null);

  // Dynamic import hook
  useEffect(() => {
    if (loadedPhases[selectedPhaseId]) {
      return;
    }

    let isMounted = true;
    const loadPhase = async () => {
      setLoadingPhaseId(selectedPhaseId);
      try {
        const module = await import(`../../data/phases/phase-${selectedPhaseId}.ts`);
        const phaseData = module[`phase${selectedPhaseId}`];
        if (isMounted && phaseData) {
          setLoadedPhases((prev) => ({
            ...prev,
            [selectedPhaseId]: phaseData,
          }));
        }
      } catch (err) {
        console.error(`Failed to load phase-${selectedPhaseId} dynamically:`, err);
      } finally {
        if (isMounted) {
          setLoadingPhaseId(null);
        }
      }
    };

    loadPhase();

    return () => {
      isMounted = false;
    };
  }, [selectedPhaseId, loadedPhases]);

  const activePhase = loadedPhases[selectedPhaseId] || CURRICULUM.find((p) => p.id === selectedPhaseId) || CURRICULUM[0];

  // Auto-expand the first module when active phase changes
  useEffect(() => {
    if (activePhase.modules.length > 0) {
      setExpandedModules({
        [activePhase.modules[0].id]: true,
      });
    }
    // Collapse all lesson details when changing phase
    setExpandedLessons({});
  }, [selectedPhaseId, activePhase]);

  // Reset slide index when opening a new lesson
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [selectedLessonId]);

  // Helper: check if a phase is locked
  const isPhaseLocked = (phaseId: number) => {
    if (phaseId === 0) return false;
    const prevPhase = CURRICULUM.find((p) => p.id === phaseId - 1);
    if (!prevPhase) return false;

    const prevLessons = prevPhase.modules.reduce((list: string[], m) => {
      m.lessons.forEach((l) => list.push(l.id));
      return list;
    }, []);

    return !prevLessons.every((id) => progress.completedLessons[id]);
  };

  // Helper: calculate single phase progress percentage
  const getPhaseProgress = (phaseId: number) => {
    const phase = CURRICULUM.find((p) => p.id === phaseId);
    if (!phase) return 0;
    const pLessons = phase.modules.reduce((list: string[], m) => {
      m.lessons.forEach((l) => list.push(l.id));
      return list;
    }, []);
    if (pLessons.length === 0) return 0;
    const pCompleted = pLessons.filter((id) => progress.completedLessons[id]).length;
    return Math.round((pCompleted / pLessons.length) * 100);
  };

  const handleToggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleToggleLessonDetail = (lessonId: string) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  // Note editor actions
  const startEditNote = (lessonId: string) => {
    setTempNotes((prev) => ({
      ...prev,
      [lessonId]: progress.lessonNotes[lessonId] || '',
    }));
    setIsEditingNote((prev) => ({
      ...prev,
      [lessonId]: true,
    }));
  };

  const handleSaveNote = async (lessonId: string) => {
    const noteContent = tempNotes[lessonId] || '';
    await saveNote(lessonId, noteContent);
    setIsEditingNote((prev) => ({
      ...prev,
      [lessonId]: false,
    }));
  };

  const handleCancelEditNote = (lessonId: string) => {
    setIsEditingNote((prev) => ({
      ...prev,
      [lessonId]: false,
    }));
  };

  // Badges helper
  const getLessonBadge = (type: string) => {
    const badges: Record<string, { label: string; style: string }> = {
      theory: { label: 'Lý thuyết', style: 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200 dark:border-blue-800/40' },
      exercise: { label: 'Thực hành', style: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40' },
      project: { label: 'Dự án', style: 'bg-pink-50 text-pink-700 dark:bg-pink-950/20 dark:text-pink-400 border-pink-200 dark:border-pink-800/40' },
      quiz: { label: 'Quiz', style: 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 border-rose-200 dark:border-rose-800/40' },
      reading: { label: 'Đọc', style: 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border-amber-200 dark:border-amber-800/40' },
    };
    const b = badges[type] || badges.theory;
    return (
      <span className={`text-[10px] font-semibold px-2 py-0.5 border rounded-full uppercase tracking-wider font-mono ${b.style}`}>
        {b.label}
      </span>
    );
  };

  // Group blocks for Swipeable Slide Cards on Mobile
  const getMobileSlides = (lesson: any) => {
    const slides: any[] = [];
    let currentSlide: any[] = [];

    // Introduction Slide: Title, summary, and first text/heading blocks
    slides.push({
      type: 'intro',
      title: lesson.title,
      summary: lesson.summary,
      blocks: lesson.content.filter((b: any) => b.type === 'heading' || b.type === 'text' || b.type === 'callout').slice(0, 2),
    });

    // Content Slides: code blocks, tables, steps get their own slides to reduce scrolling
    lesson.content.forEach((block: any, idx: number) => {
      // Skip blocks already rendered in intro
      if (idx < 2 && (block.type === 'heading' || block.type === 'text' || block.type === 'callout')) {
        return;
      }

      if (block.type === 'code' || block.type === 'table' || block.type === 'steps') {
        // High cognitive load components get their own single slide
        slides.push({
          type: 'content',
          blocks: [block],
        });
      } else {
        // Collect other small blocks and bundle them
        currentSlide.push(block);
        if (currentSlide.length >= 2) {
          slides.push({
            type: 'content',
            blocks: [...currentSlide],
          });
          currentSlide = [];
        }
      }
    });

    // Add any remaining small content blocks
    if (currentSlide.length > 0) {
      slides.push({
        type: 'content',
        blocks: currentSlide,
      });
    }

    // Interactive slide at the end (quizzes / checklists / notes)
    const interactives = lesson.content.filter((b: any) => b.type === 'quiz' || b.type === 'checklist');
    if (interactives.length > 0) {
      interactives.forEach((item: any, qIdx: number) => {
        slides.push({
          type: 'interactive',
          blocks: [item],
          interactiveIndex: qIdx,
        });
      });
    }

    // Notebook Slide at the end: Note editor
    slides.push({
      type: 'notes',
      title: 'Ghi chú học tập',
    });

    return slides;
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-8 pb-10 w-full animate-fade-in">
      {/* ─────────────────────────────────────────────────────────────────
          DESKTOP VIEW: Sidebar & Accordion
          ───────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex gap-8 w-full items-start">
        {/* Left Phase Navigation Sidebar */}
        <aside className="w-72 flex-shrink-0 flex flex-col gap-3.5 bg-bg-card border border-border p-4 rounded-xl shadow-xs sticky top-[76px] z-10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted px-1.5 mb-1">Lộ trình 6 Phase</h3>
          <div className="flex flex-col gap-1.5">
            {CURRICULUM.map((phase) => {
              const locked = isPhaseLocked(phase.id);
              const active = selectedPhaseId === phase.id;
              const percent = getPhaseProgress(phase.id);

              return (
                <button
                  key={phase.id}
                  disabled={locked}
                  onClick={() => onSelectPhase(phase.id)}
                  style={{
                    backgroundColor: active ? `${phase.theme.color}0c` : 'transparent',
                    borderColor: active ? phase.theme.color : 'transparent',
                  }}
                  className={`flex items-center gap-3 w-full p-2.5 rounded-lg border-l-2 text-left transition-all group ${
                    locked
                      ? 'opacity-40 cursor-not-allowed'
                      : 'cursor-pointer hover:bg-bg-secondary/40'
                  }`}
                >
                  <span className="text-xl p-1.5 bg-bg-secondary border border-border-light rounded-md">
                    {phase.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-text-primary truncate group-hover:text-mika-p600 transition-colors">
                        {phase.title}
                      </h4>
                      {locked ? (
                        <Lock className="w-3 h-3 text-text-muted flex-shrink-0" />
                      ) : (
                        <span className="text-[10px] font-bold font-mono text-text-muted">{percent}%</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-text-muted font-medium">{phase.duration}</span>
                      {!locked && (
                        <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-300"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: phase.theme.color,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Curriculum Workspace */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Phase Header Banner */}
          <section
            style={{
              backgroundColor: `${activePhase.theme.color}05`,
              borderColor: activePhase.theme.border,
            }}
            className="p-6 rounded-2xl border flex flex-col md:flex-row gap-5 items-start justify-between relative overflow-hidden"
          >
            {/* Holographic scanner line for high premium tech aesthetic */}
            <div className="absolute inset-0 scanline pointer-events-none opacity-[0.03]" />

            <div className="flex gap-4">
              <span className="text-4xl p-3 bg-bg-card border border-border rounded-2xl flex-shrink-0 shadow-xs select-none">
                {activePhase.icon}
              </span>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <span
                    style={{ color: activePhase.theme.color, borderColor: activePhase.theme.color }}
                    className="text-[9px] font-bold font-mono uppercase tracking-widest border px-1.5 py-0.5 rounded"
                  >
                    Phase {activePhase.id}
                  </span>
                  <span className="text-xs text-text-muted">
                    {activePhase.duration} • {activePhase.pace} • {activePhase.totalHours}h
                  </span>
                </div>
                <h2 className="text-lg font-bold text-text-primary tracking-tight">
                  {activePhase.title}
                </h2>
                <p className="text-xs text-text-secondary">
                  {activePhase.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-w-sm w-full md:w-auto bg-bg-card border border-border/80 p-3.5 rounded-xl text-[11px] leading-relaxed shadow-xs">
              <div className="flex flex-col">
                <span className="font-bold text-text-primary">🎯 Cột mốc Phase:</span>
                <span className="text-text-secondary">{activePhase.milestone}</span>
              </div>
              <div className="flex flex-col border-t border-border-light pt-2 mt-1">
                <span className="font-bold text-text-primary">🛠 Công cụ học:</span>
                <div className="flex gap-1.5 flex-wrap mt-1">
                  {activePhase.tools.map((t, idx) => (
                    <span key={idx} className="bg-bg-secondary px-2 py-0.5 border border-border-light rounded text-[9px] font-medium text-text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Module Accordions List */}
          {loadingPhaseId === selectedPhaseId ? (
            <div className="flex flex-col items-center justify-center py-20 bg-bg-card border border-border rounded-2xl shadow-xs animate-pulse">
              <div className="relative w-16 h-16 mb-4">
                {/* Glowing neon ring */}
                <div 
                  className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                  style={{ borderColor: `${activePhase.theme.color}40`, borderTopColor: activePhase.theme.color }}
                />
                <div 
                  className="absolute inset-2 rounded-full border-2 border-dashed animate-spin opacity-60"
                  style={{ borderColor: activePhase.theme.color, animationDirection: 'reverse', animationDuration: '3s' }}
                />
              </div>
              <span className="text-xs font-bold font-mono tracking-widest text-text-secondary uppercase">
                Đang nạp dữ liệu Phase {selectedPhaseId}...
              </span>
            </div>
          ) : (
            <section className="flex flex-col gap-4">
              {activePhase.modules.map((mod) => {
                const isOpen = expandedModules[mod.id] || false;
                const mLessons = mod.lessons.map((l) => l.id);
                const mCompleted = mLessons.filter((id) => progress.completedLessons[id]).length;
                const mProgress = mLessons.length > 0 ? Math.round((mCompleted / mLessons.length) * 100) : 0;

                return (
                  <div key={mod.id} className="bg-bg-card border border-border rounded-xl overflow-hidden shadow-xs">
                    {/* Module Header Bar */}
                    <button
                      onClick={() => handleToggleModule(mod.id)}
                      className="flex items-center justify-between w-full p-4 hover:bg-bg-secondary/30 text-left transition-colors relative"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-text-primary tracking-tight">
                              {mod.title}
                            </h3>
                            <span className="text-[10px] font-bold font-mono text-mika-p600 bg-mika-p50 dark:bg-mika-p800/10 px-1.5 py-0.5 rounded">
                              {mod.estimatedHours}h
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary mt-0.5">
                            {mod.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Mini Progress Circle or Pill */}
                        <span className="text-[10px] font-bold font-mono text-text-secondary">
                          {mCompleted}/{mLessons.length} bài ({mProgress}%)
                        </span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
                      </div>

                      {/* Progress thin bar below header */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bg-secondary">
                        <div 
                          className="h-full bg-mika-p600 transition-all duration-300"
                          style={{ width: `${mProgress}%` }}
                        />
                      </div>
                    </button>

                    {/* Module Lessons Content */}
                    {isOpen && (
                      <div className="divide-y divide-border border-t border-border">
                        {mod.lessons.map((lesson) => {
                          const isDone = progress.completedLessons[lesson.id] || false;
                          const isExpanded = expandedLessons[lesson.id] || false;

                          // Quiz/Checklist completed count
                          const quizResult = progress.quizResults[lesson.id];
                          const checklistState = progress.checklistProgress[lesson.id] || [];

                          return (
                            <div key={lesson.id} className="flex flex-col bg-bg-card">
                              {/* Lesson Row */}
                              <div className="flex items-center justify-between p-3.5 hover:bg-bg-secondary/20 transition-colors">
                                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                  {/* Done Toggle Checkbox */}
                                  <button
                                    onClick={() => toggleLesson(lesson.id)}
                                    className="w-5 h-5 rounded border border-border flex items-center justify-center bg-bg-secondary/40 hover:bg-bg-secondary text-mika-a600 focus:outline-none transition-all active:scale-90"
                                  >
                                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                                  </button>

                                  <div className="flex items-center gap-2 flex-wrap">
                                    {getLessonBadge(lesson.type)}
                                    <span className="text-[10px] text-text-muted font-mono">{lesson.duration}</span>
                                  </div>

                                  <span
                                    onClick={() => handleToggleLessonDetail(lesson.id)}
                                    className={`text-xs font-bold truncate cursor-pointer hover:text-mika-p500 transition-colors ${
                                      isDone ? 'text-text-muted line-through opacity-70' : 'text-text-primary'
                                    }`}
                                  >
                                    {lesson.title}
                                  </span>
                                </div>

                                <button
                                  onClick={() => handleToggleLessonDetail(lesson.id)}
                                  className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary font-medium"
                                >
                                  {isExpanded ? 'Ẩn' : 'Xem nội dung'}
                                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                </button>
                              </div>

                              {/* Lesson Detail Expanded Panel */}
                              {isExpanded && (
                                <div className="p-5 bg-bg-secondary/15 border-t border-border flex flex-col gap-4 animate-fade-in">
                                  {/* Summary block */}
                                  <p className="text-xs text-text-secondary leading-relaxed bg-bg-card p-3 rounded-lg border border-border-light italic">
                                    💡 <strong>Khái quát bài học: </strong> {lesson.summary}
                                  </p>

                                  {/* Render Detailed Content Blocks */}
                                  <div className="flex flex-col gap-1 max-w-4xl">
                                    {lesson.content.map((block: any, bIdx: number) => (
                                      <ContentBlockRenderer
                                        key={bIdx}
                                        block={block}
                                        lessonId={lesson.id}
                                        quizIndex={bIdx}
                                        savedQuizAnswer={quizResult?.answers[bIdx]}
                                        onSelectQuizAnswer={async (ans) => {
                                          // Save answer into quiz results progress state
                                          const prevAnswers = quizResult?.answers || [];
                                          const newAnswers = [...prevAnswers];
                                          newAnswers[bIdx] = ans;
                                          const score = newAnswers.includes(-1) ? 0 : 100; // Simplified scoring
                                          await saveQuizResult(lesson.id, {
                                            answers: newAnswers,
                                            score,
                                            completedAt: new Date().toISOString(),
                                            attempts: (quizResult?.attempts || 0) + 1,
                                          });
                                        }}
                                        savedChecklistState={checklistState}
                                        onSelectChecklistItem={async (cIdx) => {
                                          const newState = [...checklistState];
                                          // Initialize array if empty
                                          if (newState.length === 0 && block.type === 'checklist') {
                                            block.items.forEach(() => newState.push(false));
                                          }
                                          newState[cIdx] = !newState[cIdx];
                                          await saveChecklist(lesson.id, newState);
                                        }}
                                      />
                                    ))}
                                  </div>

                                  {/* External Resources Links */}
                                  {lesson.resources && lesson.resources.length > 0 && (
                                    <div className="border-t border-border pt-4 mt-2 flex flex-col gap-2.5">
                                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-text-sec">Tài nguyên bổ trợ</h5>
                                      <div className="flex gap-3 flex-wrap">
                                        {lesson.resources.map((res: any, idx: number) => (
                                          <a
                                            key={idx}
                                            href={res.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-card hover:bg-bg-secondary text-xs text-text-primary hover:text-mika-p600 transition-all shadow-xs"
                                          >
                                            <span>{res.title}</span>
                                            <span className="text-[9px] px-1 bg-bg-secondary text-text-muted rounded capitalize">
                                              {res.kind}
                                            </span>
                                            <ExternalLink className="w-3 h-3 text-text-muted" />
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Personal Note Editor */}
                                  <div className="border-t border-border pt-4 mt-2 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-text-sec">📝 Ghi chú cá nhân</h5>
                                      {!isEditingNote[lesson.id] && (
                                        <button
                                          onClick={() => startEditNote(lesson.id)}
                                          className="flex items-center gap-1 text-[11px] font-semibold text-mika-p600 hover:text-mika-p700 transition-colors"
                                        >
                                          <Edit3 className="w-3 h-3" />
                                          <span>{progress.lessonNotes[lesson.id] ? 'Chỉnh sửa' : 'Thêm ghi chú'}</span>
                                        </button>
                                      )}
                                    </div>

                                    {isEditingNote[lesson.id] ? (
                                      <div className="flex flex-col gap-2">
                                        <textarea
                                          value={tempNotes[lesson.id] || ''}
                                          onChange={(e) => setTempNotes(prev => ({ ...prev, [lesson.id]: e.target.value }))}
                                          placeholder="Ghi lại các insight học tập, ghi chú kỹ thuật, API keys..."
                                          rows={4}
                                          className="w-full text-xs p-3 bg-bg-card text-text-primary border border-border rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mika-p500 placeholder:text-text-muted font-mono leading-relaxed"
                                        />
                                        <div className="flex items-center gap-2 justify-end">
                                          <button
                                            onClick={() => handleCancelEditNote(lesson.id)}
                                            className="px-3 py-1.5 text-xs text-text-secondary hover:bg-bg-secondary border border-border rounded-lg transition-all"
                                          >
                                            Hủy
                                          </button>
                                          <button
                                            onClick={() => handleSaveNote(lesson.id)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-mika-p600 hover:bg-mika-p700 text-white rounded-lg transition-all shadow-xs"
                                          >
                                            <Save className="w-3.5 h-3.5" />
                                            <span>Lưu ghi chú</span>
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      progress.lessonNotes[lesson.id] ? (
                                        <div 
                                          className="p-3.5 bg-bg-card border border-border rounded-lg text-xs leading-relaxed text-text-secondary select-text font-mono"
                                          dangerouslySetInnerHTML={{ __html: parseMarkdownLite(progress.lessonNotes[lesson.id]) }}
                                        />
                                      ) : (
                                        <span className="text-[11px] text-text-muted italic">
                                          Chưa có ghi chú nào cho bài học này. Viết ghi chú đầu tiên để lưu trữ IndexedDB.
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          MOBILE VIEW: Focused Swipeable Slide Cards
          ───────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col gap-4 w-full">
        {selectedLessonId === null ? (
          /* State A: Lessons list directory */
          <div className="flex flex-col gap-4">
            {/* Quick horizontal carousel phase switcher */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
              {CURRICULUM.map((phase) => {
                const locked = isPhaseLocked(phase.id);
                const active = selectedPhaseId === phase.id;
                return (
                  <button
                    key={phase.id}
                    disabled={locked}
                    onClick={() => onSelectPhase(phase.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold snap-align-start flex-shrink-0 transition-all active:scale-95 ${
                      locked
                        ? 'opacity-30 cursor-not-allowed border-border text-text-muted'
                        : active
                        ? 'bg-mika-p600 text-white border-mika-p600 shadow-sm'
                        : 'bg-bg-card border-border text-text-secondary hover:bg-bg-secondary'
                    }`}
                  >
                    <span>{phase.icon}</span>
                    <span>Ph {phase.id}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Header Banner */}
            <div className="p-4 bg-bg-card border border-border rounded-xl flex flex-col gap-1.5">
              <span className="text-[9px] font-bold font-mono text-mika-p600 uppercase">Phase {activePhase.id} Lộ trình</span>
              <h2 className="text-base font-bold text-text-primary tracking-tight">{activePhase.title}</h2>
              <p className="text-xs text-text-secondary leading-relaxed">{activePhase.subtitle}</p>
              
              <div className="flex items-center justify-between text-[10px] text-text-muted mt-2 border-t border-border-light pt-2">
                <span>Outcome: {activePhase.milestone}</span>
                <span className="font-bold text-mika-p600">{getPhaseProgress(activePhase.id)}%</span>
              </div>
            </div>

            {/* Modules / Lessons List inside current phase */}
            {loadingPhaseId === selectedPhaseId ? (
              <div className="flex flex-col items-center justify-center py-16 bg-bg-card border border-border rounded-xl shadow-xs animate-pulse">
                <div className="relative w-12 h-12 mb-3">
                  <div 
                    className="absolute inset-0 rounded-full border-3 border-t-transparent animate-spin"
                    style={{ borderColor: `${activePhase.theme.color}40`, borderTopColor: activePhase.theme.color }}
                  />
                </div>
                <span className="text-[10px] font-bold font-mono tracking-wider text-text-secondary uppercase">
                  Đang nạp Phase {selectedPhaseId}...
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {activePhase.modules.map((mod) => {
                  return (
                    <div key={mod.id} className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted px-1 mt-2">
                        📚 {mod.title}
                      </span>
                      <div className="flex flex-col bg-bg-card border border-border rounded-xl divide-y divide-border">
                        {mod.lessons.map((lesson) => {
                          const isDone = progress.completedLessons[lesson.id] || false;
                          return (
                            <div
                              key={lesson.id}
                              onClick={() => onSelectLesson(lesson.id)}
                              className="flex items-center justify-between p-3.5 hover:bg-bg-secondary/40 active:bg-bg-secondary/60 transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                {/* Circle indicators of completed states */}
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation(); // Avoid opening focus card
                                    toggleLesson(lesson.id);
                                  }}
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                                    isDone
                                      ? 'bg-mika-a600 border-mika-a600 text-white shadow-xs'
                                      : 'border-border bg-bg-secondary/40'
                                  }`}
                                >
                                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                                </div>

                                <div className="flex flex-col min-w-0">
                                  <span className={`text-xs font-bold truncate leading-snug ${
                                    isDone ? 'text-text-muted line-through opacity-70' : 'text-text-primary'
                                  }`}>
                                    {lesson.title}
                                  </span>
                                  <div className="flex items-center gap-2 mt-1">
                                    {getLessonBadge(lesson.type)}
                                    <span className="text-[9px] text-text-muted font-mono">{lesson.duration}</span>
                                  </div>
                                </div>
                              </div>
                              <ChevronDown className="w-4 h-4 text-text-muted -rotate-90" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* State B: Focused Swipeable Card interface */
          (() => {
            const lesson = activePhase.modules
              .flatMap((m) => m.lessons)
              .find((l) => l.id === selectedLessonId);

            if (!lesson) return null;

            const slides = getMobileSlides(lesson);
            const slide = slides[currentSlideIndex];
            const isFirstSlide = currentSlideIndex === 0;
            const isLastSlide = currentSlideIndex === slides.length - 1;

            const handleNext = () => {
              if (isLastSlide) {
                // Complete lesson & return
                if (!progress.completedLessons[lesson.id]) {
                  toggleLesson(lesson.id);
                }
                onSelectLesson(null);
              } else {
                setCurrentSlideIndex((prev) => prev + 1);
                slideAreaRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
              }
            };

            const handlePrev = () => {
              if (!isFirstSlide) {
                setCurrentSlideIndex((prev) => prev - 1);
                slideAreaRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
              }
            };

            return (
              <div className="flex flex-col gap-4 animate-fade-in fixed inset-x-0 bottom-[56px] top-0 bg-bg-base z-30 p-4 select-none">
                {/* Mobile Slide Card Top Bar */}
                <div className="flex items-center justify-between border-b border-border pb-3 bg-bg-base">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-mono text-text-muted uppercase truncate max-w-[200px]">
                      {activePhase.title}
                    </span>
                    <h3 className="text-xs font-bold text-text-primary truncate max-w-[240px] leading-tight">
                      {lesson.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => onSelectLesson(null)}
                    className="p-1.5 bg-bg-secondary hover:bg-bg-secondary/80 text-text-secondary rounded-full border border-border"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Indicators dots */}
                <div className="flex justify-center gap-1.5 bg-bg-base">
                  {slides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlideIndex
                          ? 'w-6 bg-mika-p600'
                          : idx < currentSlideIndex
                          ? 'w-2 bg-mika-a600'
                          : 'w-2 bg-border'
                      }`}
                    />
                  ))}
                </div>

                {/* Swipeable Slide Card Body Area */}
                <div
                  ref={slideAreaRef}
                  className="flex-1 bg-bg-card border border-border rounded-2xl p-5 overflow-y-auto shadow-md relative select-text"
                >
                  {slide.type === 'intro' && (
                    <div className="flex flex-col gap-4 animate-slide-in">
                      <div className="flex flex-col gap-2">
                        {getLessonBadge(lesson.type)}
                        <h2 className="text-base font-extrabold text-text-primary tracking-tight leading-snug">
                          {slide.title}
                        </h2>
                        <span className="text-[10px] text-text-muted font-semibold flex items-center gap-1">
                          ⏱ Thời lượng dự kiến: {lesson.duration}
                        </span>
                      </div>

                      {/* Brief section in glass container */}
                      <div className="p-4 bg-bg-secondary/40 border border-border rounded-xl">
                        <span className="text-[10px] font-bold text-mika-p600 uppercase block mb-1">Khái quát bài học</span>
                        <p className="text-xs text-text-secondary leading-relaxed italic">
                          "{slide.summary}"
                        </p>
                      </div>

                      {/* Introductory text blocks */}
                      <div className="flex flex-col gap-1 pt-2">
                        {slide.blocks.map((block: any, idx: number) => (
                          <ContentBlockRenderer
                            key={idx}
                            block={block}
                            lessonId={lesson.id}
                            quizIndex={idx}
                          />
                        ))}
                      </div>

                      <div className="flex flex-col items-center gap-1 py-4 text-center">
                        <span className="text-xl">👇</span>
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider animate-pulse">
                          Chạm "Kế tiếp" dưới đáy để bắt đầu học
                        </span>
                      </div>
                    </div>
                  )}

                  {slide.type === 'content' && (
                    <div className="flex flex-col gap-1.5 animate-slide-in select-text">
                      {slide.blocks.map((block: any, idx: number) => (
                        <ContentBlockRenderer
                          key={idx}
                          block={block}
                          lessonId={lesson.id}
                          quizIndex={idx}
                        />
                      ))}
                    </div>
                  )}

                  {slide.type === 'interactive' && (
                    <div className="flex flex-col gap-1.5 animate-slide-in">
                      {slide.blocks.map((block: any, idx: number) => {
                        const quizResult = progress.quizResults[lesson.id];
                        const checklistState = progress.checklistProgress[lesson.id] || [];

                        return (
                          <ContentBlockRenderer
                            key={idx}
                            block={block}
                            lessonId={lesson.id}
                            quizIndex={slide.interactiveIndex}
                            savedQuizAnswer={quizResult?.answers[slide.interactiveIndex]}
                            onSelectQuizAnswer={async (ans) => {
                              const prevAnswers = quizResult?.answers || [];
                              const newAnswers = [...prevAnswers];
                              newAnswers[slide.interactiveIndex] = ans;
                              const score = newAnswers.includes(-1) ? 0 : 100;
                              await saveQuizResult(lesson.id, {
                                answers: newAnswers,
                                score,
                                completedAt: new Date().toISOString(),
                                attempts: (quizResult?.attempts || 0) + 1,
                              });
                            }}
                            savedChecklistState={checklistState}
                            onSelectChecklistItem={async (cIdx) => {
                              const newState = [...checklistState];
                              if (newState.length === 0 && block.type === 'checklist') {
                                block.items.forEach(() => newState.push(false));
                              }
                              newState[cIdx] = !newState[cIdx];
                              await saveChecklist(lesson.id, newState);
                            }}
                          />
                        );
                      })}
                    </div>
                  )}

                  {slide.type === 'notes' && (
                    <div className="flex flex-col gap-4 animate-slide-in">
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                          <NotebookPen className="w-4 h-4 text-mika-p500" />
                          <span>Sổ tay AI Designer</span>
                        </h4>
                        <p className="text-[11px] text-text-secondary leading-relaxed">
                          Tất cả ghi chú của bạn được mã hóa và lưu trữ cục bộ dưới IndexedDB, giúp bạn tra cứu dễ dàng bất cứ khi nào.
                        </p>
                      </div>

                      {/* Notes interface */}
                      <div className="flex flex-col gap-3 mt-2">
                        {isEditingNote[lesson.id] ? (
                          <div className="flex flex-col gap-2">
                            <textarea
                              value={tempNotes[lesson.id] || ''}
                              onChange={(e) => setTempNotes(prev => ({ ...prev, [lesson.id]: e.target.value }))}
                              placeholder="Nhập ghi chú cá nhân, mã lệnh, lỗi thường gặp..."
                              rows={5}
                              className="w-full text-xs p-3 bg-bg-secondary/40 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-mika-p500 font-mono leading-relaxed"
                            />
                            <div className="flex items-center gap-2 justify-end">
                              <button
                                onClick={() => handleCancelEditNote(lesson.id)}
                                className="px-3 py-1.5 text-xs text-text-secondary bg-bg-secondary rounded-lg border border-border"
                              >
                                Hủy
                              </button>
                              <button
                                onClick={() => handleSaveNote(lesson.id)}
                                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-mika-p600 text-white rounded-lg"
                              >
                                <Save className="w-3.5 h-3.5" />
                                <span>Lưu lại</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            {progress.lessonNotes[lesson.id] ? (
                              <div
                                className="p-4 bg-bg-secondary/40 border border-border rounded-xl text-xs font-mono leading-relaxed text-text-secondary select-text overflow-y-auto max-h-[160px]"
                                dangerouslySetInnerHTML={{ __html: parseMarkdownLite(progress.lessonNotes[lesson.id]) }}
                              />
                            ) : (
                              <div className="p-4 text-center border border-dashed border-border rounded-xl">
                                <span className="text-xl block mb-1">✍️</span>
                                <span className="text-[10px] text-text-muted">Chưa ghi lại bài học nào.</span>
                              </div>
                            )}

                            <button
                              onClick={() => startEditNote(lesson.id)}
                              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-mika-p600 border border-mika-p600/30 bg-mika-p50/40 hover:bg-mika-p50/80 active:scale-95 transition-all"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{progress.lessonNotes[lesson.id] ? 'Cập nhật ghi chú' : 'Viết ghi chú bài học'}</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Complete Checklist Indicator */}
                      <div className="mt-4 p-4 border border-mika-a600/20 bg-mika-a50/30 rounded-xl flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-text-primary">Đã hoàn thành bài học?</span>
                          <span className="text-[10px] text-text-muted">Tick để ghi nhận điểm học tập</span>
                        </div>
                        <button
                          onClick={() => toggleLesson(lesson.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                            progress.completedLessons[lesson.id]
                              ? 'bg-mika-a600 text-white'
                              : 'bg-bg-secondary text-text-secondary border border-border'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>{progress.completedLessons[lesson.id] ? 'Đã Xong ✓' : 'Hoàn thành'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Slide Card Bottom Controller Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border bg-bg-base">
                  <button
                    disabled={isFirstSlide}
                    onClick={handlePrev}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                      isFirstSlide
                        ? 'opacity-40 cursor-not-allowed border-border text-text-muted bg-bg-secondary/20'
                        : 'bg-bg-card border-border text-text-secondary hover:bg-bg-secondary'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <span className="text-xs font-semibold font-mono text-text-muted">
                    Trang {currentSlideIndex + 1} / {slides.length}
                  </span>

                  <button
                    onClick={handleNext}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95 ${
                      isLastSlide
                        ? 'bg-mika-a600 hover:bg-mika-a700 shadow-md'
                        : 'bg-mika-p600 hover:bg-mika-p700 shadow-md'
                    }`}
                  >
                    <span>{isLastSlide ? 'Hoàn tất' : 'Kế tiếp'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
