// src/types/curriculum.ts

export type LessonType = "theory" | "exercise" | "project" | "quiz" | "reading";

export interface Resource {
  title: string;
  url: string;
  kind: "free" | "paid" | "community";
  description?: string;
}

export type ContentBlock =
  | TextBlock
  | HeadingBlock
  | BulletBlock
  | NumberedBlock
  | CodeBlock
  | CalloutBlock
  | QuizBlock
  | ChecklistBlock
  | StepsBlock
  | TableBlock
  | DividerBlock;

export interface TextBlock {
  type: "text";
  content: string; // Markdown-lite: **bold**, *italic*, `code`
}

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3; // h2 = section, h3 = sub-section
  content: string;
}

export interface BulletBlock {
  type: "bullets";
  items: string[];
}

export interface NumberedBlock {
  type: "numbered";
  items: string[];
}

export interface CodeBlock {
  type: "code";
  language: string; // "python", "javascript", "json", "bash", "yaml"
  filename?: string;
  content: string;
  caption?: string;
}

export interface CalloutBlock {
  type: "callout";
  variant: "info" | "warning" | "tip" | "important" | "example";
  title?: string;
  content: string;
}

export interface QuizBlock {
  type: "quiz";
  question: string;
  options: string[]; // 4 options A, B, C, D
  correct: number; // index 0-3
  explanation: string;
}

export interface ChecklistBlock {
  type: "checklist";
  title?: string;
  items: string[];
}

export interface StepsBlock {
  type: "steps";
  title?: string;
  steps: {
    number: number;
    title: string;
    description: string;
    code?: string;
    language?: string;
  }[];
}

export interface TableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface DividerBlock {
  type: "divider";
}

export interface Lesson {
  id: string; // "l{phase}-{module}-{index}"
  title: string;
  duration: string;
  type: LessonType;
  summary: string;
  content: ContentBlock[];
  resources?: Resource[];
}

export type ModuleType = "concept" | "practical" | "project" | "assessment";

export interface Module {
  id: string;
  title: string;
  type: ModuleType;
  estimatedHours: number;
  description: string;
  lessons: Lesson[];
}

export interface ThemeToken {
  color: string;
  bg: string;
  text: string;
  border: string;
  light: string;
}

export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  pace: string;
  totalHours: number;
  icon: string;
  theme: ThemeToken;
  milestone: string;
  outcome: string;
  tools: string[];
  modules: Module[];
}
