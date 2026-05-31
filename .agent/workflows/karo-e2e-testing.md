---
description: Quy trình kiểm thử E2E toàn diện bằng Playwright cho dự án Karo.
---

# Karo E2E Testing Workflow

Quy trình đảm bảo mọi luồng hoạt động của người dùng đều mượt mà và không có lỗi.

## Các bước thực hiện

1.  **Chuẩn bị môi trường:** Khởi động server (dev hoặc preview).
2.  **Chạy Playwright:** Sử dụng script `.agent/scripts/karo_test.py`.
3.  **Kiểm tra luồng chính:** Login, Checkout, Navigation, Form Submission.
4.  **Kiểm soát Visual:** Chạy visual regression test nếu có snapshot cũ.
5.  **Báo cáo kết quả:** Nếu có lỗi, liệt kê chi tiết các bước tái hiện (Steps to Reproduce).

---

> [!IMPORTANT]
> Không bao giờ bỏ qua bước này trước khi tiến hành `karo-deploy-system`.
