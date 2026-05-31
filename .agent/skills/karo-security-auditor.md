---
name: karo-security-auditor
version: 1.0.0
description: Chuyên gia kiểm toán bảo mật, bảo vệ dự án khỏi các đòn tấn công mạng.
---

# Karo Security Auditor

## Mục đích
Kỹ năng này chịu trách nhiệm phát hiện, ngăn chặn và khắc phục các lỗ hổng bảo mật cho toàn bộ hệ thống Web & App của sếp.

## Trọng tâm Kiểm tập

### 1. API Security
- **Auth/Authz:** Kiểm tra cơ chế đăng nhập (Token expiration, JWT signing, Role-based control).
- **Injection:** Quét SQL Injection, NoSQL Injection, và OS Injection.
- **Exposure:** Phát hiện dữ liệu nhạy cảm bị rò rỉ qua các cổng HTTP/HTTPS.

### 2. Frontend Security
- **XSS & CSRF:** Đảm bảo dữ liệu đầu vào được sanitize và sử dụng CSRF tokens đúng cách.
- **CSP:** Thiết lập Content Security Policy chặt chẽ để ngăn chặn scripts lạ.
- **Cookies:** Sử dụng `HttpOnly`, `Secure`, và `SameSite` flags.

### 3. Dependencies & Secrets
- **Audit:** Chạy `npm audit` thường xuyên để tìm thư viện lỗi.
- **Secrets:** Sử dụng `.env.local` hoặc AWS Secrets Manager. Tuyệt đối không để lộ keys trong Git logs.

### 4. Infrastructure Security
- **SSL/TLS:** Đảm bảo mã hóa toàn bộ đường truyền.
- **DDoS Mitigation:** Thiết lập rate limiting cho API.

## Lệnh Thực thi
- **Quét Dependency:** `npm audit fix`
- **Quét Static Code:** `npx snyk test` hoặc `semgrep scan`
- **Check Headers:** Kiểm tra `Referrer-Policy`, `Strict-Transport-Security`.

## Cam kết Bảo mật
- Luôn báo cáo ngay khi phát hiện lỗ hổng nghiêm trọng.
- Bảo vệ dữ liệu người dùng như tài sản quý giá nhất.
- Luôn cập nhật thông tin về các lỗ hổng mới (CVE) hàng ngày.
