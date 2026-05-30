// src/hooks/useTimer.ts
import { useState, useEffect, useRef } from 'react';

export function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef<number>(0);

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now() - accumulatedTimeRef.current;
  };

  const pauseTimer = () => {
    if (!isRunning) return;
    setIsRunning(false);
    if (startTimeRef.current !== null) {
      accumulatedTimeRef.current = Date.now() - startTimeRef.current;
    }
    if (timerRef.current !== null) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    accumulatedTimeRef.current = 0;
    startTimeRef.current = null;
    setSeconds(0);
    if (timerRef.current !== null) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    const updateTimer = () => {
      if (isRunning && startTimeRef.current !== null) {
        const deltaMs = Date.now() - startTimeRef.current;
        setSeconds(Math.floor(deltaMs / 1000));
        timerRef.current = requestAnimationFrame(updateTimer);
      }
    };

    if (isRunning) {
      timerRef.current = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (timerRef.current !== null) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    
    return [
      hrs.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };

  return {
    seconds,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    formattedTime: formatTime(seconds),
  };
}
