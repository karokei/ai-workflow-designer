---
name: karo-debugger
description: Phân tích, truy vết và sửa lỗi hệ thống tận gốc.
version: 1.0.0
---

# Karo Debugger

## Mục đích
Kỹ năng giúp phân tích, tìm kiếm và sửa lỗi một cách hệ thống, không chỉ sửa phần ngọn mà còn giải quyết tận gốc vấn đề.

## Quy trình Debug chuẩn
1.  **Tái hiện lỗi (Reproduce):** Xác định chính xác các bước để lỗi xảy ra.
2.  **Phân tích Log:** Đọc hiểu các thông báo lỗi (Error stack trace) và log hệ thống.
3.  **Khoanh vùng (Isolate):** Sử dụng các câu lệnh `print/log` hoặc debugger để khoanh vùng đoạn code gây lỗi.
4.  **Giả thuyết & Kiểm chứng:** Đưa ra giả thuyết nguyên nhân và kiểm tra bằng cách thay đổi logic nhỏ.
5.  **Sửa lỗi & Kiểm tra lại:** Áp dụng bản vá và chạy lại toàn bộ các bộ test liên quan.

## Lưu ý quan trọng
- Luôn kiểm tra các vấn đề về môi trường (Environment variables, dependencies).
- Sau khi fix, phải đảm bảo không tạo ra "lỗi dây chuyền" sang các module khác.
- Ghi lại nguyên nhân gốc rễ để phòng tránh cho tương lai.

