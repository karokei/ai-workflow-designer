// src/hooks/useTimer.test.ts
// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimer } from './useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Setup standard mock Date.now starting at 1000000ms
    vi.setSystemTime(1000000);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with default stopped state', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.seconds).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.formattedTime).toBe('00:00:00');
  });

  it('should start timer and update seconds correctly over time', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.isRunning).toBe(false);

    act(() => {
      result.current.startTimer();
    });

    expect(result.current.isRunning).toBe(true);

    // Advance time by 3.1 seconds (3100ms) to ensure it triggers 3s boundary (due to 16.7ms RAF quantization)
    act(() => {
      vi.advanceTimersByTime(3100);
    });

    expect(result.current.seconds).toBe(3);
    expect(result.current.formattedTime).toBe('00:00:03');
  });

  it('should pause timer and preserve elapsed time', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      vi.advanceTimersByTime(5100); // 5.1s to guarantee crossing 5s boundary
    });

    expect(result.current.seconds).toBe(5);

    act(() => {
      result.current.pauseTimer();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.seconds).toBe(5);

    // Advance time while paused, seconds should not increase
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.seconds).toBe(5);
  });

  it('should resume timer from where it paused', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      vi.advanceTimersByTime(2100); // 2.1s
    });

    expect(result.current.seconds).toBe(2);

    act(() => {
      result.current.pauseTimer();
    });

    // Advance system time while paused
    act(() => {
      vi.advanceTimersByTime(10000); // 10s elapsed on system clock, but paused
    });

    act(() => {
      result.current.startTimer(); // Resume
    });

    expect(result.current.isRunning).toBe(true);
    expect(result.current.seconds).toBe(2); // Should start from 2, not 12

    act(() => {
      vi.advanceTimersByTime(3100); // 3.1s more
    });

    expect(result.current.seconds).toBe(5);
    expect(result.current.formattedTime).toBe('00:00:05');
  });

  it('should reset timer completely when calling resetTimer', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      vi.advanceTimersByTime(4100);
    });

    expect(result.current.seconds).toBe(4);

    act(() => {
      result.current.resetTimer();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.seconds).toBe(0);
    expect(result.current.formattedTime).toBe('00:00:00');
  });

  it('should format long durations correctly', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.startTimer();
    });

    // 1 hour, 15 minutes, 30 seconds = 3600 + 900 + 30 = 4530 seconds
    act(() => {
      vi.advanceTimersByTime(4530 * 1000 + 100); // +100ms jitter buffer
    });

    expect(result.current.seconds).toBe(4530);
    expect(result.current.formattedTime).toBe('01:15:30');
  });
});
