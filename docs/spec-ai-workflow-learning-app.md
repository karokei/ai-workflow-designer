# Product Specification
# AI Workflow Designer — Ứng Dụng Học Tập Tương Tác

**Phiên bản:** 1.0.0  
**Ngày:** 30/05/2026  
**Trạng thái:** Draft for Review  
**Loại tài liệu:** Product Requirements Document (PRD) + Technical Spec

---

## Mục Lục

1. [Tổng Quan Sản Phẩm](#1-tổng-quan-sản-phẩm)
2. [Mục Tiêu & Thành Công](#2-mục-tiêu--thành-công)
3. [Người Dùng (User Personas)](#3-người-dùng-user-personas)
4. [Kiến Trúc Thông Tin (IA)](#4-kiến-trúc-thông-tin-ia)
5. [Data Models](#5-data-models)
6. [Tính Năng Chi Tiết (Feature Specs)](#6-tính-năng-chi-tiết-feature-specs)
7. [Thiết Kế UI/UX](#7-thiết-kế-uiux)
8. [Responsive Breakpoints](#8-responsive-breakpoints)
9. [Design System — Mika](#9-design-system--mika)
10. [Tech Stack](#10-tech-stack)
11. [Cấu Trúc Dự Án](#11-cấu-trúc-dự-án)
12. [Content Schema — Nội Dung Bài Học](#12-content-schema--nội-dung-bài-học)
13. [Accessibility & Performance](#13-accessibility--performance)
14. [Phạm Vi & Lộ Trình (Scope & Roadmap)](#14-phạm-vi--lộ-trình-scope--roadmap)

---

## 1. Tổng Quan Sản Phẩm

### 1.1 Mô tả ngắn
Ứng dụng học tập tương tác giúp người dùng Việt Nam theo lộ trình **12–18 tháng** để trở thành **AI Workflow Designer** chuyên nghiệp. Ứng dụng cung cấp giáo trình có cấu trúc rõ ràng, nội dung bài học chi tiết với nhiều định dạng (lý thuyết, thực hành, dự án, quiz), theo dõi tiến độ cá nhân và hỗ trợ học tập liên tục.

### 1.2 Vấn đề cần giải quyết
Người học AI Workflow muốn chuyển nghề nhưng gặp phải:
- Không biết học gì trước, học gì sau — thiếu lộ trình có cấu trúc
- Tài liệu học tập rời rạc, không có nội dung thực hành cụ thể
- Không track được tiến độ và không biết mình đang ở đâu
- Thiếu bài tập, project, và tiêu chí đánh giá cụ thể

### 1.3 Giải pháp
Một **Single Page Application** hoạt động offline-first, không cần đăng nhập, lưu toàn bộ tiến độ tại localStorage — với:
- **6 Phase** học tập có cấu trúc rõ ràng
- **Nội dung bài học đầy đủ** trong app: lý thuyết, hướng dẫn thực hành, code snippet, câu hỏi quiz, project brief
- **Progress tracking** chi tiết đến từng bài học
- **Notes cá nhân** gắn vào mỗi bài
- **Study Timer** theo dõi thời gian học

---

## 2. Mục Tiêu & Thành Công

### 2.1 Mục tiêu sản phẩm
| Mục tiêu | Chỉ số đo lường |
|---|---|
| Người dùng hoàn thành ít nhất 1 phase | ≥ 30% users complete Phase 0 |
| Nội dung bài học hữu ích | Người dùng mở lesson detail ≥ 2 lần/lesson |
| Retention | Người dùng quay lại ngày hôm sau |
| Tốc độ tải | First Contentful Paint < 1.5s |

### 2.2 Non-goals (Không làm trong v1)
- Không cần backend / database / authentication
- Không cần video player nhúng trong app
- Không cần social features (comments, forums)
- Không cần AI-powered personalization
- Không cần payment / subscription

---

## 3. Người Dùng (User Personas)

### Persona A — "Người chuyển nghề"
- **Tuổi:** 25–35, đang làm Marketing/Sales/Admin
- **Kỹ thuật:** Biết dùng Google Sheets, Notion; chưa biết code
- **Mục tiêu:** Trở thành AI Automation Freelancer trong 12 tháng
- **Pain:** Không biết bắt đầu từ đâu, sợ kỹ thuật

### Persona B — "Developer muốn mở rộng"
- **Tuổi:** 22–30, đang làm backend/frontend developer
- **Kỹ thuật:** Biết Python/JS, quen với API
- **Mục tiêu:** Thêm AI Workflow vào skill set, tăng rate freelance
- **Pain:** Muốn skip phần cơ bản, cần nội dung thực chiến

### Persona C — "Người học nhanh"
- **Hành vi:** Học buổi tối 1–2h/ngày, dùng mobile nhiều
- **Cần:** App chạy mượt trên điện thoại, lưu progress không mất

---

## 4. Kiến Trúc Thông Tin (IA) (Mobile-First Architecture)

```
App
├── HUD Bottom Navigation Bar (Di động - cố định dưới đáy)
│   ├── Tab 🗺 LỘ TRÌNH (Quest Line Map)
│   ├── Tab 📚 HỌC (Swipeable Focus Cards)
│   ├── Tab 🔍 TÌM KIẾM (Autofocus Search)
│   └── Tab 📝 CÁ NHÂN (Stats & Notes & Timer)
│
├── Sticky Nav Bar (Desktop, ẩn trên di động)
│   ├── Logo / Title
│   ├── View Switcher [Học | Lộ trình | Tìm kiếm]
│   ├── Study Timer Display
│   ├── Global Progress Pill
│   └── Dark Mode Toggle
│
├── View: LỘ TRÌNH (Quest Line Map)
│   ├── Stats Bar (4 metrics)
│   └── Gamified Quest Path (6 Phase zic-zắc kiểu Duolingo, phát sáng neon pulse)
│
├── View: HỌC (Curriculum & Swipeable Focus Cards)
│   ├── Phase Header Banner (milestone, tools, overall progress)
│   └── Swipeable Slide Cards (Vuốt ngang trái/phải hoặc chạm nút dưới đáy)
│       ├── Card 1: Khối kiến thức 1 / Bước thực hành 1 + Code block (Auto-wrap & Quick Font Scale)
│       ├── Card 2: Khối kiến thức 2 / Bước thực hành 2
│       └── Card X: Quiz (MCQ) & Checklist & Ghi chú cá nhân (DOMPurify)
│
├── View: TÌM KIẾM
│   ├── Search Input (Debounced, Autofocus)
│   └── Search Results (cards với nhãn phase tương ứng)
│
└── HUD Floating Timer Widget (Hình tròn nổi ở góc màn hình)
    ├── Hiển thị đếm giờ (Pulse glow neon Cyan)
    ├── Chạm nhẹ: Tạm dừng / Tiếp tục (Pause/Resume)
    └── Nhấn giữ: Reset thời gian học
```

---

## 5. Data Models

### 5.1 Lesson Content Model

Đây là model quan trọng nhất — **mỗi bài học PHẢI có trường `content`** với nội dung chi tiết.

```typescript
// ── Lesson Types ─────────────────────────────────────────────────────────
type LessonType = "theory" | "exercise" | "project" | "quiz" | "reading";

// ── Resource Link ─────────────────────────────────────────────────────────
interface Resource {
  title: string;
  url: string;
  kind: "free" | "paid" | "community";
  description?: string;
}

// ── Content Blocks (Union type) ───────────────────────────────────────────
// Mỗi bài học gồm 1 mảng ContentBlock, render theo type

type ContentBlock =
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

interface TextBlock {
  type: "text";
  content: string;           // Markdown-lite: **bold**, *italic*, `code`
}

interface HeadingBlock {
  type: "heading";
  level: 2 | 3;              // h2 = section, h3 = sub-section
  content: string;
}

interface BulletBlock {
  type: "bullets";
  items: string[];           // Hỗ trợ markdown-lite trong mỗi item
}

interface NumberedBlock {
  type: "numbered";
  items: string[];
}

interface CodeBlock {
  type: "code";
  language: string;          // "python", "javascript", "json", "bash", "yaml"
  filename?: string;         // Optional: hiển thị tên file
  content: string;           // Raw code string, preserve whitespace
  caption?: string;          // Chú thích dưới code block
}

interface CalloutBlock {
  type: "callout";
  variant: "info" | "warning" | "tip" | "important" | "example";
  title?: string;
  content: string;
}

interface QuizBlock {
  type: "quiz";
  question: string;
  options: string[];         // 4 options A, B, C, D
  correct: number;           // index 0-3
  explanation: string;       // Giải thích tại sao đáp án đúng
}

interface ChecklistBlock {
  type: "checklist";
  title?: string;
  items: string[];           // Checklist items, user có thể check
}

interface StepsBlock {
  type: "steps";
  title?: string;
  steps: {
    number: number;
    title: string;
    description: string;
    code?: string;           // Optional code cho step này
    language?: string;
  }[];
}

interface TableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

interface DividerBlock {
  type: "divider";
}

// ── Lesson ────────────────────────────────────────────────────────────────
interface Lesson {
  id: string;                // format: "l{phase}-{module}-{index}" e.g. "l0-1-1"
  title: string;
  duration: string;          // e.g. "45 phút", "2 giờ"
  type: LessonType;
  summary: string;           // 1-2 câu mô tả ngắn (hiển thị ở lesson row)
  content: ContentBlock[];   // Nội dung chi tiết (hiển thị trong Lesson Detail Panel)
  resources?: Resource[];
}

// ── Module ────────────────────────────────────────────────────────────────
type ModuleType = "concept" | "practical" | "project" | "assessment";

interface Module {
  id: string;
  title: string;
  type: ModuleType;
  estimatedHours: number;
  description: string;       // 1 câu mô tả module
  lessons: Lesson[];
}

// ── Phase ─────────────────────────────────────────────────────────────────
interface Phase {
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
```

### 5.2 User Progress Model

```typescript
// Lưu tại IndexedDB (thông qua localForage / Dexie.js) cho các dữ liệu lớn (tiến trình, ghi chú) để tránh giới hạn 5MB của localStorage.
// Cấu hình lưu trữ: key "aiwfd:progress" lưu trữ cấu trúc UserProgress dưới đây.
interface UserProgress {
  version: string;           // "1.0.0" — for migration
  completedLessons: Record<string, boolean>;     // lessonId → true/false
  lessonNotes: Record<string, string>;           // lessonId → note text (sẽ được DOMPurify làm sạch trước khi render)
  quizResults: Record<string, QuizResult>;       // lessonId → quiz result
  checklistProgress: Record<string, boolean[]>;  // lessonId → boolean array
  studyTime: {
    totalSeconds: number;
    sessions: StudySession[];
  };
  lastActivePhase: number;
  lastActiveAt: string;      // ISO date string
}

interface QuizResult {
  answers: number[];         // User's selected option index per question
  score: number;             // 0–100
  completedAt: string;
  attempts: number;
}

interface StudySession {
  date: string;              // "2026-01-15"
  seconds: number;
}
```

### 5.3 Theme Token Model

```typescript
interface ThemeToken {
  color: string;       // Primary action color (buttons, accents)
  bg: string;          // Light background tint
  text: string;        // Dark text on bg
  border: string;      // Border color
  light: string;       // Lighter background variant
}
```

---

## 6. Tính Năng Chi Tiết (Feature Specs)

### Feature 1 — Navigation & Layout (Mobile-First)

#### F1.1 HUD Bottom Navigation Bar (Chỉ hiển thị trên Mobile < 1024px)
| Element | Spec |
|---|---|
| Height | 56px cố định ở cạnh dưới màn hình |
| Background | `bg-card / blur(16px)` — hiệu ứng kính mờ (glassmorphism) |
| Border | `border-t 1px solid var(--border)` |
| Tabs | 4 tabs icon + nhãn: 🗺 Lộ trình / 📚 Học / 🔍 Tìm kiếm / 📝 Cá nhân |
| Active State | Đèn neon mờ dưới chân icon active, icon chuyển màu `var(--mika-p600)` hoặc màu phase |

#### F1.2 Sticky Navigation Bar (Chỉ hiển thị trên Desktop >= 1024px)
| Element | Spec |
|---|---|
| Height | 60px cố định ở cạnh trên màn hình |
| Background | `bg-card / blur(12px)` — semi-transparent backdrop |
| Logo | "AI Workflow Designer" + subtitle |
| View Switcher | 3 tabs: 📚 Học / 🗺 Lộ trình / 🔍 Tìm kiếm |
| Study Timer | `HH:MM:SS` display + Play/Pause + Reset |
| Progress Pill | Mini progress bar + `XX%` |
| Dark Mode Toggle | Icon ☀️/🌙, toggle theme |

#### F1.3 HUD Floating Timer Widget (Chỉ hiển thị trên Mobile < 1024px)
- **Mô tả**: Nút tròn nổi (Floating Action Button - FAB) đường kính `48px` nằm góc dưới bên phải.
- **Visual**:
  *   Nền mờ đen `bg-bg-secondary/80 blur(4px)`. viền phát sáng nhịp thở (Pulse glow neon Cyan).
  *   Khi đang chạy: Chữ số đếm giây chạy chuyển động nhỏ, viền pulse liên tục.
- **Tương tác**:
  *   Chạm nhẹ (Single-tap): Tạm dừng / Tiếp tục đếm giờ.
  *   Nhấn giữ (Long-press): Khởi động lại bộ đếm giờ (Reset).

#### F1.4 Desktop Sidebar Phase Navigator (Chỉ hiển thị trên Desktop >= 1024px)
| Element | Spec |
|---|---|
| Width | 288px (sticky left) |
| Visibility | Chỉ hiển thị ở màn hình Desktop (>= 1024px). |
| Phase Item | Icon (40px) + Title + Duration + Progress bar + % complete |
| Active State | Border highlight dùng phase.theme.color, background dùng phase.theme.bg |

---

### Feature 2 — Lộ Trình / Tổng Quan View

#### F2.1 Stats Bar
4 metric cards, responsive grid 2 col (mobile) → 4 col (tablet+):
- **Calculations**: Tổng bài học, Đã hoàn thành, Tổng thời gian tích lũy, % Tiến độ.
- **Visual**: Các góc bo tròn mềm mại `--r-md`, viền phát sáng nhẹ.

#### F2.2 Gamified Quest Path (Chế độ Mobile) & Phase Grid (Chế độ Desktop)
*   **Trên Mobile (Quest Path Map)**:
    *   Hiển thị lộ trình dưới dạng con đường uốn lượn zic-zắc (Duolingo-style Quest Line).
    *   Mỗi Phase là một "Vùng đất" (Sector) được thiết kế hình lục giác/bát giác công nghệ có viền neon màu tương ứng với `phase.theme.color`.
    *   Các Phase đã mở khóa: Đường nối phát sáng neon. Phase chưa học: Mờ tối (`opacity-40`).
    *   Mỗi nút mốc (node) có thanh tiến độ vòng tròn (radial progress bar) chạy quanh icon.
*   **Trên Desktop (Phase Cards Grid)**:
    *   Hiển thị dạng lưới 3 cột: Mỗi card có Phase icon (44px), Phase title, Subtitle, Progress bar, `X/Y bài`, `XX%`, CTA "Học ngay →".
    *   Hover effect: `translateY(-3px)` + shadow elevation phát sáng nhẹ.

---

### Feature 3 — Curriculum View (Mobile Swipeable Focus Cards)

*   **Chế độ Desktop (Accordion truyền thống)**: Hiển thị Phase Header Banner, danh sách Module Accordion, mỗi dòng Lesson Row chứa Checkbox và nút expand in-place như mô tả cổ điển.
*   **Chế độ Mobile (Swipeable Focus Cards Layout)**:
    *   Khi người dùng chạm chọn một bài học, thay vì hiển thị cuộn trang dọc, giao diện sẽ chuyển đổi thành một **Bàn trình diễn slide vuốt ngang (Tinder-like Slide Cards)**.
    *   Mỗi Slide Card hiển thị duy nhất 1-2 khối nội dung (Content Blocks) lớn của bài học để tối ưu độ tập trung.
    *   Cạnh dưới màn hình là thanh điều phối:
        *   Nút **[Quay lại]** và nút **[Kế tiếp]** hỗ trợ chuyển Slide mượt mà kèm hiệu ứng `slide-in` nhẹ (200ms).
        *   Thanh tiến độ chỉ số Card hiện tại: `Trang X/Y` hoặc các dấu chấm tiến độ mini.
        *   Trang cuối cùng sẽ là **Quiz kiểm tra**, **Checklist dự án** hoặc **Khung Ghi chú cá nhân (Notes Editor)**.

#### F3.1 Phase Header Banner
Khi user chọn 1 phase, hiển thị banner với:

```
┌─────────────────────────────────────────────────────────┐
│  [Icon 54px]  Phase X badges | Duration | Hours | Pace  │
│               PHASE TITLE (H2)                          │
│               Subtitle text                             │
│                                                         │
│  Progress: ████████░░░░ X/Y bài (XX%)                   │
│                                                         │
│  🎯 Milestone: [text]                                    │
│  ✅ Outcome: [text]                                      │
│                                                         │
│  Tools: [chip] [chip] [chip] ...                        │
└─────────────────────────────────────────────────────────┘
```
- Background: `phase.theme.bg`
- Border: `1px solid phase.theme.border`
- Border radius: 20px

#### F3.2 Module Accordion (Dùng cho Desktop/Tablet)
- Cấu trúc: Đầu mục Module (Header click to expand), Thanh tiến độ module 3px, Danh sách bài học Lesson Row bên trong.

#### F3.3 Lesson Row (Dùng cho Desktop/Tablet)
- Checkbox (○) 20px. Done state: Gạch ngang tiêu đề bài học.
- Click mở rộng Lesson Detail Panel (in-place) ngay bên dưới row.

**Lesson Type Badges:**
| Type | Icon | Label | BG | Text |
|---|---|---|---|---|
| theory | 📚 | Lý thuyết | `#dbeafe` | `#1e40af` |
| exercise | ✍️ | Thực hành | `#d1fae5` | `#065f46` |
| project | 🏗 | Dự án | `#fce7f3` | `#831843` |
| quiz | ❓ | Quiz | `#ffe4e6` | `#9f1239` |
| reading | 📖 | Đọc | `#fef3c7` | `#92400e` |

---

### Feature 4 — Lesson Detail Panel ⭐ (Feature quan trọng nhất)

Khi user click [▼] trên Lesson Row, Panel mở rộng in-place bên dưới row đó.

#### F4.1 Layout của Panel

```
┌─────────────────────────────────────────────────────────┐
│  Summary text (1-2 câu)                                 │
├─────────────────────────────────────────────────────────┤
│  [CONTENT BLOCKS — xem F4.2]                            │
│                                                         │
│  ...rendered content theo lesson.content array...       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Tài nguyên học tập                                     │
│  [🆓 Resource 1 ↗]  [👥 Community 2 ↗]                 │
├─────────────────────────────────────────────────────────┤
│  📝 Ghi chú cá nhân                                     │
│  [Note editor / display]                                │
└─────────────────────────────────────────────────────────┘
```

#### F4.2 Content Block Renderers

Mỗi item trong `lesson.content[]` được render theo `type`:

---

**`text` block**
```
Paragraph text với markdown-lite parsing:
- **bold** → <strong>
- *italic* → <em>
- `code` → <code> inline styled
```
Style: `font-size: 14px`, `line-height: 1.75`, `color: text-secondary`, margin-bottom `16px`.

---

**`heading` block**
```
## Heading cấp 2    (H3 HTML, 16px, bold, border-bottom)
### Heading cấp 3   (H4 HTML, 14px, bold, no border)
```

---

**`bullets` / `numbered` blocks**
```
• Item với markdown-lite trong text
• **Bold text** hỗ trợ trong bullet
• `code inline` hỗ trợ
```
Style: `padding-left: 20px`, `gap: 6px` giữa items, `font-size: 13px`.

---

**`code` block (Mobile-Optimized Code Viewer)**
```
┌─ filename.py ────────────────────────── [Copy] ┐
│  import anthropic                               │
│                                                 │
│  client = anthropic.Anthropic()                 │
│  message = client.messages.create(              │
│      model="claude-3-5-haiku-20241022",         │
│      max_tokens=1024,                           │
│      messages=[                                 │
│          {"role": "user", "content": "Hello"}   │
│      ]                                          │
│  )                                              │
│  print(message.content)                         │
├─────────────────────────────────────────────────┤
│  [A+]  [A-]  [Toggle Wrap]                      │  ← Mobile Quick Actions Bar
└─────────────────────────────────────────────────┘
  Caption text (nếu có)
```
- Background: `#1e293b` (dark), `#0f172a` (darker on dark mode).
- Font: `'Fira Code', 'Cascadia Code', monospace`, size `12px` (trên desktop), tự động thu nhỏ `11px` (trên mobile).
- **Mobile Quick Actions Bar (Chỉ hiển thị trên Mobile)**:
  *   Nút `[A+]` và `[A-]` để thay đổi kích thước chữ code trực tiếp mà không ảnh hưởng tới chữ văn bản chính.
  *   Nút `[Toggle Wrap]` chuyển đổi giữa chế độ cuộn ngang mặc định (`overflow-x-auto`) và tự động xuống dòng (`whitespace-pre-wrap`), giải quyết triệt để lỗi cuộn ngang mỏi tay trên mobile.
  *   Chạm đúp (Double-tap) trực tiếp vào vùng code để kích hoạt sao chép (Copy) nhanh toàn bộ mã.
- Header bar: filename bên trái + Copy button bên phải.

---

**`callout` block**
```
┌──────────────────────────────────────────────────┐
│  💡 TIP                                           │
│  Title (optional, bold)                          │
│  Content text...                                 │
└──────────────────────────────────────────────────┘
```
| Variant | Icon | BG Color | Border |
|---|---|---|---|
| info | ℹ️ | `#eff6ff` | `#3b82f6` |
| warning | ⚠️ | `#fffbeb` | `#f59e0b` |
| tip | 💡 | `#f0fdf4` | `#22c55e` |
| important | 🚨 | `#fff1f2` | `#f43f5e` |
| example | 📌 | `#f5f3ff` | `#8b5cf6` |

Border: `left border 3px solid`, border-radius `0 12px 12px 0`.

---

**`steps` block** (dùng cho exercise lessons)
```
  Bước 1 — Title của bước
  ─────────────────────────
  Description text...

  [code block nếu có]

  Bước 2 — Title của bước
  ...
```
- Step number: circle badge với phase color, `32px`
- Connector line: `2px dashed border-left` giữa các steps
- Done state: step number circle filled green, title có ✓

---

**`quiz` block** (dùng cho quiz lessons)
```
┌─────────────────────────────────────────────────┐
│  ❓ Câu hỏi X                                    │
│                                                  │
│  [Câu hỏi text]                                  │
│                                                  │
│  ○  A. Option A                                  │
│  ○  B. Option B                                  │
│  ○  C. Option C                                  │
│  ○  D. Option D                                  │
│                                                  │
│  [Kiểm tra đáp án]                               │
├─────────────────────────────────────────────────┤
│  ✅ Đúng! / ❌ Sai                               │
│  Explanation text...                             │
└─────────────────────────────────────────────────┘
```
- Trước khi submit: options có hover state
- Sau khi submit:
  - Đúng: option highlight green, hiển thị explanation
  - Sai: selected option highlight red, correct option highlight green, hiển thị explanation
- "Thử lại" button reset về trạng thái ban đầu
- Progress lưu vào `quizResults` trong localStorage

---

**`checklist` block** (dùng cho project lessons)
```
  Tiêu chí hoàn thành
  ───────────────────
  ☐  Requirement 1
  ☑  Requirement 2 (đã check)
  ☐  Requirement 3
```
- Click vào item để toggle check
- State lưu vào `checklistProgress` trong localStorage
- Progress bar phía trên showing `X/Y checked`

---

**`table` block**
```
┌──────────────┬──────────────┬──────────────┐
│  Header 1    │  Header 2    │  Header 3    │
├──────────────┼──────────────┼──────────────┤
│  Row 1 Col 1 │  Row 1 Col 2 │  Row 1 Col 3 │
│  Row 2 Col 1 │  Row 2 Col 2 │  Row 2 Col 3 │
└──────────────┴──────────────┴──────────────┘
```
- Responsive: horizontal scroll trên mobile nếu quá rộng
- Header row: background `bg-secondary`, text bold
- Alternating row colors

---

#### F4.3 Personal Note Editor

```
┌──────────────────────────────────────────────────┐
│  📝 Ghi chú cá nhân                   [Sửa]      │
│                                                  │
│  [Note content hoặc placeholder]                 │
└──────────────────────────────────────────────────┘
```

**Viewing state:**
- Nếu có note: hiển thị note text trong `bg-secondary` box, border-radius `8px`
- Nếu chưa có: hiển thị button "+ Thêm ghi chú"

**Editing state:**
- `<textarea>` expand tới min 80px height
- Placeholder: "Ghi chú cá nhân, links hữu ích, insights..."
- Button: [Lưu] (primary) + [Huỷ] (ghost)
- Auto-save khi blur (click ra ngoài)
- Lưu vào `lessonNotes[lessonId]` trong localStorage

---

### Feature 5 — Search View

#### F5.1 Search Input
- Autofocus khi switch sang search view
- Search icon prefix trong input
- Placeholder: "Tìm bài học... (ví dụ: 'webhook', 'RAG', 'Claude API')"
- Real-time search: debounce 200ms

#### F5.2 Search Scope
Search across:
- `lesson.title`
- `lesson.summary`
- `lesson.content` (full text của content blocks)
- `lessonNotes[lessonId]` (personal notes của user)

#### F5.3 Search Result Card
```
┌─────────────────────────────────────────────────┐
│  [Phase Badge] Phase X → Module Name            │
│  Lesson Title                                   │
│  Summary text (truncated 2 lines)               │
└─────────────────────────────────────────────────┘
```
Click → navigate to Curriculum view, scroll đến lesson đó, auto-expand lesson panel.

---

### Feature 6 — Study Timer

| State | Display | Actions |
|---|---|---|
| Stopped | `00:00:00` (muted) | [▶ Start] |
| Running | `HH:MM:SS` (accent color, animate) | [⏸ Pause] [↺ Reset] |
| Paused | `HH:MM:SS` (muted) | [▶ Resume] [↺ Reset] |

*   **Cơ chế đếm giờ chính xác (Timestamp Delta)**: Để tránh tình trạng trình duyệt đóng băng (throttling) `setInterval` khi tab chạy ngầm hoặc thu nhỏ, bộ đếm giờ sẽ được tính toán dựa trên độ chênh lệch thời gian thực tế:
    *   Khi nhấn **Start/Resume**: Lưu mốc thời gian thực tế `startTime = Date.now() - accumulatedTime`.
    *   Trong quá trình chạy: `elapsedTime = Date.now() - startTime`, hiển thị thời gian quy đổi từ `elapsedTime`.
    *   Khi nhấn **Pause/Stop**: Dừng cập nhật và lưu giá trị `accumulatedTime = elapsedTime`.
*   Session time lưu vào `studyTime.sessions` khi user pause/stop.
*   Total time tích lũy hiển thị trong Stats Bar.
*   Timer chạy ổn định ngay cả khi switch giữa các views nhờ React Context / Global State.

---

### Feature 7 — Dark Mode

- Toggle button trên nav bar
- Dùng `data-theme="dark"` attribute trên `<html>`
- CSS custom properties override hoàn toàn — không dùng Tailwind dark class
- Preference lưu vào localStorage: `"aiwfd:theme"` = `"light" | "dark"`
- Tự động detect `prefers-color-scheme` lần đầu load

**Dark mode color overrides:**
| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f8fafc` | `#0f172a` |
| `--bg-card` | `#ffffff` | `#1e293b` |
| `--bg-secondary` | `#f1f5f9` | `#1e293b` |
| `--border` | `#e2e8f0` | `#334155` |
| `--text-primary` | `#1e293b` | `#f1f5f9` |
| `--text-secondary` | `#64748b` | `#94a3b8` |
| `--text-muted` | `#94a3b8` | `#475569` |

---

### Feature 8 — Progress Persistence & Multi-tab Sync

*   **Cơ cấu Lưu trữ Phân tầng (Hybrid Storage)**:
    *   **IndexedDB (qua localForage / Dexie.js)**: Lưu dữ liệu tiến độ lớn (`aiwfd:progress` - gồm completedLessons, quizResults, checklistProgress và đặc biệt là lessonNotes).
    *   **localStorage**: Chỉ lưu các tuỳ chọn nhẹ: `aiwfd:theme`, `aiwfd:lastView`, `aiwfd:lastPhase`.
*   **Đồng bộ hoá đa tab (Multi-tab Sync)**:
    *   Sử dụng trình lắng nghe sự kiện `storage` của trình duyệt đối với các thay đổi ở `localStorage` (theme, lastPhase).
    *   Sử dụng cơ chế `BroadcastChannel API` (hoặc lắng nghe sự kiện storage phối hợp) để đồng bộ hóa thời gian thực trạng thái tiến độ (`UserProgress`) giữa các tab khi người dùng mở nhiều tab học song song.

**Auto-save triggers (Lưu trữ bất đồng bộ, debounce 300ms đối với ghi chú):**
- Mỗi khi user toggle lesson complete
- Mỗi khi user nhập/lưu note (áp dụng debounce 300ms để tránh ghi đĩa liên tục)
- Mỗi khi user submit quiz answer
- Mỗi khi user check checklist item
- Mỗi khi timer pauses/stops

---

## 7. Thiết Kế UI/UX

### 7.1 Layout Tổng Thể

```
┌──────────────────────────────────────────────────────────────┐
│  NAV BAR (sticky, 60px)                                      │
├─────────────────┬────────────────────────────────────────────┤
│                 │                                            │
│  SIDEBAR        │  MAIN CONTENT AREA                        │
│  (288px fixed,  │                                            │
│  desktop only)  │  - Stats Bar                              │
│                 │  - Phase Header                           │
│  Phase 0 🧭     │  - Module 1 (accordion)                   │
│  Phase 1 🧠     │    - Lesson Row                           │
│  Phase 2 ⚡     │      [Lesson Detail Panel]                │
│  Phase 3 💻     │    - Lesson Row                           │
│  Phase 4 🤖     │  - Module 2 (accordion)                   │
│  Phase 5 🚀     │  ...                                       │
│  Phase 6 ⭐     │                                            │
│                 │                                            │
└─────────────────┴────────────────────────────────────────────┘
```

### 7.2 Spacing System
Dùng bội số 4px:
- `4px` (xs) — khoảng cách icon/text
- `8px` (sm) — gap trong chips/badges
- `12px` (md) — padding nhỏ
- `16px` (base) — padding card, gap thông thường
- `20px` (lg) — section padding
- `24px` (xl) — card padding lớn
- `32px` (2xl) — section gap
- `48px` (3xl) — page padding lớn

### 7.3 Animation Guidelines
| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| Accordion expand | height 0→auto + opacity 0→1 | 250ms | ease-out |
| Lesson panel open | fadeUp (translateY 8px→0) | 200ms | ease |
| Sidebar slide | translateX | 300ms | ease |
| Progress bar fill | width transition | 600ms | cubic-bezier(.4,0,.2,1) |
| Checkbox toggle | scale + color | 180ms | ease |
| Phase card hover | translateY(-3px) | 150ms | ease |
| Dark mode | background + color | 300ms | ease |

### 7.4 Empty States

Khi search không có kết quả:
```
🔍
Không tìm thấy kết quả cho "[query]"
Thử tìm với từ khoá khác như "webhook", "prompt", "Make.com"
```

Khi phase chưa có bài nào hoàn thành:
```
Bắt đầu bằng cách mở bài học đầu tiên ↑
```

---

## 8. Responsive Breakpoints

### 8.1 Breakpoint Definition
| Name | Width | Target |
|---|---|---|
| Mobile | < 480px | Điện thoại nhỏ |
| Mobile L | 480px – 639px | Điện thoại lớn |
| Tablet | 640px – 1023px | iPad, tablet |
| Desktop | ≥ 1024px | Laptop, PC |

### 8.2 Layout Changes Per Breakpoint

| Element | Mobile (<640) | Tablet (640–1023) | Desktop (≥1024) |
|---|---|---|---|
| Sidebar | Hidden, drawer (overlay) | Hidden, drawer (overlay) | Always visible, sticky left |
| Nav subtitle | Hidden | Visible | Visible |
| Study Timer | Hidden | Visible | Visible |
| Progress Pill | Hidden | Visible | Visible |
| Stats grid | 2 columns | 4 columns | 4 columns |
| Phase cards grid | 1 column | 2 columns | 3 columns |
| Main content padding | 0 16px | 0 20px | 0 (sidebar takes left) |
| Module header | Stacked layout | Row layout | Row layout |
| Code block font | 11px | 12px | 12px |
| Phase header | Stack icon+text | Row layout | Row layout |

### 8.3 Touch Targets
- Tất cả clickable elements: min `44×44px` touch target
- Checkbox: touch area extends bằng padding
- Sidebar items: full width click area

---

## 9. Design System — Mika

### 9.1 Color Palette (CSS Custom Properties)

```css
:root {
  /* Primary — Indigo */
  --mika-p50:  #eef2ff;
  --mika-p100: #e0e7ff;
  --mika-p200: #c7d2fe;
  --mika-p300: #a5b4fc;
  --mika-p400: #818cf8;
  --mika-p500: #6366f1;
  --mika-p600: #4f46e5;  /* ← Primary action color */
  --mika-p700: #4338ca;
  --mika-p800: #3730a3;

  /* Accent — Emerald */
  --mika-a50:  #ecfdf5;
  --mika-a500: #10b981;
  --mika-a600: #059669;  /* ← Accent / success */
  --mika-a700: #047857;

  /* Amber — Warning */
  --mika-am50:  #fffbeb;
  --mika-am600: #d97706;

  /* Rose — Danger */
  --mika-r50:  #fff1f2;
  --mika-r600: #e11d48;

  /* Violet — Advanced */
  --mika-v50:  #f5f3ff;
  --mika-v600: #7c3aed;

  /* Teal — Mastery */
  --mika-t50:  #f0fdfa;
  --mika-t600: #0d9488;

  /* Slate — Neutrals */
  --mika-n0:   #ffffff;
  --mika-n50:  #f8fafc;
  --mika-n100: #f1f5f9;
  --mika-n200: #e2e8f0;
  --mika-n300: #cbd5e1;
  --mika-n400: #94a3b8;
  --mika-n500: #64748b;
  --mika-n600: #475569;
  --mika-n700: #334155;
  --mika-n800: #1e293b;
  --mika-n900: #0f172a;

  /* Semantic tokens */
  --bg:             var(--mika-n50);
  --bg-card:        var(--mika-n0);
  --bg-secondary:   var(--mika-n100);
  --border:         var(--mika-n200);
  --border-light:   var(--mika-n100);
  --text-primary:   var(--mika-n800);
  --text-secondary: var(--mika-n500);
  --text-muted:     var(--mika-n400);
}
```

### 9.2 Phase Color Themes
| Phase | Name | Color | BG | Text | Border |
|---|---|---|---|---|---|
| 0 | Orientation | `#475569` | `#f1f5f9` | `#334155` | `#e2e8f0` |
| 1 | AI Foundations | `#4f46e5` | `#eef2ff` | `#3730a3` | `#c7d2fe` |
| 2 | No-code | `#059669` | `#ecfdf5` | `#065f46` | `#a7f3d0` |
| 3 | Technical | `#d97706` | `#fffbeb` | `#92400e` | `#fde68a` |
| 4 | AI Agent | `#7c3aed` | `#f5f3ff` | `#5b21b6` | `#ddd6fe` |
| 5 | Portfolio | `#e11d48` | `#fff1f2` | `#9f1239` | `#fecdd3` |
| 6 | Mastery | `#0d9488` | `#f0fdfa` | `#134e4a` | `#99f6e4` |

### 9.3 Typography
| Scale | Size | Weight | Usage |
|---|---|---|---|
| xs | 11px | 400/500 | Badges, metadata |
| sm | 12px | 400/500 | Secondary text, captions |
| base | 13px | 400/500 | Body text, lesson content |
| md | 14px | 500/600 | Module titles, lesson titles |
| lg | 15px–16px | 600/700 | Section headings |
| xl | 18px–20px | 700/800 | Phase titles (mobile) |
| 2xl | 22px–24px | 800 | Phase titles (desktop) |

Font stack: `'Be Vietnam Pro', 'Inter', system-ui, -apple-system, sans-serif`
Code font: `'Fira Code', 'Cascadia Code', 'Consolas', monospace`

### 9.4 Border Radius
| Token | Value | Usage |
|---|---|---|
| `--r-sm` | 8px | Buttons small, inputs |
| `--r-md` | 12px | Badges, chips |
| `--r-lg` | 16px | Cards nhỏ |
| `--r-xl` | 20px | Cards thông thường |
| `--r-2xl` | 24px | Modal, Phase header |
| `--r-full` | 999px | Pills, avatars |

### 9.5 Shadows
```css
--shadow-xs: 0 1px 2px rgba(0,0,0,.05);
--shadow-sm: 0 1px 4px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
--shadow-md: 0 4px 16px rgba(0,0,0,.08);
--shadow-lg: 0 12px 40px rgba(0,0,0,.12);
--shadow-focus: 0 0 0 3px rgba(99,102,241,.15);  /* focus ring */
```

### 9.6 Component Specs

**Button variants:**
```
Primary:   bg=--mika-p600, text=white, hover: --mika-p700
Secondary: bg=--bg-secondary, border=--border, hover: bg slightly darker
Ghost:     bg=transparent, border=--border, color=--text-secondary
Danger:    bg=--mika-r50, color=--mika-r600, border=--mika-r100
```

**Input:**
```
border: 1px solid --border
border-radius: --r-sm
padding: 8px 12px
focus: border-color=--mika-p400, box-shadow=--shadow-focus
```

---

## 10. Tech Stack

### 10.1 Frontend (Recommended)
```
Framework:    React 18 + TypeScript
Styling:      Tailwind CSS v3 + CSS Custom Properties cho Mika tokens
State:        React useState + useReducer (no Redux needed)
Persistence:  localStorage (no backend)
Build:        Vite 5
Icons:        Lucide React
Code highlight: Prism.js (optional, lazy load)
Fonts:        Google Fonts (Be Vietnam Pro)
```

### 10.2 Alternative (Simpler)
```
Vanilla:  Inline HTML/CSS/JS (single file, cho demo nhanh)
React CDN: React + Babel standalone (không cần build)
```

### 10.3 File Structure (React version)
```
src/
├── main.tsx
├── App.tsx
├── types/
│   ├── curriculum.ts     ← Lesson, Module, Phase types
│   └── progress.ts       ← UserProgress types
├── data/
│   ├── curriculum.ts     ← CURRICULUM constant (all 6 phases)
│   └── phases/
│       ├── phase-0.ts    ← Phase 0 data với full lesson content
│       ├── phase-1.ts
│       ├── phase-2.ts
│       ├── phase-3.ts
│       ├── phase-4.ts
│       ├── phase-5.ts
│       └── phase-6.ts
├── hooks/
│   ├── useProgress.ts    ← Progress CRUD, localStorage sync
│   ├── useTimer.ts       ← Study timer logic
│   └── useTheme.ts       ← Dark mode toggle
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── curriculum/
│   │   ├── PhaseHeader.tsx
│   │   ├── ModuleAccordion.tsx
│   │   ├── LessonRow.tsx
│   │   └── LessonDetailPanel.tsx
│   ├── content-blocks/
│   │   ├── TextBlock.tsx
│   │   ├── CodeBlock.tsx        ← với copy button
│   │   ├── CalloutBlock.tsx
│   │   ├── StepsBlock.tsx
│   │   ├── QuizBlock.tsx        ← interactive MCQ
│   │   ├── ChecklistBlock.tsx   ← persistent checklist
│   │   ├── BulletsBlock.tsx
│   │   └── TableBlock.tsx
│   ├── views/
│   │   ├── CurriculumView.tsx
│   │   ├── OverviewView.tsx
│   │   └── SearchView.tsx
│   └── shared/
│       ├── StatsBar.tsx
│       ├── ProgressBar.tsx
│       ├── Badge.tsx
│       ├── NoteEditor.tsx
│       └── StudyTimer.tsx
└── utils/
    ├── progress.ts       ← Tính toán % progress, stats
    ├── search.ts         ← Search logic
    └── markdown-lite.ts  ← Parse **bold**, *italic*, `code`
```

---

## 11. Cấu Trúc Dự Án

### 11.1 Data Architecture

Mỗi Phase data file (`phase-X.ts`) export 1 object `Phase`. Ví dụ `phase-0.ts`:

```typescript
// src/data/phases/phase-0.ts
import { Phase } from '@/types/curriculum';
import { T } from '@/data/themes';

export const phase0: Phase = {
  id: 0,
  title: "Hiểu Nghề & Định Hướng",
  // ... metadata
  modules: [
    {
      id: "m0-1",
      title: "Khám Phá Nghề AI Workflow Designer",
      type: "concept",
      estimatedHours: 5,
      description: "Hiểu rõ vai trò và thị trường",
      lessons: [
        {
          id: "l0-1-1",
          title: "AI Workflow Designer là gì?",
          duration: "45 phút",
          type: "theory",
          summary: "Tìm hiểu vai trò, trách nhiệm hằng ngày...",
          content: [
            {
              type: "heading",
              level: 2,
              content: "AI Workflow Designer là gì?"
            },
            {
              type: "text",
              content: "AI Workflow Designer là người chuyên thiết kế, xây dựng và tối ưu hoá..."
            },
            {
              type: "callout",
              variant: "tip",
              title: "Tóm gọn trong 1 câu",
              content: "AI Workflow Designer = người kết nối AI + Tools + Business Process thành hệ thống tự động có giá trị thực tế."
            },
            {
              type: "heading",
              level: 2,
              content: "So sánh với các nghề liên quan"
            },
            {
              type: "table",
              headers: ["Nghề", "Làm gì chính", "Cần gì nhất"],
              rows: [
                ["Prompt Engineer", "Viết prompt tối ưu", "Hiểu LLM sâu"],
                ["AI Developer", "Code AI systems", "Python, ML"],
                ["AI Workflow Designer", "Kết nối tools + AI thành workflow", "Make/n8n + Business logic"],
              ]
            },
            // ... more content blocks
          ],
          resources: [
            {
              title: "YouTube: AI Automation Career",
              url: "https://youtube.com/...",
              kind: "free"
            }
          ]
        }
        // ... more lessons
      ]
    }
  ]
};
```

### 11.2 State Management

```typescript
// src/hooks/useProgress.ts
interface ProgressStore {
  progress: UserProgress;
  toggleLesson:      (lessonId: string) => void;
  saveNote:          (lessonId: string, note: string) => void;
  saveQuizResult:    (lessonId: string, result: QuizResult) => void;
  saveChecklist:     (lessonId: string, items: boolean[]) => void;
  resetProgress:     () => void;
}

// Derived selectors
export const usePhasePct     = (phaseId: number): number => ...
export const useGlobalPct    = (): number => ...
export const usePhaseStats   = (phaseId: number): PhaseStats => ...
```

---

## 12. Content Schema — Nội Dung Bài Học

### 12.1 Yêu cầu nội dung tối thiểu theo Lesson Type

| Type | Phải có | Nên có |
|---|---|---|
| theory | 1 heading + 2-3 text blocks + 1 callout | table so sánh, bullets tóm tắt |
| exercise | 1 steps block với ≥3 steps | code block ở mỗi step, callout warning |
| project | 1 text (brief) + 1 checklist (criteria) + 1 steps (hướng dẫn) | callout tip, code snippet |
| quiz | ≥5 quiz blocks | callout sau mỗi quiz giải thích thêm |
| reading | 3-5 text/heading blocks + 1 table | callout, bullets tóm tắt cuối |

### 12.2 Viết nội dung — Guidelines

**Theory lessons:**
- Bắt đầu bằng "câu trả lời ngắn" trong callout
- Sau đó mới explain chi tiết
- Kết thúc bằng bullets "Key takeaways"

**Exercise lessons:**
- Mỗi step phải có: action cụ thể + expected result
- Code blocks phải có comments giải thích
- Thêm callout "Nếu gặp lỗi này" khi có common pitfalls

**Project lessons:**
- Brief: giải thích context và mục tiêu
- Tech stack cần dùng
- Acceptance criteria dạng checklist rõ ràng
- Gợi ý "stretch goals" cho người muốn thêm

**Quiz lessons:**
- 5-10 câu hỏi
- Mix: recall (30%) + application (50%) + analysis (20%)
- Explanation phải giải thích TẠI SAO chứ không chỉ đúng/sai

### 12.3 Content Length Guidelines

| Type | Blocks | Estimated read time |
|---|---|---|
| theory | 8–15 blocks | 10–15 phút |
| exercise | 5–10 steps | 20–30 phút thực hành |
| project | 10–20 blocks + checklist | 1-5 giờ làm |
| quiz | 5–10 quiz blocks | 10–15 phút |
| reading | 8–12 blocks | 8–12 phút |

---

## 13. Accessibility & Performance

### 13.1 Accessibility (a11y)
- Tất cả interactive elements có `aria-label`
- Keyboard navigation: Tab, Enter, Space cho tất cả controls
- Focus visible styles (focus ring)
- Color contrast: ≥ 4.5:1 cho text thông thường, ≥ 3:1 cho large text
- Screen reader: semantic HTML (`<nav>`, `<main>`, `<aside>`, `<article>`, `<section>`)
- Accordion: `aria-expanded`, `aria-controls`

### 13.4 Security & XSS Prevention
- **DOM Sanitization**: Trước khi render nội dung do người dùng nhập vào trong ô Ghi chú cá nhân (`personal notes`), ứng dụng phải chạy nội dung đó qua thư viện **DOMPurify** (hoặc hàm sanitize an toàn tương đương) nhằm ngăn chặn mã độc XSS (Cross-Site Scripting) khi người dùng sao chép code hoặc văn bản lạ từ bên ngoài.

### 13.2 Performance
| Metric | Target |
|---|---|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Bundle size (gzipped) | < 200KB (excl. fonts) |
| Storage operations | Debounce writes 300ms (cho ghi chú) |

**Optimizations:**
- **Lazy Loading Giáo trình**: Dữ liệu giáo trình (89 bài học) được chia nhỏ theo từng file Phase (`phase-X.ts`). Sử dụng dynamic import `import('@/data/phases/phase-X')` khi người dùng nhấn vào Phase tương ứng, giúp giảm kích thước bundle ban đầu tối đa và đạt chỉ số FCP < 1.5s.
- Code highlighting: lazy load Prism.js, không block render.
- Fonts: `font-display: swap`.
- Images: không có (dùng emoji và SVG inline).
- Accordion content: render khi open lần đầu, sau đó cache (không unmount).

### 13.3 Offline Support
- App chạy hoàn toàn offline sau lần load đầu (nếu có Service Worker)
- Tất cả data (curriculum + progress) ở client
- External resources (YouTube links, docs) — link out, không embed

---

## 14. Phạm Vi & Lộ Trình (Scope & Roadmap)

### 14.1 MVP (Version 1.0) — Phải có
- [ ] Tất cả 6 Phase với đầy đủ nội dung bài học (content blocks)
- [ ] Lesson Detail Panel với tất cả content block renderers
- [ ] Quiz interactive (MCQ với feedback)
- [ ] Checklist persistent (lưu localStorage)
- [ ] Code block với copy button
- [ ] Progress tracking (checkbox per lesson)
- [ ] Personal notes per lesson
- [ ] Dark mode
- [ ] Responsive 3 breakpoints
- [ ] Search bài học
- [ ] Study timer

### 14.2 Version 1.1 — Sau MVP
- [ ] Syntax highlighting cho code blocks (Prism.js)
- [ ] Export progress report (PDF/CSV)
- [ ] Keyboard shortcuts (J/K navigate lessons, Space toggle complete)
- [ ] Reading progress indicator trong lesson panel
- [ ] "Continue where you left off" — last opened lesson

### 14.3 Version 2.0 — Tương lai
- [ ] Spaced repetition reminders (localStorage-based, no backend)
- [ ] Achievement badges khi hoàn thành milestones
- [ ] Print-friendly study guide per phase
- [ ] AI-powered Q&A trong lesson panel (Anthropic API)
- [ ] Multi-language content (EN/VI toggle)

### 14.4 Không Làm (Exclusions)
- Authentication / user accounts
- Backend database
- Social/community features
- Video hosting trong app
- Paid content gating

---

## Phụ Lục A — Phase & Module Summary

| Phase | Modules | Lessons | Hours | Milestone |
|---|---|---|---|---|
| 0 — Định hướng | 3 | 10 | 20h | My AI Designer Statement |
| 1 — AI Foundations | 3 | 14 | 50h | Gọi API + 5 prompt templates |
| 2 — No-code | 3 | 15 | 80h | 3 workflow production deployed |
| 3 — Technical | 3 | 11 | 45h | Python script batch AI processing |
| 4 — AI Agent | 3 | 14 | 120h | RAG chatbot production |
| 5 — Portfolio | 3 | 11 | 60h | Client đầu tiên / offer |
| 6 — Mastery | 3 | 14 | 80h | Expert trong 1 ngách |
| **Tổng** | **21** | **89** | **455h** | — |

---

## Phụ Lục B — Checklist Trước Khi Build

Trước khi developer bắt đầu code, hãy đảm bảo:

**Content:**
- [ ] Tất cả 89 bài học có đầy đủ `content: ContentBlock[]` (không để mảng rỗng)
- [ ] Mỗi exercise lesson có ít nhất 1 `steps` block
- [ ] Mỗi quiz lesson có ít nhất 5 `quiz` blocks
- [ ] Mỗi project lesson có `checklist` block với acceptance criteria

**Technical:**
- [ ] TypeScript strict mode bật
- [ ] Tất cả lessonIds unique và theo format `l{phase}-{module}-{index}`
- [ ] localStorage keys có prefix namespace (`aiwfd:`)
- [ ] Error boundary bao quanh content renderers

**Design:**
- [ ] Dark mode test tất cả components
- [ ] Mobile test trên 375px viewport
- [ ] Touch targets ≥ 44px
- [ ] Keyboard navigation test

---

*Tài liệu này là nguồn sự thật duy nhất (single source of truth) cho việc build ứng dụng. Mọi quyết định thiết kế và kỹ thuật nên tham chiếu đến đây.*
