# QUY TẮC LẬP TRÌNH (CODING RULES)

## Mục tiêu
Viết mã nguồn sạch (Clean Code), dễ bảo trì và hiệu suất cao.

## 💎 Tiêu chuẩn Vàng
1.  **Sạch và Đẹp (Clean & Elegant):** Code không chỉ để chạy, mà còn phải đẹp. Tuân thủ nguyên tắc "Boy Scout" (luôn để lại code sạch hơn lúc mới tìm thấy).
2.  **SOLID Principles:** Áp dụng triệt để 5 nguyên tắc thiết kế hướng đối tượng.
3.  **KISS & DRY:** Keep It Simple, Stupid & Don't Repeat Yourself. Tránh việc làm phức tạp hóa vấn đề.
4.  **Tự giải thích (Self-documenting):** Đặt tên biến, hàm rõ ràng đến mức không cần comment cũng hiểu được logic.

## 📝 Quy chuẩn chi tiết
- **Naming:** Sử dụng camelCase cho biến/hàm, PascalCase cho Class/Component. Tên phải có nghĩa (không dùng `a`, `b`, `temp`).
- **Function:** Mỗi hàm chỉ nên làm một việc duy nhất (Single Responsibility). Độ dài không nên quá 20-30 dòng.
- **Error Handling:** Sử dụng try-catch hợp lý, không bao giờ "nuốt" lỗi (silent error).
- **TypeScript:** Luôn ưu tiên tính nghiêm ngặt (strict mode), hạn chế sử dụng `any`.

## 🚀 Tối ưu hiệu năng
- Tránh các vòng lặp lồng nhau sâu (deeply nested loops).
- Tận dụng memoization khi cần thiết trong React.
- Tối ưu hóa việc gọi API và truy vấn Database.
