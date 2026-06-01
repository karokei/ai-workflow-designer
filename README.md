# ⚡ AI Workflow Designer

[![React 19](https://img.shields.io/badge/React-19.2-blue.svg?logo=react&logoColor=white)](https://react.dev)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.0-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite 8](https://img.shields.io/badge/Vite-8.0-646CFF.svg?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-76E2F2.svg?logo=vitest&logoColor=white)](https://vitest.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Một nền tảng học thiết kế AI Workflow (n8n, Make.com) đột phá, tích hợp **Sandbox Simulator** trực quan sinh động và **AI-as-a-judge** cho các thử thách thực chiến thực tế. Ứng dụng được thiết kế theo phong cách Cyberpunk hiện đại, tối ưu hóa trải nghiệm tương tác với hệ thống thiết kế **Mika Design System v1.0**.

---

## ⚡ Các Tính Năng Cốt Lõi

*   **📚 Giáo Trình 6 Phases Toàn Diện:** Cung cấp lộ trình bài bản từ cơ bản (Prompt Engineering, Structured Outputs) đến nâng cao (Multi-Agent Systems, RAG Workflows) được tải động dưới dạng **Lazy Loading** giúp tối ưu dung lượng tải ban đầu.
*   **🎮 Giả Lập Sandbox (n8n/Make Simulator):**
    *   Hệ thống vẽ đường nối liên kết giữa các Node bằng đồ họa động SVG kết hợp các xung phát sáng neon chạy dọc liên kết.
    *   Bảng cấu hình tham số trực quan cho từng Node loại.
    *   Bảng log dữ liệu JSON di chuyển qua các Node thời gian thực.
    *   Tích hợp sẵn 3 kịch bản thực chiến: **Email Classifier**, **Daily News Aggregator**, **PDF Invoice Data Extractor**.
*   **🤖 Trình Chấm Điểm AI-as-a-judge:** Đánh giá các thử thách lập trình/thiết kế của học viên trực tiếp bằng trí tuệ nhân tạo (hỗ trợ mô hình Anthropic/Google AI), trả về điểm số chi tiết và phản hồi chuyên môn bằng tiếng Việt chuẩn xác.
*   **💾 Offline-First & Tiện Ích Tối Ưu:** Lưu trữ tiến trình học tập, điểm số bài tập của học viên trực tiếp trên thiết bị thông qua `localforage` (IndexedDB) bảo đảm dữ liệu luôn an toàn khi mất kết nối mạng.
*   **🌌 Trải Nghiệm Visual Premium:** Giao diện Cyberpunk Neon sắc bén, sử dụng brand accent là **Electric Cyan (#00D4FF)** của **Mika Design System v1.0** mang lại cảm giác công nghệ tương lai sống động.

---

## 🚀 Hướng Dẫn Cài Đặt & Phát Triển

### 1. Yêu Cầu Hệ Thống
*   **Node.js**: Phiên bản 22 trở lên.
*   **npm**: Phiên bản 10 trở lên.

### 2. Cài Đặt
Clone dự án từ GitHub và cài đặt các dependencies:
```bash
git clone https://github.com/karokei/ai-workflow-designer.git
cd ai-workflow-designer
npm install
```

### 3. Cấu Hình Biến Môi Trường
Sao chép tệp tin cấu hình mẫu và điền thông tin API Key:
```bash
cp .env.example .env
```
Mở file `.env` và điền khóa API của bạn (ví dụ Google AI API Key hoặc Anthropic API Key) để kích hoạt trình chấm điểm tự động AI-as-a-judge:
```env
VITE_API_KEY=your_api_key_here
VITE_AI_JUDGE_MAX_CALLS=10
```

### 4. Các Lệnh Vận Hành Dự Án
*   **Khởi chạy môi trường phát triển (Dev server):**
    ```bash
    npm run dev
    ```
    Mở trình duyệt truy cập `http://localhost:5173`.

*   **Chạy toàn bộ kiểm thử unit (Tests):**
    ```bash
    npm run test
    ```

*   **Đo đạc kiểm thử độ phủ (Test coverage):**
    ```bash
    npx vitest run --coverage
    ```

*   **Kiểm tra cú pháp & Lỗi tĩnh (Lint):**
    ```bash
    npm run lint
    ```

*   **Xây dựng sản phẩm đóng gói (Build):**
    ```bash
    npm run build
    ```

---

## 📁 Cấu Trúc Mã Nguồn

```
ai-workflow-designer/
├── .agent/                 # Cấu hình luật tác tử và nhật ký ghi nhớ
├── .github/workflows/      # Cấu hình GitHub Actions CI
├── public/                 # Các tài nguyên tĩnh
├── skills/                 # Thư viện kỹ năng modular mở rộng của Agent
├── src/
│   ├── assets/             # Hình ảnh, icon và fonts
│   ├── components/         # Các thành phần giao diện dùng chung (ErrorBoundary, Blocks, v.v.)
│   ├── data/               # Metadata và dữ liệu bài học nạp động
│   ├── services/           # Lớp dịch vụ (AI, Storage) xử lý logic nghiệp vụ
│   ├── types/              # Các định nghĩa kiểu TypeScript
│   ├── views/              # Các trang giao diện chính (Overview, Curriculum, Sandbox, Search)
│   ├── App.tsx             # Component gốc định tuyến và bố cục
│   ├── index.css           # Cấu hình tokens và phong cách Mika Design System
│   └── main.tsx            # Điểm khởi chạy React app
├── vite.config.ts          # Cấu hình bundler Vite
├── tsconfig.json           # Cấu hình TypeScript
└── package.json            # Các script và dependencies
```

---

## 🤝 Đóng Góp Ý Kiến & Phát Triển

Chúng tôi rất hoan nghênh các đóng góp cải thiện chất lượng sản phẩm.
Quy trình đóng góp chuẩn:
1. Tạo branch tính năng mới từ `develop` branch (`git checkout -b feat/tính-năng-mới`).
2. Thực hiện phát triển theo quy trình TDD (viết test kiểm chứng trước khi viết code).
3. Đảm bảo toàn bộ kiểm thử pass và không có cảnh báo lint (`npm run lint` & `npm run test`).
4. Commit thay đổi tuân theo quy chuẩn **Conventional Commits** và tạo Pull Request.

---

## 📄 Bản Quyền
Dự án được phân phối dưới giấy phép **MIT License**. Xem chi tiết tại tệp tin `LICENSE`.
