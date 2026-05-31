---
description: Quy trình chuyên nghiệp để triển khai sản phẩm lên môi trường thực tế.
---

# Karo Workflow: Deploy System

## Giới thiệu
Quy trình chuyên nghiệp để đưa sản phẩm từ môi trường phát triển lên môi trường thực tế (Giao diện Production).

## Các bước thực hiện
1.  **Kiểm tra cuối cùng:** Chạy `.agent/scripts/karo_test.py` để đảm bảo hệ thống ổn định.
2.  **Xây dựng (Build):** Chạy `.agent/scripts/karo_build.py` để tạo bản bundle tối ưu.
3.  **Cấu hình môi trường:** Thiết lập các biến môi trường cho production.
4.  **Triển khai:** Chạy `.agent/scripts/karo_deploy.py` để đẩy mã nguồn lên server.
5.  **Xác nhận (Smoke Test):** Kiểm tra các tính năng chính ngay sau khi deploy thành công.
6.  **Thông báo:** Báo cáo cho sếp rằng sản phẩm đã "lên sóng".

## Quy chuẩn Deploy
- Không bao giờ deploy khi test còn fail.
- Có sẵn phương án Rollback nếu có sự cố xảy ra.
