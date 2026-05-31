---
description: Quy trình tiếp nhận, phân tích và sửa lỗi hệ thống an toàn.
---

# Karo Workflow: Fix Bug

## Giới thiệu
Quy trình chuyên nghiệp để xử lý các vấn đề kỹ thuật và sự cố trong hệ thống.

## Các bước thực hiện
1.  **Tiếp nhận báo cáo:** Hiểu rõ hiện tượng lỗi từ sếp hoặc từ log.
2.  **Nghiên cứu nguyên nhân:** Sử dụng kỹ năng `karo-debugger` để tìm gốc rễ vấn đề.
3.  **Đề xuất giải pháp:** Trình bày phương án fix cho sếp trước khi thực hiện (nếu là lỗi lớn).
4.  **Thực hiện sửa lỗi:** Áp dụng thay đổi mã nguồn.
5.  **Kiểm tra hồi quy (Regression Check):** Đảm bảo lỗi đã hết và không phát sinh lỗi mới.
6.  **Báo cáo kết quả:** Giải thích ngắn gọn cho sếp nguyên nhân và cách đã xử lý.

## Mẹo nhỏ
- Luôn tạo bản backup hoặc commit trước khi sửa các lỗi hệ thống quan trọng.
- Ưu tiên viết test case để ngăn chặn lỗi quay trở lại (Test regression).
