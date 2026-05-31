---
description: Quy trình cải tiến cấu trúc mã nguồn mà không làm thay đổi tính năng.
---

# Karo Workflow: Refactor System

## Giới thiệu
Quy trình nâng cấp chất lượng mã nguồn, giảm nợ kỹ thuật và cải thiện hiệu năng mà không làm thay đổi hành vi của tính năng.

## Các bước thực hiện
1.  **Đánh giá mã nguồn:** Tìm kiếm các đoạn code "rác", duplicate hoặc quá phức tạp.
2.  **Xây dựng bộ Test an toàn:** Đảm bảo có đủ test để xác nhận tính năng không bị hỏng sau refactor.
3.  **Thực hiện thay đổi nhỏ (Atomic Changes):** Refactor từng bước một, không thay đổi quá nhiều cùng lúc.
4.  **Review & Verify:** Kiểm tra lại logic và chạy test sau mỗi bước.
5.  **Clean up:** Gỡ bỏ các đoạn code cũ hoặc không còn sử dụng.

## Nguyên tắc
- "Để lại mã nguồn sạch hơn lúc mới tìm thấy".
- Không ưu tiên thêm tính năng mới trong quá trình refactor.
