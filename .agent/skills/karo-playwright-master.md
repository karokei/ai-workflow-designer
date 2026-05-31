---
name: karo-playwright-master
version: 1.0.0
description: Chuyên gia kiểm thử tự động E2E với Playwright cho các ứng dụng web hiện đại.
---

# Karo Playwright Master

## Mục đích
Kỹ năng này giúp các Agent tự động hóa việc kiểm thử hành vi người dùng, đảm bảo ứng dụng không có lỗi (bugs) và trải nghiệm mượt mà từ giao diện đến dữ liệu.

## Quy trình Kiểm thử

### 1. Thiết lập Playwright
- **Cấu hình:** Sử dụng `playwright.config.ts`.
- **Browsers:** Chạy song song trên Chromium, Firefox, WebKit.
- **Reporting:** Xuất báo cáo HTML và Video ghi lại quá trình test lỗi.

### 2. Viết Test Scripts (E2E)
- **User Personas:** Giả lập các loại người dùng (Guest, Admin, Subbed User).
- **Core Flows:** Kiểm tra các luồng chính (Login, Checkout, Profile Edit).
- **Edge Cases:** Thử nhập sai dữ liệu, click nhanh, hoặc gián đoạn mạng.

### 3. Visual Testing
- **Snapshots:** So sánh ảnh chụp màn hình (screenshots) để phát hiện lệch giao diện (UI Regression).
- **Consistency:** Kiểm tra tính nhất quán giữa các trình duyệt.

### 4. Accessibility Testing
- **Axe-core:** Tích hợp kiểm tra tính dễ tiếp cận (Accessibility) tự động.
- **WCAG Standards:** Đảm bảo đạt chuẩn WCAG 2.1+.

## Hướng dẫn thực thi (Lệnh)
- **Chạy toàn bộ test:** `npx playwright test`
- **Xem báo cáo:** `npx playwright show-report`
- **Ghi hình script mới:** `npx playwright codegen [URL]`

## Cam kết Chất lượng
- Luôn báo cáo chi tiết các bước gây ra lỗi (Replication Steps).
- Không để lọt bất kỳ lỗi giao diện (CSS/Layout) nào trên các thiết bị khác nhau.
