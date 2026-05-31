# Karo Kit & Superpowers Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tích hợp song hành hệ sinh thái Karo Kit (v1.5.1) và bộ khung kỹ năng Superpowers vào dự án AI Workflow Designer.

**Architecture:** Cài đặt package `karo-kit` để khởi tạo bộ não tác tử (`.agent/`, `CONTINUITY.md`) kết hợp sao chép 14 Kỹ năng chuyên dụng của Superpowers vào thư mục `skills/` dùng chung. Cấu hình tệp `CLAUDE.md` và `GEMINI.md` ở thư mục gốc để hướng dẫn các AI Agent tự động nạp kỹ năng và đồng bộ Working Memory liên tục.

**Tech Stack:** Node.js, npm, Vitest, happy-dom, karo-kit, superpowers framework.

---

### Task 1: Cài đặt Karo Kit & Khởi tạo Tác tử

**Files:**
- Modify: `package.json`
- Create: `.agent/memory/learnings.json`
- Create: `.agent/rules/global_rules.md`
- Create: `CONTINUITY.md`

- [ ] **Step 1: Viết test kiểm thử ban đầu (Failing Test)**
  
  Tạo tệp kiểm thử `src/utils/agent-integration.test.ts` để kiểm tra sự hiện diện của `.agent` và các file cấu hình.

  ```typescript
  // src/utils/agent-integration.test.ts
  import { describe, it, expect } from 'vitest';
  import * as fs from 'fs';
  import * as path from 'path';

  describe('Agent Framework Integration', () => {
    it('should verify that all integration files exist', () => {
      const rootDir = path.resolve(__dirname, '../../');
      const agentDir = path.join(rootDir, '.agent');
      const memoryFile = path.join(agentDir, 'memory', 'learnings.json');
      const rulesFile = path.join(agentDir, 'rules', 'global_rules.md');
      const continuityFile = path.join(rootDir, 'CONTINUITY.md');
      const skillsDir = path.join(rootDir, 'skills');
      const claudeFile = path.join(rootDir, 'CLAUDE.md');
      const geminiFile = path.join(rootDir, 'GEMINI.md');

      expect(fs.existsSync(agentDir)).toBe(true);
      expect(fs.existsSync(memoryFile)).toBe(true);
      expect(fs.existsSync(rulesFile)).toBe(true);
      expect(fs.existsSync(continuityFile)).toBe(true);
      expect(fs.existsSync(skillsDir)).toBe(true);
      expect(fs.existsSync(claudeFile)).toBe(true);
      expect(fs.existsSync(geminiFile)).toBe(true);
    });
  });
  ```

- [ ] **Step 2: Chạy kiểm thử để xác nhận thất bại (Expected to fail)**
  
  Run: `npm run test` hoặc `npx vitest run src/utils/agent-integration.test.ts`
  Expected: FAIL (Thư mục và các file cấu hình chưa tồn tại)

- [ ] **Step 3: Cài đặt karo-kit và chạy khởi tạo**
  
  Thêm `karo-kit` vào `package.json` devDependencies bằng lệnh terminal:
  Run: `npm install -D karo-kit@1.5.1`

  Sau đó, thực hiện khởi tạo bộ não Karo bằng lệnh:
  Run: `npx karo init`

  Lệnh này sẽ tự động tạo ra:
  *   Thư mục `.agent/` chứa các cấu hình memory và rules.
  *   Tệp `CONTINUITY.md` đóng vai trò Working Memory.

- [ ] **Step 4: Cấu hình learnings.json và global_rules.md**
  
  Tạo tệp `.agent/memory/learnings.json` với dữ liệu rỗng ban đầu:
  ```json
  {
    "learnings": []
  }
  ```

  Tạo tệp `.agent/rules/global_rules.md` chứa quy tắc cốt lõi của sếp:
  ```markdown
  # Global Agent Rules — Karo Kit

  1. Luôn tôn trọng quyết định của Sếp (Karo Kei).
  2. Bắt buộc đồng bộ trạng thái thực thi vào `CONTINUITY.md` sau mỗi lượt Turn.
  3. Mọi dòng code viết ra phải được bao phủ bởi Unit Test (Vitest) theo đúng chu kỳ TDD.
  4. Duy trì thiết kế theo trường phái Mika Design System (Indigo, Emerald, Slate).
  ```

- [ ] **Step 5: Chạy lại kiểm thử một phần**
  
  Run: `npx vitest run src/utils/agent-integration.test.ts`
  Expected: Vẫn FAIL vì còn thiếu thư mục `skills/` và các file `CLAUDE.md`, `GEMINI.md` sẽ được làm ở tác vụ sau.

- [ ] **Step 6: Commit phần 1**
  
  ```bash
  git add package.json package-lock.json .agent/ CONTINUITY.md src/utils/agent-integration.test.ts
  git commit -m "chore: install karo-kit and bootstrap agent core files"
  ```

