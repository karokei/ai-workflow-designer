---
description: Quy trình kiểm toán bảo mật chuyên nghiệp theo chuẩn Cyber Security Auditor.
---

# Karo Security Audit Workflow

Quy trình bảo vệ hệ thống khỏi các rủi ro từ mã nguồn đến dependencies.

## Các bước thực hiện

1.  **Quét Dependency:** Chạy `npm audit` hoặc `snyk`.
2.  **Kiểm tra Static Code:** Quét mã nguồn để tìm SQLi, XSS, CSRF.
3.  **Kiểm soát Secrets:** Quét file `.env`, logs, và Git history.
4.  **Audit API:** Kiểm tra các Endpoint bảo mật, JWT/Session.
5.  **Báo cáo rủi ro:** Phân loại rủi ro (Low, Medium, High, Critical) và đưa ra phương án xử lý.

---

> [!WARNING]
> Mọi lỗ hổng mức **High** hoặc **Critical** phải được xử lý ngay lập tức.
