// src/hooks/useProgress.test.ts
// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useProgress } from './useProgress';

// Setup Mock Storage
const mockStore: Record<string, any> = {};

vi.mock('localforage', () => {
  return {
    default: {
      config: vi.fn(),
      getItem: vi.fn(async (key: string) => {
        return mockStore[key] || null;
      }),
      setItem: vi.fn(async (key: string, value: any) => {
        mockStore[key] = value;
        return value;
      }),
      removeItem: vi.fn(async (key: string) => {
        delete mockStore[key];
      }),
    },
  };
});

// Setup Mock BroadcastChannel
let latestChannelInstance: any = null;

class MockBroadcastChannel {
  name: string;
  onmessage: ((event: MessageEvent) => void) | null = null;
  postMessage = vi.fn();
  close = vi.fn();
  
  constructor(name: string) {
    this.name = name;
    latestChannelInstance = this;
  }
}

(globalThis as any).BroadcastChannel = MockBroadcastChannel;

describe('useProgress', () => {
  beforeEach(() => {
    // Clear mock store and latest channel instance
    for (const key in mockStore) {
      delete mockStore[key];
    }
    latestChannelInstance = null;
    vi.clearAllMocks();
  });

  it('should initialize with default progress if no saved data is in IndexedDB', async () => {
    const { result } = renderHook(() => useProgress());

    // Wait for the hook's loading phase to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.progress.version).toBe('1.0.0');
    expect(result.current.progress.completedLessons).toEqual({});
    expect(result.current.progress.lessonNotes).toEqual({});
    expect(result.current.progress.quizResults).toEqual({});
    expect(result.current.progress.checklistProgress).toEqual({});
  });

  it('should load saved progress from IndexedDB if present', async () => {
    const savedData = {
      version: '1.0.0',
      completedLessons: { 'l0-1-1': true },
      lessonNotes: { 'l0-1-1': 'Test Note' },
      quizResults: {},
      checklistProgress: {},
      studyTime: { totalSeconds: 100, sessions: [] },
      lastActivePhase: 1,
      lastActiveAt: new Date().toISOString(),
    };
    mockStore['aiwfd:progress'] = savedData;

    const { result } = renderHook(() => useProgress());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.progress.completedLessons['l0-1-1']).toBe(true);
    expect(result.current.progress.lessonNotes['l0-1-1']).toBe('Test Note');
    expect(result.current.progress.studyTime.totalSeconds).toBe(100);
  });

  it('should toggle lesson completion status correctly and save it', async () => {
    const { result } = renderHook(() => useProgress());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.progress.completedLessons['l0-1-1']).toBeFalsy();

    await act(async () => {
      await result.current.toggleLesson('l0-1-1');
    });

    expect(result.current.progress.completedLessons['l0-1-1']).toBe(true);
    expect(mockStore['aiwfd:progress'].completedLessons['l0-1-1']).toBe(true);
    expect(latestChannelInstance.postMessage).toHaveBeenCalled();
  });

  it('should save notes correctly and trigger broad channel broadcast', async () => {
    const { result } = renderHook(() => useProgress());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.saveNote('l0-1-1', 'Clean architecture principles');
    });

    expect(result.current.progress.lessonNotes['l0-1-1']).toBe('Clean architecture principles');
    expect(mockStore['aiwfd:progress'].lessonNotes['l0-1-1']).toBe('Clean architecture principles');
    expect(latestChannelInstance.postMessage).toHaveBeenCalled();
  });

  it('should save quiz results correctly', async () => {
    const { result } = renderHook(() => useProgress());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const quizRes = {
      answers: [0, 1, 3],
      score: 100,
      completedAt: new Date().toISOString(),
      attempts: 1,
    };

    await act(async () => {
      await result.current.saveQuizResult('l0-1-1', quizRes);
    });

    expect(result.current.progress.quizResults['l0-1-1']).toEqual(quizRes);
    expect(mockStore['aiwfd:progress'].quizResults['l0-1-1']).toEqual(quizRes);
  });

  it('should save project checklist status correctly', async () => {
    const { result } = renderHook(() => useProgress());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const checklistState = [true, false, true];

    await act(async () => {
      await result.current.saveChecklist('l0-1-1', checklistState);
    });

    expect(result.current.progress.checklistProgress['l0-1-1']).toEqual(checklistState);
    expect(mockStore['aiwfd:progress'].checklistProgress['l0-1-1']).toEqual(checklistState);
  });

  it('should sync state when a message is received from BroadcastChannel', async () => {
    const { result } = renderHook(() => useProgress());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const externalProgress = {
      version: '1.0.0',
      completedLessons: { 'l0-1-1': true, 'l0-1-2': true },
      lessonNotes: { 'l0-1-1': 'Synced note' },
      quizResults: {},
      checklistProgress: {},
      studyTime: { totalSeconds: 50, sessions: [] },
      lastActivePhase: 0,
      lastActiveAt: new Date().toISOString(),
    };

    // Simulate event on BroadcastChannel
    act(() => {
      if (latestChannelInstance && latestChannelInstance.onmessage) {
        latestChannelInstance.onmessage(
          new MessageEvent('message', { data: externalProgress })
        );
      }
    });

    expect(result.current.progress.completedLessons['l0-1-2']).toBe(true);
    expect(result.current.progress.lessonNotes['l0-1-1']).toBe('Synced note');
  });

  it('should reset progress back to default correctly', async () => {
    const savedData = {
      version: '1.0.0',
      completedLessons: { 'l0-1-1': true },
      lessonNotes: { 'l0-1-1': 'Test Note' },
      quizResults: {},
      checklistProgress: {},
      studyTime: { totalSeconds: 100, sessions: [] },
      lastActivePhase: 1,
      lastActiveAt: new Date().toISOString(),
    };
    mockStore['aiwfd:progress'] = savedData;

    const { result } = renderHook(() => useProgress());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.progress.completedLessons['l0-1-1']).toBe(true);

    await act(async () => {
      await result.current.resetProgress();
    });

    expect(result.current.progress.completedLessons).toEqual({});
    expect(result.current.progress.lessonNotes).toEqual({});
  });
});
