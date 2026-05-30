// src/hooks/useProgress.ts
import { useState, useEffect, useRef } from 'react';
import { UserProgress, QuizResult } from '@/types/progress';
import localforage from 'localforage';

const STORAGE_KEY = 'aiwfd:progress';
const BROADCAST_CHANNEL_NAME = 'aiwfd:progress-channel';

const defaultProgress: UserProgress = {
  version: '1.0.0',
  completedLessons: {},
  lessonNotes: {},
  quizResults: {},
  checklistProgress: {},
  studyTime: {
    totalSeconds: 0,
    sessions: [],
  },
  lastActivePhase: 0,
  lastActiveAt: new Date().toISOString(),
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoading, setIsLoading] = useState(true);
  const channelRef = useRef<BroadcastChannel | null>(null);

  // Initialize storage and sync channel
  useEffect(() => {
    // Setup localforage
    localforage.config({
      name: 'ai-workflow-designer',
      storeName: 'user_progress',
    });

    // Load progress from IndexedDB
    localforage.getItem<UserProgress>(STORAGE_KEY).then((savedProgress) => {
      if (savedProgress) {
        setProgress(savedProgress);
      } else {
        localforage.setItem(STORAGE_KEY, defaultProgress);
      }
      setIsLoading(false);
    }).catch((err) => {
      console.error("Failed to load progress from IndexedDB:", err);
      setIsLoading(false);
    });

    // Setup BroadcastChannel for multi-tab sync
    const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<UserProgress>) => {
      if (event.data && event.data.version) {
        setProgress(event.data);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const saveProgress = async (newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      await localforage.setItem(STORAGE_KEY, newProgress);
      // Broadcast to other tabs
      if (channelRef.current) {
        channelRef.current.postMessage(newProgress);
      }
    } catch (err) {
      console.error("Failed to save progress to IndexedDB:", err);
    }
  };

  const toggleLesson = async (lessonId: string) => {
    const newProgress = {
      ...progress,
      completedLessons: {
        ...progress.completedLessons,
        [lessonId]: !progress.completedLessons[lessonId],
      },
      lastActiveAt: new Date().toISOString(),
    };
    await saveProgress(newProgress);
  };

  const saveNote = async (lessonId: string, note: string) => {
    const newProgress = {
      ...progress,
      lessonNotes: {
        ...progress.lessonNotes,
        [lessonId]: note,
      },
      lastActiveAt: new Date().toISOString(),
    };
    await saveProgress(newProgress);
  };

  const saveQuizResult = async (lessonId: string, result: QuizResult) => {
    const newProgress = {
      ...progress,
      quizResults: {
        ...progress.quizResults,
        [lessonId]: result,
      },
      lastActiveAt: new Date().toISOString(),
    };
    await saveProgress(newProgress);
  };

  const saveChecklist = async (lessonId: string, checklistState: boolean[]) => {
    const newProgress = {
      ...progress,
      checklistProgress: {
        ...progress.checklistProgress,
        [lessonId]: checklistState,
      },
      lastActiveAt: new Date().toISOString(),
    };
    await saveProgress(newProgress);
  };

  const resetProgress = async () => {
    await saveProgress(defaultProgress);
  };

  return {
    progress,
    isLoading,
    toggleLesson,
    saveNote,
    saveQuizResult,
    saveChecklist,
    resetProgress,
  };
}
