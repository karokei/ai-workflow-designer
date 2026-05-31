// src/types/progress.ts

export interface QuizResult {
  answers: number[]; // User's selected option index per question
  score: number; // 0–100
  completedAt: string;
  attempts: number;
}

export interface ChallengeResult {
  codeAnswer: string;
  score: number; // 0–100
  feedback: string; // Critique review text
  status: "pass" | "fail";
  gradedAt: string;
}

export interface StudySession {
  date: string; // "2026-01-15"
  seconds: number;
}

export interface UserProgress {
  version: string; // "1.0.0" — for migration
  completedLessons: Record<string, boolean>; // lessonId → true/false
  lessonNotes: Record<string, string>; // lessonId → note text
  quizResults: Record<string, QuizResult>; // lessonId → quiz result
  checklistProgress: Record<string, boolean[]>; // lessonId → boolean array
  challengeResults: Record<string, ChallengeResult>; // lessonId → challenge result
  studyTime: {
    totalSeconds: number;
    sessions: StudySession[];
  };
  lastActivePhase: number;
  lastActiveAt: string; // ISO date string
}