---

### Task 2: Di chuyển & Thiết lập Thư viện Kỹ năng Modular (skills/)

**Files:**
- Create: `skills/` (chứa toàn bộ kỹ năng modular)

- [ ] **Step 1: Tạo thư mục skills và sao chép Kỹ năng Superpowers**
  
  Sao chép toàn bộ kỹ năng từ thư mục scratch Superpowers vào thư mục `skills/` của dự án bằng lệnh terminal:
  Run: `mkdir -p skills && cp -r /home/karo-kei/.gemini/antigravity/scratch/superpowers/skills/* ./skills/`

- [ ] **Step 2: Xác minh các file Kỹ năng cốt lõi**
  
  Đảm bảo các kỹ năng quan trọng đã ở đúng vị trí:
  *   `skills/using-superpowers/SKILL.md`
  *   `skills/brainstorming/SKILL.md`
  *   `skills/test-driven-development/SKILL.md`
  *   `skills/systematic-debugging/SKILL.md`

- [ ] **Step 3: Chạy lại kiểm thử**
  
  Run: `npx vitest run src/utils/agent-integration.test.ts`
  Expected: Vẫn FAIL do thiếu `CLAUDE.md` và `GEMINI.md`.

- [ ] **Step 4: Commit phần 2**
  
  ```bash
  git add skills/
  git commit -m "feat: integrate superpowers skills library into skills/ folder"
  ```

---

### Task 3: Thiết lập Giao thức Chỉ thị Agent (`CLAUDE.md` & `GEMINI.md`)

**Files:**
- Create: `CLAUDE.md`
- Create: `GEMINI.md`

- [ ] **Step 1: Tạo tệp CLAUDE.md**
  
  Tạo tệp `CLAUDE.md` tại thư mục gốc để định hướng hoạt động cho Claude Code / Cursor:

  ```markdown
  # 👑 AI Workflow Designer — Agent Instructions (Claude/Cursor)

  ## 🚀 Lệnh vận hành dự án (Project Commands)
  - Khởi chạy dev server: `npm run dev`
  - Xây dựng sản phẩm (build): `npm run build`
  - Chạy toàn bộ kiểm thử (test): `npm run test`
  - Chạy một tệp kiểm thử cụ thể: `npx vitest run <path-to-test>`
  - Kiểm tra cú pháp (lint): `npm run lint`

  ## 🧱 Karo Kit & Superpowers Workflows
  1. **Nạp Kỹ năng ban đầu**: Bắt buộc nạp `./skills/using-superpowers/SKILL.md` đầu mỗi phiên làm việc.
  2. **Tuân thủ Kỹ năng Modular**: Luôn tìm kiếm kỹ năng phù hợp trong thư mục `./skills/` trước bất kỳ hành động code hay sửa lỗi nào.
  3. **Working Memory**: Cập nhật nhật ký thực thi thời gian thực vào `./CONTINUITY.md` sau mỗi lượt Turn.
  4. **Quy tắc TDD**: Luôn viết test lỗi trước khi viết code (RED), sửa code tối giản để test qua (GREEN), sau đó tối ưu (REFACTOR).
  5. **Long-term learnings**: Rút ra bài học sau mỗi tác vụ và ghi vào `.agent/memory/learnings.json`.
  ```

- [ ] **Step 2: Tạo tệp GEMINI.md**
  
  Tạo tệp `GEMINI.md` tại thư mục gốc để định hướng hoạt động cho Gemini CLI / Antigravity:

  ```markdown
  # ⚡ AI Workflow Designer — Agent Instructions (Gemini/Antigravity)

  @./skills/using-superpowers/SKILL.md
  @.agent/rules/global_rules.md

  ## 🚀 Lệnh vận hành dự án (Project Commands)
  - Khởi chạy dev server: `npm run dev`
  - Xây dựng sản phẩm (build): `npm run build`
  - Chạy toàn bộ kiểm thử (test): `npm run test`
  - Kiểm tra cú pháp (lint): `npm run lint`

  ## 🧠 Bộ nhớ và Vận hành Tác tử
  1. Đọc và thực thi chỉ thị trong `./CONTINUITY.md` để duy trì Working Memory.
  2. Tuyệt đối tuân thủ các chỉ dẫn trong `./skills/` tương ứng với mỗi hành động.
  3. Lưu giữ và học hỏi kinh nghiệm thông qua `.agent/memory/learnings.json`.
  ```

- [ ] **Step 3: Chạy lại toàn bộ kiểm thử để xác nhận vượt qua (Expected to PASS)**
  
  Run: `npx vitest run src/utils/agent-integration.test.ts`
  Expected: ALL PASS 🎉

- [ ] **Step 4: Commit hoàn tất tích hợp**
  
  ```bash
  git add CLAUDE.md GEMINI.md
  git commit -m "feat: configure agent instruction files CLAUDE.md and GEMINI.md"
  ```
