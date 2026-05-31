---
description: Quy trình theo dõi, giám sát và cảnh báo sức khỏe hệ thống.
---

# Karo Workflow: Monitor System

## Giới thiệu
Quy trình đảm bảo hệ thống hoạt động ổn định và xử lý kịp thời các sự cố thông qua việc giám sát.

## Các bước thực hiện
1.  **Thiết lập Metrics:** Xác định các chỉ số quan trọng (CPU, Ram, Request rate, Error rate).
2.  **Cấu hình Dashboard:** Tạo giao diện trực quan để theo dõi các chỉ số.
3.  **Thiết lập Cảnh báo (Alerting):** Cấu hình các ngưỡng để tự động thông báo qua Slack/Email.
4.  **Kiểm tra định kỳ (Health Check):** Sử dụng `.agent/scripts/karo_monitor.py` để xác nhận các dịch vụ vẫn sống.

## Mục tiêu
- Phát hiện sớm sự cố trước khi người dùng phát hiện.
- Giảm thiểu thời gian hệ thống ngừng hoạt động (Downtime).
