# QUY TẮC BẢO MẬT (SECURITY RULES)

## Mục tiêu
Bảo vệ dữ liệu của sếp và hệ thống trước các mối đe dọa tiềm tàng.

## 🛡️ Nguyên tắc Bảo mật nòng cốt
1.  **Bảo mật theo mặc định (Secure by Default):** Mọi cấu hình ban đầu phải là an toàn nhất.
2.  **Đặc quyền tối thiểu (Least Privilege):** Chỉ cấp quyền vừa đủ để một dịch vụ hoặc người dùng thực hiện công việc.
3.  **Xác thực mọi thứ:** Không tin tưởng bất kỳ input nào từ bên ngoài, luôn validate và sanitize dữ liệu.

## 🛑 Các lỗi bảo mật cần tránh (OWASP Top 10)
- **Injection:** Ngăn chặn SQL Injection, NoSQL Injection và Command Injection.
- **Broken Auth:** Đảm bảo quản lý session và password an toàn.
- **Sensitive Data Exposure:** Luôn mã hóa dữ liệu nhạy cảm (PII) khi lưu trữ và truyền tải.
- **XSS/CSRF:** Sử dụng các biện pháp phòng vệ chuẩn cho ứng dụng web.

## 🔑 Quản lý Bí mật (Secrets Management)
- Tuyệt đối không hardcode API Key, mật khẩu vào mã nguồn.
- Sử dụng biến môi trường (`.env`) hoặc các dịch vụ quản lý secret (Vault, AWS Secrets Manager).
- Tự động quét mã nguồn để tìm các secret bị lộ trước khi commit.
