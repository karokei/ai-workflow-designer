# Đặc Tả Thiết Kế: Tích Hợp Karo Kit & Superpowers vào AI Workflow Designer

Tài liệu này đặc tả kiến trúc tích hợp hệ sinh thái tác tử thông minh **Karo Kit (v1.5.1)** và bộ khung kỹ năng **Superpowers** vào dự án **AI Workflow Designer** nhằm tạo ra một môi trường phát triển tự động hóa, kiểm thử nghiêm ngặt và lưu trữ ngữ cảnh liên tục.

---

## 1. Tầm Nhìn Sáng Tạo (Creative North Star)
**"Hệ điều hành Tác tử Song Hành (Dual-Agent OS)"**

Sự kết hợp này mang lại khả năng quản lý trạng thái, tự học hỏi của **Karo Kit** kết hợp chặt chẽ với quy trình lập kế hoạch, phát triển định hướng kiểm thử (TDD) của **Superpowers**. AI Agent không chỉ là một công cụ sinh mã tự động, mà hoạt động như một kỹ sư cao cấp có kỷ luật cao, liên tục ghi chép nhật ký, tự soi lỗi và tự động hóa toàn bộ quy trình kiểm định chất lượng trước khi bàn giao sản phẩm cho sếp.

---

## 2. Kiến Trúc & Cấu Trúc Thư Mục Tích Hợp

Toàn bộ hệ thống được tích hợp trực tiếp vào dự án `ai-workflow-designer` tại thư mục gốc để đảm bảo tính di động và tự đóng gói (self-contained):

```text
ai-workflow-designer/
├── .agent/
│   ├── memory/
│   │   └── learnings.json      # [Mới] Nhật ký học hỏi lâu dài của Karo Agent
│   └── rules/
│       └── global_rules.md     # [Mới] Luật lệ phát triển bất biến của sếp
├── skills/                     # [Mới] Thư viện Kỹ năng Modular hợp nhất
│   ├── brainstorming/          # (Superpowers) Quy trình làm rõ yêu cầu Socratic
│   ├── writing-plans/          # (Superpowers) Lập kế hoạch thực thi chi tiết
│   ├── executing-plans/        # (Superpowers) Triển khai kế hoạch tuần tự
│   ├── test-driven-development/# (Superpowers) Chu kỳ RED-GREEN-REFACTOR
│   ├── systematic-debugging/   # (Superpowers) Quy trình gỡ lỗi khoa học 4 bước
│   ├── verification-before-completion/ # (Superpowers) Kiểm duyệt chất lượng trước khi xong
│   ├── using-superpowers/      # (Superpowers) Điều hướng và nạp kỹ năng
│   ├── ...                     # (Các kỹ năng khác của Superpowers)
│   └── (karo-custom-skills)/   # Các kỹ năng tự viết/tùy biến riêng của Karo
├── CONTINUITY.md               # [Mới] Working Memory - Nhật ký thực thi thời gian thực
├── CLAUDE.md                   # [Mới] Cấu hình vận hành và lệnh cho Claude Code / Cursor
├── GEMINI.md                   # [Mới] Cấu hình vận hành và lệnh cho Gemini CLI / Antigravity
├── package.json                # (Cập nhật dependency karo-kit)
└── ... (Các file nguồn React/Vite hiện tại)
```

---

## 3. Thành Phần Tích Hợp Chi Tiết

### 3.1 Karo Kit Core Bootstrapping
*   **Dependency**: Cài đặt `karo-kit` dưới dạng `devDependency` trong dự án.
*   **Initialization**: Chạy lệnh `npx karo init` để tạo cấu trúc `.agent/` và tệp `CONTINUITY.md` ban đầu.
*   **Working Memory (`CONTINUITY.md`)**:
    *   Mỗi khi bắt đầu hoặc kết thúc một lượt tương tác (turn), Agent bắt buộc cập nhật nhật ký hoạt động thời gian thực tại tệp này.
    *   Nội dung ghi chép bao gồm: Trạng thái hiện tại, tác vụ đang làm, bước tiếp theo và các lưu ý kỹ thuật.
*   **Long-term Learnings (`.agent/memory/learnings.json`)**:
    *   Tự động lưu trữ các "bài học xương máu" rút ra sau mỗi lần gỡ lỗi hoặc hoàn thành tính năng lớn để tránh lặp lại sai lầm.

### 3.2 Thư Viện Kỹ Năng Hợp Nhất (skills/)
*   Sao chép 14 kỹ năng chuẩn của Superpowers từ thư mục scratch toàn cục sang thư mục `./skills/` của dự án để đảm bảo tính di động.
*   Quy chuẩn của mỗi Kỹ năng:
    *   Đặt trong một thư mục con tương ứng (ví dụ: `skills/brainstorming/`).
    *   Tệp cấu hình chính phải là `SKILL.md` chứa phần tiêu đề YAML rõ ràng để Agent tự động nhận diện và nạp khi bắt đầu tác vụ.

### 3.3 Chỉ Thị Vận Hành Cho Agent (`CLAUDE.md` & `GEMINI.md`)
Tạo các tệp cấu hình chỉ thị tại thư mục gốc để tất cả các AI Assistant khác khi truy cập vào dự án đều tuân thủ các quy tắc sau:
1.  **Lệnh vận hành chuẩn của dự án**:
    *   Dev server: `npm run dev`
    *   Production build: `npm run build`
    *   Run tests: `npm run test` (Vitest run)
    *   Lint code: `npm run lint`
2.  **Cách nạp và sử dụng kỹ năng**:
    *   Bắt buộc nạp `skills/using-superpowers/SKILL.md` trước tiên.
    *   Nếu có kỹ năng tương ứng với tác vụ trong thư mục `skills/`, bắt buộc phải kích hoạt và tuân thủ 100%.
3.  **Lưu trữ tiến trình**:
    *   Bắt buộc đồng bộ trạng thái vào `CONTINUITY.md` sau mỗi lượt làm việc.

---

## 4. Kế Hoạch Xác Minh (Verification Plan)

### 4.1 Kiểm thử Tự động (Automated Verification)
*   **Cài đặt**: Đảm bảo package `karo-kit` được cài đặt thành công và hiển thị trong `devDependencies` của `package.json`.
*   **Lệnh khởi tạo**: Chạy thử `npx karo init` trong terminal để kiểm tra tính năng sinh thư mục `.agent/` và `CONTINUITY.md`.
*   **Kiểm thử dự án**: Chạy `npm run test` để xác minh bộ khung Vitest hoạt động bình thường, không bị ảnh hưởng bởi việc thêm các thư mục cấu hình tác tử.

### 4.2 Kiểm thử Thủ công (Manual Verification)
*   Kiểm tra sự tồn tại đầy đủ của các tệp `skills/using-superpowers/SKILL.md`, `CLAUDE.md`, `GEMINI.md`.
*   Thực hiện viết nhật ký thử vào `CONTINUITY.md` để đảm bảo định dạng hiển thị chuẩn xác.
