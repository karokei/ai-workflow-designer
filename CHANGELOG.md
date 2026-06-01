# Sổ Nhật Ký Thay Đổi (Changelog)

Tất cả các thay đổi đáng chú ý đối với dự án **AI Workflow Designer** sẽ được ghi lại trong tệp tin này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/vi/1.0.0/) và dự án này tuân thủ [Định phiên bản ngữ nghĩa (Semantic Versioning)](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-06-01

### Added
*   **📚 Giáo Trình 6 Phases:** Khởi tạo giáo trình hoàn chỉnh từ Prompt Engineering đến RAG và Multi-Agent với cơ chế tải động Lazy Loading giúp giảm dung lượng tải ban đầu.
*   **🎮 Giả Lập Sandbox (Simulator):** Xây dựng giao diện mô phỏng quy trình tự động hóa (n8n/Make) với các node trực quan, vẽ đường nối bằng SVG và hoạt ảnh xung phát sáng neon chạy dọc liên kết.
*   **🤖 AI-as-a-judge:** Cơ chế chấm điểm và đưa ra phản hồi bài tập thực hành của học viên trực tiếp bằng trí tuệ nhân tạo (hỗ trợ offline-first fallback/keyword matching và API models).
*   **💾 Offline-First:** Sử dụng `localforage` (IndexedDB) để lưu trữ tiến trình học tập và trạng thái hoàn thành bài học một cách an toàn trực tiếp trên thiết bị của học viên.
*   **🎨 Mika Design System v1.0:** Tích hợp giao diện visual phong cách Cyberpunk tối màu với tông màu chủ đạo **Electric Cyan (#00D4FF)**, Stats HUD bo góc cao cấp, các hiệu ứng hover neon glow.
*   **⚙️ Nền Tảng Kỹ Thuật (Phase 1 Optimization):**
    *   Viết lại tài liệu dự án `README.md` đầy đủ thông tin và cấu trúc thư mục.
    *   Tạo file cấu hình mẫu `.env.example` để thiết lập các biến môi trường an toàn.
    *   Thiết lập luồng tự động hóa tích hợp liên tục **GitHub Actions CI** (`.github/workflows/ci.yml`).
    *   Nâng cấp cấu hình ESLint lên **Type-Aware ESLint Rules** (`tseslint.configs.recommendedTypeChecked`) bảo đảm an toàn dữ liệu kiểu tĩnh.

---

[0.1.0]: https://github.com/karokei/ai-workflow-designer/releases/tag/v0.1.0
