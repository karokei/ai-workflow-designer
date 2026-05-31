# QUY TẮC KỸ THUẬT (ENGINEERING RULES)

## Mục tiêu
Xây dựng hệ thống ổn định, có khả năng mở rộng và quy trình làm việc chuyên nghiệp.

## 🏗️ Kiến trúc & Thiết kế
1.  **Mô-đun hóa (Modularity):** Chia nhỏ hệ thống thành các thành phần độc lập, dễ kiểm thử và thay thế.
2.  **Tách biệt mối quan tâm (Separation of Concerns):** Giữ cho logic nghiệp vụ, giao diện và dữ liệu luôn tách biệt.
3.  **Thiết kế cho tương lai:** Cân nhắc khả năng mở rộng nhưng tránh over-engineering (thiết kế quá mức cần thiết).

## 🧪 Kiểm thử (Testing)
- **TDD (Test-Driven Development):** Viết test trước, viết code sau.
- **Độ bao phủ (Coverage):** Đảm bảo các logic cốt lõi luôn được bao phủ bởi Unit Test.
- **E2E Testing:** Sử dụng Playwright/Cypress để kiểm tra các luồng người dùng quan trọng.

## 🔄 Quy trình triển khai (CI/CD)
- Mã nguồn phải luôn ở trạng thái "sẵn sàng deploy" trên nhánh main/production.
- Tự động hóa việc kiểm tra linting và chạy test trong mỗi PR.
- Sử dụng semantic versioning để quản lý các bản phát hành.

## 📊 Quan sát & Giám sát (Observability)
- Tích hợp logging chi tiết để dễ dàng debug khi có sự cố.
- Theo dõi các chỉ số quan trọng (Core Web Vitals, API Response Time).
